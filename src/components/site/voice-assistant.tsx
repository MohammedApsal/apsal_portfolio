import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function VoiceAssistant() {
  return (
    <Section id="voice-assistant" className="voice-section">
      <div className="voice-layout voice-overview">
        <Reveal className="voice-copy">
          <p className="eyebrow">Inside an AI project</p>
          <h2>From a conversation to a business action.</h2>
          <p className="section-description">
            A Vapi browser voice assistant with n8n workflows for business questions, appointment
            requests, and team notifications.
          </p>
          <p className="project-status">
            <span className="status-dot" />
            Architecture preview — built workflow, testing in progress.
          </p>
          <a href="/projects/voice-assistant-project" className="text-link mt-6">
            View Voice Assistant Project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal delay={80}>
          <figure className="voice-overview-image panel">
            <a
              href="/projects/voice-assistant-project"
              aria-label="View the AI Voice Assistant case study"
            >
              <img
                src="/workflows/voice-assistant.png"
                alt="n8n backend for the Vapi voice assistant, showing calendar, booking, knowledge responses, and notification workflows"
                width={1919}
                height={916}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>Vapi + n8n · Recorded browser tests</figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
