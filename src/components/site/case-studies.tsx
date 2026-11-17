import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONSULTATION_CTA } from "@/lib/portfolio-contact";
import {
  featuredProjects,
  findProject,
  projectHref,
  projects,
  type PortfolioProject,
} from "@/lib/projects";
import { Reveal } from "./reveal";
import { Heading, Section } from "./section";

const projectOrder = [
  ...featuredProjects,
  ...projects.filter((project) => !featuredProjects.includes(project)),
];

function ProjectVisual({ project }: { project: PortfolioProject }) {
  return project.image ? (
    <img
      src={project.image}
      alt={project.alt}
      width={1919}
      height={918}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className="project-mini-flow" aria-label={`${project.title}: workflow overview`}>
      {(project.id === "enquiry-automation"
        ? ["Website enquiry", "Apps Script + Google Sheets", "Receipt + email notification"]
        : ["Research request", "n8n + Apify", "Structured Google Sheets list"]
      ).map((step, i) => (
        <div className="mini-flow-step" key={step}>
          {i > 0 && <span aria-hidden="true">↓</span>}
          <div>{step}</div>
        </div>
      ))}
      <small>Workflow overview · Illustrated</small>
    </div>
  );
}

export function CaseStudies() {
  useEffect(() => {
    // Fragments never reach the server. Card IDs also provide a no-JavaScript fallback.
    const followLegacyLink = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const project = findProject(id);
      if (project) window.location.replace(projectHref(project.id));
    };
    followLegacyLink();
    window.addEventListener("hashchange", followLegacyLink);
    return () => window.removeEventListener("hashchange", followLegacyLink);
  }, []);

  return (
    <Section id="case-studies" className="projects-page">
      <a href="/#home" className="text-link mb-8">
        <span aria-hidden="true">←</span> Back to Home
      </a>
      <Heading as="h1" title="AI automation projects">
        Explore the workflows I built, how they work, and what I’ve tested.
      </Heading>
      <div className="project-grid">
        {projectOrder.map((project, i) => (
          <Reveal key={project.id} delay={i * 35}>
            <article id={project.id} className="project-card panel">
              <a
                href={projectHref(project.id)}
                className="project-image-link"
                aria-label={`View case study: ${project.title}`}
              >
                <ProjectVisual project={project} />
                <span className="image-action">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </a>
              <div className="project-content">
                <p className="eyebrow">{project.category}</p>
                <h2>{project.title}</h2>
                <p className="card-description">{project.summary}</p>
                <div className="tool-tags">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <p>{project.status}</p>
                  <a href={projectHref(project.id)} className="text-link">
                    View Case Study <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="projects-enquiry panel">
        <div>
          <h2>What would you like to automate?</h2>
          <p className="card-description">
            Tell me about the process that takes up your team’s time.
          </p>
        </div>
        <a href="/#contact" className="site-button-primary">
          {CONSULTATION_CTA} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
