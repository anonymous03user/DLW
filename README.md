# Dr. Leslie Wells — Website

Personal site for Dr. Leslie Wells, a coach and minister. Built by First Cause Studio.

## Stack

Plain static HTML + CSS. **No build step.** Hosted on **Cloudflare Pages**;
self-edited through **Pages CMS**. See `CLAUDE.md` for the full working rules
and `DESIGN.md` for the quality bar.

## Preview locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

No compile, no bundler — what's in the repo is what ships.

## Deploy

Cloudflare Pages watches this repo. **Every push to `main` deploys the live
site.** Work on the `preview` branch (or a preview deploy) and merge to `main`
to go live.

## Editing content

Non-technical content (offerings, dates, announcements, bio) is edited by Dr.
Wells in Pages CMS — no code, no GitHub account needed. Those fields are backed
by the JSON files in `/data`.

## Ownership

This repo, the Cloudflare Pages project, and the Pages CMS login all belong to
Dr. Leslie Wells.
