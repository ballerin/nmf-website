# nmf-website

Website for **Norsk Matematisk Forening** — built with [Jekyll](https://jekyllrb.com/), hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

Live at **[nmf-website.pages.dev](https://nmf-website.pages.dev)**.

## Structure

```
_posts/          ← News, events, INFOMAT (Markdown)
_pages/          ← Static pages (About, Contact, Membership…)
_data/           ← Navigation, board members, carousel (YAML)
_layouts/        ← Page templates
_includes/       ← Reusable components
assets/          ← CSS, JS, images
docs/            ← Documentation
```

## Editing Content

For `_data/*.yml` files (navigation, board members), edit directly on GitHub.

## Local Development

```bash
bundle install
bundle exec jekyll serve        # → http://localhost:4000
npx --yes decap-server          # CMS proxy (terminal 2)
```

## Deploy

Push to `main`. Cloudflare Pages builds from `_config.yml` and deploys `_site/`.

## Docs

See [`docs/`](docs/) for admin guides and setup instructions.
