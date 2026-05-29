# NMF Website — Admin Guide

Norsk Matematisk Forening website. Built with Jekyll, hosted on Cloudflare Pages.

## 🖥️ CMS — Edit from your browser

Go to **https://nmf-website.pages.dev/admin/** and log in with your GitHub account.
No installs needed — works on Windows, Mac, and Linux.

- **News** → add/edit news articles
- **Events** → add/edit events with dates
- **INFOMAT** → add/edit monthly INFOMAT issues

Changes are committed directly to GitHub. Cloudflare Pages deploys automatically.

### ⚠️ If the domain changes

Update `site_domain` in `admin/config.yml` to the new domain:

```yaml
backend:
  name: github
  repo: ballerin/nmf-website
  branch: main
  site_domain: your-new-domain.com   # ← change this
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

## ❓ Help

See [Jekyll docs](https://jekyllrb.com/docs/).
