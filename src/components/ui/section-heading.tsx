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
    <div className={cn("max-w-3xl px-1", className)}>
      <p className="bp-divider lbl text-ink-faint">{eyebrow}</p>
      <h2 className="text-display mt-4 text-4xl font-extrabold text-ink sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-[1.05rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
