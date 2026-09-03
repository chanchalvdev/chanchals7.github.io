"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { type StoredBlogPost, getBlogBySlug, getPublishedBlogs, formatDate } from "@/lib/blog-storage";
import { processBlogHtml } from "@/lib/blog-html";

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
    <nav aria-label="Table of contents" className="border border-border bg-surface p-5">
      <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink/45">
        Contents
      </p>
      <ul className="mt-3 space-y-1.5">
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
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

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
      <span className="flex items-center gap-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.04em] text-ink/45">
        <Share2 className="size-3.5" aria-hidden="true" />
        Share
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Twitter"
        className="grid size-8 place-items-center border border-border text-ink/55 transition hover:border-cobalt/50 hover:text-cobalt"
      >
        <Twitter className="size-3.5" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        className="grid size-8 place-items-center border border-border text-ink/55 transition hover:border-cobalt/50 hover:text-cobalt"
      >
        <Linkedin className="size-3.5" />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="grid size-8 place-items-center border border-border text-ink/55 transition hover:border-cobalt/50 hover:text-cobalt"
      >
        {copied ? (
          <span className="font-mono text-[0.6rem] font-bold text-cobalt">✓</span>
        ) : (
          <Link2 className="size-3.5" />
        )}
      </button>
    </div>
  );
}

