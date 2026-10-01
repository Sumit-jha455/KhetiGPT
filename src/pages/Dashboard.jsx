// Import the Link component for the assistant call to action
import { Link } from "react-router-dom";
// Import the lucide icons used on the dashboard
import {
  MessageSquareText,
  CloudSun,
  Sprout,
  Droplets,
  MapPin,
  ArrowRight,
  Ruler,
  Layers,
  ClipboardList,
  Sparkles,
  Bot,
  Wind,
  Umbrella,
} from "lucide-react";
// Import the reusable card, badge and disclaimer components
import Card, { CardHeader } from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Disclaimer from "../components/Disclaimer";
import StatCard from "../components/StatCard";
import ServiceCard from "../components/ServiceCard";
// Import the mock weather data for the summary card
import { CURRENT_WEATHER, WEATHER_TIPS } from "../data/mockWeather";
// Import the quick services and sample activity data
import { QUICK_SERVICES, RECENT_ACTIVITY, FARM_TASKS } from "../data/farmProfile";
// Import the global app context for the farmer and farm details
import { useApp } from "../context/AppContext";
// Import the greeting and date formatters
import { getGreeting, formatLongDate } from "../utils/formatters";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Maps a quick service tone to the icon rendered on the dashboard grid
const SERVICE_ICONS = {
  // AI assistant module icon
  brand: MessageSquareText,
  // Weather module icon
  sky: CloudSun,
  // Crop recommendation module icon
  amber: Sprout,
  // Fertilizer module icon
  lime: Droplets,
};

/**
 * Dashboard - the home screen of the application area.
 * Shows a greeting, farm overview, quick services, weather summary, the
 * current crop and an AI assistant call to action.
 */
