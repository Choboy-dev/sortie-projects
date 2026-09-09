"use client";

import {
  Brain,
  Handshake,
  MagnifyingGlass,
  ShieldCheck,
} from "@phosphor-icons/react";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

const features: Step[] = [
  {
    title: "Hire Quickly",
    description:
      "Hire in under 48 hours. Scale up or down, no strings attached. We offer flexible engagements from hourly to full-time.",
    icon: MagnifyingGlass,
  },
  {
    title: "Only the top 1% talent",
    description:
      "Every network member is rigorously tested and vetted: skills assessments, 1-on-1 interviews, live coding, integrity checks, and a take-home project.",
    icon: ShieldCheck,
  },
  {
    title: "Talent matching that actually works",
    description:
      "Our matching engine scores skills, seniority, timezone overlap, rate, availability, and integrity, and then explains why each candidate fits.",
    icon: Brain,
  },
  {
    title: "No-risk trial",
    description:
      "Start with a risk-free trial. Pay only if satisfied. If the fit isn’t right, we rematch you with another network member.",
    icon: Handshake,
  },
];

export function ValuePropsSection() {
  return (
    <section className="border-b border-line" aria-labelledby="value-props-heading">
      <h2 id="value-props-heading" className="sr-only">
        Build exceptional teams, on demand
      </h2>
      <HowItWorks
        heading="Build exceptional teams, on demand"
        features={features}
      />
    </section>
  );
}
