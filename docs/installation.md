# Installation

JustBeMyValentine needs no package manager and no build toolchain.

## Clone

```bash
git clone https://github.com/VoxHash/JustBeMyValentine.git
cd JustBeMyValentine
```

## Open the app

**Recommended (local server):**

```bash
python3 -m http.server 8080
```

Then visit http://127.0.0.1:8080/

**Alternative:** open `index.html` directly with your OS file opener. Some features
(clipboard, certain audio contexts, export) work more reliably over `http://localhost`.

## System dependencies

| Dependency | Required | Notes |
|------------|----------|-------|
| Modern browser | Yes | backdrop-filter, ES6, Flexbox/Grid |
| Python 3 | Optional | Convenient static server |
| Node.js / npm | No | Not used by the app |
| API keys / `.env` | No | None required |

## CDN dependencies (runtime)

Loaded from the public internet when the page opens:

- GSAP 3.12.2 (cdnjs)
- particles.js 2.0.0 (jsDelivr)
- html2canvas 1.4.1 (cdnjs)
- Google Fonts (Dancing Script, Poppins, Playfair Display)

## GitHub Pages

Production demo is served from GitHub Pages at
https://voxhash.github.io/JustBeMyValentine/
