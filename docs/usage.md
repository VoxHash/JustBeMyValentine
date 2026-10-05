# Usage

## Basic proposal flow

1. Open `index.html` (sender mode by default).
2. Customize theme, language, animation, sound, and optional photo.
3. Ask your Valentine to click **Yes**.
4. Celebration plays; the browser navigates to `poem.html`.

## Sender workflow

1. Load the page without a recipient-only token (or with `sender=true`).
2. Customize the experience.
3. Click **Save** to persist settings locally.
4. Click **Generate Shareable Link** (or **Share** in sender mode) to copy a
   `?token=...` URL for the recipient.
5. Optionally **Export** a PNG of the proposal card.

## Recipient workflow

1. Open a URL like `index.html?token=<token>` (no `sender=true`).
2. Editing controls are hidden.
3. Settings/photo load from `localStorage` if that token was saved in the same browser origin.
4. Interact with Yes/No and view the poem after accepting.

## Important limitation

Share tokens do **not** upload data to a server. A recipient on another device will not
see the sender's photo/settings unless you add a backend (planned) or transfer storage.

## Social sharing

In recipient mode, **Share** opens Facebook / Twitter / WhatsApp / copy-link actions.
In sender mode, **Share** focuses on generating the recipient link.
