# nmf-website

Website for **Norsk matematisk forening** — built with [Jekyll](https://jekyllrb.com/), hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

Live at **[matematikkforeningen.no](https://matematikkforeningen.no)**. Changes are tested on **[staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev)** first.

## Structure

```
_posts/          ← News, events, INFOMAT (Markdown)
_pages/          ← Front page and static pages — history, membership, contact… (HTML)
_drafts/         ← Unfinished posts (not published)
_data/           ← Navigation, board members, carousel, links (YAML)
_layouts/        ← Page templates
_includes/       ← Reusable components
assets/          ← CSS, JS, images, documents
docs/            ← Documentation
```

## Contributing

Start with **[CONTRIBUTING.md](CONTRIBUTING.md)**. Small edits need nothing but a browser; the full guides are in **[docs/](docs/)**, indexed in [docs/0_README.md](docs/0_README.md).

## Local development

```bash
bundle install
bundle exec jekyll serve        # → http://localhost:4000
bundle exec jekyll build        # build check — run before pushing
```

Installing Ruby and Jekyll from scratch: [docs/6_JEKYLL_AND_DEPLOYMENT.md](docs/6_JEKYLL_AND_DEPLOYMENT.md).

## Branches and deploy

| Branch | Deploys to |
|---|---|
| `main` | [matematikkforeningen.no](https://matematikkforeningen.no) |
| `staging` | [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev) |

Work on a feature branch → pull request to `staging` → pull request from `staging` to `main`. Cloudflare Pages builds and deploys automatically; GitHub Actions checks every pull request. See [docs/5_GIT_AND_GITHUB.md](docs/5_GIT_AND_GITHUB.md).
