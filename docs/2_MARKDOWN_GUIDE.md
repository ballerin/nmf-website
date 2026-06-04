# Markdown Guide — How to write and format content

All content on the NMF website is written in **Markdown** — a simple way to format text using plain characters. This guide covers everything you need.

## What is Markdown?

Markdown is a lightweight markup language. You write in plain text, and Jekyll converts it to clean HTML for the website. Files use the `.md` extension.

## Headings

Use `#` for headings. More `#` symbols = smaller heading.

```markdown
## Section Heading      (main section)
### Sub-section         (sub-section)
#### Minor heading      (rarely needed)
```

**Never use `#` (level 1)** — the post title already uses it.

## Paragraphs and line breaks

Separate paragraphs with a blank line:

```markdown
This is the first paragraph.

This is the second paragraph.
```

For a line break within a paragraph, end the line with two spaces.

## Bold and italic

```markdown
**bold text**       → **bold text**
*italic text*       → *italic text*
***bold italic***   → ***bold italic***
```

## Links

```markdown
[link text](https://example.com)
```

Example:
```markdown
See the [NMF website](https://matematikkforeningen.no) for more info.
```

### Internal links (within the site)

```markdown
[About us](/hva-vi-gjor)
[Board members](/styremedlemmer)
[News archive](/nyheter)
```

## Images

```markdown
![alt text](/assets/images/nyheter/my-image.jpg)
```

**Tips for images:**
- Use landscape images around 1200×600 pixels for best results
- Store images in the correct folder (see [`docs/3_FILE_STRUCTURE.md`](3_FILE_STRUCTURE.md))
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

Align columns with colons:
```markdown
| Left | Center | Right |
|:---|---:|:---|
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

## Post front matter

Every post file starts with **front matter** — metadata between `---` markers. This is YAML, not Markdown:

```yaml
---
layout: activity_post
title: "Your Event Title"
date: 2026-06-15
author: "Your Name"
image: /assets/images/arrangementer/event-hero.jpg
categories: [Konferanse]
---
```

The content below the second `---` is regular Markdown. See existing posts in `_posts/` for examples you can copy.

## Quick reference

| You want... | You type... |
|---|---|
| **Bold** | `**bold**` |
| *Italic* | `*italic*` |
| [Link](https://example.com) | `[Link](https://example.com)` |
| ![Image](/path/img.jpg) | `![Image](/path/img.jpg)` |
| ## Heading | `## Heading` |
| - List item | `- List item` |
| > Quote | `> Quote` |
| --- (divider) | `---` |
| `code` | `` `code` `` |

## Tips

- **Copy existing posts** as a starting point — find a similar post in `_posts/` and duplicate it
- **Preview** — GitHub shows a rendered preview when editing `.md` files
- **Keep it simple** — most content only needs headings, paragraphs, links, and lists
