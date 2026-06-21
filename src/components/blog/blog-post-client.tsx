"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { type StoredBlogPost, getBlogBySlug, getPublishedBlogs, formatDate } from "@/lib/blog-storage";

function addHeadingIds(html: string): string {
  let count = 0;
  return html.replace(/<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi, (_m, level, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "");
    const id =
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60) + `-${count++}`;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

function Toc({ html }: { html: string }) {
  const headings = Array.from(
    html.matchAll(/<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi),
  ).map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, ""),
  }));

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-ink/10 bg-white p-5 shadow-soft">
      <p className="text-kicker mb-3 text-ink/40">Contents</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1}rem` }}>
            <a href={`#${h.id}`} className="text-sm font-medium text-ink/60 transition hover:text-cobalt">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink/44">
        <Share2 className="size-3.5" aria-hidden="true" />
        Share
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Twitter"
        className="grid size-8 place-items-center rounded-lg border border-ink/10 bg-white text-ink/50 transition hover:border-cobalt/25 hover:text-cobalt"
      >
        <Twitter className="size-3.5" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        className="grid size-8 place-items-center rounded-lg border border-ink/10 bg-white text-ink/50 transition hover:border-cobalt/25 hover:text-cobalt"
      >
        <Linkedin className="size-3.5" />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="grid size-8 place-items-center rounded-lg border border-ink/10 bg-white text-ink/50 transition hover:border-cobalt/25 hover:text-cobalt"
      >
        {copied ? (
          <span className="text-[0.6rem] font-bold text-cobalt">✓</span>
        ) : (
          <Link2 className="size-3.5" />
        )}
      </button>
    </div>
  );
}

function BlogPostInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("id") ?? undefined;
  const [post, setPost] = useState<StoredBlogPost | null | undefined>(undefined);
  const [relatedPosts, setRelatedPosts] = useState<StoredBlogPost[]>([]);
  const [processedHtml, setProcessedHtml] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    const found = getBlogBySlug(slug);
    setPost(found ?? null);

    if (found) {
      setProcessedHtml(addHeadingIds(found.content));
      document.title = `${found.title} | Chanchal Verma`;

      const related = getPublishedBlogs()
        .filter(
          (p) =>
            p.id !== found.id &&
            (p.category === found.category || p.tags.some((t) => found.tags.includes(t))),
        )
        .slice(0, 2);
      setRelatedPosts(related);
    }
  }, [slug]);

  if (post === undefined) {
    return (
      <>
        <Navbar />
        <main className="px-5 py-12 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="h-5 w-24 animate-pulse rounded bg-ink/6" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-ink/6" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-ink/6" style={{ width: `${92 - i * 6}%` }} />
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (post === null) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
          <p className="text-kicker text-cobalt">404</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Post not found</h1>
          <p className="mt-3 text-ink/56">This post may have been removed or the URL is incorrect.</p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="size-4" />
            Back to writing
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-5 py-12 sm:px-8 lg:py-20">
        <article className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/58 transition hover:text-cobalt"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to writing
          </Link>

          {post.coverImage && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-ink/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="h-72 w-full object-cover sm:h-96" />
            </div>
          )}

          <div className="mt-10 lg:grid lg:grid-cols-[1fr_260px] lg:items-start lg:gap-12">
            <div>
              <header className="border-b border-ink/10 pb-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-cobalt/16 bg-cobalt/6 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-cobalt">
                    {post.category}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ink/10 bg-page px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/44"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 text-xl leading-8 text-ink/60">{post.excerpt}</p>

                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-semibold text-ink/44">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readTime}
                  </span>
                  <span>{post.wordCount.toLocaleString()} words</span>
                </div>

                <div className="mt-5">
                  <ShareButtons title={post.title} />
                </div>
              </header>

              <div
                ref={articleRef}
                className="prose-blog mt-10"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />

              <div className="mt-14 flex items-center justify-between gap-4 border-t border-ink/10 pt-8">
                <ShareButtons title={post.title} />
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition hover:text-cobalt"
                >
                  More posts
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <section className="mt-14">
                  <p className="text-kicker mb-5 text-ink/40">Related</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/post/?id=${rel.slug}`}
                        className="group rounded-xl border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-cobalt/20"
                      >
                        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36">
                          {rel.category}
                        </p>
                        <h3 className="mt-2 font-bold text-ink transition group-hover:text-cobalt">
                          {rel.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-ink/50">{rel.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="hidden lg:sticky lg:top-24 lg:block">
              <Toc html={processedHtml} />
              <div className="mt-5 rounded-xl border border-ink/10 bg-white p-5 shadow-soft">
                <p className="text-kicker mb-3 text-ink/40">Author</p>
                <p className="font-bold text-ink">Chanchal Verma</p>
                <p className="mt-1 text-sm text-ink/50">Senior Full Stack Engineer</p>
                <p className="mt-3 text-sm text-ink/40">Abu Dhabi, UAE</p>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />

      <style>{`
        .prose-blog{color:rgba(12,13,17,0.76);line-height:1.85;font-size:1.0625rem;}
        .prose-blog h1,.prose-blog h2,.prose-blog h3,.prose-blog h4{color:#0c0d11;font-weight:700;line-height:1.2;margin-top:2.5rem;margin-bottom:1rem;letter-spacing:-0.01em;}
        .prose-blog h1{font-size:2rem;}.prose-blog h2{font-size:1.625rem;}.prose-blog h3{font-size:1.375rem;}.prose-blog h4{font-size:1.125rem;}
        .prose-blog p{margin-bottom:1.5rem;}
        .prose-blog a{color:#3b5fe8;text-decoration:underline;text-underline-offset:3px;}
        .prose-blog a:hover{color:#2948c8;}
        .prose-blog strong{color:#0c0d11;font-weight:700;}
        .prose-blog em{font-style:italic;}
        .prose-blog blockquote{border-left:3px solid #3b5fe8;padding-left:1.25rem;margin:2rem 0;color:rgba(12,13,17,0.62);font-style:italic;}
        .prose-blog code{font-family:'IBM Plex Mono',monospace;font-size:0.875em;background:rgba(59,95,232,0.06);border:1px solid rgba(59,95,232,0.12);border-radius:4px;padding:0.15em 0.4em;}
        .prose-blog pre{background:#0c0d11;border-radius:12px;padding:1.25rem 1.5rem;overflow-x:auto;margin:2rem 0;}
        .prose-blog pre code{background:none;border:none;padding:0;color:#e2e8ef;font-size:0.875rem;line-height:1.7;}
        .prose-blog ul{list-style:disc;padding-left:1.5rem;margin-bottom:1.5rem;}
        .prose-blog ol{list-style:decimal;padding-left:1.5rem;margin-bottom:1.5rem;}
        .prose-blog li{margin-bottom:0.5rem;}
        .prose-blog hr{border:none;border-top:1px solid rgba(12,13,17,0.08);margin:2.5rem 0;}
        .prose-blog img{border-radius:12px;max-width:100%;height:auto;margin:2rem 0;}
        .prose-blog table{width:100%;border-collapse:collapse;margin:2rem 0;font-size:0.9375rem;}
        .prose-blog th{background:rgba(12,13,17,0.04);font-weight:700;text-align:left;padding:0.75rem 1rem;border:1px solid rgba(12,13,17,0.1);}
        .prose-blog td{padding:0.75rem 1rem;border:1px solid rgba(12,13,17,0.08);}
        .prose-blog .callout{border-radius:12px;padding:1.25rem 1.5rem;margin:2rem 0;border:1px solid;}
        .prose-blog .callout-info{background:rgba(59,95,232,0.05);border-color:rgba(59,95,232,0.2);}
        .prose-blog .callout-warning{background:rgba(245,158,11,0.05);border-color:rgba(245,158,11,0.25);}
        .prose-blog .callout-danger{background:rgba(229,71,47,0.05);border-color:rgba(229,71,47,0.2);}
      `}</style>
    </>
  );
}

export function BlogPostClient() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    }>
      <BlogPostInner />
    </Suspense>
  );
}
