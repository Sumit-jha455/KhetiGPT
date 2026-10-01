// Import the cn helper for merging conditional Tailwind classes
import { cn } from "../utils/cn";
// Link is used when the button behaves as an internal navigation link
import { Link } from "react-router-dom";

// Visual styles for each supported button variant
const VARIANTS = {
  // Primary green action button
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-md",
  // Secondary dark green button for strong secondary actions
  secondary:
    "bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-950 shadow-sm hover:shadow-md",
  // Outlined button that keeps the page background visible
  outline:
    "border border-line bg-white text-ink hover:border-brand-400 hover:bg-brand-50",
  // Quiet ghost button for low emphasis actions
  ghost: "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
  // Danger styled button (used for destructive demo actions)
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
};

// Size scale controlling padding and font size
const SIZES = {
  // Small button for compact areas like tables and chips
  sm: "h-9 px-3 text-sm gap-1.5",
  // Default button used across forms and cards
  md: "h-11 px-5 text-sm gap-2",
  // Large button used for hero and CTA sections
  lg: "h-12 px-6 text-base gap-2",
};

/**
 * Button - a single reusable button component.
 * Pass `to` to render an internal router link, otherwise a <button> is used.
 */
export default function Button({
  // Button content
  children,
  // Visual variant from the VARIANTS map
  variant = "primary",
  // Size from the SIZES map
  size = "md",
  // Extra classes for one-off tweaks
  className = "",
  // Router destination; when set the button renders a Link
  to,
  // Full width flag for mobile friendly forms
  fullWidth = false,
  // Disabled state for loading/invalid submissions
  disabled = false,
  // Button type attribute (button/submit/reset)
  type = "button",
  // Any remaining props (onClick, title, aria-*, etc.)
  ...rest
}) {
  // Compose the shared classes for every variant
  const classes = cn(
    // Base styles: inline flex, rounded corners, transitions, focus ring
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
    // Cursor and disabled look
    "disabled:cursor-not-allowed disabled:opacity-60",
    // Variant and size classes resolved from the maps above
    VARIANTS[variant],
    SIZES[size],
    // Stretch the button when fullWidth is true
    fullWidth && "w-full",
    // Allow callers to override anything with className
    className
  );

  // When `to` is provided render a router link styled as a button
  if (to) {
    return (
      // Link renders an accessible <a> that navigates without a reload
      <Link to={to} className={classes} {...rest}>
        {/* Render the label/content inside the link */}
        {children}
      </Link>
    );
  }

  // Otherwise render a native button element
  return (
    // type defaults to "button" so forms only submit when intended
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {/* Button label/content */}
      {children}
    </button>
  );
}
