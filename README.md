# kravvi.github.io

Online business card of Alexandr Kravvi — graphic and UI/UX designer, photographer, retoucher.

Website: https://kravvi.github.io

![Preview](preview/v.preview%201200x630.jpg)

## About

A personal business card website. A single-page application with three sections and hash-based navigation:

- `#/` — home (name, photograph, description, three navigation buttons)
- `#/portfolio` — portfolio (Bento grid)
- `#/contacts` — contacts (Bento grid)

A fully static website. Hosted on GitHub Pages.

Navigation is built on top of the History API (`history.pushState` / `popstate`), which makes the browser back button and the Telegram Mini App back gesture behave natively: they return to the previous section if history exists, or close the Mini App when there is nowhere left to go. Visual state (which section is open) is still fully derived from the URL hash, so deep links like `#/portfolio` work on cold start.

## Tech Stack

- Plain HTML, CSS, JavaScript (ES5-compatible syntax).
- Almost all code lives in a single file — `index.html` (styles in `<style>`, scripts in `<script>`, plus a minified JSON-LD block in `<head>`). The only exception is basic SEO meta tags, extracted into a separate `seo/seo.js` file loaded with `defer` in `<head>` to keep the main HTML clean.
- External resources — Google Fonts (Bodoni Moda for headings, Manrope for interface) and the official Telegram WebApp SDK (`telegram-web-app.js`). The SDK script is always loaded, but its logic runs only inside a real Telegram Mini App (see below).
- Hosting — GitHub Pages.

## Features

- Multilingual — Russian, English, German. Switcher in the top-right corner, selection persisted in `localStorage`.
- Responsive — four layout contexts, driven by the same media queries used by the layout tuner:
  - `desktop` — >1024px with a fine pointer;
  - `tablet` — 701–1024px, or coarse-pointer devices up to 1366px;
  - `album` — near-square viewports (`aspect-ratio` between `9/10` and `13/10`, up to 1024px wide, coarse-pointer devices up to 1366px);
  - `phone` — ≤700px.
- Animations — smooth appearance of the home page elements, cascading appearance of Bento tiles.
- Glass morphism — translucent tiles with `backdrop-filter: blur()`.
- Dynamic address bar — correct handling of the appearance and hiding of the mobile browser address bar via the `visualViewport` API.
- Image optimization — the hero image is served in WebP (three sizes) via `<picture>` + `srcset`, with a PNG fallback.
- OG preview — a 1200×630 image (`preview/v.preview 1200x630.jpg`) served via `raw.githubusercontent.com` for correct link rendering in messengers and social networks.
- SEO — a unified `sitemap.xml` for the whole domain, `robots.txt`, basic meta tags via `seo/seo.js`, and Schema.org JSON-LD structured data embedded directly in `index.html` (see the SEO section).
- Firefox mobile handling — for Firefox on Android the button size is automatically adjusted.
- History API navigation — section switching goes through `history.pushState`; the `popstate` handler restores the previous view or closes the Mini App. Back button and swipe behave like a native app instead of immediately collapsing the WebView.
- Telegram Mini App — full integration with the Telegram WebApp SDK: strict environment detection, expanded viewport on mobile / `exitFullscreen()` on desktop, safe-area paddings, a native BackButton synchronized with the in-app history, and a ready-gate so the first paint and first layout pass happen only after `tg.ready()` (or a 1200 ms fallback).
- Layout tuner — a hidden built-in panel for tuning CSS variables per layout context, opened with `?tuner=1`. Not user-facing, kept in the codebase as a design tool.

## SEO

- `sitemap.xml` — a single sitemap for the entire domain, located in the repository root. It lists two URLs: `https://kravvi.github.io/` (business card) and `https://kravvi.github.io/archive/` (photo archive). The archive repository keeps no sitemap of its own — it was removed to avoid duplication.
- `robots.txt` — allows all crawlers (`Allow: /`) and points to the unified sitemap: `Sitemap: https://kravvi.github.io/sitemap.xml`.
- `seo/seo.js` — a lightweight script with basic meta tags and social tags only, loaded with `defer` in `<head>`:
  - basic meta tags: a short `description` (for search results / social networks), `keywords`, `author`;
  - `robots` (`index, follow`);
  - `link rel="canonical"` (protection against duplicate URLs);
  - Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`;
  - Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`;
  - the tab title is intentionally not modified by this script;
  - the script no longer builds JSON-LD: the `fullText` variable, the `schema` object and the script-injection logic were removed.
- JSON-LD inside the HTML (for AI crawlers):
  - AI crawlers (GPTBot, ClaudeBot) do not execute JavaScript, so structured data injected by `seo.js` would be invisible to them.
  - The Schema.org JSON-LD block — `ProfilePage` with a nested `Person` (full biography, awards, `sameAs` links, alternate names `Kravvi` / `Alexandr Kravvi`, job titles) — is embedded directly in `<head>` of `index.html`.
  - It is placed right after the `seo/seo.js` include, before the closing `</head>`, and minified into a single line to keep the HTML clean.
  - This guarantees that the author information is readable by both search engines and AI systems, even without JS execution.

