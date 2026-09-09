"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { stepEase } from "@/components/workspace/onboarding/constants";

type OnboardingProgressProps = {
  step: number;
  total: number;
  label?: string;
};

export function OnboardingProgress({
  step,
  total,
  label,
}: OnboardingProgressProps) {
  const reduce = useReducedMotion();
  const progress = Math.min(1, Math.max(0, (step + 1) / total));

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-muted">
          {label ?? `Step ${step + 1} of ${total}`}
        </p>
        <p className="font-mono text-xs tracking-wide text-signal">
          {Math.round(progress * 100)}%
        </p>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-line/80"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Onboarding progress"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-signal to-signal-dark"
          initial={false}
          animate={{ scaleX: progress }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.45, ease: stepEase }
          }
          style={{ transformOrigin: "left center" }}
        />
      </div>
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              index <= step ? "bg-signal" : "bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}
