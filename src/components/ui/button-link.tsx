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
    "bg-linear-to-r from-amber to-coral text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:scale-105 focus-visible:outline-amber",
  secondary:
    "border border-ink/12 bg-white text-ink shadow-sm hover:-translate-y-0.5 hover:border-amber/30 hover:text-amber hover:bg-amber/5 focus-visible:outline-amber",
  ghost:
    "text-ink hover:bg-amber/6 hover:text-amber focus-visible:outline-amber",
  dark:
    "border border-white/16 bg-white text-ink hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-white",
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
