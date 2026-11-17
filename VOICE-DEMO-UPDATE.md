# Voice assistant demo update — 18 October 2026

Local preview: http://127.0.0.1:5173/projects/voice-assistant-project

Deployed to production on 18 October 2026 after the user's deployment request. No GitHub push was performed.

Live page: https://apsalportfolio.vercel.app/projects/voice-assistant-project

Vercel deployment: `dpl_6xzP7rbqukJPgXzum7Lkb6cyiSCh`, project `apsal/apsal_portfolio`, status READY. The tested build was uploaded, checked at its deployment URL, then promoted to the public domain. The public page, videos, posters, architecture image, and captions returned successful responses. Both live players advanced without media errors, caption tracks loaded, the browser console was clear, and no error logs were found for the new deployment during the post-release check. No new live enquiry or Vapi test call was sent.

## Included demos

- Featured booking demo: 1:12 (72.2 seconds), approximately 2.5 MB.
- Additional rescheduling demo: 1:06 (66.4 seconds), approximately 2 MB.
- Both use the previously corrected audio, native playback controls, English captions, downloadable MP4s, and expandable transcripts. Neither autoplays.
- The homepage and architecture copy now point readers toward the recordings. The portfolio assistant's project facts also reflect their availability.

The project keeps its existing status: **Architecture preview — built workflow, testing in progress.** These are Vapi browser test conversations with an n8n backend. No telephone number or separate telephony provider is connected.

## Editing and evidence limits

Pauses and private contact exchanges were removed. The Vapi account sidebar and internal assistant identifier are excluded or masked. Selected screen frames are held to keep contact history hidden and tool responses readable; the page discloses this editing. Original source recordings remain unchanged.

The booking excerpt shows the request, availability conversation, and spoken confirmation. The rescheduling excerpt shows a changed appointment time and a hypothetical question about an occupied slot. That question does **not** prove that a real conflicting booking was attempted or prevented. The clips do not independently establish production reliability, downstream notification delivery, or client results.

Captions follow the saved call transcript with punctuation edited for readability. Review pronunciation or caption wording when watching the local preview if further editorial changes are desired.

## Verification

- TypeScript and targeted ESLint checks passed.
- All 24 existing chat, enquiry, and portfolio FAQ tests passed.
- Production build and extended production smoke checks passed, including direct case-study routes, old anchor compatibility, media assets, captions, and existing enquiry/assistant handling.
- Both MP4s decoded successfully with FFmpeg.
- Both browser players reached the end without a media error; English caption tracks loaded and displayed.
- Keyboard transcript disclosure and native video controls were checked.
- Desktop, 820 px tablet, and 390 px mobile layouts were reviewed with no horizontal overflow.
- Privacy review included the held frames and 1 fps samples throughout the moving excerpts. No private contact values were found in those samples.
- No live enquiry, Vapi call, email, or other external test message was sent for this update.

## Files

Public media are in `public/demos/voice-booking*` and `public/demos/voice-rescheduling*`. The player component is `src/components/site/voice-recordings.tsx`; transcript data are in `src/lib/voice-recordings.ts`.

The reproducible local media edit script and cut manifest are saved outside the app under `outputs/voice-recording-review/build-portfolio-demos.py` and `outputs/voice-recording-review/portfolio-edit/public-edit-manifest.json` in the workspace root. Preview screenshots are saved alongside that manifest.