## Telegram Mini App

The site detects whether it is running inside Telegram as a Mini App (opened via a `web_app` button) or inside the built-in in-app browser (regular link). Detection is strict:

- `tg.initData` is a non-empty string, or
- the URL hash contains `tgWebAppVersion`.

Only in the first case the `telegram-mini-app` body class is added and the following APIs are used:

- `tg.ready()` — signals the Mini App is ready. The first reveal of the home page and the first layout pass are gated on it (via the `window.kravviMarkTelegramReady` bridge, with a 1200 ms fallback), so layout does not jitter when Telegram fires `viewportChanged` or expands to fullscreen right after load.
- `tg.expand()` and `tg.requestFullscreen()` — called only in mobile mode (Android/iOS or touch mobile-like platforms) so the Mini App occupies the full available height. On desktop platforms the opposite is done: `tg.exitFullscreen()` is called when supported.
- `tg.contentSafeAreaInset.top` — exposed as `--tg-content-safe-area-inset-top` and mixed into `--tg-pad`, so the top UI (logo, language switcher, headers) is offset correctly below Telegram's own header:
  - default (desktop) — `12px + top inset`;
  - phone (≤700px) — `32px + top inset`;
  - tablet (701–1024px, or coarse-pointer devices 701–1366px) — `32px + top inset`.
- `tg.BackButton` — the native back button in the top-left corner of Telegram:
  - hidden on the home screen,
  - shown on `#/portfolio` and `#/contacts`,
  - on click calls `history.back()`, producing a `popstate` event and reverting to the previous view exactly like the system gesture.

In the built-in browser case only `tg.ready()` is called: no fullscreen, no body class, no style overrides — so the page renders identically to a regular mobile browser.

## Layout Tuner

A developer-only panel, activated by adding `?tuner=1` to the URL. It lets you tweak CSS variables live and copy the resulting JSON for the four layout contexts (`desktop`, `tablet`, `album`, `phone`).

`?tuner=0` clears the saved state and disables the tuner for the next load.

The state is persisted in `localStorage` under the key `kravvi-tuner-v22`. The version suffix is bumped whenever the media queries or context list change.

The tuner is not shipped as a user feature, but is intentionally kept in the production build as a design tool.

## Local Storage

Two keys may be used by the site in the browser:

- `lang` — the selected interface language (`ru`, `en`, `de`). Restored on the next visit; falls back to `navigator.language`.
- `kravvi-tuner-v22` — layout tuner state. Written only when the tuner is used (`?tuner=1`).

No tracking, analytics, or third-party cookies are used.

## Known Constraints

- `viewport-fit=cover` is intentionally not used, and `--safe-top` is hard-coded to `0px` (without `env()`). This avoids a spurious top offset inside the Threads in-app browser (`Barcelona`). Do not re-enable `env(safe-area-inset-top)` for the top safe area without re-testing Threads.
- Messengers aggressively cache OG previews; in Telegram the cache can be flushed via `@WebpageBot`.
- Telegram `BackButton` requires Bot API 6.1+.
- SEO data is split between two places: basic meta tags are set via `seo/seo.js`, while the full `ProfilePage` / `Person` JSON-LD markup lives directly in `index.html`. When editing the biography or awards, the text must be kept in sync in both files (the HTML block and the meta tags in `seo.js`). Meta tags from `seo.js` are applied only when JS runs; crawlers without JS still see the static `<head>` tags and the JSON-LD block.

## Repository Structure

```
├── index.html                  ← main file (inline HTML+CSS+JS + JSON-LD in <head>)
├── .nojekyll                   ← disables Jekyll on GitHub Pages
├── README.md
├── robots.txt                  ← Allow: / + link to the unified sitemap
├── sitemap.xml                 ← unified domain sitemap (card + archive)
├── test.html                   ← test file
├── favicon/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   └── favicon.ico             ← legacy fallback, not referenced in HTML
├── images/
│   ├── VV SIte.png             ← original (fallback for <img>)
│   ├── VV 1600x1067.webp       ← primary size
│   ├── VV 1920x1280.webp
│   └── VV 2356x1571.webp
├── preview/
│   └── v.preview 1200x630.jpg  ← OG preview image (served via raw.githubusercontent.com)
└── seo/
    └── seo.js                  ← meta tags, robots, canonical, Open Graph, Twitter Cards (defer)
```


## Deployment

Any commit to the `main` branch is automatically published to GitHub Pages within 1–2 minutes.

Repository settings: Settings → Pages → Source: Deploy from a branch → main → / (root).

## Copyright

© Alexandr Kravvi, 2026.

All texts, any images and photographs on this website — including their processed versions, preview images, and favicons — are the intellectual property of the author. Any copying, reproduction, distribution, publication, or use of these materials, in whole or in part, is prohibited without the prior written permission of the author.
