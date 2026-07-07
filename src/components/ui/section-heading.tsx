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
      <p className="text-kicker flex items-center gap-2 text-cobalt">
        <span className="inline-block h-px w-6 bg-cobalt/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
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
