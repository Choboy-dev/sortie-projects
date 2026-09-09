# Sortie Projects — Domain Context

This file is the product and domain source of truth. Use these terms exactly in architecture, UI, and ADRs. Sortie is the full combination of an exclusive vetted talent network (Toptal-class), skills assessments and AI interviews with integrity controls (TestGorilla-class), and AI matching so companies hire from already-verified talent without re-running the full interview process unless they choose to (Turing-class), plus Sortie’s own talking/listening AI interviewer and live coding engine during the call.

**No MVP framing.** Everything below is in scope for the product.

---

## Product definition

Sortie is a **closed, elite talent network** where:

- Candidates earn entry only by passing Sortie’s full AI + skills + integrity gauntlet.
- Companies browse and hire from people who are **already verified**.
- Company re-interviews are **optional**, not required.
- Every score, flag, and match is data the product owns end-to-end.

Competitive inputs researched into this model:

- **Toptal** — exclusive network, multi-stage screening (language/personality → skill review → live screening → test projects → continued excellence), hand-selected matching, trial-to-hire, managed delivery/services, categories across engineering, design, marketing, consulting, PM, product, sales.
- **TestGorilla** — assessments vs tests, 350+ skills library, AI interviews (avatar / structured video / audio), resume scoring, custom questions, job simulations, auto-scoring, percentiles, side-by-side compare, anti-cheat flags, sourcing talent pool, 13-stage hiring pipeline, ATS integrations, public REST API (assessments, candidatures, invites, results, PDF, personality, coding, stages, rejection).
- **Turing** — AI matching against a large vetted pool, automated multi-hour technical vetting, client shortlists, optional client interview, risk-free trial, workspace/time-tracking/billing, explainable fit signals.

Sortie owns all of the above as first-class product — not as wrappers. Toptal and Turing do not publish a comparable public product API; TestGorilla’s API surface is a baseline Sortie must meet and exceed with network search/match APIs of our own.

---

## Domain glossary (use these terms)

| Term | Meaning |
|---|---|
| **Candidate** | Person seeking network admission and/or roles. |
| **Company** | Hiring organization with seats, roles, billing. |
| **Recruiter / Hiring Manager / Interviewer** | Company seat roles with scoped permissions. |
| **Network** | Closed set of admitted, elite talent. |
| **NetworkListing** | What companies see for an admitted Candidate (skills, score bands, availability — not raw cheat logs by default). |
| **Assessment** | Pack of tests + questions + optional AI interview + coding a Candidate takes (often one Assessment per Role). |
| **Test** | Single instrument inside an Assessment (skills, cognitive, personality, coding, custom, simulation). |
| **Candidature** | One Candidate’s participation in one Assessment (invite → start → complete; typically one attempt unless policy allows retake). |
| **AssessmentSession** | Live runtime of an Assessment attempt (including interview + coding + proctoring artifacts). |
| **Scorecard** | Immutable finalized scores, pass/fail, rationale, integrity summary. |
| **AI Interviewer** | Talking/listening interviewer (avatar and/or audio) with adaptive follow-ups and rubrics. |
| **Live Coding** | Collaborative editor + runtimes + harness during an interview call. |
| **Proctoring / Integrity** | Signals and risk tiers for session honesty. |
| **Role** | Company job listing / requisition. |
| **Match** | Ranked pairing of NetworkListing(s) to a Role with explainable reasons. |
| **Pipeline** | Ordered hiring or admission stages for a Role or for network entry. |
| **Intro** | Company ↔ Candidate introduction after interest (privacy reveal rules apply). |
| **Engagement** | Active work relationship (trial → contract), time, billing, rematch. |
| **Trial** | Risk-free evaluation window before full billing. |
| **Delivery Manager** | Sortie-side owner for managed team/pod engagements. |
| **Module / Interface / Seam / Adapter / Depth** | Architecture vocabulary from codebase-design — use exactly when designing structure. |

---

## Engines (core modules)

### Identity & Access
- Candidate / company / recruiter / admin roles
- SSO
- MFA
- Org seats and invitations
- Permission scopes per seat

