# Git and GitHub

*For contributors who want the full picture, and for the maintainer who reviews and merges.*

The NMF website uses a **two-branch strategy** with Cloudflare Pages for automatic deployments. If you only want to fix a typo, you do not need this file — [2_CONTRIBUTING.md](2_CONTRIBUTING.md) is enough.

## The words

| Word | Means |
|---|---|
| **Repository** (repo) | The project — all its files, plus the history of every change ever made |
| **Branch** | A parallel copy of the files where work can happen without disturbing the live version |
| **Commit** | One saved change, with a message describing it |
| **Push** | Send your commits from your computer up to GitHub |
| **Pull request** (PR) | A request to take the changes on one branch and add them to another. Where changes are discussed and reviewed. |
| **Merge** | Accept a pull request — the changes join the target branch |

## Branches

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | **Production** — the live public site | [matematikkforeningen.no](https://matematikkforeningen.no) |
| `staging` | **Testing** — see changes together before they go live | [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev) |
| *feature branches* | One per change, named after what it does | Nothing — they exist only until merged |

## Merge flow

```
feature-branch ──PR──▶ staging ──PR──▶ main
  (your work)         (testing)      (production)
```

Nothing is committed directly to `main` or `staging`. Everything arrives through a pull request.

## Full workflow step by step

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

GitHub Actions runs the build + YAML validation. Once it is green and the maintainer has reviewed it, the PR is merged into `staging`, and Cloudflare Pages deploys it to [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev).

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

**What Bob does:** Staging looks right. The maintainer opens a pull request from `staging` to `main` and merges it.

| Action | Where |
|---|---|
| Open PR | GitHub → **Pull requests** → **New pull request** |
| Set branches | **base:** `main` ← **compare:** `staging` |
| Review | Double-check the diff — this is what goes live |
| Merge | Click **Merge pull request** → **Confirm merge** |

Cloudflare Pages deploys to [matematikkforeningen.no](https://matematikkforeningen.no) automatically.

---

### Step 7: Clean up

**What Bob does:** Bob switches back to `main`, pulls the merged changes, and deletes his feature branch (both locally and on GitHub).

| Action | Git command | VS Code equivalent |
|---|---|---|
| Switch to main | `git checkout main` | Click branch name in status bar → pick `main` |
| Pull latest | `git pull` | `Ctrl+Shift+G` → **⋯** → **Pull** |
| Delete local branch | `git branch -d abelprize-2026` | `Ctrl+Shift+G` → **⋯** → **Branch** → **Delete Branch** → pick `abelprize-2026` |
| Delete remote branch | `git push origin --delete abelprize-2026` | *(GitHub offers a **Delete branch** button on the merged PR)* |

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

## Reviewing and merging a pull request

*This is the maintainer's job.* Most of it happens in the browser and takes a couple of minutes.

Open pull requests are listed under the **Pull requests** tab of the repository. GitHub emails you when one arrives.

### 1. Read the change

Open the PR and click the **Files changed** tab. Removed lines are red, added lines are green. For a typo fix or a new post this is usually the whole review.

Two things to glance at, beyond the words themselves:

- **Are only the expected files touched?** A pull request that adds a news article should change one `.md` file plus perhaps some images. If it also changes `_layouts/`, `_config.yml`, or `assets/main.css`, that is worth a question — those are the files in [4_FILE_STRUCTURE.md → Files you should never edit](4_FILE_STRUCTURE.md#files-you-should-never-edit).
- **Is `_site/` in the list?** It should never be. That folder is generated.

### 2. Check the automatic checks

At the bottom of the **Conversation** tab, GitHub shows the result of the automatic checks.

- **Green ✅** — the site builds and the data files are valid.
- **Red ❌** — click **Details** to see what failed. Do not merge a red pull request; the same failure will happen when Cloudflare builds the site, and the live site will simply keep serving the previous version while the change appears to have vanished.

Common causes and what to tell the contributor are in [6_JEKYLL_AND_DEPLOYMENT.md → Common issues](6_JEKYLL_AND_DEPLOYMENT.md#common-issues).

### 3. See it rendered

Reading a diff tells you the text is right; it does not tell you the page looks right.

- **If a preview link appears on the pull request** — Cloudflare Pages can post one — open it and look at the actual page. Note that previews are not created for pull requests from forks.
- **Otherwise**, merge into `staging` first and check [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev). That is what `staging` is for: merging there is cheap and reversible, and nothing is public yet.
- **Or check it out locally**, which works for fork pull requests too. With the [GitHub CLI](https://cli.github.com/):

  ```bash
  gh pr checkout 42          # 42 = the pull request number
  bundle exec jekyll serve
  ```

  Without the CLI:

  ```bash
  git fetch origin pull/42/head:pr-42
  git checkout pr-42
  bundle exec jekyll serve
  ```

  When you are done: `git checkout main` and `git branch -D pr-42`.

### 4. Comment and suggest

On the **Files changed** tab, hover over a line and click the blue **+** to comment on that exact line.

For anything you could fix yourself in one word — a typo, a wrong date, a missing quotation mark — use a **suggestion** instead of describing the problem. Click the **±** icon in the comment toolbar, edit the text inside the block, and post it. The contributor gets a **Commit suggestion** button and applies it with one click.

````
```suggestion
categories: [news]
```
````

Group your comments: click **Start a review** rather than posting each one separately, then **Submit review** when you are done, so the contributor gets one notification instead of ten.

### 5. Approve and merge

Choose **Approve** in the review dialog, or just merge — for a small society website, requiring formal approval on your own repository mostly gets in the way.

Then pick the merge button carefully, because the two branches want different things:

| Merging | Use | Why |
|---|---|---|
| feature branch → `staging` | **Squash and merge** | Collapses "add post", "fix typo", "fix typo again" into one clean entry. The history stays readable. |
| `staging` → `main` | **Merge pull request** (a normal merge commit) | `staging` is long-lived. Squashing it rewrites the change into something `staging` does not recognise, and the two branches then drift apart permanently. |

After merging, click **Delete branch**. The work is safely in `staging`; the branch is not needed.

### 6. Promote staging to main

Publishing is a deliberate act. When `staging` looks right and you are ready to make it public:

1. **Pull requests** → **New pull request**, **base: `main`** ← **compare: `staging`**.
2. Read the diff once more — this is exactly what the public will see.
3. **Merge pull request** (not squash — see the table above).
4. Cloudflare Pages rebuilds and the change is live at [matematikkforeningen.no](https://matematikkforeningen.no) within a few minutes.

There is no hurry to do this after every merge. Collecting a few changes and promoting them together is perfectly normal.

## Keeping staging in sync

In a two-branch setup, the branches drift apart when something reaches `main` without going through `staging`. Then the next `staging` → `main` pull request shows confusing changes, or offers to undo the fix.

The rule that prevents it: **nothing lands on `main` except through a `staging` → `main` pull request.**

If it ever happens anyway — an urgent fix made directly on `main`, or an edit committed to `main` through the GitHub web editor by mistake — repair it immediately:

```bash
git checkout staging
git pull
git merge main
git push
```

`staging` now contains everything `main` has, and the two are aligned again. Doing this the same day is easy; doing it three months later is not.

## Automatic build checks

Every pull request to `main` or `staging` triggers two checks via GitHub Actions (`.github/workflows/preview.yml`):

| Check | What it does | Local equivalent |
|---|---|---|
| **Build site** | Runs `jekyll build --verbose` — catches syntax errors, bad front matter, missing layouts | `bundle exec jekyll build` |
| **Validate YAML** | Parses all `_data/*.yml` files — catches indentation errors, tabs, malformed YAML | `ruby -ryaml -e "YAML.load_file('_data/navigation.yml')"` |

The built site is uploaded as an artifact (retained 7 days) so you can download and inspect it if something goes wrong.

A failing check shows a red ❌. GitHub will still let you merge it unless the repository is configured to forbid that — so treat a red check as a stop sign. **Always run `bundle exec jekyll build` locally before pushing.**

> 💡 **Maintainer, one-time setup:** to have GitHub enforce this rather than relying on discipline, go to **Settings → Branches → Add branch ruleset** for `main` and `staging`, and enable **Require status checks to pass**. Then a red pull request genuinely cannot be merged.

## Where the site is published

Both branches are built and published by **Cloudflare Pages**, which watches GitHub and rebuilds by itself:

| Branch | Address | Who sees it |
|---|---|---|
| `main` | [matematikkforeningen.no](https://matematikkforeningen.no) | Everyone |
| `staging` | [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev) | Anyone with the link — but nobody is looking |

A build takes a few minutes. You do not need to open the Cloudflare dashboard for any of this: merging on GitHub is the whole publishing step, and if a page has not changed after five minutes, reload with `Ctrl+Shift+R` before assuming something is wrong. The dashboard is only needed for one-off settings such as domains — the site's *content* is never edited there.

## Best practices

- **Never commit directly to `main`** — always go through pull requests
- **Keep `staging` in sync** — if anything ever lands on `main` directly, merge `main` back into `staging` the same day
- **Delete feature branches** after they're merged
- **Test locally** before pushing — `bundle exec jekyll build` must succeed
- **Review the staging deployment** before merging to `main`
- **One topic per pull request** — small ones get reviewed quickly, large ones sit for a week
