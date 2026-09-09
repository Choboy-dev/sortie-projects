import {
  MarketingPageShell,
  marketingMetadata,
} from "@/components/marketing/marketing-page-shell";

export const metadata = marketingMetadata(
  "Pricing",
  "Flexible engagements with Africa’s top 1% talent — hourly to full-time, with no-risk trials.",
);

const engagements = [
  {
    title: "Hourly",
    body: "Bring in specialists for focused scope — architecture spikes, audits, or overflow delivery — without a long commitment.",
  },
  {
    title: "Part-time",
    body: "Ongoing capacity for product teams that need senior help every week without a full-time seat.",
  },
  {
    title: "Full-time",
    body: "Dedicated network members embedded with your team, aligned to your roadmap and timezone overlap.",
  },
] as const;

export default function PricingPage() {
  return (
    <MarketingPageShell
      title="Pricing"
      description="You hire people, not packages. Sortie matches you with vetted talent at transparent rates for the engagement model you need — then you start with a no-risk trial."
    >
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {engagements.map((item) => (
          <article key={item.title} className="grid gap-2 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
            <h2 className="font-display text-xl font-semibold tracking-tight text-signal">
              {item.title}
            </h2>
            <p className="text-base leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>

      <section className="mt-16 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          How billing works
        </h2>
        <p>
          Rates are set per talent profile and engagement. There is no opaque
          “agency markup” layered onto a mystery number — you see the cost of
          working with a network member who already cleared Sortie’s gauntlet.
        </p>
        <p>
          Every engagement can begin with a risk-free trial. If the fit is not
          right, we rematch you. You pay for work that clears the bar — not for
          months of sourcing and screening.
        </p>
        <p>
          Enterprise and multi-seat hiring plans are available for teams that
          need ongoing introductions across roles. Tell us what you are
          building and we will propose a structure that matches.
        </p>
      </section>

      <div className="mt-12">
        <a
          className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
          href="mailto:hello@sortieprojects.com?subject=Start%20hiring%20with%20Sortie"
        >
          Start hiring
        </a>
      </div>
    </MarketingPageShell>
  );
}
