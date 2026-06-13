import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Tag } from "@/components/ui/tag";
import { posts } from "@/content/portfolio";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="px-5 py-12 sm:px-8 lg:py-20">
        <article className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/58 transition hover:text-cobalt"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to writing
          </Link>

          <header className="mt-10 border-b border-ink/10 pb-10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} tone="blue">{tag}</Tag>
              ))}
            </div>
            <p className="mt-7 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink/44">
              {post.date} / {post.readTime}
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-7 text-xl leading-9 text-ink/66">{post.excerpt}</p>
          </header>

          <div className="mt-12 space-y-10">
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
                <div className="mt-4 space-y-5 text-lg leading-9 text-ink/66">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-lg border border-ink/10 bg-white p-5">
            <p className="text-kicker text-cobalt">Continue</p>
            <Link
              href="/blog"
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-ink transition hover:text-cobalt"
            >
              Read more notes on systems and product judgment
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
