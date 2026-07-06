# Image generation prompts — what to make and exactly how

The hero, the bio portrait, and the social-share card now use REAL photos
of Dr. Leslie, so those are done. What remains is a short list of
atmospheric images. Generate each one with the prompt given, export at the
stated size, and save it over the stated filename in `assets/images/`.
For image 1 you'll also update three small things on one line of
`index.html` (item 1 says exactly which); images 2 and 3 are optional new
slots — tell me when they exist and I'll wire them in.

## The one that matters (the last placeholder on the homepage)

### 1. `story-arch.jpg` — the chapel-window story image
- **Size:** 1200 × 1500 (portrait, 4:5). Then, on the story image line in
  `index.html`, update the two numbers (`width="1200" height="1500"`) AND
  the `alt="..."` text so it describes the new photo — e.g.
  `alt="Morning light through a tall window onto a wooden chair and an open book"`.
- **Where it appears:** the arch-shaped frame beside "From the spine to
  the spirit." The top of the image shows inside a rounded dome, so the
  subject must sit in the middle/upper-middle of the frame.
- **Prompt:**
  > A quiet photograph taken inside a small sunlit room: warm morning
  > light falling through a tall window across a simple wooden chair and
  > a worn open book, soft shadows on a cream plaster wall. Shot on a
  > 50mm lens at f/2, shallow depth of field, natural window light only,
  > subtle film grain, muted warm palette of cream, terracotta and soft
  > olive. Documentary stillness, nothing staged-looking. No people, no
  > text, no candles arranged in patterns.
- **Reject it if:** surfaces look waxy or plastic, shadows fall in
  impossible directions, the palette turns orange-teal, or it looks like
  a 3D render. It should read like a photo from a film camera.

## Optional beats (nice-to-have, each adds an image moment to the scroll)

### 2. `manifesto-band.jpg` — a thin horizon band under the pull-quote
- **Size:** 2400 × 800 (very wide, 3:1). Tell me when it exists and I'll
  wire the slot in (small, reserved-height addition under the manifesto).
- **Prompt:**
  > A wide, minimal landscape at first light: a soft golden dawn over
  > gentle Carolina countryside, low mist in the tree line, sky occupying
  > most of the frame. 35mm film look, muted warm gold and cream tones,
  > subtle grain, no saturation push. No sun star, no lens flare, no
  > birds, no text.

### 3. `cta-still.jpg` — a small still-life for the dark closing band
- **Size:** 900 × 1100 (4:5-ish). I'll wire it as a quiet inset in the
  closing band's right column.
- **Prompt:**
  > A dark, warm still-life on a wooden table: a vintage radio microphone
  > beside a closed leather notebook, lit by one warm window from the
  > left, deep espresso-brown shadows, highlights in muted gold. Shot on
  > a 50mm at f/2.8, film grain, painterly chiaroscuro but photographic.
  > No people, no logos, no text.

### 4. (Later, for the Story page) the Uganda "Wells for Wells" photos
The two real photos in `assets/images/source/` need their facts confirmed
with Dr. Leslie (where, when, what the project does) before they publish.
Once confirmed, they belong on the Story page, not the homepage.

## Palette the images must live in
- Cream `#F6F1E7` · warm white `#FCF8F0` · espresso `#2E2620`
- Terracotta `#A34E2B` · olive `#5F6138` · gold `#9C7418`
- Warmth over brightness. If an image feels cold or blue, regenerate.

## The anti-AI checklist (reject any image that fails)
- Real-camera language honored: believable depth of field, one light
  source, honest shadows.
- No waxy skin or surfaces, no plastic sheen, no over-smooth gradients.
- No impossible geometry (handles, chair legs, window mullions that
  don't line up).
- No hyper-saturation, no HDR glow, no "digital art" finish.
- Nothing that looks like stock-photo serenity (DESIGN.md forbids it):
  prefer one honest, specific detail over a generic mood.
