const pillars = [
  {
    title: "AI interview engine",
    body: "Adaptive technical interviews that probe depth, communication, and real-world problem solving — not trivia.",
  },
  {
    title: "Anti-cheat proctoring",
    body: "Session integrity checks, environment signals, and anomaly scoring so every pass means something.",
  },
  {
    title: "Elite matching",
    body: "Companies hire from a shortlist of proven talent. Talent joins once — and stays verified.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <p className="font-display text-lg font-semibold tracking-tight text-white">
            Sortie Projects
          </p>
          <nav className="flex items-center gap-3 text-sm text-white/80">
            <a className="hidden sm:inline hover:text-white" href="#platform">
              Platform
            </a>
            <a
              className="rounded-md bg-white px-4 py-2 font-medium text-ink transition hover:bg-glow"
              href="#waitlist"
            >
              Get early access
            </a>
          </nav>
        </div>
      </header>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(15,143,108,0.45),transparent_50%),radial-gradient(ellipse_at_80%_0%,rgba(159,232,200,0.22),transparent_40%),linear-gradient(180deg,#07140f_0%,#0b1f18_55%,#10261d_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-32">
          <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl">
            Sortie Projects
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-2xl font-medium leading-tight text-white/95 sm:text-4xl">
            Hire engineers who already passed the hard part.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            An AI-powered talent network with interview proctoring and anti-cheat
            systems — built for companies that refuse to gamble on resumes.
          </p>
          <div id="waitlist" className="mt-10 flex flex-wrap gap-3">
            <a
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
              href="mailto:hello@sortieprojects.com?subject=Early%20access"
            >
              Request early access
            </a>
            <a
              className="rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/50 hover:bg-white/5"
              href="#platform"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      <section id="platform" className="border-t border-line bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:grid-cols-[1fr_1.2fr] sm:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Platform
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What Toptal-class screening looks like with AI at the core.
            </h2>
          </div>
          <ul className="space-y-8">
            {pillars.map((item) => (
              <li key={item.title} className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-prose text-muted leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-line bg-panel">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-semibold text-ink">Sortie Projects</p>
          <p>AI-vetted talent marketplace · In active development</p>
        </div>
      </footer>
    </div>
  );
}
