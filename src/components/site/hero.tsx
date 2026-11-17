import { ArrowUpRight, MapPin } from "lucide-react";

import { CONSULTATION_CTA } from "@/lib/portfolio-contact";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="home" className="automation-hero">
      <div className="site-container automation-hero-layout">
        <Reveal className="automation-hero-copy">
          <h1>
            <span>AI automation</span> <span>for business.</span>
          </h1>
          <p>
            I build AI assistants and workflows that qualify enquiries, answer customer questions,
            and keep your business tools in sync.
          </p>
          <div className="automation-hero-actions">
            <a href="#contact" className="site-button-primary">
              {CONSULTATION_CTA} <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="#selected-work" className="site-button-secondary">
              Explore My Work
            </a>
          </div>
          <p className="automation-hero-location">
            <MapPin size={18} aria-hidden="true" /> Chennai, India · Available for projects
          </p>
        </Reveal>
        <Reveal delay={80}>
          <figure className="automation-portrait">
            <img
              src="/images/apsal-portrait-cutout.webp"
              alt="Mohammed Apsal M"
              width={960}
              height={1433}
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>
              <strong>Mohammed Apsal M</strong>
              <span>AI Automation Specialist</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
