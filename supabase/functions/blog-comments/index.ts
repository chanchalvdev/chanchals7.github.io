// Supabase Edge Function: blog-comments
//
// Accepts a reader comment on a blog post and stores it as "pending" until
// the admin approves it in /admin. Approved comments are read straight from
// the blog_comments table (RLS exposes only approved rows to visitors), so
// this function only handles submissions.
//
// Defences, outermost first:
//   1. Origin allowlist — only the portfolio (and localhost) may call it.
//   2. A honeypot field that real visitors never see or fill.
//   3. Input limits on name and comment length; links are capped.
//   4. Durable per-visitor and global daily limits in Postgres.
//   5. Nothing is shown publicly until it's approved.
//
// Deploy:
//   supabase functions deploy blog-comments
//   (or Dashboard → Edge Functions → blog-comments → paste this file → Deploy)
// Database: run supabase/migrations/20261025_blog_comments.sql once.
// Secrets (optional):
//   SITE_URL       — defaults to "https://chanchalverma.dev"
//   COMMENTS_SALT  — salt for hashing visitor IPs
//   COMMENTS_GLOBAL_DAILY_MAX — defaults to 100 comments/day overall

import { createClient } from "npm:@supabase/supabase-js@2";

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://chanchalverma.dev";

const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  SITE_URL.replace("https://", "https://www."),
  "http://localhost:3000",
  "http://localhost:3100",
]);

// Input limits (mirrored by the table's check constraints)
const MAX_NAME = 60;
const MAX_BODY = 2000;
const MIN_BODY = 2;
const MAX_LINKS = 2;

// Rate limits
const BURST_MAX = 3;
const BURST_WINDOW = "10 minutes";
const DAILY_MAX = 10;
const GLOBAL_DAILY_MAX = Number(Deno.env.get("COMMENTS_GLOBAL_DAILY_MAX") ?? 100);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

async function hashIp(ip: string): Promise<string> {
  const salt = Deno.env.get("COMMENTS_SALT") ?? "blog-comments:chanchalverma.dev";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

const REFUSALS: Record<string, [number, string]> = {
  post: [404, "That post isn't accepting comments"],
  burst: [429, "You're commenting quickly — please wait a few minutes and try again"],
  daily: [429, "You've reached today's comment limit — please come back tomorrow"],
  global: [429, "Comments are paused for today — please try again tomorrow"],
};

// Collapse runs of blank lines and strip control characters; the page renders
// comments as plain text, so no HTML handling is needed here.
function clean(text: string): string {
  return text
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin") ?? "";
  const originAllowed = ALLOWED_ORIGINS.has(origin);
  const corsHeaders = {
    "Access-Control-Allow-Origin": originAllowed ? origin : SITE_URL,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (status: number, body: object) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  if (!originAllowed) return json(403, { error: "Not allowed" });

  const input = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!input) return json(400, { error: "Send a comment" });

  // Honeypot: pretend it worked so bots don't learn to skip the field.
  if (typeof input.website === "string" && input.website.trim()) {
    return json(202, { ok: true });
  }

  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  const name = clean(typeof input.name === "string" ? input.name : "").replace(/\s+/g, " ");
  const body = clean(typeof input.body === "string" ? input.body : "");

  if (!slug || slug.length > 200) return json(400, { error: "Unknown post" });
  if (!name || name.length > MAX_NAME) return json(400, { error: `Add your name (up to ${MAX_NAME} characters)` });
  if (body.length < MIN_BODY || body.length > MAX_BODY) {
    return json(400, { error: `Comments can be up to ${MAX_BODY} characters` });
  }
  if ((body.match(/https?:\/\//gi) ?? []).length > MAX_LINKS) {
    return json(400, { error: `Please include at most ${MAX_LINKS} links` });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { data, error } = await supabase.rpc("blog_comment_submit", {
    p_ip_hash: await hashIp(ip),
    p_post_slug: slug,
    p_author_name: name,
    p_body: body,
    p_burst_max: BURST_MAX,
    p_burst_window: BURST_WINDOW,
    p_daily_max: DAILY_MAX,
    p_global_daily_max: GLOBAL_DAILY_MAX,
  });

  if (error) {
    console.error("Comment insert failed:", error.message);
    return json(500, { error: "Couldn't save your comment — please try again later" });
  }

  const refusal = data ? REFUSALS[data as string] : null;
  if (refusal) return json(refusal[0], { error: refusal[1] });

  return json(202, { ok: true });
});
