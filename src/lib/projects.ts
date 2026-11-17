export const LEAD_DEMO_URL =
  "https://www.linkedin.com/posts/mohammedapsal16_n8n-aiautomation-leadgeneration-activity-7500436376526417920-G847";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  contribution: string;
  tools: string[];
  steps: string[];
  testing: string;
  outcome: string;
  status: string;
  image?: string;
  alt?: string;
  demo?: string;
};

export const projectHref = (id: string) => `/projects/${id}`;

export function findProject(id: string) {
  return projects.find((project) => project.id === id);
}

export const projects: PortfolioProject[] = [
  {
    id: "enquiry-automation",
    title: "Website Enquiry Capture & Notification Automation",
    category: "Lead management / Portfolio implementation",
    summary:
      "A working enquiry journey from this website to an organised lead record and an email notification.",
    problem:
      "A website form needs a dependable way to save enquiries and tell the business owner that a new conversation needs attention.",
    contribution:
      "I built this portfolio's enquiry flow, originally with n8n Cloud, and migrated the live intake to Google Apps Script. The server signs validated requests, Google Sheets stores the lead, and a scheduled worker sends the owner email. Submission IDs prevent duplicate retries, and notification status is tracked separately from saved receipt.",
    tools: ["Website form", "Google Apps Script", "Google Sheets", "Email notifications"],
    steps: [
      "Validate the enquiry on the server and sign the request to Google Apps Script.",
      "Check the submission ID and save a new lead in Google Sheets.",
      "Confirm receipt to the visitor after the lead is saved.",
      "Send the owner email through the scheduled worker and record its notification status.",
    ],
    testing:
      "An internal test on 23 October 2026 verified the Google Apps Script migration: the fictional enquiry was saved, an identical retry created no duplicate, an invalid signature was rejected, and the notification worker recorded Sent. The privacy-edited recording from 17 October 2026 demonstrates the earlier n8n implementation; it is historical evidence, not a recording of the current backend.",
    outcome:
      "Verified implementation test on my own portfolio. The result demonstrates the enquiry-to-notification path; it is not a client outcome, measured sales improvement, or response-time guarantee.",
    status: "Google Apps Script integration · Internal test 23 Oct 2026",
  },
  {
    id: "lead-generation",
    title: "Local Business Research Automation",
    category: "Research automation",
    summary:
      "An n8n and Apify workflow that organises collected local business information in Google Sheets.",
    problem:
      "Collecting and organising relevant business information manually makes prospect research repetitive.",
    contribution:
      "I built an n8n workflow connecting Apify lead collection to Google Sheets, producing a structured list for research and review.",
    tools: ["n8n", "Apify", "Google Sheets"],
    steps: [
      "Start the business research request.",
      "Use Apify to collect business information through the workflow.",
      "Organise the collected information in Google Sheets for review.",
    ],
    testing:
      "The linked LinkedIn recording demonstrates a test run. It is evidence of the workflow demonstration; list accuracy, ongoing reliability, and suitability for a particular campaign still need to be checked.",
    outcome:
      "Built workflow with a recorded test demonstration. No booked meetings, sales, or commercial campaign results are claimed.",
    status: "Built workflow · Recorded test demo",
    demo: LEAD_DEMO_URL,
  },
  {
    id: "real-estate",
    title: "Real Estate Lead Qualification",
    category: "Lead intelligence / Real estate",
    summary:
      "A workflow for buyer requirements, lead scoring, Airtable updates, and human handoffs.",
    problem:
      "Buyer enquiries need structured requirements before a sales team can decide on the next conversation.",
    contribution:
      "I built an n8n AI qualification workflow using Gemini and Airtable. The supplied implementation includes buyer requirement extraction, lead-fit scoring, WhatsApp responses, and a route to human handling.",
    tools: ["n8n", "Gemini", "Airtable", "WhatsApp"],
    steps: [
      "Look up the lead in Airtable and check whether a person is already handling the conversation.",
      "Retrieve property context and process the buyer's requirements.",
      "Calculate a lead score and update the lead record.",
      "Route the next step to a reply or human handoff.",
    ],
    testing:
      "The workflow screenshot documents the implementation structure. A recorded end-to-end test and live deployment verification are still needed before presenting this as a deployed client system.",
    outcome:
      "Built workflow preview. No verified client deployment, qualification accuracy, or sales result is claimed.",
    status: "Built workflow · Deployment not verified",
    image: "/workflows/real-estate.png",
    alt: "n8n real estate qualification workflow showing lead lookup, Gemini, lead scoring, Airtable updates, and human handoff",
  },
  {
    id: "rag-support",
    title: "RAG-Powered Customer Support",
    category: "Knowledge retrieval / Customer support",
    summary:
      "Business-document retrieval connected to AI responses, channel routing, and human escalation.",
    problem:
      "Repeated customer questions need answers grounded in approved business information and a clear route to a person when needed.",
    contribution:
      "I built an n8n support workflow with document retrieval, Supabase/vector search, OpenAI, conversation logging, and response or human-escalation routes.",
    tools: ["n8n", "Supabase", "OpenAI", "Vector search"],
    steps: [
      "Receive and normalise a customer message.",
      "Retrieve relevant business context for the AI response.",
      "Route the supported response through the appropriate channel.",
      "Log the conversation and escalate requests that need human handling.",
    ],
    testing:
      "The supplied screenshot shows the built workflow. A documented evaluation of answer accuracy, unsupported questions, and escalation behaviour remains to be published.",
    outcome:
      "Built implementation preview. Live deployment, support-resolution rates, and client outcomes are not verified.",
    status: "Built workflow · Deployment not verified",
    image: "/workflows/rag-support.png",
    alt: "n8n RAG support workflow with document retrieval, multi-channel responses, conversation logging, and escalation",
  },
  {
    id: "voice-assistant-project",
    title: "AI Voice Assistant for Business",
    category: "Voice conversations / Business workflows",
    summary:
      "Vapi browser test calls connected to n8n for business questions and appointment workflows.",
    problem:
      "Customer conversations need to connect a spoken request to the right business information or action.",
    contribution:
      "I built a Vapi voice assistant with browser-based test calls and n8n backend workflows connected to Google Calendar, Google Sheets, Gmail, and Telegram.",
    tools: ["Vapi", "n8n", "Google Calendar", "Google Sheets", "Gmail", "Telegram"],
    steps: [
      "Receive a browser test call through Vapi.",
      "Interpret the request and route it to the relevant n8n workflow.",
      "Coordinate the supported business-tool action and return its result.",
      "Deliver a spoken response through Vapi.",
    ],
    testing:
      "Edited browser-test recordings from 18 October 2026 demonstrate booking and rescheduling conversations, with captions and transcripts. Contact details and pauses are removed, and some screen frames are held briefly for readability. Broader end-to-end reliability testing is still in progress; no telephone number or separate telephony provider is connected.",
    outcome:
      "Architecture preview — built workflow, testing in progress. The architecture shows the intended integration; it is not a production telephone service.",
    status: "Architecture preview — built workflow, testing in progress.",
    image: "/workflows/voice-assistant.png",
    alt: "n8n Vapi voice receptionist backend with intent routing, Calendar availability, booking, rescheduling, Google Sheets updates, Gmail, and Telegram",
  },
];

export const featuredProjects = ["voice-assistant-project", "real-estate", "enquiry-automation"]
  .map(findProject)
  .filter((project) => project !== undefined);
