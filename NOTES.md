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
- [x] Step 3 — first direction: Dawn Gold (cream/oak/gold, Cormorant + Hanken).
      SUPERSEDED by the art-direction pass below.
- [x] **Art-direction pass — direction re-locked: "FREQUENCY & FAITH"**
      (warm editorial modernism). Bricolage Grotesque (variable) leads;
      Fraunces (variable, SOFT/WONK) is the rationed serif soul accent;
      Hanken body. Accent = Kiln Terracotta, not gold. Signature: the home
      hero "frequency" in Fraunces italic terracotta on an all-grotesque line.
      Home page reworked + design-reviewer verdict **Ship**; Lighthouse
      100 a11y/BP/SEO; LCP 160ms, CLS 0.00. Remaining 6 pages: palette/fonts
      re-skinned by the token swap, per-page craft (hero signatures, reveals,
      whitespace) still PENDING.
- [x] **Palette swap (client-directed): PLUM / SAGE / near-blacks / gold.**
      Layer-1 only + one new narrow --color-signature token. Accent terracotta
      → plum #8E4162; neutrals oak/clay → sage-tinted (stone-200 = the literal
      sage #DBDFAC, used as border only — it fails AA as any foreground);
      near-blacks split by role (#222725 = light ink AND dark card surface;
      #0D1321 = dark canvas only); gold = antique brass #755918/#D9B34E,
      reserved for the .hl-accent signature word ALONE. Two files touched
      (tokens.css + one line in site.css). Design-reviewer: **Ship**;
      Lighthouse 100 a11y/BP/SEO on home + speaking. Fonts/layout/motion
      unchanged. SUPERSEDED by the re-look below (client rejected plum).
- [x] **HOMEPAGE RE-LOOK: "WARM EARTHY EDITORIAL"** (client redirected to
      warm serif-led, photography-forward references — Mind-Body / María).
      Palette: terracotta primary + OLIVE second accent (--color-secondary,
      a real legible foreground) + cream/espresso neutrals + warm gold for the
      one signature word. Type FLIPPED to serif-led: Fraunces now leads as
      display/heading (--font-heading repointed; Bricolage retired). Pill
      buttons. Homepage REBUILT into editorial modules: split hero, press
      strip, stats/credibility band (big Fraunces numbers on an olive band),
      offerings, editorial story band with an ARCH (chapel-window) image,
      manifesto pull-quote, events feed, monogram bio, dark CTA. Design-
      reviewer: **Ship**; Lighthouse 100 a11y/BP/SEO. Imagery: hero + arch are
      atmospheric PLACEHOLDERS (one dawn photo, flipped) — client will supply
      generated finals to the shot list in the plan file; slots are reserved
      (fixed aspect, no CLS). The 6 non-home pages now inherit the warm palette
      + serif headings automatically; their editorial per-page craft is PENDING.
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

- **The local preview server must be THREADED.** A single-threaded
  `socketserver.TCPServer` no-cache server deadlocks on a browser's parallel
  requests (curl works, page loads/screenshots hang). Use
  `http.server.ThreadingHTTPServer`. (`python3 -m http.server` is already
  threaded; a hand-rolled one is not unless you say so.)
- **Every new semantic token needs a dark-mode override if it's a surface.**
  `--color-secondary-soft` (olive tint) had no dark value, so the dark stats
  band stayed a LIGHT band while its text flipped light → invisible. Added
  --p-olive-900 + the override. Check any *-soft/tint token in both modes.
- **chrome-devtools screenshot/Lighthouse need the tab foregrounded and a
  single tab.** NO_FCP and capture timeouts cleared after closing the
  duplicate tab and `select_page(bringToFront)`. Playwright was the more
  reliable screenshotter for the tall full-page captures.
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

## Art-direction (Frequency & Faith) — decisions

- Layer-1 only, with ONE documented Layer-2 exception: a grotesque-led
  direction re-maps the heading role (--font-heading → display) and adds a new
  --font-accent → Fraunces. A pure value-swap can't express a role change;
  component layer untouched. Flagged inline in tokens.css.
- Fonts self-hosted VARIABLE woff2, subset from the GitHub source TTFs with
  fonttools (pip-installed this session) so the real axes survive — the Google
  /css2 API would flatten SOFT/WONK/opsz/wdth to a plain instance. Bricolage +
  Hanken preload; Fraunces (roman + italic) is the lazy accent, not preloaded.
- Palette AA re-verified numerically before painting; Lighthouse then caught
  two soft-wash squeakers (terracotta link on accent-100 = 4.27, ember on
  accent-900 dark = 4.42). Fixed by lightening accent-100 and deepening
  accent-900. Ratios documented in tokens.css.
- Signature discipline ("spend boldness once"): Fraunces appears ONLY in the
  hero "frequency" word, the wordmark/footer brand, and pull-quotes/testimony.
  Terracotta only on the star, primary CTA, links, and the accent word.
- Motion: css/site.css `.reveal`/`.in` + js/reveal.js (IntersectionObserver,
  per-element --i stagger). `html.js` set by a one-line inline head script so
  nothing flashes; no-JS and reduced-motion both show everything at rest.

## Lessons (art-direction pass, one per note)

- **A grotesque-led rebrand can't be a pure Layer-1 swap.** When the heading
  role itself changes families, you must repoint the semantic role; keep it to
  one documented line and leave the component layer alone.
- **Self-host variable fonts from the GitHub source, never /css2.** The Google
  CSS API silently serves single-instance files; the whole signature (SOFT/WONK
  soft terminals) collapses to a plain italic. `python3 -m fontTools.subset
  --flavor=woff2` keeps the axes; confirm with fvar afterwards.
- **Re-run Lighthouse after any palette change.** Numeric pre-checks miss the
  accent-on-soft-wash pairings; both squeakers were on the announcement chip
  in each mode, invisible until audited.

## Open questions

- Which GitHub account hosts the repo at handover (currently anonymous03user)?
- Parts 2 and 3 subtitles/dates, session pricing, DD granting institution,
  audience-reach figure: all flagged in the UI, awaiting the client.
