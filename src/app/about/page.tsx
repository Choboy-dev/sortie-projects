import {
  MarketingPageShell,
  marketingMetadata,
} from "@/components/marketing/marketing-page-shell";

export const metadata = marketingMetadata(
  "About",
  "Sortie Projects connects companies with Africa’s top 1% of AI-vetted freelance talent.",
);

export default function AboutPage() {
  return (
    <MarketingPageShell
      title="About Sortie"
      description="Sortie Projects is an exclusive network of AI-vetted developers, designers, and specialists — built so serious companies can hire from people who already cleared the gauntlet."
    >
      <div className="max-w-3xl space-y-10 text-base leading-relaxed text-muted">
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Why we exist
          </h2>
          <p>
            Hiring great talent across Africa should not mean months of sourcing,
            inconsistent screening, or betting on a résumé. Sortie runs a
            multi-stage admission process — skills assessments, AI interviews
            with live coding, integrity checks, and project delivery — so that
            less than 1% of applicants join the network.
          </p>
          <p>
            Companies then hire from people who are already verified. Matching
            scores skills, seniority, timezone, rate, and availability, and
            explains why each shortlist fits. You show up to interview
            candidates who made it through — not a pile of unvetted applications.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Who we serve
          </h2>
          <p>
            Founders, engineering leaders, and operators who need elite
            freelance or embedded talent without rebuilding a recruiting machine.
            And professionals who want client work that respects the bar they
            cleared to get in.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Contact
          </h2>
          <p>
            Hiring or applying to the network — reach us at{" "}
            <a
              className="font-medium text-signal hover:text-signal-strong"
              href="mailto:hello@sortieprojects.com"
            >
              hello@sortieprojects.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <a
          className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
          href="mailto:hello@sortieprojects.com?subject=Start%20hiring%20with%20Sortie"
        >
          Start hiring
        </a>
        <a
          className="inline-flex rounded-md border border-line px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-canvas active:scale-[0.98]"
          href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network"
        >
          Apply as talent
        </a>
      </div>
    </MarketingPageShell>
  );
}
