import { cn } from "@/lib/utils";

type SheetLoaderProps = {
  /** What is actually happening, in plain words — "Opening post", not "Loading". */
  label: string;
  /** Optional second line, e.g. why the wait exists. */
  detail?: string;
  /** Placeholder lines shaped like the content that is about to arrive. */
  skeleton?: boolean;
  className?: string;
};

/**
 * Loading state in the site's drawing-sheet language: a ruler line that is
 * plotted left to right, with a caption saying what is being fetched.
 * Hidden for the first 200ms (see .sheet-loader) so fast loads never flash it.
 */
export function SheetLoader({ label, detail, skeleton = false, className }: SheetLoaderProps) {
  return (
    <div role="status" aria-live="polite" className={cn("sheet-loader mx-auto w-full max-w-xs", className)}>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{label}</p>
      <div className="sheet-loader__rule mt-3" aria-hidden="true">
        <span className="sheet-loader__bar" />
      </div>
      {detail && <p className="mt-3 font-mono text-xs text-ink-faint">{detail}</p>}
      {skeleton && (
        <div className="mt-8 space-y-3" aria-hidden="true">
          <span className="sheet-loader__line block h-5 w-4/5" />
          <span className="sheet-loader__line block h-3 w-full" />
          <span className="sheet-loader__line block h-3 w-11/12" />
          <span className="sheet-loader__line block h-3 w-2/3" />
        </div>
      )}
    </div>
  );
}
