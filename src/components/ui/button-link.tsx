import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  showArrow?: boolean;
};

const variants = {
  primary:
    "bg-linear-to-r from-cobalt to-signal text-page font-bold shadow-cobalt hover:-translate-y-0.5 hover:brightness-110 hover:scale-105 focus-visible:outline-cobalt",
  secondary:
    "border border-border bg-surface/70 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-cobalt/40 hover:text-cobalt focus-visible:outline-cobalt",
  ghost:
    "text-ink hover:bg-cobalt/8 hover:text-cobalt focus-visible:outline-cobalt",
  dark:
    "border border-border bg-ink text-page hover:-translate-y-0.5 hover:bg-ink/90 focus-visible:outline-ink",
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  showArrow = false,
  ...props
}: ButtonLinkProps) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const sharedClassName = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 sm:h-12 sm:px-6",
    variants[variant],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={sharedClassName}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
        {showArrow ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName} {...props}>
      {children}
      {showArrow ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null}
    </Link>
  );
}
