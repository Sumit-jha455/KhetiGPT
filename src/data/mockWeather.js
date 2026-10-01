/**
 * mockWeather.js
 * Sample weather data for the Weather page and dashboard summary card.
 * This data is hardcoded for academic demonstration only - the real
 * Weather API integration is planned for a later project phase.
 */

// Locations available in the weather location selector
export const WEATHER_LOCATIONS = [
  "Nashik, Maharashtra",
  "Indore, Madhya Pradesh",
  "Ludhiana, Punjab",
  "Guntur, Andhra Pradesh",
  "Kanpur, Uttar Pradesh",
];

// Current conditions block (values are sample data)
export const CURRENT_WEATHER = {
  // Location the sample reading belongs to
  location: "Nashik, Maharashtra",
  // Main temperature in Celsius
  temperature: 28,
  // Short human readable condition
  condition: "Partly Cloudy",
  // "Feels like" temperature in Celsius
  feelsLike: 30,
  // Relative humidity percentage
  humidity: 62,
  // Wind speed in km/h
  windSpeed: 12,
  // Probability of rain today (percentage)
  rainProbability: 35,
  // Ultraviolet index label
  uvIndex: "Moderate",
  // Sunrise and sunset sample times
  sunrise: "06:24 AM",
  sunset: "06:52 PM",
  // When this sample reading was "updated"
  updatedAt: "08:30 AM (sample data)",
};

// Five day sample forecast: one entry per day
export const WEATHER_FORECAST = [
  {
    // ISO date used by the date formatter
    date: "2026-05-18",
    // Short condition label
    condition: "Partly Cloudy",
    // Icon key mapped to a lucide-react icon in the UI
    icon: "cloud-sun",
    // Maximum and minimum temperature for the day
    high: 30,
    low: 21,
    // Rain chance percentage
    rain: 35,
    // Humidity percentage
    humidity: 62,
    // Wind speed in km/h
    wind: 12,
  },
  {
    date: "2026-05-19",
    condition: "Sunny",
    icon: "sun",
    high: 32,
    low: 22,
    rain: 10,
    humidity: 55,
    wind: 9,
  },
  {
    date: "2026-05-20",
    condition: "Light Rain",
    icon: "cloud-rain",
    high: 27,
    low: 21,
    rain: 70,
    humidity: 78,
    wind: 16,
  },
  {
    date: "2026-05-21",
    condition: "Thunderstorm",
    icon: "cloud-lightning",
    high: 25,
    low: 20,
    rain: 85,
    humidity: 84,
    wind: 22,
  },
  {
    date: "2026-05-22",
    condition: "Mostly Cloudy",
    icon: "cloud",
    high: 29,
    low: 22,
    rain: 30,
    humidity: 66,
    wind: 14,
  },
];

// Simple farming-focused tips derived from the sample forecast
export const WEATHER_TIPS = [
  // Tip about irrigation planning
  "Irrigation may not be needed on days with high rain probability.",
  // Tip about spraying
  "Avoid pesticide spraying on windy or rainy days to reduce drift.",
  // Tip about harvesting
  "Consider harvesting before the heavy rain day to protect produce.",
];

/**
 * getMockWeatherFor - returns slightly varied sample data per location so the
 * location selector visibly changes the page without any API call.
 */
export const getMockWeatherFor = (location) => {
  // Deterministic pseudo-variation derived from the location text length
  const seed = location.length;
  // Return a new current-weather object with adjusted numbers
  return {
    // Keep all base fields from the static sample
    ...CURRENT_WEATHER,
    // Selected location
    location,
    // Nudge the temperature by a small deterministic offset
    temperature: CURRENT_WEATHER.temperature + (seed % 3),
    // Nudge the "feels like" value to stay realistic
    feelsLike: CURRENT_WEATHER.feelsLike + (seed % 3),
    // Nudge humidity within a sensible range
    humidity: Math.min(90, CURRENT_WEATHER.humidity + (seed % 7)),
    // Nudge wind speed within a sensible range
    windSpeed: Math.max(5, CURRENT_WEATHER.windSpeed + (seed % 5)),
    // Nudge the rain probability
    rainProbability: Math.max(5, CURRENT_WEATHER.rainProbability - (seed % 10)),
  };
};
