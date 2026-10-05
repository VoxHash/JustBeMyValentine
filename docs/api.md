# API / Front-end Modules

This project exposes browser globals (no bundler), not an HTTP API.

## `languages.js`

- **`translations`**: map of locale code → UI strings (`title`, `yesBtn`, `noBtn`, …).

## `themes.js`

- **`themes`**: map of theme id → `{ name, gradient, particleColor, heartGradient, titleGradient }`.

## `sounds.js`

- **`SoundManager`**: Web Audio helper
  - `resumeAudioContext()`
  - `playHeartbeat()`, `playButtonClick()`, `playCelebration()`, `playNoButton()`
  - `toggleSounds()`, `setSoundsEnabled(boolean)`

## `script.js` (main controller)

Notable responsibilities:

- Sender/recipient mode via URL params (`sender`, `token`)
- Theme / language / animation application
- Photo upload, compression, display
- Share link generation and social share modal
- Save / export (`exportAsImage` via html2canvas)
- Yes/No interactions, confetti, navigation to `poem.html`

## Storage keys

| Key | Purpose |
|-----|---------|
| `language`, `theme`, `animation` | UI preferences |
| `valentinePhoto` | Last uploaded photo data URL |
| `valentine_<token>` | Share payload for a token |

There is no REST/GraphQL backend in v1.0.0.
