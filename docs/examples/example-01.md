# Example 01 — Local personalized proposal

## Goal

Run the app locally, apply Romantic theme + Spanish UI, upload a photo, and export a PNG.

## Steps

```bash
git clone https://github.com/VoxHash/JustBeMyValentine.git
cd JustBeMyValentine
python3 -m http.server 8080
```

1. Open http://127.0.0.1:8080/
2. Enable audio.
3. Set **Language** to Español and **Theme** to Romantic.
4. Click **Upload Photo** and choose an image.
5. Click **Export** to download a PNG.
6. Click **Yes** to verify celebration and poem navigation.

## Expected result

Spanish copy appears, romantic palette is applied, photo shows above the heart,
export downloads, and `poem.html` opens after acceptance.
