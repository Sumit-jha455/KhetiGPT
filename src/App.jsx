// React Router components used to build the application routing tree
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// Global application state (demo auth + demo farmer profile)
import { AppProvider } from "./context/AppContext";
// Layouts wrap groups of routes with shared chrome (nav / sidebar / footer)
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
// Landing / marketing page shown at "/"
import Landing from "./pages/Landing";
// Demo authentication pages (no real backend yet)
import Login from "./pages/Login";
import Register from "./pages/Register";
// Authenticated application modules
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import Fertilizer from "./pages/Fertilizer";
import Schemes from "./pages/Schemes";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
// Guard that keeps demo-only pages behind the demo session
import ProtectedRoute from "./components/ProtectedRoute";
// Friendly fallback for unknown URLs (no blank screens)
import NotFound from "./pages/NotFound";

/**
 * App - the root component of KhetiGPT.
 * HashRouter is used on purpose: the production build is a single static
 * index.html, so hash based routing keeps every deep link (/dashboard,
 * /weather, ...) working without server rewrite rules or refresh errors.
 */
export default function App() {
  return (
    // AppProvider supplies the demo user session and farm profile via context
    <AppProvider>
      {/* HashRouter keeps the URL and UI in sync without page reloads */}
      <HashRouter>
        {/* Routes declares the full route table of the application */}
        <Routes>
          {/* Public marketing pages: landing page + shared navbar/footer */}
          <Route element={<PublicLayout />}>
            {/* "/" is the home / landing route */}
            <Route index element={<Landing />} />
          </Route>

          {/* Auth pages share a split-screen auth layout */}
          <Route element={<AuthLayout />}>
            {/* Demo login screen */}
            <Route path="/login" element={<Login />} />
            {/* Demo registration screen */}
            <Route path="/register" element={<Register />} />
          </Route>

          {/* App pages share the sidebar + topbar dashboard layout */}
          <Route
            element={
              // ProtectedRoute redirects visitors without a demo session
              <ProtectedRoute>
                {/* Outlet-based layout renders the matched child route */}
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Main farmer dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Mock AI chat assistant */}
            <Route path="/assistant" element={<Assistant />} />
            {/* Mock weather dashboard */}
            <Route path="/weather" element={<Weather />} />
            {/* Crop recommendation form + demo result */}
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            {/* Fertilizer guidance tool */}
            <Route path="/fertilizer" element={<Fertilizer />} />
            {/* Searchable government scheme directory */}
            <Route path="/schemes" element={<Schemes />} />
            {/* Farmer profile (editable in local demo state) */}
            <Route path="/profile" element={<Profile />} />
            {/* App settings / demo preferences */}
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect the duplicate "/home" path to the landing page */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Any unknown URL shows the friendly 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
