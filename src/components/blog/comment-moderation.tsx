"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Eye, MessageCircle, Trash2, X } from "lucide-react";
import {
  type BlogComment,
  type CommentStatus,
  deleteComment,
  getAllComments,
  setCommentStatus,
} from "@/lib/blog-comments";
import { formatDate } from "@/lib/blog-storage";
import { cn } from "@/lib/utils";

const TABS: { value: CommentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const iconBtn =
  "grid size-8 place-items-center rounded-lg border border-ink/10 text-ink/44 transition";

// ── Comment moderation (admin) ──────────────────────────────────────────────
export function CommentModeration({ onPendingChange }: { onPendingChange?: (count: number) => void }) {
  const [comments, setComments] = useState<BlogComment[] | null>(null);
  const [tab, setTab] = useState<CommentStatus>("pending");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function refresh() {
    const data = await getAllComments();
    setComments(data);
    onPendingChange?.(data.filter((c) => c.status === "pending").length);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function moderate(id: string, status: CommentStatus) {
    await setCommentStatus(id, status);
    refresh();
  }

  async function remove(id: string) {
    await deleteComment(id);
    setConfirmDelete(null);
    refresh();
  }

  const visible = (comments ?? []).filter((c) => c.status === tab);

  return (
    <section className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-ink">Comments</h2>
        <div className="flex gap-1 rounded-xl border border-ink/10 bg-surface p-1">
          {TABS.map((t) => {
            const count = (comments ?? []).filter((c) => c.status === t.value).length;
            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                aria-pressed={tab === t.value}
                className={cn(
                  "h-8 rounded-lg px-3 text-sm font-semibold transition",
                  tab === t.value ? "bg-ink text-page" : "text-ink/50 hover:text-ink",
                )}
              >
                {t.label}
                <span className="ml-1.5 font-mono text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {comments === null ? (
        <div className="rounded-xl border border-ink/10 bg-surface p-8 text-center text-sm text-ink/44">
          Loading comments…
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-ink/10 bg-surface py-14 text-center">
          <MessageCircle className="size-6 text-ink/30" aria-hidden="true" />
          <p className="text-sm text-ink/50">
            {tab === "pending" ? "Nothing waiting for review." : `No ${tab} comments.`}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-ink/6 overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-soft">
          {visible.map((comment) => (
            <li key={comment.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                  <span className="font-semibold text-ink">{comment.authorName}</span>
                  <span className="text-ink/44">on</span>
                  <Link
                    href={`/blog/post/?id=${comment.postSlug}`}
                    target="_blank"
                    className="font-mono text-xs text-cobalt hover:underline"
                  >
                    /{comment.postSlug}
                  </Link>
                  <span className="text-xs text-ink/36">{formatDate(comment.createdAt)}</span>
                </p>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-ink/70">
                  {comment.body}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {comment.status !== "approved" && (
                  <button
                    onClick={() => moderate(comment.id, "approved")}
                    title="Approve"
                    className={cn(iconBtn, "hover:border-signal/30 hover:text-signal")}
                  >
                    <Check className="size-3.5" />
                  </button>
                )}
                {comment.status !== "rejected" && (
                  <button
                    onClick={() => moderate(comment.id, "rejected")}
                    title={comment.status === "approved" ? "Hide" : "Reject"}
                    className={cn(iconBtn, "hover:border-amber/30 hover:text-amber")}
                  >
                    {comment.status === "approved" ? <Eye className="size-3.5" /> : <X className="size-3.5" />}
                  </button>
                )}
                {confirmDelete === comment.id ? (
                  <>
                    <button
                      onClick={() => remove(comment.id)}
                      title="Confirm delete"
                      className="grid size-8 place-items-center rounded-lg bg-coral text-page transition hover:bg-coral/90"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <button onClick={() => setConfirmDelete(null)} title="Cancel" className={cn(iconBtn, "hover:text-ink")}>
                      <X className="size-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(comment.id)}
                    title="Delete permanently"
                    className={cn(iconBtn, "hover:border-coral/25 hover:text-coral")}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