export default function Dashboard() {
  // Set the browser tab title for this page
  useDocumentTitle("Dashboard");

  // Read the demo farmer and farm information from context
  const { user, farm } = useApp();

  return (
    // Fragment so multiple sections can be returned
    <>
      {/* ============ GREETING BLOCK ============ */}
      <div className="mb-6">
        {/* Time aware greeting with the farmer's name */}
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-brand-950 sm:text-3xl">
          {/* Greeting depends on the current hour */}
          {getGreeting()}, {user?.name?.split(" ")[0] || "Farmer"} 👋
        </h1>
        {/* Today's date under the greeting */}
        <p className="mt-1.5 text-sm text-ink-muted">
          {/* Long formatted date */}
          {formatLongDate()} · Here is a summary of your demo farm.
        </p>
      </div>

      {/* Sample data disclaimer shown once at the top of the dashboard */}
      <Disclaimer
        // Notice text
        text="All values on this page are sample data created for the academic demonstration of KhetiGPT. No live user or farm data is used."
        // Blue informational tone
        tone="sky"
        // Bottom margin for spacing
        className="mb-6"
      />

      {/* ============ FARM OVERVIEW CARD ============ */}
      <Card className="mb-6">
        {/* Card header with icon and description */}
        <CardHeader
          // Card title
          title="Farm Overview"
          // Helper description
          description="Details from your demo farm profile."
          // Icon shown in the tile
          icon={Layers}
          // Action link to the profile page
          action={
            // Small outline button navigating to the profile module
            <Button to="/profile" variant="outline" size="sm" title="Edit farm details">
              {/* Button label */}
              Edit
            </Button>
          }
        />

        {/* Grid of farm details: one column on mobile, four on desktop */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Farm size tile */}
          <StatCard
            // Tile label
            label="Farm Size"
            // Tile value built from the farm state
            value={`${farm.farmSize} ${farm.farmUnit}`}
            // Icon for the tile
            icon={Ruler}
            // Supporting text
            hint="Registered plot area"
          />
          {/* Location tile */}
          <StatCard
            // Tile label
            label="Location"
            // Tile value
            value={user.location}
            // Icon
            icon={MapPin}
            // Supporting text
            hint="Used for sample weather data"
          />
          {/* Soil type tile */}
          <StatCard
            // Tile label
            label="Soil Type"
            // Tile value
            value={farm.soilType}
            // Icon
            icon={Layers}
            // Supporting text
            hint="Select a soil test for exact values"
          />
          {/* Current crop tile */}
          <StatCard
            // Tile label
            label="Current Crop"
            // Tile value
            value={farm.currentCrop}
            // Icon
            icon={Sprout}
            // Supporting text
            hint={`${farm.season} season`}
          />
        </div>
      </Card>

      {/* ============ TWO COLUMN AREA ============ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column (spans two columns on desktop) */}
        <div className="lg:col-span-2">
          {/* Quick services header */}
          <h2 className="mb-3 text-base font-semibold text-brand-950">Quick Services</h2>

          {/* Grid of quick service cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Map the quick services data into ServiceCard components */}
            {QUICK_SERVICES.map((service) => (
              // ServiceCard renders a clickable card for each module
              <ServiceCard
                // Unique key per service
                key={service.title}
                // Destination route
                to={service.to}
                // Icon resolved from the tone mapping
                icon={SERVICE_ICONS[service.tone]}
                // Card title
                title={service.title}
                // Card description
                description={service.description}
                // Tone drives the icon tile colour
                tone={service.tone}
              />
            ))}
          </div>

          {/* AI assistant call to action card */}
          <Card className="mt-6 border-brand-200 bg-brand-950">
            {/* Flex row that stacks on small screens */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left side: text content */}
              <div className="flex items-start gap-3.5">
                {/* Assistant icon tile */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-200">
                  {/* Bot icon */}
                  <Bot size={22} aria-hidden="true" />
                </span>
                {/* Text block */}
                <div>
                  {/* CTA heading */}
                  <h3 className="font-display text-lg font-bold text-white">
                    Ask the KhetiGPT Assistant
                  </h3>
                  {/* CTA description */}
                  <p className="mt-1 text-sm leading-relaxed text-brand-200/80">
                    Get quick answers about crops, soil, fertilizer, weather and scheme records
                    using the local demo response engine.
                  </p>
                  {/* Demo mode badge */}
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-200">
                    {/* Sparkles icon */}
                    <Sparkles size={12} aria-hidden="true" />
                    {/* Badge label */}
                    Demo AI Mode
                  </span>
                </div>
              </div>

              {/* Right side: action button */}
              <div className="shrink-0">
                {/* White button that contrasts with the dark card */}
                <Button
                  // Navigate to the assistant module
                  to="/assistant"
                  // Light button on the dark surface
                  className="bg-white text-brand-900 hover:bg-brand-50"
                  // Tooltip
                  title="Open the AI assistant"
                >
                  {/* Button label */}
                  Start Chat
                  {/* Arrow icon */}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent activity list */}
          <Card className="mt-6">
            {/* Card header */}
            <CardHeader
              // Title
              title="Recent Activity"
              // Description
              description="Sample activity entries for demonstration."
              // Icon
              icon={ClipboardList}
            />

            {/* Vertical list of activity rows */}
            <ul className="divide-y divide-line">
              {/* Map the sample activity data into rows */}
              {RECENT_ACTIVITY.map((activity) => (
                // Single activity row rendered as a link
                <li key={activity.title}>
                  {/* Router link styled as a row */}
                  <Link
                    // Destination route
                    to={activity.to}
                    // Row styling with a hover background
                    className="flex items-center justify-between gap-3 py-3 transition-colors hover:text-brand-700"
                  >
                    {/* Left side: title and time */}
                    <div className="min-w-0">
                      {/* Activity title */}
                      <p className="truncate text-sm font-medium text-ink">{activity.title}</p>
                      {/* Activity time */}
                      <p className="text-xs text-ink-muted">{activity.time}</p>
                    </div>
                    {/* Arrow icon on the right */}
                    <ArrowRight size={16} className="shrink-0 text-ink-muted" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column: weather, crop and tasks */}
        <div>
          {/* Weather summary card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title
              title="Weather Summary"
              // Description
              description="Sample reading for your location."
              // Icon
              icon={CloudSun}
              // Link to the full weather page
              action={
                // Small outline button
                <Button to="/weather" variant="outline" size="sm" title="Open weather page">
                  {/* Label */}
                  View
                </Button>
              }
            />

            {/* Temperature and condition row */}
            <div className="flex items-center justify-between">
              {/* Left side: condition text */}
              <div>
                {/* Large temperature value */}
                <p className="font-display text-4xl font-extrabold text-brand-950">
                  {/* Sample temperature */}
                  {CURRENT_WEATHER.temperature}°C
                </p>
                {/* Condition label */}
                <p className="mt-1 text-sm font-medium text-ink-soft">
                  {CURRENT_WEATHER.condition}
                </p>
              </div>
              {/* Right side: weather icon */}
              <CloudSun size={44} className="text-sky-deep" aria-hidden="true" />
            </div>

            {/* Weather metrics list */}
            <dl className="mt-5 space-y-2.5 text-sm">
              {/* Humidity row */}
              <div className="flex items-center justify-between">
                {/* Metric label */}
                <dt className="text-ink-muted">Humidity</dt>
                {/* Metric value */}
                <dd className="font-semibold text-brand-950">{CURRENT_WEATHER.humidity}%</dd>
              </div>
              {/* Wind speed row */}
              <div className="flex items-center justify-between">
                {/* Metric label */}
                <dt className="text-ink-muted">
                  {/* Inline wind icon */}
                  <Wind size={14} className="mr-1.5 inline" aria-hidden="true" />
                  Wind Speed
                </dt>
                {/* Metric value */}
                <dd className="font-semibold text-brand-950">
                  {CURRENT_WEATHER.windSpeed} km/h
                </dd>
              </div>
              {/* Rain probability row */}
              <div className="flex items-center justify-between">
                {/* Metric label */}
                <dt className="text-ink-muted">
                  {/* Inline umbrella icon */}
                  <Umbrella size={14} className="mr-1.5 inline" aria-hidden="true" />
                  Rain Probability
                </dt>
                {/* Metric value */}
                <dd className="font-semibold text-brand-950">
                  {CURRENT_WEATHER.rainProbability}%
                </dd>
              </div>
            </dl>

            {/* Sample weather tip */}
            <p className="mt-4 rounded-xl bg-surface p-3 text-xs leading-relaxed text-ink-soft">
              {/* Tip icon plus text */}
              <Sparkles size={13} className="mr-1.5 inline text-brand-600" aria-hidden="true" />
              {/* First tip from the sample data */}
              {WEATHER_TIPS[0]}
            </p>
          </Card>

          {/* Current crop card */}
          <Card className="mt-6">
            {/* Card header */}
            <CardHeader
              // Title
              title="Current Crop"
              // Description
              description="Crop recorded in your demo profile."
              // Icon
              icon={Sprout}
            />

            {/* Crop name and season badge */}
            <div className="flex items-center justify-between">
              {/* Crop name */}
              <p className="font-display text-xl font-bold text-brand-950">
                {farm.currentCrop}
              </p>
              {/* Season badge */}
              <Badge tone="amber">{farm.season} Season</Badge>
            </div>

            {/* Crop detail rows */}
            <dl className="mt-4 space-y-2.5 text-sm">
              {/* Water availability row */}
              <div className="flex items-center justify-between">
                {/* Label */}
                <dt className="text-ink-muted">Water Availability</dt>
                {/* Value */}
                <dd className="font-semibold text-brand-950">{farm.waterAvailability}</dd>
              </div>
              {/* Soil type row */}
              <div className="flex items-center justify-between">
                {/* Label */}
                <dt className="text-ink-muted">Soil Type</dt>
                {/* Value */}
                <dd className="font-semibold text-brand-950">{farm.soilType}</dd>
              </div>
              {/* Growth stage row (sample value) */}
              <div className="flex items-center justify-between">
                {/* Label */}
                <dt className="text-ink-muted">Growth Stage</dt>
                {/* Value */}
                <dd className="font-semibold text-brand-950">Vegetative</dd>
              </div>
            </dl>

            {/* Link to the fertilizer module */}
            <div className="mt-4">
              {/* Small button navigating to the fertilizer page */}
              <Button
                // Route
                to="/fertilizer"
                // Outline variant
                variant="outline"
                // Full width on mobile
                fullWidth
                // Tooltip
                title="Open fertilizer guidance"
              >
                {/* Button label */}
                View Fertilizer Guidance
                {/* Arrow icon */}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </Card>

          {/* Farm tasks card */}
          <Card className="mt-6">
            {/* Card header */}
            <CardHeader
              // Title
              title="Farm Tasks"
              // Description
              description="Sample checklist for demonstration."
              // Icon
              icon={ClipboardList}
            />

            {/* Task list */}
            <ul className="space-y-2.5">
              {/* Map the sample tasks into rows */}
              {FARM_TASKS.map((task) => (
                // Single task row
                <li key={task.id} className="flex items-start gap-2.5">
                  {/* Checkbox reflecting the sample completion state */}
                  <input
                    // Checkbox type
                    type="checkbox"
                    // Checked state from the sample data
                    defaultChecked={task.done}
                    // Accessible label
                    aria-label={task.label}
                    // Green accent and larger tap area
                    className="mt-0.5 h-4 w-4 rounded border-line accent-brand-600"
                    // Disabled because this list is static sample data
                    disabled
                  />
                  {/* Task label with muted styling when done */}
                  <span
                    // Strike through completed sample tasks
                    className={
                      task.done
                        ? "text-sm leading-relaxed text-ink-muted line-through"
                        : "text-sm leading-relaxed text-ink-soft"
                    }
                  >
                    {/* Task text */}
                    {task.label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
