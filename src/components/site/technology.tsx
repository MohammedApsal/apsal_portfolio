import { Section } from "./section";
import { Reveal } from "./reveal";
const groups = [
  ["Workflow & integrations", "n8n", "APIs & webhooks", "Google Sheets", "Gmail", "Airtable"],
  ["AI & conversations", "Gemini", "OpenAI", "Supabase / RAG", "Vapi", "WhatsApp", "Telegram"],
  [
    "Development & growth",
    "Python",
    "SQL",
    "React",
    "Meta Ads",
    "Lead generation",
    "Landing Pages & CRO",
    "GA4 & Pixel Tracking",
  ],
];
export function Technology() {
  return (
    <Section id="technology" className="technology-section">
      <Reveal className="technology-layout">
        <h2>Tools I work with</h2>
        <div className="tech-groups">
          {groups.map(([title, ...tools]) => (
            <div key={title}>
              <h3>{title}</h3>
              <div className="tool-tags">
                {tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
