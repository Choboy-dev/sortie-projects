"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { OnboardingProgress } from "@/components/workspace/onboarding/progress";
import { stepEase } from "@/components/workspace/onboarding/constants";

type OnboardingWizardShellProps = {
  eyebrow: string;
  step: number;
  total: number;
  direction: 1 | -1;
  stepKey: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
};

export function OnboardingWizardShell({
  eyebrow,
  step,
  total,
  direction,
  stepKey,
  children,
  footer,
  className,
}: OnboardingWizardShellProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-16 -top-24 h-56 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_18%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="relative space-y-8">
        <div>
          <p className="text-sm font-medium text-signal">{eyebrow}</p>
          <div className="mt-4">
            <OnboardingProgress step={step} total={total} />
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-line/80 bg-panel/90 p-6 shadow-[0_24px_60px_-40px_rgba(7,20,15,0.35)] sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent"
          />
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={stepKey}
              custom={direction}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * 28 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * -22 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.32, ease: stepEase }
              }
              className="outline-none"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">{footer}</div>
      </div>
    </div>
  );
}

type WizardNavProps = {
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  continueType?: "button" | "submit";
  pending?: boolean;
  hideBack?: boolean;
};

export function WizardNav({
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled,
  continueType = "button",
  pending,
  hideBack,
}: WizardNavProps) {
  return (
    <>
      {hideBack ? (
        <span />
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-medium text-foreground transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-signal/40 hover:bg-canvas active:scale-[0.98]"
        >
          Back
        </button>
      )}
      <button
        type={continueType}
        onClick={continueType === "button" ? onContinue : undefined}
        disabled={continueDisabled || pending}
        className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-2.5 text-sm font-semibold text-white transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-signal-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Saving…" : continueLabel}
        {!pending ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition duration-300 group-hover:translate-x-0.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : null}
      </button>
    </>
  );
}

export function WizardQuestion({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {hint ? <p className="mt-2 text-base text-muted">{hint}</p> : null}
    </div>
  );
}

export function ChoiceTile({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
        selected
          ? "border-signal bg-signal/10 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--signal)_35%,transparent)]"
          : "border-line bg-canvas/60 text-muted hover:border-signal/30 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function FieldInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-line bg-canvas/50 px-4 py-3.5 text-base outline-none transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted/70 focus:border-signal focus:bg-panel focus:ring-4 focus:ring-signal/15",
        props.className,
      )}
    />
  );
}

export function FieldSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-line bg-canvas/50 px-4 py-3.5 text-base outline-none transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-signal focus:bg-panel focus:ring-4 focus:ring-signal/15",
        props.className,
      )}
    />
  );
}
