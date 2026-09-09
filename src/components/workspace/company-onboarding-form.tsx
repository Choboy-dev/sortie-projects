"use client";

import { useState, useTransition } from "react";
import { talentCategories } from "@/data/talent-menu";
import type { CompanyOnboardingInput } from "@/lib/workspace";

type CompanyOnboardingFormProps = {
  defaultName?: string;
  action: (
    input: CompanyOnboardingInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

const COMMON_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Africa/Lagos",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

export function CompanyOnboardingForm({
  defaultName = "",
  action,
}: CompanyOnboardingFormProps) {
  const [companyName, setCompanyName] = useState(defaultName);
  const [website, setWebsite] = useState("");
  const [hiringTitle, setHiringTitle] = useState("");
  const [hiringCategoryId, setHiringCategoryId] = useState(
    talentCategories[0].id,
  );
  const [timezone, setTimezone] = useState("UTC");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await action({
        companyName,
        website: website || null,
        hiringTitle,
        hiringCategoryId,
        timezone,
      });
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Company
          </h2>
          <p className="mt-1 text-sm text-muted">
            Who you are hiring for on Sortie.
          </p>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Company name</span>
          <input
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            autoComplete="organization"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Website (optional)</span>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://"
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Timezone</span>
          <select
            required
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            First hire focus
          </h2>
          <p className="mt-1 text-sm text-muted">
            A starting point. Full role briefs come next.
          </p>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Role title</span>
          <input
            required
            value={hiringTitle}
            onChange={(e) => setHiringTitle(e.target.value)}
            placeholder="e.g. Senior product designer"
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Category</span>
          <select
            required
            value={hiringCategoryId}
            onChange={(e) =>
              setHiringCategoryId(
                e.target.value as (typeof talentCategories)[number]["id"],
              )
            }
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
          >
            {talentCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-signal px-4 py-3 text-sm font-semibold text-white transition hover:bg-signal-strong disabled:opacity-60 sm:w-auto sm:min-w-48"
      >
        {pending ? "Saving…" : "Finish setup"}
      </button>
    </form>
  );
}
