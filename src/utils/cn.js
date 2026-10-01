// Import clsx, a tiny helper that joins class names and ignores falsy values
import { clsx } from "clsx";
// Import tailwind-merge which resolves conflicting Tailwind classes (last one wins)
import { twMerge } from "tailwind-merge";

/**
 * cn - merge conditional class names for Tailwind CSS.
 * Example: cn("p-4", isActive && "bg-brand-600", "p-6") => "p-6 bg-brand-600"
 */
export function cn(...inputs) {
  // clsx flattens arrays/conditions into a single string, twMerge removes conflicts
  return twMerge(clsx(inputs));
}
