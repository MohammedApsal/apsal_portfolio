# Freelance portfolio update — 17 October 2026

## Published implementation

- Consistent Digital Marketing & AI Automation Specialist title, including page metadata, assistant facts, portrait alt text, and social preview.
- Three service offers with scoped deliverables and matching contact actions.
- Three homepage Selected Work cards with links to detailed project evidence.
- Six Projects cards, five workflow case studies, and the existing clearly labelled sample campaign strategy.
- Concise homepage voice overview; architecture stages moved to the Projects page.
- Four primary enquiry fields. Native expandable optional fields contain company, WhatsApp, industry, and budget.
- Discover → Scope & Quote → Build & Test → Handover & Support process.

## n8n compatibility

The website keeps the existing service enum values in API requests. The form displays the new offer labels.
Company is optional in the browser and shared server schema. The server forwards `Not provided` for an empty company, preserving compatibility with the existing n8n validation that requires a non-empty string. Missing optional industry, budget, and WhatsApp default to `Other`, `Prefer to discuss`, and an empty string.

Authentication, idempotency IDs, receipt validation, notification ordering, and error handling are retained. No n8n credential or Vercel setting was changed for this update.

## Verification

- TypeScript check: passed.
- Production build: passed.
- 24 Node tests: passed, including the optional-field payload against a snapshot of the supplied n8n validator.
- Built-page smoke check: passed. Checks include role metadata, one H1 per route, three services, three homepage highlights, six project cards, local anchor targets across both routes, image paths, form validation, and assistant FAQ response.
- Targeted ESLint: no errors; existing component-only-export warning for the contact constants.
- One labelled live test of the existing production integration completed on 17 October 2026: execution 331. Website confirmed receipt, Gmail returned SENT, and the matching Google Sheets notification update returned Sent with a timestamp. This was the baseline integration check before publication.
- Desktop (1280px), tablet (768px), and mobile (390px) browser checks completed after the user started the local server. No horizontal overflow or broken loaded images was found on the reviewed homepage and Projects layouts. Desktop services have matching 388px widths and 503px heights. Headings remain below the sticky header after navigation.
- Service CTA selection, mobile menu closing, keyboard activation of optional form details, required-field browser validation, Projects navigation, case-study anchor positioning, and the voice architecture interaction passed.
- The local assistant returned the three updated freelance services with a working contact link and its scope/testing qualifications. The broader provider and error cases remain covered by the passing automated tests.
- Screenshots are saved in `outputs/freelance-update/` in the workspace: desktop-home, desktop-services, desktop-selected-work, desktop-case-study, desktop-contact, desktop-assistant, tablet-services, tablet-projects, mobile-selected-work, mobile-contact, and mobile-voice-architecture.

## Run locally

From this project directory:

```powershell
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open http://127.0.0.1:5173/ and http://127.0.0.1:5173/projects.

The local form honestly reports unavailable delivery if local server-only webhook settings are absent. Production variables are not automatically inherited by local development. Do not copy credentials into chat or browser code.

## Deployment

Published to https://apsalportfolio.vercel.app/ on 17 October 2026 after the user requested deployment. Fresh source production deployment dpl_DQcAv3XDpFAxcV1Gr5jR2g7AyxB1 completed successfully. No Git push was performed.

Post-deployment browser checks passed for the homepage, Projects page, and updated assistant service response. One labelled live enquiry with all optional fields blank confirmed receipt. n8n execution 332 succeeded in 5.761 seconds; Gmail returned SENT and Google Sheets notification status updated to Sent. Submission ID: 29555d44-a900-42e0-ba40-defa41a80606. Screenshots: live-deployed-home.jpg and live-deployed-integration.jpg in the update output folder.

The original 15 October test date remains in the public enquiry case study. It is explicitly an internal implementation test, not a customer result or latency promise. The voice assistant remains in testing; the marketing campaign remains a sample with no live ad spend or measured results.