function BlogPostView({
  slug,
  initialPost,
}: {
  slug?: string;
  initialPost?: StoredBlogPost;
}) {
  const [post, setPost] = useState<StoredBlogPost | null | undefined>(initialPost);
  const [relatedPosts, setRelatedPosts] = useState<StoredBlogPost[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);

  const processedHtml = useMemo(
    () => (post ? processBlogHtml(post.content) : ""),
    [post],
  );

  useEffect(() => {
    if (!slug) return;
    (async () => {
      let found = initialPost ?? null;
      if (!found) {
        found = await getBlogBySlug(slug);
        setPost(found ?? null);
        if (found) document.title = `${found.title} | Chanchal Verma`;
      }
      if (found) {
        const all = await getPublishedBlogs();
        const current = found;
        setRelatedPosts(
          all
            .filter(
              (p) =>
                p.id !== current.id &&
                (p.category === current.category || p.tags.some((t) => current.tags.includes(t))),
            )
            .slice(0, 2),
        );
      }
    })();
  }, [slug, initialPost]);

  if (post === undefined) {
    return (
      <>
        <Navbar />
        <main className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="h-5 w-24 animate-pulse bg-ink/8" />
            <div className="h-12 w-3/4 animate-pulse bg-ink/8" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 animate-pulse bg-ink/8" style={{ width: `${92 - i * 6}%` }} />
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
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-cobalt">
            404 — Not filed
          </p>
          <h1 className="text-display mt-3 text-3xl font-bold text-ink">Post not found</h1>
          <p className="mt-3 text-ink/60">This post may have been removed or the URL is incorrect.</p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 border-[1.5px] border-ink bg-ink px-5 py-2.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.05em] text-page transition hover:border-cobalt hover:bg-cobalt"
          >
            <ArrowLeft className="size-4" />
            Back to field notes
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-5 py-12 sm:px-8 lg:py-16">
        <article className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-bold text-ink/60 transition hover:text-cobalt"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to field notes
          </Link>

          {post.coverImage && (
            <div className="mt-10 overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="h-72 w-full object-cover sm:h-96" />
            </div>
          )}

          <div className="mt-10 lg:grid lg:grid-cols-[1fr_260px] lg:items-start lg:gap-12">
            <div>
              <header className="border-b border-border pb-10">
                <div className="flex flex-wrap gap-2">
                  <span className="border border-amber bg-amber/10 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-amber">
                    {post.category}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-display mt-6 text-4xl font-bold text-ink sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 text-xl leading-8 text-ink/65">{post.excerpt}</p>

                <div className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[0.78rem] font-semibold text-ink/50">
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

              <div className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-8">
                <ShareButtons title={post.title} />
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-bold text-ink/60 transition hover:text-cobalt"
                >
                  More posts
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <section className="mt-14">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-ink/45">
                    Related
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/post/${rel.slug}/`}
                        className="group border border-border bg-surface p-5 transition hover:border-cobalt/40"
                      >
                        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink/40">
                          {rel.category}
                        </p>
                        <h3 className="mt-2 font-bold text-ink transition group-hover:text-cobalt">
                          {rel.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-ink/55">{rel.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="hidden lg:sticky lg:top-24 lg:block">
              <Toc html={processedHtml} />
              <div className="mt-5 border border-border bg-surface p-5">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink/45">
                  Author
                </p>
                <p className="mt-3 font-bold text-ink">Chanchal Verma</p>
                <p className="mt-1 text-sm text-ink/55">Senior Full Stack Engineer</p>
                <p className="mt-3 font-mono text-[0.72rem] text-ink/40">Abu Dhabi, UAE</p>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />

      <style>{`
        .prose-blog{color:var(--ink);opacity:1;line-height:1.85;font-size:1.0625rem;}
        .prose-blog *{color:inherit;}
        .prose-blog h1,.prose-blog h2,.prose-blog h3,.prose-blog h4{font-family:var(--font-display),sans-serif;color:var(--ink);font-weight:700;line-height:1.2;margin-top:2.5rem;margin-bottom:1rem;text-transform:uppercase;letter-spacing:0.01em;}
        .prose-blog h1{font-size:1.9rem;}.prose-blog h2{font-size:1.55rem;}.prose-blog h3{font-size:1.3rem;}.prose-blog h4{font-size:1.1rem;}
        .prose-blog p{margin-bottom:1.5rem;opacity:0.85;}
        .prose-blog a{color:var(--cobalt);text-decoration:underline;text-underline-offset:3px;}
        .prose-blog a:hover{opacity:0.8;}
        .prose-blog strong{color:var(--ink);font-weight:700;}
        .prose-blog em{font-style:italic;}
        .prose-blog blockquote{border-left:2px solid var(--cobalt);padding-left:1.25rem;margin:2rem 0;color:var(--ink-soft);font-style:italic;}
        .prose-blog code{font-family:var(--font-ibm-mono),monospace;font-size:0.875em;background:var(--muted);border:1px solid var(--border);padding:0.15em 0.4em;color:var(--cobalt);}
        .prose-blog pre{background:var(--page);border:1px solid var(--border);padding:1.25rem 1.5rem;overflow-x:auto;margin:2rem 0;}
        .prose-blog pre code{background:none;border:none;padding:0;color:var(--ink);font-size:0.875rem;line-height:1.7;}
        .prose-blog ul{list-style:disc;padding-left:1.5rem;margin-bottom:1.5rem;}
        .prose-blog ol{list-style:decimal;padding-left:1.5rem;margin-bottom:1.5rem;}
        .prose-blog li{margin-bottom:0.5rem;}
        .prose-blog hr{border:none;border-top:1px solid var(--border);margin:2.5rem 0;}
        .prose-blog img{max-width:100%;height:auto;margin:2rem 0;border:1px solid var(--border);}
        .prose-blog table{width:100%;border-collapse:collapse;margin:2rem 0;font-size:0.9375rem;}
        .prose-blog th{background:var(--surface-soft);font-weight:700;text-align:left;padding:0.75rem 1rem;border:1px solid var(--border);color:var(--ink);}
        .prose-blog td{padding:0.75rem 1rem;border:1px solid var(--border);color:var(--ink);}
        .prose-blog .callout{padding:1.25rem 1.5rem;margin:2rem 0;border:1px solid;}
        .prose-blog .callout-info{background:var(--cobalt-light);border-color:var(--violet);}
        .prose-blog .callout-warning{background:color-mix(in srgb, var(--amber) 10%, transparent);border-color:var(--amber);}
        .prose-blog .callout-danger{background:var(--coral-light);border-color:var(--coral);}
      `}</style>
    </>
  );
}

function QueryParamPost() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("id") ?? undefined;
  return <BlogPostView slug={slug} />;
}

export function BlogPostClient({ initialPost }: { initialPost?: StoredBlogPost }) {
  if (initialPost) {
    return <BlogPostView slug={initialPost.slug} initialPost={initialPost} />;
  }
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    }>
      <QueryParamPost />
    </Suspense>
  );
}
