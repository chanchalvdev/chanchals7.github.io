"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, PenLine, Search, X } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { type StoredBlogPost, getPublishedBlogs, formatDate } from "@/lib/blog-storage";
import { cn } from "@/lib/utils";

function BlogCard({ post, index }: { post: StoredBlogPost; index: number }) {
  return (
    <article className="grid gap-5 border-t border-border py-9 first:border-t-0 lg:grid-cols-[3.25rem_1fr]">
      {/* Part callout badge */}
      <div>
        <span className="part-badge">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="leader-block">
        {/* Spec head */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/blog/post/${post.slug}/`} className="group">
            <h2 className="text-display text-xl font-bold text-ink transition group-hover:text-cobalt sm:text-2xl">
              {post.title}
            </h2>
          </Link>
          <span className="border border-cobalt bg-cobalt-light px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-cobalt">
            {post.category}
          </span>
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink/40">
            {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)} ·{" "}
            {post.readTime}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/60">{post.excerpt}</p>

        {/* Spec table */}
        {post.tags.length > 0 && (
          <div className="mt-5 max-w-2xl">
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-2.5 text-sm">
              <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] leading-6 text-ink/40">
                Tags
              </p>
              <p className="font-mono text-[0.78rem] leading-6 text-ink/65">
                {post.tags.join(" · ")}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <Link
            href={`/blog/post/${post.slug}/`}
            className="inline-flex items-center gap-1.5 border-b-[1.5px] border-cobalt pb-0.5 font-mono text-[0.74rem] font-bold uppercase tracking-[0.05em] text-ink transition hover:text-cobalt"
          >
            Read post
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

export function BlogIndexClient() {
  const [mounted, setMounted] = useState(false);
  const [allPosts, setAllPosts] = useState<StoredBlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("");
  const [sortMode, setSortMode] = useState("newest");

  useEffect(() => {
    setMounted(true);
    getPublishedBlogs().then(setAllPosts);
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)));
    return ["All", ...cats.sort()];
  }, [allPosts]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [allPosts]);

  const filtered = useMemo(() => {
    let result = [...allPosts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
      const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();
      return sortMode === "oldest" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [allPosts, search, activeCategory, activeTag, sortMode]);

  return (
    <>
      <Navbar />
      <main className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-bold text-ink/60 transition hover:text-cobalt"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>

          <div className="mt-10">
            <p className="bp-divider font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
              Sheet 06 / Field Notes
            </p>
            <h1 className="text-display mt-5 text-4xl font-bold text-ink sm:text-5xl">
              Field Notes
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/60">
              Notes on secure AI workflows, frontend systems, backend service design, and the
              judgment that makes products easier to trust.
            </p>
          </div>

          {/* Search + sort bar */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full border border-border bg-surface pl-10 pr-4 font-mono text-[0.85rem] text-ink placeholder:text-ink/40 focus:border-cobalt/50 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
              className="h-11 border border-border bg-surface px-4 font-mono text-[0.78rem] font-semibold text-ink focus:border-cobalt/50 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Category filters */}
          {mounted && categories.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "h-9 border px-4 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.04em] transition",
                    activeCategory === cat
                      ? "border-ink bg-ink text-page"
                      : "border-border bg-surface text-ink/55 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Tag filters */}
          {mounted && allTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                  className={cn(
                    "h-7 border px-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] transition",
                    activeTag === tag
                      ? "border-cobalt bg-cobalt-light text-cobalt"
                      : "border-border bg-page text-ink/45 hover:border-cobalt/40 hover:text-cobalt/80",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {!mounted ? (
            <div className="mt-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="grid gap-5 border-t border-border py-9 first:border-t-0 lg:grid-cols-[3.25rem_1fr]"
                >
                  <div className="size-9 animate-pulse rounded-full bg-ink/8" />
                  <div>
                    <div className="h-6 w-1/2 animate-pulse bg-ink/8" />
                    <div className="mt-3 h-4 w-full animate-pulse bg-ink/8" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse bg-ink/8" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-4 border border-border bg-surface py-20 text-center">
              <div className="grid size-14 place-items-center border border-border bg-cobalt-light">
                <PenLine className="size-6 text-cobalt" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold text-ink">
                  {allPosts.length === 0 ? "No blogs published yet" : "No posts match your filters"}
                </p>
                <p className="mt-1 text-sm text-ink/50">
                  {allPosts.length === 0
                    ? "Engineering notes and product essays coming soon."
                    : "Try adjusting your search or filters."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-8 border-y border-border py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink/45">
                {filtered.length} {filtered.length === 1 ? "entry" : "entries"} in this view
              </p>
              <div className="mt-2">
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
