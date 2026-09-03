import { profile } from "@/content/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  const githubHandle = profile.github.split("/").filter(Boolean).pop();
  const linkedinHandle = profile.linkedin.split("/").filter(Boolean).pop();

  const cellLabel =
    "block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/40";
  const cellValue = "mt-1.5 block font-mono text-[0.82rem] text-ink";

  return (
    <footer id="contact" className="border-t border-border bg-background px-5 py-14 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="bp-divider font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
          Sheet 08 / Title Block
        </p>

        {/* Title block */}
        <div className="mt-8 border-[1.5px] border-ink">
          <div className="border-b border-ink p-6 sm:p-8">
            <h2 className="text-display max-w-xl text-3xl font-bold text-ink sm:text-4xl">
              Open for new engagements.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3">
            <div className="border-b border-ink p-5 sm:border-r">
              <span className={cellLabel}>Drawn by</span>
              <span className={cellValue}>{profile.name}</span>
            </div>
            <div className="border-b border-ink p-5 sm:border-r">
              <span className={cellLabel}>Location</span>
              <span className={cellValue}>{profile.location}</span>
            </div>
            <div className="border-b border-ink p-5">
              <span className={cellLabel}>Status</span>
              <span className={`${cellValue} text-signal`}>Open</span>
            </div>

            <div className="border-b border-ink p-5 sm:border-r">
              <span className={cellLabel}>Contact</span>
              <a href={`mailto:${profile.email}`} className={`${cellValue} transition hover:text-cobalt`}>
                {profile.email}
              </a>
            </div>
            <div className="border-b border-ink p-5 sm:border-r">
              <span className={cellLabel}>GitHub</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className={`${cellValue} transition hover:text-cobalt`}
              >
                {githubHandle}
              </a>
            </div>
            <div className="border-b border-ink p-5">
              <span className={cellLabel}>LinkedIn</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`${cellValue} transition hover:text-cobalt`}
              >
                in/{linkedinHandle}
              </a>
            </div>

            <div className="p-5 sm:border-r sm:border-ink">
              <span className={cellLabel}>Scale</span>
              <span className={cellValue}>1 : 1</span>
            </div>
            <div className="p-5 sm:border-r sm:border-ink">
              <span className={cellLabel}>Sheet</span>
              <span className={cellValue}>08 of 08</span>
            </div>
            <div className="p-5">
              <span className={cellLabel}>Rev</span>
              <span className={cellValue}>C — {year}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.68rem] text-ink/40">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {profile.twitter ? (
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="transition hover:text-cobalt">
                X / Twitter
              </a>
            ) : null}
            <a href={profile.blog} target="_blank" rel="noreferrer" className="transition hover:text-cobalt">
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
