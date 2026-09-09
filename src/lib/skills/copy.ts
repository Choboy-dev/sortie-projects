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

export function buildHeroCopy(skill: SkillRef) {
  const plural = skill.label;
  const singular = skill.singular;
  return {
    eyebrow: `Hire ${plural}`,
    title: `Hire ${plural}`,
    subtitle: `Hire ${plural.toLowerCase()} from the Sortie network — AI-vetted specialists matched to your brief, timezone, and stack. Top companies across Africa and beyond engage ${singular.toLowerCase()} talent for outcomes, not résumés.`,
    ctaLabel: `Hire a top ${singular.toLowerCase()}`,
    trustLine:
      "Clients rate Sortie talent highly after trial engagements. Pay only if you are satisfied.",
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
    description: `Hire elite ${skill.label.toLowerCase()} from the Sortie network. AI-vetted talent, trial-first hiring, matched to your brief and timezone.`,
  };
}
