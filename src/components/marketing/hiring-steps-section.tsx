"use client";

import {
  ChatCircleDots,
  Handshake,
  UsersThree,
} from "@phosphor-icons/react";
import { FeatureCard } from "@/components/marketing/feature-card";

const hireSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share the role, stack, seniority, timezone, and engagement model. An industry specialist helps sharpen the brief.",
    icon: ChatCircleDots,
  },
  {
    number: "02",
    title: "Review matched talent",
    description:
      "Browse ranked profiles from the Sortie network — people who already passed. Skip re-screening unless you want a culture interview.",
    icon: UsersThree,
  },
  {
    number: "03",
    title: "Start with a trial",
    description:
      "Engage the right person on a no-risk trial. Scale up, scale down, or rematch with no strings attached.",
    icon: Handshake,
  },
] as const;

export function HiringStepsSection() {
  return (
    <section id="how-hiring-works" className="border-b border-line bg-panel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Hiring made easy
          </h2>
          <p className="mt-4 text-lg text-muted">
            From role brief to working talent — without the traditional
            recruiting grind.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {hireSteps.map((step) => (
            <FeatureCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>

        <div className="mt-12">
          <a
            className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
          >
            Hire top talent
          </a>
        </div>
      </div>
    </section>
  );
}
