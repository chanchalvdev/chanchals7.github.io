export interface StoredBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  readTime: string;
  wordCount: number;
}

const STORAGE_KEY = "portfolio_blogs_v1";

export function getBlogs(): StoredBlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredBlogPost[]) : [];
  } catch {
    return [];
  }
}

export function getBlogBySlug(slug: string): StoredBlogPost | null {
  return getBlogs().find((b) => b.slug === slug) ?? null;
}

export function getBlogById(id: string): StoredBlogPost | null {
  return getBlogs().find((b) => b.id === id) ?? null;
}

export function saveBlog(blog: StoredBlogPost): void {
  const blogs = getBlogs();
  const idx = blogs.findIndex((b) => b.id === blog.id);
  if (idx >= 0) {
    blogs[idx] = blog;
  } else {
    blogs.push(blog);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

export function deleteBlog(id: string): void {
  const blogs = getBlogs().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function calculateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

export function getPublishedBlogs(): StoredBlogPost[] {
  return getBlogs()
    .filter((b) => b.status === "published")
    .sort((a, b) => {
      const dateA = a.publishedAt ?? a.createdAt;
      const dateB = b.publishedAt ?? b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
