import { useId } from "react";
import { voiceRecordings, type VoiceRecording } from "@/lib/voice-recordings";
import "../../voice-recordings.css";

function RecordingCard({ recording, index }: { recording: VoiceRecording; index: number }) {
  const titleId = useId();
  const descriptionId = useId();
  const mediaPath = `/demos/${recording.id}`;

  return (
    <article className="voice-recordings__card" aria-labelledby={titleId}>
      <div className="voice-recordings__card-heading">
        <span className="voice-recordings__number">
          {index === 0 ? "Featured demo" : "Additional test"}
        </span>
        <span className="voice-recordings__duration">{recording.durationLabel}</span>
      </div>
      <h3 id={titleId}>{recording.title}</h3>
      <p id={descriptionId} className="voice-recordings__description">
        {recording.description}
      </p>
      <video
        className="voice-recordings__video"
        controls
        playsInline
        preload="metadata"
        poster={`${mediaPath}-poster.webp`}
        width={1280}
        height={720}
        aria-label={`${recording.title} — recorded Vapi browser test`}
        aria-describedby={descriptionId}
      >
        <source src={`${mediaPath}.mp4`} type="video/mp4" />
        <track
          kind="captions"
          src={`${mediaPath}-en.vtt`}
          srcLang="en"
          label="English captions"
          default
        />
        Your browser does not support embedded video.{" "}
        <a href={`${mediaPath}.mp4`}>Download this browser test</a>.
      </video>
      <div className="voice-recordings__footer">
        {recording.transcript.length > 0 && (
          <details className="voice-recordings__transcript">
            <summary>Read transcript</summary>
            <div>
              {recording.transcript.map((line, lineIndex) => (
                <p key={`${recording.id}-${lineIndex}`}>
                  <strong>{line.speaker}: </strong>
                  {line.text}
                </p>
              ))}
            </div>
          </details>
        )}
        <a className="voice-recordings__download" href={`${mediaPath}.mp4`} download>
          Download video <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function VoiceRecordings() {
  const headingId = useId();

  return (
    <section className="voice-recordings" aria-labelledby={headingId}>
      <div className="voice-recordings__heading">
        <p className="voice-recordings__eyebrow">Edited browser tests · 18 Oct 2026</p>
        <h2 id={headingId}>Hear the conversation. See the workflow.</h2>
        <p>
          Two recorded Vapi browser tests. Pauses and contact details have been removed; some screen
          frames are held briefly for readability. English captions and transcripts are included.
        </p>
        <p className="voice-recordings__caption-note">
          Captions follow the call transcript; punctuation edited for readability.
        </p>
      </div>
      <div className="voice-recordings__grid">
        {voiceRecordings.map((recording, index) => (
          <RecordingCard key={recording.id} recording={recording} index={index} />
        ))}
      </div>
      <p className="voice-recordings__limitation">
        These are browser test calls, with n8n coordinating the backend workflow. They demonstrate
        selected test conversations, not a production telephone service. No telephone number or
        separate telephony provider is connected.
      </p>
    </section>
  );
}
