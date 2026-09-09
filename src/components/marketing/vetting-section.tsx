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
    title: "Language & professionalism",
    description:
      "Communication screen focused on clarity, collaboration, and client-ready presence.",
    icon: ChatTeardropText,
  },
  {
    number: "02",
    title: "Skills assessments",
    description:
      "Role-specific batteries with auto-scoring, percentiles, and job simulations.",
    icon: Exam,
  },
  {
    number: "03",
    title: "AI interview + live coding",
    description:
      "Conversational AI interviewer with a live coding engine during the session — talk, hear, write, and reason in real time.",
    icon: Code,
  },
  {
    number: "04",
    title: "Integrity & project delivery",
    description:
      "Proctoring signals, anomaly scoring, and a real take-home project before network admission.",
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
            Every applicant passes a multi-stage process designed to measure
            subject-matter expertise, communication, integrity, and delivery
            under real conditions.
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
            href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
          >
            Hire top talent
          </a>
        </div>
      </div>
    </section>
  );
}
