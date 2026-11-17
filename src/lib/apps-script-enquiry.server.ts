import { createHmac } from "node:crypto";

/** Apps Script ContentService redirects its JSON result to a Google-owned URL.
 * Follow that one redirect as a GET, never forwarding the signed POST body.
 */
export async function sendAppsScriptEnquiry(
  endpoint: string,
  secret: string,
  payload: Record<string, unknown>,
  send: typeof fetch = fetch,
): Promise<Response> {
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    url.port ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname) ||
    secret.length < 32
  )
    throw new Error("Invalid Apps Script configuration");

  const timestamp = String(Date.now());
  const data = JSON.stringify(payload);
  const signature = createHmac("sha256", secret).update(`${timestamp}.${data}`).digest("hex");
  const signal = AbortSignal.timeout(25000);
  const response = await send(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version: 1, timestamp, data, signature }),
    redirect: "manual",
    signal,
  });
  if (![302, 303].includes(response.status)) return response;

  const location = response.headers.get("location");
  if (!location) throw new Error("Missing Apps Script response location");
  const resultUrl = new URL(location);
  if (
    resultUrl.protocol !== "https:" ||
    resultUrl.hostname !== "script.googleusercontent.com" ||
    resultUrl.port ||
    resultUrl.username ||
    resultUrl.password ||
    resultUrl.pathname !== "/macros/echo"
  )
    throw new Error("Unexpected Apps Script response location");

  return send(resultUrl, { method: "GET", redirect: "error", signal });
}
