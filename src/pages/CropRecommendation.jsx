// Import React hooks for form state and loading
import { useState } from "react";
// Import the lucide icons used on this page
import {
  Sprout,
  MapPin,
  Ruler,
  CloudSun,
  Layers,
  Droplets,
  Search,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
// Import the reusable form and card components
import Card, { CardHeader } from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Disclaimer from "../components/Disclaimer";
import LoadingState from "../components/LoadingState";
// Import the option lists for the form dropdowns
import { SEASONS, SOIL_TYPES, WATER_LEVELS, LOCATIONS } from "../data/mockCrops";
// Import the mock recommendation service
import { getCropRecommendation } from "../services/cropService";
// Import the validation helpers
import { validateRequired, runValidation } from "../utils/validators";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";
// Import the global app context to prefill the form
import { useApp } from "../context/AppContext";

/**
 * CropRecommendation - form plus local demo result.
 * The recommendation is produced by a rule based function in
 * src/data/mockCrops.js, not by an agronomic model or an API.
 */
export default function CropRecommendation() {
  // Set the browser tab title for this page
  useDocumentTitle("Crop Recommendation");

  // Read the saved demo farm details so the form can be prefilled
  const { user, farm } = useApp();

  // Form state holding all five inputs
  const [form, setForm] = useState({
    // Location defaults to the profile location
    location: user.location || LOCATIONS[0],
    // Season defaults to the profile season
    season: farm.season || SEASONS[0],
    // Soil type defaults to the profile soil
    soilType: farm.soilType || SOIL_TYPES[0],
    // Water availability defaults to the profile value
    water: farm.waterAvailability || WATER_LEVELS[1],
    // Farm size defaults to the profile value
    farmSize: farm.farmSize || "2.5",
  });

  // Object holding one error message per field
  const [errors, setErrors] = useState({});
  // Recommendation result returned by the demo service
  const [result, setResult] = useState(null);
  // Loading flag shown while the mock request resolves
  const [loading, setLoading] = useState(false);

  /** Generic change handler that updates one field and clears its error */
  const handleChange = (event) => {
    // Destructure the field name and value
    const { name, value } = event.target;
    // Update the form state
    setForm((current) => ({ ...current, [name]: value }));
    // Clear the error for that field
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  /** Validates the form before submission */
  const validateForm = () => {
    // Validation rules for every field
    const rules = {
      // Location is required
      location: (value) => validateRequired(value, "Location"),
      // Season is required
      season: (value) => validateRequired(value, "Season"),
      // Soil type is required
      soilType: (value) => validateRequired(value, "Soil type"),
      // Water availability is required
      water: (value) => validateRequired(value, "Water availability"),
      // Farm size is required
      farmSize: (value) => validateRequired(value, "Farm size"),
    };
    // Run the rules and capture the messages
    const { errors: nextErrors, isValid } = runValidation(form, rules);
    // Store the errors for display
    setErrors(nextErrors);
    // Return the validity flag
    return isValid;
  };

  /** Handles the form submission and stores the demo result */
  const handleSubmit = async (event) => {
    // Prevent the default browser submit
    event.preventDefault();
    // Stop early when the form is invalid
    if (!validateForm()) return;

    // Show the loading state
    setLoading(true);
    // Clear any previous result
    setResult(null);

    // Request the recommendation from the local service
    const recommendation = await getCropRecommendation(form);

    // Store the result so the result card renders
    setResult(recommendation);
    // Hide the loading state
    setLoading(false);
  };

  /** Resets the form back to the profile defaults and clears the result */
  const handleReset = () => {
    // Restore the original values
    setForm({
      // Profile location
      location: user.location || LOCATIONS[0],
      // Profile season
      season: farm.season || SEASONS[0],
      // Profile soil
      soilType: farm.soilType || SOIL_TYPES[0],
      // Profile water level
      water: farm.waterAvailability || WATER_LEVELS[1],
      // Profile farm size
      farmSize: farm.farmSize || "2.5",
    });
    // Clear the errors
    setErrors({});
    // Clear the previous recommendation
    setResult(null);
  };

  return (
    // Fragment so the header, form and result can be returned together
    <>
      {/* Page header block */}
      <div className="mb-6">
        {/* Title row with the module icon */}
        <div className="flex items-center gap-3">
          {/* Icon tile */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            {/* Sprout icon */}
            <Sprout size={22} aria-hidden="true" />
          </span>
          {/* Page title */}
          <h1 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">
            Crop Recommendation
          </h1>
        </div>
        {/* Page description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Enter your farm details to receive a crop suggestion from the local demo dataset. The
          result is generated with rule based logic and is for academic demonstration only.
        </p>
      </div>

      {/* Two column layout: form on the left, result on the right */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input form card */}
        <Card className="lg:col-span-2">
          {/* Card header */}
          <CardHeader
            // Title
            title="Farm Details"
            // Description
            description="Fields marked with * are required."
            // Icon
            icon={MapPin}
          />

          {/* The recommendation form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Location dropdown */}
            <Select
              // Label
              label="Location"
              // Name
              name="location"
              // Options
              options={LOCATIONS}
              // Placeholder
              placeholder="Select your location"
              // Current value
              value={form.location}
              // Change handler
              onChange={handleChange}
              // Required
              required
              // Error message
              error={errors.location}
            />

            {/* Season dropdown */}
            <Select
              // Label
              label="Season"
              // Name
              name="season"
              // Options
              options={SEASONS}
              // Placeholder
              placeholder="Select a season"
              // Current value
              value={form.season}
              // Change handler
              onChange={handleChange}
              // Required
              required
              // Error
              error={errors.season}
              // Helper text
              hint="Kharif, Rabi or Zaid growing season."
            />

            {/* Soil type dropdown */}
            <Select
              // Label
              label="Soil Type"
              // Name
              name="soilType"
              // Options
              options={SOIL_TYPES}
              // Placeholder
              placeholder="Select your soil type"
              // Current value
              value={form.soilType}
              // Change handler
              onChange={handleChange}
              // Required
              required
              // Error
              error={errors.soilType}
            />

            {/* Water availability dropdown */}
            <Select
              // Label
              label="Water Availability"
              // Name
              name="water"
              // Options
              options={WATER_LEVELS}
              // Placeholder
              placeholder="Select water availability"
              // Current value
              value={form.water}
              // Change handler
              onChange={handleChange}
              // Required
              required
              // Error
              error={errors.water}
            />

            {/* Farm size input */}
            <Input
              // Label
              label="Farm Size"
              // Name
              name="farmSize"
              // Numeric input
              type="number"
              // Icon
              icon={Ruler}
              // Current value
              value={form.farmSize}
              // Change handler
              onChange={handleChange}
              // Placeholder
              placeholder="e.g. 2.5"
              // Required
              required
              // Error
              error={errors.farmSize}
              // Helper text
              hint="Plot area in acres."
            />

            {/* Action buttons row */}
            <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
              {/* Submit button */}
              <Button type="submit" fullWidth title="Get demo recommendation">
                {/* Search icon */}
                <Search size={16} aria-hidden="true" />
                {/* Button label */}
                Get Recommendation
              </Button>
              {/* Reset button */}
              <Button
                // Outline variant for the secondary action
                variant="outline"
                // Full width on mobile
                fullWidth
                // Reset the form and the result
                onClick={handleReset}
                // Tooltip
                title="Reset the form"
              >
                {/* Reset icon */}
                <RotateCcw size={16} aria-hidden="true" />
                {/* Button label */}
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {/* Result column */}
        <div className="lg:col-span-3">
          {/* Loading state while the mock service resolves */}
          {loading ? (
            // Card containing the loading skeleton
            <Card>
              {/* Skeleton indicator */}
              <LoadingState label="Generating demo recommendation…" rows={4} />
            </Card>
          ) : // Show the result card when a recommendation exists
          result ? (
            // Fragment holding the result content
            <>
              {/* Main recommendation card */}
              <Card className="border-brand-300">
                {/* Card header with the sample badge */}
                <CardHeader
                  // Title
                  title="Recommendation Result"
                  // Description
                  description="Generated by the local rule based demo logic."
                  // Icon
                  icon={Sprout}
                  // Badge shown on the right
                  action={<Badge tone="amber">Demo Output</Badge>}
                />

                {/* Recommended crop block */}
                <div className="rounded-2xl bg-brand-50 p-5">
                  {/* Small label */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    Recommended Crop
                  </p>
                  {/* Crop name */}
                  <p className="mt-1.5 font-display text-3xl font-extrabold text-brand-950">
                    {result.crop}
                  </p>

                  {/* Detail badges row */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Season badge */}
                    <Badge tone="brand">{result.category}</Badge>
                    {/* Duration badge */}
                    <Badge tone="neutral">{result.duration}</Badge>
                    {/* Water badge */}
                    <Badge tone="sky">Water: {result.waterNeed}</Badge>
                  </div>
                </div>

                {/* Reason section */}
                <div className="mt-5">
                  {/* Section heading */}
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-950">
                    {/* Check icon */}
                    <CheckCircle2 size={16} className="text-brand-600" aria-hidden="true" />
                    Reason
                  </h3>
                  {/* Reason paragraph */}
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{result.reason}</p>
                </div>

                {/* Considerations section */}
                <div className="mt-5">
                  {/* Section heading */}
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-950">
                    {/* Lightbulb icon */}
                    <Lightbulb size={16} className="text-amber-600" aria-hidden="true" />
                    Considerations
                  </h3>
                  {/* Bullet list of considerations */}
                  <ul className="mt-2 space-y-2">
                    {/* Map every consideration into a bullet row */}
                    {result.considerations.map((consideration) => (
                      // Single bullet row
                      <li key={consideration} className="flex items-start gap-2.5">
                        {/* Bullet dot */}
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {/* Consideration text */}
                        <span className="text-sm leading-relaxed text-ink-soft">
                          {consideration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Method note explaining the source of the result */}
                <p className="mt-5 rounded-xl bg-surface p-3 text-xs leading-relaxed text-ink-muted">
                  {/* Layers icon */}
                  <Layers size={13} className="mr-1.5 inline" aria-hidden="true" />
                  {/* Method text */}
                  {result.method}
                </p>
              </Card>

              {/* Alternatives card */}
              <Card className="mt-6">
                {/* Card header */}
                <CardHeader
                  // Title
                  title="Alternatives to Consider"
                  // Description
                  description="Other crops that matched your inputs in the sample dataset."
                  // Icon
                  icon={Droplets}
                />

                {/* Alternatives grid */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {/* Map the alternative crops into tiles */}
                  {result.alternatives.map((alternative) => (
                    // Single alternative tile
                    <div
                      // Unique key per crop
                      key={alternative.name}
                      // Tile styling
                      className="rounded-xl border border-line bg-surface p-4"
                    >
                      {/* Crop name */}
                      <p className="text-sm font-semibold text-brand-950">{alternative.name}</p>
                      {/* Crop note */}
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        {alternative.note}
                      </p>
                      {/* Water need line */}
                      <p className="mt-2 text-[11px] font-medium text-brand-700">
                        Water: {alternative.waterNeed}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Academic disclaimer */}
              <Disclaimer
                // Notice text
                text="Academic demonstration only: this result is produced by a simple rule based function inside the frontend and must not be treated as professional agricultural advice. Please consult a local agriculture officer or Krishi Vigyan Kendra before taking a decision."
                // Warning tone
                tone="amber"
                // Spacing above
                className="mt-6"
              />
            </>
          ) : (
            // Empty state shown before the first submission
            <Card className="flex h-full flex-col items-center justify-center text-center">
              {/* Icon tile */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                {/* Alert triangle icon */}
                <AlertTriangle size={26} aria-hidden="true" />
              </span>
              {/* Empty state heading */}
              <h3 className="mt-4 text-base font-semibold text-brand-950">
                No recommendation yet
              </h3>
              {/* Empty state description */}
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-muted">
                Fill in your farm details on the left and press{" "}
                <span className="font-semibold text-brand-700">Get Recommendation</span> to see a
                demo crop suggestion with the reason and considerations.
              </p>
              {/* Decorative weather icon row */}
              <div className="mt-5 flex items-center gap-3 text-ink-muted">
                {/* Sprout icon */}
                <Sprout size={18} aria-hidden="true" />
                {/* Cloud icon */}
                <CloudSun size={18} aria-hidden="true" />
                {/* Droplet icon */}
                <Droplets size={18} aria-hidden="true" />
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
