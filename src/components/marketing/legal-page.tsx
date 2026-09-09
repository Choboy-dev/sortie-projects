import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import type { LegalDocument } from "@/content/legal/types";

export function legalMetadata(doc: LegalDocument): Metadata {
  return {
    title: `${doc.title} — Sortie Projects`,
    description: doc.description,
  };
}

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <div className="flex flex-1 flex-col bg-panel text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1 border-b border-line">
        <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
          <header className="border-b border-line pb-10">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {document.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{document.description}</p>
            <p className="mt-6 text-sm text-muted">
              Last updated {document.lastUpdated}
            </p>
          </header>

          <div className="mt-12 space-y-12">
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-p-${index}`}>{paragraph}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5 text-muted">
                      {section.bullets.map((item, index) => (
                        <li key={`${section.heading}-b-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-16 border-t border-line pt-8 text-sm text-muted">
            Questions about this page? Email{" "}
            <a
              className="font-medium text-signal hover:text-signal-strong"
              href="mailto:hello@sortieprojects.com"
            >
              hello@sortieprojects.com
            </a>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
