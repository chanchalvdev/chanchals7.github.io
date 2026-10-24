import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { capabilities, education, experience, heroMetrics, heroRoles, projects, profile } from "@/content/portfolio";
import type { GitHubContributionWeek } from "@/lib/github";
import type { ShipEvent } from "@/lib/shipping";
import { AskTile } from "@/components/chat/ask-tile";
import { LocalClock } from "@/components/ui/local-clock";
import { RoleRotator } from "@/components/ui/role-rotator";
import { GitHubTile } from "@/components/sections/github-tile";

export function HeroBento({
  flagshipSlug,
  contributions,
  latestShip,
}: {
  flagshipSlug: string;
  contributions: { weeks: GitHubContributionWeek[]; total: number } | null;
  latestShip?: ShipEvent;
}) {
  const flagship = projects.find((project) => project.slug === flagshipSlug)!;
  const current = experience[0];
  const study = education.find((entry) => entry.period.includes("Present"));
  const [years, shipped] = heroMetrics;

  return (
    <section id="main" className="px-3 pb-4 pt-4 sm:px-6">
      <div className="mx-auto grid max-w-[82rem] gap-3.5 lg:grid-cols-12">
        {/* Intro */}
        <div className="tile fade-up flex flex-col p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
          <h1>
            <span className="lbl block text-ink-faint">
              {profile.name} · AI Engineer · Forward Deployed Engineer
            </span>
            <span className="text-display mt-6 block text-[2.6rem] font-extrabold text-ink sm:text-6xl xl:text-[4.25rem]">
              I build AI agents that <span className="serif-accent mark-lime">ship</span> — and keep them
              safe.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            {current.role} at <b className="font-semibold text-ink">{current.company}</b>. I embed
            with teams, turn messy real-world problems into production agentic systems, and build
            security in from day one.
          </p>
          <p className="mt-auto pt-8 text-sm text-ink-faint">
            Open to: <RoleRotator roles={heroRoles} />
          </p>
        </div>

        {/* Ask my AI */}
        <div className="fade-up delay-1 lg:col-span-5">
          <AskTile />
        </div>

        {/* Clock + status */}
        <div className="fade-up delay-2 grid grid-cols-[1.4fr_1fr] gap-3.5 lg:col-span-5">
          <div className="tile tile-ink p-6">
            <span
              aria-hidden="true"
              className="absolute -right-6 -top-6 size-24 rounded-full bg-[radial-gradient(circle,#ffd36b,#ff8a3d)]"
            />
            <p className="lbl on-tile-soft relative">Abu Dhabi · GST</p>
            <LocalClock className="relative mt-2 block text-4xl font-extrabold tracking-tight sm:text-5xl" />
          </div>
          <a href="#contact" className="tile tile-lime tile-hover flex flex-col justify-between p-6">
            <span className="live-dot pulse-dot text-[#1d7a3a]" aria-hidden="true" />
            <span className="mt-4 text-xl font-bold leading-tight tracking-tight">
              Open to work
              <span className="lbl on-tile-soft mt-1.5 block">relocation · worldwide</span>
            </span>
          </a>
        </div>

        {/* Flagship project */}
        <Link
          href={`/projects/${flagship.slug}`}
          className="tile tile-hover group fade-up delay-3 relative min-h-[22rem] bg-[#0b1530] lg:col-span-7 lg:row-span-2"
        >
          {flagship.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized
            <img
              src={flagship.coverImage}
              alt=""
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-[1.25rem] bg-surface/95 px-5 py-4 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
            <div className="min-w-0">
              <p className="lbl text-ink-faint">Flagship · {flagship.year}</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {flagship.title.split(" — ")[0]}
              </p>
              <p className="mt-0.5 text-sm text-ink-soft">{flagship.title.split(" — ")[1] ?? flagship.category}</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--tile-ink-bg)] text-[var(--tile-ink-fg)] transition group-hover:rotate-45">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
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
          <p className="lbl text-ink-faint">{shipped.label}</p>
          <p className="mt-2 text-5xl font-extrabold tracking-tight text-ink">{shipped.value}</p>
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
