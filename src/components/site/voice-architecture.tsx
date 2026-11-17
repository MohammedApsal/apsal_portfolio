import { useState } from "react";
const stages = [
  [
    "Browser test call",
    "Vapi provides browser-based test calls. No telephone number or separate telephony provider is connected.",
  ],
  [
    "Speech recognition",
    "The voice interface converts spoken questions into text for the assistant to process.",
  ],
  [
    "AI intent detection",
    "The assistant identifies the requested business action. Unclear or unsupported requests need a suitable fallback.",
  ],
  [
    "Business logic",
    "n8n coordinates Google Calendar, Google Sheets, Gmail, and Telegram. Integration behaviour is being tested.",
  ],
  [
    "Response generation",
    "The assistant prepares a response from business context and workflow results. End-to-end reliability testing is in progress.",
  ],
  [
    "Voice response",
    "Vapi delivers a spoken response during browser tests. The booking and rescheduling recordings above show selected test conversations; broader reliability testing is still in progress.",
  ],
];
export function VoiceArchitecture() {
  const [stage, setStage] = useState(0);
  const current = stages[stage]!;
  return (
    <div className="voice-architecture">
      <h3>Explore the architecture</h3>
      <div className="stage-buttons" role="group" aria-label="Voice workflow stages">
        {stages.map(([label], i) => (
          <button type="button" key={label} aria-pressed={stage === i} onClick={() => setStage(i)}>
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="stage-detail" aria-live="polite">
        <h4>{current[0]}</h4>
        <p>{current[1]}</p>
      </div>
    </div>
  );
}
