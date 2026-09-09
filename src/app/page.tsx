import {
  Brain,
  Code,
  Handshake,
  MagnifyingGlass,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
  TalentPhotoCard,
  type TalentPerson,
} from "@/components/marketing/talent-photo-card";
import { SiteHeader } from "@/components/marketing/site-header";
import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";
import { ShaderBackground } from "@/components/ui/mesh-portfolio";

const talent: TalentPerson[] = [
  {
    name: "Amara Okonkwo",
    title: "Staff Backend Engineer",
    expertise: "Verified Expert in Engineering",
    previously: "Stripe",
    discipline: "engineering",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Daniel Cho",
    title: "Senior Product Designer",
    expertise: "Verified Expert in Design",
    previously: "Figma",
    discipline: "design",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Sofia Martins",
    title: "ML Engineer",
    expertise: "Verified Expert in AI",
    previously: "DeepMind",
    discipline: "ai",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "James Whitfield",
    title: "Engineering Manager",
    expertise: "Verified Expert in Leadership",
    previously: "Shopify",
    discipline: "leadership",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Priya Nair",
    title: "Full-Stack Engineer",
    expertise: "Verified Expert in Engineering",
    previously: "Vercel",
    discipline: "engineering",
    photo:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Lucas Berger",
    title: "Security Engineer",
    expertise: "Verified Expert in Security",
    previously: "Cloudflare",
    discipline: "engineering",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=640&h=800&q=80",
  },
];

const trustLogos: Logo[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg",
    alt: "Nvidia",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg",
    alt: "Supabase",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg",
    alt: "OpenAI",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg",
    alt: "Vercel",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg",
    alt: "GitHub",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg",
    alt: "Clerk",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg",
    alt: "Turso",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg",
    alt: "Claude",
  },
];

const categories = [
  {
    title: "Developers",
    body: "Software engineers, architects, and specialists across hundreds of stacks — from backend systems to mobile and AI.",
  },
  {
    title: "Designers",
    body: "Product, UI/UX, and brand designers who ship production interfaces, not just decks.",
  },
  {
    title: "Product Managers",
    body: "Operators who turn ambiguous problems into shipped roadmaps and measurable outcomes.",
  },
  {
    title: "Data & AI",
    body: "Data scientists, ML engineers, and applied researchers ready for production workloads.",
  },
  {
    title: "Marketing Experts",
    body: "Growth, demand gen, and brand specialists who scale acquisition with accountability.",
  },
  {
    title: "Project Managers",
    body: "Technical PMs and scrum leaders who keep complex delivery on track.",
  },
] as const;

const valueProps = [
  {
    icon: MagnifyingGlass,
    title: "Hire in days, not months",
    body: "Submit a role brief and receive matched, already-vetted profiles. Average time to shortlist is measured in days — not recruiting cycles.",
  },
  {
    icon: ShieldCheck,
    title: "Only the top talent",
    body: "Every network member clears Sortie’s full gauntlet: skills assessments, AI interviews, live coding, integrity checks, and a take-home project.",
  },
  {
    icon: Brain,
    title: "AI matching that actually ranks",
    body: "Our matching engine scores skills, seniority, timezone overlap, rate, availability, and integrity — then explains why each candidate fits.",
  },
  {
    icon: Handshake,
    title: "No-risk trial",
    body: "Start with a risk-free trial. Pay only if satisfied. If the fit isn’t right, we rematch you with another network member.",
  },
] as const;

const hireSteps = [
  {
    step: "1",
    title: "Tell us what you need",
    body: "Share the role, stack, seniority, timezone, and engagement model. An industry specialist helps sharpen the brief.",
  },
  {
    step: "2",
    title: "Review matched talent",
    body: "Browse ranked profiles from the Sortie network — people who already passed. Skip re-screening unless you want a culture interview.",
  },
  {
    step: "3",
    title: "Start with a trial",
    body: "Engage the right person on a no-risk trial. Scale up, scale down, or rematch with no strings attached.",
  },
] as const;

