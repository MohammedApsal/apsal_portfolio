import { randomUUID } from "node:crypto";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createUIMessageStream, createUIMessageStreamResponse, streamText } from "ai";
import { z } from "zod";
import { PORTFOLIO_SYSTEM_PROMPT } from "./portfolio-knowledge.server.ts";
import { answerPortfolioQuestion, PORTFOLIO_CONTACT_ANSWER } from "./portfolio-faq.ts";

const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        id: z.string().min(1).max(128),
        role: z.enum(["user", "assistant"]),
        parts: z
          .array(z.object({ type: z.string().max(40), text: z.string().max(12000).optional() }))
          .max(30),
      }),
    )
    .min(1)
    .max(40),
});

type ConversationMessage = { role: "user" | "assistant"; content: string };
export type ChatChunk = { type: "text"; text: string };
type ChatConfig = {
  apiKey?: string | undefined;
  model?: string | undefined;
  fallbackModel?: string | undefined;
};
type ChatDependencies = {
  generate?: (
    messages: ConversationMessage[],
    signal: AbortSignal,
    model: string,
  ) => AsyncIterable<ChatChunk>;
  report?: (category: string) => void;
  timeoutMs?: number;
};

/** Only log a category. Provider errors can contain request URLs or credentials. */
export function chatFailureCategory(error: unknown, depth = 0): string {
  if (!error || typeof error !== "object" || depth > 4) return "provider";
  const value = error as {
    statusCode?: number;
    name?: string;
    cause?: unknown;
    lastError?: unknown;
  };
  if (value.statusCode === 429) return "quota";
  if (value.statusCode === 401 || value.statusCode === 403) return "authentication";
  if (value.statusCode === 404) return "model";
  if (value.statusCode && value.statusCode >= 500) return "unavailable";
  if (value.name === "TimeoutError" || value.name === "AbortError") return "timeout";
  return value.lastError || value.cause
    ? chatFailureCategory(value.lastError || value.cause, depth + 1)
    : "provider";
}

async function* generateGemini(
  config: ChatConfig,
  messages: ConversationMessage[],
  signal: AbortSignal,
  model: string,
): AsyncGenerator<ChatChunk> {
  const provider = createGoogleGenerativeAI({ apiKey: config.apiKey!.trim() });
  const result = streamText({
    model: provider(model),
    system: PORTFOLIO_SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 2048,
    maxRetries: 0,
    abortSignal: signal,
    onError: () => {},
  });
  for await (const part of result.fullStream) {
    if (part.type === "error") throw part.error;
    if (part.type === "abort") throw new DOMException("Generation stopped", "AbortError");
    if (part.type === "text-delta") yield { type: "text", text: part.text };
  }
}

export async function handleChat(
  request: Request,
  config: ChatConfig,
  dependencies: ChatDependencies = {},
): Promise<Response> {
  const reject = (message: string, status: number) =>
    new Response(message, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return reject("Please use the assistant on the portfolio website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reject("Please send a text question.", 400);
  if (Number(request.headers.get("content-length") || 0) > 60000)
    return reject("This conversation is too long. Please start a new chat.", 413);

  let messages: ConversationMessage[];
  try {
    const raw = await request.text();
    if (raw.length > 60000)
      return reject("This conversation is too long. Please start a new chat.", 413);
    const parsed = inputSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return reject("Please send a valid text question.", 400);
    messages = parsed.data.messages
      .slice(-20)
      .map((message) => ({
        role: message.role,
        content: message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text || "")
          .join("")
          .trim(),
      }))
      .filter((message) => message.content);
    const last = messages.at(-1);
    if (!last || last.role !== "user" || last.content.length > 1500)
      return reject("Please keep your question between 1 and 1,500 characters.", 400);
    for (const message of messages) {
      if (message.role === "assistant") message.content = message.content.slice(0, 6000);
    }
    while (
      messages.length > 1 &&
      messages.reduce((length, message) => length + message.content.length, 0) > 24000
    )
      messages.shift();
    while (messages[0]?.role === "assistant") messages.shift();
  } catch {
    return reject("Please send a valid text question.", 400);
  }

  const knownAnswer = answerPortfolioQuestion(messages.at(-1)!.content);
  const report =
    dependencies.report || ((category) => console.warn("portfolio_chat_unavailable", { category }));
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const id = randomUUID();
      writer.write({ type: "start", messageId: randomUUID() });
      writer.write({ type: "text-start", id });
      const write = (delta: string) => writer.write({ type: "text-delta", id, delta });
      if (knownAnswer) {
        write(knownAnswer);
      } else if (!config.apiKey?.trim() && !dependencies.generate) {
        write(
          "Custom AI answers are unavailable right now. You can still ask about Apsal's services, skills, and projects.\n\n" +
            PORTFOLIO_CONTACT_ANSWER,
        );
      } else {
        const deadline = AbortSignal.timeout(dependencies.timeoutMs || 20000);
        let wroteText = false;
        const models = [
          ...new Set([
            config.model?.trim() || "gemini-3.5-flash-lite",
            config.fallbackModel?.trim() || "gemini-3.6-flash",
          ]),
        ];
        for (const [index, model] of models.entries()) {
          const attemptDeadline = AbortSignal.timeout(
            index === 0 && models.length > 1 ? 8000 : 20000,
          );
          const signal = AbortSignal.any([request.signal, deadline, attemptDeadline]);
          try {
            const generate =
              dependencies.generate ||
              ((conversation, abort, selectedModel) =>
                generateGemini(config, conversation, abort, selectedModel));
            for await (const part of generate(messages, signal, model)) {
              if (signal.aborted) throw signal.reason;
              if (part.text) {
                write(part.text);
                wroteText = true;
              }
            }
            if (!wroteText) throw new Error("Empty response");
            break;
          } catch (error) {
            if (request.signal.aborted) {
              writer.write({ type: "abort" });
              return;
            }
            const category =
              deadline.aborted || attemptDeadline.aborted ? "timeout" : chatFailureCategory(error);
            if (
              !wroteText &&
              !deadline.aborted &&
              index < models.length - 1 &&
              ["unavailable", "timeout", "quota", "provider"].includes(category)
            ) {
              report("primary_" + category);
              continue;
            }
            report(category);
            const explanation =
              category === "quota" || category === "unavailable"
                ? "Live AI answers are temporarily busy. Please try again shortly."
                : "I couldn't complete a custom AI answer right now. Please try again, or contact Apsal directly.";
            write(
              (wroteText ? "\n\n---\nThis reply was interrupted. " : "") +
                explanation +
                "\n\n" +
                PORTFOLIO_CONTACT_ANSWER,
            );
            break;
          }
        }
      }
      writer.write({ type: "text-end", id });
      writer.write({ type: "finish", finishReason: "stop" });
    },
    onError: () => "The connection was interrupted. Please retry or use the contact links.",
  });
  return createUIMessageStreamResponse({ stream, headers: { "Cache-Control": "no-store" } });
}
