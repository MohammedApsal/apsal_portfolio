import { lazy, Suspense, useState } from "react";
import { LoaderCircle, MessageSquareText } from "lucide-react";
const ChatWidget = lazy(() =>
  import("./chat-widget").then((module) => ({ default: module.ChatWidget })),
);
export function ChatLauncher() {
  const [loaded, setLoaded] = useState(false);
  const launchClass =
    "fixed right-4 bottom-20 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--glow-primary)] sm:right-6";
  if (loaded)
    return (
      <Suspense
        fallback={
          <button type="button" disabled className={launchClass} aria-label="Loading AI assistant">
            <LoaderCircle size={22} className="animate-spin" aria-hidden="true" />
          </button>
        }
      >
        <ChatWidget initiallyOpen />
      </Suspense>
    );
  return (
    <button
      type="button"
      className={launchClass}
      onClick={() => setLoaded(true)}
      aria-label="Open AI assistant"
    >
      <MessageSquareText size={23} aria-hidden="true" />
    </button>
  );
}
