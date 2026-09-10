# Welcome! 👋

This is the documentation for the **Norsk matematisk forening** (NMF) website.

## What is this?

The NMF website is a collection of pages about the society — news, events, the INFOMAT magazine, board members, prizes, and more.

The site is *static*. There is no database and no admin login: the whole website is a folder of text files. You change a text file, and a few minutes later that change is live at [matematikkforeningen.no](https://matematikkforeningen.no) (once the change is approved by the admin). Three pieces make that happen:

| Piece | Role |
|---|---|
| **GitHub** | Stores the files and keeps the full history of every change. This is where you edit and where changes are discussed. |
| **Jekyll** | Turns the text files into a finished website. You only need to install it on your machine if you want to preview changes on your own computer. The live version compiles the website from scratch every time a new modification is made |
| **Cloudflare Pages** | Watches GitHub and publishes the finished site when it detects a change. Nobody has to press a "deploy" button — once the change is approved it gets automatically deployed |

## Do I need to be a programmer to contribute?

**No.** If you can write an email, you can edit this website. In principle you could even do everything in your browser — no installs, no special software. See [Path A in 2_CONTRIBUTING.md](2_CONTRIBUTING.md#path-a-edit-in-your-browser).

## What the site is made of

Two kinds of content files, and it matters which one you are editing:

| Kind | Where | Format |
|---|---|---|
| **Posts** — news, events, INFOMAT issues | `_posts/` | **Markdown** (`.md`) — a simple plain-text format, easy to learn. It is basically baby-LaTeX. |
| **Pages** — history, membership, contact, board, and the front page | `_pages/` | **HTML** |
| **Data** — links, styremedlemmer, website configs | `_data/` | **YAML** (`.yml`) |

So if you are adding a news article you are writing Markdown, and [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md) tells you everything you need.

If you are fixing a typo on an existing page, you are editing either an HTML or a Markdown file, depending on the complexity of the page. Do not let that scare you if you don't know HTML: for simple changes you can just find the sentence, change the words, and leave everything with `<` and `>` around it alone.

> 💡 **Best editor:** [VS Code](https://code.visualstudio.com/) is the recommended editor for this project. It has built-in Markdown preview, YAML syntax highlighting, Git integration, and a terminal — everything you need in one window. It's free and works on Linux, macOS, and Windows.

## Which reader are you?

| You are… | Start with |
|---|---|
| **Fixing a typo, or adding one post**, and would rather not install anything | [2_CONTRIBUTING.md → Path A](2_CONTRIBUTING.md#path-a-edit-in-your-browser) |
| **Contributing regularly** and happy to use an editor and a terminal | [2_CONTRIBUTING.md → Path B](2_CONTRIBUTING.md#path-b-work-on-your-own-computer) |
| **Not a member of the project** but you want to propose a change | [2_CONTRIBUTING.md → Working from a fork](2_CONTRIBUTING.md#working-from-a-fork), then Path A or B |
| **The maintainer** — you review other people's changes and decide what goes live | [5_GIT_AND_GITHUB.md](5_GIT_AND_GITHUB.md#reviewing-and-merging-a-pull-request) |

## Two things worth knowing up front

- **You cannot break the live site by editing a file.** Changes are proposed first and reviewed before they go live, and every version is kept forever, so anything can be undone.
- **Mistakes can happen. They will not break the site.** Typos and wrong information can make their way into the published version. However, coding errors which break the website are caught at compilation time and the deployment pipeline falls back to the previous version in this case.
- **Some files run the website rather than fill it.** Templates, styling, and configuration are listed in [4_FILE_STRUCTURE.md](4_FILE_STRUCTURE.md#files-you-should-never-edit). They might have a broader impact than what you think. If you need one of those changed, ask the maintainer.

## Who to ask for help

If something isn't working, contact the current maintainer listed in the GitHub repository, or open an issue on GitHub describing what you tried and what happened.
