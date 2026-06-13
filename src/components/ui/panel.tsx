import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-ink/10 bg-white shadow-[0_18px_48px_rgba(16,18,20,0.07)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
