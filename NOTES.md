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
- [x] **HERO RE-LOOK: "HERE I AM" (real photos of Dr. Leslie).** Client
      supplied real photos + a research dossier and asked that SHE be the
      first thing seen (not a tagline). Modeled on Gabby Bernstein's hero.
      Hero is now her die-cut portrait (background removed with `rembg`
      u2net_human_seg + a Pillow alpha erosion/feather pass) grounded at the
      base of a warm blush field (--color-primary-soft), beside a plain
      headline "Hi, I'm Dr. Leslie.", one sentence in her own language, one
      prominent pill CTA + a quiet text link. Her tagline "where faith meets
      frequency" demoted to the olive eyebrow; the announcement chip moved
      BELOW the CTA so the headline always leads. MOBILE reorders the portrait
      FIRST (order:-1, 48vh) so her face is the first thing on a phone. The
      "Meet Dr. Leslie" monogram card swapped for her real close-up portrait
      via the bio.json `headshot` one-field swap. Hero served as WebP (54KB)
      via <picture> + PNG fallback, preloaded fetchpriority=high. New branded
      1200x630 og-home.jpg (her cutout + Fraunces name) replaces the old dawn
      og:image. Integrity note: these are her REAL photos, so the earlier "no
      fabricated face" constraint is satisfied by real imagery, not avoidance.
      STILL PENDING: the story-band arch is the last dawn placeholder; the two
      Uganda "Wells for Wells" photos need their own home + confirmed facts
      before publishing.
- [x] **PREMIUM-RUBRIC AUDIT + SIX IMPROVEMENT BATCHES.** A 16-agent panel
      (one grader + one skeptic per criterion) graded the homepage A-F
      against the client's 8 premium criteria (POV B+, Type A-, Color A-,
      Hierarchy B+, Imagery D+, Motion B+, Mobile B+, Invisible A). Client
      approved all six fix batches; all implemented:
      (1) COLOR — gold brightened to #9C7418 (display-size-only, 3:1+),
      stats tints made chromatic (#DEDFB8/#313423), dark-page CTA band gets
      a deep-ember surface, kicker star + .star now olive (terracotta =
      interactive ONLY). (2) VOICE — h1/h2 carry the display axes (bigger =
      lighter), caps tracking token 0.11em for all micro-labels, offer cards
      became an editorial index (Fraunces 01-04 numerals + full-width
      featured card via "featured": true in offerings.json), manifesto
      scaled to 4xl + hanging star + THE one gold word ("you"), CTA band
      editorial split (left headline / right action colophon), bio portrait
      in the chapel arch, footer voice-line colophon. (3) MOTION — authored
      beats (portrait settle, arch scale-settle, gold bloom one beat late),
      JSON-rendered content joins the choreography (window.__reveal hook),
      will-change released after entrance, eased mobile menu + scrim,
      header scroll shadow; reduced-motion neutralizes all of it.
      (4) MOBILE — story text before image, fluid section spacing
      (~57px at 390 / 96px desktop via clamp tokens), two-column press
      ledger, sms: tappable phone everywhere, responsive announce
      reservation. (5) INVISIBLE — color-scheme + theme-color on all pages,
      italic Fraunces preloaded (the gold word's face), apple-touch-icon
      (Pillow-drawn), og-home.jpg on every page with full og/twitter tags,
      focus-trapped mobile menu, favicon repainted to current palette,
      deleted both duplicate dawn photos (no dangling refs). (6) IMAGERY —
      docs/IMAGE_PROMPTS.md gives the owner exact per-slot generation
      prompts (sizes, filenames, palette hexes, anti-AI checklist); the
      story arch is the ONLY placeholder left. Verified: Lighthouse 100
      a11y/BP/SEO desktop AND mobile (0 failed), every new pairing
      contrast-computed before painting, 8-agent verify panel + design gate.
      The panel found 4 blockers, all fixed: (a) six non-interactive
      terracotta decorations on the five interior pages -> olive (the
      "terracotta = clickable" sweep had stopped at the homepage);
      (b) eight subpage micro-labels still at the old 0.06em tracking ->
      caps token; (c) untruthful story-arch alt text -> describes the real
      photo; (d) the manifesto cite box was ~300px off the quote's center
      axis (p max-width pinned it left) -> margin-inline auto. Plus panel
      polish: dark-mode --color-warning (amber-300, 4.53:1 on the dark
      stats band), dormant monogram retuned olive, focus-visibility timing
      on the mobile menu open, fluid subpage-hero rhythm, serif-proof
      .flag pills, balanced event dates, arch hairline for dark mode, the
      "Text: Text" doubled label on the book page, and IMAGE_PROMPTS.md
      wording fixes. Remaining known cosmetic item: the hero cutout mask
      has faint residue right of her hair (visible on close inspection in
      dark mode) — needs an asset re-clean + re-export of both webp/png.
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
- **A custom property resolves its var() where it is DEFINED, not used.**
  A root-level `--cta-band-bg: var(--color-bg)` bakes in the ROOT's bg
  (cream), even when consumed inside the band's own data-theme="dark"
  scope. Cross-scope surfaces need scoped RULES (`:root[data-theme=dark]
  .cta-band { ... }`), not a root alias.
- **Two sessions were writing this working tree at once.** A parallel
  session's hero edits landed between this session's read and `git add`,
  and silently rode along in the commit. Before staging in this repo,
  re-run `git diff --stat` and re-read any file you're about to commit.
- **Fading text IS sub-AA text, briefly — and audits sample it.** Any
  opacity entrance on text can be caught mid-blend (Lighthouse under CPU
  throttle failed color-contrast on three different elements across
  runs). Structural fix, not a timing fix: text reveals are rise-only
  (transform never affects contrast); opacity fades are reserved for
  imagery. Also: elements sitting in the observer's -8% dead band at
  load animate at arbitrary later moments — near-viewport elements now
  join the load choreography immediately.
- **A "sitewide rule" change must be swept sitewide, mechanically.** The
  terracotta-means-clickable and caps-tracking rules were applied to
  site.css + index.html and declared done; the verify panel found 14
  leftovers in the five subpages' inline <style> blocks. grep the whole
  repo for the old pattern before claiming a rule change is complete.

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
