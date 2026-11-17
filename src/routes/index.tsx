import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { SelectedWork } from "@/components/site/selected-work";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ChatLauncher } from "@/components/site/chat-launcher";
const title = "Mohammed Apsal M | AI Automation Specialist";
const description =
  "Mohammed Apsal M builds AI assistants, lead qualification workflows, CRM integrations, and workflow automation for service businesses.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://apsalautomation.com/" },
      { property: "og:image", content: "https://apsalautomation.com/social-preview.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Mohammed Apsal M, AI Automation Specialist",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://apsalautomation.com/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://apsalautomation.com/" }],
  }),
  component: Index,
});
function Index() {
  return (
    <div className="portfolio-site portfolio-home min-h-screen bg-background">
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster />
      <ChatLauncher />
    </div>
  );
}
