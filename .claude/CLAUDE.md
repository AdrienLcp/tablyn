# Tablyn

Minimalist new tab browser extension — a personal launchpad with customizable
shortcuts. Chrome is the primary target; Edge runs the same build, Firefox has
its own.

## Tech stack

WXT (Vite-based extension framework) · React 19 + TypeScript · Zod 4 ·
react-aria-components · Sass · Biome · pnpm.

## Commands

```bash
pnpm dev            # dev server with HMR (Chrome) — pnpm dev:firefox for Firefox
pnpm build          # production build — pnpm build:firefox for Firefox
pnpm zip            # build + zip for store submission
pnpm compile        # tsc --noEmit
pnpm lint           # biome check --fix .
```

## Structure

```
entrypoints/newtab/         the new tab page — the whole product so far
├── features/<name>/        one folder per feature: theme, shortcuts
│   ├── components/         React components, PascalCase .tsx
│   ├── <name>-domain.ts    types, constants, Zod schemas
│   ├── <name>-context.ts   React context + its types
│   └── <name>-<service>.ts pure TS: storage, css, mode detection…
├── infrastructure/         i18n, storage, React utilities — shared plumbing
└── presentation/           components/, styles/, utils/ — shared UI
docs/                       the reasoning; see the pointers below
wxt.config.ts               WXT/Vite config, and where permissions are declared
```

Files sit **flat** at the feature root — no `services/` or `context/`
sub-folder. Only `components/` gets one.

**Business logic lives in framework-agnostic TypeScript services** — pure
functions, no React import. Components and hooks are thin wrappers around them.
That is what makes the UI layer the only thing a framework swap would rewrite.

## Never

- Put user data in `localStorage` — the extension's origin ID changes on
  reinstall and the data is gone. `browser.storage.local`, via WXT's `storage`
  utilities, is the only store
- Import `browser.*`, `window.*`, `document.*`, `matchMedia` or any SDK from a
  component — they belong in a feature service or an `infrastructure/` module
- Stack a generic wrapper *below* a feature service — the service already **is**
  the port
- Write a `function` declaration, or an `interface`, or `parse()` where
  `safeParse()` belongs
- Name a `.tsx` file in kebab-case, or a `.ts` file in PascalCase — the case
  follows the content, not the folder
- Export anything but React components from a `.tsx` file — it breaks Fast
  Refresh
- Add a dependency that a dozen lines would have covered

## Always

- English in everything committed — code, comments, docs, commit messages
- `react-aria-components` for anything interactive, and invoke the `react-aria`
  skill before answering any question about it
- `pnpm lint` before committing

## Read before

- [`docs/abstraction-boundaries.md`](../docs/abstraction-boundaries.md) —
  **before adding any layer, wrapper or "client"**, and before letting a browser
  API into a new place. Says where the boundary already is and why nothing goes
  under it.
- [`docs/wxt-extension.md`](../docs/wxt-extension.md) — **before adding an
  entrypoint or a permission**. How WXT maps folders to the manifest, and what
  `background.ts` / `content.ts` would buy.
- [`docs/roadmap.md`](../docs/roadmap.md) — **before deciding what to build
  next**. MVP checklist and the ideas parked after it.

## When you learn something about this project

Write it down where it will be read, not here:

- triggered by a **file** → `.claude/rules/*.md`, with a `paths:` frontmatter
- triggered by a **moment** → a skill, or a doc named by a pointer above
- a hard constraint that must never be forgotten → one imperative line in this
  file, and the reasoning elsewhere
