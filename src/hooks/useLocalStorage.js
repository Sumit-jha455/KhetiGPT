/**
 * useLocalStorage.js
 * A small state hook that persists its value in localStorage so the demo
 * session and edited profile survive a page refresh.
 */

// Import the required React hooks
import { useState, useEffect } from "react";

/**
 * useLocalStorage - behaves like useState but syncs with localStorage.
 * @param {string} key - the storage key
 * @param {*} initialValue - value used when nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  // Create the state once, lazily reading any previously stored value
  const [value, setValue] = useState(() => {
    // Guard so the hook also works when storage is unavailable (private mode)
    try {
      // Read the stored JSON string for this key
      const stored = window.localStorage.getItem(key);
      // Parse it, or fall back to the provided initial value
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // If reading fails, use the initial value silently
      return initialValue;
    }
  });

  // Persist the value every time it changes
  useEffect(() => {
    try {
      // Write the current value to localStorage as JSON
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore write failures (quota/full storage) so the app keeps working
      // console.warn is intentionally avoided in production builds
    }
  }, [key, value]); // re-run only when the key or value changes

  // Return the same API shape as useState
  return [value, setValue];
}
