// Import the lucide icons used across the landing page sections
import {
  MessageSquareText,
  CloudSun,
  Sprout,
  Droplets,
  Landmark,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Bot,
} from "lucide-react";
// Import the reusable Button component for the hero and CTA actions
import Button from "../components/Button";
// Import the ServiceCard component used by the features grid
import ServiceCard from "../components/ServiceCard";
// Import the Badge component for small labels
import Badge from "../components/Badge";
// Import the page title hook so the browser tab reflects the page
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// The six feature cards displayed in the Features section
const FEATURES = [
  {
    // Icon component for the card
    icon: MessageSquareText,
    // Feature title
    title: "AI Farming Assistant",
    // Short description of the feature
    description:
      "Ask farming related questions in a chat interface and receive guidance from a demo response engine.",
  },
  {
    icon: CloudSun,
    title: "Weather Information",
    description:
      "View current temperature, humidity, wind speed, rain probability and a five day sample forecast.",
  },
  {
    icon: Sprout,
    title: "Crop Recommendation",
    description:
      "Enter your season, soil type, water availability and farm size to receive a demo crop suggestion.",
  },
  {
    icon: Droplets,
    title: "Fertilizer Guidance",
    description:
      "Explore general nutrient information and stage-wise guidance for the crop you select.",
  },
  {
    icon: Landmark,
    title: "Government Schemes",
    description:
      "Browse a searchable directory of sample scheme records with eligibility and benefit summaries.",
  },
  {
    icon: LayoutDashboard,
    title: "Farmer Dashboard",
    description:
      "See your farm overview, quick services, weather summary and current crop in a single view.",
  },
];

// The four steps of the "How It Works" section
const STEPS = [
  {
    // Step number displayed as "01"
    number: "01",
    // Step title
    title: "Create Profile",
    // Step description
    description: "Register with your name, email, location and preferred language.",
  },
  {
    number: "02",
    title: "Enter Farm Information",
    description: "Add your farm size, soil type, current crop and water availability.",
  },
  {
    number: "03",
    title: "Select Service",
    description: "Open the assistant, weather, crop, fertilizer or schemes module.",
  },
  {
    number: "04",
    title: "Get Assistance",
    description: "Read the generated demo guidance and review the notes provided.",
  },
];

// The reasons listed in the "Why KhetiGPT" section
const WHY_POINTS = [
  // Reason title and description pairs
  {
    title: "Centralised agricultural assistance",
    description:
      "Farmers usually check separate apps for weather, crop guidance and scheme information. KhetiGPT organises these services in one interface.",
  },
  {
    title: "Simple, accessible interface",
    description:
      "Large labels, clear icons and a responsive layout keep the app usable on low cost phones as well as desktops.",
  },
  {
    title: "AI-assisted interaction",
    description:
      "A conversational assistant screen lets users ask questions in natural language instead of searching through menus.",
  },
  {
    title: "Weather information in context",
    description:
      "Weather details sit next to farm information so decisions can be reviewed with the conditions in view.",
  },
  {
    title: "Guidance focused on farmer inputs",
    description:
      "Crop and fertilizer screens respond to the details a farmer provides, such as soil type, season and growth stage.",
  },
  {
    title: "Modular architecture",
    description:
      "The frontend is split into pages, services, data and context modules so backend integration can be added step by step.",
  },
];

/**
 * Landing - the public marketing page of KhetiGPT.
 * Contains hero, features, how it works, why KhetiGPT and the CTA section.
 */
