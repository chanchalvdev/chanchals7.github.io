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
    "bg-ink text-page shadow-soft hover:opacity-85 focus-visible:outline-cobalt",
  secondary:
    "border border-border bg-surface text-ink shadow-soft hover:border-border-control focus-visible:outline-cobalt",
  ghost:
    "text-ink-soft hover:bg-muted hover:text-ink focus-visible:outline-cobalt",
  dark:
    "bg-ink text-page hover:opacity-85 focus-visible:outline-ink",
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
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4",
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
