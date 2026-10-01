// Import the Outlet component so the matched auth page renders here
import { Outlet } from "react-router-dom";
// Import the Link component for the back-to-home link
import { Link } from "react-router-dom";
// Import the lucide icons used in the side panel
import { CloudSun, Sprout, ShieldCheck, ArrowLeft } from "lucide-react";
// Import the brand logo component
import Logo from "../components/Logo";

// Highlights listed on the dark side panel of the auth screens
const HIGHLIGHTS = [
  {
    // Icon component for the highlight
    icon: CloudSun,
    // Highlight title
    title: "Weather information",
    // Highlight description
    description: "Sample current conditions and a five day forecast view",
  },
  {
    icon: Sprout,
    title: "Crop & fertilizer guidance",
    description: "Rule based demo suggestions from your farm details",
  },
  {
    icon: ShieldCheck,
    title: "Demo mode",
    description: "No real account is created and no data leaves your browser",
  },
];

/**
 * AuthLayout - split screen shell shared by the Login and Register pages.
 * The left panel carries the brand story while the right panel renders the
 * form through the router Outlet.
 */
export default function AuthLayout() {
  return (
    // Full height grid that stacks on mobile and splits in two on large screens
    <div className="grid min-h-screen bg-surface lg:grid-cols-2">
      {/* Left brand panel: hidden on mobile, dark green on desktop */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-950 p-10 lg:flex">
        {/* Decorative dot pattern overlay */}
        <div className="field-pattern pointer-events-none absolute inset-0 opacity-60" />

        {/* Brand block at the top of the panel */}
        <div className="relative">
          {/* Logo in the light variant for the dark background */}
          <Logo variant="dark" size="lg" />
          {/* Product tagline */}
          <p className="mt-4 text-sm font-medium text-brand-300">Smarter Farming. Better Decisions.</p>
        </div>

        {/* Marketing copy and highlights */}
        <div className="relative max-w-md">
          {/* Panel heading */}
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
            Your farming assistant, organised in one place.
          </h2>
          {/* Panel description */}
          <p className="mt-3 text-sm leading-relaxed text-brand-200/80">
            KhetiGPT is an academic mini project that explores how an AI assisted interface can
            bring agricultural information and weather insights together for farmers.
          </p>

          {/* List of product highlights */}
          <ul className="mt-8 space-y-4">
            {/* Map each highlight into a row */}
            {HIGHLIGHTS.map((highlight) => (
              // Single highlight row
              <li key={highlight.title} className="flex items-start gap-3">
                {/* Icon tile with a translucent white background */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-200">
                  {/* Highlight icon */}
                  <highlight.icon size={20} aria-hidden="true" />
                </span>
                {/* Highlight text */}
                <div>
                  {/* Highlight title */}
                  <p className="text-sm font-semibold text-white">{highlight.title}</p>
                  {/* Highlight description */}
                  <p className="mt-0.5 text-xs leading-relaxed text-brand-200/70">
                    {highlight.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer note at the bottom of the panel */}
        <p className="relative text-xs text-brand-300/70">
          © {new Date().getFullYear()} KhetiGPT · Academic Mini Project
        </p>
      </aside>

      {/* Right form panel */}
      <main className="flex items-center justify-center px-4 py-10 sm:px-6">
        {/* Inner column that constrains the form width */}
        <div className="w-full max-w-md">
          {/* Mobile brand block (the side panel is hidden on small screens) */}
          <div className="mb-8 flex flex-col items-start gap-3 lg:hidden">
            {/* Brand logo */}
            <Logo />
            {/* Small tagline under the logo */}
            <p className="text-sm text-ink-muted">Smarter Farming. Better Decisions.</p>
          </div>

          {/* Card that contains the routed login/register form */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            {/* Outlet renders either Login or Register */}
            <Outlet />
          </div>

          {/* Back to home link under the card */}
          <Link
            // Route back to the landing page
            to="/"
            // Inline link styling with the arrow icon
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-brand-700"
          >
            {/* Back arrow icon */}
            <ArrowLeft size={16} aria-hidden="true" />
            {/* Link label */}
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
