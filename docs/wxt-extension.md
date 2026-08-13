# WXT and the extension manifest

Read this before adding an entrypoint, asking for a new permission, or wondering
why a folder ended up in the manifest.

## Entrypoints are conventions, not configuration

WXT maps folder and file names under `entrypoints/` to manifest entries by
itself — nothing is registered by hand:

| Entrypoint | Manifest entry |
|---|---|
| `newtab/` | `chrome_url_overrides.newtab` — replaces the browser's new tab page |
| `popup/` | `action.default_popup` — the small window opened by the extension icon |
| `background.ts` | the service worker |
| `content.ts` | a content script injected into web pages |

An HTML entrypoint needs three files: `index.html`, `main.tsx` (the React
mount), `App.tsx` (the root component).

Edge runs the Chromium engine, so the Chrome build works on Edge as it is —
there is no third build target.

## Entrypoints not built yet, and what each would buy

- **`background.ts`** (service worker) — keyboard shortcuts (Alt+T to open a new
  tab), alarms and timers, messaging between components. Also the only place
  `browser.contextMenus` can be registered.
- **`content.ts`** (content script) — reading page metadata (title, favicon,
  URL) from the active tab. Only useful alongside `background.ts`.
- **"Add to Tablyn" context menu** — right-click any page → add it as a
  shortcut. Needs both: `background.ts` registers the menu item, `content.ts`
  extracts the page info.

## Permissions

Declared in `wxt.config.ts`. `storage` is the only one so far, and it is what
makes `browser.storage.local` available — see `CLAUDE.md` on why user data never
goes to `localStorage`.
