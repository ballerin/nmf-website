# Writing content: Markdown and posts

*For contributors writing news, events, or INFOMAT issues.*

Posts on the NMF website are written in **Markdown** — a simple way to format text using plain characters. This guide covers the formatting first, then how to create a post.

Pages in `_pages/` can be in HTML rather than Markdown, depending on how complicated they are; this guide does not apply to those.

## What is Markdown?

Markdown is a lightweight markup language. You write in plain text, and Jekyll converts it to clean HTML for the website. Files use the `.md` extension.

## Headings

Use `#` for headings. More `#` symbols = smaller heading.

```markdown
## Section Heading      (start here)
### Sub-section
#### Minor heading
```

> ⚠️ **Never use a single `#` in a post.** The title from the front matter is already shown as the main heading of the page. Starting the body with `#` gives the page two main headings, which looks wrong and is bad for screen readers and search engines. **Start at `##`.**

## Paragraphs and line breaks

Separate paragraphs with a blank line:

```markdown
This is the first paragraph.

This is the second paragraph.
```

For a line break within a paragraph, end the line with two spaces.

## Bold and italic

| You type | You get |
|---|---|
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `***bold italic***` | ***bold italic*** |

## Links

```markdown
[link text](https://example.com)
```

Example:
```markdown
See the [NMF website](https://matematikkforeningen.no) for more info.
```

### Internal links (within the site)

Link to another page on the site with a path starting from `/`, without the file extension:

```markdown
[Our history](/historie)
[Board members](/styremedlemmer)
[News archive](/nyheter)
```

## Images

```markdown
![alt text](/assets/nyheter/2026-06-03-leiden-declaration/ai-hero.jpeg)
```

