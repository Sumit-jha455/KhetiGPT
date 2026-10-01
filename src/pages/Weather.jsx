// Import React hooks for state and data loading
import { useState, useEffect } from "react";
// Import the lucide icons used on the weather page
import {
  CloudSun,
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
  Umbrella,
  MapPin,
  Thermometer,
  Sunrise,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
// Import the reusable card, badge, disclaimer and loading components
import Card, { CardHeader } from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Disclaimer from "../components/Disclaimer";
import LoadingState from "../components/LoadingState";
// Import the mock weather service layer
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchLocations,
  fetchWeatherTips,
} from "../services/weatherService";
// Import the date formatter for the forecast labels
import { formatDayLabel } from "../utils/formatters";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Maps the icon key stored in the data to a lucide icon component
const ICON_MAP = {
  // Partly cloudy icon
  "cloud-sun": CloudSun,
  // Sunny icon
  sun: Sun,
  // Rain icon
  "cloud-rain": CloudRain,
  // Thunderstorm icon
  "cloud-lightning": CloudLightning,
  // Cloudy icon
  cloud: Cloud,
};

/**
 * Weather - the mock weather dashboard.
 * Shows current conditions, key metrics and a five day sample forecast for
 * the selected location. No external weather API is called.
 */
export default function Weather() {
  // Set the browser tab title for this page
  useDocumentTitle("Weather Information");

  // Currently selected location from the dropdown
  const [location, setLocation] = useState(fetchLocations()[0]);
  // Current conditions object returned by the mock service
  const [current, setCurrent] = useState(null);
  // Five day forecast array returned by the mock service
  const [forecast, setForecast] = useState([]);
  // Loading flag shown while the mock data is being "fetched"
  const [loading, setLoading] = useState(true);
  // Counter that changes when the user presses Refresh so the effect re-runs
  const [refreshKey, setRefreshKey] = useState(0);
  // Farming tips linked to the forecast
  const tips = fetchWeatherTips();

  // Load the mock weather data when the location or the refresh counter changes
  useEffect(() => {
    // Track whether this effect run is still valid
    let active = true;
    // Show the loading state before fetching
    setLoading(true);

    /** Loads the current conditions and forecast in parallel */
    const loadData = async () => {
      // Request the current conditions for the selected location
      const currentData = await fetchCurrentWeather(location);
      // Request the five day forecast
      const forecastData = await fetchForecast();
      // Ignore the result if the location changed while loading
      if (!active) return;
      // Store the current conditions in state
      setCurrent(currentData);
      // Store the forecast in state
      setForecast(forecastData);
      // Hide the loading state
      setLoading(false);
    };

    // Run the loader function
    loadData();
    // Cleanup marks the effect as inactive on unmount or dependency change
    return () => {
      active = false;
    };
    // Re-run whenever the location or the refresh counter changes
  }, [location, refreshKey]);

  return (
    // Fragment so the header and content can be returned together
    <>
      {/* Page header block */}
      <div className="mb-6">
        {/* Title row with the module icon */}
        <div className="flex items-center gap-3">
          {/* Icon tile */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
            {/* Weather icon */}
            <CloudSun size={22} aria-hidden="true" />
          </span>
          {/* Page title */}
          <h1 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">
            Weather Information
          </h1>
        </div>
        {/* Page description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Check current conditions and a five day sample forecast for your area. Weather API
          integration is planned for a later phase of the project.
        </p>
      </div>

      {/* Location selector and refresh row */}
      <Card className="mb-6">
        {/* Flex row that stacks on small screens */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          {/* Location dropdown */}
          <div className="w-full sm:max-w-sm">
            {/* Field label */}
            <label
              // Linked to the select element below
              htmlFor="weather-location"
              // Label styling
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              {/* Label text with an inline pin icon */}
              <MapPin size={14} className="mr-1.5 inline" aria-hidden="true" />
              Select Location
            </label>

            {/* Native select for the location */}
            <div className="relative">
              {/* Select element bound to the location state */}
              <select
                // Id connected to the label
                id="weather-location"
                // Current value
                value={location}
                // Update the location state on change
                onChange={(event) => setLocation(event.target.value)}
                // Styled select with a native appearance
                className="h-11 w-full appearance-none rounded-xl border border-line bg-white px-3.5 pr-10 text-sm font-medium text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                {/* Map every available location into an option */}
                {fetchLocations().map((option) => (
                  // Single option element
                  <option key={option} value={option}>
                    {/* Option label */}
                    {option}
                  </option>
                ))}
              </select>
              {/* Decorative chevron shown on the right of the select */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
                {/* Chevron down icon */}
                <ChevronDown size={18} aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* Refresh button that reloads the same mock data */}
          <Button
            // Outline variant keeps the action secondary
            variant="outline"
            // Small size for the utility row
            size="sm"
            // Increase the refresh counter so the data effect runs again
            onClick={() => setRefreshKey((key) => key + 1)}
            // Tooltip text
            title="Refresh sample data"
          >
            {/* Refresh icon */}
            <RefreshCw size={16} aria-hidden="true" />
            {/* Button label */}
            Refresh
          </Button>
        </div>

        {/* Sample data disclaimer under the selector */}
        <Disclaimer
          // Notice text
          text="Sample data: the values below are hardcoded demo values, not live weather readings."
          // Amber tone marks it as a warning
          tone="amber"
          // Spacing above the notice
          className="mt-4"
        />
      </Card>

      {/* Loading state or weather content */}
      {loading ? (
        // Skeleton shown while the mock request resolves
        <Card>
          {/* Loading indicator with three skeleton rows */}
          <LoadingState label="Loading sample weather data…" rows={3} />
        </Card>
      ) : (
        // Fragment holding the loaded content
        <>
          {/* Current weather and metrics grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Current conditions card */}
            <Card className="border-brand-200 bg-brand-950 lg:col-span-1">
              {/* Location label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                {/* Current conditions heading */}
                Current Weather
              </p>

              {/* Location name row */}
              <div className="mt-2 flex items-center gap-2">
                {/* Pin icon */}
                <MapPin size={15} className="text-brand-300" aria-hidden="true" />
                {/* Location text */}
                <p className="text-sm font-semibold text-white">{current.location}</p>
              </div>

              {/* Temperature and icon row */}
              <div className="mt-5 flex items-center justify-between">
                {/* Left side: temperature values */}
                <div>
                  {/* Main temperature */}
                  <p className="font-display text-5xl font-extrabold leading-none text-white">
                    {/* Sample temperature */}
                    {current.temperature}°C
                  </p>
                  {/* Condition label */}
                  <p className="mt-2 text-sm font-semibold text-brand-200">
                    {current.condition}
                  </p>
                  {/* Feels like value */}
                  <p className="mt-0.5 text-xs text-brand-300/80">
                    Feels like {current.feelsLike}°C
                  </p>
                </div>
                {/* Right side: large weather icon */}
                <CloudSun size={56} className="text-brand-300" aria-hidden="true" />
              </div>

              {/* Update time and UV index badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {/* Sample data badge */}
                <Badge tone="brand" className="border-brand-700 bg-brand-900 text-brand-200">
                  Sample
                </Badge>
                {/* UV index badge */}
                <Badge tone="brand" className="border-brand-700 bg-brand-900 text-brand-200">
                  UV: {current.uvIndex}
                </Badge>
                {/* Sunrise badge */}
                <Badge tone="brand" className="border-brand-700 bg-brand-900 text-brand-200">
                  <Sunrise size={11} aria-hidden="true" /> {current.sunrise}
                </Badge>
              </div>

              {/* Updated timestamp */}
              <p className="mt-4 text-[11px] text-brand-300/70">Updated: {current.updatedAt}</p>
            </Card>

            {/* Metric tiles grid */}
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-3">
              {/* Humidity tile */}
              <Card>
                {/* Icon tile */}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
                  {/* Droplets icon */}
                  <Droplets size={20} aria-hidden="true" />
                </span>
                {/* Metric label */}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Humidity
                </p>
                {/* Metric value */}
                <p className="mt-1 font-display text-2xl font-bold text-brand-950">
                  {current.humidity}%
                </p>
                {/* Supporting text */}
                <p className="mt-1.5 text-xs text-ink-muted">Relative humidity</p>
              </Card>

              {/* Wind speed tile */}
              <Card>
                {/* Icon tile */}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
                  {/* Wind icon */}
                  <Wind size={20} aria-hidden="true" />
                </span>
                {/* Metric label */}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Wind Speed
                </p>
                {/* Metric value */}
                <p className="mt-1 font-display text-2xl font-bold text-brand-950">
                  {current.windSpeed} km/h
                </p>
                {/* Supporting text */}
                <p className="mt-1.5 text-xs text-ink-muted">Average wind speed</p>
              </Card>

              {/* Rain probability tile */}
              <Card>
                {/* Icon tile */}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
                  {/* Umbrella icon */}
                  <Umbrella size={20} aria-hidden="true" />
                </span>
                {/* Metric label */}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Rain Probability
                </p>
                {/* Metric value */}
                <p className="mt-1 font-display text-2xl font-bold text-brand-950">
                  {current.rainProbability}%
                </p>
                {/* Supporting text */}
                <p className="mt-1.5 text-xs text-ink-muted">Chance of rain today</p>
              </Card>

              {/* Weather tips card spanning the full row */}
              <Card className="sm:col-span-3">
                {/* Card header */}
                <CardHeader
                  // Title
                  title="Farming Considerations"
                  // Description
                  description="General points based on the sample forecast."
                  // Icon
                  icon={Lightbulb}
                />

                {/* List of tips */}
                <ul className="space-y-2.5">
                  {/* Map every tip into a list item */}
                  {tips.map((tip) => (
                    // Single tip row
                    <li key={tip} className="flex items-start gap-2.5">
                      {/* Small green dot marker */}
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {/* Tip text */}
                      <span className="text-sm leading-relaxed text-ink-soft">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Five day forecast section */}
          <h2 className="mb-3 mt-8 text-base font-semibold text-brand-950">5-Day Forecast</h2>

          {/* Forecast grid: horizontally scrollable on very small screens */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Map every forecast day into a card */}
            {forecast.map((day) => {
              // Resolve the icon component for this day
              const DayIcon = ICON_MAP[day.icon] || CloudSun;
              // Return one forecast card
              return (
                // Single forecast day card
                <Card key={day.date} className="text-center">
                  {/* Day label */}
                  <p className="text-sm font-semibold text-brand-950">
                    {formatDayLabel(day.date)}
                  </p>
                  {/* Weather icon */}
                  <DayIcon
                    size={34}
                    className="mx-auto mt-3 text-sky-deep"
                    aria-hidden="true"
                  />
                  {/* Condition label */}
                  <p className="mt-2 text-xs font-medium text-ink-muted">{day.condition}</p>

                  {/* Temperature range row */}
                  <p className="mt-3 flex items-center justify-center gap-1.5 font-display text-lg font-bold text-brand-950">
                    {/* High temperature */}
                    <span className="flex items-center gap-1">
                      {/* Thermometer icon */}
                      <Thermometer size={14} className="text-brand-600" aria-hidden="true" />
                      {/* High value */}
                      {day.high}°
                    </span>
                    {/* Divider */}
                    <span className="text-ink-muted">/</span>
                    {/* Low temperature */}
                    <span className="text-ink-muted">{day.low}°</span>
                  </p>

                  {/* Metric list */}
                  <dl className="mt-4 space-y-1.5 border-t border-line pt-3 text-xs">
                    {/* Rain probability row */}
                    <div className="flex items-center justify-between">
                      {/* Label */}
                      <dt className="text-ink-muted">Rain</dt>
                      {/* Value */}
                      <dd className="font-semibold text-brand-950">{day.rain}%</dd>
                    </div>
                    {/* Humidity row */}
                    <div className="flex items-center justify-between">
                      {/* Label */}
                      <dt className="text-ink-muted">Humidity</dt>
                      {/* Value */}
                      <dd className="font-semibold text-brand-950">{day.humidity}%</dd>
                    </div>
                    {/* Wind row */}
                    <div className="flex items-center justify-between">
                      {/* Label */}
                      <dt className="text-ink-muted">Wind</dt>
                      {/* Value */}
                      <dd className="font-semibold text-brand-950">{day.wind} km/h</dd>
                    </div>
                  </dl>
                </Card>
              );
            })}
          </div>

          {/* Closing disclaimer about the forecast */}
          <Disclaimer
            // Notice text
            text="The forecast above is a static sample dataset created for this project. Real weather data will be added when the Weather API integration is implemented on the server."
            // Spacing above the notice
            className="mt-6"
          />
        </>
      )}
    </>
  );
}
