import {
  ChatCircleDots,
  Handshake,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { FeatureCard } from "@/components/marketing/feature-card";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { VettingSection } from "@/components/marketing/vetting-section";
import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";
import { SkillTalentSection } from "@/components/skills/skill-talent-section";
import type { SkillPageModel } from "@/lib/skills/types";

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
];

const stepIcons = [ChatCircleDots, UsersThree, Handshake] as const;

export function SkillLandingPage({ model }: { model: SkillPageModel }) {
  const { skill, hero, relatedSkills, siblingSkills, talent, capabilities, faqs, hireSteps } =
    model;

  return (
    <div className="flex flex-1 flex-col bg-canvas text-foreground">
      <SiteHeader />

      <main id="main" className="flex-1">
        <section className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-8 sm:pb-16 sm:pt-10">
            {relatedSkills.length > 0 ? (
              <nav aria-label="Related skills" className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Related skills
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {relatedSkills.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground/80 transition hover:text-signal"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <p className="text-sm font-medium text-signal">
              <a href={skillHrefCategory(skill.categoryId)} className="hover:text-signal-strong">
                {skill.categoryLabel}
              </a>
              <span className="mx-2 text-muted">/</span>
              {skill.label}
            </p>

            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/hire/auth"
                className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
              >
                {hero.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-canvas py-8">
          <p className="mb-3 text-center text-base font-bold tracking-tight text-foreground sm:text-lg">
            Trusted by teams shipping with Sortie talent
          </p>
          <LogoMarquee logos={trustLogos} />
        </section>

        <SkillTalentSection skillLabel={skill.label} talent={talent} />

        <section className="border-b border-line bg-ink text-chalk">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The Sortie advantage
              </h2>
              <p className="mt-3 text-base text-chalk/75">
                Most clients continue after a no-risk trial. Screening and matching
                are built so you meet exceptional {skill.label.toLowerCase()} —
                not a longlist of maybes.
              </p>
            </div>
            <a
              href="/hire/auth"
              className="inline-flex shrink-0 rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            >
              Start hiring
            </a>
          </div>
        </section>

        <section className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                How to hire {skill.label.toLowerCase()}
              </h2>
              <p className="mt-4 text-lg text-muted">
                From brief to working talent — without the traditional recruiting
                grind.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {hireSteps.map((step, index) => {
                const Icon = stepIcons[index] ?? ChatCircleDots;
                return (
                  <FeatureCard
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    icon={Icon}
                  />
                );
              })}
            </div>
            <div className="mt-16">
              <a
                href="/hire/auth"
                className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
              >
                Hire top {skill.label.toLowerCase()}
              </a>
            </div>
          </div>
        </section>

        <VettingSection />

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Capabilities of {skill.label.toLowerCase()}
              </h2>
              <p className="mt-4 text-lg text-muted">
                What Sortie {skill.label.toLowerCase()} typically bring to a
                brief — calibrated to the role, not a generic CV.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div key={item.title} className="border-t border-line pt-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {siblingSkills.length > 0 ? (
          <section className="border-b border-line bg-panel">
            <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Find the right talent for every project
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-muted">
                Explore related roles in {skill.categoryLabel.toLowerCase()}.
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siblingSkills.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group block rounded-md border border-line bg-canvas px-5 py-5 transition hover:border-signal/40"
                    >
                      <span className="font-display text-base font-semibold tracking-tight group-hover:text-signal">
                        {item.label}
                      </span>
                      <span className="mt-2 block text-sm text-muted">
                        Hire {item.singular.toLowerCase()} talent →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              FAQs
            </h2>
            <div className="mt-10 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-t border-line pt-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink text-chalk">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center sm:py-20">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Ready to hire {skill.label.toLowerCase()}?
              </h2>
              <p className="mt-3 max-w-xl text-base text-chalk/75">
                Share your brief. Get matched with Sortie network talent on a
                no-risk trial.
              </p>
            </div>
            <a
              href="/hire/auth"
              className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            >
              Hire talent
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function skillHrefCategory(categoryId: string) {
  return `/${categoryId}`;
}
