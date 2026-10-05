# Troubleshooting

## Blank page / styles missing

- Confirm you opened the app through a static server from the project root, not a random path.
- Check the browser network tab for failed `style.css` / `script.js` loads.

## No sound

- Click **Enable Audio** (browsers block autoplay until a gesture).
- Ensure the Sound checkbox is enabled.
- Some browsers require a local/http origin rather than restrictive `file://` contexts.

## Share link does not show my photo on another phone

Expected in v1.0.0: payloads live in the sender browser's `localStorage`.
Use export/PNG or wait for cloud share links (ROADMAP v1.1).

## Export PNG is empty or clipped

- Wait for fonts/images to finish loading before exporting.
- Try Chrome/Edge; allow downloads.
- Hide overlapping modals first.

## "No" button hard to click

By design it moves on hover. Keep trying — or resize the window if it leaves the viewport edge.

## CDN scripts blocked

Corporate networks or offline mode can block cdnjs/jsDelivr/Google Fonts.
Restore network access or vendor those files locally.

## Particles or animations missing

Confirm GSAP and particles.js returned HTTP 200. Disable aggressive content blockers for the page.
