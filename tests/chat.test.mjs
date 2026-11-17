import test from "node:test";
import assert from "node:assert/strict";
import { handleChat, chatFailureCategory } from "../src/lib/ai/chat-handler.server.ts";

const user = (text) => ({ id: "visitor-1", role: "user", parts: [{ type: "text", text }] });
const request = (messages = [user("How can I contact him?")], options = {}) =>
  new Request("https://example.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin: "https://example.com" },
    body: JSON.stringify({ messages }),
    ...options,
  });
const chunks = async (response) =>
  (await response.text())
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)));
const answer = (list) =>
  list
    .filter((item) => item.type === "text-delta")
    .map((item) => item.delta)
    .join("");

test("contact FAQ works without any provider or API key and finishes a valid UI stream", async () => {
  let called = false;
  const response = await handleChat(
    request(),
    {},
    {
      generate: async function* () {
        called = true;
      },
    },
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/event-stream/);
  const events = await chunks(response);
  assert.match(answer(events), /mohammed@apsalautomation\.com/);
  assert.equal(called, false);
  assert.equal(events[0].type, "start");
  assert.equal(events.at(-1).type, "finish");
  assert.equal(
    events.some((event) => event.type === "error"),
    false,
  );
});

test("custom question without configured AI gives an honest useful answer", async () => {
  const events = await chunks(
    await handleChat(request([user("Can you outline an automation for my bakery?")]), {}),
  );
  assert.match(answer(events), /Custom AI answers are unavailable/);
  assert.match(answer(events), /wa.me\/919952337599/);
});

test("custom provider answer streams text and keeps the text conversation", async () => {
  const messages = [
    user("Who is Apsal?"),
    {
      id: "answer-1",
      role: "assistant",
      parts: [
        { type: "text", text: "He works on automation." },
        { type: "reasoning", text: "private reasoning" },
      ],
    },
    user("Which workflow would help my bakery?"),
  ];
  const response = await handleChat(
    request(messages),
    { apiKey: "test-not-a-key" },
    {
      generate: async function* (history, signal) {
        assert.equal(history.length, 3);
        assert.equal(history[1].content, "He works on automation.");
        assert.equal(signal.aborted, false);
        yield { type: "text", text: "Start with enquiry " };
        yield { type: "text", text: "routing and follow-up." };
      },
    },
  );
  assert.equal(answer(await chunks(response)), "Start with enquiry routing and follow-up.");
});

test("quota and wrapped provider failures keep contact details and never expose error secrets", async () => {
  const reported = [];
  const error = { lastError: { statusCode: 429, message: "secret-provider-key-DO-NOT-LEAK" } };
  const events = await chunks(
    await handleChat(
      request([user("What would you automate for my bakery?")]),
      {},
      {
        generate: async function* () {
          throw error;
        },
        report: (category) => reported.push(category),
      },
    ),
  );
  assert.deepEqual(reported, ["primary_quota", "quota"]);
  assert.match(answer(events), /temporarily busy/);
  assert.match(answer(events), /mohammed@apsalautomation\.com/);
  assert.doesNotMatch(JSON.stringify(events), /DO-NOT-LEAK/);
  assert.equal(
    events.some((event) => event.type === "error"),
    false,
  );
});

test("partial and empty provider failures still end with actionable fallback", async () => {
  for (const generate of [
    async function* () {
      yield { type: "text", text: "One possible approach" };
      throw new Error("secret");
    },
    async function* () {},
  ]) {
    const events = await chunks(
      await handleChat(
        request([user("Design a bakery enquiry workflow")]),
        {},
        { generate, report: () => {} },
      ),
    );
    assert.match(answer(events), /couldn't complete a custom AI answer/);
    assert.match(answer(events), /mohammed@apsalautomation\.com/);
    assert.equal(events.at(-1).type, "finish");
  }
});

test("generation deadline gives a fallback, while visitor cancellation is an abort", async () => {
  const events = await chunks(
    await handleChat(
      request([user("Design a bakery enquiry workflow")]),
      {},
      {
        timeoutMs: 5,
        report: (category) => assert.equal(category, "timeout"),
        generate: async function* () {
          await new Promise((resolve) => setTimeout(resolve, 20));
          yield { type: "text", text: "late" };
        },
      },
    ),
  );
  assert.doesNotMatch(answer(events), /late/);
  assert.match(answer(events), /contact Apsal directly/);
  const controller = new AbortController();
  controller.abort();
  const cancelled = await chunks(
    await handleChat(
      request([user("Design a bakery enquiry workflow")], { signal: controller.signal }),
      {},
      {
        generate: async function* () {
          throw new DOMException("stopped", "AbortError");
        },
        report: () => assert.fail("Cancellation is not provider failure"),
      },
    ),
  );
  assert.equal(
    cancelled.some((event) => event.type === "abort"),
    true,
  );
});

test("malformed, forged-role, oversized and cross-origin requests never call provider", async () => {
  for (const input of [
    [],
    [user("")],
    [user("x".repeat(1501))],
    [{ ...user("Hello"), role: "system" }],
    [{ id: "broken", role: "user", parts: "bad" }],
  ]) {
    const response = await handleChat(
      request(input),
      {},
      {
        generate: async function* () {
          assert.fail("Provider called");
        },
      },
    );
    assert.equal(response.status, 400);
  }
  const cross = request();
  cross.headers.set("origin", "https://other.example");
  assert.equal((await handleChat(cross, {})).status, 403);
  const malformed = new Request("https://example.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal((await handleChat(malformed, {})).status, 400);
  const oversized = new Request("https://example.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "x".repeat(60001),
  });
  assert.equal((await handleChat(oversized, {})).status, 413);
});

test("failure diagnostics reveal categories only", () => {
  assert.equal(chatFailureCategory({ cause: { statusCode: 401 } }), "authentication");
  assert.equal(chatFailureCategory({ statusCode: 404 }), "model");
  const circular = {};
  circular.cause = circular;
  assert.equal(chatFailureCategory(circular), "provider");
});

test("long assistant history does not break the next question", async () => {
  const history = [
    user("First question"),
    { id: "long-answer", role: "assistant", parts: [{ type: "text", text: "x".repeat(9000) }] },
    user("How can I contact him?"),
  ];
  const response = await handleChat(request(history), {});
  assert.equal(response.status, 200);
  assert.match(answer(await chunks(response)), /mohammed@apsalautomation\.com/);
});

test("a busy primary model falls back before emitting text", async () => {
  const models = [];
  const response = await handleChat(
    request([user("Suggest a bakery enquiry workflow")]),
    {},
    {
      report: (category) => assert.equal(category, "primary_unavailable"),
      generate: async function* (_history, _signal, model) {
        models.push(model);
        if (models.length === 1) throw { statusCode: 503 };
        yield { type: "text", text: "Start by routing the bakery enquiry to a lead sheet." };
      },
    },
  );
  assert.deepEqual(models, ["gemini-3.5-flash-lite", "gemini-3.6-flash"]);
  assert.match(answer(await chunks(response)), /^Start by routing/);
});
