# Jekyll and deployment

*For the maintainer, and for contributors who want to preview changes before pushing them.*

You do not need any of this to contribute — see [2_CONTRIBUTING.md → Path A](2_CONTRIBUTING.md#path-a-edit-in-your-browser). You need it when you want to see the finished site on your own computer before anybody else sees it.

## What Jekyll does

Jekyll is a **static site generator**. It reads the folder of text files and writes out a finished website of plain HTML.

```
_posts/nyheter/2026-03-02-icm-2026.md    ← what you write (Markdown + front matter)
        +
_layouts/nyheter_template.html           ← the frame around it
        +
_includes/default_header.html            ← the shared pieces
        ↓  jekyll build
_site/nyheter/2026/03/02/icm-2026.html      ← what visitors get
```

Three consequences worth understanding:

- **The `_site/` folder is output, not source.** It is rebuilt from scratch every time and is not stored in Git. Editing it achieves nothing.
- **`layout:` in a post's front matter picks the frame.** That is why the layout name has to be one of the three real ones — see [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md#where-the-file-goes).
- **There is no database and nothing running on a server.** The published site is a folder of files, which is why it is fast, cheap, and nearly impossible to break permanently.

This site uses **Jekyll 4.4** with one plugin, `jekyll-feed` (it generates `/feed.xml`). It does not use a theme — all styling is local, in `assets/main.css`.

## Install Jekyll

Jekyll is written in Ruby, so you install Ruby first. You also need Git.

### Ubuntu / Debian

```bash
# Install Ruby and build tools
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev git

# Configure gem installation path (avoid permission issues)
echo 'export GEM_HOME="$HOME/.gems"' >> ~/.bashrc
echo 'export PATH="$HOME/.gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Bundler and Jekyll
gem install bundler jekyll

# Clone and run the site
git clone https://github.com/ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
# → Open http://localhost:4000
```

### Fedora

```bash
# Install Ruby and build tools
sudo dnf install ruby ruby-devel gcc make git

# Configure gem installation path (avoid permission issues)
echo 'export GEM_HOME="$HOME/.gems"' >> ~/.bashrc
echo 'export PATH="$HOME/.gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Bundler and Jekyll
gem install bundler jekyll

# Clone and run the site
git clone https://github.com/ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
# → Open http://localhost:4000
```

### macOS

> ⚠️ **macOS system Ruby is locked.** Running `gem install` will fail with:
> `You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.`
> Use one of the two methods below.

**Option A — Homebrew Ruby (recommended):**

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby via Homebrew (bypasses the locked system Ruby)
brew install ruby

# Add Homebrew Ruby to your PATH
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Now this will work — it writes to Homebrew's path, not the system path
gem install bundler jekyll

# Clone and run the site
git clone https://github.com/ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
# → Open http://localhost:4000
```

> 💡 On **Apple Silicon** (M1/M2/M3 and later), the Homebrew path is different:
> `echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc`

**Option B — User install (no Homebrew):**

If you prefer not to install Homebrew, install gems to your home directory instead:

```bash
# Install gems into your home directory instead of the system path
gem install bundler jekyll --user-install

# Add the user gem path to your shell (this works out the right path for your Ruby version)
echo 'export PATH="$(ruby -e "puts Gem.user_dir")/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Clone and run
git clone https://github.com/ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
```

### Check that it worked

```bash
ruby --version     # 3.0 or newer (the automatic checks use 3.3)
bundle --version   # 2.x or newer
jekyll --version   # 4.x

# Build the site without starting a server — this is the same check that runs on every pull request
bundle exec jekyll build
```

## Running the site locally

Run these from inside the `nmf-website` folder.

| Command | What it does |
|---|---|
| `bundle install` | Install the exact gems the site needs. Run once, and again if `Gemfile` changes. |
| `bundle exec jekyll serve` | Build the site and serve it at **http://localhost:4000**. Leave it running — it rebuilds automatically when you save a file; just reload the browser. |
| `bundle exec jekyll serve --drafts` | The same, but also shows posts in `_drafts/` |
| `bundle exec jekyll serve --livereload` | The same, but reloads the browser for you |
| `bundle exec jekyll build` | Build into `_site/` without serving. **This is the check to run before pushing.** |

Stop the server with `Ctrl+C`.

`bundle exec` matters: it runs the versions of Jekyll listed in the `Gemfile` rather than whatever else is installed on your machine. Plain `jekyll serve` may work, but when it behaves differently from everyone else, this is why.

## Common issues

| Problem | Fix |
|---|---|
| `Permission denied` when installing gems | Make sure `GEM_HOME` is set (see the install instructions above) |
| **macOS:** `write permissions for /Library/Ruby/Gems` | macOS system Ruby is locked. Use **Homebrew Ruby** or `gem install --user-install` (see the macOS section) |
| `bundle: command not found` | Run `gem install bundler` and make sure `~/.gems/bin` is in your PATH |
| `jekyll: command not found` | Run `gem install jekyll`, or use `bundle exec jekyll` instead |
| `Could not find gem ...` | Run `bundle install` from inside the `nmf-website` folder |
| Port 4000 already in use | Another copy is still running. Stop it, or use `bundle exec jekyll serve --port 4001` |
| Changes don't appear in the browser | Hard-reload with `Ctrl+Shift+R`. Front matter changes sometimes need a restart of `jekyll serve` |
| A post you just wrote is missing | Almost always a `date` in the future or a wrong `categories` value — see [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md#two-mistakes-that-make-a-post-disappear) |
| `Invalid YAML front matter` | A quotation mark, colon, or indent is off in the block between the `---` markers. Compare against an existing post. |
| It builds for you but fails in the pull request | `Gemfile.lock` is not stored in Git, so the checks resolve gem versions fresh. Delete your local `Gemfile.lock`, run `bundle install` again, and try once more. |

## How the site gets published

Two separate automatic systems run when you push, and they are easy to confuse:

| System | Triggered by | What it does |
|---|---|---|
| **GitHub Actions** (`.github/workflows/preview.yml`) | Opening or updating a pull request to `main` or `staging` | **Checks only.** Builds the site and validates every `_data/*.yml` file, then reports green or red on the pull request. It publishes nothing. |
| **Cloudflare Pages** | A commit landing on `main` or `staging` | **Publishes.** Builds the site and serves the result. |

So the sequence for any change is:

```
push branch → GitHub Actions checks the pull request → merge to staging
   → Cloudflare publishes staging.nmf-website.pages.dev
   → merge staging to main
   → Cloudflare publishes matematikkforeningen.no
```

A build takes a few minutes. Nobody has to press a deploy button, and the Cloudflare dashboard is not part of the routine — see [5_GIT_AND_GITHUB.md → Where the site is published](5_GIT_AND_GITHUB.md#where-the-site-is-published).

**If a change does not appear on the live site**, check in this order:

1. Was the pull request actually merged, and into which branch? A change merged to `staging` is not on `main`.
2. Was the automatic check green? A failed build means Cloudflare keeps serving the previous version — the site does not break, but the change is not there.
3. Is it a post with a `date` in the future? Then it is genuinely not in the built site yet.
4. Your browser's cache. `Ctrl+Shift+R`.
