# orbarak-website

Single-page portfolio website for Or Barak, built with React, TypeScript, Tailwind CSS, and Framer Motion.

The repo targets Node 22 in CI and deployment. Run `nvm use` if you have `nvm` installed.

## Local development

```bash
nvm use
npm install
npm run dev
```

The contract review demo uses the local FastAPI backend automatically on `localhost`.
If you want to override it explicitly, create `.env.local` with:

```bash
VITE_API_URL=http://localhost:8000
```

## Production build

```bash
npm run build
npm run preview
```

## Vercel deployment

This project is a static Vite app, so it can be deployed directly to Vercel with the default Vite build settings.

To enable the live contract review demo in Vercel previews and production, set:

```bash
VITE_API_URL=https://your-contract-review-api.example.com
```

Without `VITE_API_URL`, the portfolio still builds and deploys, but the interactive demo stays disabled so the site never tries to call `localhost` from a hosted preview.
