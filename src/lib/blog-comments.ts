import { supabase } from "./supabase";

/**
 * Reader comments on blog posts. Visitors submit through the blog-comments
 * Edge Function (rate-limited, held for approval); approved comments are read
 * straight from the table, where RLS hides everything else. The admin reads
 * and moderates through the same table with their Supabase session.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Comments only appear once the function and migration are deployed and the
// build opts in (NEXT_PUBLIC_COMMENTS_ENABLED=true), so readers never meet a
// form that can't save.
const enabled = process.env.NEXT_PUBLIC_COMMENTS_ENABLED === "true";

/** Null when comments are disabled or Supabase isn't configured — the section then stays hidden. */
export const COMMENTS_ENDPOINT =
  enabled && supabaseUrl ? `${supabaseUrl}/functions/v1/blog-comments` : null;

export const COMMENT_MAX_NAME = 60;
export const COMMENT_MAX_BODY = 2000;

export type CommentStatus = "pending" | "approved" | "rejected";

export interface BlogComment {
  id: string;
  postSlug: string;
  authorName: string;
  body: string;
  status: CommentStatus;
  createdAt: string;
}

type DBRow = Record<string, unknown>;

function fromDB(row: DBRow): BlogComment {
  return {
    id: row.id as string,
    postSlug: row.post_slug as string,
    authorName: (row.author_name as string) ?? "",
    body: (row.body as string) ?? "",
    status: row.status as CommentStatus,
    createdAt: row.created_at as string,
  };
}

const PUBLIC_COLUMNS = "id,post_slug,author_name,body,status,created_at";

export async function getApprovedComments(slug: string): Promise<BlogComment[]> {
  // Filter on status explicitly: a logged-in admin's session can see every row.
  const { data, error } = await supabase
    .from("blog_comments")
    .select(PUBLIC_COLUMNS)
    .eq("post_slug", slug)
    .eq("status", "approved")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data.map(fromDB);
}

export async function submitComment(input: {
  slug: string;
  name: string;
  body: string;
  website: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!COMMENTS_ENDPOINT) return { ok: false, error: "Comments are turned off" };
  try {
    const res = await fetch(COMMENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(input),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: data?.error ?? "Couldn't send your comment — please try again" };
  } catch {
    return { ok: false, error: "Couldn't reach the server — check your connection and try again" };
  }
}

// ── Admin ────────────────────────────────────────────────────────────────────

export async function getAllComments(): Promise<BlogComment[]> {
  const { data, error } = await supabase
    .from("blog_comments")
    .select(PUBLIC_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error || !data) return [];
  return data.map(fromDB);
}

export async function setCommentStatus(id: string, status: CommentStatus): Promise<boolean> {
  const { error } = await supabase.from("blog_comments").update({ status }).eq("id", id);
  return !error;
}

export async function deleteComment(id: string): Promise<boolean> {
  const { error } = await supabase.from("blog_comments").delete().eq("id", id);
  return !error;
}
