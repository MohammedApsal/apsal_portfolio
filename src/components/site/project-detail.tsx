import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CONSULTATION_CTA } from "@/lib/portfolio-contact";
import type { PortfolioProject } from "@/lib/projects";
import { EnquiryWorkflowPreview } from "./enquiry-workflow-preview";
import { EnquiryRecording } from "./enquiry-recording";
import { VoiceArchitecture } from "./voice-architecture";
import { VoiceRecordings } from "./voice-recordings";
import { Section } from "./section";

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  return (
    <Section id={project.id} className="project-detail-page">
      <a href="/projects" className="text-link project-back">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
      </a>
      <header className="project-detail-heading">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="section-description">{project.summary}</p>
        <p className="work-status">{project.status}</p>
      </header>
      <article className="case-study-detail panel">
        {project.id === "enquiry-automation" && (
          <>
            <EnquiryWorkflowPreview />
            <EnquiryRecording
              durationLabel="0:59 walkthrough"
              note="Silent walkthrough · edited for privacy. Recorded on 17 October 2026 using the earlier n8n version. The current enquiry backend uses Google Apps Script."
              steps={[
                {
                  time: "00:00",
                  label: "Choose a service and describe the project. The email field is masked.",
                },
                {
                  time: "00:20",
                  label: "Add optional business details. Contact information is hidden.",
                },
                { time: "00:34", label: "Submit the enquiry and wait for the result." },
                { time: "00:41", label: "The website confirms that the enquiry was received." },
                { time: "00:44", label: "The matching n8n execution shows Succeeded." },
                {
                  time: "00:48",
                  label:
                    "Google Sheets contains the saved lead and Notification Status: Sent. Identifying cells are masked.",
                },
                {
                  time: "00:54",
                  label:
                    "Gmail shows the owner notification. Contact details and the enquiry ID are masked.",
                },
              ]}
            />
          </>
        )}
        {project.id === "voice-assistant-project" && <VoiceRecordings />}
        <div className="case-study-grid">
          <section>
            <h2>Business problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>What I personally built</h2>
            <p>{project.contribution}</p>
          </section>
          <section>
            <h2>Tools & integrations</h2>
            <div className="tool-tags">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>
          <section>
            <h2>How the workflow works</h2>
            <ol>
              {project.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2>Testing & evidence</h2>
            <p>{project.testing}</p>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="text-link mt-4">
                Watch Demo on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </section>
          <section>
            <h2>Outcome & current status</h2>
            <p>{project.outcome}</p>
          </section>
        </div>
        {project.image && (
          <figure className="case-study-figure">
            <a
              href={project.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`View full workflow image: ${project.title}`}
            >
              <img
                src={project.image}
                alt={project.alt}
                width={1919}
                height={918}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>
              <span>Actual implementation screenshot</span>
              <a href={project.image} target="_blank" rel="noreferrer" className="text-link">
                View Workflow Image <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        )}
        {project.id === "voice-assistant-project" && <VoiceArchitecture />}
      </article>
      <div className="project-detail-actions">
        <a href="/projects" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
        </a>
        <a href="/#contact" className="site-button-primary">
          {CONSULTATION_CTA} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
