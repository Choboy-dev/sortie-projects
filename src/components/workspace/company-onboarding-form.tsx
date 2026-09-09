"use client";

import { useState, useTransition } from "react";
import { talentCategories } from "@/data/talent-menu";
import type { CompanyOnboardingInput } from "@/lib/workspace";
import { COMMON_TIMEZONES } from "@/components/workspace/onboarding/constants";
import {
  ChoiceTile,
  FieldInput,
  FieldSelect,
  OnboardingWizardShell,
  WizardNav,
  WizardQuestion,
} from "@/components/workspace/onboarding/wizard-shell";

type CompanyOnboardingFormProps = {
  defaultName?: string;
  action: (
    input: CompanyOnboardingInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

const STEPS = ["company", "presence", "role", "category", "confirm"] as const;
type StepId = (typeof STEPS)[number];

export function CompanyOnboardingForm({
  defaultName = "",
  action,
}: CompanyOnboardingFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [companyName, setCompanyName] = useState(defaultName);
  const [website, setWebsite] = useState("");
  const [hiringTitle, setHiringTitle] = useState("");
  const [hiringCategoryId, setHiringCategoryId] = useState(
    talentCategories[0].id,
  );
  const [timezone, setTimezone] = useState("UTC");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const step = STEPS[stepIndex] as StepId;
  const total = STEPS.length;
  const categoryLabel =
    talentCategories.find((c) => c.id === hiringCategoryId)?.label ?? "";

  function goTo(next: number) {
    setError(null);
    setDirection(next > stepIndex ? 1 : -1);
    setStepIndex(next);
  }

  function canContinue(): boolean {
    if (step === "company") return companyName.trim().length >= 2;
    if (step === "presence") return Boolean(timezone);
    if (step === "role") return hiringTitle.trim().length >= 2;
    if (step === "category") return Boolean(hiringCategoryId);
    if (step === "confirm") return true;
    return false;
  }

  function continueOrSubmit() {
    if (!canContinue()) {
      if (step === "company") setError("Enter your company name.");
      else if (step === "role") setError("Enter the role title you want to fill.");
      return;
    }
    if (stepIndex < total - 1) {
      goTo(stepIndex + 1);
      return;
    }
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
    <OnboardingWizardShell
      eyebrow="Hiring setup"
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
      {step === "company" ? (
        <div>
          <WizardQuestion
            title="What is your company called?"
            hint="Who you are hiring for on Sortie."
          />
          <FieldInput
            autoFocus
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                continueOrSubmit();
              }
            }}
            placeholder="Company name"
            autoComplete="organization"
          />
        </div>
      ) : null}

      {step === "presence" ? (
        <div>
          <WizardQuestion
            title="Where can we find you?"
            hint="Website is optional. Timezone helps with scheduling."
          />
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Website</span>
              <FieldInput
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
              />
            </label>
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
          </div>
        </div>
      ) : null}

      {step === "role" ? (
        <div>
          <WizardQuestion
            title="What role are you filling first?"
            hint="A starting point. Full role briefs come next."
          />
          <FieldInput
            autoFocus
            required
            value={hiringTitle}
            onChange={(e) => setHiringTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                continueOrSubmit();
              }
            }}
            placeholder="e.g. Senior product designer"
          />
        </div>
      ) : null}

      {step === "category" ? (
        <div>
          <WizardQuestion
            title="Which talent category fits?"
            hint="We will use this to point you at the right people."
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {talentCategories.map((category) => (
              <ChoiceTile
                key={category.id}
                selected={hiringCategoryId === category.id}
                onClick={() => setHiringCategoryId(category.id)}
              >
                {category.label}
              </ChoiceTile>
            ))}
          </div>
        </div>
      ) : null}

      {step === "confirm" ? (
        <div>
          <WizardQuestion
            title="Does this look right?"
            hint="You can change details later when role posting opens."
          />
          <dl className="space-y-4 rounded-xl bg-canvas/80 px-4 py-4 text-sm">
            <div>
              <dt className="text-muted">Company</dt>
              <dd className="mt-1 font-medium text-foreground">{companyName}</dd>
            </div>
            {website ? (
              <div>
                <dt className="text-muted">Website</dt>
                <dd className="mt-1 font-medium text-foreground">{website}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-muted">Hiring focus</dt>
              <dd className="mt-1 font-medium text-foreground">
                {hiringTitle} · {categoryLabel}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Timezone</dt>
              <dd className="mt-1 font-medium text-foreground">{timezone}</dd>
            </div>
          </dl>
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
