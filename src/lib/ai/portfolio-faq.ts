import { PORTFOLIO_CONTACT } from "../portfolio-contact.ts";

export { PORTFOLIO_CONTACT } from "../portfolio-contact.ts";

export const PORTFOLIO_CONTACT_ANSWER = `You can contact Mohammed Apsal M directly:

- **Email:** [${PORTFOLIO_CONTACT.email}](mailto:${PORTFOLIO_CONTACT.email})
- **Phone:** [${PORTFOLIO_CONTACT.phone}](tel:+919952337599)
- **WhatsApp:** [Start a conversation](${PORTFOLIO_CONTACT.whatsappUrl})
- **Free consultation:** [Request a consultation](${PORTFOLIO_CONTACT.contactUrl})

He is based in Chennai, India. I can share these details, but I cannot send a message or book a call on your behalf.`;

const ABOUT_ANSWER = `Mohammed Apsal M is a freelance AI Automation Specialist based in Chennai, India. He builds workflows, AI assistants, CRM integrations, and customer follow-up systems.

He studied B.Tech in Artificial Intelligence and Data Science at Saveetha University, Chennai (2026). Academic requirements are completed; the official degree certificate is awaited.

[Explore his projects](${PORTFOLIO_CONTACT.projectsUrl}) or [discuss your project](${PORTFOLIO_CONTACT.contactUrl}).`;

const SERVICES_ANSWER = `Apsal offers three freelance services:

- **Workflow Automation:** n8n, APIs, webhooks, Google Sheets, Airtable, CRM updates, and notifications.
- **Lead Qualification & Follow-up:** capture incoming enquiries, qualify and route leads, update the CRM, and set up follow-ups.
- **AI Assistants:** chat and voice workflows grounded in approved business information, with supported integrations and human handoffs. Voice assistant work is built, with testing in progress.

[Discuss your requirements](${PORTFOLIO_CONTACT.contactUrl}). Deliverables, pricing, timeline, and support are agreed per project.`;

const SKILLS_ANSWER = `Apsal's portfolio lists n8n, Python, SQL, APIs and webhooks, Google Sheets, Gmail, Airtable, React, Gemini, OpenAI, Supabase/RAG, Vapi, WhatsApp, and Telegram.

His project previews demonstrate automation work; they do not establish certifications or verified client results. [See the implementation previews](${PORTFOLIO_CONTACT.projectsUrl}).`;

const PROJECTS_ANSWER = `His selected projects include:

- **Website Enquiry Capture & Notification Automation:** the portfolio form uses signed server requests to Google Apps Script, Google Sheets, and a scheduled owner email worker. An internal test on 23 October 2026 verified saved receipt, duplicate handling and notification status Sent. The recording shows the earlier n8n version. This is a test result, not a client outcome.

- **Real Estate Lead Qualification:** an n8n workflow for buyer requirements, lead scoring, Airtable, WhatsApp replies, and human handoff. Client results and deployment are not verified.
- **RAG-Powered Customer Support:** document retrieval, Supabase, OpenAI, channel routing, logging, and human escalation. Outcomes are not verified.
- **Local Business Research Automation:** a recorded test using n8n, Apify, and Google Sheets; no commercial results are claimed.
- **AI Voice Assistant for Business:** Vapi browser test calls with n8n, Google Calendar, Sheets, Gmail, and Telegram. **Built workflow, testing in progress.** Edited browser recordings demonstrate booking and rescheduling conversations. No telephone number or separate telephony provider is connected. [Watch the browser demos](${PORTFOLIO_CONTACT.projectsUrl}/voice-assistant-project).

[View the projects and their current status](${PORTFOLIO_CONTACT.projectsUrl}).`;

const N8N_ANSWER = `Yes. Apsal builds n8n workflows for lead capture and qualification, customer support, CRM updates, follow-ups, and business tool integrations.

His portfolio enquiry flow was originally built with n8n Cloud, Google Sheets, and Gmail, with recorded internal test evidence. The current form uses Google Apps Script for signed intake and scheduled email notifications. Other work includes real estate and RAG previews, a recorded n8n/Apify/Google Sheets test, and a Vapi voice assistant backend that is **built, with testing in progress**. These previews do not prove client deployments or measured business results.

[View his work](${PORTFOLIO_CONTACT.projectsUrl}) or [discuss an automation](${PORTFOLIO_CONTACT.contactUrl}). I cannot run these workflows from the chat.`;

