// Import the useId hook to generate unique, accessible ids per field
import { useId } from "react";
// Import the cn helper for merging classes
import { cn } from "../utils/cn";

/**
 * Input - accessible text input with a label, hint text and error message.
 * Every visual state (default, focus, error, disabled) is handled here so
 * forms across the app look identical.
 */
export default function Input({
  // Field label shown above the input (required for accessibility)
  label,
  // Optional helper text displayed under the input
  hint,
  // Validation error message; when set the field renders in the error state
  error,
  // Optional lucide icon shown on the left inside the field
  icon: Icon,
  // Extra classes for the wrapper element
  className = "",
  // Optional pre-filled value
  value,
  // Change handler passed by the parent form
  onChange,
  // HTML input type
  type = "text",
  // Placeholder text
  placeholder,
  // Name attribute used when submitting forms
  name,
  // Marks the field as required for the browser and screen readers
  required = false,
  // Marks the field as read-only (used on the profile page)
  readOnly = false,
  // Autofocus flag for the first field of a form
  autoFocus = false,
}) {
  // Generate a unique id that links the label to this input
  const id = useId();
  // Derive a description id for hint/error text
  const describedBy = error || hint ? `${id}-desc` : undefined;

  return (
    // Wrapper div keeps label, input and messages together as one column
    <div className={cn("w-full", className)}>
      {/* Visible label linked to the input through the htmlFor/id pair */}
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {/* Label text */}
        {label}
        {/* Show a small red asterisk for required fields */}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </label>

      {/* Relative container so the icon can be positioned inside the field */}
      <div className="relative">
        {/* Render the icon only when provided */}
        {Icon ? (
          // Absolutely positioned icon on the left edge of the field
          <Icon
            // Position it vertically centred with a left inset
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            // Icon size in pixels
            size={18}
            // Hide decorative icons from screen readers
            aria-hidden="true"
          />
        ) : null}

        {/* The native input element */}
        <input
          // id connects the input to its label
          id={id}
          // Input type (text, email, password, number...)
          type={type}
          // Name used in form submission
          name={name}
          // Current controlled value
          value={value}
          // Controlled change handler
          onChange={onChange}
          // Placeholder text inside the field
          placeholder={placeholder}
          // Browser level required validation
          required={required}
          // Read-only fields look and behave as disabled but stay selectable
          readOnly={readOnly}
          // Focus this field automatically when the form opens
          autoFocus={autoFocus}
          // Screen readers read the label from this reference
          aria-labelledby={id}
          // Announce the hint or error message
          aria-describedby={describedBy}
          // Mark the field as invalid for assistive technology
          aria-invalid={Boolean(error)}
          // Field styling: padded left more when an icon is present
          className={cn(
            "h-11 w-full rounded-xl border bg-white text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70",
            // Left padding depends on whether an icon is shown
            Icon ? "pl-10 pr-3" : "px-3.5",
            // Error border vs normal border + green focus ring
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-line focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
            // Muted appearance when read-only
            readOnly && "cursor-not-allowed bg-surface-alt text-ink-soft"
          )}
        />
      </div>

      {/* Show either the error message or the helper hint */}
      {error ? (
        // Error text is announced assertively for screen reader users
        <p id={describedBy} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {/* Error message content */}
          {error}
        </p>
      ) : hint ? (
        // Neutral helper text under the field
        <p id={describedBy} className="mt-1.5 text-xs text-ink-muted">
          {/* Hint content */}
          {hint}
        </p>
      ) : null}
    </div>
  );
}
