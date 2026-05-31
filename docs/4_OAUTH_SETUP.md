# OAuth Proxy Setup — Rarely needed

> **You probably don't need this.** This guide is for the technical person who set up the site. It's only needed if the domain changes or the CMS login breaks.

The CMS login uses a Cloudflare Worker (the "OAuth proxy") that handles GitHub authentication. It's a separate piece from the website itself.

## Prerequisites

- A GitHub OAuth App (Client ID + Client Secret)
- A Cloudflare account
- Node.js installed

---

## Step 1: Clone decap-proxy

```bash
cd ~
git clone https://github.com/sterlingwes/decap-proxy
cd decap-proxy
```

## Step 2: Configure

```bash
cp wrangler.toml.sample wrangler.toml
```

Edit `wrangler.toml`:
- Change `name` to `nmf-oauth`
- If the repo is **private**, uncomment and set `GITHUB_REPO_PRIVATE = "1"`

## Step 3: Log in to Cloudflare

```bash
npx wrangler login
```

## Step 4: Add GitHub OAuth credentials

```bash
npx wrangler secret put GITHUB_OAUTH_ID       # Paste Client ID
npx wrangler secret put GITHUB_OAUTH_SECRET   # Paste Client Secret
```

## Step 5: Deploy

```bash
npx wrangler deploy
```

You'll get a URL like `https://nmf-oauth.YOUR-ACCOUNT.workers.dev`.

## Step 6: Verify

Open the worker URL in a browser — you should see **"Hello 👋"**.

## Step 7: Update the CMS config

In this repo, update `admin/config.yml`:

```yaml
backend:
  name: github
  repo: ballerin/nmf-website
  branch: main
  auth_endpoint: /auth
  base_url: https://nmf-oauth.YOUR-ACCOUNT.workers.dev   # ← your worker URL
```

## If the domain changes

1. Update `base_url` in `admin/config.yml`
2. Update the GitHub OAuth App's callback URL (add `/callback` at the end)
3. Redeploy the worker if the `wrangler.toml` name changed
