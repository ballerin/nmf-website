# Decap CMS OAuth Proxy — Deployment Guide

This Cloudflare Worker handles GitHub OAuth for the Decap CMS at `/admin/`.

## Prerequisites

- A Cloudflare account
- A GitHub account

---

## Step 1: Deploy the Worker (Cloudflare Dashboard)

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Create Worker**
2. Accept the default "Hello World" and **Deploy**
3. Give it a name, e.g. `nmf-oauth`
4. Copy your worker URL from the top of the page:
   ```
   https://nmf-oauth.YOUR-ACCOUNT.workers.dev
   ```
   *(YOUR-ACCOUNT is your Cloudflare subdomain — find it at the top of Workers & Pages)*
5. Click **Edit code**, delete everything, and paste the content of `oauth-proxy.js`
6. Go to the **Settings** tab → **Variables**
7. Add these **Environment Variables**:

   | Type | Variable | Value |
   |---|---|---|
   | Text | `GITHUB_ORIGIN` | `https://nmf-website.pages.dev` |
   | Text | `GITHUB_CLIENT_ID` | *TODO |
   | Secret | `GITHUB_CLIENT_SECRET` | TODO |

8. Click **Deploy**

---

## Step 2: Create a GitHub OAuth App

1. Go to **GitHub Settings → Developer settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name**: `NMF Website CMS`
   - **Homepage URL**: `https://nmf-website.pages.dev`
   - **Authorization callback URL**: `https://nmf-oauth.YOUR-ACCOUNT.workers.dev/callback`
     *(use the worker URL from Step 1)*
3. Click **Register application**
4. Click **Generate a new client secret**
5. Copy the **Client ID** and **Client Secret**

---

## Step 3: Add Secrets to the Worker

Go back to Cloudflare Dashboard → Workers → `nmf-oauth` → Settings → Variables:

1. Click **Edit** on `GITHUB_CLIENT_ID`, paste the value, click **Save**
2. Click **Edit** on `GITHUB_CLIENT_SECRET`, paste the value, click **Save**
3. Click **Deploy** at the top right

---

## Step 4: Update admin/config.yml

Set `base_url` to your worker URL:

```yaml
backend:
  name: github
  repo: ballerin/nmf-website
  branch: main
  base_url: https://nmf-oauth.YOUR-ACCOUNT.workers.dev
```

---

## Step 5: Test

1. Visit `https://nmf-website.pages.dev/admin/`
2. Click **Login with GitHub**
3. Authorize the OAuth app
4. You should see the CMS dashboard

---

## If the domain changes

1. Update `GITHUB_ORIGIN` in the Worker environment variables (Cloudflare Dashboard)
2. Update `base_url` in `admin/config.yml`
3. Update the GitHub OAuth App's callback URL and homepage URL
