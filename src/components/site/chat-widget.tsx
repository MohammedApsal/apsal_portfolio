import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import {
  Bot,
  MessageSquareText,
  SendHorizontal,
  X,
  AlertCircle,
  RotateCcw,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PORTFOLIO_CONTACT } from "@/lib/ai/portfolio-faq";

const GREETING =
  "Hi! 👋 I'm Apsal's AI Assistant. Ask me anything about Apsal, his skills, projects, services, or AI automation work.";

const SUGGESTIONS = [
  "Who is Apsal?",
  "What services does he offer?",
  "What AI projects has he built?",
  "What are his skills?",
  "How can I contact him?",
  "Can he build n8n automations?",
];

const transport = new DefaultChatTransport({
  api: "/api/chat",
  prepareSendMessagesRequest: ({ messages }) => ({
    body: {
      messages: messages.slice(-20).map((message) => ({
        id: message.id,
        role: message.role,
        parts: message.parts
          .filter((part) => part.type === "text")
          .map((part) => ({
            type: "text",
            text: part.text.slice(0, message.role === "assistant" ? 6000 : 1500),
          })),
      })),
    },
  }),
  fetch: (url, options) =>
    fetch(url, {
      ...options,
      signal: AbortSignal.any([
        ...(options?.signal ? [options.signal] : []),
        AbortSignal.timeout(30000),
      ]),
    }),
});

export function ChatWidget({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const closeChat = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const { messages, sendMessage, status, error, clearError, regenerate, stop, setMessages } =
    useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [messages, status, error]);

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || t.length > 1500 || busy) return;
    if (error) clearError();
    setInput("");
    void sendMessage({ text: t }).catch(() => {
      /* useChat exposes failures through error. */
    });
  };

  const lastMessage = messages.at(-1);
  const hasAnswerText =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((part) => part.type === "text" && part.text.trim());
  const showTyping = busy && !hasAnswerText;

  return (
    <>
      <div
        id="portfolio-assistant"
        role="dialog"
        aria-label="Apsal AI Assistant"
        aria-hidden={!open}
        inert={!open}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeChat();
        }}
        className={cn(
          "glass fixed right-3 bottom-36 left-3 z-[60] flex max-h-[min(550px,calc(100dvh-11rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl bg-card/85 shadow-[var(--shadow-card)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:left-auto sm:w-[380px]",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0",
        )}
      >
        <header className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Bot className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[13px] font-semibold leading-tight">
              Apsal AI Assistant
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              Portfolio questions &amp; contact details
            </p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                stop();
                setMessages([]);
                clearError();
                setInput("");
              }}
              aria-label="Start a new chat"
              title="Start a new chat"
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3.5 py-3 text-[13px]">
          <p className="leading-relaxed text-foreground/90">{GREETING}</p>
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .filter((p) => p.type === "text")
              .map((p) => (p as { text: string }).text)
              .join("");
            if (m.role === "user")
              return (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-1.5 leading-relaxed text-primary-foreground">
                    {text}
                  </p>
                </div>
              );
            if (!text) return null;
            return (
              <div
                key={m.id}
                className="leading-relaxed text-foreground/90 [&_a]:text-primary-glow [&_a]:underline [&_li]:ml-4 [&_ol]:list-decimal [&_p+p]:mt-1.5 [&_strong]:text-foreground [&_ul]:mt-1 [&_ul]:list-disc"
              >
                <ReactMarkdown
                  urlTransform={(url) =>
                    /^tel:\+?[\d ()-]+$/.test(url) ? url : defaultUrlTransform(url)
                  }
                  components={{
                    a: (props) => (
                      <a
                        {...props}
                        target={/^https?:/.test(props.href || "") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {text}
                </ReactMarkdown>
              </div>
            );
          })}

          {showTyping && (
            <div className="flex items-center gap-1.5 py-1" aria-label="Assistant is typing">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-primary/70"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-2 text-[11px] text-foreground/90"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p>
                  The connection was interrupted. Retry your question or contact Apsal directly.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      clearError();
                      void regenerate().catch(() => {});
                    }}
                  >
                    Retry question
                  </button>
                  <a href={`mailto:${PORTFOLIO_CONTACT.email}`} className="underline">
                    Email Apsal
                  </a>
                  <a
                    href={PORTFOLIO_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 border-t border-border bg-surface-2/40 p-2.5"
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={1}
            maxLength={1500}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about Apsal's work…"
            aria-label="Message"
            className="max-h-24 min-h-9 flex-1 resize-none rounded-lg border border-input bg-background/60 px-2.5 py-2 text-base leading-snug text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none sm:text-[13px]"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop response"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground"
            >
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        className="fixed right-4 bottom-20 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--glow-primary)] transition-transform duration-300 hover:scale-105 sm:right-6"
      >
        <span
          className={cn(
            "absolute transition-all duration-300",
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
        >
          <X className="h-6 w-6" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-300",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        >
          <MessageSquareText className="h-6 w-6" />
        </span>
      </button>
    </>
  );
}
