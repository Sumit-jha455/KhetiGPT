// Import the cn helper for merging conditional classes
import { cn } from "../utils/cn";

// Colour tones available for badges across the app
const TONES = {
  // Brand green badge (default)
  brand: "bg-brand-50 text-brand-800 border-brand-200",
  // Neutral gray badge
  neutral: "bg-surface-alt text-ink-soft border-line",
  // Blue badge for weather/water information
  sky: "bg-sky-soft text-sky-deep border-sky-100",
  // Amber badge for warnings and demo notices
  amber: "bg-amber-soft text-amber-700 border-amber-200",
  // Red badge for errors
  red: "bg-red-50 text-red-700 border-red-200",
};

/**
 * Badge - small pill label used for categories, statuses and demo tags.
 */
export default function Badge({
  // Badge text
  children,
  // Colour tone from the TONES map
  tone = "brand",
  // Extra classes for spacing or size overrides
  className = "",
  // Optional title attribute for hover tooltips / accessibility
  title,
}) {
  return (
    // Inline-flex keeps the pill only as wide as its content
    <span
      // Optional tooltip explaining the badge
      title={title}
      // Merge tone classes with the base pill styles
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        TONES[tone],
        className
      )}
    >
      {/* Badge label content */}
      {children}
    </span>
  );
}
