# File Structure — What's safe to edit

The website is made of files in a GitHub repository. Most of them you'll never need to touch. Here's a complete overview.

## Full directory tree

```
nmf-website/
├── _config.yml              ← Site configuration
├── Gemfile / Gemfile.lock   ← Ruby dependencies
├── index.html               ← Front page
│
├── _posts/                  ← 🟢 CONTENT YOU EDIT
│   ├── nyheter/             ← News articles (.md)
│   ├── arrangementer/       ← Events (.md)
│   └── infomat/             ← INFOMAT issues (.md)
│
├── _pages/                  ← Static pages (404, about, contact, etc.)
│
├── _data/                   ← 🟡 DATA YOU EDIT OCCASIONALLY
│   ├── navigation.yml       ← Top menu bar
│   ├── styremedlemmer.yml   ← Board members
│   ├── carousel.yml         ← Front page slideshow
│   └── pekere.yml           ← External links page
│
├── _layouts/                ← 🔴 Page templates (DO NOT EDIT)
├── _includes/               ← 🔴 Reusable components (DO NOT EDIT)
│
├── assets/
│   ├── main.css             ← 🔴 Site styling (DO NOT EDIT)
│   ├── main.js              ← 🔴 Site JavaScript (DO NOT EDIT)
│   ├── documents/           ← Uploaded PDFs and documents
│   └── images/
│       ├── nyheter/         ← News hero images
│       ├── arrangementer/   ← Event hero images
│       ├── infomat/         ← INFOMAT images
│       ├── carousel/        ← Front page slideshow
│       ├── styremedlemmer/  ← Board member portraits
│       └── uploads/         ← General uploads
│
├── _drafts/                 ← Draft posts (not published)
├── _site/                   ← Built site output (auto-generated)
│
├── docs/                    ← This documentation
├── .github/workflows/       ← Automated build checks
└── .gitignore               ← Files excluded from Git
```

---

## 🟢 Files you edit directly — Markdown posts

These are the content files — news articles, events, and INFOMAT issues. You create and edit them directly on GitHub or locally with `git`.

```
_posts/nyheter/         ← News articles        (.md)
_posts/arrangementer/   ← Events               (.md)
_posts/infomat/         ← INFOMAT issues       (.md)
```

### Post naming convention

Filenames follow the pattern `YYYY-MM-DD-descriptive-slug.md`:

```
_posts/nyheter/2026-03-02-icm-2026.md
_posts/arrangementer/2026-05-12-nasjonalt-matematikermote-2026.md
_posts/infomat/2026-04-01-infomat-april-2026.md
```

The date in the filename determines the publication date shown on the site.

### Post template

Every post starts with **front matter** (metadata) between `---` markers, followed by Markdown content:

```yaml
---
layout: nyheter_template
title: "Your Post Title"
date: 2026-06-15
author: "Your Name"
image: /assets/images/nyheter/hero-image.jpg
categories: [Konferanse]
---
Your Markdown content starts here...
```

Available layouts:
| Layout | Used for |
|---|---|
| `nyheter_template` | News articles |
| `activity_post` | Events and activities |
| `infomat_template` | INFOMAT issues |

See [`docs/2_MARKDOWN_GUIDE.md`](docs/2_MARKDOWN_GUIDE.md) for how to format these files.

---

## 🟡 Files you edit on GitHub (occasionally)

These control site-wide settings. Edit them carefully on GitHub.com or locally.

| File | What it controls | When to edit |
|---|---|---|
| `_data/navigation.yml` | The top menu bar | Adding/removing menu items |
| `_data/styremedlemmer.yml` | Board members page | New board members elected |
| `_data/carousel.yml` | Front page image slideshow | Adding new slideshow images |
| `_data/pekere.yml` | Links page | Adding/updating external links |

**⚠️ YAML is sensitive to indentation.** Use exactly 2 spaces per level. Never use tabs. Look at the existing lines and copy the pattern.

---

## 🔴 Files you should NEVER edit

These control how the site works. Changing them can break the site:

