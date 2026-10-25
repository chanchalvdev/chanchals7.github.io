"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, PenLine, Search, X } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { type StoredBlogPost, getPublishedBlogs, formatDate } from "@/lib/blog-storage";
import { writingTopics } from "@/content/portfolio";
import { cn } from "@/lib/utils";

function BlogCard({ post }: { post: StoredBlogPost }) {
  return (
    <article className="tile tile-hover flex h-full flex-col p-6 sm:p-7">
      <p className="lbl flex flex-wrap items-center gap-x-2 text-ink-faint">
        {post.category ? (
          <span className="rounded-full bg-[var(--tile-lime-bg)] px-2.5 py-0.5 text-[var(--tile-lime-fg)]">
            {post.category}
          </span>
        ) : null}
        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)} · {post.readTime}
      </p>
      <Link href={`/blog/post/${post.slug}/`} className="group mt-4">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink transition group-hover:text-cobalt">
          {post.title}
        </h2>
      </Link>
      {post.excerpt || post.seoDescription ? (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
          {post.excerpt || post.seoDescription}
        </p>
      ) : null}
      {post.tags.length > 0 && (
        <p className="mt-4 font-mono text-xs leading-relaxed text-ink-faint">{post.tags.join(" · ")}</p>
      )}
      <div className="mt-auto pt-6">
        <Link
          href={`/blog/post/${post.slug}/`}
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--tile-ink-bg)] px-4 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
        >
          Read post
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "quick", label: "Quick reads" },
  { value: "deep", label: "Deep dives" },
];

// Filters live in the URL so topic links from the homepage and shared links
// land on the same view. Read once on mount; written back with replaceState.
function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const sort = params.get("sort") ?? "newest";
  return {
    search: params.get("q") ?? "",
    category: params.get("category") ?? "All",
    tag: params.get("tag") ?? "",
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? sort : "newest",
  };
}

function writeFiltersToUrl(filters: { search: string; category: string; tag: string; sort: string }) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.category !== "All") params.set("category", filters.category);
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
}

export function BlogIndexClient() {
  const [mounted, setMounted] = useState(false);
  const [allPosts, setAllPosts] = useState<StoredBlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("");
  const [sortMode, setSortMode] = useState("newest");

  useEffect(() => {
    const filters = readFiltersFromUrl();
    setSearch(filters.search);
    setActiveCategory(filters.category);
    setActiveTag(filters.tag);
    setSortMode(filters.sort);
    setMounted(true);
    getPublishedBlogs().then(setAllPosts);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeFiltersToUrl({ search, category: activeCategory, tag: activeTag, sort: sortMode });
  }, [mounted, search, activeCategory, activeTag, sortMode]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    allPosts.forEach((p) => {
      if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    });
    return counts;
  }, [allPosts]);

  // Known topics first, in their listed order, then any other categories.
  const categories = useMemo(() => {
    const topicLabels = writingTopics.map((t) => t.label).filter((label) => categoryCounts.has(label));
    const others = Array.from(categoryCounts.keys())
      .filter((cat) => !topicLabels.includes(cat))
      .sort();
    return ["All", ...topicLabels, ...others];
  }, [categoryCounts]);

  const hasFilters = search.trim() !== "" || activeCategory !== "All" || activeTag !== "";

  function clearFilters() {
    setSearch("");
    setActiveCategory("All");
    setActiveTag("");
  }

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
      if (sortMode === "quick") return a.wordCount - b.wordCount || dateB - dateA;
      if (sortMode === "deep") return b.wordCount - a.wordCount || dateB - dateA;
      return sortMode === "oldest" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [allPosts, search, activeCategory, activeTag, sortMode]);

  return (
    <>
      <Navbar />
      <main className="px-3 pb-6 pt-6 sm:px-6">
        <div className="mx-auto max-w-[82rem]">
          <div className="tile p-7 sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>

          <div className="mt-8">
            <p className="bp-divider lbl text-ink-faint">Writing</p>
            <h1 className="text-display mt-4 text-4xl font-extrabold text-ink sm:text-6xl">
              Notes on building <span className="serif-accent">agents</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              What I learn shipping AI agents, LLM apps, and the systems around them — and keeping
              them safe in production.
            </p>
          </div>

          {/* Search + sort bar */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-full border border-border-control bg-page pl-10 pr-10 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
              className="h-12 rounded-full border border-border-control bg-page px-4 text-sm font-medium text-ink focus:border-ink focus:outline-none"
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
                  aria-pressed={activeCategory === cat}
                  className={cn(
                    "h-9 rounded-full px-4 text-sm font-medium transition",
                    activeCategory === cat
                      ? "bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)]"
                      : "bg-surface-warm text-ink-soft hover:text-ink",
                  )}
                >
                  {cat}
                  {cat !== "All" ? (
                    <span className="ml-1.5 font-mono text-xs opacity-70">{categoryCounts.get(cat)}</span>
                  ) : null}
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
                  aria-pressed={activeTag === tag}
                  className={cn(
                    "h-8 rounded-full px-3 font-mono text-xs transition",
                    activeTag === tag
                      ? "bg-[var(--tile-lime-bg)] text-[var(--tile-lime-fg)]"
                      : "bg-surface-soft text-ink-faint hover:text-ink",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          </div>

          {/* Results */}
          {!mounted ? (
            <div className="mt-3.5 grid gap-3.5 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="tile p-7">
                  <div className="h-5 w-1/3 animate-pulse rounded-full bg-muted" />
                  <div className="mt-4 h-7 w-3/4 animate-pulse rounded-full bg-muted" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-muted" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-muted" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="tile mt-3.5 flex flex-col items-center gap-4 py-20 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-[var(--tile-lime-bg)]">
                <PenLine className="size-6 text-[var(--tile-lime-fg)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold text-ink">
                  {allPosts.length === 0 ? "No blogs published yet" : "No posts match your filters"}
                </p>
                <p className="mt-1 text-sm text-ink-faint">
                  {allPosts.length === 0
                    ? "Engineering notes and product essays coming soon."
                    : "Try adjusting your search or filters."}
                </p>
                {hasFilters && allPosts.length > 0 ? (
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--tile-ink-bg)] px-4 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 px-2 pt-6">
                <p className="lbl text-ink-faint">
                  {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                  {hasFilters ? ` of ${allPosts.length}` : ""}
                </p>
                {hasFilters ? (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft transition hover:text-ink"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                    Clear filters
                  </button>
                ) : null}
              </div>
              <div className="mt-3 grid gap-3.5 md:grid-cols-2">
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
