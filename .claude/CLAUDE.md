# Tablyn

Minimalist new tab browser extension — a personal launchpad with customizable shortcuts.

## Tech Stack

- **Framework:** WXT (Vite-based browser extension framework)
- **UI:** React 19 + TypeScript
- **Package manager:** pnpm
- **Target browsers:** Chrome (primary), Edge, Firefox

## Project Structure

```
entrypoints/
└── newtab/          # New tab page (main UI, replaces browser's default new tab)
assets/              # Static assets (icons, images)
public/              # Public files copied to output
wxt.config.ts        # WXT/Vite configuration
```

## Commands

- `pnpm dev` — Start dev server with HMR (Chrome)
- `pnpm dev:firefox` — Start dev server (Firefox)
- `pnpm build` — Production build (Chrome)
- `pnpm build:firefox` — Production build (Firefox)
- `pnpm zip` — Build + zip for store submission
- `pnpm compile` — TypeScript type check
- `pnpm lint` — Run Biome linter
- `pnpm lint:fix` — Run Biome linter with auto-fix
- `pnpm format` — Format code with Biome

## Data Storage

Use `browser.storage.local` (via WXT's `storage` utilities) for all user data. This keeps data local and synced across sessions without needing a backend.

## Conventions

- All code and comments in English
- Functional React components with hooks
- Keep dependencies minimal — avoid adding libraries unless truly needed
- When learning new patterns or project-specific knowledge during development, update this file to preserve that context
- **Biome** is the linter/formatter — no semicolons, single quotes, no trailing commas. Run `pnpm lint:fix` before committing.

## WXT Extension Architecture Notes

- **WXT uses convention-based entrypoints**: folder names under `entrypoints/` map to manifest entries automatically.
  - `newtab/` → `chrome_url_overrides.newtab` (replaces the browser's new tab page)
  - `popup/` → `action.default_popup` (small window opened by clicking the extension icon)
  - `background.ts` → service worker
  - `content.ts` → content script injected into web pages
- Each HTML entrypoint needs: `index.html`, `main.tsx` (React mount), `App.tsx` (root component)
- Edge uses the Chromium engine, so Chrome builds work directly on Edge

## Entrypoints to add later (when needed)

- **`background.ts`** (service worker): for keyboard shortcuts (e.g. Alt+T to open new tab), alarms/timers, or cross-component messaging. Also needed to register context menus (`browser.contextMenus`).
- **`content.ts`** (content script): to extract page metadata (title, favicon, URL) from the active tab. Useful in combination with background.ts.
- **Idea — "Add to Tablyn" context menu**: right-click on any page → "Add this page to Tablyn". Requires both `background.ts` (register the menu item) and `content.ts` (extract page info).

---

## Core Features (MVP)

- [ ] **Shortcut grid**: Display a grid of user-defined shortcuts (name + URL + optional image)
- [ ] **Add/edit/delete shortcuts**: Modal or inline form to manage shortcuts
- [ ] **Custom images**: Allow users to upload or provide a URL for each shortcut's icon/image
- [ ] **Custom favicon**: Let users set a custom favicon for the new tab page
- [ ] **Custom tab title**: Let users change the browser tab title (default: "Tablyn")
- [ ] **Persistent storage**: Save all settings and shortcuts to `browser.storage.local`

## Future Ideas

Features to consider implementing after the MVP:

### Ambiance
- Clock (digital or analog)
- Dynamic greeting ("Good morning" / "Good evening" based on time)
- Customizable background (solid color, gradient, or uploaded image)

### Productivity
- Search bar (Google / DuckDuckGo / custom engine)
- Local weather widget (OpenWeatherMap free API)
- Quote of the day (local JSON or free API)

### Visual Polish
- Light/dark theme (auto based on time or manual toggle)
- Glassmorphism / blur effects on shortcut cards
- Drag & drop to reorder shortcuts

### Power User
- Keyboard shortcuts (1-9 to open links directly)
- Import/export settings as JSON
- Open tab counter
