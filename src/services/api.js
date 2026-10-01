/**
 * api.js
 * Central HTTP configuration for the future backend integration.
 * The frontend MVP does NOT make any real network request - every page uses
 * the local mock data modules. This file only prepares the axios instance so
 * that swapping mock services for real endpoints later is a small change.
 */

// Import axios so it is available for the future API layer
import axios from "axios";

// Base URL of the Express server that will be built in a later phase.
// It reads from an environment variable when available, otherwise it falls
// back to the default local development address.
export const API_BASE_URL =
  // Vite exposes env variables that start with VITE_ on import.meta.env
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// How long to wait for a response before timing out (milliseconds)
const REQUEST_TIMEOUT = 10000;

// Shared axios instance with sensible defaults for the future backend
const api = axios.create({
  // Every request URL is prefixed with the API base URL
  baseURL: API_BASE_URL,
  // Reject requests that take longer than the timeout
  timeout: REQUEST_TIMEOUT,
  // JSON is the default content type for the planned REST API
  headers: { "Content-Type": "application/json" },
});

/**
 * Endpoint map - a single place that documents every planned API route.
 * Keeping the paths here avoids hardcoding strings inside components.
 */
export const ENDPOINTS = {
  // Demo authentication (planned: JWT based login/register)
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  // Farmer profile and farm details
  PROFILE: "/users/me",
  // Planned Gemini AI proxy route
  ASSISTANT: "/assistant/message",
  // Planned weather service route
  WEATHER: "/weather",
  WEATHER_FORECAST: "/weather/forecast",
  // Planned crop recommendation route
  CROP_RECOMMENDATION: "/crops/recommend",
  // Planned fertilizer guidance route
  FERTILIZER: "/fertilizer/guidance",
  // Planned government schemes route
  SCHEMES: "/schemes",
};

/**
 * simulateNetworkDelay - returns a promise that resolves after a short delay.
 * Used by the mock services so the UI can show realistic loading states.
 */
export const simulateNetworkDelay = (ms = 600) =>
  // Promise resolves automatically once the timer completes
  new Promise((resolve) => setTimeout(resolve, ms));

// Export the configured axios instance as the default export
export default api;
