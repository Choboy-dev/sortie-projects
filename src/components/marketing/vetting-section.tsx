"use client";

import {
  ChatTeardropText,
  Code,
  Exam,
  ShieldCheck,
} from "@phosphor-icons/react";
import { FeatureCard } from "@/components/marketing/feature-card";

const vettingStages = [
  {
    number: "01",
    title: "Language and professionalism",
    description:
      "We check that they speak clearly, work well with others, and can talk to clients.",
    icon: ChatTeardropText,
  },
  {
    number: "02",
    title: "Skills tests",
    description:
      "They take tests for the exact job. We score the work and see how they handle real tasks.",
    icon: Exam,
  },
  {
    number: "03",
    title: "Live interview and coding",
    description:
      "They sit a live interview with coding. They talk through problems and write code in the session.",
    icon: Code,
  },
  {
    number: "04",
    title: "Honesty and a real project",
    description:
      "We watch for cheating, then ask them to finish a real take-home project before they can join.",
    icon: ShieldCheck,
  },
] as const;

export function VettingSection() {
  return (
    <section id="vetting" className="border-b border-line bg-ink text-chalk">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why less than 1% make the network
          </h2>
          <p className="mt-4 text-lg text-chalk/70">
            Every applicant goes through several steps. We check their skills,
            how they communicate, whether they are honest, and whether they can
            finish real work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {vettingStages.map((stage) => (
            <FeatureCard
              key={stage.number}
              number={stage.number}
              title={stage.title}
              description={stage.description}
              icon={stage.icon}
            />
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <a
            className="inline-flex rounded-md bg-signal-dark px-6 py-3.5 text-sm font-semibold text-ink hover:bg-mist active:scale-[0.98]"
            href="/hire/auth"
          >
            Hire talent
          </a>
        </div>
      </div>
    </section>
  );
}
