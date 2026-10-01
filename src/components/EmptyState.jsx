// Import the Button component so empty states can offer an action
import Button from "./Button";

/**
 * EmptyState - friendly placeholder shown when a list has no results.
 * Prevents blank screens and always suggests a next step to the user.
 */
export default function EmptyState({
  // Optional lucide icon displayed above the message
  icon: Icon,
  // Primary message, e.g. "No schemes found"
  title = "Nothing to show yet",
  // Longer explanation of why the state is empty
  description,
  // Optional action label
  actionLabel,
  // Optional action handler
  onAction,
  // Optional route when the action should navigate instead of call a function
  actionTo,
}) {
  return (
    // Dashed border container communicates "empty but intentional"
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white/70 px-6 py-12 text-center">
      {/* Icon inside a soft circular tile */}
      {Icon ? (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          {/* The lucide icon */}
          <Icon size={26} aria-hidden="true" />
        </span>
      ) : null}

      {/* Short title of the empty state */}
      <h3 className="mt-4 text-base font-semibold text-brand-950">{title}</h3>

      {/* Supporting explanation */}
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-muted">{description}</p>
      ) : null}

      {/* Optional action button */}
      {actionLabel ? (
        <div className="mt-5">
          {/* Render a button with either a click handler or a route */}
          <Button
            // Slightly smaller than the default size
            size="sm"
            // Use the handler or the route, whichever was supplied
            onClick={onAction}
            to={actionTo}
          >
            {/* Action label */}
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
