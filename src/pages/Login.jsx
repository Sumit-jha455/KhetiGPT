// Import React hooks for form state and side effects
import { useState } from "react";
// Import the navigation hook and Link for routing
import { useNavigate, Link } from "react-router-dom";
// Import the lucide icons used in the form
import { Mail, Lock, LogIn } from "lucide-react";
// Import the reusable form components
import Input from "../components/Input";
import Button from "../components/Button";
// Import the validation helpers for the login form
import { validateEmail, validatePassword, runValidation } from "../utils/validators";
// Import the global app context hook to start the demo session
import { useApp } from "../context/AppContext";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/**
 * Login - demo login screen.
 * Performs client-side validation only; there is no server authentication.
 * On a successful submit the demo session starts and the user is taken to
 * the dashboard.
 */
export default function Login() {
  // Set the browser tab title for this page
  useDocumentTitle("Login");

  // Router navigation used after a successful demo login
  const navigate = useNavigate();
  // Access the demo login action from the global context
  const { loginDemo } = useApp();

  // Form state holding both field values
  const [form, setForm] = useState({ email: "", password: "" });
  // Object holding one error message per field
  const [errors, setErrors] = useState({});
  // "Remember me" checkbox state (stored locally, no backend use)
  const [remember, setRemember] = useState(true);
  // Message shown when the demo login succeeds
  const [successMessage, setSuccessMessage] = useState("");

  /** Generic change handler that updates a single field and clears its error */
  const handleChange = (event) => {
    // Name of the field being edited
    const { name, value } = event.target;
    // Copy the new value into the form state
    setForm((current) => ({ ...current, [name]: value }));
    // Remove any previous error for that field
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  /** Validates the form and returns true when both fields are correct */
  const validateForm = () => {
    // Describe the validation rules for each field
    const rules = {
      // Email uses the shared email validator
      email: (value) => validateEmail(value),
      // Password uses the shared password validator
      password: (value) => validatePassword(value),
    };
    // Run the rules and capture the errors object
    const { errors: nextErrors, isValid } = runValidation(form, rules);
    // Store the errors so the inputs can display them
    setErrors(nextErrors);
    // Return whether the form is valid
    return isValid;
  };

  /** Handles the form submission in demo mode */
  const handleSubmit = (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Clear any previous success message
    setSuccessMessage("");
    // Stop early when validation fails
    if (!validateForm()) return;

    // Show a short confirmation before navigating
    setSuccessMessage("Demo login accepted. Opening your dashboard…");

    // Start the demo session after a short delay so the message is visible
    setTimeout(() => {
      // Activate the demo session with the typed email
      loginDemo({ email: form.email });
      // Navigate to the dashboard route
      navigate("/dashboard");
      // Short delay keeps the interaction feeling natural
    }, 500);
  };

  return (
    // Form element wraps the whole login card content
    <form onSubmit={handleSubmit} noValidate>
      {/* Heading block of the login form */}
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-brand-950">
        Welcome back
      </h1>
      {/* Supporting description */}
      <p className="mt-1.5 text-sm text-ink-muted">
        Sign in to continue to your KhetiGPT dashboard.
      </p>

      {/* Demo mode notice explaining that no real authentication happens */}
      <div className="mt-5 rounded-xl border border-sky-100 bg-sky-soft px-3.5 py-2.5 text-xs leading-relaxed text-sky-deep">
        Demo mode: any valid email and password (6+ characters) will open the dashboard. No
        credentials are stored or sent to a server.
      </div>

      {/* Email field */}
      <div className="mt-5">
        {/* Reusable input with label, icon and error handling */}
        <Input
          // Field label
          label="Email"
          // Field name used by the change handler
          name="email"
          // Input type
          type="email"
          // Icon shown inside the field
          icon={Mail}
          // Current value
          value={form.email}
          // Change handler
          onChange={handleChange}
          // Placeholder text
          placeholder="farmer@example.com"
          // Required flag
          required
          // Error message from validation
          error={errors.email}
          // Focus this field when the page opens
          autoFocus
        />
      </div>

      {/* Password field */}
      <div className="mt-4">
        {/* Password input component */}
        <Input
          // Field label
          label="Password"
          // Field name
          name="password"
          // Input type hides the characters
          type="password"
          // Lock icon
          icon={Lock}
          // Current value
          value={form.password}
          // Change handler
          onChange={handleChange}
          // Placeholder text
          placeholder="Enter your password"
          // Required flag
          required
          // Error message
          error={errors.password}
        />
      </div>

      {/* Row with "remember me" and the forgot password link */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Remember me checkbox */}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          {/* Native checkbox bound to the remember state */}
          <input
            // Checkbox input type
            type="checkbox"
            // Checked state
            checked={remember}
            // Toggle the state on change
            onChange={(event) => setRemember(event.target.checked)}
            // Green accent for the checkbox
            className="h-4 w-4 rounded border-line accent-brand-600"
          />
          {/* Label text */}
          Remember me
        </label>

        {/* Forgot password link (demo only, shows an alert-free notice) */}
        <button
          // Avoid form submission
          type="button"
          // Show a simple demo notice instead of a real reset flow
          onClick={() =>
            setErrors((current) => ({
              ...current,
              // Reuse the error area to display the demo notice
              password: "",
              // Message explains the missing feature
              form: "Password reset is not part of the MVP. Use any email and a 6+ character password to continue.",
            }))
          }
          // Accessible name
          aria-label="Forgot password (demo notice)"
          // Link styled text button
          className="text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Forgot password?
        </button>
      </div>

      {/* Demo notice rendered from the form level error key */}
      {errors.form ? (
        // Blue information box for the demo notice
        <p className="mt-4 rounded-xl border border-sky-100 bg-sky-soft px-3.5 py-2.5 text-xs leading-relaxed text-sky-deep">
          {/* Notice text */}
          {errors.form}
        </p>
      ) : null}

      {/* Success message shown after a valid submit */}
      {successMessage ? (
        // Green confirmation box
        <p className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brand-800">
          {/* Message text */}
          {successMessage}
        </p>
      ) : null}

      {/* Submit button */}
      <Button type="submit" fullWidth className="mt-6" title="Sign in (demo)">
        {/* Submit label */}
        Sign In
        {/* Login icon */}
        <LogIn size={18} aria-hidden="true" />
      </Button>

      {/* Link to the registration page */}
      <p className="mt-5 text-center text-sm text-ink-muted">
        Don&apos;t have an account?{" "}
        {/* Router link to the register route */}
        <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
          Create account
        </Link>
      </p>
    </form>
  );
}
