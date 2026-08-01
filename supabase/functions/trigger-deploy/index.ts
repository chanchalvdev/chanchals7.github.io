// Supabase Edge Function: trigger-deploy
//
// Called by the admin panel after publishing a post. Verifies the caller is
// an authenticated Supabase user, then dispatches the GitHub Pages deploy
// workflow so the new post gets its static page + sitemap entry.
//
// Deploy:
//   supabase functions deploy trigger-deploy
// Secrets (Dashboard → Edge Functions → trigger-deploy → Secrets):
//   GH_DISPATCH_TOKEN — fine-grained PAT with Actions read/write on the repo
//   GH_REPO           — e.g. "ChanchalS7/chanchals7.github.io"
//   GH_WORKFLOW       — workflow file name, e.g. "deploy.yml"
//   GH_BRANCH         — ref to run against, e.g. "master"

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (status: number, body: object) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  // Verify the caller's Supabase session — only the logged-in admin may deploy
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return json(401, { error: "Not authenticated" });
  }

  const token = Deno.env.get("GH_DISPATCH_TOKEN");
  const repo = Deno.env.get("GH_REPO");
  const workflow = Deno.env.get("GH_WORKFLOW") ?? "deploy.yml";
  const branch = Deno.env.get("GH_BRANCH") ?? "master";
  if (!token || !repo) {
    return json(500, { error: "GH_DISPATCH_TOKEN / GH_REPO secrets not configured" });
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "portfolio-trigger-deploy",
      },
      body: JSON.stringify({ ref: branch }),
    },
  );

  if (res.status !== 204) {
    const detail = await res.text();
    return json(502, { error: `GitHub dispatch failed (${res.status})`, detail });
  }

  return json(200, { ok: true });
});
