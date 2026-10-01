// Import the Link component for internal footer navigation
import { Link } from "react-router-dom";
// Import the brand logo component
import Logo from "./Logo";

/**
 * Footer - the footer of the public landing page.
 * Includes the brand block, quick links and an academic project note.
 */
export default function Footer() {
  return (
    // Dark green footer with white text
    <footer className="bg-brand-950 text-brand-100">
      {/* Container that limits the width and adds padding */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Grid that stacks on mobile and splits into columns on desktop */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand column */}
          <div>
            {/* Dark variant of the logo for the dark background */}
            <Logo variant="dark" />
            {/* Short product description */}
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200/80">
              AI-Powered Personal Farming Assistant. KhetiGPT brings agricultural information,
              weather insights and farming guidance together in one simple platform.
            </p>
          </div>

          {/* Quick links column */}
          <div>
            {/* Column heading */}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            {/* Vertical list of links */}
            <ul className="mt-4 space-y-2.5 text-sm">
              {/* Home link */}
              <li>
                <Link to="/" className="text-brand-200/80 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {/* Login link */}
              <li>
                <Link to="/login" className="text-brand-200/80 transition-colors hover:text-white">
                  Login
                </Link>
              </li>
              {/* Registration link */}
              <li>
                <Link
                  to="/register"
                  className="text-brand-200/80 transition-colors hover:text-white"
                >
                  Create Account
                </Link>
              </li>
              {/* Dashboard link */}
              <li>
                <Link
                  to="/dashboard"
                  className="text-brand-200/80 transition-colors hover:text-white"
                >
                  Farmer Dashboard
                </Link>
              </li>
              {/* Schemes link */}
              <li>
                <Link
                  to="/schemes"
                  className="text-brand-200/80 transition-colors hover:text-white"
                >
                  Government Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* Features + project note column */}
          <div>
            {/* Column heading */}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Features
            </h3>
            {/* List of the main modules */}
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200/80">
              {/* Feature item */}
              <li>AI Farming Assistant</li>
              {/* Feature item */}
              <li>Weather Information</li>
              {/* Feature item */}
              <li>Crop Recommendation</li>
              {/* Feature item */}
              <li>Fertilizer Guidance</li>
              {/* Feature item */}
              <li>Government Schemes</li>
            </ul>

            {/* Academic project note */}
            <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-xs leading-relaxed text-brand-200/70">
              Academic project note: KhetiGPT is a mini project prototype. All data shown in the
              application is sample data created for demonstration purposes.
            </p>
          </div>
        </div>

        {/* Bottom bar with the copyright statement */}
        <div className="mt-10 border-t border-white/10 pt-6">
          {/* Copyright line */}
          <p className="text-center text-xs text-brand-200/70">
            © {new Date().getFullYear()} KhetiGPT · Academic Mini Project · Smarter Farming.
            Better Decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
