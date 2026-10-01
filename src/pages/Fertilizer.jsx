// Import React hooks for form state
import { useState } from "react";
// Import the lucide icons used on this page
import {
  Droplets,
  Sprout,
  Layers,
  Leaf,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
// Import the reusable form and card components
import Card, { CardHeader } from "../components/Card";
import Select from "../components/Select";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Disclaimer from "../components/Disclaimer";
// Import the fertilizer data and option lists
import {
  FERTILIZER_CROPS,
  FERTILIZER_SOILS,
  GROWTH_STAGES,
  NUTRIENT_GUIDE,
  STAGE_GUIDE,
} from "../data/mockFertilizer";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";
// Import the global app context for prefilling
import { useApp } from "../context/AppContext";

/**
 * Fertilizer - fertilizer guidance screen.
 * Displays static nutrient information plus stage-wise guidance based on the
 * crop, soil and growth stage selected by the user.
 */
export default function Fertilizer() {
  // Set the browser tab title for this page
  useDocumentTitle("Fertilizer Guidance");

  // Read the demo farm details to prefill the form
  const { farm } = useApp();

  // Form state for the three selection fields
  const [form, setForm] = useState({
    // Crop defaults to the profile crop when it exists in the list
    crop: FERTILIZER_CROPS.includes(farm.currentCrop) ? farm.currentCrop : FERTILIZER_CROPS[0],
    // Soil defaults to the profile soil
    soilType: FERTILIZER_SOILS.includes(farm.soilType) ? farm.soilType : FERTILIZER_SOILS[0],
    // Growth stage defaults to Vegetative
    growthStage: "Vegetative",
  });

  // Track whether the form has been submitted at least once
  const [submitted, setSubmitted] = useState(false);

  /** Generic change handler that updates one field */
  const handleChange = (event) => {
    // Destructure the field name and value
    const { name, value } = event.target;
    // Update the form state
    setForm((current) => ({ ...current, [name]: value }));
    // Mark the form as submitted so guidance refreshes immediately
    setSubmitted(true);
  };

  /** Reads the guidance for the current selection from the static dataset */
  const guidance = STAGE_GUIDE[form.growthStage] || STAGE_GUIDE.Seedling;

  // Soil specific note looked up from the same static map used by the service
  const soilNotes = {
    // Loamy soil note
    Loamy: "Loamy soil usually holds nutrients well, so split applications can be spread evenly.",
    // Clay soil note
    Clay: "Clay soil can hold nutrients but drains slowly, so avoid waterlogging after application.",
    // Sandy soil note
    Sandy: "Sandy soil leaks nutrients faster, so smaller split doses are often preferred.",
    // Black soil note
    Black: "Black soil retains moisture; check field moisture before applying any input.",
    // Alluvial soil note
    Alluvial: "Alluvial soil is generally fertile, so a soil test helps avoid over-application.",
  };

  return (
    // Fragment so the header and the two columns can be returned together
    <>
      {/* Page header block */}
      <div className="mb-6">
        {/* Title row with the module icon */}
        <div className="flex items-center gap-3">
          {/* Icon tile */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-50 text-lime-700">
            {/* Droplets icon */}
            <Droplets size={22} aria-hidden="true" />
          </span>
          {/* Page title */}
          <h1 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">
            Fertilizer Guidance
          </h1>
        </div>
        {/* Page description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Select your crop, soil type and growth stage to see general nutrient information and
          stage-wise guidance. All content on this page is static sample information.
        </p>
      </div>

      {/* Two column layout: inputs on the left, guidance on the right */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left column: selection form and nutrient basics */}
        <div className="lg:col-span-2">
          {/* Selection card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title
              title="Select Details"
              // Description
              description="Guidance updates as you change the selection."
              // Icon
              icon={Sprout}
            />

            {/* Form element wrapping the three dropdowns */}
            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              {/* Crop dropdown */}
              <Select
                // Label
                label="Crop"
                // Name
                name="crop"
                // Options
                options={FERTILIZER_CROPS}
                // Current value
                value={form.crop}
                // Change handler
                onChange={handleChange}
                // Required flag
                required
              />

              {/* Soil dropdown */}
              <Select
                // Label
                label="Soil Type"
                // Name
                name="soilType"
                // Options
                options={FERTILIZER_SOILS}
                // Current value
                value={form.soilType}
                // Change handler
                onChange={handleChange}
                // Required
                required
              />

              {/* Growth stage dropdown */}
              <Select
                // Label
                label="Growth Stage"
                // Name
                name="growthStage"
                // Options
                options={GROWTH_STAGES}
                // Current value
                value={form.growthStage}
                // Change handler
                onChange={handleChange}
                // Required
                required
                // Helper text
                hint="Choose the current stage of your crop."
              />

              {/* Reset button restoring the default selection */}
              <Button
                // Outline variant for a secondary action
                variant="outline"
                // Full width on mobile
                fullWidth
                // Restore the default values
                onClick={() => {
                  // Reset the crop to the profile value
                  setForm((current) => ({ ...current, crop: FERTILIZER_CROPS[0], growthStage: "Vegetative" }));
                  // Mark as submitted so guidance stays visible
                  setSubmitted(true);
                }}
                // Tooltip
                title="Reset selection"
              >
                {/* Reset icon */}
                <RefreshCw size={16} aria-hidden="true" />
                {/* Button label */}
                Reset Selection
              </Button>
            </form>
          </Card>

          {/* Nutrient basics card */}
          <Card className="mt-6">
            {/* Card header */}
            <CardHeader
              // Title
              title="Nutrient Information"
              // Description
              description="What N, P and K generally do for a crop."
              // Icon
              icon={FlaskConical}
            />

            {/* Nutrient list */}
            <ul className="space-y-3.5">
              {/* Map the nutrient guide entries into rows */}
              {NUTRIENT_GUIDE.map((nutrient) => (
                // Single nutrient row
                <li key={nutrient.symbol} className="flex items-start gap-3">
                  {/* Nutrient symbol tile */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-sm font-bold text-brand-700">
                    {/* Symbol text */}
                    {nutrient.symbol}
                  </span>
                  {/* Nutrient text */}
                  <div>
                    {/* Nutrient name */}
                    <p className="text-sm font-semibold text-brand-950">{nutrient.name}</p>
                    {/* Nutrient role */}
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                      {nutrient.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column: guidance output */}
        <div className="lg:col-span-3">
          {/* Guidance card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title includes the selected crop
              title={`${form.crop} · ${form.growthStage} Stage`}
              // Description mentions the selected soil
              description={`Guidance for ${form.soilType.toLowerCase()} soil (sample information).`}
              // Icon
              icon={Leaf}
              // Badge marking the content as sample data
              action={<Badge tone="amber">Sample Data</Badge>}
            />

            {/* Nutrient emphasis block */}
            <div className="rounded-2xl bg-brand-50 p-5">
              {/* Small label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Nutrient Emphasis
              </p>
              {/* Emphasis text */}
              <p className="mt-1.5 font-display text-xl font-bold text-brand-950">
                {guidance.emphasis}
              </p>
              {/* Ratio line */}
              <p className="mt-1 text-sm text-brand-800">{guidance.ratio}</p>
            </div>

            {/* Stage summary section */}
            <div className="mt-5">
              {/* Section heading */}
              <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-950">
                {/* Check icon */}
                <CheckCircle2 size={16} className="text-brand-600" aria-hidden="true" />
                Stage Guidance
              </h3>
              {/* Stage summary paragraph */}
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guidance.summary}</p>
            </div>

            {/* Application guidance section */}
            <div className="mt-5 rounded-xl border border-line bg-surface p-4">
              {/* Section label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Application Guidance
              </p>
              {/* Application text */}
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {
                  // Choose the application line that matches the selected stage
                  {
                    // Seedling guidance
                    Seedling:
                      "Apply a small starter dose in bands near the seed line and water lightly afterwards.",
                    // Vegetative guidance
                    Vegetative:
                      "Split the dose into two applications about 15-20 days apart during active growth.",
                    // Flowering guidance
                    Flowering:
                      "Apply the nutrient mix that supports flowering and irrigate immediately after.",
                    // Harvest guidance
                    Harvest:
                      "Stop applications well before harvest and follow the crop's pre-harvest interval.",
                    // Fallback text
                  }[form.growthStage]
                }
              </p>
            </div>

            {/* Soil note section */}
            <div className="mt-4 rounded-xl border border-line bg-white p-4">
              {/* Section label with an icon */}
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {/* Layers icon */}
                <Layers size={13} aria-hidden="true" />
                Soil Note
              </p>
              {/* Soil specific note text */}
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {soilNotes[form.soilType] || soilNotes.Loamy}
              </p>
            </div>

            {/* Considerations section */}
            <div className="mt-5">
              {/* Section heading */}
              <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-950">
                {/* Warning icon */}
                <AlertTriangle size={16} className="text-amber-600" aria-hidden="true" />
                Important Considerations
              </h3>
              {/* Considerations list */}
              <ul className="mt-2 space-y-2">
                {/* Static considerations for the fertilizer page */}
                {[
                  // Soil testing reminder
                  "Carry out a soil test before deciding exact quantities - this demo does not calculate doses.",
                  // Organic matter reminder
                  "Organic options such as compost or farmyard manure are commonly combined with chemical inputs.",
                  // Safety reminder
                  "Wear gloves and follow product label instructions while handling any fertilizer.",
                  // Water reminder
                  "Avoid applying nutrients before heavy rain to reduce runoff losses.",
                  // Professional advice reminder
                  "Confirm final doses with a local agriculture officer or Krishi Vigyan Kendra.",
                ].map((consideration) => (
                  // Single consideration row
                  <li key={consideration} className="flex items-start gap-2.5">
                    {/* Bullet dot */}
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {/* Consideration text */}
                    <span className="text-sm leading-relaxed text-ink-soft">{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Academic disclaimer */}
          <Disclaimer
            // Notice text
            text="Academic/demo disclaimer: the nutrient information and guidance on this page are generic sample content written for this project. It is not a fertilizer recommendation. Always follow a soil test report and official guidance."
            // Warning tone
            tone="amber"
            // Spacing above
            className="mt-6"
          />

          {/* Hint shown before the user changes anything */}
          {!submitted ? (
            // Small hint paragraph
            <p className="mt-4 text-center text-xs text-ink-muted">
              Change the crop, soil or growth stage above to update the guidance instantly.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
