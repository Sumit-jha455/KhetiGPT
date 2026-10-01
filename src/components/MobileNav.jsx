// Import the NavLink component for active link styling
import { NavLink } from "react-router-dom";
// Import the lucide close icon for the services sheet
import { X } from "lucide-react";
// Import the mobile navigation items and the full dashboard navigation
import { MOBILE_NAV, DASHBOARD_NAV } from "../data/navigation";

/**
 * MobileNav - the bottom navigation bar shown on small screens.
 * The first four modules are direct links and "Services" opens a bottom
 * sheet that lists every module of the application.
 */
export default function MobileNav() {
  return (
    // Empty fragment so the bar and the sheet can be rendered together
    <>
      {/* Fixed bottom navigation bar (mobile only) */}
      <nav
        // ARIA landmark for the primary navigation
        aria-label="Mobile navigation"
        // Fixed positioning with safe-area padding for notched devices
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {/* Flex row that shares the width equally between the five items */}
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {/* Map every mobile navigation item to a link or a sheet trigger */}
          {MOBILE_NAV.map((item) =>
            // Items with a route render as NavLinks
            item.to ? (
              // NavLink knows whether the route is currently active
              <NavLink
                // Destination route
                to={item.to}
                // Unique key per item
                key={item.label}
                // Tooltip text for the item
                title={item.label}
                // Active state drives the colour of the icon and label
                className={({ isActive }) =>
                  // Merge the shared and state specific classes
                  [
                    // Shared: column layout, padding and transition
                    "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                    // Active: green text, inactive: muted text
                    isActive ? "text-brand-700" : "text-ink-muted",
                  ].join(" ")
                }
              >
                {/* Icon component from the navigation data */}
                <item.icon size={20} aria-hidden="true" />
                {/* Short label under the icon */}
                {item.label}
              </NavLink>
            ) : (
              // Items without a route open the services bottom sheet
              <button
                // Prevent form submission behaviour
                type="button"
                // Unique key for the services button
                key={item.label}
                // Open the services sheet using the id based anchor
                onClick={() => document.getElementById("services-sheet")?.showModal()}
                // Accessible label
                aria-label="Browse all services"
                // Muted styling consistent with inactive navigation items
                className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-ink-muted transition-colors hover:text-brand-700"
              >
                {/* Services icon */}
                <item.icon size={20} aria-hidden="true" />
                {/* Label */}
                {item.label}
              </button>
            )
          )}
        </div>
      </nav>

      {/* Native <dialog> element used as the mobile services bottom sheet */}
      <dialog
        // Id used by the "Services" button to open the dialog
        id="services-sheet"
        // Native dialog styling: bottom aligned with rounded top corners
        className="m-0 mt-auto w-full max-w-lg bg-transparent p-0 backdrop:bg-brand-950/50 lg:hidden"
      >
        {/* Sheet panel */}
        <div className="rounded-t-3xl bg-white p-5 pb-8">
          {/* Sheet header with title and close button */}
          <div className="mb-4 flex items-center justify-between">
            {/* Sheet title */}
            <h2 className="text-base font-bold text-brand-950">All Services</h2>
            {/* Close button that closes the native dialog */}
            <button
              // Prevent form submission behaviour
              type="button"
              // Close the dialog by finding its close method
              onClick={() => document.getElementById("services-sheet")?.close()}
              // Accessible label
              aria-label="Close services list"
              // Circular icon button styling
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted"
            >
              {/* Close icon */}
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Grid of module links inside the sheet */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Map every dashboard module to a link */}
            {DASHBOARD_NAV.map((item) => (
              // NavLink closes the sheet through its onClick handler
              <NavLink
                // Destination route
                to={item.to}
                // Unique key
                key={item.to}
                // Close the sheet after the navigation starts
                onClick={() => document.getElementById("services-sheet")?.close()}
                // Card-like tile styling
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-800"
              >
                {/* Module icon */}
                <item.icon size={18} aria-hidden="true" />
                {/* Module label */}
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
