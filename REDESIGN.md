# Portfolio redesign

The updated portfolio preserves React, TanStack Start, Vite, Nitro's Vercel preset, the chat route, verified contact links, and the existing LinkedIn demo.

## Audit and implemented direction

The previous site repeated similar cards, put the portrait ahead of project evidence, omitted the voice project, had a limited email-only enquiry form, and used the older professional title. The redesign uses a portrait-led hero, consistent dark service cards, an interactive voice architecture preview, selected authentic workflows, industry examples, a four-stage process, an About portrait, compact tool groups, and a fuller enquiry form. Shared section components and CSS tokens control spacing, colors and typography.

## Evidence and status

- Voice: owner-confirmed Vapi browser calls + n8n + Calendar, Sheets, Gmail and Telegram. Label: Architecture preview — built workflow, testing in progress. No public recording, phone number or telephony provider. Interface and transcript are marked illustrative.
- Real estate and RAG support: supplied screenshots included intact. Built structure; no live deployment or client outcome claim.
- Lead research: existing LinkedIn recorded test preserved.
- Email Intelligence and Job Application Automation omitted from selected work because implementations or supporting assets were not supplied.
- Education: academic requirements completed in 2026; degree certificate awaited.

## Run and deploy

Run `npm install`, then `npm run dev -- --host 127.0.0.1 --port 5173`. Open http://127.0.0.1:5173/.
Run `npm run build` before deploying. Keep the existing Vercel project and GitHub repository apsal_portfolio; do not upload changes to the original apsal-growth-ai repository. Build command: npm run build. Nitro writes .vercel/output for Vercel. Do not deploy this as a static-only website: chat and enquiry need server functions.

## Enquiry integration setup

Until configured, the form reports that online sending is unavailable. Its email draft and verified WhatsApp link remain usable; an email draft is never reported as sent.

1. In n8n, create an HTTPS production POST webhook with Header Auth: header name X-Portfolio-Key and a random secret.
2. Validate/store accepted enquiries, then connect your chosen Sheets/Gmail/Telegram steps. Configure webhook responses so a 2xx response means the enquiry was actually accepted into a durable processing path; return a non-2xx status on rejection/failure. The portfolio reports receipt, not inbox delivery.
3. Add ENQUIRY_WEBHOOK_URL and ENQUIRY_WEBHOOK_SECRET to Vercel's server environment and redeploy. Neither is sent to the browser.
4. Enable provider-side rate limiting/bot controls and deduplication before opening a public endpoint. The included honeypot and validation are supplementary; in-memory limits cannot guarantee protection across serverless instances.
5. Test receipt and notification failures with test enquiries in your own workflow. No external messages were sent during local checks.

## Portfolio AI assistant

The existing assistant still uses /api/chat directly with Gemini. It is separate from the Vapi/n8n voice project. Add GEMINI_API_KEY and a supported GEMINI_MODEL in Vercel to enable it. Keep secrets out of source and client-prefixed environment variables.

## Next voice asset

Add a public demo or recording only when one is available and approved for sharing. Do not enable a fake play/call button.

## Opening screen update — 11 October 2026

The owner requested the earlier portrait-led reference. The opening screen now uses its gradient marketing/automation headline, portrait card, identity block, rounded CTAs and compact tool strip. The updated Digital Growth title and remaining redesign sections are retained.

## Separate Projects page — 11 October 2026

Selected Work has moved from the homepage to /projects. The navigation, footer and Explore My Work button open this dedicated page. It retains the actual workflow images, project status labels and LinkedIn demo, with links back to the homepage voice architecture preview and contact form. The new route uses the same premium navy design and has a page title, canonical URL and sitemap entry.

## Section continuity — 11 October 2026

Industry Solutions and Process share one ambient background and a tighter transition. Shared responsive spacing replaces doubled section padding; industry cards use consistent padding and natural height. Unnecessary full-width dividers and opaque section backgrounds are removed, while navigation scroll offsets, the responsive process timeline and the dedicated Projects page are preserved. Actual desktop, tablet and mobile rendering was checked in a fresh Chrome browser session.
