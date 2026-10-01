/**
 * farmProfile.js
 * Sample farmer + farm data used across the dashboard, profile and forms.
 * IMPORTANT: this is static sample data created for academic demonstration,
 * not data fetched from a real user database.
 */

// Default demo farmer account used when someone logs in / registers in demo mode
export const DEMO_USER = {
  // Display name shown in the greeting, topbar and profile page
  name: "Aarav Patil",
  // Email used on the login form placeholder and profile page
  email: "aarav.patil@example.com",
  // District and state used for weather/scheme demo content
  location: "Nashik, Maharashtra",
  // Language preference toggled in Settings (English | Hindi)
  language: "English",
  // When the demo account was created (displayed on the profile page)
  joined: "2026 academic session",
};

// Default demo farm details used by the dashboard and crop forms
export const DEMO_FARM = {
  // Size of the demo farm
  farmSize: "2.5",
  // Unit used together with the farm size value
  farmUnit: "acres",
  // Predominant soil type of the demo farm
  soilType: "Loamy",
  // Crop currently growing on the demo farm
  currentCrop: "Tomato",
  // Irrigation / water availability level
  waterAvailability: "Medium",
  // Season currently selected for demo recommendations
  season: "Rabi",
};

// Quick services shown on the dashboard; icons are resolved in the UI layer
export const QUICK_SERVICES = [
  {
    // Route the card navigates to
    to: "/assistant",
    // Short label of the service
    title: "AI Assistant",
    // One line description of what the service does
    description: "Ask farming questions and get demo AI answers",
    // Tailwind classes used for the icon tile colour
    tone: "brand",
  },
  {
    to: "/weather",
    title: "Weather",
    description: "Check current conditions and a 5-day sample forecast",
    tone: "sky",
  },
  {
    to: "/crop-recommendation",
    title: "Crop Recommendation",
    description: "Get a demo crop suggestion from your farm details",
    tone: "amber",
  },
  {
    to: "/fertilizer",
    title: "Fertilizer Guidance",
    description: "See sample nutrient guidance by growth stage",
    tone: "lime",
  },
];

// Small "recent activity" list rendered on the dashboard (sample entries)
export const RECENT_ACTIVITY = [
  {
    // Label of the activity
    title: "Crop recommendation generated",
    // Timestamp text (static sample)
    time: "Today, 09:15",
    // Route to reopen the related module
    to: "/crop-recommendation",
  },
  {
    title: "Weather forecast reviewed",
    time: "Today, 08:40",
    to: "/weather",
  },
  {
    title: "PM-KISAN scheme opened",
    time: "Yesterday, 17:05",
    to: "/schemes",
  },
];

// Short list of demo to-do items shown on the dashboard
export const FARM_TASKS = [
  // Task description plus a boolean completion flag
  { id: 1, label: "Check irrigation lines in the north field", done: true },
  { id: 2, label: "Collect soil sample for testing", done: false },
  { id: 3, label: "Review fertilizer schedule for tomato", done: false },
];
