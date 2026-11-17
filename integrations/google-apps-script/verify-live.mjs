import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { handleEnquiry } from "../../src/lib/enquiry-handler.server.ts";

// Explicit manual integration check. Never runs as part of the automated test suite.
const config = JSON.parse(readFileSync(".env.apps-script.local", "utf8"));
const statePath = ".env.apps-script-verification.local";
const test = existsSync(statePath)
  ? JSON.parse(readFileSync(statePath, "utf8"))
  : {
      submissionId: randomUUID(),
      form: {
        name: "INTERNAL TEST — Apps Script migration",
        company: "Fictional verification record",
        email: "visitor@example.com",
        whatsapp: "",
        service: "AI Workflow Automation",
        industry: "Other",
        budget: "Prefer to discuss",
        details:
          "INTERNAL TEST: verify the Google Apps Script migration saves this fictional enquiry and sends the portfolio owner one email. No visitor reply is needed.",
        website: "",
      },
    };
writeFileSync(statePath, JSON.stringify(test, null, 2));
const request = () =>
  new Request("https://apsalportfolio.vercel.app/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": test.submissionId },
    body: JSON.stringify(test.form),
  });
for (const stage of ["saved receipt", "identical retry"]) {
  const start = performance.now();
  const response = await handleEnquiry(
    request(),
    { ...config, provider: "apps-script" },
    async (url, options) => {
      const requestStart = performance.now();
      try {
        const result = await fetch(url, options);
        console.log(
          JSON.stringify({
            transport: new URL(url).hostname,
            method: options.method,
            status: result.status,
            seconds: +((performance.now() - requestStart) / 1000).toFixed(2),
          }),
        );
        return result;
      } catch (error) {
        console.log(
          JSON.stringify({
            transport: new URL(url).hostname,
            method: options.method,
            error: error.name,
          }),
        );
        throw error;
      }
    },
  );
  const result = await response.json();
  console.log(
    JSON.stringify({
      stage,
      status: response.status,
      seconds: +((performance.now() - start) / 1000).toFixed(2),
      result,
    }),
  );
  assert.equal(response.status, 200);
}
const rejected = await handleEnquiry(request(), {
  ...config,
  provider: "apps-script",
  secret: "deliberately-wrong-test-key-that-is-long-enough",
});
assert.equal(rejected.status, 502);
console.log(
  JSON.stringify({
    stage: "invalid signature rejected",
    status: rejected.status,
    submissionId: test.submissionId,
  }),
);
