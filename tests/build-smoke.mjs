import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
const isNetlify = process.env.NETLIFY === "true";
const { default: server } = await import(
  isNetlify
    ? "../.netlify/functions-internal/server/_ssr/ssr.mjs"
    : "../.vercel/output/functions/__server.func/_ssr/ssr.mjs"
);
const staticDirectory = isNetlify ? "dist" : ".vercel/output/static";
const origin = "https://apsalautomation.com";
const response = await server.fetch(new Request(origin + "/"), {}, {});
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
assert.match(html, /Mohammed Apsal M \| AI Automation Specialist/);
assert.match(html, /Request a Free Consultation/);
assert.match(html, /mailto:mohammed@apsalautomation\.com/);
assert.doesNotMatch(html, /mohammedapsal16@gmail\.com/);
assert.match(html, /<h1><span>AI automation<\/span>/);
assert.equal((html.match(/digital marketing/gi) || []).length, 1);
assert.match(html, /I also work on digital marketing and build my personal brand\./);
assert.match(html, /Architecture preview — built workflow, testing in progress/);
assert.match(html, /rel="canonical" href="https:\/\/apsalautomation.com\/"/);
assert.match(html, /<a\b[^>]*href="\/projects"[^>]*>\s*Projects\s*<\/a>/);
const projectCards = (document) =>
  [...document.matchAll(/<article\b[^>]*class="([^"]*)"/g)].filter((match) =>
    match[1].split(/\s+/).includes("project-card"),
  ).length;
assert.equal(projectCards(html), 0, "Detailed project cards should live on the projects page");
assert.equal((html.match(/class="selected-work-card panel"/g) || []).length, 3);
assert.equal((html.match(/class="service-card panel"/g) || []).length, 3);
assert.match(html, /<details class="optional-fields form-wide">/);
assert.match(html, /Project description \*/);
assert.match(html, /I’ll review your request and reply to arrange a free consultation\./);
const enquiryForm = html.match(/<form\b[^>]*id="project-enquiry"[^>]*>([\s\S]*?)<\/form>/)?.[1];
assert.ok(enquiryForm, "Missing primary enquiry form");
const requiredFields = [...enquiryForm.matchAll(/<(?:input|select|textarea)\b([^>]*)>/g)]
  .filter((match) => /\brequired(?:\s|=|$)/.test(match[1]))
  .map((match) => match[1].match(/\bname="([^"]+)"/)?.[1]);
assert.deepEqual(requiredFields, ["name", "email", "service", "details"]);
assert.doesNotMatch(html, /Explore the architecture/);

const projectsResponse = await server.fetch(new Request(origin + "/projects"), {}, {});
assert.equal(projectsResponse.status, 200);
const projectsHtml = await projectsResponse.text();
assert.equal((projectsHtml.match(/<h1[ >]/g) || []).length, 1);
assert.match(projectsHtml, /rel="canonical" href="https:\/\/apsalautomation.com\/projects"/);
assert.match(projectsHtml, /id="case-studies"/);
assert.equal(projectCards(projectsHtml), 5);
assert.doesNotMatch(projectsHtml, /sample-campaign|Property Lead Campaign Strategy/);
assert.doesNotMatch(projectsHtml, /class="case-study-stack"/);
assert.doesNotMatch(projectsHtml, /<h[23][^>]*>Testing &amp; evidence/);
assert.doesNotMatch(projectsHtml, /Explore the architecture/);

const projectPages = [
  ["enquiry-automation", "Website Enquiry Capture &amp; Notification Automation"],
  ["lead-generation", "Local Business Research Automation"],
  ["real-estate", "Real Estate Lead Qualification"],
  ["rag-support", "RAG-Powered Customer Support"],
  ["voice-assistant-project", "AI Voice Assistant for Business"],
];
const documents = new Map([
  ["/", html],
  ["/projects", projectsHtml],
]);
for (const [id, title] of projectPages) {
  const path = `/projects/${id}`;
  assert.ok(projectsHtml.includes(title), "Missing selected project " + title);
  assert.ok(projectsHtml.includes(`id="${id}"`), "Missing old-hash fallback " + id);
  assert.ok(projectsHtml.includes(`href="${path}"`), "Missing direct case-study link " + path);
  const detailResponse = await server.fetch(new Request(origin + path), {}, {});
  assert.equal(detailResponse.status, 200, "Direct case study must render on the server: " + path);
  const detailHtml = await detailResponse.text();
  assert.equal((detailHtml.match(/<h1[ >]/g) || []).length, 1, "Expected one h1 on " + path);
  assert.ok(detailHtml.includes(title), "Missing project title on " + path);
  assert.ok(
    detailHtml.includes(`rel="canonical" href="${origin}${path}"`),
    "Incorrect case-study canonical on " + path,
  );
  assert.match(detailHtml, /Back to Projects/);
  assert.match(detailHtml, /Request a Free Consultation/);
  assert.equal(projectCards(detailHtml), 0, "Case-study route should not repeat overview cards");
  documents.set(path, detailHtml);
}

