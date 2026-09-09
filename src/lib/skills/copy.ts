import type { SkillCapability, SkillFaq, SkillRef } from "@/lib/skills/types";

const categoryDomain: Record<string, string> = {
  developers: "Engineering",
  designers: "Design",
  marketing: "Marketing",
  consultants: "Consulting",
  "project-managers": "Project Management",
  "product-managers": "Product",
  sales: "Sales",
};

export function expertiseForCategory(categoryId: string): string {
  return `Verified Expert in ${categoryDomain[categoryId] ?? "their field"}`;
}

function heroSubtitle(skill: SkillRef): string {
  const plural = skill.label.toLowerCase();
  const overrides: Record<string, string> = {
    "full-stack-engineers":
      "Hire full-stack developers, architects, engineers, and programmers when you need them. Companies use Sortie full-stack engineers for complete product work, front-end and back-end together, and tools like JavaScript, Node.js, React, and Python.",
    "front-end-engineers":
      "Hire front-end developers, UI engineers, and web programmers when you need them. Companies use Sortie front-end engineers for clear interfaces, React and Vue work, speed, and accessibility.",
    "software-engineers":
      "Hire software developers, architects, engineers, and programmers when you need them. Companies use Sortie software engineers for solid systems, clean code, and steady delivery.",
    "react-js-developers":
      "Hire React.js developers and engineers when you need them. Companies use Sortie React.js developers for web apps, Next.js, state management, and fast interfaces.",
    "node-js-developers":
      "Hire Node.js developers and engineers when you need them. Companies use Sortie Node.js developers for APIs, services, and cloud backends.",
    "python-developers":
      "Hire Python developers and engineers when you need them. Companies use Sortie Python developers for web apps, data work, automation, and model-backed products.",
    "ux-designers":
      "Hire UX designers, researchers, and product designers when you need them. Companies use Sortie UX designers for research, flows, prototypes, and easier products to use.",
    "ui-designers":
      "Hire UI designers and visual designers when you need them. Companies use Sortie UI designers for clear screens, design systems, and layouts that work on every device.",
  };

  if (overrides[skill.slug]) return overrides[skill.slug];

  switch (skill.categoryId) {
    case "developers":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to build and ship software with the right tools for the job.`;
    case "designers":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to make products clear, useful, and good to look at.`;
    case "marketing":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to find customers, grow pipeline, and keep people coming back.`;
    case "consultants":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} for clear plans, better operations, and sound money decisions.`;
    case "project-managers":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to keep work on time, keep people aligned, and finish projects.`;
    case "product-managers":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to decide what to build, set the plan, and ship results.`;
    case "sales":
      return `Hire ${plural} when you need them. Companies use Sortie ${plural} to open deals, close revenue, and grow accounts.`;
    default:
      return `Hire ${plural} when you need them. Companies use Sortie to find people who already passed our checks.`;
  }
}

export function buildHeroCopy(skill: SkillRef) {
  const singular = skill.singular.toLowerCase();
  return {
    eyebrow: `Hire ${skill.label}`,
    title: `Hire ${skill.label}`,
    subtitle: heroSubtitle(skill),
    ctaLabel: `Hire a ${singular}`,
  };
}

export function buildCapabilities(skill: SkillRef): SkillCapability[] {
  const s = skill.singular.toLowerCase();
  const p = skill.label.toLowerCase();
  return [
    {
      title: `Full ${s} work`,
      description: `Sortie ${p} help you clarify the need, do the work, and leave clear notes when they hand it off.`,
    },
    {
      title: "Real skill, not buzzwords",
      description: `Each ${s} passed role tests. You get someone who has done this kind of work before.`,
    },
    {
      title: "Easy to work with",
      description: `We check communication first. Your ${s} should be ready for meetings and updates from day one.`,
    },
    {
      title: "Matched to your hours",
      description: `Tell us when your team works. We match ${p} who can overlap with you.`,
    },
    {
      title: "Try before you commit",
      description: `Start with a short trial. Keep going only if it feels right, or ask us for someone else.`,
    },
    {
      title: "One person or a small team",
      description: `Need one ${s}, or a few people together? We can help with either.`,
    },
  ];
}

export function buildFaqs(skill: SkillRef): SkillFaq[] {
  const singular = skill.singular.toLowerCase();
  const plural = skill.label.toLowerCase();
  return [
    {
      question: `How much does it cost to hire a ${singular}?`,
      answer: `It depends on seniority, hours, and timezone. After a short call we share clear options. You do not have to hire anyone.`,
    },
    {
      question: `How fast can I hire ${plural}?`,
      answer: `Most teams see matches within a few days. Harder roles can take longer. We will tell you what to expect up front.`,
    },
    {
      question: `How are Sortie ${plural} different?`,
      answer: `People go through language checks, skill tests, live interviews, and a real project. Only a small share join the network.`,
    },
    {
      question: `Can I hire a ${singular} by the hour?`,
      answer: `Yes. You can hire hourly, part-time, or full-time, and change later if the work changes.`,
    },
    {
      question: `What is the trial?`,
      answer: `Every hire starts with a trial. If you are not happy, you do not pay for that trial, and we can find someone else.`,
    },
    {
      question: `Do you work with teams outside Africa?`,
      answer: `Yes. Sortie is built around African talent who work with teams around the world. We match on timezone overlap.`,
    },
  ];
}

export function buildHireSteps(skill: SkillRef) {
  const singular = skill.singular.toLowerCase();
  const plural = skill.label.toLowerCase();
  return [
    {
      number: "01",
      title: "Talk to One of Our Client Advisors",
      description: `Tell us what you need from a ${singular}: the role, skills, seniority, hours, and goals. An advisor helps you write a clear brief.`,
    },
    {
      number: "02",
      title: "Review matched talent",
      description: `We show you ${plural} who already passed Sortie checks. You can meet them if you want a culture fit chat.`,
    },
    {
      number: "03",
      title: "The right fit, guaranteed",
      description: `Work with your new ${singular} match for a trial period (pay only if satisfied), ensuring they're the right fit before starting the engagement.`,
    },
  ];
}

export function buildMeta(skill: SkillRef) {
  return {
    title: `Hire ${skill.label} | Sortie Projects`,
    description: `Hire ${skill.label.toLowerCase()} from the Sortie network. Clear matching, vetted people, and a trial before you commit.`,
  };
}

export function buildAdvantageCopy(skill: SkillRef): string {
  const singular = skill.singular.toLowerCase();
  return `Within days, we'll introduce you to the right ${singular} expert for your project. Average time to match is under 24 hours.`;
}
