---
description: Arrow functions, React.FC, type over interface, derived types, naming, HMR-safe exports, Zod at boundaries
paths:
  - entrypoints/**/*.ts
  - entrypoints/**/*.tsx
---

# Code style

Only the conventions a tool cannot apply for you.

**Biome already auto-fixes, on every `pnpm lint`:** single quotes, no semicolons,
no trailing commas, import grouping, sorted JSX attributes, sorted object keys
and CSS properties, and it errors on `console.log` (`error` / `info` / `warn`
are allowed). None of it is restated here.

## Functions and components

- **Arrow functions only** — `const fn = () => {}`, never `function fn() {}`.
  Everywhere: components, hooks, services, helpers.
- **`React.FC` for components** — `React.FC<Props>`, or `React.FC` /
  `React.FC<React.PropsWithChildren>` when there are no custom props. Never
  inline the props type after the parameter destructuring.
- **Stable callbacks with `useRef`** — when a callback must read the latest
  state without being re-created on every change, keep the state in a `useRef`
  and read `ref.current` inside the callback. The dependency array stays
  minimal (`[updateTheme]` rather than `[updateTheme, state]`).
- **Sorted dependency arrays** — `useEffect` / `useCallback` / `useMemo`
  dependency arrays are sorted alphabetically. Biome does not do this one.

## Types

- **`type` over `interface`** — always, for object shapes.
- **Derive, never duplicate.** A type that can be derived from its source of
  truth is derived from it:
  - const array → `const MODES = ['a', 'b'] as const` /
    `type Mode = (typeof MODES)[number]`
  - Zod schema → `type Theme = z.infer<typeof themeSchema>`

## Naming

- **File naming follows content, not folder.** A `.tsx` file exports React
  components and is **PascalCase** (`ThemeProvider.tsx`, `ThemeSwitcher.tsx`);
  a `.ts` file — hook, context, domain, service — is **kebab-case**
  (`use-theme.ts`, `theme-context.ts`, `theme-domain.ts`).
- **Descriptive variable names** — `storedThemeResult` over `result`,
  `rawThemeData` over `stored`. Name a variable after what it holds.
- **Boolean prefix** — `is`, `has`, `can`, `should`. `isLoaded`, `hasError`,
  `canSubmit` — never `loaded`, `error`, `open`.
- **No magic numbers** — a numeric literal becomes a named constant in the
  feature's `*-domain.ts`.

## Component-only exports, or HMR breaks

Each `.tsx` file exports **only** React components — no context, no constant,
no type alongside them. React Fast Refresh needs it: a file that also exports a
`createContext` result loses its refresh boundary and the whole page reloads.

The split is `theme-context.ts` for the context and its types,
`ThemeProvider.tsx` for the provider component.

## Zod at every boundary

Validate all external data — storage, API, user input — with a Zod schema, and
always with `safeParse()`, never `parse()`. Prefer a reusable sub-schema
(`presetNameSchema`) over duplicating the same validation twice.

## No empty blocks, no placeholders

A `catch` block logs with `console.warn` / `console.error`. Never leave `// TODO`
or an empty `{}` behind.