const missingResponse = await server.fetch(
  new Request(origin + "/projects/unknown-project"),
  {},
  {},
);
assert.equal(missingResponse.status, 404, "Unknown projects must return a real HTTP 404");
const missingHtml = await missingResponse.text();
assert.match(missingHtml, /Page not found/);
assert.doesNotMatch(missingHtml, /rel="canonical"/);
const architectureLink = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].find((match) =>
  match[2].includes("View Voice Assistant Project"),
);
assert.ok(architectureLink, "Missing voice architecture link");
assert.match(architectureLink[1], /href="\/projects\/voice-assistant-project"/);
assert.doesNotMatch(architectureLink[1], /target="_blank"/);

const enquiryHtml = documents.get("/projects/enquiry-automation");
assert.match(enquiryHtml, /Static workflow preview/);
const enquiryFlow = enquiryHtml.match(/<ol\b[^>]*class="enquiry-flow"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
assert.ok(enquiryFlow, "Missing enquiry workflow preview");
assert.equal((enquiryFlow.match(/<li[ >]/g) || []).length, 5);
let previousStage = -1;
for (const stage of [
  "Website Form",
  "Server Validation",
  "Google Apps Script",
  "Google Sheets",
  "Email Notification",
]) {
  const position = enquiryFlow.indexOf(stage);
  assert.ok(position > previousStage, "Incorrect enquiry processing order at " + stage);
  previousStage = position;
}
assert.match(enquiryHtml, /Saved first\. Receipt next\. Owner alert follows\./);
assert.match(
  enquiryHtml,
  /After Google Sheets saves the lead, Apps Script confirms receipt to the website/,
);
assert.match(enquiryHtml, /23 October 2026/);
assert.match(enquiryHtml, /earlier n8n version/);
assert.match(enquiryHtml, /Enquiry saved/);
assert.match(enquiryHtml, /Owner notification sent/);
const enquiryRecordings = [...enquiryHtml.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/g)];
assert.equal(
  enquiryRecordings.length,
  1,
  "The enquiry case study should keep its single reviewed recording",
);
const recording = enquiryRecordings[0]?.[0];
assert.ok(recording, "Missing reviewed enquiry recording");
assert.match(recording, /controls=""/);
assert.match(recording, /playsInline=""/);
assert.match(recording, /preload="metadata"/);
assert.match(recording, /poster="\/demos\/enquiry-automation-poster.webp"/);
assert.match(recording, /src="\/demos\/enquiry-automation.mp4" type="video\/mp4"/);
assert.match(recording, /kind="subtitles"/);
assert.match(recording, /src="\/demos\/enquiry-automation-notes.vtt"/);
assert.doesNotMatch(recording, /autoPlay|autoplay/);
assert.match(enquiryHtml, /Recorded internal test · 17 October 2026/);
assert.match(enquiryHtml, /Silent walkthrough · edited for privacy/);
for (const [path, document] of documents) {
  assert.doesNotMatch(document, /Apsal M\./i, "Use the name without a trailing dot on " + path);
  if (!["/projects/enquiry-automation", "/projects/voice-assistant-project"].includes(path)) {
    assert.doesNotMatch(
      document,
      /<video\b/,
      "Demo players belong only on their detail pages: " + path,
    );
  }
}
for (const file of [
  "enquiry-automation.mp4",
  "enquiry-automation-poster.webp",
  "enquiry-automation-notes.vtt",
]) {
  await access(staticDirectory + "/demos/" + file);
}

const archivedCampaign = await server.fetch(
  new Request(origin + "/projects/sample-campaign"),
  {},
  {},
);
assert.equal(archivedCampaign.status, 404, "The retired marketing case study is no longer public");

