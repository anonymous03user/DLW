# NOTES — DLW build log

Running log of decisions and progress. Keep it current; a fresh session should
be able to read this and know exactly where things stand.

## Status

- [x] Step 1 — repo scaffolding generated (tokens, base, CLAUDE.md, DESIGN.md,
      .claude config, starter index.html).
- [ ] Repo created in DLW's GitHub and connected to Cloudflare Pages.
- [ ] Step 2 — content model from the scope doc into `/data/*.json`.
- [ ] Step 3 — SPEC + aesthetic direction locked (2–3 options; brand not final).
- [ ] Step 4 — build sections (Fable), polish (Opus).
- [ ] Step 5 — wire the editable feed (data files + client-side render).
- [ ] Step 6 — install Pages CMS, map collections, invite DLW.
- [ ] Step 7 — polish + review (axe, Lighthouse, SEO/OG).
- [ ] Step 8 — handover + Care plan.

## Decisions

- Stack: plain static HTML + Cloudflare Pages + Pages CMS. No Astro, no build.
- Tokens: three-layer system; brand not final, so Layer 1 is a neutral
  warm-tinted placeholder. Swap Layer 1 when the brand guide lands.

## Open questions

- Which GitHub account hosts the repo (studio-then-transfer vs. hers from day 1)?
- Brand direction: pick from the 2–3 proposals once the scope/brand is reviewed.
