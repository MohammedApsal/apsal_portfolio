import { ClipboardList, ShieldCheck, Workflow, Table2, Mail, CheckCircle2 } from "lucide-react";

const stages = [
  {
    title: "Website Form",
    detail: "Four required fields capture the project enquiry.",
    icon: ClipboardList,
  },
  {
    title: "Server Validation",
    detail: "Validate the enquiry and sign the request with a server-only key.",
    icon: ShieldCheck,
  },
  {
    title: "Google Apps Script",
    detail: "Verify the signature and check the submission ID before saving.",
    icon: Workflow,
  },
  { title: "Google Sheets", detail: "Save the enquiry as a structured lead record.", icon: Table2 },
  {
    title: "Email Notification",
    detail: "A scheduled worker emails the owner and records notification status.",
    icon: Mail,
  },
];

export function EnquiryWorkflowPreview() {
  return (
    <section className="enquiry-proof" aria-labelledby="enquiry-flow-title">
      <div className="proof-heading">
        <div>
          <p className="eyebrow">Inside the implementation</p>
          <h2 id="enquiry-flow-title">From enquiry to an organised next step.</h2>
        </div>
        <span className="proof-label">Static workflow preview</span>
      </div>
      <ol className="enquiry-flow" aria-label="Enquiry processing order">
        {stages.map(({ title, detail, icon: Icon }, index) => (
          <li key={title}>
            <span className="flow-number">0{index + 1}</span>
            <Icon size={24} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
      <div className="receipt-note">
        <CheckCircle2 size={22} aria-hidden="true" />
        <div>
          <h3>Saved first. Receipt next. Owner alert follows.</h3>
          <p>
            After Google Sheets saves the lead, Apps Script confirms receipt to the website. The
            email worker checks every minute, subject to Google's scheduling and quotas. An
            uncertain send is marked for review without losing the enquiry.
          </p>
        </div>
      </div>
      <div className="verified-test">
        <div>
          <span className="eyebrow">Verified internal test</span>
          <p>Own portfolio · 23 October 2026</p>
        </div>
        <ul aria-label="Verified test results">
          <li>
            <CheckCircle2 size={16} aria-hidden="true" /> Enquiry saved
          </li>
          <li>
            <CheckCircle2 size={16} aria-hidden="true" /> Owner notification sent
          </li>
          <li>
            <CheckCircle2 size={16} aria-hidden="true" /> Status recorded: Sent
          </li>
        </ul>
      </div>
      <p className="proof-caption">
        Illustrated from the built workflow and its verified internal test. No private lead records
        are displayed.
      </p>
    </section>
  );
}
