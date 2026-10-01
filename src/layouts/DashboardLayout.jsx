// Import the Outlet component to render the matched app page
import { Outlet } from "react-router-dom";
// Import the three pieces of application chrome
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";

/**
 * DashboardLayout - shell for every authenticated module.
 * Desktop: fixed sidebar + sticky topbar + scrollable content area.
 * Mobile: topbar + content + fixed bottom navigation bar.
 */
export default function DashboardLayout() {
  return (
    // min-h-screen with the neutral app background colour
    <div className="min-h-screen bg-surface">
      {/* Fixed desktop sidebar (hidden below lg) */}
      <Sidebar />

      {/* Content wrapper shifted right to make room for the sidebar */}
      <div className="lg:pl-64">
        {/* Sticky topbar with the page title and utility area */}
        <Topbar />

        {/* Scrollable page content */}
        <main className="px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
          {/* Constrain the content width on very large screens */}
          <div className="mx-auto max-w-6xl">
            {/* Outlet renders the module matched by the router */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Fixed mobile bottom navigation (hidden from lg upwards) */}
      <MobileNav />
    </div>
  );
}
