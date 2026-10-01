// Import the Outlet component to render the matched child route
import { Outlet } from "react-router-dom";
// Import the public navbar and footer components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * PublicLayout - shared shell for the public landing route.
 * Renders the navbar above the routed page and the footer below it.
 */
export default function PublicLayout() {
  return (
    // Flex column makes the footer sit at the bottom of the page
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Top navigation bar with the brand and section links */}
      <Navbar />

      {/* Routed page content grows to fill the available height */}
      <main id="home" className="flex-1">
        {/* Outlet renders the component matched by React Router */}
        <Outlet />
      </main>

      {/* Footer with quick links and the academic project note */}
      <Footer />
    </div>
  );
}
