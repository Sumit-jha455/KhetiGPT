/**
 * weatherService.js
 * Mock weather service. Returns the static sample data after a short delay.
 * The real Weather API integration will replace these functions later.
 */

// Import the sample weather datasets
import {
  getMockWeatherFor,
  WEATHER_FORECAST,
  WEATHER_LOCATIONS,
  WEATHER_TIPS,
} from "../data/mockWeather";
// Import the shared delay helper for realistic loading states
import { simulateNetworkDelay } from "./api";

/** Returns the sample current conditions for the selected location */
export async function fetchCurrentWeather(location = WEATHER_LOCATIONS[0]) {
  // Simulate the latency of a real API request
  await simulateNetworkDelay(450);
  // Return the location specific sample object
  return getMockWeatherFor(location);
}

/** Returns the sample five day forecast */
export async function fetchForecast() {
  // Simulate the latency of a real API request
  await simulateNetworkDelay(450);
  // Return a copy so callers cannot mutate the source data
  return [...WEATHER_FORECAST];
}

/** Returns the sample farming tips linked to the forecast */
export function fetchWeatherTips() {
  // Synchronous helper because the tips are static
  return WEATHER_TIPS;
}

/** Returns the list of locations available in the demo */
export function fetchLocations() {
  // Synchronous helper because the list is static
  return WEATHER_LOCATIONS;
}
