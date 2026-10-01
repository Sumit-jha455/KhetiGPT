/**
 * mockCrops.js
 * Sample crop knowledge base plus the LOCAL DEMO LOGIC that powers the
 * Crop Recommendation page. No machine learning and no API is used -
 * the goal is to demonstrate the interface and data flow only.
 */

// Seasons supported by the recommendation form
export const SEASONS = ["Kharif", "Rabi", "Zaid"];

// Soil types supported by the recommendation form
export const SOIL_TYPES = ["Loamy", "Clay", "Sandy", "Black", "Alluvial"];

// Water availability levels supported by the recommendation form
export const WATER_LEVELS = ["Low", "Medium", "High"];

// Sample list of Indian states/districts used as location options
export const LOCATIONS = [
  "Nashik, Maharashtra",
  "Indore, Madhya Pradesh",
  "Ludhiana, Punjab",
  "Guntur, Andhra Pradesh",
  "Kanpur, Uttar Pradesh",
  "Coimbatore, Tamil Nadu",
  "Kolhapur, Maharashtra",
];

/**
 * CROP_DATABASE - a small sample crop list. Each entry records the seasons,
 * soils and water level the crop is *commonly associated with* in this demo
 * dataset. It is not agronomic advice.
 */
export const CROP_DATABASE = [
  {
    name: "Rice (Paddy)",
    seasons: ["Kharif"],
    soils: ["Clay", "Alluvial"],
    waterNeed: "High",
    durationDays: "120-150 days",
    note: "Needs standing water for most of the growing period.",
  },
  {
    name: "Cotton",
    seasons: ["Kharif"],
    soils: ["Black", "Clay"],
    waterNeed: "Medium",
    durationDays: "150-180 days",
    note: "Commonly grown on black cotton soils in central India.",
  },
  {
    name: "Maize",
    seasons: ["Kharif", "Zaid"],
    soils: ["Loamy", "Alluvial", "Sandy"],
    waterNeed: "Medium",
    durationDays: "90-120 days",
    note: "Flexible crop that fits short season windows.",
  },
  {
    name: "Wheat",
    seasons: ["Rabi"],
    soils: ["Loamy", "Alluvial", "Clay"],
    waterNeed: "Medium",
    durationDays: "110-130 days",
    note: "Main Rabi cereal in north and central India.",
  },
  {
    name: "Chickpea (Gram)",
    seasons: ["Rabi"],
    soils: ["Black", "Loamy"],
    waterNeed: "Low",
    durationDays: "95-110 days",
    note: "Legume crop that also supports soil nitrogen levels.",
  },
  {
    name: "Mustard",
    seasons: ["Rabi"],
    soils: ["Loamy", "Sandy", "Alluvial"],
    waterNeed: "Low",
    durationDays: "100-120 days",
    note: "Oilseed crop suited to drier Rabi conditions.",
  },
  {
    name: "Tomato",
    seasons: ["Rabi", "Zaid"],
    soils: ["Loamy", "Alluvial"],
    waterNeed: "Medium",
    durationDays: "90-120 days",
    note: "Vegetable crop usually grown with staking and drip lines.",
  },
  {
    name: "Onion",
    seasons: ["Rabi", "Zaid"],
    soils: ["Loamy", "Sandy", "Alluvial"],
    waterNeed: "Medium",
    durationDays: "110-130 days",
    note: "Requires good drainage to avoid bulb rot.",
  },
  {
    name: "Groundnut",
    seasons: ["Kharif", "Zaid"],
    soils: ["Sandy", "Loamy"],
    waterNeed: "Low",
    durationDays: "100-130 days",
    note: "Performs best in light, well-drained soils.",
  },
  {
    name: "Moong (Green Gram)",
    seasons: ["Zaid", "Kharif"],
    soils: ["Loamy", "Sandy", "Alluvial"],
    waterNeed: "Low",
    durationDays: "60-70 days",
    note: "Short duration pulse suitable for summer windows.",
  },
  {
    name: "Sugarcane",
    seasons: ["Kharif", "Zaid"],
    soils: ["Alluvial", "Black", "Loamy"],
    waterNeed: "High",
    durationDays: "10-12 months",
    note: "Long duration crop with heavy irrigation demand.",
  },
  {
    name: "Sunflower",
    seasons: ["Zaid", "Rabi"],
    soils: ["Black", "Loamy"],
    waterNeed: "Medium",
    durationDays: "90-110 days",
    note: "Oilseed option for short season gaps.",
  },
];