export default function Landing() {
  // Set the browser tab title for this page
  useDocumentTitle("Smarter Farming. Better Decisions.");

  return (
    // Fragment so multiple top level sections can be returned
    <>
      {/* ================= HERO SECTION ================= */}
      {/* id="home" is the scroll target of the "Home" navbar link */}
      <section id="home" className="relative overflow-hidden">
        {/* Decorative dot pattern in the hero background */}
        <div className="field-pattern pointer-events-none absolute inset-0 opacity-70" />
        {/* Soft green glow in the top-right corner */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl" />

        {/* Container that limits the content width */}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Grid that stacks on mobile and splits 50/50 on large screens */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left column: headline, description and actions */}
            <div>
              {/* Small label above the headline */}
              <Badge tone="brand">AI-Powered Farming Assistant</Badge>

              {/* Main hero heading */}
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
                {/* First line of the heading */}
                Smarter Farming.
                {/* Second line in the primary green */}
                <span className="block text-brand-600">Better Decisions.</span>
              </h1>

              {/* Hero description paragraph */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                KhetiGPT is an AI-powered personal farming assistant designed to bring agricultural
                information, weather insights and farming guidance together in one simple platform.
              </p>

              {/* Hero action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Primary action: go to registration */}
                <Button to="/register" size="lg" title="Create a demo account">
                  {/* Button label */}
                  Get Started
                  {/* Arrow icon */}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                {/* Secondary action: scroll to the features section */}
                <Button
                  // Outline variant keeps it visually secondary
                  variant="outline"
                  // Same size as the primary button
                  size="lg"
                  // Scroll to the features block below
                  onClick={() =>
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                  }
                  // Tooltip text
                  title="See the list of features"
                >
                  {/* Button label */}
                  Explore Features
                </Button>
              </div>

              {/* Small trust line clarifying the project status */}
              <p className="mt-6 text-xs text-ink-muted">
                Academic mini project prototype · Currently running with sample data
              </p>
            </div>

            {/* Right column: CSS/SVG product visual (no external image required) */}
            <div className="relative">
              {/* Main visual card that mimics the app dashboard */}
              <div className="relative rounded-3xl border border-line bg-white p-5 shadow-lift">
                {/* Visual header row with the mock brand and a status pill */}
                <div className="flex items-center justify-between border-b border-line pb-4">
                  {/* Mock window title */}
                  <p className="font-display text-sm font-bold text-brand-950">Farm Overview</p>
                  {/* Sample data pill */}
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                    Sample
                  </span>
                </div>

                {/* Mock farm detail tiles */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Farm size tile */}
                  <div className="rounded-xl bg-surface p-3.5">
                    {/* Tile label */}
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                      Farm Size
                    </p>
                    {/* Tile value */}
                    <p className="mt-1 font-display text-lg font-bold text-brand-950">2.5 acres</p>
                  </div>
                  {/* Soil type tile */}
                  <div className="rounded-xl bg-surface p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                      Soil Type
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-brand-950">Loamy</p>
                  </div>
                  {/* Current crop tile */}
                  <div className="rounded-xl bg-surface p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                      Current Crop
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-brand-950">Tomato</p>
                  </div>
                  {/* Water availability tile */}
                  <div className="rounded-xl bg-surface p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                      Water
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-brand-950">Medium</p>
                  </div>
                </div>

                {/* Mock weather row inside the visual */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-white p-3.5">
                  {/* Left side: icon and condition */}
                  <div className="flex items-center gap-3">
                    {/* Weather icon */}
                    <Cloud size={22} className="text-sky-deep" aria-hidden="true" />
                    {/* Condition label */}
                    <div>
                      <p className="text-sm font-semibold text-brand-950">Partly Cloudy</p>
                      <p className="text-[11px] text-ink-muted">Nashik, Maharashtra</p>
                    </div>
                  </div>
                  {/* Right side: temperature */}
                  <p className="font-display text-xl font-bold text-brand-950">28°C</p>
                </div>

                {/* Mock assistant message inside the visual */}
                <div className="mt-3 flex items-start gap-3 rounded-xl bg-brand-950 p-3.5">
                  {/* Assistant icon tile */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-200">
                    {/* Bot icon */}
                    <Bot size={16} aria-hidden="true" />
                  </span>
                  {/* Mock reply text */}
                  <p className="text-xs leading-relaxed text-brand-100">
                    For loamy soil in the Rabi season, the sample dataset lists wheat, chickpea and
                    tomato as options.
                  </p>
                </div>
              </div>

              {/* Floating accent card behind the main visual (decorative) */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-line bg-white p-3.5 shadow-lift sm:block">
                {/* Small accent row showing a crop recommendation */}
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                  Demo Recommendation
                </p>
                {/* Accent value */}
                <p className="mt-1 font-display text-sm font-bold text-brand-700">
                  Chickpea · Rabi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      {/* id="features" is the scroll target of the "Features" navbar link */}
      <section id="features" className="scroll-mt-20 bg-white py-16 sm:py-20">
        {/* Container that limits the content width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading block */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Small label above the heading */}
            <Badge tone="brand">Features</Badge>
            {/* Section heading */}
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              Everything a farmer needs, in one assistant
            </h2>
            {/* Section description */}
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Six core modules that cover information access, weather awareness and guidance
              support for everyday farming questions.
            </p>
          </div>

          {/* Responsive grid of feature cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Map the feature list into ServiceCard components */}
            {FEATURES.map((feature) => (
              // ServiceCard renders the icon, title, description and an "Open" hint
              <ServiceCard
                // Unique key per feature
                key={feature.title}
                // All feature cards link to the registration page on the landing
                to="/register"
                // Icon component
                icon={feature.icon}
                // Feature title
                title={feature.title}
                // Feature description
                description={feature.description}
                // Alternate tones are not used here to keep the section uniform
                tone="brand"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      {/* id="how-it-works" is the scroll target of the "How It Works" navbar link */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-20">
        {/* Container that limits the content width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading block */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Small label above the heading */}
            <Badge tone="brand">How It Works</Badge>
            {/* Section heading */}
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              Four simple steps
            </h2>
            {/* Section description */}
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              From creating a profile to receiving assistance, the flow is designed to be short and
              easy to follow.
            </p>
          </div>

          {/* Steps grid: one column on mobile, four columns on large screens */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Map the steps into numbered cards */}
            {STEPS.map((step) => (
              // Single step card
              <div
                // Unique key per step
                key={step.number}
                // Card styling with a subtle top border accent
                className="relative rounded-2xl border border-line bg-white p-5 shadow-card"
              >
                {/* Large step number in a light green tone */}
                <p className="font-display text-3xl font-extrabold text-brand-200">
                  {step.number}
                </p>
                {/* Step title */}
                <h3 className="mt-2 text-base font-semibold text-brand-950">{step.title}</h3>
                {/* Step description */}
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY KHETIGPT SECTION ================= */}
      <section className="bg-brand-950 py-16 sm:py-20">
        {/* Container that limits the content width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading block (light text on the dark background) */}
          <div className="mx-auto max-w-2xl text-center">
            {/* Label above the heading */}
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
              Why KhetiGPT
            </p>
            {/* Section heading */}
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Built for clarity, not complexity
            </h2>
            {/* Section description */}
            <p className="mt-3 text-base leading-relaxed text-brand-200/80">
              KhetiGPT focuses on organising information and simplifying access to agricultural
              services.
            </p>
          </div>

          {/* Grid of reasons */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Map every reason into a translucent card */}
            {WHY_POINTS.map((point) => (
              // Single reason card
              <div
                // Unique key per reason
                key={point.title}
                // Translucent white card on the dark background
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                {/* Check icon marking the reason */}
                <CheckCircle2 size={20} className="text-brand-300" aria-hidden="true" />
                {/* Reason title */}
                <h3 className="mt-3 text-base font-semibold text-white">{point.title}</h3>
                {/* Reason description */}
                <p className="mt-1.5 text-sm leading-relaxed text-brand-200/80">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 sm:py-20">
        {/* Container that limits the content width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* CTA card with a white surface and green accent border */}
          <div className="rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-card sm:p-12">
            {/* CTA heading */}
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold tracking-tight text-brand-950 sm:text-3xl">
              Ready to explore smarter farming assistance?
            </h2>
            {/* CTA description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              Create a demo profile and try the assistant, weather, crop recommendation, fertilizer
              and scheme modules.
            </p>
            {/* CTA button */}
            <div className="mt-7 flex justify-center">
              {/* Primary action navigates to the registration page */}
              <Button to="/register" size="lg" title="Create a demo account">
                {/* Button label */}
                Get Started
                {/* Arrow icon */}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
            {/* Small note that no real account is created */}
            <p className="mt-4 text-xs text-ink-muted">
              Demo mode · No real account is created and no data is sent to a server
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
