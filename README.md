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

---

## Tech Stack

- Plain HTML, CSS, JavaScript (ES5-compatible syntax).
- All code in a single file — `index.html` (styles in `<style>`, scripts in `<script>`).
- External resource — Google Fonts only: **Bodoni Moda** (heading) and **Manrope** (interface).
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

---

## Repository Structure

├── index.html main file (the entire application code)
├── .nojekyll disables Jekyll processing on GitHub Pages
├── README.md this file
├── favicon/ icons
│ ├── android-chrome-192x192.png
│ ├── android-chrome-512x512.png
│ ├── apple-touch-icon.png
│ ├── favicon-16x16.png
│ ├── favicon-32x32.png
│ ├── favicon-48x48.png
│ └── favicon.ico
├── images/ home page images
│ ├── VV SIte.png original (PNG fallback)
│ ├── VV 1600x1067.webp
│ ├── VV 1920x1280.webp
│ └── VV 2356x1571.webp
└── preview/ image for the OG preview
└── preview 1200x630.jpg

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
