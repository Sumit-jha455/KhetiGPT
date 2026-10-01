// Import the hook that exposes the current route information
import { useLocation, useNavigate } from "react-router-dom";
// Import state hooks for the dropdown menus
import { useState, useRef, useEffect } from "react";
// Import the lucide icons used in the topbar
import { Bell, Search, ChevronDown, UserRound, Settings, LogOut } from "lucide-react";
// Import the route title map and sample notifications
import { ROUTE_TITLES, SAMPLE_NOTIFICATIONS } from "../data/navigation";
// Import the global app context hook
import { useApp } from "../context/AppContext";

/**
 * Topbar - the sticky header of the application area.
 * Shows the current page title, a demo search utility, notifications and
 * the farmer profile menu.
 */
export default function Topbar() {
  // Read the current pathname to resolve the page title
  const { pathname } = useLocation();
  // Router navigate function used by the profile menu actions
  const navigate = useNavigate();
  // Access the demo user and logout action
  const { user, logout } = useApp();
  // Controls the visibility of the notification dropdown
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Controls the visibility of the profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  // Ref used to detect clicks outside the dropdown area
  const menuRef = useRef(null);

  // Close both menus when clicking anywhere outside of them
  useEffect(() => {
    // Handler that closes the menus for outside clicks
    const handleClickOutside = (event) => {
      // Ignore clicks that happen inside the menu container
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Close the notifications dropdown
        setNotificationsOpen(false);
        // Close the profile dropdown
        setProfileOpen(false);
      }
    };
    // Register the listener on the document
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Resolve the page title from the current path, with a sensible fallback
  const pageTitle = ROUTE_TITLES[pathname] || "KhetiGPT";

  /** Ends the demo session and returns to the landing page */
  const handleLogout = () => {
    // Clear the demo session flag in context
    logout();
    // Navigate back to the public landing page
    navigate("/");
  };

  return (
    // Sticky header that sits below the fixed sidebar space
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      {/* Inner row with responsive padding */}
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Page title block (replaces the sidebar brand on mobile) */}
        <div className="min-w-0 flex-1">
          {/* Small brand label visible only on small screens */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 lg:hidden">
            KhetiGPT
          </p>
          {/* Current page title */}
          <h1 className="truncate font-display text-base font-bold text-brand-950 sm:text-lg">
            {pageTitle}
          </h1>
        </div>

        {/* Demo search utility (hidden on the smallest screens) */}
        <div className="relative hidden sm:block">
          {/* Search icon positioned inside the input */}
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          {/* Non-functional demo search field with a clear placeholder */}
          <input
            // Input type search shows the clear button on some browsers
            type="search"
            // Accessible label for screen readers
            aria-label="Search modules (demo)"
            // Placeholder explains that this is a demo utility
            placeholder="Search modules (demo)"
            // Read only so no unexpected behaviour occurs without a backend
            readOnly
            // Styled input that does not grow wider than the container
            className="h-10 w-48 rounded-xl border border-line bg-surface pl-9 pr-3 text-sm text-ink-soft outline-none transition-colors focus:border-brand-400 focus:bg-white lg:w-64"
          />
        </div>

        {/* Right hand utility cluster */}
        <div className="relative flex items-center gap-1.5" ref={menuRef}>
          {/* Notification bell button */}
          <button
            // Avoid form submission behaviour
            type="button"
            // Toggle the notification dropdown
            onClick={() => {
              // Open notifications and close the profile menu
              setNotificationsOpen((open) => !open);
              // Ensure only one dropdown is visible
              setProfileOpen(false);
            }}
            // Accessible label
            aria-label="Show notifications"
            // Tooltip text
            title="Notifications (sample data)"
            // Circular icon button styling
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {/* Bell icon */}
            <Bell size={18} aria-hidden="true" />
            {/* Small dot that hints at unread sample notifications */}
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500" />
          </button>

          {/* Profile button showing the farmer's initials */}
          <button
            type="button"
            // Toggle the profile dropdown
            onClick={() => {
              // Open the profile menu and close notifications
              setProfileOpen((open) => !open);
              // Close the other dropdown
              setNotificationsOpen(false);
            }}
            // Accessible label describing the action
            aria-label="Open profile menu"
            // Tooltip with the demo user's name
            title={`Account: ${user?.name}`}
            // Button styling with the initials avatar
            className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white pl-1.5 pr-2 transition-colors hover:border-brand-300"
          >
            {/* Initials avatar in a green tile */}
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
              {/* Compute initials from the user name */}
              {user?.name
                ?.split(" ")
                // Keep the first letter of the first two words
                .map((part) => part.charAt(0))
                // Limit to two initials
                .slice(0, 2)
                // Join them together
                .join("")}
            </span>
            {/* Chevron that rotates when the menu is open */}
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={profileOpen ? "rotate-180 transition-transform" : "transition-transform"}
            />
          </button>

          {/* Notification dropdown panel */}
          {notificationsOpen ? (
            // Absolute panel anchored under the bell button
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-line bg-white p-2 shadow-lift">
              {/* Panel heading */}
              <p className="px-3 py-2 text-sm font-semibold text-brand-950">
                Notifications
                {/* Sample data label keeps the content honest */}
                <span className="ml-1 text-xs font-normal text-ink-muted">(sample)</span>
              </p>
              {/* List of sample notifications */}
              {SAMPLE_NOTIFICATIONS.map((notification) => (
                // Single notification row
                <div
                  // Unique key per notification
                  key={notification.id}
                  // Row styling with a hover background
                  className="rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                >
                  {/* Notification title */}
                  <p className="text-sm font-semibold text-ink">{notification.title}</p>
                  {/* Notification body */}
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                    {notification.body}
                  </p>
                  {/* Relative time label */}
                  <p className="mt-1 text-[11px] text-brand-600">{notification.time}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* Profile dropdown panel */}
          {profileOpen ? (
            // Absolute panel anchored under the profile button
            <div className="absolute right-0 top-12 w-56 rounded-2xl border border-line bg-white p-2 shadow-lift">
              {/* User identity block */}
              <div className="px-3 py-2">
                {/* Demo user name */}
                <p className="truncate text-sm font-semibold text-brand-950">{user?.name}</p>
                {/* Demo user email */}
                <p className="truncate text-xs text-ink-muted">{user?.email}</p>
              </div>
              {/* Divider between identity and actions */}
              <div className="my-1 h-px bg-line" />
              {/* Profile link */}
              <button
                type="button"
                // Navigate to the profile page
                onClick={() => {
                  // Close the dropdown before navigating
                  setProfileOpen(false);
                  // Navigate to the profile route
                  navigate("/profile");
                }}
                // Full width row button
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-brand-800"
              >
                {/* Profile icon */}
                <UserRound size={16} aria-hidden="true" />
                {/* Label */}
                My Profile
              </button>
              {/* Settings link */}
              <button
                type="button"
                // Navigate to the settings page
                onClick={() => {
                  // Close the dropdown first
                  setProfileOpen(false);
                  // Navigate to the settings route
                  navigate("/settings");
                }}
                // Full width row button
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-brand-800"
              >
                {/* Settings icon */}
                <Settings size={16} aria-hidden="true" />
                {/* Label */}
                Settings
              </button>
              {/* Logout action */}
              <button
                type="button"
                // End the demo session
                onClick={handleLogout}
                // Full width row button with a red hover state
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600"
              >
                {/* Logout icon */}
                <LogOut size={16} aria-hidden="true" />
                {/* Label */}
                End session
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