### Profile Engine
- Resumes / CV upload and parse
- Skills graph
- Work experience
- Education
- Certifications
- Portfolio / notable projects
- Preferences
- Salary / rate expectations
- Timezone and overlap hours
- Availability (hours/week, start date)
- Language proficiency
- Privacy controls (anonymous until invite/reveal)

### Assessment Builder
- Compose Assessments from Tests
- Custom questions (text, video, audio)
- AI interview rubrics
- Coding packs
- Job simulations
- Qualifying / knock-out questions
- AI builder: job description → recommended Assessment pack
- Attach Assessment pack to a Role
- Library management for Sortie catalog

### Skills Test Engine
- Timed MCQ and interactive items
- Cognitive ability tests
- Role-specific skills tests
- Personality tests (e.g. Big Five–style) + narrative descriptions
- Custom company tests
- Language tests
- AI fluency assessments
- Auto-scoring
- Percentiles and benchmarks
- Side-by-side candidate comparison inputs

### Resume Scoring Engine
- Job description ↔ resume fit scoring
- Best-fit ranking without keyword-only spam filters
- Explainable score factors

### AI Interviewer Engine
- Real-time speech in / speech out
- Avatar interviews
- Structured video interviews
- AI audio interviews
- Adaptive follow-ups from rubric
- Same structure per Candidate for fairness
- Domains: behavioral, system design, role deep-dive, pair coding facilitation
- Recording, transcript, highlight reel
- Auto-score vs Sortie or Company rubric
- Human review override for network admission

### Live Coding Engine
- Shared collaborative editor during the call
- Multi-language support
- Runtimes and execution sandbox
- Unit test harness / hidden tests
- Multi-file projects
- Pair-programming mode with AI Interviewer or human
- Playback of coding session
- Plagiarism check vs corpus
- Coupled integrity signals

### Proctoring / Anti-Cheat Engine
- Fullscreen exit detection
- Tab / window blur
- Mouse leave assessment surface
- Multi-monitor heuristics
- Camera on/off
- Face present / multi-face
- Mic signals as required
- IP / device fingerprint
- Repeated IP across candidatures
- VPN / proxy heuristics
- Clipboard paste storms
- Second-screen detection signals
- Code similarity / plagiarism
- Behavior log per session
- Risk tiers (inform decisions; not always auto-fail)
- Ops review queue for disputed sessions

### Scorecard Engine
- Per-test scores
- Interview scores
- Coding scores
- Integrity summary
- Composite score
- Pass / fail
- Explanations / rationale
- Immutability after finalize
- Candidate-safe vs company vs ops views
- PDF export

### Network Admission Engine
- Elite threshold / top-percent positioning
- Category ranking
- Multi-stage admission gauntlet (see Candidate admission path)
- Re-verification cadence per skill
- Continued excellence tracking
- Demotion / removal for quality or integrity
- Waitlist handling

### Matching Engine
- Role ↔ NetworkListing ranking
- Signals: skills, seniority, timezone, rate, availability, score bands, integrity floor
- Explainable match reasons
- Saved searches and alerts
- Shortlist generation for Role intake
- “Hire without re-interview” default path
- Optional company interview pack attachment

### Job / Role Engine
- Create / edit / publish / pause / fill / archive Roles
- Public, network-only, confidential, evergreen listing types
- Requirements and compensation bands
- Assessment pack attachment
- Matching weight configuration
- Hiring team assignment

### Pipeline Engine
- ATS-style stages for company hiring
- Stages for Sortie network admission
- Customizable stage sets per Company / Role
- Default stage catalogs (see below)
- Stage changes without always notifying Candidate
- Rejection stage + optional rejection email

### Messaging / Intro Engine
- Blind profiles → revealed contact on invite/accept rules
- Intro requests
- Messaging threads
- Scheduling for company interviews
- Notification hooks

### Engagement Engine
- Contracts
- Trials (risk-free window)
- Time tracking workspace
- Milestones
- Approvals
- Replacements / rematch
- IP / NDA / contractor agreements
- Managed delivery / pods with Delivery Manager
- Client satisfaction and rematch flows

