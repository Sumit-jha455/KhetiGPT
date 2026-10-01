// Import the React hooks needed to build and consume the context
import { createContext, useContext, useMemo } from "react";
// Import the localStorage-backed state hook for persistence
import { useLocalStorage } from "../hooks/useLocalStorage";
// Import the default demo user and farm sample data
import { DEMO_USER, DEMO_FARM } from "../data/farmProfile";

// Create the context object that will hold the global app state
const AppContext = createContext(null);

// Storage keys used in localStorage (declared once to avoid typos)
const STORAGE_KEYS = {
  // Stores the demo session flag
  session: "khetigpt.demo.session",
  // Stores the demo user profile
  user: "khetigpt.demo.user",
  // Stores the demo farm details
  farm: "khetigpt.demo.farm",
};

/**
 * AppProvider - wraps the whole app and exposes demo session state plus
 * profile/farm state. There is no real authentication yet: the values are
 * kept in localStorage purely so the demo feels continuous.
 */
export function AppProvider({ children }) {
  // Persist whether a demo session is currently active
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(STORAGE_KEYS.session, false);
  // Persist the demo user profile (name, email, location, language)
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.user, DEMO_USER);
  // Persist the demo farm details (size, soil, crop, water availability)
  const [farm, setFarm] = useLocalStorage(STORAGE_KEYS.farm, DEMO_FARM);

  /**
   * loginDemo - marks the demo session as active.
   * Accepts an optional partial profile so the login page can carry over
   * whatever the user typed.
   */
  const loginDemo = (details = {}) => {
    // Merge the supplied details into the existing profile
    setUser((current) => ({ ...current, ...details }));
    // Flip the session flag so protected routes open
    setIsAuthenticated(true);
  };

  /**
   * registerDemo - creates a demo account from the registration form.
   * The password is intentionally NOT stored anywhere.
   */
  const registerDemo = (details = {}) => {
    // Merge registration values with the demo defaults
    setUser((current) => ({ ...current, ...details }));
    // Update the farm details that were collected during registration
    setFarm((current) => ({
      ...current,
      // Only overwrite farm values that were actually provided
      ...(details.farmSize ? { farmSize: details.farmSize } : {}),
      ...(details.soilType ? { soilType: details.soilType } : {}),
      ...(details.waterAvailability ? { waterAvailability: details.waterAvailability } : {}),
    }));
    // Activate the demo session
    setIsAuthenticated(true);
  };

  /** logout - clears the demo session (profile data stays for the next demo) */
  const logout = () => {
    // Simply end the session; no server call is required
    setIsAuthenticated(false);
  };

  /** updateProfile - patches the personal information locally */
  const updateProfile = (patch) => {
    // Merge the patch into the current user object
    setUser((current) => ({ ...current, ...patch }));
  };

  /** updateFarm - patches the farm information locally */
  const updateFarm = (patch) => {
    // Merge the patch into the current farm object
    setFarm((current) => ({ ...current, ...patch }));
  };

  // Memoise the context value so it only changes when the state changes
  const value = useMemo(
    () => ({
      // Demo session flag and actions
      isAuthenticated,
      loginDemo,
      registerDemo,
      logout,
      // Profile and farm data plus their local update functions
      user,
      farm,
      updateProfile,
      updateFarm,
    }),
    // Recreate the value whenever any of these change
    [isAuthenticated, user, farm]
  );

  // Provide the value to every child component in the tree
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * useApp - convenience hook for consuming the app context.
 * Throws a clear error if used outside the provider.
 */
export function useApp() {
  // Read the nearest context value
  const context = useContext(AppContext);
  // Guard against incorrect usage high in the tree
  if (!context) throw new Error("useApp must be used inside <AppProvider>");
  // Return the context value to the caller
  return context;
}
