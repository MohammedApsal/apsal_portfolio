import { useId } from "react";
import "../../enquiry-recording.css";

type RecordingStep = Readonly<{
  time: string;
  label: string;
}>;

type EnquiryRecordingProps = Readonly<{
  durationLabel: string;
  steps: readonly RecordingStep[];
  note?: string;
}>;

export function EnquiryRecording({
  durationLabel,
  steps,
  note = "Silent walkthrough · edited for privacy. Recorded internal test of this portfolio’s enquiry automation.",
}: EnquiryRecordingProps) {
  const headingId = useId();
  const descriptionId = useId();

  return (
    <section className="enquiry-recording" aria-labelledby={headingId}>
      <div className="enquiry-recording__heading">
        <div>
          <p className="enquiry-recording__status">Recorded internal test · 17 October 2026</p>
          <h2 id={headingId}>Watch the enquiry workflow</h2>
        </div>
        <span className="enquiry-recording__duration">{durationLabel}</span>
      </div>
      <p id={descriptionId} className="enquiry-recording__note">
        {note}
      </p>
      <video
        className="enquiry-recording__video"
        controls
        playsInline
        preload="metadata"
        poster="/demos/enquiry-automation-poster.webp"
        width={1280}
        height={720}
        aria-label="Recorded internal test of the portfolio enquiry automation"
        aria-describedby={descriptionId}
      >
        <source src="/demos/enquiry-automation.mp4" type="video/mp4" />
        <track
          kind="subtitles"
          src="/demos/enquiry-automation-notes.vtt"
          srcLang="en"
          label="English walkthrough notes"
          default
        />
        Your browser does not support embedded video.{" "}
        <a href="/demos/enquiry-automation.mp4">Download the enquiry recording</a>.
      </video>
      <div className="enquiry-recording__footer">
        <details className="enquiry-recording__description">
          <summary>Walkthrough notes</summary>
          <ol>
            {steps.map((step) => (
              <li key={`${step.time}-${step.label}`}>
                <span className="enquiry-recording__timestamp">{step.time}</span>
                <span>{step.label}</span>
              </li>
            ))}
          </ol>
        </details>
        <a className="enquiry-recording__download" href="/demos/enquiry-automation.mp4" download>
          Download recording <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
