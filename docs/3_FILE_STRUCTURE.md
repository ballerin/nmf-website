# File Structure — What's safe to edit

The website is made of files in a GitHub repository. Most of them you'll never need to touch. Here's what matters.

## 🟢 Files you edit through the CMS

These are handled automatically — you don't need to open them yourself:

```
_posts/nyheter/         ← News articles
_posts/arrangementer/   ← Events
_posts/infomat/         ← INFOMAT issues
```

The CMS at `/admin/` writes to these folders for you.

## 🟡 Files you edit on GitHub (occasionally)

These control site-wide settings. Edit them carefully on GitHub.com:

| File | What it controls | When to edit |
|---|---|---|
| `_data/navigation.yml` | The top menu bar | Adding/removing menu items |
| `_data/styremedlemmer.yml` | Board members page | New board members elected |
| `_data/carousel.yml` | Front page image slideshow | Adding new slideshow images |
| `_data/pekere.yml` | Links page | Adding/updating external links |

**⚠️ YAML files are sensitive to indentation.** Use exactly 2 spaces per level. Never use tabs. Look at the existing lines and copy the pattern.

## 🔴 Files you should NEVER edit

These control how the site works. Changing them can break the site:

```
_config.yml             ← Site configuration
_layouts/               ← Page templates
_includes/              ← Header, footer components
Gemfile / Gemfile.lock  ← Ruby dependencies
assets/main.css         ← Site styling
assets/main.js          ← Site JavaScript
```

## How to edit a file on GitHub

1. Go to the repository on GitHub.com
2. Navigate to the file (e.g. `_data/navigation.yml`)
3. Click the pencil icon (✏️) at the top right
4. Make your changes
5. Scroll down, write a short description of what you changed
6. Click **Commit changes**
7. Wait 1-2 minutes for the site to update

## Image locations

```
assets/images/nyheter/        ← News hero images
assets/images/arrangementer/  ← Event hero images
assets/images/infomat/        ← INFOMAT images
assets/images/carousel/       ← Front page slideshow
assets/images/styremedlemmer/ ← Board member portraits
```

Upload images via the CMS (drag-and-drop) or directly on GitHub.