const voiceHtml = documents.get("/projects/voice-assistant-project");
assert.match(voiceHtml, /Architecture preview — built workflow, testing in progress\./);
assert.match(voiceHtml, /Explore the architecture/);
const voiceRecordings = [...voiceHtml.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/g)].map(
  (match) => match[0],
);
assert.equal(
  voiceRecordings.length,
  2,
  "Expected booking and rescheduling browser test recordings",
);
for (const demo of ["voice-booking", "voice-rescheduling"]) {
  const player = voiceRecordings.find((markup) => markup.includes(`src="/demos/${demo}.mp4"`));
  assert.ok(player, "Missing voice recording " + demo);
  assert.match(player, /controls=""/);
  assert.match(player, /playsInline=""/);
  assert.match(player, /preload="metadata"/);
  assert.match(player, /aria-label="[^"]+"/);
  assert.ok(player.includes(`poster="/demos/${demo}-poster.webp"`), "Missing poster for " + demo);
  assert.ok(
    player.includes(`src="/demos/${demo}.mp4" type="video/mp4"`),
    "Incorrect media source or type for " + demo,
  );
  assert.doesNotMatch(player, /autoPlay|autoplay/);
  const captionTracks = [...player.matchAll(/<track\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(captionTracks.length, 1, "Expected a single English caption track for " + demo);
  assert.match(captionTracks[0], /kind="captions"/);
  assert.match(captionTracks[0], /srcLang="en"/i);
  assert.match(captionTracks[0], /label="[^"]*English[^"]*"/);
  assert.match(captionTracks[0], /\bdefault=""/);
  assert.ok(
    captionTracks[0].includes(`src="/demos/${demo}-en.vtt"`),
    "Missing English caption source for " + demo,
  );
  for (const suffix of [".mp4", "-poster.webp", "-en.vtt"]) {
    await access(`${staticDirectory}/demos/${demo}${suffix}`);
  }
  const captions = await readFile(`${staticDirectory}/demos/${demo}-en.vtt`, "utf8");
  assert.match(captions, /^WEBVTT\b/);
  assert.match(captions, /\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}/);
}

const idsByPath = new Map(
  [...documents].map(([path, document]) => [
    path,
    new Set([...document.matchAll(/id="([^"]+)"/g)].map((match) => match[1])),
  ]),
);
for (const [path, document] of documents) {
  for (const [, href] of document.matchAll(/href="([^"]+)"/g)) {
    const target = new URL(href.replaceAll("&amp;", "&"), origin + path);
    if (target.origin !== origin) continue;
    const targetPath = target.pathname.replace(/\/$/, "") || "/";
    if (!documents.has(targetPath)) {
      await access(staticDirectory + target.pathname);
      assert.equal(target.hash, "", `Unexpected hash on static asset ${href} linked from ${path}`);
      continue;
    }
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1));
      assert.ok(idsByPath.get(targetPath)?.has(id), `Missing target ${href} linked from ${path}`);
    }
  }
}
const images = [
  ...new Set(
    [...documents.values()].flatMap((document) =>
      [...document.matchAll(/<img[^>]*src="([^"]+)"/g)].map((match) => match[1]),
    ),
  ),
];
for (const image of images) {
  if (image.startsWith("/")) await access(staticDirectory + image);
}
for (const path of [
  "/social-preview.png",
  "/favicon.svg",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
])
  await access(staticDirectory + path);
const sitemap = await readFile(staticDirectory + "/sitemap.xml", "utf8");
assert.doesNotMatch(sitemap, /sample-campaign/);
for (const path of documents.keys()) {
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), "Missing sitemap URL " + path);
}
const valid = {
  name: "Test Visitor",
  company: "Example Business",
  email: "visitor@example.com",
  whatsapp: "",
  service: "AI Voice Assistant",
  industry: "Other",
  budget: "Prefer to discuss",
  details: "Please discuss a browser voice assistant workflow.",
  website: "",
};
const enquiry = await server.fetch(
  new Request(origin + "/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify(valid),
  }),
  {},
  {},
);
assert.equal(enquiry.status, 503);
assert.match((await enquiry.json()).message, /not been sent/);
const invalid = await server.fetch(
  new Request(origin + "/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify({ ...valid, email: "invalid" }),
  }),
  {},
  {},
);
assert.equal(invalid.status, 400);
const chat = await server.fetch(
  new Request(origin + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify({
      messages: [
        {
          id: "contact-smoke",
          role: "user",
          parts: [{ type: "text", text: "How can I contact him?" }],
        },
      ],
    }),
  }),
  {},
  {},
);
assert.equal(chat.status, 200);
assert.match(await chat.text(), /mohammed@apsalautomation\.com/);
console.log("Built homepage: 200; one h1; current title, canonical and voice status verified.");
console.log(
  "Built projects overview and five direct case studies: 200; one h1 and correct canonical each.",
);
console.log(
  "Unknown case study: 404 without a misleading canonical; legacy hash fallback IDs and direct case links verified.",
);
console.log(
  "Enquiry workflow order, saved-first receipt, verified evidence, retired marketing case study and voice architecture verified.",
);
console.log(
  "One enquiry recording and two voice browser demos: native controls, metadata preload, posters, captions and emitted media verified.",
);
console.log(
  "Three homepage highlights, three services, optional form details and voice case-study link verified.",
);
console.log(
  "Navigation targets and sitemap across all seven routes and " +
    images.length +
    " image paths verified against " + (isNetlify ? "Netlify" : "Vercel") + " output.",
);
console.log("Built enquiry API: 503 when unconfigured; 400 for invalid input.");
console.log("Built chat API: contact FAQ works without provider credentials.");
