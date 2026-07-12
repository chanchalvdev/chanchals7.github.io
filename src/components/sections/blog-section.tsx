"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, PenLine } from "lucide-react";
import { type StoredBlogPost, getPublishedBlogs, formatDate } from "@/lib/blog-storage";
import { SectionHeading } from "@/components/ui/section-heading";

export function BlogSection() {
  const [posts, setPosts] = useState<StoredBlogPost[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPublishedBlogs().then((all) => setPosts(all.slice(0, 3)));
  }, []);

  return (
    <section id="writing" className="section-shell">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          {/* Left */}
          <div>
            <SectionHeading
              eyebrow="Writing"
              title="How I reason in public."
              description="Short essays on engineering judgment, product tradeoffs, and security decisions."
            />
            <Link
              href="/blog"
              className="mt-8 inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-ink/65 transition hover:-translate-y-0.5 hover:border-cobalt/40 hover:text-cobalt"
            >
              All notes
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Right */}
          {!mounted ? (
            <div className="divide-y divide-border rounded-xl border border-border bg-surface shadow-(--shadow-soft)">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 sm:p-7">
                  <div className="h-5 w-24 animate-pulse rounded bg-ink/8" />
                  <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-ink/8" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-ink/8" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface px-8 py-16 text-center shadow-(--shadow-soft)">
              <div className="grid size-14 place-items-center rounded-2xl bg-cobalt/10">
                <PenLine className="size-6 text-cobalt" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">No blogs published yet</p>
                <p className="mt-1.5 text-sm text-ink/50">
                  Engineering notes and product essays coming soon.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border rounded-xl border border-border bg-surface shadow-(--shadow-soft)">
              {posts.map((post, i) => (
                <article key={post.id} className={`p-6 sm:p-7 ${i === 0 ? "pb-6" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-cobalt/20 bg-cobalt/8 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-cobalt"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="shrink-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
                      {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)} · {post.readTime}
                    </p>
                  </div>

                  <Link href={`/blog/post/${post.slug}/`} className="group mt-4 block">
                    <h3 className="text-xl font-bold leading-snug text-ink transition group-hover:text-cobalt sm:text-2xl">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-3 text-sm leading-7 text-ink/55">{post.excerpt}</p>

                  <Link
                    href={`/blog/post/${post.slug}/`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cobalt/80 transition hover:text-cobalt"
                  >
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    Read more
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
