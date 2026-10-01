// Import the global app context hook
import { useApp } from "../context/AppContext";
// Import reusable UI pieces used by the gate screen
import Button from "./Button";
import Logo from "./Logo";
// Import the info icon for the notice text
import { Info } from "lucide-react";

/**
 * ProtectedRoute - keeps the app modules behind the demo session.
 * Instead of a hard redirect it shows a friendly gate screen with a one
 * click "continue as demo farmer" option, so evaluators are never blocked.
 */
export default function ProtectedRoute({ children }) {
  // Read the demo session flag and the demo login helper from context
  const { isAuthenticated, loginDemo } = useApp();

  // When a session exists, render the requested layout/page
  if (isAuthenticated) {
    // children is the dashboard layout containing an <Outlet />
    return children;
  }

  // Otherwise show the demo session gate screen
  return (
    // Full height centred layout on the neutral page background
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      {/* Narrow card that holds the message */}
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
        {/* Brand mark at the top of the card */}
        <Logo size="lg" />

        {/* Heading explaining what happened */}
        <h1 className="mt-6 text-xl font-bold text-brand-950">Demo session not started</h1>

        {/* Explanation paragraph */}
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          This module is part of the KhetiGPT app area. Start a demo session from the login or
          registration page, or continue instantly with the sample farmer profile.
        </p>

        {/* Notice that no real authentication is involved */}
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-soft px-3.5 py-2.5 text-xs leading-relaxed text-sky-deep">
          {/* Info icon */}
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          {/* Notice text */}
          <span>
            Demo mode only: no password is required and no data is sent to a server. Real
            authentication is planned for a later project phase.
          </span>
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          {/* Primary action: enter the app with the demo farmer profile */}
          <Button fullWidth onClick={() => loginDemo()}>
            {/* Button label */}
            Continue as demo farmer
          </Button>
          {/* Secondary action: go to the login page */}
          <Button fullWidth variant="outline" to="/login">
            {/* Button label */}
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );

  // (Unreachable) Outlet keeps the component valid if used without children
  void Outlet;
}
