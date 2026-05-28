# NMF Website — Admin Guide

This repo contains the website for **Norsk Matematisk Forening** (Norwegian Mathematical Society).  
Built with [Jekyll](https://jekyllrb.com/), hosted on Cloudflare Pages.

## 🚀 Quick Start

**Want to add a news article, event, or INFOMAT issue?**

→ Go to `/admin/` on the website and log in with GitHub (production) or use the CMS locally (see below).

**Alternatively:** Edit Markdown files directly:
1. News goes in `_posts/nyheter/`
2. Events go in `_posts/arrangementer/`
3. INFOMAT issues go in `_posts/infomat/`
4. Use the templates in `admin/TEMPLATE-*.md`

## 📖 Full Documentation

See `admin/README.md` for the complete admin guide.

## 🗺️ File Map

See `admin/filstruktur.md` for a map of which files you can edit.

## 🛠️ Local Development

To test the site locally:

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open http://localhost:4000 in your browser
```

### CMS Local Development (no login required)

To use the CMS locally, the config uses a local proxy that skips GitHub OAuth:

```bash
# Terminal 1: Jekyll server
bundle exec jekyll serve

# Terminal 2: Local proxy (handles file reads/writes)
npx --yes decap-server
```

Then open `http://localhost:4000/admin/` — no login needed, you go straight to the dashboard.

**How it works:** The local config uses `backend: proxy` pointing to `localhost:8081`.  
The `decap-server` reads/writes files directly in your local repo, bypassing GitHub entirely.

### Switching to Production

Before deploying, switch `admin/config.yml` back to the GitHub backend:

```yaml
# Local dev (current):
backend:
  name: proxy
  proxy_url: http://localhost:8081/api/v1

# Production:
backend:
  name: github
  repo: ballerin/nmf-website
  branch: main
```

## 📦 Publishing Workflow

```
Edit content → Commit to GitHub → Cloudflare Pages builds & deploys automatically
```

Use the CMS at `/admin/` for the simplest workflow — no git commands needed.

## ❓ Help

Ask whoever set up the site, or see the [Jekyll docs](https://jekyllrb.com/docs/).
