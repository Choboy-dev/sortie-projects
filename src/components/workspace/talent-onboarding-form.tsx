"use client";

import { useMemo, useState, useTransition } from "react";
import { talentCategories } from "@/data/talent-menu";
import type { TalentOnboardingInput } from "@/lib/workspace";
import {
  COMMON_TIMEZONES,
  HOURS_OPTIONS,
} from "@/components/workspace/onboarding/constants";
import {
  ChoiceTile,
  FieldInput,
  FieldSelect,
  OnboardingWizardShell,
  WizardNav,
  WizardQuestion,
} from "@/components/workspace/onboarding/wizard-shell";

type TalentOnboardingFormProps = {
  defaultName?: string;
  action: (
    input: TalentOnboardingInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

const STEPS = ["name", "category", "skills", "availability", "rate"] as const;
type StepId = (typeof STEPS)[number];

export function TalentOnboardingForm({
  defaultName = "",
  action,
}: TalentOnboardingFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
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

  const step = STEPS[stepIndex] as StepId;
  const total = STEPS.length;

  const categorySkills = useMemo(
    () =>
      talentCategories.find((c) => c.id === categoryId)?.skills.slice(0, 12) ??
      [],
    [categoryId],
  );

  function goTo(next: number) {
    setError(null);
    setDirection(next > stepIndex ? 1 : -1);
    setStepIndex(next);
  }

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

  function canContinue(): boolean {
    if (step === "name") return displayName.trim().length >= 2;
    if (step === "category") return Boolean(categoryId);
    if (step === "skills") return skills.length >= 1;
    if (step === "availability") return Boolean(timezone) && hoursPerWeek >= 5;
    if (step === "rate") {
      if (!rateAmount.trim()) return true;
      const rate = Number(rateAmount);
      return Number.isFinite(rate) && rate >= 0;
    }
    return false;
  }

  function continueOrSubmit() {
    if (!canContinue()) {
      if (step === "name") setError("Enter a display name.");
      else if (step === "skills") setError("Pick at least one skill.");
      else if (step === "rate") setError("Enter a valid rate, or leave it blank.");
      return;
    }
    if (stepIndex < total - 1) {
      goTo(stepIndex + 1);
      return;
    }
    setError(null);
    startTransition(async () => {
      const rate = rateAmount.trim() ? Number(rateAmount) : null;
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
    <OnboardingWizardShell
      eyebrow="Admission setup"
      step={stepIndex}
      total={total}
      direction={direction}
      stepKey={step}
      footer={
        <WizardNav
          hideBack={stepIndex === 0}
          onBack={() => goTo(stepIndex - 1)}
          onContinue={continueOrSubmit}
          continueLabel={stepIndex === total - 1 ? "Finish setup" : "Continue"}
          continueDisabled={!canContinue() || pending}
          pending={pending && stepIndex === total - 1}
        />
      }
    >
      {step === "name" ? (
        <div>
          <WizardQuestion
            title="What should we call you?"
            hint="This is how you show up once admission opens."
          />
          <FieldInput
            autoFocus
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                continueOrSubmit();
              }
            }}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
      ) : null}

      {step === "category" ? (
        <div>
          <WizardQuestion
            title="What is your primary craft?"
            hint="Pick the category that fits you best."
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {talentCategories.map((category) => (
              <ChoiceTile
                key={category.id}
                selected={categoryId === category.id}
                onClick={() => {
                  setCategoryId(category.id);
                  setSkills([]);
                }}
              >
                {category.label}
              </ChoiceTile>
            ))}
          </div>
        </div>
      ) : null}

      {step === "skills" ? (
        <div>
          <WizardQuestion
            title="Which skills should companies see?"
            hint="Pick a few focus areas. You can refine later."
          />
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => {
              const selected = skills.includes(skill);
              return (
                <ChoiceTile
                  key={skill}
                  selected={selected}
                  onClick={() =>
                    selected ? removeSkill(skill) : addSkill(skill)
                  }
                  className="px-3 py-2"
                >
                  {skill}
                </ChoiceTile>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <FieldInput
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              placeholder="Add another skill"
              className="py-3 text-sm"
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
              className="shrink-0 rounded-xl border border-line px-4 text-sm font-medium hover:bg-canvas"
            >
              Add
            </button>
          </div>
          {skills.length > 0 ? (
            <p className="mt-3 text-sm text-muted">
              Selected: {skills.join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}

      {step === "availability" ? (
        <div>
          <WizardQuestion
            title="How available are you?"
            hint="Rough capacity so companies know what to expect."
          />
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium">Hours per week</p>
              <div className="grid grid-cols-4 gap-2">
                {HOURS_OPTIONS.map((hours) => (
                  <ChoiceTile
                    key={hours}
                    selected={hoursPerWeek === hours}
                    onClick={() => setHoursPerWeek(hours)}
                    className="px-2 py-3 text-center"
                  >
                    {hours}
                  </ChoiceTile>
                ))}
              </div>
            </div>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Timezone</span>
              <FieldSelect
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </FieldSelect>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Available from</span>
              <FieldInput
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </label>
          </div>
        </div>
      ) : null}

      {step === "rate" ? (
        <div>
          <WizardQuestion
            title="What is your hourly rate?"
            hint="Optional. Leave blank if you prefer to discuss later."
          />
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              $
            </span>
            <FieldInput
              type="number"
              min={0}
              step={1}
              value={rateAmount}
              onChange={(e) => setRateAmount(e.target.value)}
              placeholder="85"
              className="pl-8"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  continueOrSubmit();
                }
              }}
            />
          </div>
          <p className="mt-6 rounded-xl bg-canvas/80 px-4 py-3 text-sm text-muted">
            <span className="font-medium text-foreground">{displayName}</span>
            {" · "}
            {talentCategories.find((c) => c.id === categoryId)?.label}
            {" · "}
            {skills.slice(0, 3).join(", ")}
            {" · "}
            {hoursPerWeek} hrs/week
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="mt-6 rounded-xl border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </OnboardingWizardShell>
  );
}
