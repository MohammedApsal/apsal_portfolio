import { Bot, Database, Megaphone, MessageCircle, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const nodes = [
  { label: "Attract", detail: "Meta Ads, content & landing pages", icon: Megaphone },
  { label: "Understand", detail: "Capture budget, location & intent", icon: Bot },
  { label: "Organize", detail: "Route details into your CRM", icon: Database },
  { label: "Follow up", detail: "Relevant WhatsApp & email touchpoints", icon: MessageCircle },
  { label: "Hand off", detail: "Your team takes the conversation forward", icon: Users },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The connected lead journey"
          title="From first click to a meaningful conversation."
          subtitle="An example workflow for a Chennai property agency—designed around buyer context, clear ownership and a human sales handoff."
        />
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface p-5 sm:p-8">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
            <ol className="relative grid gap-4 lg:grid-cols-5">
              {nodes.map((node, index) => (
                <li
                  key={node.label}
                  className="relative flex items-start gap-4 rounded-2xl border border-border bg-background/80 p-5 lg:flex-col lg:gap-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-glow">
                    <node.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div className="lg:mt-6">
                    <p className="text-[10px] tracking-widest text-muted-foreground">
                      STEP 0{index + 1}
                    </p>
                    <h3 className="mt-2 text-base font-semibold">{node.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {node.detail}
                    </p>
                  </div>
                  {index < nodes.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-4 left-10 h-4 w-px bg-primary/40 lg:top-10 lg:-right-4 lg:bottom-auto lg:left-auto lg:h-px lg:w-4"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="relative mt-6 flex flex-col gap-3 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>Automation handles the routine. Your team owns the relationship.</p>
              <span className="text-primary-glow">
                Illustrative workflow · Scoped to your business
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
