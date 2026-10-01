/**
 * mockFertilizer.js
 * Static nutrient and guidance information for the Fertilizer page.
 * All values are generic textbook-style sample content written for an
 * academic demonstration - not agronomic or professional advice.
 */

// Crops available in the fertilizer form
export const FERTILIZER_CROPS = [
  "Rice (Paddy)",
  "Wheat",
  "Cotton",
  "Maize",
  "Tomato",
  "Onion",
  "Chickpea (Gram)",
  "Sugarcane",
];

// Soil types available in the fertilizer form
export const FERTILIZER_SOILS = ["Loamy", "Clay", "Sandy", "Black", "Alluvial"];

// Growth stages available in the fertilizer form
export const GROWTH_STAGES = ["Seedling", "Vegetative", "Flowering", "Harvest"];

/**
 * NUTRIENT_GUIDE - primary nutrient roles. Displayed as static information
 * so the page always has educational content to show.
 */
export const NUTRIENT_GUIDE = [
  {
    // Nutrient symbol
    symbol: "N",
    // Full nutrient name
    name: "Nitrogen",
    // Role of the nutrient in plant growth
    role: "Supports leaf and stem growth and gives crops a healthy green colour.",
  },
  {
    symbol: "P",
    name: "Phosphorus",
    role: "Supports root development and helps with flowering and grain formation.",
  },
  {
    symbol: "K",
    name: "Potassium",
    role: "Improves water regulation inside the plant and strengthens stems.",
  },
];

/**
 * STAGE_GUIDE - general nutrient emphasis per growth stage.
 * Used to render stage chips and the guidance text.
 */
export const STAGE_GUIDE = {
  Seedling: {
    // Nutrient emphasis text for the seedling stage
    emphasis: "Low dose, root-focused nutrition",
    // Typical nutrient ratio shown as a demo figure
    ratio: "N-P-K emphasis: low",
    // Short description of the stage
    summary:
      "Young plants need gentle nutrition. A small starter dose near the root zone is common practice.",
  },
  Vegetative: {
    emphasis: "Higher nitrogen for leaf and stem growth",
    ratio: "N-P-K emphasis: nitrogen",
    summary:
      "This is the main growth phase where nitrogen demand is usually at its highest.",
  },
  Flowering: {
    emphasis: "Balanced phosphorus and potassium",
    ratio: "N-P-K emphasis: phosphorus & potassium",
    summary:
      "Flowering and fruit set depend on phosphorus and potassium, so nitrogen is usually reduced.",
  },
  Harvest: {
    emphasis: "Minimal or no application",
    ratio: "N-P-K emphasis: minimal",
    summary:
      "Applications are normally stopped close to harvest because of residue and safety considerations.",
  },
};

/**
 * getFertilizerGuidance - builds the demo guidance object for the selected
 * crop, soil and growth stage. Logic is intentionally simple and local.
 */
export const getFertilizerGuidance = ({ crop, soilType, growthStage }) => {
  // Look up the stage information from the static guide
  const stage = STAGE_GUIDE[growthStage] || STAGE_GUIDE.Seedling;

  // Soil specific notes keyed by soil type (generic sample text)
  const soilNotes = {
    Loamy: "Loamy soil usually holds nutrients well, so split applications can be spread evenly.",
    Clay: "Clay soil can hold nutrients but drains slowly, so avoid waterlogging after application.",
    Sandy: "Sandy soil leaks nutrients faster, so smaller split doses are often preferred.",
    Black: "Black soil retains moisture; check field moisture before applying any input.",
    Alluvial: "Alluvial soil is generally fertile, so a soil test helps avoid over-application.",
  };

  // Stage specific application guidance text (demo content)
  const applicationByStage = {
    Seedling: "Apply a small starter dose in bands near the seed line and water lightly afterwards.",
    Vegetative: "Split the dose into two applications about 15-20 days apart during active growth.",
    Flowering: "Apply the nutrient mix that supports flowering and irrigate immediately after.",
    Harvest: "Stop applications well before harvest and follow the crop's pre-harvest interval.",
  };

  // Return the assembled guidance object used by the Fertilizer page
  return {
    // Echo the inputs so the UI can show the selected combination
    crop,
    soilType,
    growthStage,
    // Nutrient emphasis line for the selected stage
    nutrientEmphasis: stage.emphasis,
    // Ratio emphasis line for the selected stage
    nutrientRatio: stage.ratio,
    // Stage summary paragraph
    stageSummary: stage.summary,
    // Soil specific note
    soilNote: soilNotes[soilType] || soilNotes.Loamy,
    // Application guidance line
    applicationGuidance: applicationByStage[growthStage] || applicationByStage.Seedling,
    // Static considerations list displayed under the guidance
    considerations: [
      // Soil testing reminder
      "Carry out a soil test before deciding exact quantities - this demo does not calculate doses.",
      // Organic matter reminder
      "Organic options such as compost or farmyard manure are commonly combined with chemical inputs.",
      // Safety reminder
      "Wear gloves and follow product label instructions while handling any fertilizer.",
      // Water reminder
      "Avoid applying nutrients before heavy rain to reduce runoff losses.",
      // Advice disclaimer
      "Confirm final doses with a local agriculture officer or Krishi Vigyan Kendra.",
    ],
  };
};
