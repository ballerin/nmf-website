# Admin Guide — NMF Website

Welcome! This guide explains how to manage the Norsk Matematisk Forening website.  
You don't need to be a programmer — just basic Markdown knowledge.

---

## What is this?

The website is built with **Jekyll**, a tool that converts simple Markdown files into HTML.  
Every page, news article, and event is just a text file. You edit the text, push to GitHub, and the site updates automatically.

You can also use the **CMS** at `/admin/` — a web-based editor with forms, no Markdown required.

---

## The 3 things you'll do most often

| Task | Where | CMS |
|---|---|---|
| Add/edit a news article | `_posts/nyheter/` | ✅ News |
| Add/edit an event | `_posts/arrangementer/` | ✅ Events |
| Add/edit an INFOMAT issue | `_posts/infomat/` | ✅ INFOMAT |

---

## Using the CMS (recommended)

1. Go to `https://din-side.no/admin/`
2. Log in with your GitHub account
3. Choose **News**, **Events**, or **INFOMAT** from the sidebar
4. Click **New [type]** to create, or click an existing item to edit
5. Fill in the form fields. The preview pane shows you how it will look
6. Click **Publish** → the CMS commits to GitHub → Cloudflare Pages deploys automatically

**For data files** (navigation, board members, carousel): select **Site Data** in the sidebar and edit the YAML directly.

---

## Using Markdown directly (alternative)

If you prefer editing files directly, use the templates in the `admin/` folder:

- `admin/TEMPLATE-nyhet.md` — copy this for news posts
- `admin/TEMPLATE-arrangement.md` — copy this for events
- `admin/TEMPLATE-infomat.md` — copy this for INFOMAT issues

### File naming rule

All post files MUST follow this format:  
`YYYY-MM-DD-short-description.md`

Examples:
- `2026-06-01-sommerkonferanse.md`
- `2026-07-15-nytt-abelsymposium.md`

### Where to put files

| Content type | Directory |
|---|---|
| News | `_posts/nyheter/` |
| Events | `_posts/arrangementer/` |
| INFOMAT | `_posts/infomat/` |

### Where to put images

Put images in `assets/images/[type]/`:
- News images → `assets/images/nyheter/`
- Event images → `assets/images/arrangementer/`
- INFOMAT images → `assets/images/infomat/`
- General images → `assets/images/`

In your post, reference images as: `/assets/images/nyheter/my-image.jpg`

---

## Editing site data

### Navigation menu
File: `_data/navigation.yml`

⚠️ **YAML indentation is critical.** Use exactly 2 spaces for each level. Never use tabs.

### Board members (Styremedlemmer)
File: `_data/styremedlemmer.yml`

Each member has: name, role, period, picture, affiliation, color.

### Carousel (front page slideshow)
File: `_data/carousel.yml`

To add a new slide:
1. Upload your image to `assets/images/carousel/`
2. Add the filename to `slides:` in `_data/carousel.yml`

---

## Common mistakes

| Problem | Solution |
|---|---|
| Site doesn't update | Wait 1-2 minutes for Cloudflare to build. Check GitHub for build errors. |
| Date format wrong | Must be `YYYY-MM-DD` (e.g., `2026-06-01`) |
| YAML indentation error | Use spaces, not tabs. Each level = 2 spaces. |
| Image not showing | Check the path starts with `/assets/images/` |

---

## Publishing workflow

```
You edit (CMS or Markdown) → Commit to GitHub → Cloudflare Pages builds → Site updates
```

- **CMS**: Hit "Publish" → everything is automatic
- **Manual**: Push to `main` branch → automatic deploy

To preview changes before publishing:
1. Create a new branch
2. Push it to GitHub
3. Cloudflare Pages gives you a preview URL
4. Merge to `main` when ready

---

## Need help?

Contact the site administrator or refer to `admin/filstruktur.md` for a map of what each file does.
