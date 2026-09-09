import { HeroEntrance } from "@/components/motion/hero-entrance";

const admission = [
  {
    step: "01",
    title: "Profile and communication",
    body: "Complete your profile, then clear the language and communication screen.",
  },
  {
    step: "02",
    title: "Skills battery",
    body: "Take the role pack — timed skills tests scored against Sortie benchmarks.",
  },
  {
    step: "03",
    title: "AI interview and live coding",
    body: "Talk with the AI interviewer, write code in the live editor, and stay under integrity watch.",
  },
  {
    step: "04",
    title: "Project and network admission",
    body: "Finish the take-home. Pass, and companies can hire you without re-running the hard part.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-8 rounded-full border border-chalk/15 bg-ink/55 px-5 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-ink/40">
            <p className="font-display text-base font-semibold tracking-tight text-chalk">
              Sortie
            </p>
            <nav className="hidden items-center gap-6 text-sm text-chalk/75 sm:flex">
              <a className="transition hover:text-chalk" href="#how-it-works">
                How it works
              </a>
              <a className="transition hover:text-chalk" href="#companies">
                Companies
              </a>
              <a className="transition hover:text-chalk" href="#talent">
                Talent
              </a>
            </nav>
          </div>
          <a
            className="rounded-full bg-signal-dark px-5 py-3 text-sm font-semibold text-ink transition hover:bg-signal-dark-strong active:scale-[0.98]"
            href="mailto:hello@sortieprojects.com?subject=Request%20access"
          >
            Request access
          </a>
        </div>
      </header>

      <main id="main" className="flex flex-1 flex-col">
        <section className="relative isolate min-h-[100dvh] overflow-hidden bg-ink text-chalk">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(31,169,122,0.28),transparent_52%),radial-gradient(ellipse_at_88%_8%,rgba(183,240,212,0.12),transparent_42%),linear-gradient(180deg,#07140f_0%,#0c1f18_58%,#10261d_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(243,247,245,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(243,247,245,0.09)_1px,transparent_1px)] [background-size:80px_80px]"
          />

          <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-32 sm:justify-center sm:pb-24 sm:pt-36">
            <HeroEntrance>
              <p className="font-display text-5xl font-semibold tracking-tight text-chalk sm:text-7xl md:text-[5.5rem] md:leading-[0.95]">
                Sortie Projects
              </p>
              <h1 className="mt-8 max-w-xl font-display text-2xl font-medium leading-tight tracking-tight text-chalk sm:text-4xl">
                Hire people who already passed.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-chalk/75 sm:text-lg">
                A closed talent network. AI interviews, live coding, and integrity
                checks first — then companies hire without re-running the hard
                part.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-signal-dark px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-signal-dark-strong active:scale-[0.98]"
                  href="mailto:hello@sortieprojects.com?subject=Request%20access"
                >
                  Request access
                </a>
                <a
                  className="rounded-full border border-chalk/25 px-6 py-3.5 text-sm font-medium text-chalk/90 transition hover:border-chalk/50 hover:bg-chalk/5 active:scale-[0.98]"
                  href="#how-it-works"
                >
                  See how it works
                </a>
              </div>
            </HeroEntrance>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-line bg-canvas"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:gap-20 sm:py-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Admission is a sequence.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Only people who clear the full gauntlet enter the network.
                Companies browse verified talent — optional interviews only when
                they want them.
              </p>
            </div>
            <ol className="space-y-0">
              {admission.map((item) => (
                <li
                  key={item.step}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-8 first:border-t-0 first:pt-0 sm:gap-x-8"
                >
                  <span className="font-mono text-sm font-medium text-signal">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-muted leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="companies"
          className="border-t border-line bg-panel"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 sm:py-32 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                For companies
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Post a role, get ranked matches from the network, shortlist, and
                request intros. Skip the screening circus — or run a light
                company interview if you need culture fit.
              </p>
            </div>
            <a
              className="inline-flex w-fit rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-chalk transition hover:bg-signal-strong active:scale-[0.98]"
              href="mailto:hello@sortieprojects.com?subject=Company%20access"
            >
              Request access
            </a>
          </div>
        </section>

        <section
          id="talent"
          className="border-t border-line bg-canvas"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 sm:py-32 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                For talent
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Pass once. Stay in a closed network where companies come to you.
                Your scorecard travels with you — integrity included.
              </p>
            </div>
            <a
              className="inline-flex w-fit rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-foreground/40 hover:bg-foreground/5 active:scale-[0.98]"
              href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20network"
            >
              Apply to the network
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-panel">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base font-semibold text-foreground">
            Sortie Projects
          </p>
          <p className="font-mono text-xs tracking-wide">
            Elite network · AI-vetted · Integrity first
          </p>
        </div>
      </footer>
    </div>
  );
}
