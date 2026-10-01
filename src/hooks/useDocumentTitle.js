/**
 * useDocumentTitle.js
 * Keeps the browser tab title in sync with the currently open page,
 * which makes the demo easier to follow for evaluators.
 */

// Import the effect hook from React
import { useEffect } from "react";

/**
 * useDocumentTitle - sets document.title for the active page.
 * @param {string} title - page specific title text
 */
export function useDocumentTitle(title) {
  // Run the effect whenever the title changes
  useEffect(() => {
    // Compose the full tab title with the brand name
    document.title = `${title} | KhetiGPT`;
    // Nothing to clean up, but returning a function keeps the effect tidy
    return () => {
      // Restore a generic title when the component unmounts
      document.title = "KhetiGPT | AI-Powered Personal Farming Assistant";
    };
  }, [title]); // dependency array limits the effect to title changes only
}
