# NMF Website

Norsk Matematisk Forening website. Built with Jekyll, hosted on Cloudflare Pages at [nmf-website.pages.dev](https://nmf-website.pages.dev).

## Editing the site

- **Browser CMS** — go to `/admin/`, log in with GitHub, edit through forms. See [`docs/2_CMS_GUIDE.md`](docs/2_CMS_GUIDE.md).
- **GitHub web UI** — edit `_data/*.yml` files directly. See [`docs/3_FILE_STRUCTURE.md`](docs/3_FILE_STRUCTURE.md).
- **Local development** — clone the repo, run `bundle exec jekyll serve`. See below.

## Documentation

| File | For |
|---|---|
| [`docs/1_WELCOME.md`](docs/1_WELCOME.md) | Start here — intro and overview |
| [`docs/2_CMS_GUIDE.md`](docs/2_CMS_GUIDE.md) | How to edit content from your browser |
| [`docs/3_FILE_STRUCTURE.md`](docs/3_FILE_STRUCTURE.md) | Which files you can safely edit |
| [`docs/4_OAUTH_SETUP.md`](docs/4_OAUTH_SETUP.md) | OAuth proxy setup (rarely needed) |

## Local Development

```bash
bundle install   # first time only
bundle exec jekyll serve
# → http://localhost:4000
```

To use the CMS locally, switch `admin/config.yml` to the proxy backend and run `npx --yes decap-server`.

## Deploy

Push to `main`. Cloudflare Pages builds and deploys automatically.
