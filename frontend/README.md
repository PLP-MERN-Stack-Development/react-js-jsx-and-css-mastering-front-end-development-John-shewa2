# Frontend — React + Tailwind (Week 3)

Short project README for the frontend app included in this repository.

## Overview
A small React (Vite) frontend demonstrating:
- Reusable UI components (Button, Card, Navbar, Footer)
- Task manager with localStorage persistence (custom hook)
- Theme management via Context (light / dark)
- Posts page fetching from JSONPlaceholder with search, pagination, infinite scroll
- Tailwind CSS for styling

## Folder structure
- src/
  - components/ — Button, Card, Navbar, Footer, Taskmanager
  - context/ — ThemeContext (theme provider)
  - hooks/ — useLocalStorage.js (custom hook)
  - pages/ — Posts.jsx (API demo)
  - App.jsx, main.jsx, index.css

## Requirements
- Node.js 16+ (or compatible)
- npm (or yarn/pnpm)

## Setup (Windows)
Open a terminal in the frontend folder:
```bash
cd "c:\Users\yohannessh\Desktop\react-js-jsx-and-css-mastering-front-end-development-John-shewa2\frontend"
npm install
```

## Development
Start the dev server:
```bash
npm run dev
```
Open the URL shown by Vite (usually http://localhost:5173).

## Key scripts (package.json)
- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run preview` — preview built app

## Important files to inspect / edit
- `src/context/ThemeContext.jsx` — theme provider (adds/removes `.dark` on `<html>`)  
- `tailwind.config.js` — must contain `darkMode: 'class'` and appropriate `content` paths  
- `src/index.css` — must include Tailwind directives:
  ``` @import "tailwindcss";
  ```
- `src/hooks/useLocalStorage.js` — custom hook that persists tasks to localStorage  
- `src/components/Taskmanager.jsx` — UI for tasks; uses the hook  
- `src/pages/Posts.jsx` — fetch + display posts (loading, error, pagination, search)

## How theme works
- App is wrapped with `ThemeProvider` in `main.jsx`.
- Toggling in `Navbar` calls `toggleTheme`, which updates the provider state and localStorage and applies/removes `.dark` on `<html>`.
- Components should use Tailwind `dark:` utilities (e.g., `bg-white dark:bg-gray-900`) or read `ThemeContext` if conditional logic is needed.


## Troubleshooting
- If dark mode toggles but UI doesn't change: ensure Tailwind is installed, `tailwind.config.js` has `darkMode: 'class'`, `index.css` includes `@tailwind` directives, and dev server restarted after changes.
- If `prop-types` import errors occur: run `npm install prop-types` in the frontend folder.

## Notes
- This README is minimal. Extend with project-specific instructions, environment variables, CI commands, and design notes as needed.

This front end app was designed for learning purposes.