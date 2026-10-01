/**
 * validators.js
 * Pure client-side validation helpers used by the Login, Register,
 * Crop Recommendation and Fertilizer forms. No backend calls here.
 */

// Simple regular expression that accepts standard email formats
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns true when the value is null, undefined or only whitespace */
export const isEmpty = (value) =>
  // Convert to string so numbers/arrays are handled safely, then trim spaces
  value === null || value === undefined || String(value).trim() === "";

/** Validates an email address and returns an error message or empty string */
export const validateEmail = (email) => {
  // Empty emails are invalid
  if (isEmpty(email)) return "Email is required";
  // Check the value against the email pattern
  if (!EMAIL_REGEX.test(String(email).trim())) return "Enter a valid email address";
  // No problem found
  return "";
};

/** Validates a password field, optionally enforcing a minimum length */
export const validatePassword = (password, minLength = 6) => {
  // Password cannot be blank
  if (isEmpty(password)) return "Password is required";
  // Enforce the minimum length rule
  if (String(password).length < minLength)
    return `Password must be at least ${minLength} characters`;
  // Valid password
  return "";
};

/** Checks that two password entries match (used on the register form) */
export const validateConfirmPassword = (password, confirmPassword) => {
  // Confirmation field is required
  if (isEmpty(confirmPassword)) return "Please confirm your password";
  // Both values must be identical
  if (String(password) !== String(confirmPassword)) return "Passwords do not match";
  // Valid
  return "";
};

/** Generic required-field validator returning a friendly message */
export const validateRequired = (value, label = "This field") =>
  // Empty values produce the label based message, otherwise no error
  isEmpty(value) ? `${label} is required` : "";

/**
 * Runs a rules object against a form values object.
 * rules = { email: (value) => string, name: (value) => string }
 * Returns { errors, isValid } so pages can render messages easily.
 */
export const runValidation = (values, rules) => {
  // Start with a clean errors object
  const errors = {};
  // Loop over each field that has a validation rule
  Object.keys(rules).forEach((field) => {
    // Execute the rule with the submitted value and store the message
    const message = rules[field](values[field], values);
    // Only keep the field in errors when a message was returned
    if (message) errors[field] = message;
  });
  // A form is valid only when no error messages were produced
  const isValid = Object.keys(errors).length === 0;
  // Return both pieces of information to the caller
  return { errors, isValid };
};
