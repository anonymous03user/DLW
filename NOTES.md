# NOTES — DLW build log

Running log of decisions and progress. Keep it current; a fresh session should
be able to read this and know exactly where things stand.

## Status

- [x] Step 1 — repo scaffolding (tokens, base, CLAUDE.md, DESIGN.md, .claude).
- [x] Repo live at github.com/anonymous03user/DLW, Cloudflare Pages connected.
      Working copy attached to the remote; all work on the `preview` branch
      (merge `preview` → `main` to go live).
- [x] Step 2 — content model in `/data`: offerings, events, announcements,
      bio, site. Renderers in `js/render.js` (data-* hooks, DOM-built, no
      innerHTML), nav behavior in `js/nav.js`.
- [x] Step 3 — direction locked: **Dawn Gold** (cream paper, oak ink,
      burnished gold, Cormorant Garamond + Hanken Grotesk; daylight sister of
      the Faith Consciousness site). Full 7-page core. Monogram, no portrait.
- [x] Step 4 — all seven pages built: index, story, speaking, healing-events,
      sessions, retreats, book-dr-leslie. Plus 404, sitemap.xml, robots.txt.
- [x] Step 5 — editable feed verified end-to-end in the browser: edited
      announcements.json, reloaded, the home banner showed the change; events
      feed renders on home (limit 3) and retreats (full); bio + site fields
      fill their spots. Form flow verified: ?topic= preselect and demo submit
      to a role=status success panel.
- [ ] Step 6 — Pages CMS: SKIPPED for this demo (no real login/invite). The
      /data model maps 1:1 to CMS collections when it happens.
- [x] Step 7 — reviews + audits done. Three design-review passes (home:
      "Fix first" → fixed; story+speaking: "Ship"; final four: "Fix first" →
      all five items fixed). Lighthouse on home, retreats, book-dr-leslie:
      100 accessibility / 100 best-practices / 100 SEO each, 0 failed audits.
- [ ] Step 8 — handover + Care plan (client launch only; not part of demo).

## Decisions

- Stack: plain static HTML + Cloudflare Pages (+ Pages CMS later). No build.
- Dawn Gold = Layer-1 swap; the only semantic-layer edits were accessibility
  fixes, each with an inline comment: text-subtle remap, --color-border-input
  (form boundaries, 3:1), dark-mode --color-danger override.
- accent-600 finalized at #816017: it must clear 4.5:1 on every LIGHT surface
  it sits on, including tinted ones (gold-wash chip, surface-alt bands), not
  just the page background. Ratios documented in tokens.css.
- Fonts: FC demo's subset woff2, self-hosted, swap, two faces preloaded.
- Hero stays typographic (text LCP); horizon photo is a 142KB lazy band.
- bio.json: empty `headshot` = monogram; a path = photo. One-field swap.
- events.json renderer auto-hides past dates; `tentative: true` renders a
  visible "Date to be confirmed" pill.
- Demo stubs are dashed, labeled panels (.stub); the inquiry form is a
  client-side demo submit with an explicit "does not send" note.
- Copy rules: no em dashes in visible copy (code comments exempt); her real
  language only; no "New Thought"; the 2025 healing story only as her own
  attributed account (reported speech until she supplies verbatim words).

## Lessons (one per note)

- **Local copy wasn't a clone.** git init + remote add + `git reset --mixed
  origin/main` attaches a matching folder to an existing repo without
  touching files.
- **Compute contrast before painting.** Numeric WCAG checks on the palette
  caught the focus-ring primitive before any rework.
- **Check link colors on every surface they sit on.** accent-600 passed on
  cream but failed on the tinted chip/band backgrounds (4.06:1); Lighthouse
  caught what the per-background math missed.
- **State selectors can leak into components.** The `[aria-current="page"]`
  nav styling repainted the header CTA button's text on its own page
  (2.8:1); scope state rules with :not(.btn).
- **Form fields need 3:1 boundaries against their container.** Hairline
  borders that look elegant on cards are invisible in dark mode; a
  dedicated --color-border-input (stone-500 works in both modes) fixed it.
- **Preview harness can't reach macOS TCC paths (Desktop/iCloud).** Serve
  with a background python http.server via the shell and drive screenshots
  through the Chrome DevTools MCP instead.
- **chrome-devtools `emulate` resets what you omit.** Passing colorScheme
  alone silently dropped the 390px viewport and produced desktop shots
  mislabeled as mobile; always pass viewport + colorScheme together.
- **Never quote first-person words she didn't say.** The testimony started
  as an invented first-person blockquote; converted to reported speech with
  only her attributed phrases. Verbatim telling is a client-supplied fact.

## Open questions

- Which GitHub account hosts the repo at handover (currently anonymous03user)?
- Parts 2 and 3 subtitles/dates, session pricing, DD granting institution,
  audience-reach figure: all flagged in the UI, awaiting the client.
