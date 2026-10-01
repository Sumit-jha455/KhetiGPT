// Import the useEffect hook to manage side effects
import { useEffect } from "react";
// Import the lucide close icon
import { X } from "lucide-react";

/**
 * Modal - accessible dialog used for scheme details and confirmations.
 * Closes on the Escape key, on backdrop click and via the close button.
 */
export default function Modal({ open, onClose, title, children, footer }) {
  // Register a key listener only while the modal is open
  useEffect(() => {
    // Do nothing when the modal is closed
    if (!open) return undefined;
    // Handler that closes the modal when Escape is pressed
    const handleKeyDown = (event) => {
      // Check for the Escape key
      if (event.key === "Escape") onClose?.();
    };
    // Attach the listener to the document
    document.addEventListener("keydown", handleKeyDown);
    // Lock the page scroll so the background does not move
    document.body.style.overflow = "hidden";
    // Cleanup removes the listener and restores scrolling
    return () => {
      // Remove the key listener
      document.removeEventListener("keydown", handleKeyDown);
      // Restore normal page scrolling
      document.body.style.overflow = "";
    };
  }, [open, onClose]); // re-run when the modal opens or closes

  // Render nothing while the modal is closed
  if (!open) return null;

  return (
    // Fixed overlay covering the whole viewport with a dark backdrop
    <div
      // Backdrop styling and click-to-close behaviour
      className="fixed inset-0 z-50 flex items-end justify-center bg-brand-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      // Clicking the backdrop closes the modal
      onClick={onClose}
      // Assistive role for the overlay
      role="presentation"
    >
      {/* Dialog panel: bottom sheet on mobile, centred card on desktop */}
      <div
        // Stop the backdrop click from firing inside the panel
        onClick={(event) => event.stopPropagation()}
        // ARIA dialog semantics
        role="dialog"
        // Accessible name supplied by the title
        aria-modal="true"
        // Panel styling: bottom sheet on mobile, centred card on desktop
        className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-2xl"
      >
        {/* Sticky header with the title and close button */}
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-line bg-white px-5 py-4">
          {/* Modal title */}
          <h2 className="pr-2 text-lg font-bold text-brand-950">{title}</h2>
          {/* Icon-only close button */}
          <button
            // Button type prevents accidental form submission
            type="button"
            // Click handler from the parent
            onClick={onClose}
            // Accessible label for screen readers
            aria-label="Close dialog"
            // Circular ghost button styling
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
          >
            {/* X icon */}
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Modal body content supplied by the caller */}
        <div className="px-5 py-4 text-sm leading-relaxed text-ink-soft">{children}</div>

        {/* Optional footer area for actions */}
        {footer ? (
          <div className="sticky bottom-0 border-t border-line bg-white px-5 py-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
