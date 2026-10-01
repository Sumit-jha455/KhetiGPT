// Import the useId hook for accessible label/field pairing
import { useId } from "react";
// Import the cn helper for merging conditional classes
import { cn } from "../utils/cn";

/**
 * Select - a styled native <select> with label, hint and error handling.
 * A native select is used on purpose: it is keyboard friendly and works
 * correctly on mobile without extra JavaScript.
 */
export default function Select({
  // Visible field label
  label,
  // Array of option strings, or objects with { value, label }
  options = [],
  // Optional placeholder option (e.g. "Select a season")
  placeholder,
  // Helper text under the field
  hint,
  // Error message; when present the field shows the error style
  error,
  // Current selected value
  value,
  // Change handler supplied by the parent
  onChange,
  // Name attribute for form submission
  name,
  // Marks the field as required
  required = false,
  // Disable the whole field
  disabled = false,
  // Extra classes for the wrapper
  className = "",
}) {
  // Unique id that links the label with the select element
  const id = useId();
  // Description id for hint/error text
  const describedBy = error || hint ? `${id}-desc` : undefined;

  return (
    // Column wrapper for label + select + message
    <div className={cn("w-full", className)}>
      {/* Accessible label bound to the select */}
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {/* Label text */}
        {label}
        {/* Required indicator */}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </label>

      {/* The native select element */}
      <select
        // Connects to the label above
        id={id}
        // Name used in form state
        name={name}
        // Controlled value
        value={value}
        // Controlled change handler
        onChange={onChange}
        // Browser validation attribute
        required={required}
        // Disabled state for locked fields
        disabled={disabled}
        // Accessibility description of the field
        aria-describedby={describedBy}
        // Invalid state flag for assistive technology
        aria-invalid={Boolean(error)}
        // Field styling mirrors the Input component for visual consistency
        className={cn(
          "h-11 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-ink outline-none transition-colors",
          // Chevron background image drawn as an inline SVG data URI
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7f74%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:18px_18px] bg-[right_0.75rem_center] bg-no-repeat",
          // Error vs normal border colours
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-line focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
          // Disabled look
          disabled && "cursor-not-allowed bg-surface-alt text-ink-muted"
        )}
      >
        {/* Optional empty placeholder option at the top of the list */}
        {placeholder ? (
          // value="" keeps the placeholder selectable as the default
          <option value="">{placeholder}</option>
        ) : null}

        {/* Map every option into an <option> element */}
        {options.map((option) => {
          // Support both plain strings and { value, label } objects
          const optionValue = typeof option === "string" ? option : option.value;
          // Same handling for the visible label
          const optionLabel = typeof option === "string" ? option : option.label;
          // Return the option element keyed by its value
          return (
            <option key={optionValue} value={optionValue}>
              {/* Visible option text */}
              {optionLabel}
            </option>
          );
        })}
      </select>

      {/* Render the error message first, otherwise the hint */}
      {error ? (
        // role="alert" makes the error announce immediately
        <p id={describedBy} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {/* Error text */}
          {error}
        </p>
      ) : hint ? (
        // Neutral hint text
        <p id={describedBy} className="mt-1.5 text-xs text-ink-muted">
          {/* Hint text */}
          {hint}
        </p>
      ) : null}
    </div>
  );
}
