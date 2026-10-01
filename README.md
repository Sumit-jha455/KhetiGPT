# KhetiGPT – Frontend (React + Vite)

**KhetiGPT** · _AI-Powered Personal Farming Assistant_
**Tagline:** Smarter Farming. Better Decisions.

This folder contains the **frontend MVP** of KhetiGPT, an academic mini project. It is a complete,
responsive single-page application built with React, Vite and Tailwind CSS. The app currently runs
on **mock/static sample data only** — the backend, MongoDB, Gemini API and Weather API are planned
for a later phase and are **not** integrated yet.

---

## Tech Stack

| Purpose            | Technology                     |
| ------------------ | ------------------------------ |
| UI library         | React 19                       |
| Build tool         | Vite                           |
| Routing            | React Router (hash routing)    |
| Styling            | Tailwind CSS v4 (`@tailwindcss/vite`) |
| HTTP client (ready)| Axios (configured, not used yet) |
| Icons              | Lucide React                   |

> Tailwind v4 is configured directly inside `src/index.css` with the `@theme` directive.
> There is **no** `tailwind.config.js` file and no `postcss.config.js` file — that is expected for v4.

---

## Folder Structure

```
client/
├── public/
│   └── favicon.svg          # Browser tab icon
├── src/
│   ├── assets/              # logo.svg used by the Logo component
│   ├── components/          # Reusable UI building blocks
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Badge.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx        # Landing page navbar
│   │   ├── Sidebar.jsx       # Desktop app sidebar
│   │   ├── Topbar.jsx        # App topbar
│   │   ├── MobileNav.jsx     # Mobile bottom navigation + services sheet
│   │   ├── Modal.jsx
│   │   ├── PageHeader.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingState.jsx
│   │   ├── Disclaimer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/
│   │   ├── PublicLayout.jsx      # Navbar + Outlet + Footer
│   │   ├── AuthLayout.jsx        # Split screen login/register shell
│   │   └── DashboardLayout.jsx   # Sidebar + Topbar + Outlet + MobileNav
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Assistant.jsx
│   │   ├── Weather.jsx
│   │   ├── CropRecommendation.jsx
│   │   ├── Fertilizer.jsx
│   │   ├── Schemes.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── services/            # Future API layer (mock implementations)
│   │   ├── api.js           # Axios instance + endpoint map
│   │   ├── assistantService.js
│   │   ├── weatherService.js
│   │   ├── cropService.js
│   │   └── schemesService.js
│   ├── data/                # All mock data (kept out of components)
│   │   ├── farmProfile.js
│   │   ├── mockWeather.js
│   │   ├── mockCrops.js
│   │   ├── mockFertilizer.js
│   │   ├── mockSchemes.js
│   │   ├── mockAssistant.js
│   │   └── navigation.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useDocumentTitle.js
│   ├── context/
│   │   └── AppContext.jsx   # Demo session + farmer profile state
│   ├── utils/
│   │   ├── cn.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── App.jsx              # Route table
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind v4 theme + base styles
├── index.html
├── package.json
└── vite.config.js
```

---

## Routes

| Route                   | Page                  | Description                                      |
| ----------------------- | --------------------- | ------------------------------------------------ |
| `/`                     | Landing               | Hero, features, how it works, why KhetiGPT, CTA |
| `/login`                | Login                 | Demo login (client-side validation only)         |
| `/register`             | Register              | Demo registration (client-side validation)      |
| `/dashboard`            | Dashboard             | Greeting, farm overview, quick services, weather|
| `/assistant`            | AI Assistant          | Chat UI with local keyword response engine      |
| `/weather`              | Weather               | Current conditions + 5-day sample forecast      |
| `/crop-recommendation`  | Crop Recommendation   | Form + rule-based demo suggestion               |
| `/fertilizer`           | Fertilizer Guidance   | Nutrient info + stage-wise sample guidance      |
| `/schemes`              | Government Schemes    | Search + category filter + details modal        |
| `/profile`              | Profile               | Personal + farm information, local editing      |
| `/settings`             | Settings              | Demo preferences and project information        |
| `*`                     | NotFound              | Friendly 404 screen                             |

`HashRouter` is used on purpose so that every route works when the app is opened as a static
`index.html` file (no server rewrite rules needed, no refresh errors).

---

## Getting Started

```bash
# install dependencies
npm install

# start the development server
npm run dev

# create a production build
npm run build

# preview the production build
npm run preview
```

---

## Demo Mode Notes

- **Authentication** is not implemented. Any valid email + password (6 characters) opens the
  dashboard, and registration only stores the profile in `localStorage`.
- **AI Assistant** replies come from a local keyword rule list in `src/data/mockAssistant.js`.
  No Gemini API call is made.
- **Weather** values are hardcoded sample values in `src/data/mockWeather.js`.
- **Crop recommendation** is produced by a scoring function in `src/data/mockCrops.js`.
- **Fertilizer** and **Schemes** content is static sample text.
- Every module carries a visible disclaimer stating that the data is sample data for academic
  demonstration, and nothing is presented as professional agricultural advice.

## Planned Next Phase

1. Express backend (`server/`) with REST endpoints matching `src/services/api.js`
2. MongoDB storage for users and farm profiles
3. Gemini API integration for the assistant
4. Weather API integration
5. JWT based authentication

## Git Safety

`node_modules/`, `.env` and `.env.*` are ignored by the `.gitignore` file. No API keys are stored
in this repository.

---

© KhetiGPT · Academic Mini Project
