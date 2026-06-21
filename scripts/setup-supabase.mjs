/**
 * One-time Supabase setup script.
 * Creates the blogs table + RLS policies + admin user.
 *
 * Usage:
 *   node scripts/setup-supabase.mjs
 *
 * Required env vars (set in .env.local or export before running):
 *   SUPABASE_DB_URL          — postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
 *   SUPABASE_SERVICE_ROLE_KEY — from Supabase Dashboard → Settings → API → service_role
 *   ADMIN_EMAIL              — email you want to log in with
 *   ADMIN_PASSWORD           — password you want to log in with
 */

import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually (no dotenv needed) ──────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
try {
  const envPath = resolve(__dir, "../.env.local");
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
} catch {
  // .env.local not found — rely on shell env vars
}

// ── Validate required vars ────────────────────────────────────────────────────
const DB_URL            = process.env.SUPABASE_DB_URL;
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ADMIN_EMAIL       = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD    = process.env.ADMIN_PASSWORD;

const missing = [];
if (!DB_URL)           missing.push("SUPABASE_DB_URL");
if (!SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
if (!SUPABASE_URL)     missing.push("NEXT_PUBLIC_SUPABASE_URL");
if (!ADMIN_EMAIL)      missing.push("ADMIN_EMAIL");
if (!ADMIN_PASSWORD)   missing.push("ADMIN_PASSWORD");

if (missing.length) {
  console.error("\n❌  Missing required environment variables:");
  missing.forEach((v) => console.error(`     ${v}`));
  console.error("\nAdd them to .env.local or export them before running.\n");
  process.exit(1);
}

// ── SQL migration ─────────────────────────────────────────────────────────────
const MIGRATION_SQL = `
-- Blogs table
create table if not exists public.blogs (
  id              text primary key,
  title           text not null default '',
  slug            text unique not null,
  content         text default '',
  excerpt         text default '',
  category        text default '',
  tags            text[] default '{}',
  cover_image     text,
  status          text default 'draft',
  seo_title       text,
  seo_description text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  published_at    timestamptz,
  read_time       text default '1 min read',
  word_count      integer default 0
);

-- Row Level Security
alter table public.blogs enable row level security;

-- Drop existing policies (idempotent re-run)
drop policy if exists "public read published"   on public.blogs;
drop policy if exists "auth full access"        on public.blogs;

-- Anyone can read published posts
create policy "public read published"
  on public.blogs for select
  using (status = 'published');

-- Authenticated users (admin) can do everything
create policy "auth full access"
  on public.blogs for all
  using (auth.uid() is not null);
`;

async function runMigration() {
  console.log("\n📦  Running database migration...");
  try {
    const client = new pg.Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 });
    await client.connect();
    await client.query(MIGRATION_SQL);
    await client.end();
    console.log("✅  Migration complete — blogs table + RLS policies created.");
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED") {
      console.log("⚠️   Direct DB connection blocked (port 5432 is restricted on this network).");
      console.log("     Run this SQL manually in Supabase Dashboard → SQL Editor:\n");
      console.log("─────────────────────────────────────────────────────────────");
      console.log(MIGRATION_SQL);
      console.log("─────────────────────────────────────────────────────────────");
      console.log("\n     Then come back — admin user creation will proceed now.\n");
    } else {
      throw err;
    }
  }
}

// ── Admin user creation ───────────────────────────────────────────────────────
async function createAdminUser() {
  console.log("\n👤  Creating admin user...");
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Check if user already exists
  const { data: existing } = await supabase.auth.admin.listUsers();
  const alreadyExists = existing?.users?.some((u) => u.email === ADMIN_EMAIL);

  if (alreadyExists) {
    console.log(`⚠️   User ${ADMIN_EMAIL} already exists — skipping creation.`);
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error("❌  Failed to create admin user:", error.message);
    process.exit(1);
  }

  console.log(`✅  Admin user created: ${data.user.email}`);
}

// ── Run ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀  Supabase one-time setup");
  console.log("────────────────────────────");
  await runMigration();
  await createAdminUser();
  console.log("\n🎉  Setup complete! You can now:");
  console.log(`     • Log in at /admin/login with ${ADMIN_EMAIL}`);
  console.log("     • Merge the PR — GitHub Actions will deploy with real env vars\n");
}

main().catch((err) => {
  console.error("\n❌  Setup failed:", err.message);
  process.exit(1);
});
