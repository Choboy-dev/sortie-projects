# Sortie Projects — UI System Direction

Locked visual language for every surface. Agents must follow this file together with design skills in `.agents/skills/`. Do not drift into generic AI-SaaS defaults.

---

## Design read

**Reading this as:** enterprise talent marketplace marketing (Toptal + Turing class) for hiring leaders and elite candidates — **serious, high-trust, conversion-oriented** — plus denser product/interview UI elsewhere. Custom Tailwind tokens + owned components; green signal accent retained as Sortie brand, not purple AI kits.

**Subject matter:** exclusive vetted network, AI interviews, live coding, matching, no-risk trials. Marketing must read like Toptal/Turing: value-prop hero, talent profiles, categories, hiring steps, vetting proof, network grid, dual CTAs (Hire / Apply).

---

## Variance engine (locked)

| Axis | Choice |
|---|---|
| **Marketing vibe** | **Enterprise marketplace** — light panels, sticky corporate nav, green CTA, talent profile tiles, category lists, proof and process. Modeled on Toptal/Turing homepages — not experimental dark art direction. |
| **Product layout** | **Soft Structuralism** — airy white/mist panels, hairline structure, large type for titles, dense only where data demands it. |
| **Interview room** | **Instrument panel** — dark ink ground; editor + transcript + integrity as primary panes. |

### Dials by surface

| Surface | DESIGN_VARIANCE | MOTION_INTENSITY | VISUAL_DENSITY |
|---|---|---|---|
| Marketing | 5 | 3 | 5 |
| Candidate / Company app | 5 | 4 | 5 |
| Interview + live coding | 4 | 4 | 8 |
| Admin / ops | 4 | 3 | 7 |

---

## Principles

1. **Marketing follows marketplace leaders.** Hero leads with the hiring value proposition (e.g. “Hire the top 1%…”), not a giant brand wordmark alone. Include talent samples, categories, how-it-works, vetting, network, dual Hire/Apply CTAs.
2. **Trust before cleverness.** Sticky nav, clear CTAs (“Hire talent” / “Apply as talent”), no-risk trial language, measurable process — Toptal/Turing seriousness.
3. **Signal over chrome in product.** Accent means *pass / action / live*. Neutrals carry structure. Red/amber for integrity risk and errors.
4. **Marketing may use profile tiles and category blocks** (interactive units). App UI still avoids decorative card spam.
5. **Sequence markers for real sequences** — hiring steps and vetting stages.
6. **Dual density is intentional.** Marketing is information-rich but corporate. Interview room is denser.
7. **Motion is restrained on marketing.** Prefer clarity over cinematic entrances. Respect `prefers-reduced-motion`.
8. **Copy is UI.** Active voice, sentence case, CTA names what happens. No filler.

---

## Anti-patterns (hard ban)

- Inter, Roboto, Arial, Open Sans, Helvetica as brand faces
- Purple / indigo AI gradients; neon cyberpunk magenta
- Warm cream `#F4F1EA` + terracotta `#D97757` “Claude default”
- Broadsheet hairline newspaper columns as the whole brand
- Three equal feature cards with identical soft shadows
- Centered dark mesh hero with floating glass cards
- ALL-CAPS tracked eyebrows on every heading
- Stock Lucide-thick icon salad; emoji as icons
- `→` appended to every link/button
- Generic `shadow-md` grey clouds under every panel
- Edge-glued sticky full-width nav as the only chrome option on marketing (prefer floating or inset bar)

---

## Color tokens

Named hex core (4–6 + semantic). Implement as CSS variables in `globals.css`.

### Brand / marketing (dark chamber)

| Token | Hex | Role |
|---|---|---|
| `ink` | `#07140F` | Deepest brand ground |
| `ink-elevated` | `#0C1F18` | Elevated dark panels |
| `signal` | `#1FA97A` | Primary accent / pass / CTA on dark |
| `signal-strong` | `#178A63` | Pressed / strong CTA |
| `mist` | `#B7F0D4` | Soft highlight / glow (use sparingly) |
| `chalk` | `#F3F7F5` | Text on dark |

### Work UI (light structural)

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F3F7F5` | App background |
| `panel` | `#FFFFFF` | Surfaces |
| `foreground` | `#0C1410` | Primary text |
| `muted` | `#5C6B63` | Secondary text |
| `line` | `#D5E0D9` | Hairlines / dividers |
| `signal` | `#0F8F6C` | Accent on light (aligned with current site) |
| `signal-strong` | `#0A6B51` | Strong accent |

### Semantic

| Token | Hex | Role |
|---|---|---|
| `danger` | `#C43C3C` | Errors, hard fail |
| `warn` | `#C48A1A` | Integrity review / caution |
| `ok` | `#1FA97A` | Pass / clear integrity (same family as signal) |
| `focus` | `#1FA97A` | Focus ring (3px, offset) |

**Do not** introduce navy `#0F172A` + blue `#0369A1` as the brand — that is the generic “trust SaaS” kit rejected for Sortie.

---

## Typography

| Role | Family | Notes |
|---|---|---|
| **Display** | **Syne** (already loaded) | Brand name, marketing H1/H2, score callouts. Geometric, non-Inter. Tight tracking on large sizes. |
| **Body / UI** | **Figtree** (already loaded) | App chrome, paragraphs, forms. |
| **Data** | **IBM Plex Mono** (add via `next/font`) | Scores, percentiles, timers, code meta, integrity IDs — not for paragraphs. |

### Scale (desktop → mobile reduce one step)

