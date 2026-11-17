import { Eye, Gauge, Handshake, Inbox, ListChecks, Workflow } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const outcomes = [
  { icon: Eye, title: "More Visibility", body: "Reach and engage relevant audiences." },
  {
    icon: Inbox,
    title: "More Enquiries",
    body: "Build systems that attract and capture potential customers.",
  },
  {
    icon: Gauge,
    title: "Faster Responses",
    body: "Automate customer communication and lead follow-up.",
  },
  {
    icon: Workflow,
    title: "Less Manual Work",
    body: "Replace repetitive processes with automation.",
  },
  {
    icon: ListChecks,
    title: "Smarter Lead Management",
    body: "Qualify and organize opportunities using automated workflows.",
  },
  {
    icon: Handshake,
    title: "Better Customer Experience",
    body: "Provide faster and more relevant customer interactions.",
  },
];

const reasons = [
  "Solving real business problems",
  "Practical implementation",
  "Connecting existing business tools",
  "Reducing repetitive manual work",
  "Improving customer experience",
  "Combining marketing and technology",
];

export function Outcomes() {
  return (
    <section id="outcomes" className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Business Outcomes"
          title="Technology That Solves Real Business Problems"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, index) => (
            <Reveal key={outcome.title} delay={index * 60}>
              <div className="glass h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                  <outcome.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{outcome.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{outcome.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass overflow-hidden rounded-3xl p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
                  Why Work With Me
                </span>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  Practical AI. <span className="text-gradient">Real Business Problems.</span>
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  I don&apos;t automate processes just because I can. I focus on the parts of a
                  business where automation can genuinely save time, improve follow-up, and simplify
                  operations.
                </p>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
