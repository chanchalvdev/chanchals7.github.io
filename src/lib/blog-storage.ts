import { supabase } from "./supabase";

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

// ── DB row ↔ TS object ────────────────────────────────────────────────────────

type DBRow = Record<string, unknown>;

function fromDB(row: DBRow): StoredBlogPost {
  return {
    id: row.id as string,
    title: (row.title as string) ?? "",
    slug: row.slug as string,
    content: (row.content as string) ?? "",
    excerpt: (row.excerpt as string) ?? "",
    category: (row.category as string) ?? "",
    tags: (row.tags as string[]) ?? [],
    coverImage: (row.cover_image as string) || undefined,
    status: row.status as "draft" | "published",
    seoTitle: (row.seo_title as string) || undefined,
    seoDescription: (row.seo_description as string) || undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    publishedAt: (row.published_at as string) || undefined,
    readTime: (row.read_time as string) ?? "1 min read",
    wordCount: (row.word_count as number) ?? 0,
  };
}

function toDB(post: StoredBlogPost): DBRow {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    cover_image: post.coverImage ?? null,
    status: post.status,
    seo_title: post.seoTitle ?? null,
    seo_description: post.seoDescription ?? null,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
    published_at: post.publishedAt ?? null,
    read_time: post.readTime,
    word_count: post.wordCount,
  };
}

// ── CRUD (async — Supabase) ───────────────────────────────────────────────────

export async function getBlogs(): Promise<StoredBlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data.map(fromDB);
}

export async function getPublishedBlogs(): Promise<StoredBlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data.map(fromDB);
}

export async function getBlogBySlug(slug: string): Promise<StoredBlogPost | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return fromDB(data);
}

export async function getBlogById(id: string): Promise<StoredBlogPost | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return fromDB(data);
}

export async function saveBlog(post: StoredBlogPost): Promise<boolean> {
  const { error } = await supabase.from("blogs").upsert(toDB(post));
  return !error;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  return !error;
}

// ── Utilities (sync, no DB) ───────────────────────────────────────────────────

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

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
