import { Reveal } from "./reveal";
import { Heading, Section } from "./section";
const steps = [
  [
    "Discover",
    "Understand your business problem, customers, existing tools, and the steps that need attention.",
  ],
  [
    "Scope & Quote",
    "Agree the deliverables, integrations, timeline, and price before the work begins.",
  ],
  [
    "Build & Test",
    "Implement the agreed work and test the customer journey, integrations, and relevant failure cases.",
  ],
  [
    "Handover & Support",
    "Provide documentation and walkthroughs, with any ongoing support defined in your proposal.",
  ],
];
export function Process() {
  return (
    <Section id="process" className="process-section">
      <Heading title="How I work" />
      <ol className="process-timeline">
        {steps.map(([title, desc], i) => (
          <Reveal as="li" key={title} delay={i * 60}>
            <span className="process-number" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
