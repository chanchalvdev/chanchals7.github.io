import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { capabilities, education, experience, heroMetrics, heroRoles, projects, profile } from "@/content/portfolio";
import type { StoredBlogPost } from "@/lib/blog-storage";
import type { GitHubContributionWeek } from "@/lib/github";
import type { ShipEvent } from "@/lib/shipping";
import { AskTile } from "@/components/chat/ask-tile";
import { LocalClock } from "@/components/ui/local-clock";
import { RoleRotator } from "@/components/ui/role-rotator";
import { GitHubTile } from "@/components/sections/github-tile";

const MAX_HERO_POSTS = 4;

export function HeroBento({
  flagshipSlug,
  contributions,
  latestShip,
  posts,
}: {
  flagshipSlug: string;
  contributions: { weeks: GitHubContributionWeek[]; total: number } | null;
  latestShip?: ShipEvent;
  /** Published posts, newest first — a build-time snapshot; publishing triggers a redeploy. */
  posts: StoredBlogPost[];
}) {
  const flagship = projects.find((project) => project.slug === flagshipSlug)!;
  const current = experience[0];
  const study = education.find((entry) => entry.period.includes("Present"));
  const [years, countries] = heroMetrics;

  return (
    <section id="main" className="px-3 pb-4 pt-4 sm:px-6">
      <div className="mx-auto grid max-w-[82rem] gap-3.5 lg:grid-cols-12">
        {/* Intro */}
        <div className="tile fade-up flex flex-col p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
          <h1>
            <span className="lbl block text-ink-faint">
              {profile.name} · AI Engineer · Forward Deployed Engineer · AI Security Engineer
            </span>{" "}
            <span className="text-display mt-6 block text-[2.6rem] font-extrabold text-ink sm:text-6xl xl:text-[4.25rem]">
              I build AI agents that <span className="serif-accent mark-lime">ship</span> — and keep them
              safe.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            Building agentic AI at <b className="font-semibold text-ink">{current.company}</b>. I embed
            with teams, turn messy real-world problems into production agentic systems, and build
            security in from day one.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8 text-sm text-ink-faint">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--tile-lime-bg)] py-1.5 pl-3 pr-3.5 font-semibold text-[var(--tile-lime-fg)] transition hover:opacity-85"
            >
              <span className="live-dot pulse-dot text-[#1d7a3a]" aria-hidden="true" />
              Open to work · relocation worldwide
            </a>
            <span>
              Roles: <RoleRotator roles={heroRoles} />
            </span>
          </div>
        </div>

        {/* Ask my AI */}
        <div className="fade-up delay-1 lg:col-span-5">
          <AskTile />
        </div>

        {/* Writing — a plain list of post titles; falls back to the local clock until there's a post */}
        {posts.length > 0 ? (
          <div className="tile tile-sky fade-up delay-2 flex flex-col p-6 lg:col-span-5">
            <Link
              href="/blog/"
              className="lbl inline-flex w-fit items-center gap-2 underline-offset-4 hover:underline"
            >
              Writing
              <span className="rounded-full bg-[var(--tile-ink-bg)] px-2 py-0.5 text-[var(--tile-ink-fg)]">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </Link>
            <ul className="mt-3 flex-1">
              {posts.slice(0, MAX_HERO_POSTS).map((post) => (
                <li key={post.id} className="border-t border-current/15 first:border-t-0">
                  <a
                    href={`/blog/post/${post.slug}/`}
                    target="_blank"
                    rel="noopener"
                    title={post.title}
                    className="group flex items-center justify-between gap-3 py-2.5 font-semibold leading-snug"
                  >
                    <span className="line-clamp-1 underline-offset-4 group-hover:underline">{post.title}</span>
                    <ArrowUpRight className="size-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/blog/"
              className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              All writing
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="tile tile-ink fade-up delay-2 p-6 lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -right-6 -top-6 size-24 rounded-full bg-[radial-gradient(circle,#ffd36b,#ff8a3d)]"
            />
            <p className="lbl on-tile-soft relative">Abu Dhabi · GST</p>
            <LocalClock className="relative mt-2 block text-4xl font-extrabold tracking-tight sm:text-5xl" />
          </div>
        )}

        {/* Flagship project — text only; its cover image lives on the case study page */}
        <Link
          href={`/projects/${flagship.slug}`}
          className="tile tile-hover group fade-up delay-3 flex flex-col p-7 sm:p-10 lg:col-span-7 lg:row-span-2"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="lbl flex flex-wrap items-center gap-2 text-ink-faint">
              <span className="rounded-full bg-[var(--tile-lime-bg)] px-2.5 py-0.5 text-[var(--tile-lime-fg)]">
                Flagship
              </span>
              {flagship.category} · {flagship.year}
            </p>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)] transition group-hover:rotate-45">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="text-display mt-6 text-4xl font-extrabold text-ink sm:text-5xl">
            {flagship.title.split(" — ")[0]}
          </p>
          <p className="mt-2 text-lg font-semibold text-ink-soft">
            {flagship.title.split(" — ")[1] ?? flagship.category}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft line-clamp-3">{flagship.description}</p>
          <dl className="mt-6 flex flex-wrap gap-2">
            {flagship.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-surface-warm px-3.5 py-2">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="text-base font-bold leading-tight text-ink">{metric.value}</dd>
                <dd className="text-xs text-ink-soft">{metric.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-auto pt-6 font-mono text-xs leading-relaxed text-ink-faint">
            {flagship.stack.join(" · ")}
          </p>
        </Link>

        {/* How I work */}
        <div className="tile tile-ink fade-up delay-3 p-6 sm:p-7 lg:col-span-5">
          <p className="lbl on-tile-soft">How I work</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight">
            {capabilities.slice(0, 2).map((step) => `${step.title}. `)}
            <span className="serif-accent text-[var(--tile-lime-bg)]">{capabilities[2].title}.</span>
          </p>
          <ol className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {capabilities.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-[var(--tile-ink-raised)] p-4">
                <span className="font-mono text-xs text-[var(--tile-lime-bg)]">0{index + 1}</span>
                <p className="mt-1.5 text-sm leading-snug" title={step.text}>{step.short}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Studying */}
        {study ? (
          <div className="tile tile-lav fade-up delay-4 flex items-center gap-4 p-6 lg:col-span-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[var(--tile-ink-bg)] text-[var(--tile-lav-bg)] dark:text-[var(--tile-lav-fg)]">
              <GraduationCap className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight tracking-tight">
                {study.degree.replace(/^M\.S\. — /, "MS in ")}
              </p>
              <p className="on-tile-soft mt-1 text-sm">
                {study.school} · {study.period}
              </p>
            </div>
          </div>
        ) : null}

        {/* Numbers + GitHub */}
        <div className="tile fade-up delay-5 p-6 lg:col-span-3">
          <p className="lbl text-ink-faint">Experience</p>
          <p className="mt-2 text-5xl font-extrabold tracking-tight text-ink">{years.value} yrs</p>
        </div>
        <div className="tile fade-up delay-5 p-6 lg:col-span-3">
          <p className="lbl text-ink-faint">{countries.label}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {countries.value.split(" · ").map((country) => (
              <li key={country} className="chip">{country}</li>
            ))}
          </ul>
        </div>
        <div className="fade-up delay-5 lg:col-span-6">
          <GitHubTile
            weeks={contributions?.weeks ?? null}
            total={contributions?.total ?? null}
            latest={latestShip}
            href={profile.github}
          />
        </div>
      </div>
    </section>
  );
}
