# Sortie Projects

A hiring marketplace for vetted African talent. Companies come to hire engineers, designers, marketers, PMs and consultants who have already been screened. Talent comes to apply, get through vetting once, and then get matched to work without being re-interviewed by every client.

Live at [sortieprojects.com](https://sortieprojects.com).

![Sortie Projects homepage](docs/screenshots/home-hero.jpg)

## Where the project stands

I'd rather be upfront about this than have someone find out by reading the code.

**Working in production today**

- Marketing site: homepage, pricing, about, legal pages, and about 135 statically generated skill pages (`/developers/ai-engineers`, `/designers/ux-designers` and so on) across seven talent categories.
- Two separate sign-in paths, one for companies (`/hire/auth`) and one for talent (`/apply/auth`). Login is passwordless email OTP, with Google OAuth available behind a flag.
- A stepped onboarding flow for each side that writes a real profile to MySQL, plus a gated dashboard each side lands on afterwards.
- Dark theme, a WebGL hero background, a mobile nav drawer, and an Embla carousel for the hero talent cards on small screens.

**Designed, not built yet**

- AI interviews, proctoring/integrity scoring and matching. The domain model is written up in [`CONTEXT.md`](CONTEXT.md), and the starting types live in `src/lib/interview`, `src/lib/anticheat` and `src/lib/matching`. There's no runtime behind them yet. Those are the next big pieces of work.

## Screenshots

| Skill page | Company sign-in |
| --- | --- |
| ![AI engineers skill page](docs/screenshots/skill-page.png) | ![Company sign-in](docs/screenshots/auth-hire.png) |

![Testimonials carousel](docs/screenshots/home-testimonials.png)

On mobile the hero cards turn into a swipeable carousel, and the nav moves into a slide-in drawer:

<p>
  <img src="docs/screenshots/mobile-home.jpg" width="260" alt="Mobile homepage" />
  <img src="docs/screenshots/mobile-hero-slider.png" width="260" alt="Mobile hero talent slider" />
  <img src="docs/screenshots/mobile-menu.png" width="260" alt="Mobile navigation drawer" />
</p>

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, with design tokens defined in `src/app/globals.css` |
| Auth | better-auth with the email OTP plugin, plus optional Google OAuth |
| Email | Resend |
| Database | MySQL on Hostinger, accessed through Drizzle ORM and `mysql2` |
| Motion | `motion` (the package formerly called Framer Motion), Embla for carousels |
| Hosting | Hostinger Node.js hosting, which auto-deploys from `main` |

## How it's put together

### Routing

The App Router handles everything. The public side is mostly static. Each talent category (`developers`, `designers`, `marketing`, `sales`, `consultants`, `product-managers`, `project-managers`) has a `[skill]` segment, and its pages are built at compile time with `generateStaticParams`. All of those route files hand off to one shared `SkillRoutePage` in `src/components/skills/skill-route.tsx`. Adding a skill is a data change in `src/data/talent-menu.ts`, not a new route file.

The two authenticated areas are `/hire` (companies) and `/apply` (talent). Each has its own `auth` and `onboarding` routes underneath.

### Auth

better-auth lives in `src/lib/auth`. Most of the auth flow is standard. The one non-obvious part is how a new user gets labelled as a company or as talent.

The sign-in form on `/hire/auth` and `/apply/auth` sets a `sortie_account_kind` cookie before starting the OTP or Google flow. A `databaseHooks.user.create.before` hook reads that cookie and stores `accountKind` on the user row at the moment the account is created. That way a single user table and a single OTP flow serve both audiences, and nobody has to pick from an "I am a…" dropdown.

OTPs are six digits and expire after ten minutes. If `RESEND_API_KEY` is empty, the code is printed to the server console instead of being emailed, so you can work locally without an email provider.

### The workspace module

All of the signed-in behaviour goes through `src/lib/workspace`. Pages and server actions only use its small public interface:

```ts
requireWorkspaceSession(kind)              // redirect to the right sign-in page, or to the other side's home
getTalentWorkspace(userId, email)          // profile + dashboard view model
completeTalentOnboarding(userId, input)
getCompanyWorkspace(userId, email)
completeCompanyOnboarding(userId, input)
signOutWorkspace(kind)
```

Session checks, the rule that a company account can't open `/apply` (and the reverse), reading and writing profiles, and shaping dashboard data all happen inside that module. Each page is just one line to guard the route plus the rendering. I went with page-level guards instead of middleware because every protected page has to load the session anyway, and this way the redirect logic sits in one place instead of being split between an edge function and the page.

The server actions in `src/app/*/onboarding/actions.ts` validate input themselves before calling the module: category IDs are checked against the real category list, hours per week are bounded, skills are capped at eight, and so on. The client form is never trusted.

### Data

The schema is in `src/lib/db/schema`:

- `auth.ts`: the user, session, account and verification tables better-auth expects, plus the custom `accountKind` column.
- `workspace.ts`: `talent_profile` and `company_profile`, both keyed by `user_id` with cascade delete.

Skills on a talent profile are stored as a JSON array in a `text` column. That's a deliberate shortcut. Nothing queries by individual skill yet, and once matching needs to, they'll move into a proper join table.

### Onboarding

Both onboarding flows are step-by-step wizards: one question per screen, a single progress bar, Enter to advance, and Motion `AnimatePresence` transitions between steps. The shared pieces (the shell, the progress bar, step constants) are in `src/components/workspace/onboarding`. The talent and company forms only define their own steps.

### UI

- The colours are defined once as tokens in `globals.css` (canvas, panel, foreground, muted, line, and the brand colour `#964132`). Components use those tokens instead of hard-coded hex values.
- The moving hero background is a small WebGL fragment shader (`src/components/ui/mesh-portfolio.tsx`), not a video, so it stays sharp at any resolution and costs nothing to download.
- Animations only change transform and opacity, and they respect `prefers-reduced-motion`.
- The mobile nav drawer resets its accordions every time it opens, so you never reopen it to find a menu still expanded from your last visit.

## Running it locally

You'll need Node 20 or newer and a MySQL database (a local one is fine).

```bash
git clone https://github.com/Choboy-dev/sortie-projects.git
cd sortie-projects
npm install
cp .env.example .env.local     # then fill it in
npm run db:push                # creates the tables
npm run dev
```

Open http://localhost:3000. To sign in, go to `/hire/auth` or `/apply/auth`, enter any email, and copy the OTP from the terminal (with `RESEND_API_KEY` left empty).

### Environment variables

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | `mysql://user:pass@host:3306/db` |
| `BETTER_AUTH_SECRET` | Any long random string |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally |
| `RESEND_API_KEY` | Leave empty to log OTPs to the console |
| `RESEND_FROM_EMAIL` | Must be a verified sender in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | `true` shows the Google button. It's baked in at build time, so you need to rebuild after changing it |

`drizzle.config.ts` reads both `.env.local` and `.env.production.local`, so `db:push` works whichever file you keep your credentials in.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (uses webpack, which is what the host's build pipeline runs) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push the Drizzle schema to the database |
| `npm run db:studio` | Drizzle Studio |

## Deployment

Hostinger watches `main` and runs `npm run build` and `npm start` on every push. Production env vars are set in the Hostinger panel, never in the repo. The database runs on the same account and is reached over localhost. `GET /api/health` returns a small JSON payload that I use to check a deploy actually came up.

## Project layout

```
src/
  app/                  routes (marketing, skill pages, /hire, /apply, /api)
  components/
    marketing/          header, hero, sections, cards
    skills/             shared skill-page rendering
    workspace/          dashboard shell + onboarding wizards
    motion/             page and section transitions
    ui/                 primitives, WebGL hero background
  data/                 talent categories and showcase profiles
  lib/
    auth/               better-auth config, account kind, OTP email
    db/                 Drizzle client and schema
    workspace/          signed-in behaviour (see above)
    skills/             skill lookup, slugs, copy
    interview/ anticheat/ matching/   domain types for upcoming work
docs/                   auth notes, UI direction, screenshots
CONTEXT.md              product and domain glossary
```

## What I'd do next

1. Build the assessment and AI interview runtime on top of the types already in `src/lib/interview`, with integrity signals feeding into a scorecard.
2. Move skills into a join table and build the first matching pass, so a company role can return a ranked shortlist with reasons attached.
3. Add Playwright coverage for the two sign-in and onboarding paths. Those are the flows that would hurt most if they broke quietly.
