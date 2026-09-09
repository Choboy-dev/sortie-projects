import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

type MarketingPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function marketingMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} — Sortie Projects`,
    description,
  };
}

export function MarketingPageShell({
  title,
  description,
  children,
}: MarketingPageShellProps) {
  return (
    <div className="flex flex-1 flex-col bg-panel text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1 border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <header className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted">{description}</p>
          </header>
          <div className="mt-14">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
