import { createFileRoute, notFound } from "@tanstack/react-router";
import { findProject, projectHref } from "@/lib/projects";
import { SiteNav } from "@/components/site/nav";
import { ProjectDetail } from "@/components/site/project-detail";
import { Footer } from "@/components/site/footer";
import { ChatLauncher } from "@/components/site/chat-launcher";

export const Route = createFileRoute("/projects_/$projectId")({
  loader: ({ params }) => {
    const project = findProject(params.projectId);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData: project }) => {
    if (!project)
      return {
        meta: [
          { title: "Project not found | Mohammed Apsal M" },
          { name: "robots", content: "noindex" },
        ],
      };
    const title = `${project.title} | Mohammed Apsal M`;
    const url = `https://apsalautomation.com${projectHref(project.id)}`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://apsalautomation.com/social-preview.png" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: project.summary },
        { name: "twitter:image", content: "https://apsalautomation.com/social-preview.png" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return (
    <div className="portfolio-site min-h-screen bg-background">
      <SiteNav activePage="projects" />
      <main id="main-content" tabIndex={-1}>
        <ProjectDetail project={project} />
      </main>
      <Footer />
      <ChatLauncher />
    </div>
  );
}
