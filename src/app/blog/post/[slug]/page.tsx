import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostClient } from "@/components/blog/blog-post-client";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blog-storage";
import { extractPlainTextExcerpt } from "@/lib/blog-html";
import { absoluteUrl } from "@/lib/site";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/structured-data";

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
    keywords: post.tags,
    authors: [{ name: "Chanchal Verma", url: absoluteUrl("/") }],
    alternates: { canonical: `/blog/post/${post.slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/blog/post/${post.slug}/`),
      publishedTime: post.publishedAt ?? post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ["Chanchal Verma"],
      section: post.category,
      tags: post.tags,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function StaticBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const description =
    post.seoDescription || post.excerpt || extractPlainTextExcerpt(post.content);

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingSchema({ ...post, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog/" },
            { name: post.title, path: `/blog/post/${post.slug}/` },
          ]),
        )}
      />
      <BlogPostClient initialPost={post} />
    </>
  );
}
