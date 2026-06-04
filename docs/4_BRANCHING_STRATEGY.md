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

1. **Create a feature branch** from `main` (or `staging` if you need work that's already on staging)
2. **Work locally** — make changes, test with `bundle exec jekyll serve`
3. **Open a PR to `staging`** — when ready for review
4. **Verify on staging** — Cloudflare Pages auto-deploys the PR preview and the `staging` branch itself. Check `staging.nmf-website.pages.dev` after merging
5. **Open a PR from `staging` to `main`** — when staging is approved
6. **Merge to `main`** — live site updates automatically

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

## Quick Reference

```bash
# Start new work
git checkout main
git pull
git checkout -b my-feature

# ... make changes, test locally ...
bundle exec jekyll serve

# Push and create PR to staging
git add .
git commit -m "Description of changes"
git push -u origin my-feature
# → Open PR on GitHub: my-feature → staging

# After merge to staging, create PR to main
# → Open PR on GitHub: staging → main
```

## Best Practices

- **Never commit directly to `main`** — always go through PRs
- **Keep `staging` in sync** — after merging to `main`, consider rebasing `staging` on `main` or merging `main` back into `staging`
- **Delete feature branches** after they're merged
- **Test locally** before pushing — `bundle exec jekyll build` must succeed
- **Review the staging deployment** before merging to `main`
