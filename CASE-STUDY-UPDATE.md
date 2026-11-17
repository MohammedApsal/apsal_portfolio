# Case-study improvements — handover

## Local changes

- Six directly accessible case-study pages under /projects/{project-id}; /projects is the overview.
- Existing /projects#project-id links navigate to their matching detail pages after JavaScript loads. With JavaScript disabled, they locate the relevant overview card.
- Illustrated sample campaign ad concepts, landing-page wireframe, and enquiry journey.
- Static enquiry workflow preview reflects the verified internal implementation. Visitor receipt follows successful saving; Gmail owner notification follows the receipt.
- Contact form explains the next step. Delivery and validation logic are unchanged.

## Recording evidence

The user supplied the correct enquiry recording on 17 October 2026. It shows form submission, the website receipt, successful n8n execution, the saved Google Sheets row with Notification Status: Sent, and the Gmail owner alert. The original is 1 minute 50.67 seconds. The case study embeds a reviewed 58.8-second silent edit with native controls, a poster, English walkthrough subtitles, expandable notes, and an edited-video download link. The static workflow explanation remains alongside the recording.

The campaign is fictional and has no live ad spend or measured results. Real Estate/RAG deployment and voice testing labels retain their existing evidence limits.

## Reference script for future recordings (75–90 seconds)

Before recording: use a separate test tab/sheet and a clearly labelled sample enquiry. Hide account menus, email addresses, submission IDs, personal lead records, webhook URLs, authentication headers, and credentials. Use the existing workflow without changing production authentication. Send a single test only when intentionally recording this demonstration.

0–12 seconds — Website form
Show the portfolio's four primary enquiry fields. Narrate: “This is the enquiry flow I built for my portfolio. A visitor shares their name, email, service, and project description. Business details are optional.”

12–25 seconds — Request handling
Submit the labelled test once. Narrate: “The server validates the request and sends it to an authenticated n8n webhook. A submission ID helps the workflow recognise a retry.” Avoid showing network headers or webhook settings.

25–40 seconds — Saving and visitor receipt
Show the saved sample row with private columns hidden, then the website receipt. Narrate: “n8n checks the submission ID and saves the enquiry in Google Sheets. Only after saving does the visitor receive confirmation.” If it takes longer than expected, keep the recording truthful; do not claim an instant or guaranteed time.

40–58 seconds — Owner notification
Show the resulting owner email with identifying information hidden, and Notification Status: Sent on the sample row. Narrate: “The Gmail notification follows the saved lead. Its status is recorded separately so a notification problem can be reviewed without asking the visitor to resubmit.”

58–75 seconds — Workflow overview
Show the workflow at a readable zoom. Narrate: “I built the website connection, validation, lead storage, receipt handling, and owner alert. The workflow also has separate storage and notification error paths.”

75–90 seconds — Scope and outcome
Return to the case study. Narrate: “This demonstrates a verified internal implementation on my own portfolio: the enquiry was saved and the owner notification was sent.” Keep the voice assistant and sample campaign claims separate from this demonstrated flow.

The supplied recording is now integrated. This script remains as a reference for future captures. The current clip uses descriptive walkthrough notes rather than invented spoken narration.

## Verification log

Implementation and verification are complete. Published to the existing production portfolio on 17 October 2026 when the user requested deployment. No GitHub push was performed.

Verified after implementation:

- Local production Vercel-target build passed. The later cloud deployment build also passed.
- TypeScript noEmit passed.
- Targeted ESLint passed with zero errors; the existing contact constants export warning remains.
- Existing 24 assistant/enquiry/FAQ tests passed.
- Built smoke passed for homepage, project overview and six direct case studies: HTTP200, one H1, individual canonical URLs, all internal links, hash targets, sitemap URLs and image assets. Unknown project returns404.
- Smoke also verified static campaign controls, five-step campaign and enquiry journeys, saved-first receipt wording, exact voice status, four required fields and new contact copy. Unconfigured/invalid enquiry and contact FAQ API checks passed without a live webhook submission.
- Browser checks at desktop1280, tablet768 and mobile390 widths found no horizontal overflow in the reviewed new layouts. Ads align, wireframe stacks, workflow stages fit, and loaded workflow images were intact.
- All six old /projects#project-id URLs reached the matching detail pages. /projects#case-studies remains the overview.
- Keyboard Enter activated the optional fields, mobile menu/project navigation and voice architecture stage. Service preselection still selects the existing API enum.
- Direct mobile detail heading was below the73px sticky header. Four required fields remain name/email/service/details; optional fields have no required flags.
- React structure/accessibility checklist reviewed; no provider, credential, enquiry server handler or n8n workflow changes were made. No additional live enquiry was sent.

