# Security Policy

## Reporting a Vulnerability

Email **contact@voxhash.dev** with details and reproduction steps. Do not open a public issue for sensitive reports.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Notes

- This project is a static front-end app; it does not require API keys or server secrets.
- User photos and preferences are stored in browser `localStorage` (origin-scoped).
- Share tokens identify saved settings in `localStorage` only — they are not a server-side auth mechanism.
- Avoid committing personal photos or exported PNGs containing private images.

---

*Last Updated: October 5, 2026*