```
_config.yml             ← Site configuration (title, URL, plugins)
_layouts/               ← Page templates (HTML structure)
_includes/              ← Header, footer, and reusable components
Gemfile / Gemfile.lock  ← Ruby dependencies
assets/main.css         ← Site styling
assets/main.js          ← Site JavaScript
_site/                  ← Auto-generated build output (never commit changes here)
```

If you need changes to these files, ask the site maintainer.

---

## Image locations

```
assets/images/nyheter/        ← News hero images
assets/images/arrangementer/  ← Event hero images
assets/images/infomat/        ← INFOMAT images
assets/images/carousel/       ← Front page slideshow
assets/images/styremedlemmer/ ← Board member portraits
assets/images/uploads/        ← General uploads
assets/documents/             ← PDFs and downloadable files
```

Upload images directly on GitHub (drag-and-drop into the editor) or via `git`. For best results, use landscape images around 1200×600 pixels.

---

## Git workflow — Full example

Here is a complete walkthrough of adding a new feature, testing it on staging, iterating, and merging to production. All commands run in your terminal.

### Setup (first time only)

```bash
# Clone the repository
git clone git@github.com:ballerin/nmf-website.git
cd nmf-website

# Install dependencies
bundle install
```

### Step 1: Create a feature branch

```bash
# Start from the latest production code
git checkout main
git pull

# Create and switch to a new branch
git checkout -b add-june-newsletter
```

### Step 2: Make your changes

```bash
# Create a new post file
# (edit _posts/nyheter/2026-06-04-june-newsletter.md in your editor)

# Preview the site locally to check your work
bundle exec jekyll serve
# → Open http://localhost:4000 in your browser

# Verify the build succeeds (good habit before pushing)
bundle exec jekyll build
```

### Step 3: Push and open a PR to staging

```bash
# Stage and commit your changes
git add .
git commit -m "Add June 2026 newsletter"

# Push the feature branch to GitHub
git push -u origin add-june-newsletter
```

Now open GitHub in your browser:
1. Go to the repository → **Pull requests** → **New pull request**
2. Set **base: `staging`** ← **compare: `add-june-newsletter`**
3. Write a description of your changes
4. Click **Create pull request**

GitHub Actions will run a build check. If it passes, you can merge the PR to `staging`. Cloudflare Pages will deploy it to `staging.nmf-website.pages.dev` — check that everything looks correct there.

### Step 4: Iterate — fix issues and test again

If you notice problems on staging, **stay on your feature branch** and fix them:

```bash
# Make sure you're still on your feature branch
git checkout add-june-newsletter

# Edit the files to fix the issues...
# ... then preview locally:
bundle exec jekyll serve

# Commit and push the fixes
git add .
git commit -m "Fix typos and broken links in newsletter"
git push

# The PR to staging updates automatically — check staging again
```

Repeat this loop until staging looks good.

### Step 5: Merge to production

Once staging is approved:

1. On GitHub, open a **new pull request** from `staging` → `main`
2. Review the changes one final time
3. Click **Merge pull request**
4. Cloudflare Pages deploys to the production domain automatically

### Step 6: Clean up

```bash
# Switch back to main and pull the latest
git checkout main
git pull

# Delete your feature branch (local and remote)
git branch -d add-june-newsletter
git push origin --delete add-june-newsletter
```

### Summary of commands

```bash
# Start
git checkout main && git pull
git checkout -b my-feature

# Work & test
# ... edit files ...
bundle exec jekyll serve      # preview at localhost:4000
bundle exec jekyll build      # verify it compiles

# Push & PR
git add .
git commit -m "Description"
git push -u origin my-feature
# → PR: my-feature → staging
# → Check staging.nmf-website.pages.dev

# Iterate (if needed)
# ... edit files ...
git add . && git commit -m "Fixes"
git push
# → PR updates, re-check staging

# Merge to production
# → PR: staging → main

# Clean up
git checkout main && git pull
git branch -d my-feature
git push origin --delete my-feature
```

See [`docs/4_BRANCHING_STRATEGY.md`](docs/4_BRANCHING_STRATEGY.md) for more details on the branching model and Cloudflare Pages setup.
