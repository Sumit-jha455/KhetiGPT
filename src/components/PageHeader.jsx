// Import the Badge component used for the optional eyebrow label
import Badge from "./Badge";

/**
 * PageHeader - consistent title block at the top of every app page.
 * Shows an eyebrow badge, the page title, a description and an action slot.
 */
export default function PageHeader({ eyebrow, title, description, action, icon: Icon }) {
  return (
    // Header landmark gives screen readers a page level landmark
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Left column: badge + title + description */}
      <div className="min-w-0">
        {/* Optional small label above the title */}
        {eyebrow ? (
          <div className="mb-2">
            {/* Badge renders the label; the title attribute aids screen readers */}
            <Badge tone="brand" title="Module label">
              {/* Eyebrow text */}
              {eyebrow}
            </Badge>
          </div>
        ) : null}

        {/* Page title row with an optional icon */}
        <div className="flex items-center gap-2.5">
          {/* Render the module icon when one is supplied */}
          {Icon ? (
            // Icon tile with a light green background
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              {/* The lucide icon component */}
              <Icon size={20} aria-hidden="true" />
            </span>
          ) : null}
          {/* The main heading of the page */}
          <h1 className="truncate text-xl font-bold text-brand-950 sm:text-2xl">{title}</h1>
        </div>

        {/* Short description under the title */}
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            {/* Description content */}
            {description}
          </p>
        ) : null}
      </div>

      {/* Right column: primary action button for the page */}
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
