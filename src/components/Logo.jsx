// Import the logo image asset (Vite inlines small SVGs automatically)
import logoUrl from "../assets/logo.svg";
// Import the cn helper for merging classes
import { cn } from "../utils/cn";

/**
 * Logo - the KhetiGPT brand mark and wordmark.
 * `variant="dark"` renders the light version used on dark green surfaces.
 */
export default function Logo({ to = "/", variant = "light", size = "md", className = "" }) {
  // Decide icon tile size based on the size prop
  const box = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  // Decide wordmark size based on the size prop
  const text = size === "lg" ? "text-xl" : size === "sm" ? "text-base" : "text-lg";

  return (
    // <a> would reload the page, so a plain styled span is used here and the
    // parent wraps it with a router Link when navigation is required
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Brand mark image with a descriptive alt text */}
      <img
        // Source of the SVG asset
        src={logoUrl}
        // Accessible description of the image
        alt="KhetiGPT logo"
        // Size classes resolved above
        className={cn(box, "rounded-xl")}
      />
      {/* Wordmark: "Kheti" in regular weight, "GPT" emphasised */}
      <span
        className={cn(
          // Typography classes
          text,
          "font-display font-extrabold tracking-tight",
          // Colour depends on the surface the logo sits on
          variant === "dark" ? "text-white" : "text-brand-900"
        )}
      >
        {/* First part of the brand name */}
        Kheti
        {/* Second part highlighted in the primary green */}
        <span className={variant === "dark" ? "text-brand-300" : "text-brand-600"}>GPT</span>
      </span>
    </span>
  );
}
