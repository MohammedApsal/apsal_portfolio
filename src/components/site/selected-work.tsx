import { ArrowUpRight, ClipboardList, Mail, Table2 } from "lucide-react";
import { featuredProjects, projectHref } from "@/lib/projects";
import { Heading, Section } from "./section";
import { Reveal } from "./reveal";

const enquirySteps = [
  { name: "Website enquiry", icon: ClipboardList },
  { name: "Lead saved in Google Sheets", icon: Table2 },
  { name: "Owner notified by email", icon: Mail },
];

export function SelectedWork() {
  return (
    <Section id="selected-work" className="selected-work-section">
      <div className="selected-work-heading">
        <Heading title="Selected work" />
        <a href="/projects" className="text-link">
          View All Projects <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="selected-work-grid">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 45} className={project.image ? "" : "featured-wide"}>
            <article className="selected-work-card panel">
              <div className="featured-copy">
                <h3>{project.title}</h3>
                <p className="card-description">{project.summary}</p>
                <p className="work-status">{project.status}</p>
              </div>
              {project.image ? (
                <figure className="selected-work-preview">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={1919}
                    height={918}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ) : (
                <div className="selected-work-preview enquiry-preview">
                  <ol aria-label="Enquiry workflow">
                    {enquirySteps.map(({ name, icon: Icon }) => (
                      <li key={name}>
                        <Icon size={18} aria-hidden="true" />
                        {name}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <a
                href={projectHref(project.id)}
                className="text-link"
                aria-label={`View case study: ${project.title}`}
              >
                {project.id === "voice-assistant-project"
                  ? "View Voice Assistant Project"
                  : "View Case Study"}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
