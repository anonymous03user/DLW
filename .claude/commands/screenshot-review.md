---
description: Screenshot the current section at 3 breakpoints (light + dark) and review it against DESIGN.md.
argument-hint: "[page or section]"
---

Run the visual feedback loop for: **$ARGUMENTS** (default: the section just built).

1. Ensure a local static preview is serving (`python3 -m http.server 8080` from the repo root).
2. With the browser MCP, load the page and capture screenshots at 390px, 768px, and 1440px, in both light and dark (toggle `prefers-color-scheme`). Save under `.screenshots/`.
3. Hand the screenshots and the section's HTML/CSS to the **design-reviewer** subagent for a critique against `DESIGN.md`.
4. Summarize the verdict and prioritized fixes. Do not commit if the verdict is Rework.
