"use client";

import {
  Brain,
  ChartLineUp,
  Code,
  Palette,
  RocketLaunch,
  UsersThree,
} from "@phosphor-icons/react";
import {
  ServiceCarousel,
  type Service,
} from "@/components/ui/services-card";

const talentServices: Service[] = [
  {
    number: "001",
    title: "Developers",
    description:
      "Software engineers, architects, and specialists across hundreds of stacks — from backend systems to mobile and AI.",
    icon: Code,
    gradient: "from-canvas via-[#e7f3ee] to-[#d8ebe3]",
  },
  {
    number: "002",
    title: "Designers",
    description:
      "Product, UI/UX, and brand designers who ship production interfaces, not just decks.",
    icon: Palette,
    gradient: "from-[#eef4f1] via-canvas to-[#dce9e2]",
  },
  {
    number: "003",
    title: "Product Managers",
    description:
      "Operators who turn ambiguous problems into shipped roadmaps and measurable outcomes.",
    icon: RocketLaunch,
    gradient: "from-[#e6f0eb] to-[#f3f7f5]",
  },
  {
    number: "004",
    title: "Data & AI",
    description:
      "Data scientists, ML engineers, and applied researchers ready for production workloads.",
    icon: Brain,
    gradient: "from-[#e0efe8] via-[#ebf5f0] to-canvas",
  },
  {
    number: "005",
    title: "Marketing Experts",
    description:
      "Growth, demand gen, and brand specialists who scale acquisition with accountability.",
    icon: ChartLineUp,
    gradient: "from-canvas to-[#d9ebe3]",
  },
  {
    number: "006",
    title: "Project Managers",
    description:
      "Technical PMs and scrum leaders who keep complex delivery on track.",
    icon: UsersThree,
    gradient: "from-[#e8f2ed] to-[#f4f8f6]",
  },
];

export function TalentCategoriesSection() {
  return (
    <section id="talent-categories" className="border-b border-line bg-panel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Leverage world-class talent on demand
          </h2>
          <p className="mt-4 text-lg text-muted">
            We have the largest distributed network of top business, design, and
            technology talent in Africa, ready to tackle your most important
            initiatives.
          </p>
        </div>

        <div className="mt-12">
          <ServiceCarousel services={talentServices} />
        </div>

        <div className="mt-10">
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
