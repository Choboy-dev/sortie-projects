export type SkillCategoryId =
  | "developers"
  | "designers"
  | "marketing"
  | "consultants"
  | "project-managers"
  | "product-managers"
  | "sales";

export type SkillRef = {
  categoryId: SkillCategoryId;
  categoryLabel: string;
  label: string;
  slug: string;
  href: string;
  singular: string;
};

export type ShowcaseTalent = {
  id: string;
  name: string;
  title: string;
  expertise: string;
  previously: string;
  photo: string;
  bio: string;
  timezone: string;
  region: string;
  location: string;
  categoryId: SkillCategoryId;
  /** Skill slugs this person can appear on */
  skillSlugs: string[];
  tags: string[];
};

export type SkillCapability = {
  title: string;
  description: string;
};

export type SkillFaq = {
  question: string;
  answer: string;
};

export type SkillPageModel = {
  skill: SkillRef;
  relatedSkills: SkillRef[];
  siblingSkills: SkillRef[];
  talent: ShowcaseTalent[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  capabilities: SkillCapability[];
  faqs: SkillFaq[];
  hireSteps: { number: string; title: string; description: string }[];
  meta: {
    title: string;
    description: string;
  };
};

export type CategoryPageModel = {
  categoryId: SkillCategoryId;
  categoryLabel: string;
  href: string;
  skills: SkillRef[];
  meta: {
    title: string;
    description: string;
  };
};
