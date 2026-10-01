// Import the NavLink component so active links can be styled automatically
import { NavLink, useNavigate } from "react-router-dom";
// Import the lucide icon used for the logout action
import { LogOut } from "lucide-react";
// Import the logo component for the sidebar brand block
import Logo from "./Logo";
// Import the navigation items and sample notifications data
import { DASHBOARD_NAV } from "../data/navigation";
// Import the global app context hook
import { useApp } from "../context/AppContext";
// Import the Badge component for the demo mode label
import Badge from "./Badge";

/**
 * Sidebar - the fixed desktop navigation of the application area.
 * It is hidden below the lg breakpoint where the mobile bottom bar takes over.
 */
export default function Sidebar() {
  // Get the demo user, logout action and router navigate function
  const { user, logout } = useApp();
  // useNavigate lets the sidebar redirect after ending the demo session
  const navigate = useNavigate();

  /** handleLogout ends the demo session and returns to the landing page */
  const handleLogout = () => {
    // Clear the demo session flag
    logout();
    // Send the user back to the public landing page
    navigate("/");
  };

  return (
    // Fixed sidebar column with the dark green brand background
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-brand-900/40 bg-brand-950 lg:flex">
      {/* Brand block at the top of the sidebar */}
      <div className="flex h-16 items-center px-5">
        {/* Dark variant of the logo for the dark background */}
        <Logo variant="dark" />
      </div>

      {/* Scrollable navigation area */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4" aria-label="App navigation">
        {/* Small section label above the menu */}
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-300/70">
          Modules
        </p>

        {/* Map every navigation item to a NavLink */}
        {DASHBOARD_NAV.map((item) => (
          // NavLink knows whether the current URL matches the link
          <NavLink
            // Route destination
            to={item.to}
            // Key must be unique per item
            key={item.to}
            // Tooltip improves discoverability of collapsed labels
            title={item.label}
            // className receives the active state and returns the right styles
            className={({ isActive }) =>
              // Merge active and inactive styles conditionally
              [
                // Shared layout and transition classes
                "mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                // Active: white pill with dark green text
                isActive
                  ? "bg-white text-brand-900 shadow-sm"
                  // Inactive: translucent white text that brightens on hover
                  : "text-brand-100/80 hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            {/* Icon component from the navigation data */}
            <item.icon size={18} aria-hidden="true" />
            {/* Menu label */}
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom area: demo mode label and the logged in user */}
      <div className="border-t border-white/10 px-4 py-4">
        {/* Demo mode badge makes the project status obvious */}
        <Badge tone="brand" className="border-brand-700 bg-brand-900 text-brand-200">
          Demo Mode
        </Badge>

        {/* Logged in demo user information */}
        <p className="mt-3 truncate text-sm font-semibold text-white">{user?.name}</p>
        {/* Location of the demo farm */}
        <p className="truncate text-xs text-brand-300/80">{user?.location}</p>

        {/* Logout button ends the demo session */}
        <button
          // Button type avoids accidental submissions
          type="button"
          // Trigger the logout handler
          onClick={handleLogout}
          // Accessible label
          aria-label="End demo session"
          // Full width ghost button with white text on the dark background
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          {/* Logout icon */}
          <LogOut size={16} aria-hidden="true" />
          {/* Button label */}
          End session
        </button>
      </div>
    </aside>
  );
}
