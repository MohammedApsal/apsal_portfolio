import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CONSULTATION_CTA } from "@/lib/portfolio-contact";
import { cn } from "@/lib/utils";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteNav({ activePage }: { activePage?: "projects" } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
      className={cn(
        "site-nav fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-background focus:p-3 focus:text-foreground"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="/#home" className="font-display text-lg leading-none font-semibold tracking-tight">
          Mohammed <span className="block">Apsal M</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                activePage === "projects" && link.href === "/projects" ? "page" : undefined
              }
              className="rounded-full px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="nav-project-cta hidden rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[var(--glow-primary)] sm:inline-flex"
          >
            {CONSULTATION_CTA} →
          </a>
          <button
            ref={menuButton}
            aria-controls="mobile-navigation"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col px-5 py-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                activePage === "projects" && link.href === "/projects" ? "page" : undefined
              }
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
