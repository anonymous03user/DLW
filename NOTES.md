# NOTES — DLW build log

Running log of decisions and progress. Keep it current; a fresh session should
be able to read this and know exactly where things stand.

## Status

- [x] Step 1 — repo scaffolding generated (tokens, base, CLAUDE.md, DESIGN.md,
      .claude config, starter index.html).
- [x] Repo created (github.com/anonymous03user/DLW) and connected to Cloudflare
      Pages (`cloudflare/workers-autoconfig` branch present). Local working
      copy attached to the remote; building on the `preview` branch.
- [x] Step 2 — content model in `/data`: offerings, events, announcements,
      bio, site. Renderers in `js/render.js` (data-* hooks, DOM-built, no
      innerHTML), nav behavior in `js/nav.js`.
- [x] Step 3 — SPEC + aesthetic direction locked: **Dawn Gold** (cream paper,
      oak ink, burnished gold accent, Cormorant Garamond + Hanken Grotesk;
      the daylight sister of the Faith Consciousness site). Full 7-page core.
      Monogram treatment instead of the portrait (matches the client signal
      from the FC demo).
- [ ] Step 4 — build sections: home → story → speaking → healing-events →
      sessions → retreats → book-dr-leslie.
- [ ] Step 5 — editable-feed wiring verified in the browser (data edits show).
- [ ] Step 6 — Pages CMS: SKIPPED for this demo build (no real login/invite);
      the /data model is CMS-ready.
- [ ] Step 7 — polish + review (axe, Lighthouse, SEO/OG).
- [ ] Step 8 — handover + Care plan.

## Decisions

- Stack: plain static HTML + Cloudflare Pages + Pages CMS. No Astro, no build.
- Dawn Gold Layer-1 swap only; contrast ratios precomputed and recorded as a
  comment in tokens.css (accent-600 4.62:1 on cream, accent-300 10.4:1 dark).
- accent-500 darkened to #ab7f2b so the focus ring clears the 3:1 UI minimum.
- Fonts: reuse the FC demo's subset woff2 (13-24KB each), self-hosted,
  `font-display: swap`, two critical files preloaded per page.
- Hero image: hero stays typographic (text LCP); the horizon photo is a
  1600px/142KB band below the fold, lazy-loaded.
- bio.json mechanic: empty `headshot` shows the monogram; a path shows a
  photo. One-field swap when she supplies photography.
- events.json renderer hides past dates automatically, so stale dates never
  show even if she forgets to edit.
- Demo stubs: inquiry form submits to a client-side success state;
  scheduler/deposit embeds are labeled placeholder panels; unconfirmed facts
  carry visible "to be confirmed" flags (never invented).
- Copy rules carried from the client's sister site: no em dashes in visible
  copy; her real language only; never the term "New Thought"; the 2025
  healing story presented strictly as her own first-person testimony.

## Lessons (one per note)

- **The repo existed but the local copy wasn't a clone.** `git init` + remote
  attach + `git reset --mixed origin/main` reconciled them without touching
  files. Check `git status` before assuming scaffolding state.
- **Compute contrast before painting.** Tuning the gold ramp numerically
  (python, WCAG formula) before writing tokens avoided a rework loop; the
  focus-ring primitive needed darkening that eyeballing would have missed.

## Open questions

- Which GitHub account hosts the repo at handover (currently anonymous03user)?
