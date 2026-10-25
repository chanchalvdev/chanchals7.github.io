"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Link2 } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SheetLoader } from "@/components/ui/sheet-loader";
import { BlogComments } from "@/components/blog/blog-comments";
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
    <nav aria-label="Table of contents" className="tile p-6">
      <p className="lbl text-ink-faint">Contents</p>
      <ul className="mt-4 grid gap-2">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 0.875}rem` }}>
            <a
              href={`#${h.id}`}
              className="text-sm font-medium leading-snug text-ink-soft transition hover:text-ink"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const shareBtn =
  "grid size-10 place-items-center rounded-full border border-border bg-surface-warm text-ink-soft transition hover:bg-[var(--tile-ink-bg)] hover:text-[var(--tile-ink-fg)]";

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
      <span className="lbl mr-1 text-ink-faint">Share</span>
      <a href={twitterUrl} target="_blank" rel="noreferrer" aria-label="Share on X (opens in a new tab)" className={shareBtn}>
        <BrandIcon brand="x" className="size-3.5" />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn (opens in a new tab)" className={shareBtn}>
        <BrandIcon brand="linkedin" className="size-4" />
      </a>
      <button onClick={copyLink} aria-label={copied ? "Link copied" : "Copy link"} className={shareBtn}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}

const backLink =
  "inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink";

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
                ((current.category && p.category === current.category) ||
                  p.tags.some((t) => current.tags.includes(t))),
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
        <main className="px-3 pb-6 pt-6 sm:px-6">
          <div className="tile mx-auto max-w-[82rem] space-y-4 p-7 sm:p-10">
            <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
            <div className="h-12 w-3/4 animate-pulse rounded-full bg-muted" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded-full bg-muted" style={{ width: `${92 - i * 6}%` }} />
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
        <main className="px-3 pb-6 pt-6 sm:px-6">
          <div className="tile mx-auto flex min-h-[60vh] max-w-[82rem] flex-col items-center justify-center px-7 py-20 text-center">
            <p className="bp-divider lbl text-ink-faint">404 · Not found</p>
            <h1 className="text-display mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
              Post not <span className="serif-accent">found</span>
            </h1>
            <p className="mt-4 text-ink-soft">This post may have been removed or the URL is incorrect.</p>
            <Link
              href="/blog"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--tile-ink-bg)] px-5 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to writing
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const date = post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt);

  return (
    <>
      <Navbar />
      <main>
        <article className="px-3 pb-6 pt-6 sm:px-6">
          <div className="mx-auto grid max-w-[82rem] gap-3.5 lg:grid-cols-12">
            <header className="tile p-7 sm:p-10 lg:col-span-12">
              <Link href="/blog" className={backLink}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to writing
              </Link>
              <p className="lbl mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-ink-faint">
                {post.category ? (
                  <span className="rounded-full bg-[var(--tile-lime-bg)] px-2.5 py-0.5 text-[var(--tile-lime-fg)]">
                    {post.category}
                  </span>
                ) : null}
                <span className="whitespace-nowrap">{date}</span>
                <span className="whitespace-nowrap">· {post.readTime}</span>
                <span className="whitespace-nowrap">· {post.wordCount.toLocaleString()} words</span>
              </p>
              <h1 className="text-display mt-5 max-w-4xl text-4xl font-extrabold text-ink sm:text-6xl">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">{post.excerpt}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {post.tags.length > 0 ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li key={tag} className="chip font-mono text-xs font-medium">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
                <ShareButtons title={post.title} />
              </div>
            </header>

            {post.coverImage && (
              <div className="tile lg:col-span-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} className="aspect-[1200/630] max-h-[28rem] w-full object-cover" />
              </div>
            )}

            <div className="grid content-start gap-3.5 lg:col-span-8">
              <div className="tile p-7 sm:p-10">
                <div
                  ref={articleRef}
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7">
                  <ShareButtons title={post.title} />
                  <Link
                    href="/blog"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--tile-ink-bg)] px-4 text-sm font-semibold text-[var(--tile-ink-fg)] transition hover:opacity-85"
                  >
                    More posts
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <BlogComments slug={post.slug} />

              {relatedPosts.length > 0 && (
                <section aria-labelledby="related-heading" className="grid gap-3.5 sm:grid-cols-2">
                  <h2 id="related-heading" className="sr-only">Related posts</h2>
                  {relatedPosts.map((rel, index) => (
                    <Link
                      key={rel.id}
                      href={`/blog/post/${rel.slug}/`}
                      className={`tile tile-hover group flex flex-col p-6 ${["tile-lav", "tile-sky"][index % 2]}`}
                    >
                      <p className="lbl on-tile-soft">Related{rel.category ? ` · ${rel.category}` : ""}</p>
                      <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-tight">{rel.title}</h3>
                      {rel.excerpt ? (
                        <p className="on-tile-soft mt-2 line-clamp-2 text-sm leading-relaxed">{rel.excerpt}</p>
                      ) : null}
                      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold">
                        Read
                        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </section>
              )}
            </div>

            <aside className="grid h-fit gap-3.5 lg:sticky lg:top-24 lg:col-span-4">
              <div className="hidden lg:block">
                <Toc html={processedHtml} />
              </div>
              <div className="tile tile-lime p-6">
                <p className="lbl on-tile-soft">Written by</p>
                <p className="mt-3 text-xl font-extrabold tracking-tight">Chanchal Verma</p>
                <p className="on-tile-soft mt-1 text-sm">AI Engineer · Forward Deployed Engineer</p>
                <p className="lbl on-tile-soft mt-4">Abu Dhabi, UAE</p>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />

      <style>{`
        .prose-blog{color:var(--ink);line-height:1.8;font-size:1.0625rem;}
        .prose-blog *{color:inherit;}
        .prose-blog > :first-child{margin-top:0;}
        .prose-blog h1,.prose-blog h2,.prose-blog h3,.prose-blog h4{font-family:var(--font-space),sans-serif;color:var(--ink);font-weight:800;line-height:1.15;letter-spacing:-0.03em;margin-top:2.5rem;margin-bottom:0.9rem;scroll-margin-top:6rem;}
        .prose-blog h1{font-size:2rem;}.prose-blog h2{font-size:1.65rem;}.prose-blog h3{font-size:1.3rem;}.prose-blog h4{font-size:1.1rem;}
        .prose-blog p{margin-bottom:1.4rem;color:var(--ink-soft);}
        .prose-blog a{color:var(--ink);text-decoration:underline;text-decoration-color:var(--tile-lime-bg);text-decoration-thickness:3px;text-underline-offset:3px;}
        .prose-blog a:hover{background:var(--tile-lime-bg);color:var(--tile-lime-fg);}
        .prose-blog strong{color:var(--ink);font-weight:700;}
        .prose-blog em{font-style:italic;}
        .prose-blog blockquote{border-left:4px solid var(--tile-lime-bg);border-radius:2px;padding:0.25rem 0 0.25rem 1.25rem;margin:2rem 0;font-family:var(--font-serif),Georgia,serif;font-size:1.35rem;line-height:1.45;font-style:italic;}
        .prose-blog blockquote p{color:var(--ink);margin-bottom:0.5rem;}
        .prose-blog code{font-family:var(--font-ibm-mono),monospace;font-size:0.86em;background:var(--surface-warm);padding:0.15em 0.45em;border-radius:0.4rem;}
        .prose-blog pre{background:var(--tile-ink-bg);color:var(--tile-ink-fg);border-radius:1.25rem;padding:1.25rem 1.5rem;overflow-x:auto;margin:2rem 0;}
        .prose-blog pre code{background:none;padding:0;color:inherit;font-size:0.875rem;line-height:1.7;border-radius:0;}
        .prose-blog ul{list-style:disc;padding-left:1.5rem;margin-bottom:1.4rem;}
        .prose-blog ol{list-style:decimal;padding-left:1.5rem;margin-bottom:1.4rem;}
        .prose-blog li{margin-bottom:0.5rem;color:var(--ink-soft);}
        .prose-blog li::marker{color:var(--ink-faint);}
        .prose-blog hr{border:none;border-top:1px solid var(--border);margin:2.5rem 0;}
        .prose-blog img{max-width:100%;height:auto;margin:2rem 0;border-radius:1.25rem;border:1px solid var(--border);}
        .prose-blog table{width:100%;border-collapse:separate;border-spacing:0;margin:2rem 0;font-size:0.9375rem;border:1px solid var(--border);border-radius:1rem;overflow:hidden;}
        .prose-blog th{background:var(--surface-warm);font-weight:700;text-align:left;padding:0.75rem 1rem;color:var(--ink);}
        .prose-blog td{padding:0.75rem 1rem;border-top:1px solid var(--border);color:var(--ink);}
        .prose-blog th + th,.prose-blog td + td{border-left:1px solid var(--border);}
        .prose-blog .callout{padding:1.25rem 1.5rem;margin:2rem 0;border-radius:1.25rem;}
        .prose-blog .callout p{color:inherit;margin-bottom:0.5rem;}
        .prose-blog .callout-info{background:var(--tile-sky-bg);color:var(--tile-sky-fg);}
        .prose-blog .callout-warning{background:var(--tile-peach-bg);color:var(--tile-peach-fg);}
        .prose-blog .callout-danger{background:var(--coral-light);color:var(--ink);}
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
      <div className="flex min-h-screen items-center justify-center px-5">
        <SheetLoader label="Fetching post" skeleton />
      </div>
    }>
      <QueryParamPost />
    </Suspense>
  );
}
