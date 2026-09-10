"use client";

import {
  ChatTeardropText,
  Code,
  Exam,
  Handshake,
  Kanban,
  Megaphone,
  Palette,
  ShieldCheck,
  Strategy,
  type Icon,
} from "@phosphor-icons/react";
import { FeatureCard } from "@/components/marketing/feature-card";
import type { SkillCategoryId } from "@/lib/skills/types";

type VettingStage = {
  number: string;
  title: string;
  description: string;
  icon: Icon;
};

function stagesForCategory(categoryId?: SkillCategoryId): VettingStage[] {
  const sharedStart: VettingStage[] = [
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
  ];

  const liveByCategory: Record<SkillCategoryId, VettingStage> = {
    developers: {
      number: "03",
      title: "Live interview and coding",
      description:
        "They sit a live interview with coding. They talk through problems and write code in the session.",
      icon: Code,
    },
    designers: {
      number: "03",
      title: "Live interview and design review",
      description:
        "They sit a live interview and walk through design work. They explain choices and solve a design problem in the session.",
      icon: Palette,
    },
    marketing: {
      number: "03",
      title: "Live interview and campaign review",
      description:
        "They sit a live interview and review a marketing case. They explain the plan and how they would improve results.",
      icon: Megaphone,
    },
    consultants: {
      number: "03",
      title: "Live interview and case review",
      description:
        "They sit a live interview and work a business case. They explain the problem and how they would solve it.",
      icon: Strategy,
    },
    "project-managers": {
      number: "03",
      title: "Live interview and delivery review",
      description:
        "They sit a live interview and walk through a project plan. They show how they keep work on track.",
      icon: Kanban,
    },
    "product-managers": {
      number: "03",
      title: "Live interview and product review",
      description:
        "They sit a live interview and work a product problem. They explain what to build and why.",
      icon: Strategy,
    },
    sales: {
      number: "03",
      title: "Live interview and sales role play",
      description:
        "They sit a live interview and do a sales role play. They show how they open, qualify, and close.",
      icon: Handshake,
    },
  };

  const liveDefault: VettingStage = {
    number: "03",
    title: "Live interview and practical task",
    description:
      "They sit a live interview with a real task for their field. They talk through the problem and show how they work.",
    icon: Handshake,
  };

  const finish: VettingStage = {
    number: "04",
    title: "Honesty and a real project",
    description:
      "We watch for cheating, then ask them to finish a real take-home project before they can join.",
    icon: ShieldCheck,
  };

  return [
    ...sharedStart,
    categoryId ? liveByCategory[categoryId] : liveDefault,
    finish,
  ];
}

export function VettingSection({
  categoryId,
}: {
  categoryId?: SkillCategoryId;
}) {
  const stages = stagesForCategory(categoryId);

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
          {stages.map((stage) => (
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
            className="inline-flex rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            href="/hire/auth"
          >
            Hire talent
          </a>
        </div>
      </div>
    </section>
  );
}
