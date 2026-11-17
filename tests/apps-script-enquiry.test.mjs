import test from "node:test";
import assert from "node:assert/strict";
import { createHmac, createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { handleEnquiry } from "../src/lib/enquiry-handler.server.ts";

const secret = "test-only-signing-secret-that-is-long-enough";
const config = {
  provider: "apps-script",
  url: "https://script.google.com/macros/s/test-deployment/exec",
  secret,
};
const id = "3eaf860a-f728-4a0b-8bf2-4c7ac773d35a";
const valid = {
  name: "Test Visitor",
  company: "",
  email: "visitor@example.com",
  whatsapp: "",
  service: "AI Workflow Automation",
  industry: "Other",
  budget: "Prefer to discuss",
  details: "This is an automated test using fictional contact details.",
  website: "",
};
function request() {
  return new Request("https://portfolio.example/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": id },
    body: JSON.stringify(valid),
  });
}

test("Apps Script requests are signed server-side and content redirects use a body-free GET", async () => {
  const calls = [];
  const response = await handleEnquiry(request(), config, async (url, options) => {
    calls.push({ url: String(url), options });
    if (calls.length === 1)
      return new Response(null, {
        status: 302,
        headers: {
          location: "https://script.googleusercontent.com/macros/echo?user_content_key=test",
        },
      });
    return Response.json({ received: true, submissionId: id });
  });
  assert.equal(response.status, 200);
  const envelope = JSON.parse(calls[0].options.body);
  assert.equal(
    envelope.signature,
    createHmac("sha256", secret).update(`${envelope.timestamp}.${envelope.data}`).digest("hex"),
  );
  assert.equal(JSON.parse(envelope.data).company, "Not provided");
  assert.equal(JSON.parse(envelope.data).submissionId, id);
  assert.ok(!calls[0].options.body.includes(secret));
  assert.equal(calls[0].options.redirect, "manual");
  assert.deepEqual(Object.keys(calls[1].options).sort(), ["method", "redirect", "signal"]);
  assert.equal(calls[1].options.method, "GET");
  assert.equal(calls[1].options.signal, calls[0].options.signal);
});

test("unexpected redirects and receipt ID mismatches never confirm an enquiry", async () => {
  for (const location of [
    "https://example.com/macros/echo",
    "http://script.googleusercontent.com/macros/echo",
    "https://script.googleusercontent.com.evil.example/macros/echo",
    "https://accounts.google.com/login",
    "https://script.googleusercontent.com/other",
    "https://user:pass@script.googleusercontent.com/macros/echo",
  ]) {
    let calls = 0;
    const response = await handleEnquiry(request(), config, async () => {
      calls++;
      return new Response(null, { status: 302, headers: { location } });
    });
    assert.equal(response.status, 502);
    assert.equal(calls, 1);
  }
  for (const receipt of [
    { received: true },
    { received: true, submissionId: "wrong" },
    { received: false },
  ])
    assert.equal(
      (await handleEnquiry(request(), config, async () => Response.json(receipt))).status,
      502,
    );
});

test("invalid Apps Script configuration is rejected before any provider request", async () => {
  for (const badConfig of [
    { ...config, url: "https://script.google.com/macros/s/test/dev" },
    { ...config, url: "https://example.com/macros/s/test/exec" },
    { ...config, secret: "short" },
    { ...config, provider: "unknown" },
  ]) {
    let calls = 0;
    const response = await handleEnquiry(request(), badConfig, async () => {
      calls++;
      return new Response();
    });
    assert.equal(response.status, 502);
    assert.equal(calls, 0);
  }
});

const source = readFileSync(
  new URL("../integrations/google-apps-script/Code.gs", import.meta.url),
  "utf8",
);
function fixture() {
  const state = {
    rows: [],
    emails: [],
    flushes: 0,
    quota: 100,
    failMail: false,
    failWrite: false,
    locked: false,
    lockAvailable: true,
    triggers: [],
  };
  function range(row, column, height = 1, width = 1) {
    const api = {
      getValues: () =>
        Array.from({ length: height }, (_, y) =>
          Array.from({ length: width }, (_, x) => state.rows[row - 1 + y]?.[column - 1 + x] ?? ""),
        ),
      setValues: (values) => {
        if (state.failWrite) throw new Error("private storage error");
        values.forEach((line, y) =>
          line.forEach((value, x) => {
            state.rows[row - 1 + y] ??= [];
            state.rows[row - 1 + y][column - 1 + x] = value;
          }),
        );
        return api;
      },
      setValue: (value) => api.setValues([[value]]),
      setFontWeight: () => api,
      createTextFinder: (text) => {
        const finder = {
          matchEntireCell: () => finder,
          useRegularExpression: () => finder,
          findNext: () => {
            const index = state.rows.findIndex(
              (r, i) => i >= row - 1 && i < row - 1 + height && String(r[column - 1]) === text,
            );
            return index < 0 ? null : { getRow: () => index + 1 };
          },
        };
        return finder;
      },
    };
    return api;
  }
  const sheet = { getLastRow: () => state.rows.length, getRange: range, setColumnWidth() {} };
  const context = vm.createContext({
    Date,
    JSON,
    Math,
    String,
    Number,
    RegExp,
    Error,
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => secret }) },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => {
          if (!state.lockAvailable) return false;
          state.locked = true;
          return true;
        },
        waitLock: () => {
          state.locked = true;
        },
        releaseLock: () => {
          state.locked = false;
        },
      }),
    },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }),
      flush: () => {
        state.flushes++;
      },
    },
    Utilities: {
      Charset: { UTF_8: "utf8" },
      DigestAlgorithm: { SHA_256: "sha256" },
      computeHmacSha256Signature: (value, key) =>
        Array.from(createHmac("sha256", key).update(value).digest()),
      computeDigest: (_algorithm, value) => Array.from(createHash("sha256").update(value).digest()),
    },
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput: (text) => ({
        text,
        setMimeType() {
          return this;
        },
      }),
    },
    MailApp: {
      getRemainingDailyQuota: () => state.quota,
      sendEmail: (message) => {
        assert.equal(state.locked, false);
        assert.ok(state.rows.some((r) => r[12] === "Sending"));
        if (state.failMail) throw new Error("private delivery error");
        state.emails.push(message);
        state.quota--;
      },
    },
    ScriptApp: {
      getProjectTriggers: () => state.triggers.map((name) => ({ getHandlerFunction: () => name })),
      newTrigger: (name) => {
        const builder = {
          timeBased: () => builder,
          everyMinutes: () => builder,
          create: () => {
            state.triggers.push(name);
          },
        };
        return builder;
      },
    },
  });
  vm.runInContext(source, context);
  state.rows = [Array.from(context.PORTFOLIO_HEADERS)];
  const data = {
    ...valid,
    company: "Not provided",
    source: "apsal-portfolio",
    submissionId: id,
    receivedAt: new Date().toISOString(),
  };
  delete data.website;
  const event = (input = data, timestamp = String(Date.now())) => {
    const text = JSON.stringify(input);
    return {
      postData: {
        contents: JSON.stringify({
          version: 1,
          timestamp,
          data: text,
          signature: createHmac("sha256", secret).update(`${timestamp}.${text}`).digest("hex"),
        }),
      },
    };
  };
  return { state, context, data, event, post: (e) => JSON.parse(context.doPost(e).text) };
}

