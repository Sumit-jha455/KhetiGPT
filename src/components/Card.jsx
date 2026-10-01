// Import the cn helper for merging conditional classes
import { cn } from "../utils/cn";

/**
 * Card - the shared rounded surface used for almost every panel in the app.
 * Keeps borders, backgrounds and shadows consistent across pages.
 */
export default function Card({
  // Card content
  children,
  // Extra Tailwind classes
  className = "",
  // Adds a lift effect on hover (used for clickable service cards)
  interactive = false,
  // Optional padding override
  padded = true,
  // Remaining props such as id, role or test ids
  ...rest
}) {
  return (
    // <section> gives the card a semantic landmark for screen readers
    <section
      // Merge the base card styles with the caller's classes
      className={cn(
        // Rounded corners, white surface, subtle border and soft shadow
        "rounded-2xl border border-line bg-white shadow-card",
        // Default inner spacing unless the caller disables it
        padded && "p-5 sm:p-6",
        // Hover styling for interactive cards only
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift",
        // Allow custom overrides last
        className
      )}
      // Spread any additional props onto the element
      {...rest}
    >
      {/* Render the card body */}
      {children}
    </section>
  );
}

/**
 * CardHeader - a consistent title/description block for the top of a card.
 */
export function CardHeader({ title, description, icon: Icon, action }) {
  return (
    // Flex row that stacks the icon and text, and keeps actions on the right
    <div className="mb-4 flex items-start justify-between gap-3">
      {/* Left side: icon + title + description */}
      <div className="flex items-start gap-3">
        {/* Render the icon tile only when an icon was passed */}
        {Icon ? (
          // Small rounded icon container with a light green background
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            {/* The lucide icon component */}
            <Icon size={20} strokeWidth={2} aria-hidden="true" />
          </span>
        ) : null}
        {/* Title and description column */}
        <div>
          {/* Card heading */}
          <h3 className="text-base font-semibold text-ink sm:text-lg">{title}</h3>
          {/* Optional helper text under the title */}
          {description ? (
            <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{description}</p>
          ) : null}
        </div>
      </div>
      {/* Right side slot for buttons or links */}
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