**Tips for images:**
- The path always starts with a `/assets/` — never `../` or `assets/…`
- Use landscape images for best results
- Put the file in the right folder first — see [Where images go](#where-images-go)
- The `alt text` describes the image for screen readers and search engines

## Lists

### Unordered lists (bullets)

```markdown
- First item
- Second item
  - Nested item (indent 2 spaces)
- Third item
```

### Ordered lists (numbered)

```markdown
1. First step
2. Second step
3. Third step
```

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Cell A | Cell B | Cell C |
| Cell D | Cell E | Cell F |
```

Align columns with colons — the colon marks the side the text sticks to:

```markdown
| Left | Center | Right |
|:---|:---:|---:|
| text | text | text |
```

## Horizontal rules

Use three dashes for a separator line:

```markdown
---
```

## Blockquotes

```markdown
> This is a quote or a callout.
> It can span multiple lines.
```

## Code and technical text

For inline code, use backticks: `` `code` ``

For code blocks, use triple backticks:

````markdown
```python
def hello():
    print("Hello, world!")
```
````

## Escaping special characters

If you need to show a literal `*`, `#`, or `[`, put a backslash before it:

```markdown
\*not italic\*
\# not a heading
```

## Quick reference

| Goal | Write |
|---|---|
| Section heading | `## Heading` |
| Bold | `**text**` |
| Italic | `*text*` |
| Link | `[text](https://example.com)` |
| Link to another page on the site | `[text](/historie)` |
| Image | `![description](/assets/nyheter/<your-post>/photo.jpg)` |
| Bulleted list | `- item` |
| Numbered list | `1. item` |
| Quote | `> text` |
| Separator line | `---` |
| Literal `#` or `*` | `\#` `\*` |

## Creating a new post

The easiest way to start is to **open an existing post of the same type and copy it**, then replace the content. Everything below explains what you are copying.

### Where the file goes

There are three kinds of post, and each has its own folder, layout, and category. These three must match, or the post will not appear where you expect:

| Kind | Folder | `layout:` | `categories:` |
|---|---|---|---|
| News article | `_posts/nyheter/` | `nyheter_template` | `[news]` |
| Event | `_posts/arrangementer/` | `arrangement_template` | `[arrangement]` |
| INFOMAT issue | `_posts/infomat/` | `infomat_template` | `[infomat]` |

### Naming the file

Filenames follow the pattern `YYYY-MM-DD-descriptive-name.md`:

```
_posts/nyheter/2026-03-02-icm-2026.md
_posts/arrangementer/2026-05-12-nasjonalt-matematikermote-2026.md
_posts/infomat/2026-04-01-infomat-april-2026.md
```

Use lowercase, and hyphens instead of spaces. The name after the date becomes part of the web address, so keep it short and descriptive.

### Not ready to publish?

Put the file in `_drafts/` instead of `_posts/` — without the date in the filename. Drafts are not published. Preview them with `bundle exec jekyll serve --drafts`, and move the file into the right `_posts/` folder when it is ready. See `_drafts/eksempel-utkast.md` for a working example.

## Front matter

Every post starts with **front matter** — metadata between two `---` markers, before any content. This is YAML, not Markdown, so quotes and indentation matter.

```yaml
---
layout: arrangement_template
title: "Nasjonalt matematikermøte 2026"
date: 2026-05-12
start-date: 2026-09-09
end-date: 2026-09-11
author: "NMF"
image: "/assets/arrangementer/2026-05-12-nasjonalt-matematikermote-2026/trondheim.jpg"
categories: [arrangement]
---
Your Markdown content starts here…
```

| Field | Required | What it does |
|---|---|---|
| `layout` | ✅ | Which template renders the post. Must match the table above. |
| `title` | ✅ | Shown as the main heading and in the listing card. |
| `date` | ✅ | When the post is **published**. See the warning below. |
| `categories` | ✅ | Which listing page the post appears on. Must match the table above. |
| `author` | — | Shown as the byline. `NMF` if it comes from the society. |
| `image` | — | The large image at the top and on the card. Leave it out and the card has no picture. |
| `start-date`, `end-date` | events | When the event actually **happens** — this is what draws the date badge on event cards. For a one-day event, set both to the same day. |

Note that `date` and `start-date` answer different questions. `date` is when you are announcing the event (on the website); `start-date` and `end-date` are when the event runs. If `start-date` and `end-date` are missing, then the website falls back on `date`. For a news article you only need `date`, as this is not an event.

## Two mistakes that make a post disappear

Both of these build successfully and produce no error at all — the post is simply not there. If a post is missing, check these first.

**1. A `date` in the future hides the post completely.**

Jekyll skips posts dated in the future, and this site does not override that. A post with `date: 2027-06-20` will not exist on the site until that day arrives.

For an event that is far off, this is the trap: put **today's date** (or the announcement date) in `date`, and the real dates in `start-date` and `end-date`. That is exactly what `_posts/arrangementer/2027-06-20-30th-Nordic-Congress-Mathematicians.md` does.

**2. The folder name does not set the category — `categories` does.**

Putting a file in `_posts/nyheter/` does *not* make it a news post. The folders exist only to keep things tidy. A post in `_posts/nyheter/` with `categories: [nyheter]` instead of `[news]` is published at its own address but appears on no listing page, so nobody will ever find it. Copy the value from the table above exactly.

## Where images go

Put the image file in the repository first, then reference it with a path starting from `/`.

| For | Put the file in | Example reference |
|---|---|---|
| A news article | `assets/nyheter/<same-name-as-your-post>/` | `/assets/nyheter/2026-03-02-icm-2026/icm-2026-philadelphia.jpg` |
| A picture reused by several news articles | `assets/nyheter/common_images/` | `/assets/nyheter/common_images/Niels_Henrik_Abel.jpg` |
| An event | `assets/arrangementer/<same-name-as-your-post>/` | `/assets/arrangementer/2026-05-12-nasjonalt-matematikermote-2026/trondheim.jpg` |
| An INFOMAT issue | `assets/infomat/<YYYY-MM>/` | `/assets/infomat/2026-04/egmo-2026-team.jpg` |
| A PDF or other document | `assets/documents/` | `/assets/documents/generalforsamling/referat-gf-2010.pdf` |

News articles and events get **one folder per post**, named exactly after the post file (without the `.md`) — that keeps the images with the article they belong to and makes them easy to find and remove later. So a post at `_posts/arrangementer/2026-05-12-nasjonalt-matematikermote-2026.md` keeps its images in `assets/arrangementer/2026-05-12-nasjonalt-matematikermote-2026/`.

## Tips

- **Copy an existing post** as a starting point — it is faster and it gets the front matter right.
- **Preview before you publish.** GitHub shows a rendered preview while editing `.md` files, most editors have one built in, and `bundle exec jekyll serve` shows the real page.
- **Keep it simple.** Most content only needs headings, paragraphs, links, and lists.
- **Check where it landed.** After publishing, look at the listing page ([/nyheter](https://matematikkforeningen.no/nyheter), [/arrangementer](https://matematikkforeningen.no/arrangementer), [/infomat](https://matematikkforeningen.no/infomat)) and confirm your post is on it.
