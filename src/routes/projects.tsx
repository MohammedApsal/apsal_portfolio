import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { CaseStudies } from "@/components/site/case-studies";
import { Footer } from "@/components/site/footer";
import { ChatLauncher } from "@/components/site/chat-launcher";

const title = "AI Automation Projects | Mohammed Apsal M";
const description =
  "Mohammed Apsal M builds AI assistants, lead qualification systems, business research, and enquiry workflows.";
const url = "https://apsalautomation.com/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: "https://apsalautomation.com/social-preview.png" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://apsalautomation.com/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="portfolio-site portfolio-projects min-h-screen bg-background">
      <SiteNav activePage="projects" />
      <main id="main-content" tabIndex={-1}>
        <CaseStudies />
      </main>
      <Footer />
      <ChatLauncher />
    </div>
  );
}
