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
    "border-[1.5px] border-ink bg-ink text-page font-bold hover:border-cobalt hover:bg-cobalt hover:text-white focus-visible:outline-cobalt",
  secondary:
    "border-[1.5px] border-ink bg-transparent text-ink hover:bg-muted focus-visible:outline-cobalt",
  ghost:
    "text-ink hover:bg-cobalt-light hover:text-cobalt focus-visible:outline-cobalt",
  dark:
    "border-[1.5px] border-ink bg-ink text-page hover:bg-ink/90 focus-visible:outline-ink",
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
    "inline-flex h-11 items-center justify-center gap-2 rounded-none px-5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.06em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 sm:h-12 sm:px-6",
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
