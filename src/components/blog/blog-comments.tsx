"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, MessageCircle, Send } from "lucide-react";
import {
  type BlogComment,
  COMMENTS_ENDPOINT,
  COMMENT_MAX_BODY,
  COMMENT_MAX_NAME,
  getApprovedComments,
  submitComment,
} from "@/lib/blog-comments";
import { formatDate } from "@/lib/blog-storage";

const NAME_KEY = "blog_comment_name";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

const inputClass =
  "w-full rounded-2xl border border-border-control bg-page px-4 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

export function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<BlogComment[] | null>(null);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!COMMENTS_ENDPOINT) return;
    getApprovedComments(slug).then(setComments);
    try {
      setName(localStorage.getItem(NAME_KEY) ?? "");
    } catch {
      // Storage blocked — the reader just types their name again.
    }
  }, [slug]);

  if (!COMMENTS_ENDPOINT) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Add your name so I know who's talking.");
    if (body.trim().length < 2) return setError("Write a comment first.");

    setState("sending");
    const result = await submitComment({ slug, name: name.trim(), body: body.trim(), website });
    if (!result.ok) {
      setState("idle");
      setError(result.error);
      return;
    }
    try {
      localStorage.setItem(NAME_KEY, name.trim());
    } catch {
      // noop
    }
    setBody("");
    setState("sent");
  }

  const count = comments?.length ?? 0;

  return (
    <section aria-labelledby="comments-heading" className="tile p-7 sm:p-10">
      <h2 id="comments-heading" className="lbl flex items-center gap-2 text-ink-faint">
        <MessageCircle className="size-4" aria-hidden="true" />
        {count === 0 ? "Comments" : `${count} comment${count === 1 ? "" : "s"}`}
      </h2>

      {comments === null ? (
        <div className="mt-6 space-y-3" aria-hidden="true">
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
        </div>
      ) : count === 0 ? (
        <p className="mt-4 text-[0.95rem] text-ink-soft">
          No comments yet. Questions, pushback and war stories are all welcome.
        </p>
      ) : (
        <ol className="mt-6 grid gap-5">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3.5">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--tile-lav-bg)] font-mono text-xs font-medium text-[var(--tile-lav-fg)]"
                aria-hidden="true"
              >
                {initials(comment.authorName) || "?"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold text-ink">{comment.authorName}</span>
                  <time dateTime={comment.createdAt} className="lbl text-ink-faint">
                    {formatDate(comment.createdAt)}
                  </time>
                </p>
                <p className="mt-1.5 whitespace-pre-line break-words text-[0.95rem] leading-relaxed text-ink-soft">
                  {comment.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-3 border-t border-border pt-7" noValidate>
        <p className="font-semibold text-ink">Leave a comment</p>
        <label className="sr-only" htmlFor="comment-name">Name</label>
        <input
          id="comment-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          maxLength={COMMENT_MAX_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputClass} h-12 sm:max-w-sm`}
        />
        <label className="sr-only" htmlFor="comment-body">Comment</label>
        <textarea
          id="comment-body"
          placeholder="What do you think?"
          rows={4}
          maxLength={COMMENT_MAX_BODY}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            if (state === "sent") setState("idle");
          }}
          className={`${inputClass} resize-y py-3 leading-relaxed`}
        />
        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="comment-website">Website</label>
          <input
            id="comment-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-faint">
            Comments are reviewed before they appear. Your name is shown; nothing else is.
          </p>
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--tile-ink-bg)] px-5 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85 disabled:opacity-60"
          >
            <Send className="size-4" aria-hidden="true" />
            {state === "sending" ? "Sending…" : "Post comment"}
          </button>
        </div>

        <div aria-live="polite">
          {error ? <p className="text-sm font-medium text-coral">{error}</p> : null}
          {state === "sent" ? (
            <p className="flex items-center gap-2 rounded-2xl bg-[var(--tile-lime-bg)] px-4 py-3 text-sm font-medium text-[var(--tile-lime-fg)]">
              <Check className="size-4" aria-hidden="true" />
              Thanks — your comment will appear once it&apos;s approved.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
