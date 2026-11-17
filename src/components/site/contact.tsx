import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { enquirySchema, INDUSTRY_OPTIONS, BUDGET_OPTIONS, type Enquiry } from "@/lib/enquiry";
import { PORTFOLIO_CONTACT } from "@/lib/portfolio-contact";
import { Reveal } from "./reveal";
import { Heading, Section } from "./section";
const emptyForm: Enquiry = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  service: "Not Sure Yet",
  industry: "Other",
  budget: "Prefer to discuss",
  details: "",
  website: "",
};
// Keep integration values stable while displaying the automation offers.
const serviceChoices = [
  { value: "AI Workflow Automation", label: "Workflow automation" },
  { value: "CRM Automation", label: "Lead qualification & follow-up" },
  { value: "AI Agents & Customer Support", label: "AI assistant & customer support" },
  { value: "AI Voice Assistant", label: "AI voice assistant" },
  { value: "Not Sure Yet", label: "Not sure yet" },
] as const;
type EnquiryField = Exclude<keyof Enquiry, "website">;
type FieldErrors = Partial<Record<EnquiryField, string>>;

export function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const focusInvalidField = useRef(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const pendingSubmission = useRef<{ payload: string; id: string } | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);
  useEffect(() => {
    const chooseService = (event: Event) => {
      const requestedService = (event as CustomEvent<string>).detail;
      const service = serviceChoices.find(({ value }) => value === requestedService)?.value;
      if (service) setForm((current) => ({ ...current, service }));
    };
    window.addEventListener("select-service", chooseService);
    return () => window.removeEventListener("select-service", chooseService);
  }, []);
  useEffect(() => {
    if (!focusInvalidField.current) return;
    focusInvalidField.current = false;

    const field = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!field) return;
    const disclosure = field.closest("details");
    if (disclosure) disclosure.open = true;
    field.focus({ preventScroll: true });
    field.scrollIntoView({ block: "center", behavior: "instant" });
  }, [fieldErrors]);

  const change = (key: keyof Enquiry, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key !== "website" && fieldErrors[key]) {
      setFieldErrors((current) => {
        const remaining = { ...current };
        delete remaining[key];
        return remaining;
      });
    }
  };
  const errorAttributes = (field: EnquiryField) =>
    fieldErrors[field]
      ? { "aria-invalid": true, "aria-describedby": `enquiry-${field}-error` }
      : {};
  const fieldError = (field: EnquiryField) =>
    fieldErrors[field] && (
      <p className="field-error" id={`enquiry-${field}-error`}>
        {fieldErrors[field]}
      </p>
    );

  const validated = () => {
    const result = enquirySchema.safeParse(form);
    setFeedback(null);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof Enquiry | undefined;
        if (field && field !== "website") errors[field] ??= issue.message;
      }
      focusInvalidField.current = Object.keys(errors).length > 0;
      setFieldErrors(errors);
      if (!focusInvalidField.current) {
        setFeedback({ text: "Please check the enquiry fields and try again.", error: true });
      }
      return null;
    }
    return result.data;
  };
  const openDraft = () => {
    const data = validated();
    if (!data) return;
    const body = [
      "Name: " + data.name,
      "Business: " + (data.company || "Not provided"),
      "Email: " + data.email,
      "WhatsApp: " + (data.whatsapp || "Not provided"),
      "Service: " + data.service,
      "Industry: " + data.industry,
      "Budget: " + data.budget,
      "",
      "Business challenge:",
      data.details,
    ].join("\n");
    window.location.href =
      "mailto:" +
      PORTFOLIO_CONTACT.email +
      "?subject=" +
      encodeURIComponent("Free consultation request — " + data.service) +
      "&body=" +
      encodeURIComponent(body);
    setFeedback({
      text: "Your email draft is ready to open. Review and send it in your email app; the website has not sent it. If your email app did not open, use the email or WhatsApp link.",
      error: false,
    });
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const data = validated();
    if (!data) return;
    setBusy(true);
    try {
      const payload = JSON.stringify(data);
      if (pendingSubmission.current?.payload !== payload)
        pendingSubmission.current = { payload, id: window.crypto.randomUUID() };
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": pendingSubmission.current.id,
        },
        body: payload,
        signal: AbortSignal.timeout(30000),
      });
      const result = (await response.json()) as { message?: string };
      setFeedback({
        text: result.message || "We could not confirm receipt. Please use email or WhatsApp.",
        error: !response.ok,
      });
      if (response.ok) {
        pendingSubmission.current = null;
        setForm(emptyForm);
      }
    } catch {
      setFeedback({
        text: "We could not confirm that your enquiry was received. Please use an email draft or WhatsApp.",
        error: true,
      });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Section id="contact">
      <div className="contact-layout">
        <div>
          <Heading title="Request a free consultation">
            Tell me about the process, the tools you use, and where your team gets stuck.
          </Heading>
          <Reveal>
            <div className="contact-details">
              <a href={`mailto:${PORTFOLIO_CONTACT.email}`}>
                <Mail size={18} aria-hidden="true" />
                {PORTFOLIO_CONTACT.email}
              </a>
              <a href="tel:+919952337599">
                <Phone size={18} aria-hidden="true" />
                {PORTFOLIO_CONTACT.phone}
              </a>
              <p className="contact-location">
                <MapPin size={18} aria-hidden="true" />
                {PORTFOLIO_CONTACT.location}
              </p>
              <div className="flex gap-6 mt-2">
                <a href={PORTFOLIO_CONTACT.linkedInUrl} target="_blank" rel="noreferrer">
                  <Linkedin size={17} aria-hidden="true" />
                  LinkedIn
                </a>
                <a href={PORTFOLIO_CONTACT.githubUrl} target="_blank" rel="noreferrer">
                  <Github size={17} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
            <a
              href={PORTFOLIO_CONTACT.projectWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="site-button-secondary mt-8"
            >
              <MessageCircle size={17} aria-hidden="true" /> Start a WhatsApp Conversation{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <form
            id="project-enquiry"
            ref={formRef}
            method="post"
            noValidate
            onSubmit={submit}
            className="enquiry-form panel"
            aria-describedby="enquiry-help enquiry-next-step"
          >
            <h3>Tell me about your project</h3>
            <p id="enquiry-help" className="form-help">
              Tell me what you would like to achieve. Fields marked * are required.
            </p>
            <p id="enquiry-next-step" className="form-help">
              I’ll review your request and reply to arrange a free consultation.
            </p>
            <div className="form-fields">
              <div>
                <label htmlFor="enquiry-name">Full name *</label>
                <input
                  id="enquiry-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="form-field"
                  {...errorAttributes("name")}
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                  placeholder="Your full name"
                />
                {fieldError("name")}
              </div>

              <div>
                <label htmlFor="enquiry-email">Email address *</label>
                <input
                  id="enquiry-email"
                  name="email"
                  required
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  className="form-field"
                  {...errorAttributes("email")}
                  value={form.email}
                  onChange={(e) => change("email", e.target.value)}
                  placeholder="you@business.com"
                />
                {fieldError("email")}
              </div>

              <div className="form-wide">
                <label htmlFor="enquiry-service">Service of interest *</label>
                <select
                  id="enquiry-service"
                  name="service"
                  required
                  className="form-field"
                  {...errorAttributes("service")}
                  value={form.service}
                  onChange={(e) => change("service", e.target.value)}
                >
                  {serviceChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
                {fieldError("service")}
              </div>

              <div className="form-wide">
                <label htmlFor="enquiry-details">Project description *</label>
                <textarea
                  id="enquiry-details"
                  name="details"
                  rows={4}
                  minLength={15}
                  maxLength={3000}
                  required
                  className="form-field"
                  {...errorAttributes("details")}
                  value={form.details}
                  onChange={(e) => change("details", e.target.value)}
                  placeholder="What would you like to improve? Tell me about your goal or current process."
                />
                {fieldError("details")}
              </div>
              <details className="optional-fields form-wide">
                <summary>
                  Add business details <span>(optional)</span>
                </summary>
                <div className="form-fields">
                  <div>
                    <label htmlFor="enquiry-company">
                      Business name <span>(optional)</span>
                    </label>
                    <input
                      id="enquiry-company"
                      name="company"
                      maxLength={150}
                      autoComplete="organization"
                      className="form-field"
                      {...errorAttributes("company")}
                      value={form.company}
                      onChange={(e) => change("company", e.target.value)}
                      placeholder="Your business"
                    />
                    {fieldError("company")}
                  </div>
                  <div>
                    <label htmlFor="enquiry-whatsapp">
                      WhatsApp <span>(optional)</span>
                    </label>
                    <input
                      id="enquiry-whatsapp"
                      name="whatsapp"
                      type="tel"
                      maxLength={30}
                      autoComplete="tel"
                      className="form-field"
                      {...errorAttributes("whatsapp")}
                      value={form.whatsapp}
                      onChange={(e) => change("whatsapp", e.target.value)}
                      placeholder="+91…"
                    />
                    {fieldError("whatsapp")}
                  </div>
                  <div>
                    <label htmlFor="enquiry-industry">
                      Industry <span>(optional)</span>
                    </label>
                    <select
                      id="enquiry-industry"
                      name="industry"
                      className="form-field"
                      {...errorAttributes("industry")}
                      value={form.industry}
                      onChange={(e) => change("industry", e.target.value)}
                    >
                      {INDUSTRY_OPTIONS.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                    {fieldError("industry")}
                  </div>
                  <div>
                    <label htmlFor="enquiry-budget">
                      Budget range <span>(optional)</span>
                    </label>
                    <select
                      id="enquiry-budget"
                      name="budget"
                      className="form-field"
                      {...errorAttributes("budget")}
                      value={form.budget}
                      onChange={(e) => change("budget", e.target.value)}
                    >
                      {BUDGET_OPTIONS.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                    {fieldError("budget")}
                  </div>
                </div>
              </details>
              <div hidden aria-hidden="true">
                <label htmlFor="enquiry-website">Website</label>
                <input
                  id="enquiry-website"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.website}
                  onChange={(e) => change("website", e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="site-button-primary mt-6 w-full disabled:opacity-60"
            >
              {busy ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending
                  request…
                </>
              ) : (
                <>
                  Send Consultation Request <ArrowUpRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
            {feedback && (
              <div
                role={feedback.error ? "alert" : "status"}
                className="form-feedback"
                data-error={feedback.error}
              >
                {feedback.text}
              </div>
            )}
            <div className="form-fallback">
              <button type="button" disabled={busy} onClick={openDraft}>
                Prepare an email draft instead
              </button>
              <span className="text-[10px] text-muted-foreground">
                You review and send the draft.
              </span>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
