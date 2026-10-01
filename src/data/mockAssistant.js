/**
 * mockAssistant.js
 * Local keyword based response engine for the AI Assistant page.
 * This simulates a conversational AI without calling the Gemini API,
 * which is planned for a later phase of the project.
 */

// Opening message shown when the assistant page loads
export const ASSISTANT_GREETING = {
  // Sender identifier used for styling and accessibility
  sender: "ai",
  // Message body
  text: "Hello! I am the KhetiGPT demo assistant. I can answer farming related questions using a small local knowledge base. Try one of the suggested questions below.",
  // Timestamp created at render time in the page component
  time: null,
};

// Suggested question chips displayed above the chat input
export const SUGGESTED_QUESTIONS = [
  "What crop is suitable for my soil?",
  "What fertilizer should I use?",
  "What is today's weather?",
  "Which crop is suitable for this season?",
];

/**
 * RESPONSE_RULES - ordered list of keyword rules. The first rule whose
 * keywords match the user's message is used to build the reply.
 */
const RESPONSE_RULES = [
  {
    // Rule name (used only for readability)
    name: "soil-crop",
    // Lowercase keywords that trigger this rule
    keywords: ["soil", "crop suitable", "suitable crop", "which crop"],
    // Reply text returned to the chat
    reply:
      "For your saved demo profile (Loamy soil, Rabi season, medium water availability), the sample dataset commonly lists Wheat, Chickpea, Tomato and Onion as options for loamy soil. A basic soil test is still the best starting point before choosing a crop.",
  },
  {
    name: "fertilizer",
    keywords: ["fertilizer", "fertiliser", "nutrient", "npk", "urea"],
    reply:
      "Nutrient needs change with the growth stage. As a general sample guideline: Seedling needs a small starter dose, Vegetative growth needs more nitrogen, and Flowering needs more phosphorus and potassium. Open the Fertilizer Guidance page to see stage-wise demo information.",
  },
  {
    name: "weather",
    keywords: ["weather", "rain", "temperature", "forecast", "humidity"],
    reply:
      "The sample weather data for Nashik shows about 28°C with partly cloudy skies, 62% humidity, 12 km/h wind and a 35% chance of rain today. Visit the Weather page for the full 5-day sample forecast.",
  },
  {
    name: "season",
    keywords: ["season", "kharif", "rabi", "zaid"],
    reply:
      "Kharif (roughly June to October) is associated with crops like rice, cotton and maize. Rabi (roughly October to March) is associated with wheat, chickpea and mustard. Zaid (summer) suits short duration crops like moong and sunflower.",
  },
  {
    name: "pest",
    keywords: ["pest", "disease", "insect", "fungus", "spray"],
    reply:
      "Integrated Pest Management is a common approach: monitor the field regularly, use resistant varieties where available, and apply any plant protection chemical only after confirming the pest. For a specific diagnosis, contact your local agriculture officer or Krishi Vigyan Kendra.",
  },
  {
    name: "water",
    keywords: ["water", "irrigation", "drip", "dry"],
    reply:
      "With low water availability, options in the sample dataset include chickpea, mustard, groundnut and moong. Drip or sprinkler systems also reduce water losses. The Per Drop More Crop sample scheme record on the Schemes page mentions subsidy support for micro-irrigation.",
  },
  {
    name: "scheme",
    keywords: ["scheme", "subsidy", "government", "loan", "insurance"],
    reply:
      "The Schemes page has eight sample records including PM-KISAN, Fasal Bima Yojana, Soil Health Card, Kisan Credit Card and Per Drop More Crop. You can search them by name and filter by category. Please verify details from official sources.",
  },
  {
    name: "price",
    keywords: ["price", "market", "mandi", "sell", "rate"],
    reply:
      "Market prices vary by mandi and season, so this demo does not display live rates. The e-NAM sample record on the Schemes page describes an online platform for price discovery across participating markets.",
  },
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "namaste", "good morning"],
    reply:
      "Hello! Ask me about crops, soil, fertilizer, weather, irrigation or government scheme records. Remember that I am running in demo mode with a small local knowledge base.",
  },
  {
    name: "thanks",
    keywords: ["thank", "thanks", "dhanyavad"],
    reply: "You are welcome! Let me know if you have another farming question.",
  },
];

/**
 * getMockAssistantReply - returns a demo reply for the given user message.
 * @param {string} message - the text typed by the user
 * @returns {string} the reply text to display as an AI message
 */
export const getMockAssistantReply = (message) => {
  // Normalise the message to lowercase for keyword matching
  const text = String(message).toLowerCase();

  // Find the first rule that has at least one keyword present in the message
  const matchedRule = RESPONSE_RULES.find((rule) =>
    // some() returns true as soon as one keyword is found
    rule.keywords.some((keyword) => text.includes(keyword))
  );

  // When a rule matched, return its prepared reply
  if (matchedRule) return matchedRule.reply;

  // Fallback reply when no keyword matches the question
  return "I do not have that information in my local demo knowledge base yet. In the next phase this assistant will be connected to the Gemini API for richer answers. For now, try asking about crops, soil, fertilizer, weather, irrigation or scheme records.";
};

/**
 * buildAssistantReply - wraps the reply text with the metadata the chat UI needs.
 * @param {string} message - user message
 * @returns {Object} a chat message object ready to append to the conversation
 */
export const buildAssistantReply = (message) => ({
  // Mark the message as coming from the assistant
  sender: "ai",
  // Resolve the reply text from the local rule engine
  text: getMockAssistantReply(message),
  // Attach the current time so the UI can show a timestamp
  time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
});
