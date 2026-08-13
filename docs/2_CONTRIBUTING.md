# How to contribute

*For contributors. Assumes you have read [1_WELCOME.md](1_WELCOME.md).*

Every change to the website goes through the same three steps, no matter how big it is:

1. **Put your change on a branch** — a separate copy of the site where you can work without touching the live version.
2. **Open a Pull Request (PR)** — GitHub's way of saying "please look at this and add it to the site".
3. **One of the maintainers reviews it and merges it.** You do not merge your own changes.

Two questions decide the details, and they are independent of each other:

| Question | Answers |
|---|---|
| **Where does your branch live?** | In the repository itself, or in your own fork of it. Decided for you by whether you have write access — see [step 1](#step-1-where-your-branch-lives). |
| **Where do you edit?** | In your browser, or on your own computer. Entirely your choice — see [step 2](#step-2-where-you-edit). |

Any combination works. You can fork the project and still never leave github.com; you can be a collaborator and still prefer a local clone.

## Step 1: Where your branch lives

Open the repository on GitHub and look at any file:

- **You see a pencil ✏️ icon** to edit it → you are a **collaborator**. Nothing to do; go to step 2.
- **No pencil icon** (GitHub offers to fork the repository instead) → you are an **outside contributor**. Click **Fork** to copy the project on your own account, so that you can apply an edit to it. You now have your own copy at `github.com/@your-username/nmf-website`, and you can change anything in it.

|  | Collaborator | From a fork |
|---|---|---|
| Before you start | Nothing | Click **Fork**, once and for all |
| You work in | `ballerin/nmf-website` | `your-username/nmf-website` |
| Your branch lives in | The repository | Your fork |
| Your pull request goes | your branch → `staging` | your fork's branch → `staging` in `ballerin/nmf-website` |

**Everything else is identical.** Editing a file, committing, opening a pull request, and responding to review all work exactly the same way. If you forked, just make sure the address bar says *your* username while you work. A few extra details that only apply to forks are collected in [Working from a fork](#working-from-a-fork) at the end.

## Step 2: Where you edit

| Path | Use it when | Needs |
|---|---|---|
| [**A — In your browser**](#path-a-edit-in-your-browser) | Fixing a typo, editing text on a page, adding a post, small edits to one or two files | A GitHub account. Nothing else. |
| [**B — On your own computer**](#path-b-work-on-your-own-computer) | Adding posts regularly, adding many images, wanting to see a preview of the result before others do | Git and (optionally) Jekyll installed |

## Path A: Edit in your browser

No installation. Everything happens on github.com.

1. Open the repository on GitHub — **your fork, if you made one** — and click your way to the file you want to change.
   - Text on a page → `_pages/`, e.g. `_pages/historie.html`
   - A news article, event, or INFOMAT issue → `_posts/nyheter/`, `_posts/arrangementer/`, `_posts/infomat/`
   - The menu, board list, slideshow, or links page → `_data/` (see [4_FILE_STRUCTURE.md](4_FILE_STRUCTURE.md#data-files-you-can-edit))
2. Click the **pencil ✏️ icon** in the top right of the file.
3. Make your edit. If the file ends in `.md` you can click the **Preview** tab to see how it will look.
4. Click **Commit changes…** in the top right. You can make multiple edits and multiple changes before submitting them for review to the mantainers.
5. In the dialog, write a short description of what you changed ("Fix spelling in history page" is perfect), then choose **Create a new branch for this commit and start a pull request**. Accept the branch name GitHub suggests.
6. Click **Propose changes**.
7. GitHub now shows the pull request form. **Check the target at the top before doing anything else:**
   - The **base repository** must be `ballerin/nmf-website` — not your fork. GitHub usually gets this right.
   - The **base branch** must be `staging`, **not `main`**. GitHub proposes `main` by default, so this one you will usually have to change: click **Edit** next to the branch names and pick `staging`.
8. Write a sentence about what you changed and why. This is a summary of all the commits. Then click **Create pull request**.

Done. Skip to [What happens next](#what-happens-after-you-open-a-pull-request).

### Adding a new post in the browser

Same thing, with one extra step at the start — you have to create the file rather than open it.

1. Navigate into the right folder: `_posts/nyheter/` for news, `_posts/arrangementer/` for events, `_posts/infomat/` for INFOMAT.
2. Click **Add file** → **Create new file** (top right).
3. Type the filename, following the `YYYY-MM-DD-short-name.md` pattern — for example `2026-09-01-arsmote-2026.md`.
4. Write the post. It needs a **front matter** block at the very top, and the `layout` and `categories` values must match the kind of post you are writing. [3_MARKDOWN_AND_POSTING.md](3_MARKDOWN_AND_POSTING.md#front-matter) has the table and a template — the reliable shortcut is to open an existing post of the same kind in another tab and copy its front matter.
5. Continue from step 4 above: **Commit changes…** → new branch → pull request to `staging`.

Images have to be uploaded before you can link to them: go to the folder they belong in (see [Where images go](3_MARKDOWN_AND_POSTING.md#where-images-go)), then **Add file** → **Upload files**. Upload them on the *same branch* as your post, or the link will point at nothing.

> 💡 **Changing several files in one go?** Do the first file as above, and note the branch name GitHub created. For each following file, open the file, switch the branch selector at the top left from `main` to your new branch, *then* click the pencil — and this time choose **Commit directly to this branch**. All the changes join the same pull request.

## Path B: Work on your own computer

You need Git. If you also want to preview the site before pushing — recommended, but optional — install Jekyll too: [6_JEKYLL_AND_DEPLOYMENT.md](6_JEKYLL_AND_DEPLOYMENT.md#install-jekyll).

**First time only** — clone the repository you are working in, which is your fork if you made one:

```bash
# Collaborator:
git clone https://github.com/ballerin/nmf-website.git
cd nmf-website

# From a fork (use your own username):
git clone https://github.com/your-username/nmf-website.git
cd nmf-website
git remote add upstream https://github.com/ballerin/nmf-website.git

# Either way, if you installed Jekyll:
bundle install
```

**Every time you make a change:**

```bash
# 1. Start from the latest version of the live site
git checkout main
git pull                      # from a fork: git pull upstream main

# 2. Make a branch, named after what you are doing
git checkout -b add-june-newsletter

# 3. ... edit files ...

# 4. Look at it (optional but recommended)
bundle exec jekyll serve      # → http://localhost:4000

# 5. Save the change and send the branch to GitHub
git add .
git commit -m "Add June 2026 newsletter"
git push -u origin add-june-newsletter
```

The output of `git push` prints a link that opens the pull request form. Otherwise go to the repository on GitHub → **Pull requests** → **New pull request**, and set **base: `staging`** ← **compare: `add-june-newsletter`**. From a fork, check the **base repository** as well — it must be `ballerin/nmf-website`.

Every one of these commands has a click-by-click VS Code equivalent — see the step-by-step walkthrough in [5_GIT_AND_GITHUB.md](5_GIT_AND_GITHUB.md#full-workflow-step-by-step).

## What makes a good pull request

- **One topic per pull request.** Three unrelated fixes are easier to review as three pull requests than as one.
- **An EXPRESSIVE title in plain language.** "Add report from the 2026 general assembly", not "update files".
- **Say what changed and why** in the description.
- **Not all changes are automatically included.** Some directories or files, such as `_site/` contain local files that should not be part of the repo. These are configured to be automatically ignored by Git
- **Avoid large files.** Every file is added to the Git history. Avoid unreasonably large files.

## What happens after you open a pull request

1. **Automatic checks run** (a couple of minutes). They build the site and check the data files for syntax errors. You will see a green ✅ or a red ❌ on the pull request.
   - **Red?** Click **Details** next to the failed check to see the error. It is almost always a typo in the front matter of a post or a mis-indented line in a `_data/*.yml` file.
2. **The maintainer reviews it** and either merges it or asks for changes.
3. **Once merged into `staging`**, the change appears on the test site at [staging.nmf-website.pages.dev](https://staging.nmf-website.pages.dev) within a few minutes. Check that yours looks right there.
4. **Later, the maintainer promotes `staging` to `main`** and the change goes live at [matematikkforeningen.no](https://matematikkforeningen.no). This is a separate, deliberate step, so do not expect your change to be public the same minute it is merged.

## Responding to review comments

Do **not** open a new pull request. Push another commit to the same branch and the pull request updates itself:

- **In the browser:** open the **Files changed** tab, click the pencil on the file, edit, and commit — making sure you commit to *your branch*, not `main`.
- **On your computer:** make sure you are still on your branch (`git checkout my-branch`), edit, then `git add .`, `git commit -m "Address review comments"`, `git push`.

If the maintainer left a **suggestion** (a comment with a proposed replacement in a box), you can accept it with **Commit suggestion** and it is applied for you.

When your pull request is merged, GitHub offers a **Delete branch** button. Click it — the branch has served its purpose. If you worked locally, tidy up there too:

```bash
git checkout main
git pull
git branch -d my-branch
```

## Working from a fork

Three things that only apply if your branch lives in your own copy. None of them changes how you edit.

**Leave *Allow edits by maintainers* ticked** on the pull request form. Without it, a maintainer who spots a missing quotation mark cannot just fix it — they have to describe it and wait for you.

**Automatic previews may not be created** for changes coming from a fork. The maintainer can still check your work by pulling it down locally, so this only means feedback may take a little longer.

**Your fork does not update itself.** It is a snapshot of the moment you forked, and it drifts as the site changes. Before starting anything new, bring it up to date:

- **In the browser:** open your fork and click **Sync fork** → **Update branch**.
- **On your computer:**

  ```bash
  git checkout main
  git pull upstream main
  git push
  ```

Doing this first avoids the most common frustration with forks: editing a file that somebody already changed, and then having to untangle the conflict.
