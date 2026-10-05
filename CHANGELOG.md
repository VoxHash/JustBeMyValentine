# Changelog — JustBeMyValentine

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-05

### Added
- Interactive Valentine proposal page with glassmorphism UI (`index.html`)
- Romantic poem follow-up page after acceptance (`poem.html`)
- Particle background (particles.js), GSAP animations, and confetti celebration
- Playful runaway "No" button interactions
- Web Audio API sound effects with enable overlay and toggle (`sounds.js`)
- Multi-language UI for English, Spanish, French, German, Italian, Portuguese, Japanese, and Chinese (`languages.js`)
- Seven color themes plus animation presets (`themes.js`, controls panel)
- Photo upload/personalization, save settings, PNG export (html2canvas)
- Sender/recipient modes with shareable token links and social share modal
- GitHub Pages live demo and README screenshots
- Full documentation kit (README, CONTRIBUTING, ROADMAP, SECURITY, SUPPORT, CODE_OF_CONDUCT, `docs/`, GitHub issue/PR templates)
- Repository `.gitignore` and MIT `LICENSE`

### Changed
- Normalized text file line endings to LF for cross-platform consistency
- Corrected clone URL and documentation links to `VoxHash/JustBeMyValentine`

### Fixed
- README screenshot paths aligned with files under `screenshots/`

### Security
- No server-side secrets required; preferences and photos stay in browser `localStorage`
- Documented localStorage share-token limitation (same-browser / same-origin only)

---

[Unreleased]: https://github.com/VoxHash/JustBeMyValentine/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/VoxHash/JustBeMyValentine/releases/tag/v1.0.0
