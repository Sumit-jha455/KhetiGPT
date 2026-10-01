/**
 * schemesService.js
 * Mock service for the government schemes directory. Search and filtering
 * happen locally so the page stays fast and fully offline.
 */

// Import the sample scheme records and the local filter helper
import { SCHEMES, filterSchemes, SCHEME_CATEGORIES } from "../data/mockSchemes";
// Import the shared delay helper to simulate an API call
import { simulateNetworkDelay } from "./api";

/**
 * fetchSchemes - resolves with the filtered sample scheme list.
 * @param {string} searchText - text typed into the search box
 * @param {string} category - selected category chip
 */
export async function fetchSchemes(searchText = "", category = "All") {
  // Simulate network latency for a realistic loading state
  await simulateNetworkDelay(400);
  // Apply the search text and category filter locally
  return filterSchemes(SCHEMES, searchText, category);
}

/** Returns the available category filter options (synchronous) */
export function fetchCategories() {
  // Static list, no delay needed
  return SCHEME_CATEGORIES;
}
