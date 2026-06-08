# Branching Strategy

The NMF website uses a **two-branch strategy** with Cloudflare Pages for automatic deployments.

## Branches

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | **Production** — the live public site | Custom domain |
| `staging` | **Testing** — preview changes before going live | `staging.nmf-website.pages.dev` |

## Merge Flow

```
feature-branch ──PR──▶ staging ──PR──▶ main
  (local dev)        (testing)        (production)
```

## Full workflow — Step by step

Here's a complete walkthrough. Meet **Bob**, who wants to add a news article announcing the 2026 Abel Prize winner.

---

### Step 1: Start fresh

**What Bob does:** Bob opens his terminal (or VS Code), makes sure he has the latest production code, and creates a new branch for his work.

| Git command | VS Code equivalent |
|---|---|
| `git checkout main` | Click the branch name in the status bar (bottom-left) → pick `main` from the list |
| `git pull` | `Ctrl+Shift+G` (Source Control) → **⋯** menu → **Pull** |
| `git checkout -b abelprize-2026` | `Ctrl+Shift+G` → **⋯** menu → **Branch** → **Create Branch** → type `abelprize-2026` |

```bash
git checkout main
git pull
git checkout -b abelprize-2026
```

---

### Step 2: Make changes

**What Bob does:** Bob creates a new Markdown file for his news article and writes the content. He previews it locally to check how it looks.

| Action | Git command | VS Code equivalent |
|---|---|---|
| Create the post file | *(no git command — just create the file)* | File Explorer (`Ctrl+Shift+E`) → right-click `_posts/nyheter/` → **New File** → `2026-06-04-abelprisvinner-2026.md` |
| Write content | *(edit in your editor)* | Edit in VS Code. Press `Ctrl+Shift+V` to open Markdown preview side-by-side |
| Preview the site | `bundle exec jekyll serve` | `` Ctrl+` `` (open terminal) → `bundle exec jekyll serve` → open http://localhost:4000 |
| Verify build | `bundle exec jekyll build` | Same terminal: `bundle exec jekyll build` |

```bash
# Create the post (in _posts/nyheter/)
# ... write your Markdown content ...

# Preview the site
bundle exec jekyll serve
# → Open http://localhost:4000 in your browser

# Verify no build errors
bundle exec jekyll build
```

---

### Step 3: Commit and push

**What Bob does:** Bob is happy with his article. He stages the files, writes a commit message, and pushes his branch to GitHub.

| Action | Git command | VS Code equivalent |
|---|---|---|
| See what changed | `git status` | `Ctrl+Shift+G` → changed files appear under **Changes** |
| Stage all changes | `git add .` | `Ctrl+Shift+G` → hover over **Changes** → click the **+** (Stage All Changes) |
| Commit | `git commit -m "Add Abel Prize 2026 news"` | `Ctrl+Shift+G` → type message in the box → `Ctrl+Enter` to commit |
| Push to GitHub | `git push -u origin abelprize-2026` | `Ctrl+Shift+G` → **⋯** menu → **Push**, or click the **Publish Branch** button in the status bar |

```bash
git add .
git commit -m "Add Abel Prize 2026 news article"
git push -u origin abelprize-2026
```

---

### Step 4: Open a pull request to staging

**What Bob does:** Bob opens GitHub in his browser and creates a pull request from his feature branch to `staging`. GitHub Actions runs the build checks automatically.

| Action | Where |
|---|---|
| Open the PR page | Push output shows a link, or go to the repo → **Pull requests** → **New pull request** |
| Set branches | **base:** `staging` ← **compare:** `abelprize-2026` |
| Fill in details | Write a title and description of your changes |
| Create PR | Click **Create pull request** |

> 💡 **VS Code tip:** Install the [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension to create and manage PRs without leaving VS Code. After pushing, open the extension (`Ctrl+Shift+P` → "GitHub Pull Requests: Create Pull Request") and select `staging` as the target.

GitHub Actions runs the build + YAML validation. If everything passes (✅ green), merge the PR into `staging`. Cloudflare Pages deploys it to `staging.nmf-website.pages.dev`.

---

### Step 5: Verify on staging — and iterate if needed

**What Bob does:** Bob opens the staging URL and checks that his article looks right. He notices a typo in the title — so he fixes it and pushes again.

| Action | Git command | VS Code equivalent |
|---|---|---|
| Switch back to your branch | `git checkout abelprize-2026` | Click branch name in status bar → pick `abelprize-2026` |
| Fix the file | *(edit the .md file)* | Edit in VS Code. `Ctrl+Shift+V` to preview |
| Preview locally | `bundle exec jekyll serve` | Terminal: `bundle exec jekyll serve` |
| Stage, commit, push | `git add .` / `git commit -m "Fix typo"` / `git push` | `Ctrl+Shift+G` → stage → type message → `Ctrl+Enter` → **⋯** → **Push** |

```bash
git checkout abelprize-2026

