// Import React hooks for state and data loading
import { useState, useEffect } from "react";
// Import the lucide icons used on this page
import { Landmark, Search, SlidersHorizontal, CheckCircle2, Users, FileText } from "lucide-react";
// Import the reusable components
import Card, { CardHeader } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Disclaimer from "../components/Disclaimer";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
// Import the mock schemes service and data
import { fetchSchemes, fetchCategories } from "../services/schemesService";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";
// Import the cn helper for conditional classes
import { cn } from "../utils/cn";

// Badge tone mapping for each scheme category
const CATEGORY_TONES = {
  // Central schemes use the brand green tone
  Central: "brand",
  // State schemes use the neutral tone
  State: "neutral",
  // Agriculture schemes use the sky tone
  Agriculture: "sky",
  // Farmer support schemes use the amber tone
  "Farmer Support": "amber",
};

/**
 * Schemes - searchable government scheme directory.
 * All records are sample data. The page supports text search and category
 * filtering, and shows full details inside a modal.
 */
export default function Schemes() {
  // Set the browser tab title for this page
  useDocumentTitle("Government Schemes");

  // Text typed into the search box
  const [search, setSearch] = useState("");
  // Selected category filter
  const [category, setCategory] = useState("All");
  // Filtered scheme list returned by the mock service
  const [schemes, setSchemes] = useState([]);
  // Loading flag shown while the mock request resolves
  const [loading, setLoading] = useState(true);
  // Scheme record currently displayed inside the modal
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Load the schemes whenever the search text or the category changes
  useEffect(() => {
    // Track whether this effect run is still valid
    let active = true;

    /** Loads the filtered scheme list from the mock service */
    const load = async () => {
      // Show the loading state before the request
      setLoading(true);
      // Request the filtered list
      const data = await fetchSchemes(search, category);
      // Ignore the result if the filters changed while loading
      if (!active) return;
      // Store the filtered list
      setSchemes(data);
      // Hide the loading state
      setLoading(false);
    };

    // Run the loader
    load();
    // Mark the effect as inactive when the dependencies change again
    return () => {
      active = false;
    };
    // Re-run on search or category changes
  }, [search, category]);

  return (
    // Fragment so the header, filters, list and modal can be returned together
    <>
      {/* Page header built with the reusable PageHeader component */}
      <PageHeader
        // Small label above the title
        eyebrow="Farmer Support"
        // Page title
        title="Government Schemes"
        // Page description
        description="Browse sample scheme records for farmers with eligibility and benefit summaries. Use the search box or the category filters to narrow the list."
        // Module icon rendered next to the title
        icon={Landmark}
      />

      {/* Filter card with the search input and category chips */}
      <Card className="mb-6">
        {/* Card header */}
        <CardHeader
          // Title
          title="Search Schemes"
          // Description
          description="Search by scheme name, ministry or keyword."
          // Icon
          icon={SlidersHorizontal}
        />

        {/* Search input with an inline icon */}
        <div className="relative">
          {/* Search icon positioned inside the field */}
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          {/* Accessible label hidden visually but available to screen readers */}
          <label htmlFor="scheme-search" className="sr-only">
            Search schemes
          </label>
          {/* Search input bound to the search state */}
          <input
            // Field id matching the label
            id="scheme-search"
            // Search input type
            type="search"
            // Current value
            value={search}
            // Update the search state on every keystroke
            onChange={(event) => setSearch(event.target.value)}
            // Placeholder text
            placeholder="e.g. insurance, soil, credit"
            // Input styling
            className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {/* Category filter chips */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {/* Map every category into a filter chip */}
          {fetchCategories().map((option) => (
            // Single chip button
            <button
              // Unique key per category
              key={option}
              // Avoid form submission behaviour
              type="button"
              // Update the selected category
              onClick={() => setCategory(option)}
              // ARIA state that reflects the selected chip
              aria-pressed={category === option}
              // Tooltip text
              title={`Show ${option} schemes`}
              // Conditional classes for the active and inactive states
              className={cn(
                // Shared chip styling
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                category === option
                  ? // Active chip: filled green
                    "border-brand-600 bg-brand-600 text-white"
                  : // Inactive chip: white with a hover state
                    "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-800"
              )}
            >
              {/* Chip label */}
              {option}
            </button>
          ))}
        </div>

        {/* Sample data disclaimer */}
        <Disclaimer
          // Notice text
          text="Sample data: these records are simplified examples written for this academic project. They are not live or verified government information. Always confirm details from official government sources."
          // Warning tone
          tone="amber"
          // Spacing above
          className="mt-4"
        />
      </Card>

      {/* Result count line */}
      <p className="mb-4 text-sm text-ink-muted">
        {/* Show the number of records and the active filter */}
        Showing <span className="font-semibold text-brand-800">{schemes.length}</span> sample record
        {schemes.length === 1 ? "" : "s"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      {/* Loading state, empty state or the scheme grid */}
      {loading ? (
        // Skeleton shown while the mock request resolves
        <Card>
          {/* Loading indicator with three rows */}
          <LoadingState label="Loading sample schemes…" rows={3} />
        </Card>
      ) : schemes.length === 0 ? (
        // Empty state when no record matches the search
        <EmptyState
          // Icon
          icon={Search}
          // Title
          title="No schemes found"
          // Description
          description="No sample record matches your search. Try a different keyword or switch the category filter back to All."
          // Action label
          actionLabel="Clear filters"
          // Action resets the search text and the category
          onAction={() => {
            // Clear the search text
            setSearch("");
            // Reset the category filter
            setCategory("All");
          }}
        />
      ) : (
        // Responsive grid of scheme cards
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Map every scheme into a card */}
          {schemes.map((scheme) => (
            // Single scheme card
            <Card key={scheme.id} className="flex flex-col">
              {/* Top row: category badge and sample label */}
              <div className="flex items-start justify-between gap-2">
                {/* Category badge */}
                <Badge tone={CATEGORY_TONES[scheme.category] || "brand"}>
                  {scheme.category}
                </Badge>
                {/* Sample data label */}
                <span className="text-[11px] font-medium text-ink-muted">{scheme.updated}</span>
              </div>

              {/* Scheme title */}
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-brand-950">
                {scheme.title}
              </h3>

              {/* Authority line */}
              <p className="mt-1 text-xs font-medium text-ink-muted">{scheme.authority}</p>

              {/* Scheme summary */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {scheme.summary}
              </p>

              {/* Benefits preview list */}
              <ul className="mt-4 space-y-1.5">
                {/* Show only the first two benefits on the card */}
                {scheme.benefits.slice(0, 2).map((benefit) => (
                  // Single benefit row
                  <li key={benefit} className="flex items-start gap-2">
                    {/* Check icon */}
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    {/* Benefit text */}
                    <span className="text-xs leading-relaxed text-ink-muted">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Actions row */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {/* View details button opens the modal */}
                <Button
                  // Small size for the card action
                  size="sm"
                  // Open the modal with this scheme
                  onClick={() => setSelectedScheme(scheme)}
                  // Tooltip with the scheme name
                  title={`View details of ${scheme.title}`}
                >
                  {/* Button label */}
                  View Details
                </Button>
                {/* Apply mode text on the right */}
                <span className="text-[11px] text-ink-muted">{scheme.applyMode}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Details modal for the selected scheme */}
      <Modal
        // Open state controlled by the selected scheme
        open={Boolean(selectedScheme)}
        // Clear the selection when the modal closes
        onClose={() => setSelectedScheme(null)}
        // Modal title
        title={selectedScheme?.title || ""}
        // Footer action
        footer={
          // Close button inside the modal footer
          <Button
            // Full width on mobile
            fullWidth
            // Outline style for a dismiss action
            variant="outline"
            // Close the modal
            onClick={() => setSelectedScheme(null)}
          >
            {/* Button label */}
            Close
          </Button>
        }
      >
        {/* Render the modal body only when a scheme is selected */}
        {selectedScheme ? (
          // Fragment holding the modal sections
          <>
            {/* Meta badges */}
            <div className="flex flex-wrap gap-2">
              {/* Category badge */}
              <Badge tone={CATEGORY_TONES[selectedScheme.category] || "brand"}>
                {selectedScheme.category}
              </Badge>
              {/* Authority badge */}
              <Badge tone="neutral">{selectedScheme.authority}</Badge>
              {/* Sample badge */}
              <Badge tone="amber">Sample Record</Badge>
            </div>

            {/* Summary paragraph */}
            <p className="mt-4">{selectedScheme.summary}</p>

            {/* Benefits section */}
            <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-950">
              {/* Check icon */}
              <CheckCircle2 size={15} className="text-brand-600" aria-hidden="true" />
              Benefits
            </h4>
            {/* Benefits list */}
            <ul className="mt-2 space-y-1.5">
              {/* Map every benefit into a bullet */}
              {selectedScheme.benefits.map((benefit) => (
                // Single benefit row
                <li key={benefit} className="flex items-start gap-2">
                  {/* Bullet dot */}
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {/* Benefit text */}
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Eligibility section */}
            <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-950">
              {/* Users icon */}
              <Users size={15} className="text-sky-deep" aria-hidden="true" />
              Eligibility
            </h4>
            {/* Eligibility list */}
            <ul className="mt-2 space-y-1.5">
              {/* Map every eligibility point into a bullet */}
              {selectedScheme.eligibility.map((item) => (
                // Single eligibility row
                <li key={item} className="flex items-start gap-2">
                  {/* Bullet dot */}
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-deep" />
                  {/* Eligibility text */}
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Application mode row */}
            <div className="mt-5 rounded-xl border border-line bg-surface p-3.5">
              {/* Section label */}
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {/* File text icon */}
                <FileText size={13} aria-hidden="true" />
                How to apply (sample)
              </p>
              {/* Application text */}
              <p className="mt-1.5 text-sm text-ink-soft">{selectedScheme.applyMode}</p>
            </div>

            {/* Modal disclaimer */}
            <Disclaimer
              // Notice text
              text="This is a sample record created for academic demonstration. Scheme rules, benefits and eligibility change over time - always verify with official government sources before applying."
              // Spacing above
              className="mt-4"
            />
          </>
        ) : null}
      </Modal>
    </>
  );
}
