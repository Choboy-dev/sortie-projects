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
    gradient: "from-canvas via-[#1a1210] to-[#2a1814]",
  },
  {
    number: "002",
    title: "Designers",
    description:
      "Product, UI/UX, and brand designers who ship production interfaces, not just decks.",
    icon: Palette,
    gradient: "from-[#161210] via-canvas to-[#241612]",
  },
  {
    number: "003",
    title: "Product Managers",
    description:
      "Operators who turn ambiguous problems into shipped roadmaps and measurable outcomes.",
    icon: RocketLaunch,
    gradient: "from-[#1c1411] to-[#120e0c]",
  },
  {
    number: "004",
    title: "Data & AI",
    description:
      "Data scientists, ML engineers, and applied researchers ready for production workloads.",
    icon: Brain,
    gradient: "from-[#201510] via-[#2a1814] to-canvas",
  },
  {
    number: "005",
    title: "Marketing Experts",
    description:
      "Growth, demand gen, and brand specialists who scale acquisition with accountability.",
    icon: ChartLineUp,
    gradient: "from-canvas to-[#241612]",
  },
  {
    number: "006",
    title: "Project Managers",
    description:
      "Technical PMs and scrum leaders who keep complex delivery on track.",
    icon: UsersThree,
    gradient: "from-[#1a1210] to-[#100e0c]",
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
