// Import the Link component for the navigation links
import { Link } from "react-router-dom";
// Import the lucide icons used on this page
import { Sprout, ArrowLeft, LayoutDashboard } from "lucide-react";
// Import the reusable Button component
import Button from "../components/Button";
// Import the Logo component for the brand mark
import Logo from "../components/Logo";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/**
 * NotFound - friendly 404 screen shown for unknown routes.
 * Prevents blank screens and always offers a way back into the app.
 */
export default function NotFound() {
  // Set the browser tab title for this page
  useDocumentTitle("Page Not Found");

  return (
    // Full height centred layout on the neutral page background
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      {/* Narrow card that holds the message */}
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-card sm:p-8">
        {/* Brand mark at the top */}
        <div className="flex justify-center">
          {/* Logo rendered in the default light variant */}
          <Logo />
        </div>

        {/* Decorative sprout icon */}
        <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          {/* Sprout icon */}
          <Sprout size={26} aria-hidden="true" />
        </span>

        {/* Error code */}
        <p className="mt-5 font-display text-4xl font-extrabold text-brand-600">404</p>

        {/* Heading */}
        <h1 className="mt-2 font-display text-xl font-bold text-brand-950">Page not found</h1>

        {/* Explanation */}
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          The page you are looking for does not exist in this prototype. Use one of the options
          below to continue.
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          {/* Back to home button */}
          <Button to="/" title="Go back to the landing page">
            {/* Arrow icon */}
            <ArrowLeft size={16} aria-hidden="true" />
            {/* Button label */}
            Back to Home
          </Button>
          {/* Dashboard shortcut */}
          <Button to="/dashboard" variant="outline" title="Open the dashboard">
            {/* Dashboard icon */}
            <LayoutDashboard size={16} aria-hidden="true" />
            {/* Button label */}
            Go to Dashboard
          </Button>
        </div>

        {/* Small helper text with inline links */}
        <p className="mt-5 text-xs text-ink-muted">
          {/* Landing page link */}
          <Link to="/" className="font-semibold text-brand-700 hover:text-brand-800">
            Home
          </Link>
          {" · "}
          {/* Login link */}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
            Login
          </Link>
          {" · "}
          {/* Registration link */}
          <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
