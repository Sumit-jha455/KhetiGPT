// StrictMode highlights unsafe React patterns during development
import { StrictMode } from "react";
// createRoot is the React 19 API used to attach React to a DOM node
import { createRoot } from "react-dom/client";
// Global stylesheet: Tailwind v4 + design tokens + base styles
import "./index.css";
// The root component that contains all routes and providers
import App from "./App.jsx";

// Find the empty <div id="root"> element created in index.html
const rootElement = document.getElementById("root");
// Create the React root renderer bound to that element
createRoot(rootElement).render(
  // StrictMode double-invokes effects in dev to surface side-effect bugs
  <StrictMode>
    {/* App holds the router, context providers and every page */}
    <App />
  </StrictMode>
);
