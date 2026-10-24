"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { profile } from "@/content/portfolio";
import { ASK_ME_ANON_KEY, ASK_ME_ENDPOINT, onAskMeOpen } from "@/lib/ask-me";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "model"; text: string };

const SUGGESTIONS = [
  "What roles is Chanchal looking for?",
  "What AI agents has he shipped?",
  "Tell me about Casewright",
  "Is he open to relocation?",
];

const MAX_INPUT = 500;

/** Turns bare URLs and emails in model output into links; everything else stays text. */
function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-cobalt">
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="underline underline-offset-2 hover:text-cobalt">
          {part}
        </a>
      );
    }
    return part;
  });
}

export function AskMe() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Latest send(), so the open-event listener below never calls a stale closure.
  const sendRef = useRef<(text: string) => void>(() => {});

  useEffect(
    () =>
      onAskMeOpen((question) => {
        setOpen(true);
        if (question) sendRef.current(question);
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  if (!ASK_ME_ENDPOINT || pathname?.startsWith("/admin")) return null;
  const endpoint = ASK_ME_ENDPOINT;

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || pending) return;

    const history: Message[] = [...messages, { role: "user", text: question }];
    setMessages([...history, { role: "model", text: "" }]);
    setInput("");
    setPending(true);

    const appendToReply = (chunk: string, replace = false) =>
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, text: replace ? chunk : last.text + chunk };
        return next;
      });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ASK_ME_ANON_KEY,
          Authorization: `Bearer ${ASK_ME_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        appendToReply(decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if (controller.signal.aborted) return;
      // fetch() rejects with a TypeError when the function is unreachable.
      const reason =
        err instanceof TypeError
          ? "The assistant isn't reachable right now"
          : err instanceof Error
            ? err.message
            : "Something went wrong";
      appendToReply(`${reason}. You can always reach Chanchal directly at ${profile.email}.`, true);
    } finally {
      setPending(false);
      abortRef.current = null;
    }
  }

  sendRef.current = send;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  const lastIsEmptyReply = pending && messages[messages.length - 1]?.text === "";

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fade-up fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-3 rounded-[1.4rem] bg-[var(--tile-ink-bg)] pl-2.5 pr-5 text-[0.95rem] font-semibold text-[var(--tile-ink-fg)] shadow-float ring-1 ring-white/10 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt sm:bottom-6 sm:right-6"
          aria-haspopup="dialog"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--tile-lime-bg)] text-[var(--tile-lime-fg)]">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          Ask about me
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Ask about Chanchal"
          className="scale-in fixed inset-x-3 bottom-3 z-50 flex max-h-[min(44rem,calc(100svh-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-float sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[max(24rem,28vw)] sm:max-w-[34rem]"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--tile-lime-bg)] text-[var(--tile-lime-fg)]">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Ask about Chanchal</p>
              <p className="text-xs text-ink-faint">AI · answers from his portfolio</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-full text-ink-soft transition hover:bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-cobalt"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="min-h-48 flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.length === 0 ? (
              <div>
                <p className="text-sm leading-6 text-ink-soft">
                  Hi! I&apos;m an AI assistant trained on Chanchal&apos;s portfolio. Ask me about his
                  experience, projects, skills, or education.
                </p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full bg-surface-warm px-3.5 py-2 text-left text-sm font-medium text-ink transition hover:bg-[var(--tile-lime-bg)] hover:text-[var(--tile-lime-fg)]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-3">
                {messages.map((message, i) => (
                  <li key={i} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                    <p
                      className={cn(
                        "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                        message.role === "user"
                          ? "rounded-br-md bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)]"
                          : "rounded-bl-md bg-surface-warm text-ink",
                      )}
                    >
                      {message.text ? linkify(message.text) : null}
                      {i === messages.length - 1 && lastIsEmptyReply && (
                        <span className="inline-flex gap-1 py-1" aria-label="Thinking">
                          <span className="pulse-dot size-1.5 rounded-full bg-ink-faint" />
                          <span className="pulse-dot size-1.5 rounded-full bg-ink-faint [animation-delay:150ms]" />
                          <span className="pulse-dot size-1.5 rounded-full bg-ink-faint [animation-delay:300ms]" />
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border-control bg-page px-3 py-2 focus-within:border-ink">
              <label htmlFor="ask-me-input" className="sr-only">Your question</label>
              <textarea
                id="ask-me-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_INPUT}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about Chanchal…"
                className="max-h-28 min-h-6 flex-1 resize-none bg-transparent py-1 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)] transition hover:opacity-85 disabled:opacity-30"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
