# Sortie Projects

AI-powered talent marketplace — elite engineers, AI interviews, and anti-cheat proctoring.

Inspired by networks like Toptal, Turing, and Lemon.io, Sortie Projects combines:

- **AI interview engine** — adaptive technical & behavioral screening
- **Anti-cheat systems** — session integrity and proctoring signals
- **Talent matching** — shortlists companies can trust

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- Hosted on **Hostinger** Node.js (GitHub auto-deploy)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Local development server |
| `npm run build` | Production build       |
| `npm start`   | Start production server  |
| `npm run lint` | Lint                   |

## Health check

`GET /api/health` — used for uptime / deploy verification.

## Repository

All product work for Sortie Projects lives in this repo and is pushed to `main` for Hostinger deploys.
