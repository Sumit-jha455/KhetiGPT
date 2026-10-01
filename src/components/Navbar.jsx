// Import React state hooks for the mobile menu toggle
import { useState, useEffect } from "react";
// Import the Link component for internal navigation
import { Link } from "react-router-dom";
// Import the lucide icons used in the navbar
import { Menu, X, ArrowRight } from "lucide-react";
// Import the brand logo component
import Logo from "./Logo";
// Import the reusable Button component
import Button from "./Button";

/**
 * Navbar - the responsive header of the public landing page.
 * Contains the brand, anchor navigation to landing sections and the
 * Login / Get Started actions.
 */
export default function Navbar() {
  // Track whether the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);
  // Track whether the page has been scrolled (used for the shadow effect)
  const [scrolled, setScrolled] = useState(false);

  // Attach a scroll listener once when the navbar mounts
  useEffect(() => {
    // Handler that updates the scrolled flag based on scroll position
    const handleScroll = () => setScrolled(window.scrollY > 8);
    // Register the listener on the window
    window.addEventListener("scroll", handleScroll);
    // Call once so the initial state is correct
    handleScroll();
    // Remove the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * scrollToSection - smoothly scrolls to a landing page section.
   * Plain anchors are avoided because the app uses hash based routing.
   */
  const scrollToSection = (id) => {
    // Close the mobile menu first so it does not cover the section
    setIsOpen(false);
    // Find the section element by its id
    const element = document.getElementById(id);
    // Scroll only when the element exists on the page
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    // Sticky header that stays visible while scrolling
    <header
      className={
        // Add a shadow and solid background only after the user scrolls
        scrolled
          ? "sticky top-0 z-40 border-b border-line bg-white/95 shadow-sm backdrop-blur"
          : "sticky top-0 z-40 border-b border-transparent bg-surface/80 backdrop-blur"
      }
    >
      {/* Container limits the content width and adds horizontal padding */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo links back to the landing page */}
        <Link to="/" aria-label="KhetiGPT home" className="shrink-0">
          {/* Logo component renders the mark and wordmark */}
          <Logo />
        </Link>

        {/* Desktop navigation links (hidden below the md breakpoint) */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Home button scrolls to the top of the landing page */}
          <button
            // Button type prevents form submission behaviour
            type="button"
            // Scroll to the hero section
            onClick={() => scrollToSection("home")}
            // Quiet styling with a hover background
            className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800"
          >
            {/* Link label */}
            Home
          </button>

          {/* Features link scrolls to the features grid */}
          <button
            type="button"
            // Scroll to the features section
            onClick={() => scrollToSection("features")}
            // Same quiet styling as the Home button
            className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800"
          >
            Features
          </button>

          {/* How It Works link scrolls to the process flow */}
          <button
            type="button"
            // Scroll to the how-it-works section
            onClick={() => scrollToSection("how-it-works")}
            // Same quiet styling
            className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800"
          >
            How It Works
          </button>
        </div>

        {/* Desktop action buttons */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Login navigates to the demo login page */}
          <Button to="/login" variant="outline" size="sm" title="Open the demo login page">
            {/* Button label */}
            Login
          </Button>
          {/* Get Started navigates to the demo registration page */}
          <Button to="/register" size="sm" title="Create a demo account">
            {/* Button label */}
            Get Started
            {/* Small arrow icon inside the button */}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>

        {/* Mobile menu toggle button (visible below md) */}
        <button
          // Button type avoids submitting any parent form
          type="button"
          // Toggle the mobile menu state
          onClick={() => setIsOpen((open) => !open)}
          // Accessible label changes with the menu state
          aria-label={isOpen ? "Close menu" : "Open menu"}
          // Expand the tap area on small screens
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink md:hidden"
        >
          {/* Show X when open, otherwise the hamburger icon */}
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile dropdown menu rendered only when open */}
      {isOpen ? (
        // Panel sits directly under the navbar with a white background
        <div className="border-t border-line bg-white px-4 pb-5 pt-3 md:hidden">
          {/* Vertical stack of section links */}
          <div className="flex flex-col">
            {/* Home section link */}
            <button
              type="button"
              // Scroll and close the menu
              onClick={() => scrollToSection("home")}
              // Full width row styling
              className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-ink-soft hover:bg-brand-50"
            >
              Home
            </button>
            {/* Features section link */}
            <button
              type="button"
              // Scroll to features
              onClick={() => scrollToSection("features")}
              // Same row styling
              className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-ink-soft hover:bg-brand-50"
            >
              Features
            </button>
            {/* How it works section link */}
            <button
              type="button"
              // Scroll to how it works
              onClick={() => scrollToSection("how-it-works")}
              // Same row styling
              className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-ink-soft hover:bg-brand-50"
            >
              How It Works
            </button>
          </div>

          {/* Mobile action buttons */}
          <div className="mt-4 flex flex-col gap-2.5">
            {/* Login button occupying the full width */}
            <Button to="/login" variant="outline" fullWidth onClick={() => setIsOpen(false)}>
              Login
            </Button>
            {/* Get Started button occupying the full width */}
            <Button to="/register" fullWidth onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
