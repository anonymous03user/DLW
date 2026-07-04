# DESIGN.md — Quality Bar for the DLW Site

This is the definition of done. Every section is measured against it in
`/screenshot-review` and `/polish`. If a section doesn't clear this bar, it
isn't finished.

## Brand feeling

Dr. Leslie Wells is a New-Thought-adjacent coach and minister. The site should
feel **warm, calm, grounded, and trustworthy** — hopeful and human, never
clinical and never spiritual kitsch (no cosmic gradients, no glowing mandalas,
no stock-photo serenity). Think: a well-made book, generous white space, a
quiet confidence. Elevated, not loud.

## The "make it look expensive" rubric

1. **Tinted neutrals, never pure grey or pure black.** All neutrals carry a
   warm cast (see `--p-stone-*`). Body text is `--color-text`, not `#000`.
2. **One decisive accent, used sparingly.** The accent earns attention because
   it's rare — primary CTA, key links. Don't spray it.
3. **Type does the work.** Serif headings (`--font-heading`), sans body
   (`--font-body`). Real hierarchy via size + weight + spacing, not color.
4. **Generous, intentional whitespace.** Sections breathe (`--p-space-9`).
   Line length capped at `--p-measure` (~66ch). Rhythm is consistent.
5. **Depth is subtle.** Soft, warm-tinted shadows (`--shadow-card`), hairline
   borders. No hard drop shadows, no heavy strokes.
6. **Alignment and grid discipline.** Everything sits on a shared container and
   spacing scale. No off-by-a-few-pixels drift.

## Interaction states — required, not optional

Every interactive element has visible **hover, focus-visible, active, and
disabled** states. Focus rings use `--color-focus-ring` and must be clearly
visible in both light and dark mode. Motion is subtle and eased
(`--p-ease`, `--p-dur-fast`), and everything respects
`prefers-reduced-motion`.

## Dark mode

Full parity. Dark mode overrides the semantic layer only. Check contrast,
shadows (they read differently on dark), and that the accent stays legible
(dark mode uses a lighter accent token automatically).

## Accessibility — WCAG 2.1 AA

- Text contrast ≥ 4.5:1; large text and UI components ≥ 3:1.
- Semantic HTML: one `<h1>` per page, ordered headings, landmarks
  (`header`/`main`/`footer`/`nav`), a skip link.
- All images have meaningful `alt` (or `alt=""` if decorative).
- Fully keyboard operable; visible focus throughout; logical tab order.
- Touch targets ≥ 44×44px.

## Responsive

Designed and checked at **390px (mobile), 768px (tablet), 1440px (desktop).**
No horizontal scroll at any width. No layout shift when the feed content loads.

## Performance

- **LCP < 2.5s.** System/serif stack (no web-font blocking) unless a brand font
  is specified and subset.
- Images sized and `loading="lazy"` below the fold; explicit width/height to
  reserve space (no CLS).
- No framework, no bundler — keep JS to the few lines needed to render the feed.

## SEO & social

- Unique `<title>` and `<meta name="description">` per page.
- Open Graph + Twitter card tags with a share image.
- Canonical URL, sensible heading structure, descriptive link text.
- Feed content may be client-rendered; main pages must be real HTML in source.

## Definition of done (checklist)

- [ ] Clears the "make it look expensive" rubric above.
- [ ] Hover / focus-visible / active / disabled on every interactive element.
- [ ] Light + dark mode both pass, with AA contrast in each.
- [ ] Clean at 390 / 768 / 1440; no horizontal scroll; no CLS.
- [ ] LCP < 2.5s; images lazy-loaded and sized.
- [ ] Title, description, OG/Twitter tags, canonical present.
- [ ] Keyboard-only pass: skip link, focus order, all actions reachable.
- [ ] Color via semantic/component tokens (no color primitive outside
      `tokens.css`); scales via `--p-*` tokens; no hardcoded values anywhere.
- [ ] axe: 0 violations. Lighthouse: green across the board.
