import { ArrowRight, Check, CheckCircle2, MapPin, SlidersHorizontal } from "lucide-react";
import "../../campaign-visuals.css";

const locationAdHeadline = "Your next home starts with the right location.";

function LocationIllustration() {
  return (
    <svg viewBox="0 0 480 210" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20 145 120 36l110 33 67-44 160 89M15 75l101 43 112-9 73 78 162-29M92 210l33-91 104-10 7-105M328 0l-30 80 69 51 74 79"
        stroke="#77a9e0"
        strokeOpacity=".2"
        strokeWidth="18"
      />
      <path
        d="M20 145 120 36l110 33 67-44 160 89M15 75l101 43 112-9 73 78 162-29M92 210l33-91 104-10 7-105M328 0l-30 80 69 51 74 79"
        stroke="#a0c9f4"
        strokeOpacity=".13"
        strokeWidth="1"
      />
      <path
        d="m119 119 109-10 72-29 67 51"
        stroke="#78b8ff"
        strokeWidth="3"
        strokeDasharray="6 6"
      />
      <circle
        cx="229"
        cy="108"
        r="39"
        fill="#468fff"
        fillOpacity=".09"
        stroke="#73b6ff"
        strokeOpacity=".2"
      />
      <circle
        cx="229"
        cy="108"
        r="19"
        fill="#468fff"
        fillOpacity=".17"
        stroke="#73b6ff"
        strokeOpacity=".3"
      />
      <circle cx="229" cy="108" r="6" fill="#a4d4ff" />
      <circle cx="119" cy="119" r="4" fill="#b9a6ff" />
      <circle cx="367" cy="131" r="4" fill="#b9a6ff" />
      <rect
        x="250"
        y="38"
        width="111"
        height="25"
        rx="12.5"
        fill="#15273f"
        stroke="#80b7ff"
        strokeOpacity=".3"
      />
      <text x="305.5" y="54" textAnchor="middle" fill="#c3ddff" fontSize="9" letterSpacing="1.4">
        LOCATION FIT
      </text>
    </svg>
  );
}

function HomeIllustration() {
  return (
    <svg viewBox="0 0 480 210" fill="none" aria-hidden="true" focusable="false">
      <circle cx="348" cy="58" r="89" fill="#9481ff" fillOpacity=".05" />
      <path
        d="M0 193h480M78 174l74-43 237 43M143 153V73l94-34 98 34v80l-98 39-94-39Z"
        stroke="#6fa5e5"
        strokeOpacity=".2"
      />
      <path
        d="m146 73 91-34 97 34-97 34-91-34Z"
        fill="#243e61"
        stroke="#6899d7"
        strokeOpacity=".5"
      />
      <path d="m146 73 91 34v81l-91-36V73Z" fill="#142941" stroke="#6899d7" strokeOpacity=".4" />
      <path d="m237 107 97-34v79l-97 36v-81Z" fill="#1b314f" stroke="#6899d7" strokeOpacity=".5" />
      <path
        d="m160 94 19 7v23l-19-8V94Zm33 13 19 7v23l-19-8v-22Zm-33 25 19 7v23l-19-8v-22Zm33 13 19 7v23l-19-8v-22Z"
        fill="#6baaf1"
        fillOpacity=".22"
      />
      <path
        d="m253 114 23-8v27l-23 8v-27Zm37-13 25-9v27l-25 9v-27Zm-37 49 23-8v27l-23 8v-27Zm37-13 25-9v27l-25 9v-27Z"
        fill="#9d9bff"
        fillOpacity=".3"
      />
      <path
        d="M115 155v25m0-56c-23 20-20 39 0 39 20 0 23-19 0-39Zm251 10v39m0-66c-25 22-22 41 0 41s25-19 0-41Z"
        stroke="#7bb6b8"
        strokeOpacity=".5"
        strokeWidth="2"
      />
      <path d="m96 185 140 20 143-28" stroke="#6594d4" strokeOpacity=".25" />
    </svg>
  );
}

