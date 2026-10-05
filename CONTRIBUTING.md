# Contributing to JustBeMyValentine

Thanks for helping improve JustBeMyValentine!

## Code of Conduct

Please read and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Development Setup

```bash
git clone https://github.com/VoxHash/JustBeMyValentine.git
cd JustBeMyValentine

# Serve locally (recommended; some browsers restrict file:// APIs)
python3 -m http.server 8080
# Then open http://127.0.0.1:8080/
```

No npm install or build step is required. Edit HTML/CSS/JS and refresh the browser.

## Branching & Commit Style

- **Branches**: `feature/…`, `fix/…`, `docs/…`, `chore/…`
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

Examples:
- `feat(themes): add midnight rose palette`
- `fix(share): keep recipient controls hidden`
- `docs(usage): clarify sender vs recipient mode`

## Pull Requests

- Link related issues and update docs when behavior changes
- Follow [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)
- Keep diffs focused
- Manually verify `index.html` and `poem.html` in a modern browser
- Check language keys stay aligned across all locales in `languages.js`

## Testing Checklist

- [ ] Theme, language, animation, and sound controls work in sender mode
- [ ] "No" button moves on hover; "Yes" celebrates and opens poem page
- [ ] Photo upload, save, and export succeed
- [ ] Generated share link opens recipient view without edit controls
- [ ] Layout remains usable on a narrow viewport

## Release Process

- Semantic Versioning (MAJOR.MINOR.PATCH)
- Update [CHANGELOG.md](CHANGELOG.md) before release
- Tag releases as `vX.Y.Z` and publish a GitHub Release

## Getting Help

- Check [docs/](docs/) first
- See [SUPPORT.md](SUPPORT.md)
