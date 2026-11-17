# Portfolio enquiry connection

The existing portfolio form calls its own `/api/enquiry` route. That server validates the form and signs a request to Google Apps Script. The script saves the enquiry in the existing **Portfolio Enquiries → Leads** sheet before confirming receipt. A scheduled worker sends the owner notification to `mohammed@apsalautomation.com` after saving.

## Installed connection — 23 October 2026

On 17 November 2026, the portfolio moved to Netlify at https://apsalautomation.com/. The existing Apps Script web app was updated to Version 2, with owner notifications sent to `mohammed@apsalautomation.com`. The Netlify consultation form confirmed saved receipt, and the work-email test record reached `Sent`.

- Portfolio: https://apsalportfolio.vercel.app/#contact
- Google project: https://script.google.com/home/projects/1RP7hskd1cVeQiTiyObU9L1wfDIiYU_ZjM2aQ8wAKcUBXeLzRO1nsRRIO/edit
- Lead spreadsheet: https://docs.google.com/spreadsheets/d/1vtrkhfXy_XevIxgG284C0fds4ks7t-zw9SG0k-ZyCds/edit
- Google deployment: Version 1, running as `fn97596@gmail.com`; one time-based `sendPendingNotifications` trigger.
- Vercel production deployment: `dpl_4b7crdqY5tXsfQBMqQyJAYdzLcts`, project `apsal/apsal_portfolio`.
- Verification: 33 automated tests, TypeScript, changed-source lint (no errors; one existing Fast Refresh warning), production build and build smoke checks passed. One direct signed test was retried without duplication; a separate public-browser submission showed receipt and its own Sheets row. Both notification records reached `Sent`. Invalid signatures were rejected. No Vercel error logs were found during the release check.
- Two clearly labelled fictional test records remain in rows 2 and 3. No real visitor details were used. `Sent` confirms MailApp accepted the send; recipient inbox placement was not independently inspected.
- The website allows up to 30 seconds for a response; the Apps Script transport allows 25 seconds, including its result redirect, to accommodate startup delays. A timeout still cannot guarantee non-delivery; retrying the unchanged form reuses its submission ID.
- The public case study and assistant knowledge describe this migration. The preserved 17 October n8n recording is explicitly labelled as the earlier implementation.

## Installation

1. Create a standalone Google Apps Script project and copy `Code.gs` into its editor. Enable the manifest file in Project settings and copy `appsscript.json`.
2. In Project settings → Script properties, set `ENQUIRY_SIGNING_SECRET` to a random secret of at least 32 characters. Use the same value for Vercel's server-only `ENQUIRY_APPS_SCRIPT_SECRET`. Never put it in React code, a screenshot, a URL or this document.
3. Run `setupPortfolioEnquiries` once. Google asks permission to read/write spreadsheets, send email and manage this script's triggers. The code opens only the configured spreadsheet. Setup preserves old rows, verifies existing columns A:N, appends three tracking columns O:Q and installs one minute-based notification trigger.
4. Deploy as a **Web app**, executing as the spreadsheet-owning Google account, accessible to **Anyone**. The public endpoint accepts writes only when the server signature and timestamp are valid. It never returns enquiry records. Copy the deployed `/exec` URL; do not use `/dev`.
5. Configure Vercel Production: `ENQUIRY_PROVIDER=apps-script`, `ENQUIRY_APPS_SCRIPT_URL=<deployed exec URL>`, `ENQUIRY_APPS_SCRIPT_SECRET=<matching secret>`. Create a fresh deployment after changing environment variables.

## Behavior and limitations

- Receipt means saved in Google Sheets, not that email has already arrived. The worker checks every minute, subject to Google's scheduling and quotas.
- Every submission carries a stable UUID. An identical retry confirms the saved row without inserting another. Reusing an ID with different details is rejected.
- Requests expire after five minutes. HMAC signatures bind the timestamp and payload; the raw secret is never transmitted in form requests. The server follows only Google's expected ContentService response redirect without forwarding the signed body.
- Formula-like input is saved as text. Historical n8n rows are not processed by the new mail worker.
- `Pending`: waiting for the worker or quota. `Sending`: claimed before email. `Sent`: MailApp accepted the send. `Review`: sending failed or delivery was uncertain. `Sent` does not guarantee inbox delivery.
- An interrupted `Sending` row needs manual review. Check the notification inbox before resetting `Review` or `Sending` to `Pending`; an uncertain send could already have arrived. Do not retry the visitor form to resend a notification.
- Consumer Google accounts currently have a quota of 100 email recipients per day across Apps Script. Quotas can change: https://developers.google.com/apps-script/guides/services/quotas. Exhausted email quota leaves enquiries saved and pending.
- The public form still needs monitoring for spam. Same-origin checks and the honeypot help but do not authenticate human visitors. HMAC protects the Apps Script endpoint from direct unauthenticated writes; it does not replace rate limiting on the public website.
- Existing n8n environment variables remain available for rollback. Setting `ENQUIRY_PROVIDER=n8n` restores the old transport on the next deployment while that workflow remains active.
- This migration changes only enquiry intake. Other n8n workflows and the portfolio AI assistant are separate.

## Verification

Run `node --test tests/enquiry.test.mjs tests/apps-script-enquiry.test.mjs` for both transports, signed requests, duplicate/conflicting retries, sheet failures, formula protection, quotas and mail failure behavior. Run the production build before release. For live verification, submit one clearly labelled fictional test; confirm receipt, its single sheet row and the owner notification. Do not use real visitor records as test data.
