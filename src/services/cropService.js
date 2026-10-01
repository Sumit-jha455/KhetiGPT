/**
 * cropService.js
 * Mock crop recommendation service that delegates to the local demo logic.
 */

// Import the rule based recommendation engine and option lists
import { recommendCrop, CROP_DATABASE } from "../data/mockCrops";
// Import the shared delay helper for a realistic loading state
import { simulateNetworkDelay } from "./api";

/**
 * getCropRecommendation - resolves with a demo recommendation object.
 * @param {Object} input - { location, season, soilType, water, farmSize }
 */
export async function getCropRecommendation(input) {
  // Pretend the request travelled to a server and back
  await simulateNetworkDelay(800);
  // Return the result of the local rule engine
  return recommendCrop(input);
}

/** Returns the sample crop list so the UI can show crop options */
export function getCropOptions() {
  // Return a copy to avoid accidental mutation of the dataset
  return [...CROP_DATABASE];
}