Screenshots in the workspace outputs/case-study-update folder:

- desktop-campaign-creatives.jpg
- desktop-landing-wireframe.jpg
- desktop-enquiry-workflow.jpg
- tablet-landing-wireframe.jpg
- tablet-enquiry-workflow.jpg
- mobile-campaign-creative.jpg
- mobile-enquiry-workflow.jpg
- mobile-voice-architecture.jpg

Local preview: http://127.0.0.1:5173/projects/sample-campaign
Enquiry preview: http://127.0.0.1:5173/projects/enquiry-automation

## Recording edit and verification — 17 October 2026

- The original source file remains unchanged on the user's D: drive. Only the edited MP4, safe poster and WebVTT notes were copied into public/demos.
- Removed unrelated inbox/new-tab screens, notification footage and audio. Cropped the workflow, Sheets and Gmail scenes to relevant content. Opaque masks hide the student email, private form contact fields, identifying Sheet cells and Gmail contact details/submission ID.
- The public professional contact links already shown on the portfolio remain visible in the website scenes.
- The final Sheets and Gmail frames are held briefly for readability. The clip has cuts and does not imply uninterrupted capture or a response-time guarantee.
- Result: 1280×720 H.264 MP4,58.8seconds,821417bytes,fast-start metadata,no audio stream. Poster41708bytes.
- Reviewed output contact sheets at one-second intervals and full-resolution samples; a second agent reviewed the masks and key frames. No exposed private student email, unrelated inbox items, desktop notifications, enquiry UUID or credentials were found in the reviewed edit.
- Desktop native keyboard playback completed the whole58.8second clip without an error; Home seeks to the start. Subtitles loaded successfully. Enter opens/closes the walkthrough notes.
- Desktop1280,tablet768,and mobile390 layouts fit without horizontal overflow. Player widths529px at tablet and251px at mobile; native full-screen controls are available for detailed viewing.
- TypeScript and targeted ESLint passed. The production build,24 existing tests,and build smoke passed, including video controls,source,poster,subtitles,asset existence and no autoplay. The video appears only on the enquiry case study.
- No additional enquiry was submitted. No GitHub push was performed. The later user-authorised deployment is recorded below.

## Production deployment — 17 October 2026

- URL: https://apsalportfolio.vercel.app/
- Enquiry case study: https://apsalportfolio.vercel.app/projects/enquiry-automation
- Target: production. Status: READY.
- Project: APSAL / apsal_portfolio.
- Deployment ID: dpl_C2auVLD62Yn6d1T2xfSPioXQRkpE.
- Unique URL: https://apsalportfolio-4oj3q77tm-apsal.vercel.app
- Inspector: https://vercel.com/apsal/apsal_portfolio/C2auVLD62Yn6d1T2xfSPioXQRkpE
- Source: tested local package; no Git commit or push created for this release.
- Framework: Vite / TanStack Start / Nitro, Node24. Cloud build completed in7seconds.
- Post-deploy: homepage, overview and all six case-study URLs returned200 with one H1 each. Live native playback reached the end of the58.8second video without a media error; subtitles loaded successfully. Mobile layout had no horizontal overflow.
- Public MP4 is821417bytes and its SHA256 matches the reviewed privacy-edited local asset. WebVTT notes returned200 with text/vtt.
- Error scan: the deployment's error-log query for the last15minutes returned no error entries at verification time. Drains and external monitoring configuration were not assessed or changed.
- No additional test enquiry was submitted during this deployment.
- Live screenshot: outputs/enquiry-recording-review/edited/live-video-player.jpg.
