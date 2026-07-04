---
description: Final polish pass on a section — the last 10% that makes it look expensive.
argument-hint: "[page or section]"
---

Polish pass for: **$ARGUMENTS** (default: the section just built). Opus-level care. In order: tokens (no hardcoded values; no `--p-*` color primitive outside `tokens.css`); type (scale, tracking, `--p-measure`, balance, no orphans); spacing & alignment on the scale; interaction states on every interactive element with eased transitions and `prefers-reduced-motion`; dark-mode contrast/shadows/accent; detail (hairline borders, soft shadows, consistent radii, image `alt` + width/height + lazy-load); accessibility (AA, focus order, landmarks, skip link).

Then re-run `/screenshot-review`. If it passes, commit with a clear message and push.
