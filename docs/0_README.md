# NMF Website

Norsk Matematisk Forening website. Built with Jekyll, hosted on Cloudflare Pages at [nmf-website.pages.dev](https://nmf-website.pages.dev).

## Editing the site

- **GitHub web UI** — edit Markdown posts and YAML data files directly. See [`docs/2_MARKDOWN_GUIDE.md`](docs/2_MARKDOWN_GUIDE.md) and [`docs/3_FILE_STRUCTURE.md`](docs/3_FILE_STRUCTURE.md).
- **Local development** — clone the repo, run `bundle exec jekyll serve`. See below.

## Documentation

| File | For |
|---|---|
| [`docs/1_WELCOME.md`](docs/1_WELCOME.md) | Start here — intro and overview |
| [`docs/2_MARKDOWN_GUIDE.md`](docs/2_MARKDOWN_GUIDE.md) | How to write and format content with Markdown |
| [`docs/3_FILE_STRUCTURE.md`](docs/3_FILE_STRUCTURE.md) | Which files you can safely edit |
| [`docs/4_BRANCHING_STRATEGY.md`](docs/4_BRANCHING_STRATEGY.md) | Git branching and deployment workflow |

## Local Development

```bash
bundle install   # first time only
bundle exec jekyll serve
# → http://localhost:4000
```

## Branches & Deploy

| Branch | Environment | URL |
|---|---|---|
| `main` | Production | Custom domain (live site) |
| `staging` | Testing | `staging.nmf-website.pages.dev` |

**Merge flow:** feature branch → `staging` (test) → `main` (production).

Pushing to either branch triggers an automatic build and deploy on Cloudflare Pages. See [`docs/4_BRANCHING_STRATEGY.md`](docs/4_BRANCHING_STRATEGY.md) for the full workflow.