# ... fix the typo ...

git add .
git commit -m "Fix typo in Abel Prize title"
git push
```

The PR to `staging` updates automatically with the new commit. Cloudflare redeploys. Bob checks staging again — looks good now!

> 💡 Repeat this loop as many times as needed. **Stay on your feature branch**, fix → commit → push → check staging.

---

### Step 6: Merge to production

**What Bob does:** Staging is approved. Bob opens a new PR from `staging` to `main` and merges it.

| Action | Where |
|---|---|
| Open PR | GitHub → **Pull requests** → **New pull request** |
| Set branches | **base:** `main` ← **compare:** `staging` |
| Review | Double-check the diff — this is what goes live |
| Merge | Click **Merge pull request** → **Confirm merge** |

Cloudflare Pages deploys to the production domain automatically.

---

### Step 7: Clean up

**What Bob does:** Bob switches back to `main`, pulls the merged changes, and deletes his feature branch (both locally and on GitHub).

| Action | Git command | VS Code equivalent |
|---|---|---|
| Switch to main | `git checkout main` | Click branch name in status bar → pick `main` |
| Pull latest | `git pull` | `Ctrl+Shift+G` → **⋯** → **Pull** |
| Delete local branch | `git branch -d abelprize-2026` | `Ctrl+Shift+G` → **⋯** → **Branch** → **Delete Branch** → pick `abelprize-2026` |
| Delete remote branch | `git push origin --delete abelprize-2026` | *(Use terminal or GitHub UI)* |

```bash
git checkout main
git pull
git branch -d abelprize-2026
git push origin --delete abelprize-2026
```

---

### Summary cheat sheet

```bash
# 1. Start
git checkout main && git pull
git checkout -b my-feature

# 2. Work & preview
# ... edit files ...
bundle exec jekyll serve       # localhost:4000
bundle exec jekyll build       # verify no errors

# 3. Commit & push
git add .
git commit -m "Description"
git push -u origin my-feature  # then open PR: my-feature → staging

# 4. Verify on staging.nmf-website.pages.dev

# 5. Iterate (if needed)
# ... fix issues ...
git add . && git commit -m "Fixes"
git push                       # PR updates, re-check staging

# 6. Merge to production
# PR: staging → main (on GitHub)

# 7. Clean up
git checkout main && git pull
git branch -d my-feature
git push origin --delete my-feature
```

## Automatic Build Checks

Every pull request to `main` or `staging` triggers two checks via GitHub Actions (`.github/workflows/preview.yml`):

| Check | What it does | Local equivalent |
|---|---|---|
| **Build site** | Runs `jekyll build --verbose` — catches syntax errors, bad front matter, missing layouts | `bundle exec jekyll build` |
| **Validate YAML** | Parses all `_data/*.yml` files — catches indentation errors, tabs, malformed YAML | `ruby -ryaml -e "YAML.load_file('_data/navigation.yml')"` |

The built site is uploaded as an artifact (retained 7 days) so you can download and inspect it if something goes wrong.

If either check fails, the PR shows a red ✗ and cannot be merged. **Always run `bundle exec jekyll build` locally before pushing.**

## Cloudflare Pages

Both `main` and `staging` branches are automatically built and deployed by Cloudflare Pages:

- **Production** (`main`): Deploys to the custom domain (e.g., `matematikkforeningen.no`)
- **Preview** (`staging`): Deploys to `staging.nmf-website.pages.dev`
- **PR previews**: Cloudflare also creates temporary preview deployments for each open PR, with URLs like `<branchname>.nmf-website.pages.dev`

## Best Practices

- **Never commit directly to `main`** — always go through PRs
- **Keep `staging` in sync** — after merging to `main`, merge `main` back into `staging` or rebase
- **Delete feature branches** after they're merged
- **Test locally** before pushing — `bundle exec jekyll build` must succeed
- **Review the staging deployment** before merging to `main`
