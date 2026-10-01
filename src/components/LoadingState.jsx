// Import the lucide spinner icon
import { Loader2 } from "lucide-react";

/**
 * LoadingState - inline loading indicator used while mock data "loads".
 * Keeps layouts stable instead of flashing empty content.
 */
export default function LoadingState({ label = "Loading sample data…", rows = 3 }) {
  return (
    // Full width container with a subtle animation
    <div className="w-full animate-pulse" role="status" aria-live="polite">
      {/* Screen reader only text describing the current state */}
      <span className="sr-only">{label}</span>

      {/* Inline spinner and label for sighted users */}
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-ink-muted">
        {/* Rotating loader icon */}
        <Loader2 size={18} className="animate-spin text-brand-600" aria-hidden="true" />
        {/* Visible loading label */}
        {label}
      </div>

      {/* Skeleton rows that mimic the content being loaded */}
      <div className="space-y-3">
        {/* Create the requested number of skeleton rows */}
        {Array.from({ length: rows }).map((_, index) => (
          // Each row is a gray placeholder block of varying width
          <div
            // Key by index because the rows are static placeholders
            key={index}
            // Alternate widths so the skeleton looks like real content
            className={
              index % 2 === 0
                ? "h-14 w-full rounded-xl bg-surface-alt"
                : "h-14 w-4/5 rounded-xl bg-surface-alt"
            }
          />
        ))}
      </div>
    </div>
  );
}
