import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import type { CategoryPageModel } from "@/lib/skills/types";

export function CategoryLandingPage({ model }: { model: CategoryPageModel }) {
  return (
    <div className="flex flex-1 flex-col bg-canvas text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1 border-b border-line bg-panel">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium text-signal">Top talent</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Hire {model.categoryLabel}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Browse {model.categoryLabel.toLowerCase()} skills and open a hiring
            page for each role.
          </p>

          <div className="mt-8">
            <a
              href="/hire/auth"
              className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            >
              Hire {model.categoryLabel.toLowerCase()}
            </a>
          </div>

          <ul className="mt-14 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {model.skills.map((skill) => (
              <li key={skill.href} className="mb-2 break-inside-avoid">
                <a
                  href={skill.href}
                  className="block rounded-sm py-1.5 text-[15px] text-foreground/85 transition hover:text-signal"
                >
                  {skill.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
