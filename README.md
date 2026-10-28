# kravvi.github.io

Online business card of Alexandr Kravvi — graphic and UI/UX designer, photographer, retoucher.

**Website:** https://kravvi.github.io

![Preview](preview/preview%201200x630.jpg)

---

## About

A personal business card website. A single-page application with three sections and hash-based navigation:

- `#/` — home (name, photograph, description, three navigation buttons)
- `#/portfolio` — portfolio (Bento grid)
- `#/contacts` — contacts (Bento grid)

A fully static website. Hosted on GitHub Pages.

Navigation is built on top of the **History API** (`history.pushState` / `popstate`), which makes the browser back button and the Telegram Mini App back gesture behave natively: they return to the previous section if history exists, or close the Mini App when there is nowhere left to go. Visual state (which section is open) is still fully derived from the URL hash, so deep links like `#/portfolio` work on cold start.

---

## Tech Stack

- Plain HTML, CSS, JavaScript (ES5-compatible syntax).
- All code in a single file — `index.html` (styles in `<style>`, scripts in `<script>`).
- External resources — Google Fonts (**Bodoni Moda** for headings, **Manrope** for interface) and the official Telegram WebApp SDK (`telegram-web-app.js`, loaded conditionally and used only inside Telegram Mini App).
- Hosting — GitHub Pages.

---

## Features

- **Multilingual** — Russian, English, German. Switcher in the top-right corner, selection persisted in `localStorage`.
- **Responsive** — three breakpoints: mobile (≤700px), tablet (701–1024px), desktop (>1024px).
- **Animations** — smooth appearance of the home page elements, cascading appearance of Bento tiles.
- **Glass morphism** — translucent tiles with `backdrop-filter: blur()`.
- **Dynamic address bar** — correct handling of the appearance and hiding of the mobile browser address bar via the `visualViewport` API.
- **Image optimization** — the hero image is served in WebP (three sizes) via `<picture>` + `srcset`, with a PNG fallback.
- **OG preview** — a 1200×630 image for correct link rendering in messengers and social networks.
- **Firefox mobile handling** — for Firefox on Android the button size is automatically adjusted.
- **History API navigation** — section switching goes through `history.pushState`; the `popstate` handler restores the previous view or closes the Mini App. Back button and swipe behave like a native app instead of immediately collapsing the WebView.
- **Telegram Mini App** — full integration with the Telegram WebApp SDK: strict environment detection, expanded viewport, safe-area paddings, and a native **BackButton** synchronized with the in-app history.

---

## Telegram Mini App

The site detects whether it is running inside Telegram as a **Mini App** (opened via a `web_app` button) or inside the built-in in-app browser (regular link). Detection is strict:

- `tg.initData` is a non-empty string, **or**
- the URL hash contains `tgWebAppVersion`.

Only in the first case the `telegram-mini-app` body class is added and the following APIs are used:

- `tg.ready()` and `tg.expand()` — the Mini App occupies the full available height.
- `tg.requestFullscreen()` — requested when supported.
- `tg.contentSafeAreaInset.top` — exposed as `--tg-content-safe-area-inset-top` and mixed into `--tg-pad`, so the top UI (logo, language switcher, headers) is offset correctly below Telegram's own header on each device class:
  - desktop — `12px + top inset`
  - tablet — `15px + top inset`
  - phone — `32px + top inset`
- `tg.BackButton` — the native back button in the top-left corner of Telegram:
  - hidden on the home screen,
  - shown on `#/portfolio` and `#/contacts`,
  - on click calls `history.back()`, producing a `popstate` event and reverting to the previous view exactly like the system gesture.

In the built-in browser case only `tg.ready()` is called: no fullscreen, no body class, no style overrides — so the page renders identically to a regular mobile browser.

---

## Local Storage

Two keys may be used by the site in the browser:

- `lang` — the selected interface language (`ru`, `en`, `de`). Restored on the next visit; falls back to `navigator.language`.

No tracking, analytics, or third-party cookies are used.

---

## Repository Structure

```
├── index.html ← main file (inline HTML+CSS+JS)  
├── .nojekyll ← disables Jekyll on GitHub Pages  
├── README.md  
├── favicon/  
│ ├── android-chrome-192x192.png  
│ ├── android-chrome-512x512.png  
│ ├── apple-touch-icon.png  
│ ├── favicon-16x16.png  
│ ├── favicon-32x32.png  
│ ├── favicon-48x48.png  
│ └── favicon.ico ← legacy fallback, not referenced in HTML  
├── images/  
│ ├── VV SIte.png ← original (fallback for <img>)  
│ ├── VV 1600x1067.webp ← primary size  
│ ├── VV 1920x1280.webp  
│ └── VV 2356x1571.webp  
└── preview/  
└── preview 1200x630.jpg ← image for OG preview
```

---

## Deployment

Any commit to the `main` branch is automatically published to GitHub Pages within 1–2 minutes.

Repository settings: **Settings → Pages → Source: Deploy from a branch → main → / (root)**.

---

## Copyright

© Alexandr Kravvi, 2026. All rights reserved.

The contents of this repository — source code, design, texts, images, photographs, icons, and any other materials — constitute the intellectual property of the author.

**Use is not permitted.** Any copying, reproduction, distribution, publication, modification, adaptation, incorporation into other projects, or use for commercial or non-commercial purposes, in whole or in part, is prohibited without the prior written permission of the author.

This repository is public solely for technical reasons — to host the website via GitHub Pages. Public access to the source code does not constitute a grant of any license and does not imply a waiver of any copyright.

**No license, express or implied, is granted. All rights are reserved by the author.**
