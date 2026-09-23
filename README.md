# 🧪 Potion Lab — Standalone (frontend-only)

The same Potion Lab fantasy e-commerce app, with zero backend and zero database required.
All "server" behavior — accounts, cart, brewing, orders, recipe discovery — runs in the
browser and persists to `localStorage`. Deploys to Vercel (or Netlify/GitHub Pages) as a
single static site.

> A separate full-stack version of this project (Node/Express + MongoDB) also exists if you
> want to demonstrate real backend/API work. This version trades that off for a zero-config,
> single-click deployment.

## How it works

Every page, component, and Redux slice is identical to the full-stack version. The only
difference is `src/api/axiosClient.js`, which — instead of making real HTTP requests — points
at `src/data/localApi.js`: a small mock API that implements the exact same routes
(`/auth/login`, `/products`, `/cart`, `/potions/brew`, etc.) against a JSON "database" kept in
`localStorage` (see `src/data/localDb.js`). The Redux thunks, pages, and components have no
idea the difference exists.

This means:
- No `.env`, no MongoDB, no Express server, no CORS config.
- Data (accounts, cart, gold, discovered recipes...) persists across page reloads in the same
  browser, but is local to that browser/device — there's no shared database.
- A demo account is pre-seeded: **demo@potionlab.dev** / **potionlab123** (2000 starting gold).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: "Add New Project" → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel
   usually detects these automatically).
4. Deploy — that's it, no environment variables needed.

## Resetting the demo data

If you want to clear everything and start fresh (e.g. to demo the empty state), open your
browser's DevTools console on the site and run:

```js
localStorage.removeItem("potionlab_local_db");
localStorage.removeItem("potionlab_user");
location.reload();
```

## Limitations vs. the full-stack version

- Data doesn't sync across devices/browsers — it's per-browser `localStorage`.
- Passwords are stored in plain text in `localStorage` (fine for a demo; never do this with a
  real backend/database).
- No real security — anyone with DevTools access to their own browser can inspect or edit
  their own local data. This is expected and fine for a portfolio demo.
