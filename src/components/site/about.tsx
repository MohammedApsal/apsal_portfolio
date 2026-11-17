import { GraduationCap, ArrowUpRight } from "lucide-react";
import { CONSULTATION_CTA, PORTFOLIO_CONTACT } from "@/lib/portfolio-contact";
import { Reveal } from "./reveal";
import { Section } from "./section";
export function About() {
  return (
    <Section id="about">
      <div className="about-layout">
        <Reveal className="about-portrait">
          <img
            src="/images/apsal-portrait-cutout.webp"
            alt="Mohammed Apsal M"
            width={960}
            height={1433}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p>Mohammed Apsal M</p>
            <span>{PORTFOLIO_CONTACT.location}</span>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <h2>About me</h2>
          <div className="about-introduction">
            <p>
              I’m Mohammed Apsal M, an <strong>AI Automation Specialist</strong> based in Chennai. I
              build workflows that connect the tools businesses already use.
            </p>
            <p>
              I start with the steps your team repeats every day, then build and test a workflow
              your team can understand and maintain.
            </p>
            <p className="about-secondary">
              I also work on digital marketing and build my personal brand.
            </p>
          </div>
          <div className="education">
            <GraduationCap size={24} className="shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3>B.Tech in Artificial Intelligence and Data Science</h3>
              <p>Saveetha University, Chennai</p>
            </div>
          </div>
          <a href="#contact" className="text-link">
            {CONSULTATION_CTA} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
