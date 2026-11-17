import { createFileRoute } from "@tanstack/react-router";
import { handleEnquiry } from "@/lib/enquiry-handler.server";
export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleEnquiry(request, {
          provider: process.env["ENQUIRY_PROVIDER"],
          url:
            process.env["ENQUIRY_PROVIDER"] === "apps-script"
              ? process.env["ENQUIRY_APPS_SCRIPT_URL"]
              : process.env["ENQUIRY_WEBHOOK_URL"],
          secret:
            process.env["ENQUIRY_PROVIDER"] === "apps-script"
              ? process.env["ENQUIRY_APPS_SCRIPT_SECRET"]
              : process.env["ENQUIRY_WEBHOOK_SECRET"],
        }),
    },
  },
});
