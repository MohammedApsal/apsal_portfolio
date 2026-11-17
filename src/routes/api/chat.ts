import { createFileRoute } from "@tanstack/react-router";
import { handleChat } from "@/lib/ai/chat-handler.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleChat(request, {
          apiKey: process.env["GEMINI_API_KEY"],
          model: process.env["GEMINI_MODEL"],
          fallbackModel: process.env["GEMINI_FALLBACK_MODEL"],
        }),
    },
  },
});