const SAMPLE_ANSWER = `This portfolio features Apsal's AI automation work. [See the current projects](${PORTFOLIO_CONTACT.projectsUrl}).`;

const person = "(?:apsal|mohammed apsal(?: m)?|him)";
const owner = "(?:his|apsal's|mohammed apsal(?: m)?'s)";
const topic =
  "(?:contact(?: details| information| info)?|email(?: address)?|phone(?: number)?|whatsapp(?: number)?|mobile(?: number)?|telephone(?: number)?)";

const FAQ_RULES: ReadonlyArray<{ patterns: readonly RegExp[]; answer: string }> = [
  {
    answer: PORTFOLIO_CONTACT_ANSWER,
    patterns: [
      new RegExp(`^(?:how (?:can|do) i|how to) (?:contact|reach|get in touch with) ${person}$`),
      new RegExp(`^can i (?:contact|reach|get in touch with) ${person}$`),
      new RegExp(`^what(?: is|'s| are) ${owner} ${topic}$`),
      new RegExp(`^(?:show|give|tell) me ${owner} ${topic}$`),
      new RegExp(`^${owner} ${topic}$`),
      /^(?:contact details|contact information|contact info|email address|phone number|whatsapp number)$/,
    ],
  },
  {
    answer: ABOUT_ANSWER,
    patterns: [
      /^who is (?:apsal|mohammed apsal(?: m)?)$/,
      /^(?:tell me about|about|introduce) (?:apsal|mohammed apsal(?: m)?)$/,
      new RegExp(`^what (?:is|are) ${owner} (?:background|education|qualifications)$`),
    ],
  },
  {
    answer: SERVICES_ANSWER,
    patterns: [
      new RegExp(`^what services does (?:he|apsal|mohammed apsal(?: m)?) (?:offer|provide)$`),
      new RegExp(`^(?:show|tell) me (?:about )?${owner} services$`),
      new RegExp(`^what (?:are|is) ${owner} services$`),
      new RegExp(`^${owner} services$`),
    ],
  },
  {
    answer: SKILLS_ANSWER,
    patterns: [
      new RegExp(`^what (?:are|is) ${owner} (?:skills|tech stack|tools)$`),
      new RegExp(`^what (?:skills|tools|technologies) does (?:he|apsal) (?:have|use|know)$`),
      new RegExp(`^(?:show|tell) me (?:about )?${owner} (?:skills|tech stack|tools)$`),
      new RegExp(`^${owner} (?:skills|tech stack|tools)$`),
    ],
  },
  {
    answer: PROJECTS_ANSWER,
    patterns: [
      /^what (?:ai |automation |n8n )?projects has (?:he|apsal|mohammed apsal(?: m)?) (?:built|done|created)$/,
      /^what has (?:he|apsal) built$/,
      new RegExp(`^(?:show|tell) me (?:about )?${owner} (?:ai |automation |n8n )?projects$`),
      new RegExp(`^what (?:are|is) ${owner} (?:ai |automation |n8n )?projects$`),
    ],
  },
  {
    answer: N8N_ANSWER,
    patterns: [
      /^can (?:he|apsal|mohammed apsal(?: m)?) (?:build|create) n8n (?:automations|workflows)$/,
      /^does (?:he|apsal) (?:build|create) n8n (?:automations|workflows)$/,
      /^does (?:he|apsal) (?:use|know|work with) n8n$/,
    ],
  },
  {
    answer: SAMPLE_ANSWER,
    patterns: [
      /^(?:tell me about|what is|show me) (?:the |his |apsal's )?sample (?:campaign|marketing campaign|campaign strategy|case study)$/,
      /^what (?:are|were) the (?:sample campaign|sample marketing campaign) results$/,
      /^is the (?:sample campaign|property lead campaign strategy) (?:real|a live campaign)$/,
    ],
  },
];

/**
 * Deliberately matches complete common questions, rather than keywords. Complex,
 * negative, multi-intent, or unrelated requests must pass to the model instead.
 */
export function answerPortfolioQuestion(question: string): string | null {
  if (typeof question !== "string" || question.length > 250) return null;
  const normalized = question
    .normalize("NFKC")
    .replace(/[’‘]/g, "'")
    .trim()
    .toLowerCase()
    .replace(/^(?:hi|hello|hey)[,!]?\s+/, "")
    .replace(/[?!.]+$/, "")
    .replace(/,?\s+please$/, "")
    .replace(/\s+/g, " ")
    .trim();

  for (const rule of FAQ_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(normalized))) return rule.answer;
  }
  return null;
}
