# Contributing to the NMF website

Thanks for helping out. This is the website of **Norsk matematisk forening**.

## The short version

1. **Edit the file** you want to change. In the browser, click the **pencil ✏️ icon** on it — that is enough for a typo or a new post.
2. **Commit to a new branch** and open a **pull request** against **`staging`** (not `main`).
3. **The maintainer reviews and merges it.** Changes appear on the test site first, then go live at [matematikkforeningen.no](https://matematikkforeningen.no).

`main` is the live site and never receives direct commits.

## Where things live

| What | Where |
|---|---|
| News, events, INFOMAT issues | `_posts/nyheter/`, `_posts/arrangementer/`, `_posts/infomat/` (Markdown) |
| Pages — history, membership, contact, front page | `_pages/` (HTML) |
| Menu, board members, slideshow, links | `_data/*.yml` |
| Vacant positions (Ledige stillinger) | `_data/stillinger.yml`, newest at the top (template in the file) |
| Images and PDFs | `assets/` |

Templates, styling, and configuration (`_layouts/`, `_includes/`, `assets/main.css`, `_config.yml`) run the site — ask the maintainer before changing them.

## Full documentation

Everything is in [`docs/`](docs/):

- **[docs/0_README.md](docs/0_README.md)** — index; find your task here
- **[docs/2_CONTRIBUTING.md](docs/2_CONTRIBUTING.md)** — the three ways to contribute, step by step
- **[docs/3_MARKDOWN_AND_POSTING.md](docs/3_MARKDOWN_AND_POSTING.md)** — writing posts and formatting text
- **[docs/5_GIT_AND_GITHUB.md](docs/5_GIT_AND_GITHUB.md)** — branches, pull requests, reviewing and merging

Questions? Open an issue, or ask in the pull request — a half-finished contribution with a question attached is very welcome.
