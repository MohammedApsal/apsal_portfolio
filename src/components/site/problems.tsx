import { Clock, Filter, Layers, MessageSquare } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const problems = [
  {
    icon: Filter,
    title: "Enquiries without context",
    body: "Your team needs customer requirements and buying intent alongside each enquiry.",
    response: "Structured lead qualification",
  },
  {
    icon: Clock,
    title: "Follow-ups that slip",
    body: "New enquiries and follow-up reminders are easy to miss when every next step is manual.",
    response: "Timely follow-up workflows",
  },
  {
    icon: MessageSquare,
    title: "The same questions, again",
    body: "Routine product and service questions take time away from conversations that need a person.",
    response: "Knowledge-backed AI support",
  },
  {
    icon: Layers,
    title: "Details scattered everywhere",
    body: "Forms, WhatsApp and spreadsheets make it difficult to see who owns the next action.",
    response: "Connected CRM and team handoffs",
  },
];

export function Problems() {
  return (
    <section id="problems" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Sound familiar?"
            title="More enquiries shouldn’t mean more chaos."
            subtitle="Attracting the right audience is only the start. I connect marketing and automation around the gaps between an enquiry and the next action."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <Reveal key={problem.title} delay={index * 60}>
                <article className="h-full rounded-2xl border border-border bg-surface p-6">
                  <problem.icon aria-hidden="true" className="h-5 w-5 text-primary-glow" />
                  <h3 className="mt-4 text-base font-semibold">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {problem.body}
                  </p>
                  <p className="mt-5 border-t border-border pt-4 text-xs font-medium text-primary-glow">
                    {problem.response}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
