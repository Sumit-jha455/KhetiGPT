/**
 * navigation.js
 * Single source of truth for the sidebar, mobile navigation and page titles.
 * Keeping the items in data means new modules only need to be added once.
 */

// Import all lucide icons used by the navigation items
import {
  LayoutDashboard,
  MessageSquareText,
  CloudSun,
  Sprout,
  Droplets,
  Landmark,
  UserRound,
  Settings,
} from "lucide-react";

/**
 * DASHBOARD_NAV - the full sidebar menu of the application area.
 * Each item maps a route to a label and an icon.
 */
export const DASHBOARD_NAV = [
  {
    // Route path handled by React Router
    to: "/dashboard",
    // Visible menu label
    label: "Dashboard",
    // Icon component rendered by the sidebar
    icon: LayoutDashboard,
  },
  {
    to: "/assistant",
    label: "AI Assistant",
    icon: MessageSquareText,
  },
  {
    to: "/weather",
    label: "Weather",
    icon: CloudSun,
  },
  {
    to: "/crop-recommendation",
    label: "Crop Recommendation",
    icon: Sprout,
  },
  {
    to: "/fertilizer",
    label: "Fertilizer",
    icon: Droplets,
  },
  {
    to: "/schemes",
    label: "Government Schemes",
    icon: Landmark,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

/**
 * MOBILE_NAV - the five items of the mobile bottom navigation bar.
 * "Services" opens a bottom sheet listing every module instead of linking.
 */
export const MOBILE_NAV = [
  {
    // Route path
    to: "/dashboard",
    // Short label for the small bottom bar
    label: "Home",
    // Icon component
    icon: LayoutDashboard,
  },
  {
    to: "/assistant",
    label: "AI",
    icon: MessageSquareText,
  },
  {
    to: "/weather",
    label: "Weather",
    icon: CloudSun,
  },
  {
    // No route: this item opens the services sheet
    to: null,
    label: "Services",
    icon: Sprout,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserRound,
  },
];

/**
 * ROUTE_TITLES - maps a path to the title shown in the dashboard topbar.
 * Used together with useLocation() so the title always matches the route.
 */
export const ROUTE_TITLES = {
  "/dashboard": "Dashboard",
  "/assistant": "AI Assistant",
  "/weather": "Weather Information",
  "/crop-recommendation": "Crop Recommendation",
  "/fertilizer": "Fertilizer Guidance",
  "/schemes": "Government Schemes",
  "/profile": "My Profile",
  "/settings": "Settings",
};

/**
 * SAMPLE_NOTIFICATIONS - static notifications for the topbar bell icon.
 * Clearly sample content, not real alerts.
 */
export const SAMPLE_NOTIFICATIONS = [
  {
    // Notification id
    id: 1,
    // Short title
    title: "Weather updated (sample)",
    // Body text
    body: "Sample forecast shows a high chance of rain on day 3.",
    // Relative time label
    time: "10 min ago",
  },
  {
    id: 2,
    title: "Crop recommendation ready (sample)",
    body: "Your last demo recommendation used Loamy soil and Rabi season.",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Scheme record added (sample)",
    body: "A new sample scheme record is available in the Schemes module.",
    time: "Yesterday",
  },
];
