# Configuration

Preferences are controlled in the on-page controls panel (sender mode) and persisted
to `localStorage`.

## UI controls

| Setting | Storage key | Default | Options |
|---------|-------------|---------|---------|
| Language | `language` | `en` | `en`, `es`, `fr`, `de`, `it`, `pt`, `ja`, `zh` |
| Theme | `theme` | `default` | `default`, `romantic`, `sunset`, `ocean`, `forest`, `purple`, `dark` |
| Animation | `animation` | `default` | `default`, `bounce`, `float`, `pulse`, `rotate`, `wave` |
| Sound | checkbox + SoundManager | enabled | on/off |
| Photo | `valentinePhoto` / share payload | none | image file chosen by user |

## Share payload

Sender save/share writes `valentine_<token>` in `localStorage` with theme, language,
animation, photo data URL, and timestamp.

## Code-level defaults

| Component | Location | Default |
|-----------|----------|---------|
| Particle count | `script.js` particles config | `50` |
| Particle color | theme `particleColor` | `#ff4757` (default theme) |
| Heartbeat duration | `style.css` | `1.4s` |
| Glass blur | `style.css` `.container` | `20px` |

## Environment variables

None. Do not add secrets to the static front end.
