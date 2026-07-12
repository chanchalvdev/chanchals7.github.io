import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";
import { getPublishedBlogs } from "@/lib/blog-storage";

export const dynamic = "force-static";

const BASE_URL = "https://chanchal-verma.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogs();

  return [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/projects/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog/`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/post/${post.slug}/`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
