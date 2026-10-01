// Import React hooks for local edit state
import { useState } from "react";
// Import the lucide icons used on this page
import { UserRound, MapPin, Ruler, Sprout, Layers, Droplets, Pencil, Save, X, Mail } from "lucide-react";
// Import the reusable components
import Card, { CardHeader } from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Disclaimer from "../components/Disclaimer";
import StatCard from "../components/StatCard";
// Import the option lists used by the editable dropdowns
import { SOIL_TYPES, WATER_LEVELS, SEASONS } from "../data/mockCrops";
// Import the global app context for the profile and farm data
import { useApp } from "../context/AppContext";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/**
 * Profile - personal and farm information screen.
 * The Edit Profile button enables a local editing state; saving updates the
 * context (and localStorage) only. There is no server request.
 */
export default function Profile() {
  // Set the browser tab title for this page
  useDocumentTitle("My Profile");

  // Read the profile, farm data and update functions from context
  const { user, farm, updateProfile, updateFarm } = useApp();

  // Local editing flag: read-only by default
  const [isEditing, setIsEditing] = useState(false);
  // Draft copy of the personal information while editing
  const [profileDraft, setProfileDraft] = useState(user);
  // Draft copy of the farm information while editing
  const [farmDraft, setFarmDraft] = useState(farm);
  // Message shown after a successful save
  const [savedMessage, setSavedMessage] = useState("");

  /** Enters edit mode and resets the drafts to the current values */
  const handleEdit = () => {
    // Copy the current user into the draft
    setProfileDraft(user);
    // Copy the current farm into the draft
    setFarmDraft(farm);
    // Enable editing
    setIsEditing(true);
    // Clear any previous message
    setSavedMessage("");
  };

  /** Cancels editing and restores the saved values */
  const handleCancel = () => {
    // Leave edit mode
    setIsEditing(false);
    // Discard the drafts
    setProfileDraft(user);
    setFarmDraft(farm);
  };

  /** Saves the drafts into the app context */
  const handleSave = (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Update the personal information in context
    updateProfile({
      // Name
      name: profileDraft.name,
      // Email
      email: profileDraft.email,
      // Location
      location: profileDraft.location,
      // Preferred language
      language: profileDraft.language,
    });

    // Update the farm information in context
    updateFarm({
      // Farm size
      farmSize: farmDraft.farmSize,
      // Soil type
      soilType: farmDraft.soilType,
      // Current crop
      currentCrop: farmDraft.currentCrop,
      // Water availability
      waterAvailability: farmDraft.waterAvailability,
      // Season
      season: farmDraft.season,
    });

    // Leave edit mode
    setIsEditing(false);
    // Show a confirmation message
    setSavedMessage("Profile updated locally. Changes are stored in this browser only.");
  };

  /** Generic handler for the personal information fields */
  const handleProfileChange = (event) => {
    // Destructure the field name and value
    const { name, value } = event.target;
    // Update the profile draft
    setProfileDraft((current) => ({ ...current, [name]: value }));
  };

  /** Generic handler for the farm information fields */
  const handleFarmChange = (event) => {
    // Destructure the field name and value
    const { name, value } = event.target;
    // Update the farm draft
    setFarmDraft((current) => ({ ...current, [name]: value }));
  };

  return (
    // Fragment so the header, summary and form cards can be returned together
    <>
      {/* Page header block */}
      <div className="mb-6">
        {/* Title row with the module icon */}
        <div className="flex items-center gap-3">
          {/* Icon tile */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            {/* User icon */}
            <UserRound size={22} aria-hidden="true" />
          </span>
          {/* Page title */}
          <h1 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">
            My Profile
          </h1>
        </div>
        {/* Page description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Your personal and farm information used across the KhetiGPT modules. Editing works in
          local demo state only.
        </p>
      </div>

      {/* Profile summary card with the avatar and identity */}
      <Card className="mb-6">
        {/* Flex row that stacks on small screens */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: avatar and identity */}
          <div className="flex items-center gap-4">
            {/* Initials avatar */}
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 font-display text-xl font-bold text-white">
              {/* Compute the initials from the user name */}
              {user?.name
                ?.split(" ")
                // Take the first letter of each word
                .map((part) => part.charAt(0))
                // Keep only two initials
                .slice(0, 2)
                // Join them together
                .join("")}
            </span>
            {/* Identity text */}
            <div>
              {/* User name */}
              <h2 className="font-display text-lg font-bold text-brand-950">{user?.name}</h2>
              {/* User email */}
              <p className="text-sm text-ink-muted">{user?.email}</p>
              {/* Badges row */}
              <div className="mt-2 flex flex-wrap gap-2">
                {/* Location badge */}
                <Badge tone="neutral">{user?.location}</Badge>
                {/* Language badge */}
                <Badge tone="brand">{user?.language}</Badge>
                {/* Demo profile badge */}
                <Badge tone="amber">Demo Profile</Badge>
              </div>
            </div>
          </div>

          {/* Right side: action buttons */}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            {/* Edit button shown in read-only mode */}
            {!isEditing ? (
              // Button that enables the edit form
              <Button onClick={handleEdit} title="Edit your profile">
                {/* Pencil icon */}
                <Pencil size={16} aria-hidden="true" />
                {/* Button label */}
                Edit Profile
              </Button>
            ) : (
              // Fragment holding the save and cancel buttons
              <>
                {/* Save button submits the form */}
                <Button type="submit" form="profile-form" title="Save changes locally">
                  {/* Save icon */}
                  <Save size={16} aria-hidden="true" />
                  {/* Button label */}
                  Save Changes
                </Button>
                {/* Cancel button discards the edits */}
                <Button variant="outline" onClick={handleCancel} title="Discard changes">
                  {/* X icon */}
                  <X size={16} aria-hidden="true" />
                  {/* Button label */}
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Success message shown after saving */}
        {savedMessage ? (
          // Green confirmation box
          <p className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brand-800">
            {/* Message text */}
            {savedMessage}
          </p>
        ) : null}
      </Card>

      {/* Farm summary tiles */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Farm size tile */}
        <StatCard
          // Label
          label="Farm Size"
          // Value
          value={`${farm.farmSize} ${farm.farmUnit}`}
          // Icon
          icon={Ruler}
        />
        {/* Soil type tile */}
        <StatCard
          // Label
          label="Soil Type"
          // Value
          value={farm.soilType}
          // Icon
          icon={Layers}
        />
        {/* Current crop tile */}
        <StatCard
          // Label
          label="Current Crop"
          // Value
          value={farm.currentCrop}
          // Icon
          icon={Sprout}
        />
        {/* Water availability tile */}
        <StatCard
          // Label
          label="Water Availability"
          // Value
          value={farm.waterAvailability}
          // Icon
          icon={Droplets}
        />
      </div>

      {/* Editable form (also rendered in read-only mode) */}
      <form id="profile-form" onSubmit={handleSave} noValidate>
        {/* Two column grid for the form cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal information card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title
              title="Personal Information"
              // Description
              description="Basic account details of the demo profile."
              // Icon
              icon={UserRound}
            />

            {/* Name field */}
            <Input
              // Label
              label="Name"
              // Name
              name="name"
              // Icon
              icon={UserRound}
              // Value comes from the draft while editing
              value={isEditing ? profileDraft.name : user.name}
              // Handler used only while editing
              onChange={handleProfileChange}
              // Read-only when not editing
              readOnly={!isEditing}
            />

            {/* Email field */}
            <div className="mt-4">
              {/* Email input */}
              <Input
                // Label
                label="Email"
                // Name
                name="email"
                // Input type
                type="email"
                // Icon
                icon={Mail}
                // Value
                value={isEditing ? profileDraft.email : user.email}
                // Handler
                onChange={handleProfileChange}
                // Read-only when not editing
                readOnly={!isEditing}
                // Helper text
                hint="Used as the demo account identifier."
              />
            </div>

            {/* Location field */}
            <div className="mt-4">
              {/* Location input with the pin icon */}
              <Input
                // Label
                label="Location"
                // Name
                name="location"
                // Icon
                icon={MapPin}
                // Value
                value={isEditing ? profileDraft.location : user.location}
                // Handler
                onChange={handleProfileChange}
                // Read-only when not editing
                readOnly={!isEditing}
              />
            </div>

            {/* Preferred language dropdown */}
            <div className="mt-4">
              {/* Language select */}
              <Select
                // Label
                label="Preferred Language"
                // Name
                name="language"
                // Options
                options={["English", "Hindi"]}
                // Value
                value={isEditing ? profileDraft.language : user.language}
                // Handler
                onChange={handleProfileChange}
                // Disabled when not editing
                disabled={!isEditing}
                // Helper text
                hint="Interface language support is planned for a later phase."
              />
            </div>
          </Card>

          {/* Farm information card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title
              title="Farm Information"
              // Description
              description="Details used by the crop and fertilizer modules."
              // Icon
              icon={Sprout}
            />

            {/* Farm size field */}
            <Input
              // Label
              label="Farm Size (acres)"
              // Name
              name="farmSize"
              // Numeric input
              type="number"
              // Icon
              icon={Ruler}
              // Value
              value={isEditing ? farmDraft.farmSize : farm.farmSize}
              // Handler
              onChange={handleFarmChange}
              // Read-only when not editing
              readOnly={!isEditing}
              // Helper text
              hint="Total cultivable area of the demo farm."
            />

            {/* Soil type dropdown */}
            <div className="mt-4">
              {/* Soil select */}
              <Select
                // Label
                label="Soil Type"
                // Name
                name="soilType"
                // Options
                options={SOIL_TYPES}
                // Value
                value={isEditing ? farmDraft.soilType : farm.soilType}
                // Handler
                onChange={handleFarmChange}
                // Disabled when not editing
                disabled={!isEditing}
              />
            </div>

            {/* Current crop field */}
            <div className="mt-4">
              {/* Current crop input */}
              <Input
                // Label
                label="Current Crop"
                // Name
                name="currentCrop"
                // Icon
                icon={Sprout}
                // Value
                value={isEditing ? farmDraft.currentCrop : farm.currentCrop}
                // Handler
                onChange={handleFarmChange}
                // Read-only when not editing
                readOnly={!isEditing}
              />
            </div>

            {/* Water availability dropdown */}
            <div className="mt-4">
              {/* Water select */}
              <Select
                // Label
                label="Water Availability"
                // Name
                name="waterAvailability"
                // Options
                options={WATER_LEVELS}
                // Value
                value={isEditing ? farmDraft.waterAvailability : farm.waterAvailability}
                // Handler
                onChange={handleFarmChange}
                // Disabled when not editing
                disabled={!isEditing}
              />
            </div>

            {/* Season dropdown */}
            <div className="mt-4">
              {/* Season select */}
              <Select
                // Label
                label="Current Season"
                // Name
                name="season"
                // Options
                options={SEASONS}
                // Value
                value={isEditing ? farmDraft.season : farm.season}
                // Handler
                onChange={handleFarmChange}
                // Disabled when not editing
                disabled={!isEditing}
                // Helper text
                hint="Used as the default season in the crop recommendation form."
              />
            </div>
          </Card>
        </div>

        {/* Save button for mobile users at the bottom of the form */}
        {isEditing ? (
          // Full width save button
          <Button type="submit" fullWidth className="mt-6" title="Save changes locally">
            {/* Save icon */}
            <Save size={16} aria-hidden="true" />
            {/* Button label */}
            Save Changes
          </Button>
        ) : null}
      </form>

      {/* Local state disclaimer */}
      <Disclaimer
        // Notice text
        text="Editing works in local demo state only. Changes are saved to this browser's localStorage and are not sent to any server. Backend profile storage is planned for a later phase."
        // Blue informational tone
        tone="sky"
        // Spacing above
        className="mt-6"
      />
    </>
  );
}
