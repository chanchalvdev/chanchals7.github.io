"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, PenLine, Search, X } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { type StoredBlogPost, getPublishedBlogs, formatDate } from "@/lib/blog-storage";
import { cn } from "@/lib/utils";

function BlogCard({ post }: { post: StoredBlogPost }) {
  return (
    <article className="group flex flex-col rounded-xl border border-ink/10 bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      {post.coverImage && (
        <div className="mb-5 -mx-6 -mt-6 h-44 overflow-hidden rounded-t-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      )}

      {!post.coverImage && (
        <BookOpen className="mb-4 size-5 text-cobalt/60" aria-hidden="true" />
      )}

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md border border-cobalt/16 bg-cobalt/6 px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cobalt">
          {post.category}
        </span>
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-ink/10 bg-page px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/44"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/36">
        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)} · {post.readTime}
      </p>

      <h2 className="mt-3 text-xl font-bold leading-snug text-ink transition group-hover:text-cobalt">
        {post.title}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-7 text-ink/56">{post.excerpt}</p>

      <Link
        href={`/blog/post/?id=${post.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cobalt/80 transition hover:text-cobalt"
      >
        Read post
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

export default function BlogIndexPage() {
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
      <main className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/58 transition hover:text-cobalt"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>

          <div className="mt-10">
            <p className="text-kicker text-cobalt">Writing</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Architecture notes with product memory.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/56">
              Notes on secure AI workflows, frontend systems, backend service design, and the judgment that makes products easier to trust.
            </p>
          </div>

          {/* Search + sort bar */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/36" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-ink/10 bg-surface pl-10 pr-4 text-sm font-medium text-ink placeholder:text-ink/36 focus:border-cobalt/40 focus:outline-none focus:ring-2 focus:ring-cobalt/10"
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
              className="h-11 rounded-xl border border-ink/10 bg-surface px-4 text-sm font-semibold text-ink focus:border-cobalt/40 focus:outline-none"
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
                    "h-9 rounded-full border px-4 text-sm font-semibold transition",
                    activeCategory === cat
                      ? "border-cobalt bg-cobalt text-page"
                      : "border-ink/10 bg-surface text-ink/56 hover:border-cobalt/25 hover:text-cobalt",
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
                    "h-7 rounded-md border px-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] transition",
                    activeTag === tag
                      ? "border-cobalt/30 bg-cobalt/10 text-cobalt"
                      : "border-ink/8 bg-page text-ink/44 hover:border-cobalt/20 hover:text-cobalt/70",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {!mounted ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
                  <div className="h-4 w-16 animate-pulse rounded bg-ink/6" />
                  <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-ink/6" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-ink/6" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-ink/6" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-surface py-20 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-cobalt/6">
                <PenLine className="size-6 text-cobalt/60" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">
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
              <p className="mt-8 text-sm font-semibold text-ink/40">
                {filtered.length} {filtered.length === 1 ? "post" : "posts"}
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                  <BlogCard key={post.id} post={post} />
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
