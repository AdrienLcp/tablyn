# Tablyn — Copilot Instructions

Minimalist new tab browser extension — a personal launchpad with customizable shortcuts.

## Tech Stack

- **Framework:** WXT (Vite-based browser extension framework)
- **UI:** React 19 + TypeScript
- **Package manager:** pnpm
- **Linter/Formatter:** Biome (no semicolons, single quotes, no trailing commas, space indent)
- **Target browsers:** Chrome (primary), Edge, Firefox

## Project Structure

```
entrypoints/
└── newtab/          # New tab page (main UI, replaces browser's default new tab)
assets/              # Static assets (icons, images)
public/              # Public files copied to output
.agents/skills/      # Reusable AI skills and coding patterns
wxt.config.ts        # WXT/Vite configuration
```

## Conventions

- All code and comments in English
- Functional React components with hooks
- Keep dependencies minimal — avoid adding libraries unless truly needed
- Follow Biome rules: no semicolons, single quotes, no trailing commas

## Skills

Before writing code, check `.agents/skills/` for relevant patterns and apply them:

- `vercel-composition-patterns` — React composition patterns (compound components, avoid boolean props, explicit variants)
- `vercel-react-best-practices` — Performance optimization (re-renders, async patterns, bundle size, rendering)
- `web-design-guidelines` — UI/UX and accessibility compliance
- `react-aria` — Accessible unstyled UI components (reference only, use if react-aria is added as a dependency)

## Data Storage

Use `browser.storage.local` (via WXT's `storage` utilities) for all user data.

## WXT Notes

- WXT uses convention-based entrypoints: folder names under `entrypoints/` map to manifest entries automatically.
- `newtab/` → `chrome_url_overrides.newtab`
- `popup/` → `action.default_popup`
- `background.ts` → service worker
- `content.ts` → content script
- Edge uses the Chromium engine, so Chrome builds work directly on Edge.