### Billing & Payments
- Company plans and seats
- Deposits (where used)
- Trial non-billing rules
- Hourly and full-time billing
- Invoices
- Contractor / talent payouts
- Spend analytics

### Notifications
- Email
- In-app
- SMS / WhatsApp (optional channels)
- Digest and real-time events

### Analytics
- Admission funnel
- Assessment completion funnel
- Quality / score distributions
- Time-to-shortlist / time-to-hire
- Mis-hire and trial-failure signals
- Network health
- Company usage and ROI surfaces

### Integrations Hub
- REST API for companies / ATS / HRIS
- Webhooks (progress, completion, stage changes)
- ATS connectors: Greenhouse, Lever, Workable, Ashby, BambooHR, SmartRecruiters, Zoho Recruit, Workday, Bullhorn, Freshteam, JazzHR, Recruitee, Teamtailor, SuccessFactors, Breezy, Buk, iCIMS, Zapier, Make.com, and equivalents
- Sync of scores, stages, and candidatures

### Content / Trust
- Case studies
- Skill and role landing content
- Verified badges
- Public sample talent (marketing)
- Methodology / science / fairness pages
- Blog and resources

---

## Full page map

### Marketing / public
- Home
- How Sortie works (talent path + company path)
- For companies
- For talent
- Categories (Engineering, Design, Product, Marketing, Data/AI, Finance, Sales, Project Management, and more)
- Skill / role landing pages
- Pricing
- Trust & methodology (screening science, anti-cheat, fairness)
- Case studies / customers
- Blog / resources
- Apply as talent
- Hire talent / request access
- Legal (Terms of Service, Privacy, Cookies, DPA)
- Contact / sales

### Auth
- Sign up (talent)
- Sign up (company)
- Login
- MFA challenge
- Password reset
- Onboarding wizard (talent)
- Onboarding wizard (company)
- Org invite accept

### Candidate app
- Dashboard
- Application / network admission status
- Assessment center (invites, history)
- Take assessment (multi-test flow)
- AI interview room (voice + video avatar)
- Live coding room (coupled to interview)
- Results & scorecards (candidate-safe view)
- Network profile (visible to companies when admitted)
- Discover roles / job board (network-only + open)
- Applications to roles
- Interviews with companies (optional)
- Messages / intros
- Engagements (active contracts, timesheets)
- Earnings / payouts
- Settings (availability, rate, timezone, privacy)
- Help / appeals

### Company app
- Dashboard
- Roles / job listings (create, edit, publish, close)
- Talent search (network directory)
- Shortlists & saved talent
- Match recommendations per role
- Candidate profile (network view + score bands + optional deep packet)
- Pipeline per role
- Assessment campaigns (invite applicants to Sortie assessments for a role)
- AI interview / coding review for role-specific packs
- Compare candidates side-by-side
- Intro / interview scheduling
- Trial & engagement management
- Team seats & permissions
- Billing
- Integrations
- Analytics
- Settings

### Admin / Sortie ops
- Applicant queue & screening overrides
- Rubric / test library CMS
- Network quality (promotions, demotions, removals)
- Fraud / cheat review console
- Company KYC / sales ops
- Dispute / rematch console
- Content CMS
- System health (interview infra, sandboxes)
- Delivery management for managed pods

---

## Candidate dashboard — line items

### At a glance
- Network status: Applied → Screening → In assessment → Interview → Project → Admitted / Rejected / Waitlist
- Completion % of Sortie gauntlet
- Overall Sortie score / percentile (when unlocked)
- Integrity status
- Availability (hours/week, start date)
- Active engagements
- Pending intros

### Admission path (full gauntlet)
1. Profile completeness & language / communication screen
2. Skills battery (multi-test Assessment)
3. AI conversational interview (speak + listen)
4. Live coding / domain exercise during the call
5. Take-home / test project (1–3 week equivalent, scoped per field)
6. Final QA / professionalism check
7. Network admission + continued excellence tracking

