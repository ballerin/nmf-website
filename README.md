# NMF Website — Admin Guide

Norsk Matematisk Forening website. Built with Jekyll, hosted on Cloudflare Pages.

## 🖥️ CMS — Edit from your browser

Go to **https://nmf-website.pages.dev/admin/** and log in with your GitHub account.
No installs needed — works on Windows, Mac, and Linux.

- **News** → add/edit news articles
- **Events** → add/edit events with dates
- **INFOMAT** → add/edit monthly INFOMAT issues

Changes are committed directly to GitHub. Cloudflare Pages deploys automatically.

> **Setup required:** The CMS needs a Cloudflare Worker for GitHub OAuth.
> See `workers/README.md` for the one-time setup guide.

## ⚠️ If the domain changes

1. Update `base_url` in `admin/config.yml` to the new worker URL
2. Update `GITHUB_ORIGIN` in the Worker variables (Cloudflare Dashboard)
3. Update the GitHub OAuth App's callback URL

```yaml
# admin/config.yml
backend:
  name: github
  repo: ballerin/nmf-website
  branch: main
  base_url: https://nmf-oauth.YOUR-ACCOUNT.workers.dev   # ← change this
```

## 📝 Editing Markdown directly

You can also edit files directly on GitHub:
- News → `_posts/nyheter/`
- Events → `_posts/arrangementer/`
- INFOMAT → `_posts/infomat/`
- Templates in `admin/TEMPLATE-*.md`

## 🛠️ Local Development

```bash
bundle install   # first time only
bundle exec jekyll serve
# → http://localhost:4000
```

To use the CMS locally, switch `admin/config.yml` to the proxy backend:

```yaml
backend:
  name: proxy
  proxy_url: http://localhost:8081/api/v1
```

Then run `npx --yes decap-server` in a second terminal.

## 📖 Guides

- `admin/README.md` — full admin documentation
- `admin/filstruktur.md` — which files you can edit
- `workers/README.md` — OAuth proxy deployment guide

## ❓ Help

See [Jekyll docs](https://jekyllrb.com/docs/).
