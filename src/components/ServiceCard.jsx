// Import the Link component so the whole card is clickable
import { Link } from "react-router-dom";
// Import the lucide icon used for the call-to-action arrow
import { ArrowRight } from "lucide-react";
// Import the cn helper for conditional classes
import { cn } from "../utils/cn";

// Icon tile colour tones available for service cards
const TONES = {
  // Green tile (default)
  brand: "bg-brand-50 text-brand-700",
  // Blue tile for weather services
  sky: "bg-sky-soft text-sky-deep",
  // Amber tile for crop recommendations
  amber: "bg-amber-soft text-amber-700",
  // Lime tile for fertilizer guidance
  lime: "bg-lime-50 text-lime-700",
};

/**
 * ServiceCard - a clickable card that links to one of the app modules.
 * Used on the landing page feature grid and the dashboard quick services.
 */
export default function ServiceCard({ to, icon: Icon, title, description, tone = "brand" }) {
  return (
    // Link makes the entire card a single accessible navigation target
    <Link
      // Destination route
      to={to}
      // title gives keyboard/screen reader users a clear action name
      title={`Open ${title}`}
      // Card styling with a hover lift effect
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      {/* Icon tile at the top of the card */}
      <span
        // Resolve the tile colour from the TONES map
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
          TONES[tone]
        )}
      >
        {/* The lucide icon passed by the caller */}
        <Icon size={22} aria-hidden="true" />
      </span>

      {/* Card title */}
      <h3 className="mt-4 text-base font-semibold text-brand-950">{title}</h3>

      {/* Short description */}
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>

      {/* "Open" hint that slides slightly on hover */}
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        {/* Label */}
        Open
        {/* Arrow icon that moves right on hover */}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
