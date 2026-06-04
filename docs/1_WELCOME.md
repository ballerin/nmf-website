# Welcome! 👋

This is the documentation for the **Norsk Matematisk Forening** website.

## What is this?

The NMF website is a collection of pages about the society — news, events, the INFOMAT magazine, board members, prizes, and more. The site lives on the internet and is built from simple text files stored on GitHub.

## Do I need to be a programmer?

**No.** If you can write an email, you can edit this website.

All content is written in **Markdown** — a simple plain-text format that's easy to learn. You edit files directly on GitHub in your browser. No installs, no special software.

| Method | Best for | Difficulty |
|---|---|---|
| **GitHub web editor** | Editing Markdown files (news, events) and YAML data files (navigation, board) | 🟢 Easy — edit text in your browser |

> 💡 **Best editor:** [VS Code](https://code.visualstudio.com/) is the recommended editor for this project. It has built-in Markdown preview (Ctrl+Shift+V), YAML syntax highlighting, Git integration, and a terminal — everything you need in one window. It's free and works on Linux, macOS, and Windows.

## Local development — Install and run Jekyll

If you want to preview your changes before pushing them, you can run the site locally on your computer. This requires installing Ruby and Jekyll.

### Ubuntu / Debian

```bash
# Install Ruby and build tools
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev

# Configure gem installation path (avoid permission issues)
echo 'export GEM_HOME="$HOME/.gems"' >> ~/.bashrc
echo 'export PATH="$HOME/.gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Bundler and Jekyll
gem install bundler jekyll

# Clone and run the site
git clone git@github.com:ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
# → Open http://localhost:4000
```

### Fedora

```bash
# Install Ruby and build tools
sudo dnf install ruby ruby-devel gcc make

# Configure gem installation path (avoid permission issues)
echo 'export GEM_HOME="$HOME/.gems"' >> ~/.bashrc
echo 'export PATH="$HOME/.gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Bundler and Jekyll
gem install bundler jekyll

# Clone and run the site
git clone git@github.com:ballerin/nmf-website.git
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
git clone git@github.com:ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
# → Open http://localhost:4000
```

> 💡 On **Apple Silicon** (M1/M2/M3), the Homebrew path is different:  
> `echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc`

**Option B — User install (no Homebrew):**

If you prefer not to install Homebrew, install gems to your home directory instead:

```bash
# Install gems to ~/.gem instead of the system path
gem install bundler jekyll --user-install

# Add the user gem path to your shell
echo 'export PATH="$HOME/.gem/ruby/3.0.0/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Clone and run
git clone git@github.com:ballerin/nmf-website.git
cd nmf-website
bundle install
bundle exec jekyll serve
```

### Quick test after setup

```bash
# Verify everything is installed correctly
ruby --version     # Should be 3.0 or newer
jekyll --version   # Should show 4.x
bundle --version   # Should show 2.x

# Build the site (no server, just check for errors)
bundle exec jekyll build
```

### Common issues

| Problem | Fix |
|---|---|
| `Permission denied` when installing gems | Make sure `GEM_HOME` is set (see instructions above) |
| **macOS:** `write permissions for /Library/Ruby/Gems` | macOS system Ruby is locked. Use **Homebrew Ruby** or `gem install --user-install` (see macOS section above) |
| `bundle: command not found` | Run `gem install bundler` and ensure `~/.gems/bin` is in your PATH |
| `jekyll: command not found` | Run `gem install jekyll` or use `bundle exec jekyll` instead |
| `Could not find gem ...` | Run `bundle install` from inside the `nmf-website` folder |
| Port 4000 already in use | Use `bundle exec jekyll serve --port 4001` |
| Live reload not working | Use `bundle exec jekyll serve --livereload` |

## Where to start

- **New to Markdown?** → Read [`2_MARKDOWN_GUIDE.md`](2_MARKDOWN_GUIDE.md) first
- **Not sure which files you can edit?** → See [`3_FILE_STRUCTURE.md`](3_FILE_STRUCTURE.md)
- **How do branches and deploys work?** → See [`4_BRANCHING_STRATEGY.md`](4_BRANCHING_STRATEGY.md)

## Who to ask for help

If something isn't working, contact the person who set up the site or the current maintainer listed in the GitHub repository.
