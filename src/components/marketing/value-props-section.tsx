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
    title: "Hire in days, not months",
    description:
      "Submit a role brief and receive matched, already-vetted profiles. Average time to shortlist is measured in days — not recruiting cycles.",
    icon: MagnifyingGlass,
  },
  {
    title: "Only the top talent",
    description:
      "Every network member clears Sortie’s full gauntlet: skills assessments, AI interviews, live coding, integrity checks, and a take-home project.",
    icon: ShieldCheck,
  },
  {
    title: "AI matching that actually ranks",
    description:
      "Our matching engine scores skills, seniority, timezone overlap, rate, availability, and integrity — then explains why each candidate fits.",
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
