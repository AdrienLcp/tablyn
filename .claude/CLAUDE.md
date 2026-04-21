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
└── newtab/                        # New tab page (main UI)
    ├── features/                  # Feature-first organized code
    │   └── theme/
    │       ├── components/        # React components (PascalCase .tsx)
    │       ├── theme-context.ts   # Context + types (flat, no context/ subfolder)
    │       ├── theme-domain.ts    # Types, constants, Zod schemas
    │       ├── theme-storage.ts   # Storage service
    │       ├── theme-css.ts       # CSS/DOM manipulation service
    │       └── theme-mode.ts      # System mode detection service
    ├── infrastructure/            # Cross-cutting concerns
    │   ├── i18n/                  # Internationalization
    │   │   ├── components/        # I18nProvider, LocaleSwitcher
    │   │   ├── dictionaries/      # en.ts, fr.ts
    │   │   ├── lib/               # defineTranslation, init
    │   │   ├── i18n-context.ts
    │   │   ├── i18n-locale.ts
    │   │   ├── i18n-storage.ts
    │   │   └── i18n-translate.ts
    │   ├── react/                 # React utilities (create-safe-context)
    │   └── storage/               # Storage abstraction (create-storage)
    ├── presentation/
    │   ├── components/            # Shared UI components (Button, Link, Spinner, Tooltip)
    │   └── styles/                # Sass partials (colors, themes, typography, animations…)
    ├── App.tsx
    ├── index.html
    └── main.tsx
public/                            # Public files (icons)
wxt.config.ts                      # WXT/Vite configuration
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

Use `browser.storage.local` (via WXT's `storage` utilities) for all user data. This keeps data local and synced across sessions without needing a backend. Do NOT use `localStorage` — it is tied to the extension's origin ID which changes on reinstall, causing data loss. The `storage` permission is declared in `wxt.config.ts`.

## Architecture

- **Feature-first**: code organized by feature under `features/<name>/`. Files are flat at the feature root (no `context/` or `services/` sub-folders); only `components/` gets its own sub-folder.
- **Infrastructure layer**: cross-cutting concerns live in `infrastructure/` (i18n, storage abstraction, React utilities). These are not features — they provide shared plumbing.
- **Presentation layer**: shared UI components (`presentation/components/`) and global styles (`presentation/styles/`). Feature-specific components stay in `features/<name>/components/`.
- **UI/Logic separation**: all business logic lives in **framework-agnostic TypeScript services** (pure functions, no React imports). React components and hooks are thin wrappers that consume these services. This ensures portability — if we swap React for another framework, only the UI layer needs rewriting.
  - `features/<name>/components/` — React components (PascalCase `.tsx`)
  - `features/<name>/*-context.ts` — React context definition + types
  - `features/<name>/*-domain.ts` — entities (types), constants, Zod schemas
  - `features/<name>/*-<service>.ts` — pure TS logic (storage, CSS, mode detection…)
- **Abstraction boundaries — the service IS the port.** The pure-TS services above ARE the Ports-and-Adapters boundary with external libraries (`browser.storage`, DOM APIs, `matchMedia`, future SDKs). Do NOT stack a second, generic wrapper underneath them (a unified `storage.get()`, a neutral "DOM client", a vendor-agnostic API client). Such wrappers leak the underlying vocabulary (quotas, events, sync/async semantics, error shapes), do not pay off at swap time (a real migration rewrites the adapter itself, not the call sites), and carry permanent indirection cost — classic YAGNI. Rule: external APIs (`browser.*`, `window.*`, future SDKs) may only be imported from an `infrastructure/` module or a feature service, never from a component. Full rationale in `docs/abstraction-boundaries.md`.

## Conventions

- All code and comments in English
- Functional React components with hooks
- Keep dependencies minimal — avoid adding libraries unless truly needed
- When learning new patterns or project-specific knowledge during development, update this file to preserve that context
- **Biome** is the linter/formatter — no semicolons, single quotes, no trailing commas. Run `pnpm lint:fix` before committing.
- **Arrow functions only** — always use `const fn = () => {}`, never `function fn() {}`. Applies everywhere (components, hooks, services, helpers).
- **`React.FC` for components** — always type React components with `React.FC<Props>` (or `React.FC` / `React.FC<React.PropsWithChildren>` when no custom props). Never inline the props type after the parameter destructuring.
- **`type` over `interface`** — always use `type` for object shapes, never `interface`.
- **DRY types** — derive types from their source of truth whenever possible:
  - From const arrays: `const MODES = ['a', 'b'] as const` → `type Mode = (typeof MODES)[number]`
  - From Zod schemas: `type Theme = z.infer<typeof themeSchema>`
  - Never duplicate a type that can be derived
- **Descriptive variable names** — prefer `storedThemeResult` over `result`, `rawThemeData` over `stored`. Name variables after what they contain.
- **Boolean prefix** — always prefix booleans with `is`, `has`, `can`, `should`, etc. Example: `isLoaded`, `hasError`, `canSubmit`. Never `loaded`, `error`, `open`.
- **Sorted dependency arrays** — React hooks dependency arrays (`useEffect`, `useCallback`, `useMemo`) must be sorted alphabetically.
- **File naming by content** — `.tsx` files export React components and use **PascalCase** (`ThemeProvider.tsx`, `ThemeSwitcher.tsx`). `.ts` files (hooks, contexts, domain, services) use **kebab-case** (`use-theme.ts`, `theme-context.ts`, `theme-domain.ts`).
- **Component-only exports for HMR** — each `.tsx` file must export **only** React components (no contexts, constants, or types mixed in). This is required for React Fast Refresh to work. Separate context creation (`createContext`) and shared types into a dedicated `.ts` file (e.g. `theme-context.ts` for context + types, `ThemeProvider.tsx` for the provider component).
- **Stable callbacks with `useRef`** — when callbacks need to read the latest state without re-creating on every change, store state in a `useRef` and read `ref.current` inside callbacks. This keeps dependency arrays minimal (e.g. `[updateTheme]` instead of `[updateTheme, state]`).
- **No magic numbers** — extract numeric literals into named constants in the domain's `*-constants.ts`.
- **No empty blocks or placeholder comments** — catch blocks must log with `console.warn`/`console.error`. Never leave `// TODO` or empty `{}`.
- **Zod everywhere at boundaries** — validate all external data (storage, API, user input) with Zod schemas. Always use `safeParse()`, never `parse()`. Prefer reusable sub-schemas (e.g. `presetNameSchema`) over duplicating validation logic.
- **Skills**: before writing code, making claims, or auditing features related to a library that has skills documentation, **always** check `.agents/skills/` first. This applies to code, analysis, and recommendations. When the user asks ANYTHING about react-aria (advice, component choice, API question, audit), ALWAYS invoke the `react-aria` skill via the Skill tool before responding. Apply skills when appropriate:
  - `vercel-composition-patterns` — React composition patterns (compound components, avoid boolean props)
  - `vercel-react-best-practices` — Performance optimization (re-renders, async, bundle size)
  - `web-design-guidelines` — UI/UX and accessibility guidelines
  - `react-aria` — Accessible unstyled UI components (use if we add react-aria as a dependency)

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
- [ ] **Export/import config**: Allow users to export all settings and shortcuts as a JSON file, and import from one

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
- ~~Light/dark theme~~ ✓ (implemented: 6 presets × 2 modes, custom accent, system mode detection)
- Drag & drop to reorder shortcuts

### Power User
- Keyboard shortcuts (1-9 to open links directly)
- Import/export settings as JSON
- Open tab counter
