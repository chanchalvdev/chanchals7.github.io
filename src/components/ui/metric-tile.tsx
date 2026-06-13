import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricTile({
  value,
  label,
  icon,
  className,
}: {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-ink/10 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-semibold leading-none text-ink">{value}</p>
        {icon ? <span className="text-cobalt">{icon}</span> : null}
      </div>
      <p className="mt-2 text-sm font-medium leading-5 text-ink/56">{label}</p>
    </div>
  );
}
