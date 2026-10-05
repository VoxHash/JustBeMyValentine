# Getting Started

## Who this is for

Anyone who wants a playful, customizable digital Valentine proposal to open in a browser
or share via a link on the same device/browser storage.

## Prerequisites

- A modern browser (Chrome 76+, Firefox 103+, Safari 9+, Edge 79+)
- Optional: Python 3 or any static file server for local development
- Network access for CDN libraries (GSAP, particles.js, html2canvas, Google Fonts)

## First run

1. Clone the repository (see [installation.md](installation.md)).
2. Open `index.html` via a local static server.
3. Click to enable audio (browser autoplay policy).
4. Customize language, theme, animation, and optional photo.
5. Click **Generate Shareable Link** / **Share**, or click **Yes** to open the poem page.

## Sender vs recipient

- **Sender mode** (default, or `?sender=true`): shows controls, photo upload, save/export.
- **Recipient mode** (`?token=...` without `sender=true`): hides editing controls and loads
  settings saved under that token in `localStorage`.

## Environment variables

None. This is a static site with no backend and no required secrets.

## Next steps

- [usage.md](usage.md)
- [configuration.md](configuration.md)
- [examples/example-01.md](examples/example-01.md)
