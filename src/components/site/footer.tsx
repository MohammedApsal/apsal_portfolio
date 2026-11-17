import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PORTFOLIO_CONTACT } from "@/lib/portfolio-contact";

const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: PORTFOLIO_CONTACT.linkedInUrl },
  { label: "GitHub", icon: Github, href: PORTFOLIO_CONTACT.githubUrl },
  { label: "Email", icon: Mail, href: `mailto:${PORTFOLIO_CONTACT.email}` },
  { label: "WhatsApp", icon: MessageCircle, href: PORTFOLIO_CONTACT.projectWhatsAppUrl },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">Mohammed Apsal M</p>
          <p className="mt-2 text-sm text-muted-foreground">AI Automation Specialist</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Navigation
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Connect
          </h3>
          <div className="mt-4 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <social.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
          <a
            href={`mailto:${PORTFOLIO_CONTACT.email}`}
            className="mt-5 block text-xs text-muted-foreground hover:text-primary"
          >
            {PORTFOLIO_CONTACT.email}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{PORTFOLIO_CONTACT.location}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <p className="flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Mohammed Apsal M</span>
          <span>All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
