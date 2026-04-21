# Abstraction boundaries

> Abstract capabilities, not libraries.

## The principle

Draw abstraction boundaries around **business capabilities**, not around **library primitives**. This is the essence of **Hexagonal Architecture** (Ports and Adapters, Alistair Cockburn): the application core depends on a **port** expressed in domain vocabulary (`themeStorage.load`, `themeCss.apply`, `themeMode.detect`), and an **adapter** translates that port into calls to the underlying API (`browser.storage.local`, DOM, `matchMedia`).

Adding a *second*, thinner layer below the adapter — a generic `storage.get()`, a neutral "DOM client", a vendor-agnostic API wrapper — looks like defensive architecture. It is almost always an anti-pattern.

## Where this extension already draws the boundary

Tablyn already implements the right boundary: each feature exposes **pure-TS services** (`theme-storage.ts`, `theme-css.ts`, `theme-mode.ts`) that encapsulate every interaction with the outside world. React components and hooks are thin consumers of those services.

Those services ARE the port. That is already the full hexagonal boundary. Nothing belongs below it.

## Why a second generic wrapper fails

### 1. It leaks

Every browser API has its own vocabulary and semantics:

- `browser.storage.local` — quotas, `QUOTA_BYTES`, `onChanged` events, sync vs local, promise vs callback depending on polyfill.
- `matchMedia` — change listeners, `prefers-color-scheme`, `prefers-reduced-motion`, deprecation paths across browsers.
- `browser.runtime` / `browser.tabs` / `browser.contextMenus` — permissions, manifest v2 ↔ v3 differences, service-worker lifecycle.

A generic `storage.get(key)` wrapper either exposes those primitives (isolating nothing) or flattens them to a common denominator (forcing the feature code to re-implement the rest — quota handling, change detection, invalidation).

### 2. It does not pay off at swap time

If we ever migrate from `browser.storage.local` to IndexedDB, from WXT to a raw manifest, or from React to another framework, the cost lives in the **shape** of the API (sync vs async, transactional vs key-value, event model) — not in the call sites. The rewrite happens at the adapter. A thin wrapper does not save you.

### 3. It carries an ongoing cost

You pay, every day, for:

- extra indirection (harder to read, harder to debug),
- loss of browser-API idioms (change events, quota signals),
- duplicated maintenance when the browser or WXT surface evolves,
- drag on every new feature.

This is textbook **YAGNI** (*You Aren't Gonna Need It*), compounded by a broken promise.

## Where the boundary goes

Draw the boundary at the **domain verb**, not at the **technical verb**.

| Anti-pattern (leaky technical wrapper) | Correct (domain port) |
|---|---|
| `storage.get(key)` / `storage.set(key, value)` | `themeStorage.load()` / `themeStorage.save(theme)` |
| `dom.applyClass(className)` | `themeCss.apply(theme)` |
| `mediaQuery.listen(q, cb)` | `themeMode.onSystemModeChange(cb)` |
| `runtime.sendMessage(msg)` | dedicated feature messaging service |

Each port is the *only* thing components and hooks know. Behind the port, the adapter is free to use every idiom the browser API offers.

## The enforceable rule

**Browser APIs and external libraries may only be imported from `infrastructure/` modules or feature services.** Concretely:

- `browser.*` (`browser.storage`, `browser.runtime`, `browser.tabs`…) → only inside `infrastructure/storage/` or feature services (`*-storage.ts`).
- `window.*`, `document.*`, `matchMedia` → only inside feature services (`*-css.ts`, `*-mode.ts`) or `infrastructure/` modules.
- Any future SDK (analytics, telemetry, auth, sync) → only inside a dedicated adapter module.

Any such import inside a React component (`.tsx`) is a design bug. Fix by moving the call behind an existing service, or introduce the missing one — not by adding a wrapper.

## When a swap does happen

When React gets replaced, WXT gets swapped, or `browser.storage.local` gets migrated to IndexedDB, a hexagonal design delivers exactly what it promised:

- service signatures are untouched,
- components and hooks that consume them are untouched,
- the migration is a rewrite of one adapter per service, contained and reviewable.

## TL;DR

- Abstract **capabilities**, not **libraries**.
- Feature services (`*-storage.ts`, `*-css.ts`, `*-mode.ts`) **are** the boundary — no second, thinner layer underneath.
- Browser APIs live strictly inside services or `infrastructure/`; any leak into a component is a design bug.
- Generic `storage.get()`-style wrappers are leaky, expensive, and do not pay back when the migration actually happens.
