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

/** Toptal-style short hero: roles on demand + why companies choose this skill from Sortie. */
function heroSubtitle(skill: SkillRef): string {
  const plural = skill.label;
  const pluralLower = plural.toLowerCase();
  const overrides: Record<string, string> = {
    "full-stack-engineers":
      "Hire Full-stack developers, designers, architects, engineers, experts, and programmers on demand. Top companies and startups choose full-stack engineers from Sortie for end-to-end product development, seamless front-end and back-end integration, expertise in technologies like JavaScript, Node.js, React, Python, and more.",
    "front-end-engineers":
      "Hire Front-end developers, UI engineers, JavaScript experts, and web programmers on demand. Top companies and startups choose front-end engineers from Sortie for responsive interfaces, modern frameworks like React and Vue, performance, accessibility, and more.",
    "software-engineers":
      "Hire Software developers, engineers, architects, experts, and programmers on demand. Top companies and startups choose software engineers from Sortie for scalable systems, clean architecture, reliable delivery, and more.",
    "react-js-developers":
      "Hire React.js developers, engineers, experts, and programmers on demand. Top companies and startups choose React.js developers from Sortie for component-driven UIs, Next.js apps, state management, performance, and more.",
    "node-js-developers":
      "Hire Node.js developers, engineers, experts, and programmers on demand. Top companies and startups choose Node.js developers from Sortie for APIs, real-time services, microservices, cloud-native backends, and more.",
    "python-developers":
      "Hire Python developers, engineers, experts, and programmers on demand. Top companies and startups choose Python developers from Sortie for web apps, data pipelines, automation, AI-assisted products, and more.",
    "ux-designers":
      "Hire UX designers, researchers, interaction experts, and product designers on demand. Top companies and startups choose UX designers from Sortie for user research, journey design, prototyping, usability, and more.",
    "ui-designers":
      "Hire UI designers, visual designers, interface experts, and product designers on demand. Top companies and startups choose UI designers from Sortie for crisp interfaces, design systems, responsive layouts, and more.",
  };

  if (overrides[skill.slug]) return overrides[skill.slug];

  switch (skill.categoryId) {
    case "developers":
      return `Hire ${plural}, architects, experts, and programmers on demand. Top companies and startups choose ${pluralLower} from Sortie for production delivery, modern stacks, scalable architecture, and more.`;
    case "designers":
      return `Hire ${plural}, visual experts, and product designers on demand. Top companies and startups choose ${pluralLower} from Sortie for craft, usability, design systems, and more.`;
    case "marketing":
      return `Hire ${plural}, strategists, and growth specialists on demand. Top companies and startups choose ${pluralLower} from Sortie for pipeline, brand, acquisition, retention, and more.`;
    case "consultants":
      return `Hire ${plural}, advisors, and specialists on demand. Top companies and startups choose ${pluralLower} from Sortie for strategy, operations, finance clarity, and more.`;
    case "project-managers":
      return `Hire ${plural}, delivery leads, and coordinators on demand. Top companies and startups choose ${pluralLower} from Sortie for on-time delivery, stakeholder clarity, agile execution, and more.`;
    case "product-managers":
      return `Hire ${plural}, owners, and product specialists on demand. Top companies and startups choose ${pluralLower} from Sortie for discovery, roadmaps, outcomes, and more.`;
    case "sales":
      return `Hire ${plural}, closers, and revenue specialists on demand. Top companies and startups choose ${pluralLower} from Sortie for pipeline, discovery, closing, and more.`;
    default:
      return `Hire ${plural} on demand. Top companies and startups choose ${pluralLower} from Sortie for vetted expertise, fast matching, and more.`;
  }
}

export function buildHeroCopy(skill: SkillRef) {
  const singular = skill.singular;
  return {
    eyebrow: `Hire ${skill.label}`,
    title: `Hire ${skill.label}`,
    subtitle: heroSubtitle(skill),
    ctaLabel: `Hire a top ${singular.toLowerCase()}`,
  };
}

export function buildCapabilities(skill: SkillRef): SkillCapability[] {
  const s = skill.singular.toLowerCase();
  const p = skill.label.toLowerCase();
  return [
    {
      title: `End-to-end ${s} delivery`,
      description: `Sortie ${p} own discovery through shipping — clarifying requirements, building the right solution, and handing off clean documentation.`,
    },
    {
      title: "Stack depth, not surface familiarity",
      description: `Every ${s} on the network passed role-specific assessments. You get practitioners who have shipped similar work, not generalists guessing.`,
    },
    {
      title: "Communication ready for clients",
      description: `Language, professionalism, and collaboration screens sit ahead of technical rounds so your ${s} can join standups and stakeholder reviews from day one.`,
    },
    {
      title: "Timezone-aware matching",
      description: `Brief preferred overlap hours. We match ${p} who can collaborate with your team without burning the midnight oil on either side.`,
    },
    {
      title: "Trial before commitment",
      description: `Start with a no-risk trial. Continue only if the fit is right — or rematch without friction.`,
    },
    {
      title: "Scale individuals or pods",
      description: `Need one ${s} or a cross-functional pod? Sortie can staff the role or assemble a small team around the same brief.`,
    },
  ];
}

export function buildFaqs(skill: SkillRef): SkillFaq[] {
  const singular = skill.singular.toLowerCase();
  const plural = skill.label.toLowerCase();
  return [
    {
      question: `How much does it cost to hire a ${singular}?`,
      answer: `Rates depend on seniority, engagement model (hourly, part-time, or full-time), and timezone. After a short briefing call we share calibrated options from the Sortie network — no obligation to hire.`,
    },
    {
      question: `How quickly can I hire ${plural}?`,
      answer: `Most companies review matched profiles within days of sharing a clear brief. Complex or highly specialized roles may take longer; we set expectations up front.`,
    },
    {
      question: `How are Sortie ${plural} different?`,
      answer: `Applicants pass language and professionalism screens, skills assessments, AI + live evaluation, and a real project delivery gate. Only a small fraction of applicants join the network.`,
    },
    {
      question: `Can I hire a ${singular} hourly or for a short project?`,
      answer: `Yes. Engagements flex across hourly, part-time, and full-time. Scale up or down as the work evolves.`,
    },
    {
      question: `What is the no-risk trial?`,
      answer: `Every engagement starts with a trial window so you can confirm fit. If you are not satisfied, you are not billed for that trial — and we can rematch.`,
    },
    {
      question: `Do you work with teams outside Africa?`,
      answer: `Yes. Sortie is built around African talent competing globally. Companies hire across timezones with clear overlap expectations.`,
    },
  ];
}

export function buildHireSteps(skill: SkillRef) {
  const singular = skill.singular.toLowerCase();
  return [
    {
      number: "01",
      title: "Talk through the brief",
      description: `Share the role, stack, seniority, timezone, and outcomes you need from a ${singular}. A specialist helps sharpen the ask.`,
    },
    {
      number: "02",
      title: "Review matched talent",
      description: `See ranked ${skill.label.toLowerCase()} from the network — people who already passed Sortie vetting. Skip re-screening unless you want a culture interview.`,
    },
    {
      number: "03",
      title: "Start with a trial",
      description: `Engage the right person on a no-risk trial. Scale, rematch, or continue — you stay in control.`,
    },
  ];
}

export function buildMeta(skill: SkillRef) {
  return {
    title: `Hire ${skill.label} — Sortie Projects`,
    description: `Hire ${skill.label.toLowerCase()} on demand from the Sortie network. Top companies and startups choose Sortie for vetted talent, fast matching, and trial-first hiring.`,
  };
}
