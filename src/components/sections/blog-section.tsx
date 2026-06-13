import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";

export function BlogSection() {
  return (
    <section id="writing" className="section-shell bg-white">
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
              className="mt-8 inline-flex h-10 items-center gap-2 rounded-lg border border-ink/10 bg-page px-4 text-sm font-semibold text-ink/68 transition hover:-translate-y-0.5 hover:border-cobalt/25 hover:text-cobalt"
            >
              All notes
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Right: posts list */}
          <div className="divide-y divide-ink/8 rounded-xl border border-ink/10 bg-white shadow-soft">
            {posts.map((post, i) => (
              <article key={post.slug} className={`p-6 sm:p-7 ${i === 0 ? "pb-6" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-cobalt/16 bg-cobalt/6 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-cobalt"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Meta */}
                  <p className="shrink-0 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/32">
                    {post.date} · {post.readTime}
                  </p>
                </div>

                <Link href={`/blog/${post.slug}`} className="group mt-4 block">
                  <h3 className="text-xl font-bold leading-snug text-ink transition group-hover:text-cobalt sm:text-2xl">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-3 text-sm leading-7 text-ink/55">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cobalt/80 transition hover:text-cobalt"
                >
                  Read more
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
