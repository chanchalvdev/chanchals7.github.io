"use client";

import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { profile } from "@/content/portfolio";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ASK_ME_ENDPOINT, openAskMe } from "@/lib/ask-me";

const QUESTIONS = [
  "What kind of role is he looking for?",
  "What has he shipped with AI agents?",
  "How does he work with customers?",
];

/**
 * Hero tile that hands a question straight to the chat panel. While the chat
 * is switched off it becomes a direct contact tile, so the bento never has a
 * hole in it.
 */
export function AskTile() {
  if (!ASK_ME_ENDPOINT) return <TalkTile />;

  return (
    <div className="tile tile-peach flex h-full flex-col p-6 sm:p-7">
      <p className="lbl on-tile-soft flex items-center gap-2">
        <Sparkles className="size-3.5" aria-hidden="true" />
        Ask my AI
      </p>
      <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
        Curious? Ask my AI anything about me.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => openAskMe(question)}
            className="rounded-full bg-white/70 px-3.5 py-2 text-left text-sm font-medium text-[var(--tile-peach-fg)] transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
          >
            {question}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => openAskMe()}
          className="flex w-full items-center justify-between rounded-full bg-white/60 py-2 pl-4 pr-2 text-left text-sm transition hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15"
        >
          Ask anything about Chanchal…
          <span className="grid size-8 place-items-center rounded-full bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)]">
            <ArrowUp className="size-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}

function TalkTile() {
  return (
    <div className="tile tile-peach flex h-full flex-col p-6 sm:p-7">
      <p className="lbl on-tile-soft">Let&apos;s talk</p>
      <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
        Hiring an AI Engineer or FDE? I reply within a day.
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--tile-ink-bg)] px-5 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email me
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-white/60 px-5 text-sm font-semibold transition hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15"
        >
          <BrandIcon brand="linkedin" className="size-4" />
          LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
