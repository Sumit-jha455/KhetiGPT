/**
 * formatters.js
 * Small, dependency-free formatting helpers shared across the app.
 */

/** Returns a friendly greeting ("Good Morning") based on the current hour */
export const getGreeting = (date = new Date()) => {
  // Extract the hour (0-23) from the supplied date
  const hour = date.getHours();
  // Early morning hours
  if (hour < 12) return "Good Morning";
  // Afternoon hours
  if (hour < 17) return "Good Afternoon";
  // Evening and night hours
  return "Good Evening";
};

/** Pads a number to two digits, e.g. 7 -> "07" */
const pad = (value) => String(value).padStart(2, "0");

/** Formats a Date as HH:MM (24-hour) for chat timestamps */
export const formatTime = (date = new Date()) =>
  // Build the time string manually so it stays stable across locales
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;

/**
 * Converts an ISO date string (or Date) into a short readable label
 * such as "Mon, 12 May".
 */
export const formatDayLabel = (input) => {
  // Create a Date object from the input value
  const date = input instanceof Date ? input : new Date(input);
  // Short weekday name, e.g. "Mon"
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  // Day of the month without a leading zero
  const day = date.getDate();
  // Short month name, e.g. "May"
  const month = date.toLocaleDateString("en-US", { month: "short" });
  // Join the parts into the final label
  return `${weekday}, ${day} ${month}`;
};

/** Returns today's date as a long readable sentence, e.g. "Monday, 12 May 2026" */
export const formatLongDate = (date = new Date()) =>
  // Delegate to the browser locale formatter for correctness
  date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Turns a numeric farm size + unit into a tidy label */
export const formatFarmSize = (size, unit = "acres") =>
  // Guard against missing values so the UI never shows "undefined"
  isEmptyValue(size) ? "Not set" : `${size} ${unit}`;

/** Small local guard used only by this module */
function isEmptyValue(value) {
  // Treat null/undefined/blank strings as empty
  return value === null || value === undefined || String(value).trim() === "";
}

/** Truncates long text and appends an ellipsis when needed */
export const truncate = (text, max = 120) =>
  // Only cut the string when it exceeds the limit
  typeof text === "string" && text.length > max ? `${text.slice(0, max)}…` : text;
