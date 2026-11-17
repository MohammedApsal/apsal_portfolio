# Redesign check results — 10 October 2026

Implemented locally in work/portfolio/apsal-growth-ai-main.

Passed:

- TypeScript: no errors.
- Production build: Vercel output and Node.js server functions generated.
- ESLint: zero errors; seven existing component-export development warnings remain.
- Seven enquiry handler tests: configured acceptance, unconfigured delivery, invalid input, oversized input, bot honeypot, cross-origin rejection, malformed JSON, provider failure and unsafe configuration cases covered.
- Built homepage response: HTTP 200 equivalent through the compiled server handler, one h1, correct title, canonical link and exact confirmed voice status.
- All internal navigation targets exist.
- All three homepage image sources exist in the Vercel output; favicon, social card, sitemap and robots files also exist.
- Built enquiry route: 503 when configuration is missing and 400 for invalid input.
- Built chat route: unavailable response without Gemini credentials.
- Actual portrait optimized from about 1.1 MB to about 22 KB WebP.
- Chat now loads on interaction; page-specific route bundle about 80 KB rather than about 400 KB.
- Original workflow screenshots preserved intact; verified existing demo link retained.
- Source-only ZIP excludes dependencies, build output and private environment files.

Verification limits:

- The browser and native JavaScript runtimes could not initialize: “failed to write kernel assets: The system cannot find the path specified. (os error 3)”. Reset and retry did not resolve it.
- Local HTTP checks timed out even after network access was granted; therefore route/asset verification used the compiled server handler and output files directly.
- Desktop, tablet and mobile rendered layouts, interactive focus behavior and horizontal overflow have not been visually verified. Responsive styles and accessibility controls are implemented, but those source checks do not replace a browser review.
- No real enquiries, voice calls or AI responses were sent. Real integrations require configuration and end-to-end verification.
- The redesigned version has not been pushed or published. Existing live deployment remains separate.

## Reference hero update — 11 October 2026

Portrait-led first screen implemented from the owner's reference. TypeScript, targeted lint and Vercel build pass. The running homepage and portrait return HTTP 200; internal anchors remain valid. Browser runtime initialization still fails, so rendered visual comparison remains unverified.

## Premium visual refinement — 11 October 2026

Unified deep navy/charcoal surfaces and blue/violet gradients; added restrained glass styling to navigation, voice console and enquiry form, soft ambient backgrounds, rounded panels, readable supporting text and gentle interaction feedback. All five service cards retain the same blue hover/focus glow. Entrance delays now correctly stagger animations, with reduced-motion support preserved. Existing responsive grids, content and workflow images remain intact.

TypeScript, targeted ESLint and the production build passed. Local HTTP 200 checks confirm all sections, five service cards, the actual voice workflow image and updated styles are served. Source color checks show primary gradient buttons exceed 7:1 contrast for dark text and shared muted text exceeds 7.7:1 on inspected panel backgrounds. Browser initialization still fails, so final rendered visual and interaction verification remains unavailable. Changes remain local.

## Separate Projects page — 11 October 2026

Selected Work now lives at /projects, with its own page heading, canonical URL, shared navigation/footer, four preserved projects and a contact CTA. Homepage, footer and mobile navigation links lead to the new page; voice architecture and contact links correctly return to the homepage. The Projects URL is included in the sitemap.

Production build and built routing smoke checks passed: both pages return 200 and contain one h1, only /projects contains the four project cards, internal fragment targets resolve across pages, and all four image assets exist. The existing unconfigured API checks still pass. Local direct requests for both URLs also return 200. Browser visual verification remains unavailable; changes remain local.

## Section continuity — 11 October 2026

Industry Solutions and Process now share a transparent ambient gradient. Replaced the previous 208px desktop transition with responsive spacing of 56–84px; removed opaque section fills and full-width dividers from Industry, voice preview and technology sections. Industry cards have equal padding, natural content height and 4/2/1 responsive columns. The process timeline uses 4/2/1 columns with a vertical mobile connector. The 96px navigation offset also covers the skip-link target, and header transitions preserve its dimensions.

Production build, TypeScript, targeted ESLint and existing built routing/API smoke checks passed. The in-app automation runtimes still fail to initialize, but fresh Chrome browser testing through the preinstalled Playwright package succeeded against the actual local preview. Rendered checks passed at 1440, 1024, 768 and 390px widths: no horizontal overflow, no clipped card/step text, equal card padding, correct column counts, transparent connected section backgrounds and no full-width section borders. Desktop, tablet and mobile screenshots were inspected and saved in outputs/continuity-*.png; measured layout results are in outputs/continuity-browser-results.json. Changes remain local.

Normal-motion browser navigation checks also passed at 1440, 768 and 390px: Services, Process and Contact headings remain below the fixed header; mobile menus close; header height remains 73px; and navigation from /projects correctly returns to /#process. Results are saved in outputs/continuity-navigation-results.json. Reduced-motion checks additionally cover Home and About navigation.
