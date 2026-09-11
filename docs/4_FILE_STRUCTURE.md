# Project structure: what is safe to edit

*For everyone. A reference — read the part you need, not the whole thing.*

The website is a folder of files tracked with Git. They fall into two groups: **content**, which you add to and change freely, and **machinery**, which makes the site work and should be left alone. Adding posts, pages, and images never requires touching the machinery.

## Full directory tree

🟢 = content you edit · 🟡 = edit carefully · 🔴 = do not edit

```
nmf-website/

├── _config.yml              ← 🔴 Site configuration
├── Gemfile / Gemfile.lock   ← 🔴 Ruby dependencies
│
├── _posts/                  ← 🟢 CONTENT YOU EDIT
│   ├── nyheter/             ← News articles (.md)
│   ├── arrangementer/       ← Events (.md)
│   └── infomat/             ← INFOMAT issues (.md)
│
├── _drafts/                 ← 🟢 Unfinished posts (not published)
│
├── _pages/                  ← 🟡 The website's pages (.html)
│   └── index.html           ← 🟡 The front page
│
├── _data/                   ← 🟢 DATA YOU EDIT
│   ├── navigation.yml       ← Top menu bar
│   ├── styremedlemmer.yml   ← Board members
│   ├── carousel.yml         ← Front page slideshow
│   ├── pekere.yml           ← External links page
│   └── stillinger.yml       ← Vacant positions (Ledige stillinger)
│
├── _layouts/                ← 🔴 Page templates
├── _includes/               ← 🔴 Reusable components
│
├── assets/
│   ├── main.css             ← 🔴 Site styling
│   ├── main.js              ← 🔴 Site JavaScript
│   ├── documents/           ← 🟢 PDFs and documents
│   ├── nyheter/             ← 🟢 News images, one folder per post
│   ├── arrangementer/       ← 🟢 Event images, one folder per post
│   ├── infomat/             ← 🟢 INFOMAT images, one folder per issue
│   └── images/              ← 🟢 Shared images — logos, portraits, backgrounds
│       ├── carousel/        ← 🟢 Front page slideshow
│       ├── styremedlemmer/  ← 🟢 Board member portraits
│       └── abelstipend/     ← 🟢 Abel scholarship images
│
├── _site/                   ← 🔴 The built website (auto-generated, overwritten every build)
├── .jekyll-cache/           ← 🔴 Jekyll's scratch folder — appears when you build locally, ignore it
│
├── docs/                    ← This documentation (not part of the website)
├── README.md                ← Repository overview
├── CONTRIBUTING.md          ← Short pointer for new contributors
├── .github/workflows/       ← 🔴 Automatic build checks
└── .gitignore               ← Files Git ignores
```

## Content to edit (🟢)

**`_posts/`** — news, events, and INFOMAT issues, written in Markdown. This is where most contributions go. See [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md#creating-a-new-post).

**`assets/`** — images and documents. Add new files freely; just put them in the right folder, listed in [Where images go](3_MARKDOWN_AND_POSTING.md#where-images-go).

**`_data/`** — see the next section.

## Data files you can edit

These files are the site's control panel. Editing them changes the site without touching a single template, which makes them the maintainer's most useful tool.

| File | What it controls | Edit when |
|---|---|---|
| `_data/navigation.yml` | The top menu, including dropdowns, plus the site name, logo, tagline and header background | A page is added, removed, or renamed |
| `_data/styremedlemmer.yml` | The board members page: name, role, period, photo, affiliation | After an election or annual meeting |
| `_data/carousel.yml` | The front page slideshow: which images, how many seconds between slides, whether it rotates automatically | You have better photos, e.g. after a conference |
| `_data/pekere.yml` | The links page — sections of external links to institutions, journals, and societies | A link breaks or a new one is worth adding |
| `_data/stillinger.yml` | The vacant positions page: title, level, institution, deadline, link. Newest at the top; copy the template at the start of the file, and keep the deadline quoted (`"2026-12-31"`) | A new position is announced |

> ⚠️ **YAML is strict about indentation.** Use exactly 2 spaces per level, never tabs, and keep quotation marks and colons exactly as in the surrounding lines. The safest way to add an entry is to copy the block above it and change the values. An automatic check catches broken YAML before it can reach the site, so a mistake here is annoying but not dangerous.

## Pages (🟡)

`_pages/` holds the site's pages — history, membership, contact, board, prizes, and so on. They are potentially **HTML files**, not Markdown. Each becomes a web address matching its filename: `_pages/historie.html` → `/historie/`.

Editing the *words* in a page is a normal, safe contribution. Changing the *structure* — the tags, classes, and includes around the words — is closer to machinery; if you are not sure, propose the change and ask in the pull request.

The front page is `_pages/index.html`. It pulls in the newest news articles and upcoming events automatically, so it usually needs no editing when you publish something new.

> ⚠️ **Do not remove the `permalink: /` line** from the top of `_pages/index.html`. Everything in `_pages/` gets an address made from its filename, so without that line the front page is built at `/index/` and the site has **no homepage at all**. The build still succeeds and no check catches it — the site simply stops having a front page.

## Files you should never edit

These control how the site works, and changing them can break every page at once:

```
_config.yml             ← Site configuration (title, plugins, collections)
_layouts/               ← Page templates (the HTML structure of posts and pages)
_includes/              ← Header, footer, cards, and other reusable components
Gemfile / Gemfile.lock  ← Ruby dependencies
assets/main.css         ← Site styling
assets/main.js          ← Site JavaScript
.github/workflows/      ← The automatic checks that run on every pull request
_site/                  ← Auto-generated build output — edits here are silently overwritten
```

**If you need one of these changed, ask the maintainer.** They can be changed — this is a website, not a monument — but they deserve a deliberate change with someone watching, not an incidental one.

## Publishing a new INFOMAT issue

INFOMAT appears in two places, and a new issue needs both. This is a recurring maintainer task and it is easy to do half of it.

1. **The PDF archive.** Put the PDF in `assets/documents/infomat/` named `YYMM.pdf` — year then month, two digits each. April 2026 is `2604.pdf`.
2. **The archive table.** Open `_pages/infomat.html` and find the archive table. Each row is a year, each cell a month. Replace the `<td>—</td>` for the new month with a link copied from the month before it, changing only the filename and the label:

   ```html
   <td><a href="/assets/documents/infomat/2605.pdf" target="_blank" rel="noopener">mai</a></td>
   ```

   Starting a new year means adding a whole new `<tr>` row at the top of the table — copy the row below and edit it.
3. **The post.** Create the post in `_posts/infomat/` as described in [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md#creating-a-new-post). Any images go in `assets/infomat/<YYYY-MM>/`.

The table is maintained by hand — nothing generates it from the files in the folder, so a PDF that is uploaded but not linked is invisible.

## Ready to make a change?

How to get your edit reviewed and published is in [2_CONTRIBUTING.md](2_CONTRIBUTING.md), and the full branch and pull request workflow is in [5_GIT_AND_GITHUB.md](5_GIT_AND_GITHUB.md).
