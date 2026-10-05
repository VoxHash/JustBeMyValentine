# Architecture

## Overview

JustBeMyValentine is a static multi-page front-end application:

```
Browser
  ├─ index.html  (proposal + controls + modals)
  │    ├─ style.css
  │    ├─ languages.js / themes.js / sounds.js
  │    └─ script.js
  └─ poem.html   (post-acceptance poem scene)
CDN: GSAP, particles.js, html2canvas, Google Fonts
Persistence: window.localStorage (origin scoped)
Hosting: GitHub Pages (optional any static host)
```

## Modes

| Mode | URL shape | UI |
|------|-----------|----|
| Sender | `/` or `?sender=true&token=...` | Full controls |
| Recipient | `?token=...` | Controls hidden; load shared payload |

## Data flow

1. Sender customizes state in memory + `localStorage`.
2. Save/share serializes selected fields under `valentine_<token>`.
3. Recipient page reads that key and applies theme/language/animation/photo.
4. Acceptance triggers celebration animations and navigates to `poem.html`.

## Design choices

- **No build step** keeps contribution and deployment simple.
- **CDN libraries** reduce repo size; require network on first load.
- **localStorage sharing** avoids backend cost but limits cross-device delivery.

## Extension points

- Replace localStorage share with a small API for durable links (see ROADMAP v1.1).
- Add locales in `languages.js` with the same key set as `en`.
- Add themes in `themes.js` and a matching `<option>` in `index.html`.