/**
 * scoreCrop - assigns a simple demo score to a crop for the given inputs.
 * A higher score means the crop matched more of the farmer's conditions.
 */
const scoreCrop = (crop, { season, soilType, water }) => {
  // Start with no matching points
  let score = 0;
  // Add 3 points when the crop's season list contains the chosen season
  if (crop.seasons.includes(season)) score += 3;
  // Add 2 points when the crop's soil list contains the chosen soil
  if (crop.soils.includes(soilType)) score += 2;
  // Add 2 points when the water requirement matches the water availability
  if (crop.waterNeed === water) score += 2;
  // Give a small partial credit when the crop needs less water than available
  if (crop.waterNeed === "Low" && (water === "Medium" || water === "High")) score += 1;
  // Give a small partial credit when a crop needs medium water and water is high
  if (crop.waterNeed === "Medium" && water === "High") score += 1;
  // Return the final demo score
  return score;
};

/**
 * recommendCrop - the local demo recommendation engine.
 * @param {Object} input - { location, season, soilType, water, farmSize }
 * @returns {Object} recommended crop, reason, considerations and alternatives
 */
export const recommendCrop = (input) => {
  // Destructure the submitted form values with sensible fallbacks
  const { location, season, soilType, water, farmSize } = input;

  // Copy the crop list so sorting never mutates the source data
  const ranked = [...CROP_DATABASE]
    // Attach a score to every crop
    .map((crop) => ({ crop, score: scoreCrop(crop, { season, soilType, water }) }))
    // Sort descending so the best matches come first
    .sort((a, b) => b.score - a.score);

  // The top ranked crop becomes the primary recommendation
  const best = ranked[0];
  // The next three crops are shown as alternatives to consider
  const alternatives = ranked.slice(1, 4).map((entry) => entry.crop);

  // Build the human readable reason string for the result card
  const reason = [
    // Season match explanation
    `${best.crop.name} is listed for the ${season} season`,
    // Soil match explanation
    `${soilType} soil matches the soil groups in this sample dataset`,
    // Water match explanation
    `and its water requirement is marked ${best.crop.waterNeed.toLowerCase()} which fits ${water.toLowerCase()} water availability`,
    // Closing sentence with duration information
    `Typical duration in this dataset: ${best.crop.durationDays}.`,
  ].join(". ");

  // Practical considerations shown to the user (general, non-advisory text)
  const considerations = [
    // Water related consideration
    water === "Low"
      ? "With low water availability, plan a water-efficient schedule and check local irrigation support."
      : "Confirm irrigation timing so water is available at critical growth stages.",
    // Soil related consideration
    `A basic soil test is still recommended before finalising inputs for ${soilType.toLowerCase()} soil.`,
    // Location related consideration
    `Local pest pressure and market access around ${location} should also be reviewed.`,
    // Farm size related consideration
    farmSize
      ? `For a ${farmSize} acre plot, plan labour and input quantities before sowing.`
      : "Plan labour and input quantities based on your plot size.",
  ];

  // Return the complete result object consumed by the UI
  return {
    // Primary recommended crop name
    crop: best.crop.name,
    // Crop category label from the dataset
    category: best.crop.seasons.join(" / "),
    // Typical duration string
    duration: best.crop.durationDays,
    // Water requirement label
    waterNeed: best.crop.waterNeed,
    // Explanation of the demo decision
    reason,
    // General considerations list
    considerations,
    // Alternative crops worth comparing
    alternatives,
    // Transparency about how the result was produced
    method: "Rule-based demo logic using the sample dataset in src/data/mockCrops.js",
  };
};
