---
description: Apply the final polish pass to a section - the last 10% that makes it look expensive.
argument-hint: "[page or section]"
---

Polish pass for: **$ARGUMENTS** (default: the section just built). Switch to
Opus-level care. Work through, in order, and fix as you go:

1. **Tokens** - replace any hardcoded color/size with the right semantic token;
   confirm no `--p-*` primitive leaks outside `css/tokens.css`.
2. **Type** - sizes on the scale, tracking pulled in on headings, body capped
   at `--p-measure`, `text-wrap: balance` on headings, no orphans/widows.
3. **Spacing & alignment** - everything on the spacing scale; optical
   alignment; consistent section rhythm.
4. **Interaction states** - hover/focus-visible/active/disabled on every
   interactive element; eased transitions; `prefers-reduced-motion` honored.
5. **Dark mode** - re-check contrast, shadows, and accent legibility.
6. **Detail** - hairline borders, soft shadows, corner radii consistent,
   icon/label alignment, image `alt` + width/height + lazy-loading.
7. **Accessibility** - AA contrast, focus order, landmarks, skip link.

Then re-run `/screenshot-review` to confirm. If it passes, commit with a clear
message and push (Cloudflare will deploy the push).
