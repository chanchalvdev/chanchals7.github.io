import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/blog/blog-index-client";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedBlogs } from "@/lib/blog-storage";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import {
  PERSON_ID,
  WEBSITE_ID,
  breadcrumbSchema,
  graph,
} from "@/lib/structured-data";

const DESCRIPTION =
  "Writing by Chanchal Verma on AI security, agentic AI systems, LLM engineering, Go and Node.js backends, Kubernetes, and cloud architecture.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog/",
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    title: `Writing | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: absoluteUrl("/blog/"),
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog/")}#blog`,
            url: absoluteUrl("/blog/"),
            name: `${SITE_NAME} — Writing`,
            description: DESCRIPTION,
            inLanguage: "en",
            isPartOf: { "@id": WEBSITE_ID },
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${absoluteUrl(`/blog/post/${post.slug}/`)}#post`,
              headline: post.title,
              url: absoluteUrl(`/blog/post/${post.slug}/`),
              datePublished: post.publishedAt ?? post.createdAt,
              dateModified: post.updatedAt,
              author: { "@id": PERSON_ID },
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog/" },
          ]),
        )}
      />
      <BlogIndexClient />
    </>
  );
}
