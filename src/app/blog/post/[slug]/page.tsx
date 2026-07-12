import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostClient } from "@/components/blog/blog-post-client";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blog-storage";
import { extractPlainTextExcerpt } from "@/lib/blog-html";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) return { title: "Post not found" };

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription || post.excerpt || extractPlainTextExcerpt(post.content);

  return {
    title,
    description,
    alternates: { canonical: `/blog/post/${post.slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ?? post.createdAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StaticBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || post.status !== "published") notFound();

  return <BlogPostClient initialPost={post} />;
}