### Widgets / sections
- Next required action (primary CTA)
- Upcoming AI interview / coding session
- Assessment results history
- Skill radar / top skills with percentiles
- Anti-cheat summary (candidate-safe: session integrity clear / under review)
- Profile strength meter
- Public network profile preview
- Recommended roles (Matching Engine)
- Messages & company interest
- Calendar / timezone
- Learning / re-skill prompts before retest
- Referral program
- Support / appeal failed stage

---

## Company dashboard — line items

### At a glance
- Open roles + pipeline health
- New matches this week
- Candidates in trial
- Time-to-shortlist / time-to-hire
- Spend / burn rate

### Hire flows
- **Instant network hire:** search → shortlist → intro → optional company interview → trial → engage
- **Role-attached sourcing:** post Role → Matching Engine fills pipeline from Network
- **Open applicant funnel:** post public job → auto-invite to Assessment → rank → only passers enter pipeline / network path

### Widgets / sections
- Role cards (status, applicants, matches, interviews)
- Talent feed (new admits in relevant stacks)
- Saved searches & alerts
- Side-by-side comparison
- Score + integrity badges
- Request intro / schedule interview
- Trial timer & satisfaction
- Rematch / replacement
- Team activity audit
- Integration sync status

---

## Job listings — full model

### Listing types
- **Network-only** — visible only to admitted talent
- **Public** — anyone can apply (then forced through Sortie Assessment)
- **Confidential** — anonymized company
- **Evergreen / pipeline roles**
- **Managed team / pod request** (managed-delivery style)

### Fields on a listing
- Title
- Category
- Seniority
- Description + responsibilities
- Must-have skills (skills graph IDs)
- Nice-to-have skills
- Tech stack / tools
- Employment type: hourly, part-time, full-time, contract, trial-to-hire
- Duration / start date
- Compensation band + currency + equity flag
- Timezone / overlap hours
- Location preference (remote / hybrid / onsite / geo constraints)
- Language requirements
- Assessment pack attached (auto from JD via Assessment Builder AI)
- Matching weights (skills vs seniority vs rate vs timezone)
- Pipeline stages (customizable; defaults below)
- Hiring team + permissions
- Status: draft, open, paused, filled, archived
- Visibility & application limit
- SLA: target shortlist time

### Company pipeline stages (defaults)
- Not yet evaluated
- Evaluated
- Invited to Sortie assessment
- Assessment complete
- Invited for company interview
- Interviewed
- Invited for take-home test
- Take-home test completed
- References checked
- Offer sent
- Offer declined
- Candidate withdrew
- Candidate unresponsive
- Rejected
- Hired
- Trial
- Engaged

### Talent-facing job card
- Company (or confidential)
- Stack + seniority
- Comp range
- Overlap hours
- Match % + why you match
- Assessment required?
- Apply / Express interest

### Company-facing candidate card on a Role
- Photo / name (subject to privacy rules)
- Sortie network badge + category
- Composite score + skill percentiles
- Coding + interview summaries
- Integrity badge
- Rate / availability / timezone
- Match reasons
- Actions: save, shortlist, intro, request optional interview, reject, advance stage

---

## Assessment & interview product — line items

### Assessment composition
- Up to N skills tests per Assessment
- Custom questions
- Resume scoring
- AI interview attachment
- Live coding attachment
- AI builder from job title / description
- Library catalog (cognitive, role-specific, language, personality, AI fluency, job simulations) at TestGorilla-class breadth (350+-style)
- Public invite links
- Email invites
- ATS / API invites
- Personalized take URL without email
- Re-invite flows
- One Candidature per Assessment by default (retake policy configurable)
- Statuses: invited / started / completed / expired; Assessment statuses: new / active / archived
- Results: overall, per-test, percentiles, benchmarks
- PDF export
- Personality narratives
- Coding results: languages, hidden tests, playback
- Custom video / audio answers
- Qualifying knock-out questions
- Rejection email automation
- Hiring stages on candidatures
- Delete candidature (e.g. to allow controlled retake)
- List / detail Assessments and candidatures
- Anti-cheating flags on candidature detail

