// Import the lucide info icon
import { Info } from "lucide-react";
// Import the cn helper for conditional classes
import { cn } from "../utils/cn";

/**
 * Disclaimer - a small notice bar used to make clear that a page is showing
 * sample/demo data. This keeps the academic project honest about its outputs.
 */
export default function Disclaimer({ text, className = "", tone = "amber" }) {
  // Tone mapping for the two supported notice styles
  const tones = {
    // Amber notice used for demo data warnings
    amber: "border-amber-200 bg-amber-soft text-amber-800",
    // Blue notice used for informational demo mode notes
    sky: "border-sky-100 bg-sky-soft text-sky-deep",
  };

  return (
    // Role "note" tells assistive technology this is supplementary information
    <p
      // Merge the selected tone classes with any caller overrides
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed",
        tones[tone],
        className
      )}
    >
      {/* Decorative info icon aligned with the first line of text */}
      <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
      {/* The notice text supplied by the caller */}
      <span>{text}</span>
    </p>
  );
}
