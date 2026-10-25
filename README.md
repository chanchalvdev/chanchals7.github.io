# chanchalverma.dev

Source for [chanchalverma.dev](https://chanchalverma.dev), the portfolio of **Chanchal Verma**, an AI Engineer and Forward Deployed Engineer based in Abu Dhabi.

> I build AI agents that ship — and keep them safe.

The site is a statically exported Next.js app hosted on GitHub Pages. The dynamic parts (blog posts, comments and the "Ask about me" chat) run on Supabase.

## What's on the site

- **Home**: a bento layout with roles, experience, skills, a live GitHub contributions graph and the featured project.
- **Projects** (`/projects`): case studies for [Casewright](https://chanchalverma.dev/projects/go-siem-agent-llm-classifier/), [ThreatRAG](https://chanchalverma.dev/projects/threat-rag/) and the Enterprise File Ingestion Platform.
- **Blog** (`/blog`): posts written in a built-in rich-text editor, with moderated reader comments.
- **Ask about me**: a chat that answers visitors' questions about Chanchal, using only the site's own [`llms.txt`](src/app/llms.txt).
- **Admin** (`/admin`): a signed-in area for writing posts and approving comments.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | Next.js 15 (static export), React 19, TypeScript, Tailwind CSS 4 |
| Editor | Tiptap, with DOMPurify sanitising post HTML |
| Backend | Supabase: Postgres with row-level security, Auth and Edge Functions (Deno) |
| AI | Gemini, falling back to a second Gemini model and then OpenRouter |
| Testing | Vitest (unit), Playwright (end-to-end) |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## How it fits together

```
Browser ── static pages ──▶ GitHub Pages (built by .github/workflows/deploy.yml)
   │
   ├── blog posts, approved comments ──▶ Supabase Postgres (RLS)
   ├── new comment ──────────────────▶ Edge Function: blog-comments
   ├── chat question ────────────────▶ Edge Function: ask-me ──▶ Gemini / OpenRouter
   └── admin publishes a post ───────▶ Edge Function: trigger-deploy ──▶ GitHub Actions rebuild
```

API keys for Gemini, OpenRouter and GitHub live only in Supabase function secrets and never reach the browser. The chat and comments functions only accept requests from the site itself, enforce per-visitor and daily rate limits in Postgres, and filter what they accept and return.

## Running it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev   # http://localhost:3000
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>

# Optional: show the chat and comments (needs the Edge Functions deployed)
NEXT_PUBLIC_ASK_ME_ENABLED=true
NEXT_PUBLIC_COMMENTS_ENABLED=true

# Optional: higher-quality GitHub contributions graph at build time
GITHUB_TOKEN=<GitHub token>

# Only for scripts/setup-supabase.mjs
SUPABASE_DB_URL=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=<service role key>
ADMIN_EMAIL=<admin login email>
ADMIN_PASSWORD=<admin login password>
```

Without the Supabase variables the site still builds and runs; the blog, chat and comments are simply hidden.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static site into `out/` |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |

## Supabase setup

First-time setup creates the blog table, its access rules and the admin user:

```bash
node scripts/setup-supabase.mjs
```

Then apply the migrations and deploy the Edge Functions with the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase functions deploy ask-me
supabase functions deploy blog-comments
supabase functions deploy trigger-deploy
```

Function secrets (Dashboard → Edge Functions → Secrets):

| Secret | Used by | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | ask-me | Required; free key from [Google AI Studio](https://aistudio.google.com/apikey) |
| `OPENROUTER_API_KEY` | ask-me | Optional; last-resort fallback when Gemini is down |
| `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL`, `OPENROUTER_MODEL` | ask-me | Optional model overrides |
| `GH_DISPATCH_TOKEN`, `GH_REPO`, `GH_WORKFLOW` | trigger-deploy | Lets publishing a post rebuild the site |

Each function's header comment lists its full set of options.

## Deployment

Every push to `master` builds and deploys the site to GitHub Pages. Publishing a post from `/admin` also starts a rebuild through the `trigger-deploy` function. Deploys run one at a time, so the newest build always lands last.

The workflow reads these repository settings:

- **Secrets:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GH_PAT`
- **Variables:** `ASK_ME_ENABLED`, `COMMENTS_ENABLED` (set to `true` to show the chat and comments)

Edge Functions are not deployed by this workflow. After changing anything in `supabase/functions/`, deploy it with `supabase functions deploy <name>`.

## Project layout

```
src/app/          Pages and routes (home, projects, blog, admin), llms.txt, sitemap, feed
src/components/   UI sections, blog editor and viewer, chat, layout
src/content/      Portfolio content: profile, experience, skills, projects
src/lib/          Supabase client, chat wiring, helpers
supabase/         Edge Functions and database migrations
case-study/       Source material for the project case studies
scripts/          One-time Supabase setup
e2e/              Playwright smoke tests
```

Most text on the site comes from [`src/content/portfolio.ts`](src/content/portfolio.ts).

## Contact

- Site: [chanchalverma.dev](https://chanchalverma.dev)
- Email: chanchalverma.dev@gmail.com
- LinkedIn: [linkedin.com/in/chanchalvdev](https://linkedin.com/in/chanchalvdev/)
- GitHub: [@chanchalvdev](https://github.com/chanchalvdev)