| Step | Size | Use |
|---|---|---|
| Display | 72–96px | Marketing brand / hero wordmark energy |
| H1 | 40–48px | Page titles |
| H2 | 28–32px | Section titles |
| H3 | 20–24px | Card/section heads |
| Body | 16–18px | Reading text (line length &lt; 80ch) |
| UI | 14–15px | Tables, dense app |
| Micro | 12–13px | Meta, captions (not tiny grey-on-grey) |

**Weights:** Display 600–700; body 400–500; UI labels 500–600. Avoid italicizing a single word in a headline for “emphasis.”

---

## Layout & structure

### Marketing
- Full-bleed dark hero as the dominant plane (not inset media card).
- Max content width ~72rem; generous horizontal padding.
- Left-aligned primary copy on desktop; stacked on mobile.
- Sections separated by hairlines or large whitespace — not card grids by default.
- How-it-works may use a real vertical sequence (admission stages).

### App (candidate / company)
- Persistent shell: sidebar or top+context depending on breakpoint; content canvas `canvas`.
- 12-column mental grid; tables and shortlists are first-class, not buried in cards.
- Sticky page header with title + primary action.
- Empty states: one sentence + one action.

### Interview room
- Dark `ink` ground.
- Panes: video/avatar | transcript | code editor | integrity strip.
- Collapse gracefully to stacked panes on smaller widths; coding + AV remain primary.

### ASCII — marketing hero

```
┌─────────────────────────────────────────────────────────┐
│  [Sortie]                          Platform   [CTA]     │
│                                                         │
│  SORTIE PROJECTS                                        │
│  Hire people who already passed.                        │
│  One line of proof — not a paragraph of features.       │
│  [Request access]  [See how it works]                   │
│                                                         │
│  (full-bleed atmosphere — grid/signal field, no cards)  │
└─────────────────────────────────────────────────────────┘
```

### ASCII — interview room

```
┌──────────────┬────────────────────┬─────────────────────┐
│  AI / AV     │  Transcript        │  Live coding        │
│              │                    │                     │
├──────────────┴────────────────────┴─────────────────────┤
│  Integrity · Timer · Rubric progress · [End session]    │
└─────────────────────────────────────────────────────────┘
```

---

## Components (system rules)

| Component | Direction |
|---|---|
| **Buttons** | Primary = solid `signal`; secondary = hairline on surface; tertiary = text. Radius: `md` (≈8px) on work UI; slightly softer on marketing CTA. Press: `scale-[0.98]`. No arrow suffixes by default. |
| **Inputs** | Visible labels; errors adjacent; 44px min touch. |
| **Nav (marketing)** | Floating or inset bar over hero; not a dashboard mega-nav. |
| **Nav (app)** | Predictable IA from CONTEXT page map; ≤5 primary destinations in mobile bottom or compact side. |
| **Badges** | Network admitted, integrity clear/review, score band — functional, not stickers on heroes. |
| **Tables / lists** | Default for shortlists and candidatures. |
| **Modals / drawers** | For intros, compares, settings — motion on open/close only. |
| **Icons** | **Phosphor** (light/regular), one family, consistent stroke. No emoji icons. |

**Foundation:** Tailwind v4 + owned primitives. If shadcn is introduced later, restyle to these tokens immediately — never ship default shadcn look.

---

## Motion

- Library: **Motion** (`motion/react`).
- Marketing: one page-load sequence (brand + headline), ~280–400ms, custom easing `cubic-bezier(0.32, 0.72, 0, 1)`.
- Product: panel enter/exit, toast, button press — compositor-friendly (`transform` / `opacity` only).
- Interview: minimal ambient motion; prioritize latency and clarity.
- `useReducedMotion` → zero or near-zero duration.

---

## Voice & content (UI copy)

- Brand: **Sortie Projects** (full) / **Sortie** (product chrome).
- Promise line direction: already-vetted, hire without re-running the hard part; optional company interview.
- CTAs: “Request access”, “Apply to the network”, “Start assessment”, “Open interview”, “Shortlist”, “Request intro” — verbs match outcomes.
- Failures: what broke + how to fix. No vague apology walls.
- Empty: invitation to the next real action from CONTEXT flows.

---

## Accessibility & quality floor

- Text contrast ≥ 4.5:1 on body; large text ≥ 3:1.
- Visible focus rings using `focus` token.
- Keyboard for all critical paths including interview controls where feasible.
- `prefers-reduced-motion` and `prefers-reduced-transparency` fallbacks (no reliance on blur alone).
- Responsive: 375 / 768 / 1024 / 1440.
- Skip link on app and marketing.

---

## Stack alignment

- Next.js App Router + Tailwind v4 (current).
- Fonts via `next/font` only.
- Motion for interaction; no decorative scroll-hijack on dashboards.
- Page transitions: Motion `AnimatePresence` shell per project motion rules when multi-route app lands.

---

## Self-critique vs generic defaults

| Temptation | Sortie choice |
|---|---|
| Navy + blue trust kit | Forest ink + signal green |
| Inter everywhere | Syne + Figtree + Plex Mono data |
| Three feature cards | Editorial list / sequence only when sequential |
| Purple glass AI | Signal chamber, no purple |
| Stats in hero | Forbidden on first viewport |
| Dense marketing | Airy marketing; density reserved for interview/ops |

---

## Document control

- **Status:** Locked direction for implementation.
- **Update when:** Brand or surface rules change; keep in sync with `CONTEXT.md` product map.
- **Implemented:** Tokens in `globals.css`, Syne + Figtree + IBM Plex Mono, Motion page shell + hero entrance, marketing home rebuilt to Signal Chamber.
- **Next implementation step:** App shells (candidate / company) and interview room instrument layout.