### AI Interviewer (Sortie differentiator)
- Real-time speech in / speech out
- Adaptive follow-ups from rubric
- Same structure for every Candidate (fairness)
- Domains: behavioral, system design, role deep-dive, pair coding
- Recording, transcript, highlight reel
- Auto-score vs company or Sortie rubric
- Human review override for network admission

### Live Coding
- Collaborative editor during AI or human call
- Run code, unit tests, multi-file projects
- Language packs
- Playback + plagiarism check
- Coupled integrity signals

### Anti-cheat (parity and beyond)
- Fullscreen exit
- Tab leave
- Mouse leave
- Camera enabled / face signals
- Repeated IP
- Device fingerprint
- Clipboard anomalies
- Second-screen signals
- Code similarity
- Risk tiers
- Ops review queue

---

## Network & matching — line items

### Network
- Strict admission percent positioning
- Categories: Developers, Designers, Marketing Experts, Management Consultants, Project Managers, Product Managers, Sales Experts, Data/AI, and additional fields as launched
- Verified Expert profiles: bio, skills, expertise areas, work history, education, certifications, portfolio, member since, availability
- Continued excellence: client ratings → ranking / removal
- Re-certification cadence per skill

### Matching
- Role intake → shortlist
- Filters: skills, seniority, rate, geo, timezone, availability, score floor, integrity floor
- Explainable match reasons
- Talent search (anonymous until invite, then reveal — sourcing pattern)
- Saved searches + alerts
- Hire without re-interview by default
- Optional company interview

### Engagements
- Risk-free trial window
- Hourly / full-time
- Time tracking workspace
- Approvals & invoicing
- Rematch / replacement guarantee
- IP / NDA / contractor agreements
- Managed delivery / pods (Delivery Manager, milestones, reporting)

---

## Platform API surface (own and exceed TestGorilla docs)

### Assessments
- List Assessments (filter status, ordering, pagination)
- Assessment detail (counts, public links, benchmarks)
- Anti-cheating flags for a candidature

### Invites
- Create public link
- Activate / deactivate public link
- Invite Candidate by email
- Personalized take URL without sending email
- Re-invite by candidature ID

### Candidates / candidatures
- List candidatures for an Assessment (status, stage, ordering, pagination)
- Candidate detail
- Delete candidature
- Change stage (including Rejected)
- Trigger rejection email

### Results
- Assessment results retrieval
- Results PDF
- Result types: basic tests, custom questions, personality tests, personality description, coding tests

### Sortie-native (beyond TestGorilla public API)
- Network search
- Match for Role
- Role and pipeline sync
- Webhooks for assessment progress and OrderComplete-style completion events
- Intro / engagement hooks as needed for ATS

---

## Roles & permissions

- Candidate
- Company owner / billing admin
- Company recruiter
- Hiring manager
- Company interviewer (read / interview scopes)
- Sortie screener / ops
- Sortie admin
- Delivery Manager (managed engagements)

---

## Non-functional product requirements

- Real-time media quality for interviews worldwide
- Sandboxed code execution at scale
- Fairness / bias monitoring on scores
- Data residency options
- Full audit logs
- Accessibility on all dashboards and interview UI
- Mobile-responsive candidate flows
- Desktop-class interview + coding experience
- prefers-reduced-motion and keyboard access on product chrome

---

## Architecture notes for implementers

- Prefer **deep modules** with small interfaces at clear **seams** (AssessmentEngine, NetworkDirectory, MatchingEngine, Identity, Billing, etc.).
- Real seams (multiple adapters): LLM provider, media/WebRTC, code execution sandbox, payments, ATS connectors.
- Domain decisions that crystallize belong in `docs/adr/`; do not silently contradict this file or recorded ADRs.
- UI must not look generic AI-SaaS; design skills in `.agents/skills/` apply to every visual surface.
- **UI system direction is locked in `docs/ui-system.md`** — tokens, type, layout, anti-patterns, surface dials. Follow it for every visual change.
- Architecture skills in `.agents/skills/` apply to structure, planning, and reviews.

---

## Document control

- **Purpose:** Single glossary and full feature inventory for Sortie Projects.
- **Audience:** Humans and agents building product, UI, and backend.
- **Rule:** When adding product capability, update this file in the same change.