export function CampaignCreatives() {
  return (
    <div className="campaign-visual-creatives">
      <figure className="campaign-visual-ad">
        <div className="campaign-visual-ad-header">
          <span className="campaign-visual-avatar" aria-hidden="true">
            CH
          </span>
          <div>
            <strong>Chennai home search</strong>
            <span>Fictional advertiser · Sample concept A</span>
          </div>
          <span className="campaign-visual-ad-marker" aria-hidden="true">
            01
          </span>
        </div>
        <div className="campaign-visual-art campaign-visual-art-map">
          <LocationIllustration />
          <span>
            <MapPin size={12} /> Chennai / Location study
          </span>
        </div>
        <div className="campaign-visual-ad-copy">
          <span className="campaign-visual-kicker">Location clarity</span>
          <h3>{locationAdHeadline}</h3>
          <p>Compare neighbourhood fit, everyday connections, and available viewing options.</p>
          <div className="campaign-visual-ad-footer">
            <span>Request property details</span>
            <ArrowRight size={18} aria-hidden="true" />
          </div>
        </div>
        <figcaption>
          Schematic map and proposed ad copy. No real location pin or property offer.
        </figcaption>
      </figure>
      <figure className="campaign-visual-ad campaign-visual-ad-violet">
        <div className="campaign-visual-ad-header">
          <span className="campaign-visual-avatar" aria-hidden="true">
            CH
          </span>
          <div>
            <strong>Chennai home search</strong>
            <span>Fictional advertiser · Sample concept B</span>
          </div>
          <span className="campaign-visual-ad-marker" aria-hidden="true">
            02
          </span>
        </div>
        <div className="campaign-visual-art campaign-visual-art-home">
          <HomeIllustration />
          <span>
            <SlidersHorizontal size={12} /> Your requirements first
          </span>
        </div>
        <div className="campaign-visual-ad-copy">
          <span className="campaign-visual-kicker">Guided discovery</span>
          <h3>Find a home that fits your requirements.</h3>
          <p>
            Share your preferred area, budget range, and purchase timeline to start a useful
            conversation.
          </p>
          <div className="campaign-visual-ad-footer">
            <span>Plan a site visit</span>
            <ArrowRight size={18} aria-hidden="true" />
          </div>
        </div>
        <figcaption>
          Illustrative architecture and proposed ad copy. No verified listing or visit availability.
        </figcaption>
      </figure>
    </div>
  );
}

const journey = [
  ["Ad", "A clear, relevant promise"],
  ["Landing Page", "Offer and property context"],
  ["Enquiry", "Requirements with consent"],
  ["Qualification", "Area, budget and timeline"],
  ["Sales Handoff", "Context for the next conversation"],
];

export function CampaignJourney() {
  return (
    <ol className="campaign-visual-journey" aria-label="Proposed campaign journey">
      {journey.map(([title, detail], index) => (
        <li key={title}>
          <span className="campaign-visual-step">0{index + 1}</span>
          <strong>{title}</strong>
          <span>{detail}</span>
          {index < journey.length - 1 && (
            <ArrowRight className="campaign-visual-journey-arrow" size={16} aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}

export function CampaignLandingPreview() {
  return (
    <figure className="campaign-visual-landing">
      <div className="campaign-visual-browser" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>LANDING PAGE / SAMPLE WIREFRAME</span>
      </div>
      <div className="campaign-visual-landing-body">
        <div className="campaign-visual-landing-copy">
          <span className="campaign-visual-kicker">Chennai home search · Fictional concept</span>
          <h3>
            Start with the location.
            <br />
            <em>Find your fit.</em>
          </h3>
          <p>
            Tell us what matters to you. Explore property information that fits your requirements.
          </p>
          <div className="campaign-visual-property-art">
            <HomeIllustration />
            <span>Illustrative property visual</span>
          </div>
          <div className="campaign-visual-property-info">
            <div>
              <MapPin size={14} aria-hidden="true" />
              <strong>Location</strong>
              <span>Verified area & connectivity</span>
            </div>
            <div>
              <Check size={14} aria-hidden="true" />
              <strong>Property details</strong>
              <span>Approved features & availability</span>
            </div>
          </div>
        </div>
        <div
          className="campaign-visual-form-preview"
          role="group"
          aria-label="Static enquiry form illustration; no information is collected"
        >
          <span className="campaign-visual-kicker">01 / Enquiry layout</span>
          <h3>What are you looking for?</h3>
          <p>Static layout — fields and actions are illustrative.</p>
          <div className="campaign-visual-field">
            <span>Name</span>
            <div>Visitor name</div>
          </div>
          <div className="campaign-visual-field">
            <span>Contact</span>
            <div>Email or phone number</div>
          </div>
          <div className="campaign-visual-field">
            <span>Requirements</span>
            <div>Preferred area, budget & timeline</div>
          </div>
          <div className="campaign-visual-consent">
            <span aria-hidden="true" />
            <small>Clear permission to contact the visitor about this enquiry.</small>
          </div>
          <div className="campaign-visual-submit">
            <span>Request property details</span>
            <ArrowRight size={14} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="campaign-visual-confirmation">
        <CheckCircle2 size={24} aria-hidden="true" />
        <div>
          <span className="campaign-visual-kicker">02 / Proposed confirmation state</span>
          <h3>Enquiry received. Here is what happens next.</h3>
          <p>
            The team reviews your requirements and follows up. A site visit is confirmed after
            availability is checked.
          </p>
        </div>
      </div>
      <figcaption>
        Design concept only. A live page would use approved property details, authentic photography,
        validated form handling, and consent wording.
      </figcaption>
    </figure>
  );
}
