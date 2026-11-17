import { ArrowUpRight, Bot, Check, GitBranch, Workflow } from "lucide-react";
import { Reveal } from "./reveal";
import { Heading, Section } from "./section";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Connect the tools your team uses and cut the manual work between them.",
    items: [
      "n8n workflows, APIs, and webhooks",
      "Google Sheets, Airtable, and CRM updates",
      "Notifications and recurring tasks",
    ],
    cta: "Discuss a workflow",
    service: "AI Workflow Automation",
  },
  {
    icon: GitBranch,
    title: "Lead Qualification & Follow-up",
    desc: "Keep enquiries organised and connect your team's next steps across the tools you already use.",
    items: [
      "Capture and qualify incoming enquiries",
      "Route leads and update your CRM",
      "Set up email or WhatsApp follow-up",
    ],
    cta: "Discuss lead automation",
    service: "CRM Automation",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    desc: "Help customers find approved business information and route requests to the right workflow or person.",
    items: [
      "Chat and voice workflows",
      "Answers based on approved information",
      "Appointment requests and human handoffs",
    ],
    cta: "Discuss an AI assistant",
    service: "AI Agents & Customer Support",
  },
];

export function Services() {
  return (
    <Section id="services">
      <Heading title="What I can automate">
        Start with the work that keeps coming back to your team.
      </Heading>
      <div className="service-grid">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 45}>
            <article className="service-card panel">
              <span className="icon-box">
                <s.icon size={21} aria-hidden="true" />
              </span>
              <h3>{s.title}</h3>
              <p className="card-description">{s.desc}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("select-service", { detail: s.service }))
                }
                className="text-link"
              >
                {s.cta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
