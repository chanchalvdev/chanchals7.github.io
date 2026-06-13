import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { posts } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering notes by Chanchal Verma on secure AI workflows, frontend systems, backend services, and cloud products.",
};

export default function BlogIndexPage() {
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

          <SectionHeading
            className="mt-10"
            eyebrow="Writing"
            title="Architecture notes with product memory."
            description="Notes on secure AI workflows, frontend systems, backend service design, and the judgment that makes products easier to trust."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(16,18,20,0.09)]">
                <BookOpen className="mb-5 size-5 text-coral" aria-hidden="true" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tone="blue">{tag}</Tag>
                  ))}
                </div>
                <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink/44">
                  {post.date} / {post.readTime}
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">
                  {post.title}
                </h2>
                <p className="mt-4 leading-7 text-ink/62">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                >
                  Read post
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
