import { Building2, HeartPulse, ShoppingBag, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Heading, Section } from "./section";
const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    problem: "Property enquiries lost to slow callbacks and unorganised campaign leads.",
    solution:
      "Capture high-intent buyers with dedicated property landing pages, automate instant WhatsApp brochure delivery, qualify budget & configuration, and route site-visit requests to your sales team in seconds.",
  },
  {
    icon: HeartPulse,
    title: "Clinics & Healthcare",
    problem: "Front-desk staff overwhelmed by routine questions and missed booking calls.",
    solution:
      "Automate approved clinic FAQs, appointment slot checks, and instant WhatsApp/voice booking workflows with staff alerts—while routing sensitive health questions to human staff.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & D2C",
    problem: "Repeated order questions and missed customer follow-ups.",
    solution:
      "Explore order-status support, customer messaging, abandoned-cart follow-up, and repeatable support workflows.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Service Businesses & SMEs",
    problem: "Disconnected tools turn daily admin into repetitive work.",
    solution:
      "Connect lead capture, CRM updates, customer follow-ups, notifications, and internal processes.",
  },
];
export function Industries() {
  return (
    <Section id="industries" className="industry-section">
      <Heading
        eyebrow="Your industry, your workflow"
        title="AI and Digital Growth for Your Business"
      >
        A practical approach shaped around your customers, team, and existing tools. These are
        possible solutions, scoped to each business.
      </Heading>
      <div className="industry-grid">
        {industries.map((x, i) => (
          <Reveal key={x.title} delay={i * 40}>
            <article className="industry-card">
              <x.icon size={24} className="text-primary mb-6" aria-hidden="true" />
              <h3>{x.title}</h3>
              <p>{x.problem}</p>
              <div>
                <ArrowRight size={16} aria-hidden="true" />
                <p>{x.solution}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