test("Apps Script saves once before receipt and rejects conflicting retries", () => {
  const { state, context, data, event, post } = fixture();
  assert.equal(post(event()).received, true);
  assert.equal(state.rows.length, 2);
  assert.ok(state.flushes > 0);
  assert.equal(state.rows[1][12], "Pending");
  assert.equal(state.emails.length, 0);
  assert.equal(post(event({ ...data, receivedAt: new Date().toISOString() })).duplicate, true);
  assert.equal(state.rows.length, 2);
  assert.equal(
    post(event({ ...data, details: "Different content using the same submission identifier." }))
      .error,
    "submission_conflict",
  );
  assert.equal(state.rows.length, 2);
  assert.equal(state.locked, false);
  context.sendPendingNotifications();
  assert.equal(state.emails.length, 1);
  assert.equal(state.emails[0].to, "mohammed@apsalautomation.com");
  assert.equal(state.emails[0].replyTo, valid.email);
  assert.equal(state.rows[1][12], "Sent");
  context.sendPendingNotifications();
  assert.equal(state.emails.length, 1);
});

test("Apps Script rejects forged, expired, invalid and unpersisted submissions", () => {
  const { state, data, event, post } = fixture();
  const forged = event();
  const envelope = JSON.parse(forged.postData.contents);
  envelope.signature = "0".repeat(64);
  forged.postData.contents = JSON.stringify(envelope);
  assert.equal(post(forged).received, false);
  assert.equal(post(event(data, String(Date.now() - 600000))).received, false);
  assert.equal(post(event({ ...data, email: "invalid" })).received, false);
  assert.equal(post(event({ ...data, service: "unrecognised" })).received, false);
  assert.equal(state.rows.length, 1);
  state.failWrite = true;
  const result = post(event());
  assert.equal(result.received, false);
  assert.ok(!JSON.stringify(result).includes("private"));
  assert.equal(state.locked, false);
});

test("formula-like input is stored as text and lock contention does not report receipt", () => {
  const { state, data, event, post } = fixture();
  assert.equal(post(event({ ...data, name: '=HYPERLINK("https://example.com")' })).received, true);
  assert.ok(state.rows[1][2].startsWith("'="));
  state.lockAvailable = false;
  assert.equal(post(event()).error, "busy");
  assert.equal(state.rows.length, 2);
});

test("mail quota defers notification without losing the lead; uncertain sends are not retried", () => {
  const { state, context, event, post } = fixture();
  post(event());
  state.quota = 0;
  context.sendPendingNotifications();
  assert.equal(state.rows[1][12], "Pending");
  assert.equal(state.emails.length, 0);
  state.quota = 100;
  state.failMail = true;
  context.sendPendingNotifications();
  assert.equal(state.rows[1][12], "Review");
  assert.equal(state.rows.length, 2);
  state.failMail = false;
  context.sendPendingNotifications();
  assert.equal(state.emails.length, 0);
});

test("formula-escaped email addresses remain usable as the notification reply address", () => {
  const { state, context, data, event, post } = fixture();
  assert.equal(post(event({ ...data, email: "+visitor@example.com" })).received, true);
  assert.equal(state.rows[1][4], "'+visitor@example.com");
  context.sendPendingNotifications();
  assert.equal(state.emails[0].replyTo, "+visitor@example.com");
});

test("setup preserves historical rows and installs only one notification worker", () => {
  const { state, context } = fixture();
  state.rows[0] = state.rows[0].slice(0, 14);
  const historical = [
    "old-id",
    "old-date",
    "Historical enquiry",
    "",
    "old@example.com",
    "",
    "",
    "",
    "",
    "",
    "apsal-portfolio",
    "New",
    "Pending",
    "",
  ];
  state.rows.push([...historical]);
  context.setupPortfolioEnquiries();
  context.setupPortfolioEnquiries();
  assert.deepEqual(state.rows[1], historical);
  assert.equal(state.rows[0].length, 17);
  assert.deepEqual(state.triggers, ["sendPendingNotifications"]);
  context.sendPendingNotifications();
  assert.equal(state.emails.length, 0);
});
