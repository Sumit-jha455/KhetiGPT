// Import the React hook for form state
import { useState } from "react";
// Import the navigation hook and Link component
import { useNavigate, Link } from "react-router-dom";
// Import the lucide icons used in the form
import { Mail, Lock, UserRound, MapPin, Languages, UserPlus } from "lucide-react";
// Import the reusable form components
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
// Import the validation helpers
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateRequired,
  runValidation,
} from "../utils/validators";
// Import the global app context hook
import { useApp } from "../context/AppContext";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Languages supported by the interface
const LANGUAGES = ["English", "Hindi"];

// Sample locations offered in the location dropdown
const LOCATIONS = [
  "Nashik, Maharashtra",
  "Indore, Madhya Pradesh",
  "Ludhiana, Punjab",
  "Guntur, Andhra Pradesh",
  "Kanpur, Uttar Pradesh",
  "Coimbatore, Tamil Nadu",
];

/**
 * Register - demo registration screen.
 * All validation is client side. Submitting the form creates a local demo
 * session and redirects to the dashboard. No data is sent to a server.
 */
export default function Register() {
  // Set the browser tab title for this page
  useDocumentTitle("Create Account");

  // Router navigation used after a successful demo registration
  const navigate = useNavigate();
  // Access the demo registration action from context
  const { registerDemo } = useApp();

  // Form state for every registration field
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    language: "English",
  });

  // Object holding one error message per field
  const [errors, setErrors] = useState({});
  // Success message shown just before the redirect
  const [successMessage, setSuccessMessage] = useState("");

  /** Generic change handler for text inputs */
  const handleChange = (event) => {
    // Destructure the field name and new value
    const { name, value } = event.target;
    // Update the form state for that field
    setForm((current) => ({ ...current, [name]: value }));
    // Clear the error for the edited field
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  /** Validates every registration field and stores the messages */
  const validateForm = () => {
    // Validation rules for the registration form
    const rules = {
      // Name is required
      name: (value) => validateRequired(value, "Name"),
      // Email must be a valid address
      email: (value) => validateEmail(value),
      // Password needs at least 6 characters
      password: (value) => validatePassword(value, 6),
      // Confirmation must match the password
      confirmPassword: (value) => validateConfirmPassword(form.password, value),
      // Location is required
      location: (value) => validateRequired(value, "Location"),
      // Language is required (it always has a default value)
      language: (value) => validateRequired(value, "Preferred language"),
    };
    // Run all rules against the current form values
    const { errors: nextErrors, isValid } = runValidation(form, rules);
    // Save the errors for display
    setErrors(nextErrors);
    // Return the validity flag
    return isValid;
  };

  /** Handles the demo registration submit */
  const handleSubmit = (event) => {
    // Prevent the default browser form submission
    event.preventDefault();
    // Reset the previous success message
    setSuccessMessage("");
    // Stop when any field is invalid
    if (!validateForm()) return;

    // Show a confirmation message before navigating
    setSuccessMessage("Demo account ready. Opening your dashboard…");

    // Start the demo session after a short, visible delay
    setTimeout(() => {
      // Register the demo profile (the password is never stored)
      registerDemo({
        // Full name
        name: form.name,
        // Email address
        email: form.email,
        // Chosen location
        location: form.location,
        // Chosen language
        language: form.language,
      });
      // Navigate to the dashboard
      navigate("/dashboard");
      // Delay makes the confirmation readable
    }, 500);
  };

  return (
    // Form element wrapping the registration card content
    <form onSubmit={handleSubmit} noValidate>
      {/* Heading block */}
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-brand-950">
        Create your account
      </h1>
      {/* Supporting description */}
      <p className="mt-1.5 text-sm text-ink-muted">
        Set up a demo profile to start using the KhetiGPT modules.
      </p>

      {/* Demo mode notice */}
      <div className="mt-5 rounded-xl border border-sky-100 bg-sky-soft px-3.5 py-2.5 text-xs leading-relaxed text-sky-deep">
        Demo mode: the profile is stored only in this browser. Passwords are never saved and no
        data is sent to a server.
      </div>

      {/* Name field */}
      <div className="mt-5">
        {/* Reusable input with the user icon */}
        <Input
          // Field label
          label="Name"
          // Field name
          name="name"
          // Input type
          type="text"
          // Icon
          icon={UserRound}
          // Current value
          value={form.name}
          // Change handler
          onChange={handleChange}
          // Placeholder
          placeholder="Your full name"
          // Required flag
          required
          // Error message
          error={errors.name}
        />
      </div>

      {/* Email field */}
      <div className="mt-4">
        {/* Email input */}
        <Input
          // Label
          label="Email"
          // Name
          name="email"
          // Type
          type="email"
          // Icon
          icon={Mail}
          // Value
          value={form.email}
          // Handler
          onChange={handleChange}
          // Placeholder
          placeholder="farmer@example.com"
          // Required
          required
          // Error
          error={errors.email}
          // Helper text
          hint="Used only as an identifier inside the demo."
        />
      </div>

      {/* Password and confirm password in a two column row on large screens */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Password field */}
        <Input
          // Label
          label="Password"
          // Name
          name="password"
          // Type
          type="password"
          // Icon
          icon={Lock}
          // Value
          value={form.password}
          // Handler
          onChange={handleChange}
          // Placeholder
          placeholder="Minimum 6 characters"
          // Required
          required
          // Error
          error={errors.password}
        />
        {/* Confirm password field */}
        <Input
          // Label
          label="Confirm Password"
          // Name
          name="confirmPassword"
          // Type
          type="password"
          // Icon
          icon={Lock}
          // Value
          value={form.confirmPassword}
          // Handler
          onChange={handleChange}
          // Placeholder
          placeholder="Re-enter password"
          // Required
          required
          // Error
          error={errors.confirmPassword}
        />
      </div>

      {/* Location dropdown */}
      <div className="mt-4">
        {/* Reusable select component */}
        <Select
          // Label
          label="Location"
          // Name
          name="location"
          // Options list
          options={LOCATIONS}
          // Placeholder option
          placeholder="Select your district"
          // Current value
          value={form.location}
          // Change handler
          onChange={handleChange}
          // Required flag
          required
          // Error message
          error={errors.location}
        />
      </div>

      {/* Preferred language dropdown */}
      <div className="mt-4">
        {/* Language selection */}
        <div className="relative">
          {/* Label rendered above the custom row */}
          <span className="mb-1.5 block text-sm font-semibold text-ink">
            Preferred Language<span className="ml-0.5 text-red-600">*</span>
          </span>
          {/* Two language options rendered as selectable tiles */}
          <div className="grid grid-cols-2 gap-3">
            {/* Map both languages into tiles */}
            {LANGUAGES.map((language) => (
              // Single language tile acting as a radio button
              <label
                // Unique key per language
                key={language}
                // Cursor shows the tile is clickable
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-semibold transition-colors"
                // Highlight the tile when it is the selected language
                style={
                  form.language === language
                    ? // Selected style: green border and background
                    { borderColor: "#57bd78", backgroundColor: "#f1fbf3", color: "#196a3a" }
                    : // Default style: neutral border and text
                    { borderColor: "#e2e9e0", backgroundColor: "#ffffff", color: "#45594f" }
                }
              >
                {/* Hidden native radio input keeps the control keyboard friendly */}
                <input
                  // Radio input type
                  type="radio"
                  // Group name
                  name="language"
                  // Current value
                  value={language}
                  // Checked when this tile is selected
                  checked={form.language === language}
                  // Update the form state on change
                  onChange={handleChange}
                  // Green accent colour
                  className="h-4 w-4 accent-brand-600"
                />
                {/* Language icon */}
                <Languages size={16} aria-hidden="true" className="shrink-0" />
                {/* Language label */}
                {language}
              </label>
            ))}
          </div>
          {/* Error message for the language field */}
          {errors.language ? (
            // Accessible error paragraph
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {/* Error text */}
              {errors.language}
            </p>
          ) : null}
        </div>
      </div>

      {/* Location note shown under the form (keeps the map pin icon in use) */}
      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        {/* Map pin icon */}
        <MapPin size={13} aria-hidden="true" />
        {/* Note text */}
        Your location is used only to show the matching sample weather data.
      </p>

      {/* Success message after a valid submit */}
      {successMessage ? (
        // Green confirmation box
        <p className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brand-800">
          {/* Message */}
          {successMessage}
        </p>
      ) : null}

      {/* Submit button */}
      <Button type="submit" fullWidth className="mt-6" title="Create demo account">
        {/* Button label */}
        Create Account
        {/* Icon */}
        <UserPlus size={18} aria-hidden="true" />
      </Button>

      {/* Link back to the login page */}
      <p className="mt-5 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        {/* Router link to the login route */}
        <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
          Sign in
        </Link>
      </p>
    </form>
  );
}
