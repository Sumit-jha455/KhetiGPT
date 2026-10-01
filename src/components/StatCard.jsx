// Import the cn helper for conditional classes
import { cn } from "../utils/cn";
// Import the Badge component for the optional label chip
import Badge from "./Badge";

/**
 * StatCard - compact information tile used on the dashboard and results.
 * It displays a label, a value, an optional supporting line and an icon.
 */
export default function StatCard({
  // Small label above the value, e.g. "Farm Size"
  label,
  // The main value, e.g. "2.5 acres"
  value,
  // Optional supporting text under the value
  hint,
  // Optional lucide icon
  icon: Icon,
  // Optional tone used for the icon tile colour
  tone = "brand",
  // Optional badge shown in the top-right corner
  badge,
  // Extra classes for layout tweaks
  className = "",
}) {
  // Icon tile colours per tone
  const toneClasses = {
    // Default green tile
    brand: "bg-brand-50 text-brand-700",
    // Blue tile for weather/water data
    sky: "bg-sky-soft text-sky-deep",
    // Amber tile for caution/sample data
    amber: "bg-amber-soft text-amber-700",
    // Neutral gray tile
    neutral: "bg-surface-alt text-ink-soft",
  };

  return (
    // Rounded surface matching the Card component styling
    <div
      // Merge base and custom classes
      className={cn(
        "rounded-2xl border border-line bg-white p-4 shadow-card transition-colors hover:border-brand-200 sm:p-5",
        className
      )}
    >
      {/* Top row: label + badge */}
      <div className="flex items-start justify-between gap-2">
        {/* Muted uppercase label */}
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
        {/* Optional badge on the right */}
        {badge ? <Badge tone={tone}>{badge}</Badge> : null}
      </div>

      {/* Value row with the icon */}
      <div className="mt-3 flex items-center gap-3">
        {/* Render the icon tile when provided */}
        {Icon ? (
          // Tile with the tone based background colour
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              toneClasses[tone]
            )}
          >
            {/* The lucide icon component */}
            <Icon size={20} aria-hidden="true" />
          </span>
        ) : null}
        {/* The main value in a larger, bolder typeface */}
        <p className="truncate font-display text-lg font-bold text-brand-950 sm:text-xl">{value}</p>
      </div>

      {/* Optional supporting line */}
      {hint ? <p className="mt-2 text-xs leading-relaxed text-ink-muted">{hint}</p> : null}
    </div>
  );
}
