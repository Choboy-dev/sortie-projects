"use client";

import { useMemo, useState, useTransition } from "react";
import { talentCategories } from "@/data/talent-menu";
import { cn } from "@/lib/utils";
import type { TalentOnboardingInput } from "@/lib/workspace";

type TalentOnboardingFormProps = {
  defaultName?: string;
  action: (
    input: TalentOnboardingInput,
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

export function TalentOnboardingForm({
  defaultName = "",
  action,
}: TalentOnboardingFormProps) {
  const [displayName, setDisplayName] = useState(defaultName);
  const [categoryId, setCategoryId] = useState(talentCategories[0].id);
  const [skillDraft, setSkillDraft] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("UTC");
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [availableFrom, setAvailableFrom] = useState("");
  const [rateAmount, setRateAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const categorySkills = useMemo(
    () =>
      talentCategories.find((c) => c.id === categoryId)?.skills.slice(0, 12) ??
      [],
    [categoryId],
  );

  function addSkill(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    setSkills((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed].slice(0, 8),
    );
    setSkillDraft("");
  }

  function removeSkill(label: string) {
    setSkills((prev) => prev.filter((s) => s !== label));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const rate = rateAmount.trim() ? Number(rateAmount) : null;
      if (rateAmount.trim() && (rate == null || Number.isNaN(rate) || rate < 0)) {
        setError("Enter a valid hourly rate, or leave it blank.");
        return;
      }
      const result = await action({
        displayName,
        categoryId,
        skills,
        timezone,
        hoursPerWeek,
        availableFrom: availableFrom || null,
        rateAmount: rate,
        rateCurrency: "USD",
      });
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            About you
          </h2>
          <p className="mt-1 text-sm text-muted">
            How you show up once admission opens.
          </p>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Display name</span>
          <input
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            autoComplete="name"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Primary category</span>
          <select
            required
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value as typeof categoryId);
              setSkills([]);
            }}
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

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Skills
          </h2>
          <p className="mt-1 text-sm text-muted">
            Pick a few focus areas. You can refine later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categorySkills.map((skill) => {
            const selected = skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() =>
                  selected ? removeSkill(skill) : addSkill(skill)
                }
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm transition",
                  selected
                    ? "border-signal bg-signal/10 text-foreground"
                    : "border-line bg-panel text-muted hover:text-foreground",
                )}
              >
                {skill}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
            placeholder="Add another skill"
            className="min-w-0 flex-1 rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill(skillDraft);
              }
            }}
          />
          <button
            type="button"
            onClick={() => addSkill(skillDraft)}
            className="rounded-md border border-line px-3 py-2 text-sm font-medium hover:bg-panel"
          >
            Add
          </button>
        </div>
        {skills.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="inline-flex items-center gap-2 rounded-md bg-panel px-2.5 py-1 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-muted hover:text-foreground"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Availability
          </h2>
          <p className="mt-1 text-sm text-muted">
            Rough capacity so companies know what to expect.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
          <label className="block space-y-2">
            <span className="text-sm font-medium">Hours per week</span>
            <input
              required
              type="number"
              min={5}
              max={60}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Available from</span>
            <input
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Hourly rate (USD, optional)</span>
            <input
              type="number"
              min={0}
              step={1}
              value={rateAmount}
              onChange={(e) => setRateAmount(e.target.value)}
              placeholder="e.g. 85"
              className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none ring-signal/40 focus:ring-2"
            />
          </label>
        </div>
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
