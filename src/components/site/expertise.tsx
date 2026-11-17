import { BarChart3, Bot, Code2 } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const groups = [
  {
    icon: BarChart3,
    title: "Digital Marketing",
    items: [
      "Lead Generation",
      "Meta Ads",
      "Social Media Strategy",
      "Content Strategy",
      "Marketing Automation",
      "Conversion-Focused Campaigns",
    ],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    items: [
      "AI Automation",
      "n8n Workflow Automation",
      "Generative AI",
      "AI Agents",
      "RAG Systems",
      "Prompt Engineering",
      "AI Lead Qualification",
      "CRM Automation",
      "WhatsApp Automation",
      "Customer Support Automation",
    ],
  },
  {
    icon: Code2,
    title: "Technical",
    items: [
      "Python",
      "SQL",
      "Data Analysis",
      "Machine Learning",
      "API Integrations",
      "Google Workspace Automation",
    ],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="Connected Capabilities"
          subtitle="Marketing, AI, and engineering capabilities that work together inside one system."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90}>
              <div className="h-full rounded-2xl border border-border bg-surface-2 p-5 transition-colors duration-300 hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-[0.1em] uppercase">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
