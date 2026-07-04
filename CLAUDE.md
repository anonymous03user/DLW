# CLAUDE.md — Dr. Leslie Wells Personal Site

Read this and `DESIGN.md` before touching any file.

## What this is

The personal site for **Dr. Leslie Wells (DLW)**, a New-Thought-adjacent coach
and minister. Warm, calm, grounded, trustworthy — hopeful without kitsch. The
single job of the site is to move a visitor toward the one primary CTA/offer
defined in the scope doc.

Built by First Cause Studio. The client owns everything: her GitHub repo, her
Cloudflare Pages project, her Pages CMS login.

## Stack — settled, do not change

- **Plain static HTML + CSS.** No Astro. No framework. **No build step.**
- **Cloudflare Pages** for hosting. Every push to the repo auto-deploys.
- **Pages CMS** (hosted app) for self-editing — DLW logs in by email magic
  link, no GitHub account needed.

Why plain HTML: the requirement is ownership and self-editing with no lock-in,
and that comes from the CMS, not the framework. The studio site stays on Astro;
this client brochure site is a deliberately different decision. **Do not
introduce Astro, a bundler, or an npm build here.**

## File structure

```
/                 hand-authored HTML pages (home, bio, offerings, contact)
/css/tokens.css   three-layer design tokens  (the reusable asset)
/css/base.css     element defaults, built on semantic tokens
/data/*.json      editable feed content (offerings, events, announcements…)
/js/              small client-side renderers for the data files
/.claude/         config: settings, design-reviewer subagent, commands
DESIGN.md         the quality bar — the definition of done
NOTES.md          running build log; keep it current
```

## Design tokens — the rule

Three layers: **primitives → semantic → component** (`css/tokens.css`).

- **Color always flows through semantic (or component) tokens** —
  `--color-text`, `--color-bg`, `--color-primary`, `--font-heading`, etc. Never
  write a raw color, and never reference a **color primitive**
  (`--p-stone-*`, `--p-accent-*`, `--p-white`, `--p-black`) outside
  `tokens.css`. This is exactly what makes dark mode and the future rebrand work.
- **Scale tokens are used directly** — spacing (`--p-space-*`), type
  (`--p-text-*`, `--p-leading-*`), radii (`--p-radius-*`), shadow, motion
  (`--p-ease`, `--p-dur-*`), layout (`--p-container`, `--p-measure`). Never
  write a raw px/rem for these; reach for the scale.
- **If you're typing a hex or a px, there's a token for it.** No hardcoded values.
- The brand guide is not final: the color primitives are neutral placeholders.
  When the brand lands, swap the Layer-1 *colors* only — Layers 2–3 stay untouched.

## Content model — SEO pages vs. editable feed

- **Main pages (home, bio, offerings) are hand-authored HTML** so they rank in
  search. Do not render these client-side.
- **Feed-style content (class/retreat dates, announcements) is rendered
  client-side** from a small JSON data file in `/data`. That content doesn't
  need SEO, so the zero-build tradeoff is fine.
- Keep the editable surface minimal — only model what DLW will actually touch.
  Candidate collections: `offerings`, `events`/`dates`, `announcements`,
  `bio`, `site` (contact email, booking link, socials).

## Workflow

1. Turn the scope doc into a short SPEC. Plan mode first; ask any clarifying
   question that changes structure before building.
2. Confirm the token CSS and propose 2–3 aesthetic directions (brand not final).
3. Content-model the editable pieces into `/data/*.json` **before** building pages.
4. Build **section by section** in plain HTML/CSS against the tokens. Shared
   header/footer copy-pasted (fine at 5–15 pages) or a tiny JS include.
5. After each section: run `/screenshot-review`, then `/polish`.
6. Keep `NOTES.md` updated as you go.

## Model roles

- **Opus 4.8** — creative direction, aesthetic lock, and final polish.
- **Fable 5** — the long section-by-section build.

## Git & deploy

- Cloudflare Pages watches this repo, so **a push is a deploy.** Keep `main`
  clean — it is the client's live site.
- Work on a `preview` branch (or use preview deploys) until launch, then merge
  to `main` to go live.
- After a section passes `/screenshot-review` and `/polish`, commit with a
  clear message and push. Git commit/push permissions are pre-granted in
  `.claude/settings.json`.

## Definition of done

See `DESIGN.md`. In short: passes the quality bar (hierarchy, tinted neutrals,
interaction states, dark mode, WCAG AA, responsive at 390/768/1440, LCP < 2.5s,
SEO + OG tags); DLW can log into Pages CMS and edit every modeled field; every
account is in her name.
