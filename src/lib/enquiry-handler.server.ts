import { enquirySchema } from "./enquiry.ts";
import { randomUUID } from "node:crypto";
import { sendAppsScriptEnquiry } from "./apps-script-enquiry.server.ts";
type EnquiryConfig = {
  provider?: string | undefined;
  url?: string | undefined;
  secret?: string | undefined;
};
export async function handleEnquiry(
  request: Request,
  config: EnquiryConfig,
  send: typeof fetch = fetch,
): Promise<Response> {
  const json = (message: string, status: number) =>
    Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json("Please submit from the portfolio website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json("Please submit a valid enquiry.", 400);
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return json("The enquiry is too long. Please shorten your description.", 413);
  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return json("The enquiry is too long. Please shorten your description.", 413);
    input = JSON.parse(raw);
  } catch {
    return json("Please submit a valid enquiry.", 400);
  }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return json(parsed.error.issues[0]?.message || "Please check the enquiry fields.", 400);
  const suppliedId = request.headers.get("Idempotency-Key");
  if (
    suppliedId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(suppliedId)
  )
    return json("Please refresh the page and submit again.", 400);
  const submissionId = suppliedId || randomUUID();
  if (!config.url || !config.secret)
    return json(
      "Online sending is not available yet. Your enquiry has not been sent. Please use an email draft or WhatsApp.",
      503,
    );
  try {
    const payload = {
      ...parsed.data,
      // Retain compatibility with the original intake and saved lead columns.
      company: parsed.data.company || "Not provided",
      website: undefined,
      source: "apsal-portfolio",
      submissionId,
      receivedAt: new Date().toISOString(),
    };
    const webhook = new URL(config.url);
    if (webhook.protocol !== "https:" || webhook.username || webhook.password)
      throw new Error("Invalid webhook configuration");
    if (config.provider && !["n8n", "apps-script"].includes(config.provider))
      throw new Error("Unknown enquiry provider");
    const response =
      config.provider === "apps-script"
        ? await sendAppsScriptEnquiry(config.url, config.secret, payload, send)
        : await send(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Portfolio-Key": config.secret },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(12000),
            redirect: "error",
          });
    if (!response.ok)
      return json(
        "We could not confirm that your enquiry was received. Please use email or WhatsApp.",
        502,
      );
    const receipt = (await response.json()) as { received?: boolean; submissionId?: string } | null;
    if (
      receipt?.received !== true ||
      (config.provider === "apps-script" && receipt.submissionId !== submissionId)
    )
      return json(
        "We could not confirm that your enquiry was received. Please use email or WhatsApp.",
        502,
      );
    return json("Your enquiry was received. Thank you for sharing your project details.", 200);
  } catch {
    return json(
      "We could not confirm that your enquiry was received. Please use email or WhatsApp.",
      502,
    );
  }
}
