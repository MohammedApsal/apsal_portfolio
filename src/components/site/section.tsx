import type { ReactNode } from "react";
import { Reveal } from "./reveal";
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`site-section ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
export function Heading({
  eyebrow,
  title,
  children,
  as: Title = "h2",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Title>{title}</Title>
      {children && <p className="section-description">{children}</p>}
    </Reveal>
  );
}
