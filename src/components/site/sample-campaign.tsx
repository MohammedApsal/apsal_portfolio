import { CampaignCreatives, CampaignJourney, CampaignLandingPreview } from "./campaign-visuals";

export function SampleCampaign() {
  return (
    <article
      className="sample-campaign campaign-study panel"
      aria-label="Sample campaign case study"
    >
      <p className="campaign-study-intro">
        A self-initiated concept for a fictional Chennai property business, connecting campaign
        messaging, a focused landing page, and structured lead follow-up.
      </p>
      <p className="sample-status">
        Sample campaign — no live ad spend or measured campaign results.
      </p>
      <div className="campaign-detail-grid">
        <section>
          <h2>Business problem & objective</h2>
          <p>
            Property interest needs a clear next step. The proposed objective is to generate
            relevant site-visit enquiries and evaluate lead quality alongside acquisition cost.
          </p>
          <p>
            Audience hypothesis: people exploring a home purchase in Chennai who need clarity on
            location, budget fit, and viewing options. Research would validate this before launch.
          </p>
        </section>
        <section>
          <h2>My contribution</h2>
          <p>
            I created the campaign strategy, two visual ad concepts, a landing-page wireframe, and a
            measurement plan. The proposed journey connects acquisition to qualification and a sales
            handoff.
          </p>
          <p>
            These illustrative assets show my approach to messaging and conversion design. A real
            business would need to approve its offer, property information, photography, and consent
            wording before implementation.
          </p>
        </section>
      </div>
      <section className="campaign-study-section" aria-labelledby="campaign-tools-heading">
        <h2 id="campaign-tools-heading">Tools & proposed workflow</h2>
        <p>
          Proposed tools: Meta Ads, a focused landing page, analytics with UTM tracking, and n8n
          with a CRM. The separate real estate qualification project demonstrates the follow-up
          workflow.
        </p>
        <CampaignJourney />
      </section>
      <section className="campaign-study-section" aria-labelledby="campaign-creative-heading">
        <div className="campaign-visual-section-heading">
          <div>
            <span className="eyebrow">Messaging made visible</span>
            <h2 id="campaign-creative-heading">Two creative directions. One useful next step.</h2>
          </div>
          <span className="campaign-visual-label">Sample ad concepts</span>
        </div>
        <CampaignCreatives />
      </section>
      <section className="campaign-study-section" aria-labelledby="campaign-landing-heading">
        <div className="campaign-visual-section-heading">
          <div>
            <span className="eyebrow">From interest to enquiry</span>
            <h2 id="campaign-landing-heading">A focused landing-page wireframe</h2>
          </div>
          <span className="campaign-visual-label">Static concept</span>
        </div>
        <CampaignLandingPreview />
      </section>
      <div className="campaign-detail-grid">
        <section>
          <h2>Testing & evidence plan</h2>
          <p>
            Use campaign and creative UTM tags. Record landing-page visits, successful enquiries,
            qualified leads, and confirmed visits. Connect the enquiry ID to CRM status to
            distinguish submissions from useful opportunities.
          </p>
          <p>
            Before launch: check mobile layout, source attribution, validation, duplicate handling,
            consent, and receipt in the CRM. Compare creative concepts under comparable conditions
            and change one variable at a time.
          </p>
        </section>
        <section>
          <h2>Outcome & current limitations</h2>
          <p>
            The deliverable is a sample strategy with visual concepts. No campaign has been
            launched. CTR, cost per lead, qualification rate, and site-visit conversion are not
            available.
          </p>
          <p>
            Next: validate the offer and assets with a real business, implement the page and
            tracking, then run an approved pilot. This concept does not represent a client
            engagement or a verified property listing.
          </p>
        </section>
      </div>
      <aside className="campaign-measurement-note" aria-label="Planned campaign measures">
        <span className="eyebrow">Planned measurement</span>
        <p>
          CTR = link clicks ÷ impressions · Cost per lead = spend ÷ valid enquiries · Qualification
          rate = qualified leads ÷ valid enquiries · Visit conversion = confirmed visits ÷ qualified
          leads. Report date range, spend, and counts alongside each metric after launch.
        </p>
      </aside>
    </article>
  );
}
