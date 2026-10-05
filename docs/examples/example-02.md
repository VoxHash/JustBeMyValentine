# Example 02 — Sender and recipient modes

## Goal

Generate a shareable token link and open it as a recipient in the same browser.

## Steps

1. Start the local server and open http://127.0.0.1:8080/?sender=true
2. Choose Ocean theme and Bounce animation; save.
3. Click **Generate Shareable Link** and copy the URL (contains `token=`, no `sender=true`).
4. Open that URL in a new tab.

## Expected result

- Recipient tab hides the controls panel and photo upload controls.
- Theme/animation from the saved token payload are applied when present in `localStorage`.
- Yes still leads to the poem page.

## Note

Opening the recipient link on a different device will not load the payload until cloud
sharing lands (see ROADMAP).
