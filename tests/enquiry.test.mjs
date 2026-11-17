import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { handleEnquiry } from "../src/lib/enquiry-handler.server.ts";
const valid = {
  name: "Test Visitor",
  company: "Example Business",
  email: "visitor@example.com",
  whatsapp: "",
  service: "AI Voice Assistant",
  industry: "Other",
  budget: "Prefer to discuss",
  details: "Please discuss a browser voice assistant workflow.",
  website: "",
};
const request = (data = valid, origin = "https://example.com") =>
  new Request("https://example.com/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify(data),
  });
const config = { url: "https://n8n.example.com/webhook/enquiry", secret: "local-test-secret" };

test("optional business details remain compatible with the existing n8n validation", async () => {
  // Snapshot of the Validate enquiry code in the supplied n8n intake workflow.
  const validateN8n = new Function(
    "$input",
    "$execution",
    readFileSync(new URL("./fixtures/n8n-enquiry-validation.txt", import.meta.url), "utf8"),
  );
  for (const company of [undefined, "", "   ", "Example Business"]) {
    const data = {
      name: valid.name,
      email: valid.email,
      service: valid.service,
      details: valid.details,
      website: "",
      company,
    };
    const response = await handleEnquiry(request(data), config, async (_url, options) => {
      const body = JSON.parse(options.body);
      const validated = validateN8n(
        { first: () => ({ json: { body } }) },
        { id: "compatibility-test" },
      )[0].json;
      assert.equal(validated.valid, true);
      assert.equal(validated.row.Company, company?.trim() || "Not provided");
      assert.equal(body.industry, "Other");
      assert.equal(body.budget, "Prefer to discuss");
      assert.equal(body.whatsapp, "");
      assert.equal(body.source, "apsal-portfolio");
      return Response.json({ received: true });
    });
    assert.equal(response.status, 200);
  }
});
test("unconfigured delivery never reports success or calls a provider", async () => {
  let called = false;
  const response = await handleEnquiry(request(), {}, async () => {
    called = true;
    return new Response();
  });
  assert.equal(response.status, 503);
  assert.equal(called, false);
  assert.match((await response.json()).message, /not been sent/);
});
test("invalid, oversized and bot submissions never reach the provider", async () => {
  for (const data of [
    { ...valid, email: "wrong" },
    { ...valid, name: " " },
    { ...valid, details: "x".repeat(13000) },
    { ...valid, website: "spam" },
    { ...valid, service: "invented" },
    { ...valid, whatsapp: "not-a-phone" },
  ]) {
    let called = false;
    const response = await handleEnquiry(request(data), config, async () => {
      called = true;
      return new Response();
    });
    assert.ok([400, 413].includes(response.status));
    assert.equal(called, false);
  }
});
test("cross-origin requests are rejected", async () => {
  assert.equal((await handleEnquiry(request(valid, "https://other.example"), config)).status, 403);
});
test("malformed JSON is rejected", async () => {
  const r = new Request("https://example.com/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal((await handleEnquiry(r, config)).status, 400);
});
test("accepted webhook receives validated data and server-only authentication", async () => {
  let received;
  const response = await handleEnquiry(request(), config, async (url, options) => {
    received = { url: String(url), options };
    return Response.json({ received: true }, { status: 200 });
  });
  assert.equal(response.status, 200);
  assert.equal(received.url, config.url);
  assert.equal(received.options.headers["X-Portfolio-Key"], config.secret);
  assert.equal(received.options.redirect, "error");
  const body = JSON.parse(received.options.body);
  assert.equal(body.email, valid.email);
  assert.equal(body.website, undefined);
  assert.equal(body.source, "apsal-portfolio");
  assert.match(body.submissionId, /^[0-9a-f-]{36}$/);
  assert.equal(JSON.stringify(await response.json()).includes(config.secret), false);
});

test("a retry forwards the same submission ID", async () => {
  const id = "3eaf860a-f728-4a0b-8bf2-4c7ac773d35a";
  for (let attempt = 0; attempt < 2; attempt++) {
    const retry = request();
    retry.headers.set("Idempotency-Key", id);
    const response = await handleEnquiry(retry, config, async (_url, options) => {
      assert.equal(JSON.parse(options.body).submissionId, id);
      return Response.json({ received: true });
    });
    assert.equal(response.status, 200);
  }
});

test("invalid IDs and unconfirmed webhook responses never report success", async () => {
  const bad = request();
  bad.headers.set("Idempotency-Key", "bad-id");
  assert.equal((await handleEnquiry(bad, config)).status, 400);
  for (const send of [
    async () => Response.json({ message: "Workflow was started" }),
    async () => Response.json({ received: false }),
    async () => new Response("not JSON"),
    async () => Response.json(null),
  ])
    assert.equal((await handleEnquiry(request(), config, send)).status, 502);
});
test("provider rejection and network failure never report receipt", async () => {
  for (const send of [
    async () => new Response(null, { status: 500 }),
    async () => {
      throw new Error("private failure detail");
    },
  ]) {
    const response = await handleEnquiry(request(), config, send);
    assert.equal(response.status, 502);
    assert.equal(JSON.stringify(await response.json()).includes("private failure"), false);
  }
});
test("insecure or credential-bearing webhook URLs are not called", async () => {
  for (const url of ["http://n8n.example.com/webhook", "https://user:pass@n8n.example.com/"]) {
    let called = false;
    assert.equal(
      (
        await handleEnquiry(request(), { ...config, url }, async () => {
          called = true;
          return new Response();
        })
      ).status,
      502,
    );
    assert.equal(called, false);
  }
});
