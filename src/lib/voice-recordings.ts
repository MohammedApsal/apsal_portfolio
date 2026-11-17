export type VoiceRecordingTranscriptLine = Readonly<{
  speaker: string;
  text: string;
}>;

export type VoiceRecording = Readonly<{
  id: "voice-booking" | "voice-rescheduling";
  title: string;
  description: string;
  durationLabel: string;
  transcript: readonly VoiceRecordingTranscriptLine[];
}>;

export const voiceRecordings: readonly VoiceRecording[] = [
  {
    id: "voice-booking",
    title: "Booking an appointment",
    description:
      "An edited booking request, availability conversation, and spoken appointment confirmation.",
    durationLabel: "1:12 edited demo",
    transcript: [
      {
        speaker: "On screen",
        text: "Edited browser booking test. Recorded 18 October 2026.",
      },
      {
        speaker: "Caller",
        text: "I'd like to book a consultation. What appointments are available tomorrow afternoon?",
      },
      {
        speaker: "Assistant",
        text: "Just to confirm, you would like to book a free 30-minute AI automation consultation tomorrow, October 19, 2026, in the afternoon. Could you please specify a preferred time in the afternoon, for example early afternoon around 1 to 3 PM, or late afternoon around 3 to 6 PM?",
      },
      {
        speaker: "Caller",
        text: "I'd like to book an appointment at 12:00 PM.",
      },
      {
        speaker: "Assistant",
        text: "12:00 PM is actually noon, not afternoon. Would you like me to check availability for 12:00 PM, or for a time later in the afternoon on October 19, 2026?",
      },
      {
        speaker: "Caller",
        text: "Continue with the 12:00 PM appointment.",
      },
      {
        speaker: "Assistant",
        text: "The 12:00 PM slot for the free 30-minute AI automation consultation on October 19, 2026 is available. Would you like to proceed with booking this appointment? If yes, please provide your full name and a callback phone number.",
      },
      {
        speaker: "On screen",
        text: "Contact details entered. This private exchange is omitted.",
      },
      {
        speaker: "Assistant",
        text: "Your appointment for the free 30-minute AI automation consultation is confirmed for October 19, 2026, at 12:00 PM.",
      },
      {
        speaker: "Assistant",
        text: "Is there anything else I can assist you with today?",
      },
      {
        speaker: "On screen",
        text: "Booking confirmation received in this browser test. Testing continues.",
      },
    ],
  },
  {
    id: "voice-rescheduling",
    title: "Rescheduling and an unavailable-slot question",
    description: "A changed appointment time, followed by a question about an occupied slot.",
    durationLabel: "1:06 edited demo",
    transcript: [
      {
        speaker: "On screen",
        text: "Edited browser rescheduling test. Recorded 18 October 2026.",
      },
      {
        speaker: "Caller",
        text: "I'd like to reschedule my appointment.",
      },
      {
        speaker: "Assistant",
        text: "I can help with that. Could you please provide me with your full name and the phone number you used for the appointment? Also, if you know the current appointment date and time, that would be helpful.",
      },
      {
        speaker: "On screen",
        text: "Contact details entered. This private exchange is omitted.",
      },
      {
        speaker: "Assistant",
        text: "Thank you, Apsal. To reschedule, please tell me your preferred new date and time for the appointment.",
      },
      {
        speaker: "Caller",
        text: "The same day. I need to book at 12:00 PM.",
      },
      {
        speaker: "Assistant",
        text: "The 12:00 PM slot on October 19 is available for rescheduling. Would you like me to proceed with rescheduling your appointment to that time?",
      },
      {
        speaker: "Caller",
        text: "Yes.",
      },
      {
        speaker: "On screen",
        text: "The recorded rescheduling tool reports completed successfully.",
      },
      {
        speaker: "Assistant",
        text: "Your appointment has been successfully rescheduled to Monday, October 19 at 12:00 PM. Is there anything else I can assist you with today?",
      },
      {
        speaker: "Caller",
        text: "Wait. Can you book a time that is already taken?",
      },
      {
        speaker: "Assistant",
        text: "I cannot book or reschedule an appointment to a time slot that is already taken. I can only help with available slots. Would you like me to check for other available times for you?",
      },
      {
        speaker: "On screen",
        text: "Rescheduling and unavailable-slot responses demonstrated. Testing continues.",
      },
    ],
  },
];