const vetting = [
  {
    title: "Language & professionalism",
    body: "Communication screen focused on clarity, collaboration, and client-ready presence.",
  },
  {
    title: "Skills assessments",
    body: "Role-specific batteries with auto-scoring, percentiles, and job simulations.",
  },
  {
    title: "AI interview + live coding",
    body: "Conversational AI interviewer with a live coding engine during the session — talk, hear, write, and reason in real time.",
  },
  {
    title: "Integrity & project delivery",
    body: "Proctoring signals, anomaly scoring, and a real take-home project before network admission.",
  },
] as const;

const skills = [
  "React",
  "Node.js",
  "Python",
  "Go",
  "TypeScript",
  "AWS",
  "Kubernetes",
  "System Design",
  "Machine Learning",
  "Product Design",
  "iOS",
  "Android",
  "DevOps",
  "Data Engineering",
  "Security",
  "Growth Marketing",
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-panel text-foreground">
      <SiteHeader />

      <main id="main">
        {/* Hero + trust logos = first viewport */}
        <section className="relative flex min-h-[calc(100dvh-4.75rem)] flex-col overflow-hidden border-b border-line">
          <div className="relative isolate flex min-h-0 flex-1 flex-col">
            <div
              className="pointer-events-none absolute inset-0 motion-reduce:hidden"
              aria-hidden
            >
              <ShaderBackground className="absolute inset-0 h-full w-full" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 hidden bg-canvas motion-reduce:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-panel/30 via-transparent to-panel/70"
              aria-hidden
            />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10 lg:py-12">
              <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
                <div>
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                    Talk to the top 1% of candidates only worth your time. Hire
                    in 3 days.
                  </h1>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                    No sourcing, no screening, no chasing candidates. Just show
                    up to interview candidates who made it through our vetting.
                    Only 1% do.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      className="rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
                      href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
                    >
                      Hire Sortie talent
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5">
                  {talent.slice(0, 4).map((person) => (
                    <TalentPhotoCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 shrink-0 border-t border-line bg-canvas/90 backdrop-blur-sm"
            aria-label="Trusted by leading companies"
          >
            <div className="mx-auto w-full max-w-7xl px-6 py-5 sm:py-6">
              <LogoMarquee logos={trustLogos} className="py-0" />
            </div>
          </div>
        </section>

        {/* Categories — Toptal "Leverage World-class Talent" */}
        <section id="talent-categories" className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Leverage world-class talent on demand
              </h2>
              <p className="mt-4 text-lg text-muted">
                A globally distributed network of top business, design, and
                technology professionals — ready for your most important
                initiatives.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <article
                  key={cat.title}
                  className="border-t border-line pt-6"
                >
                  <h3 className="font-display text-xl font-semibold">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {cat.body}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-sm font-medium text-foreground">
              Plus thousands more skills — whatever specialization your business
              requires.
            </p>
          </div>
        </section>

        {/* Value props */}
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Build exceptional teams, on demand
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {valueProps.map((item) => (
                <article key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-panel">
                    <item.icon
                      className="text-signal"
                      size={22}
                      weight="regular"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring made easy — Toptal 3 steps */}
        <section id="how-hiring-works" className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Hiring made easy
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              From role brief to working talent — without the traditional
              recruiting grind.
            </p>
            <ol className="mt-12 grid gap-8 lg:grid-cols-3">
              {hireSteps.map((step) => (
                <li key={step.step} className="border-t border-line pt-6">
                  <p className="font-mono text-sm font-medium text-signal">
                    Step {step.step}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Vetting — Toptal screening + Sortie AI/TestGorilla depth */}
        <section id="vetting" className="border-b border-line bg-ink text-chalk">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Why less than 1% make the network
              </h2>
              <p className="mt-4 text-lg text-chalk/70">
                Every applicant passes a multi-stage process designed to measure
                subject-matter expertise, communication, integrity, and delivery
                under real conditions.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {vetting.map((item, index) => (
                <article
                  key={item.title}
                  className="border-t border-chalk/15 pt-6"
                >
                  <p className="font-mono text-xs font-medium tracking-wide text-mist">
                    Stage {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-chalk/65">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-signal-dark px-6 py-3.5 text-sm font-semibold text-ink hover:bg-mist active:scale-[0.98]"
                href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network"
              >
                Apply to the network
              </a>
              <a
                className="rounded-md border border-chalk/25 px-6 py-3.5 text-sm font-semibold text-chalk hover:bg-chalk/5 active:scale-[0.98]"
                href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
              >
                Hire talent
              </a>
            </div>
          </div>
        </section>

        {/* Turing-style matching + trial */}
        <section className="border-b border-line bg-panel">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                AI-matched talent. Client-ready profiles.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Like the best intelligent talent clouds, Sortie ranks the network
                against your role — skills, seniority, timezone, compensation,
                and availability — then surfaces a shortlist you can hire from
                immediately.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-muted">
                <li className="flex gap-3">
                  <Code className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden />
                  Deep technical profiles with scored assessments and coding
                  playback
                </li>
                <li className="flex gap-3">
                  <UsersThree className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden />
                  Optional company interviews — never required to access the
                  network signal
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="mt-0.5 shrink-0 text-signal" size={18} aria-hidden />
                  Integrity badges and risk tiers from live proctoring
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-8">
              <p className="font-mono text-xs font-medium tracking-wide text-signal">
                Engagement model
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Flexible hiring, enterprise rigor
              </h3>
              <dl className="mt-8 space-y-5 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Time to shortlist</dt>
                  <dd className="font-semibold">Days, not weeks</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Engagements</dt>
                  <dd className="font-semibold">Hourly to full-time</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Trial</dt>
                  <dd className="font-semibold">Risk-free start</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Rematch</dt>
                  <dd className="font-semibold">Included if fit fails</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Meet the network */}
        <section id="network" className="border-b border-line bg-canvas">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Meet talent in our network
                </h2>
                <p className="mt-3 text-lg text-muted">
                  Verified experts across engineering, design, product, and more.
                </p>
              </div>
              <a
                className="text-sm font-semibold text-signal hover:text-signal-strong"
                href="mailto:hello@sortieprojects.com?subject=Browse%20Sortie%20network"
              >
                Discover more talent
              </a>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {talent.map((person) => (
                <article
                  key={person.name}
                  className="rounded-lg border border-line bg-panel p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-xs font-semibold text-chalk">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="rounded-full bg-canvas px-2.5 py-1 font-mono text-[10px] font-medium tracking-wide text-signal">
                      Network
                    </span>
                  </div>
                  <p className="mt-4 font-display text-base font-semibold">
                    {person.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{person.title}</p>
                  <p className="mt-3 text-xs text-muted">
                    {person.expertise}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Previously at{" "}
                    <span className="font-medium text-foreground">
                      {person.previously}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills + proof */}
        <section className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Expert skillsets, ready to deploy
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-line bg-canvas px-3 py-1.5 text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3">
              <div>
                <p className="font-display text-4xl font-semibold text-foreground">
                  &lt;1%
                </p>
                <p className="mt-2 text-sm text-muted">
                  Approximate acceptance into the Sortie network
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-foreground">
                  48h
                </p>
                <p className="mt-2 text-sm text-muted">
                  Target window to introduce matched talent for common roles
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-foreground">
                  Trial
                </p>
                <p className="mt-2 text-sm text-muted">
                  Risk-free start on every engagement — pay only if satisfied
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink text-chalk">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Top talent is in high demand.
              </h2>
              <p className="mt-4 text-lg text-chalk/70">
                Whether you need to hire or join the network — Sortie is built
                for serious companies and serious professionals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-md bg-signal-dark px-6 py-3.5 text-sm font-semibold text-ink hover:bg-mist active:scale-[0.98]"
                href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
              >
                Hire talent
              </a>
              <a
                className="rounded-md border border-chalk/25 px-6 py-3.5 text-sm font-semibold text-chalk hover:bg-chalk/5 active:scale-[0.98]"
                href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network"
              >
                Apply as talent
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold">Sortie Projects</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Exclusive AI-vetted talent network. Assessments, interviews, live
              coding, matching, and hiring — in one platform.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Companies</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a className="hover:text-foreground" href="#how-hiring-works">
                  How hiring works
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#talent-categories">
                  Talent categories
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
                >
                  Contact sales
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Talent</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a className="hover:text-foreground" href="#vetting">
                  Vetting process
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network"
                >
                  Apply to the network
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Sortie Projects</p>
            <p>sortieprojects.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
