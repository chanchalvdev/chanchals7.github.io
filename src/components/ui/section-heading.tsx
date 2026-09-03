import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="bp-divider font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
        {eyebrow}
      </p>
      <h2 className="text-display mt-5 text-3xl text-ink sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/55 sm:text-[1.05rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
