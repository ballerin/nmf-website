# File Structure — What to touch and what to leave alone

## 🔴 MUST NOT TOUCH
These files control how the site works. Only modify if you know what you're doing.

```
_layouts/           ← Page templates (HTML structure)
_includes/          ← Reusable components (header, footer)
_config.yml         ← Site-wide settings
Gemfile             ← Ruby dependencies
assets/main.css     ← Site styling
assets/main.js      ← Site JavaScript
```

## 🟢 YOUR CONTENT — Add and edit freely

```
_posts/nyheter/         ← News articles go here
_posts/arrangementer/   ← Events go here
_posts/infomat/         ← INFOMAT issues go here
```

## 🟢 YOUR IMAGES — Upload here

```
assets/images/nyheter/        ← Images for news posts
assets/images/arrangementer/  ← Images for events
assets/images/infomat/        ← Images for INFOMAT issues
assets/images/carousel/       ← Front page slideshow images
assets/images/styremedlemmer/ ← Board member portraits
```

## 🟡 EDIT OCCASIONALLY — Be careful with YAML indentation

```
_data/navigation.yml       ← Navigation menu (top bar)
_data/styremedlemmer.yml   ← Board members list
_data/carousel.yml         ← Front page slideshow settings
_data/pekere.yml           ← External links page
```

## 📁 Other important folders

```
_pages/          ← Static pages (About, Contact, Membership, etc.)
admin/           ← CMS and documentation (not published on the site)
_drafts/         ← Work-in-progress posts (not published)
_site/           ← Built website (auto-generated, don't edit)
```

## 📝 File naming rules

All posts in `_posts/` MUST be named:  
`YYYY-MM-DD-short-description.md`

✅ Correct: `2026-06-01-sommerkonferanse.md`  
❌ Wrong: `sommerkonferanse.md`, `june-2026-event.md`
