import { talentCategories } from "@/data/talent-menu";
import { showcaseTalent } from "@/data/showcase-talent";
import {
  buildCapabilities,
  buildFaqs,
  buildHeroCopy,
  buildHireSteps,
  buildMeta,
} from "@/lib/skills/copy";
import { singularizeSkillLabel, slugifySkill } from "@/lib/skills/slug";
import type {
  CategoryPageModel,
  ShowcaseTalent,
  SkillCategoryId,
  SkillPageModel,
  SkillRef,
} from "@/lib/skills/types";

const TALENT_PER_PAGE = 8;

function isCategoryId(value: string): value is SkillCategoryId {
  return talentCategories.some((c) => c.id === value);
}

export function skillHref(categoryId: string, skillLabel: string): string {
  return `/${categoryId}/${slugifySkill(skillLabel)}`;
}

export function toSkillRef(
  categoryId: SkillCategoryId,
  categoryLabel: string,
  label: string,
): SkillRef {
  const slug = slugifySkill(label);
  return {
    categoryId,
    categoryLabel,
    label,
    slug,
    href: `/${categoryId}/${slug}`,
    singular: singularizeSkillLabel(label),
  };
}

export function listSkills(): SkillRef[] {
  return talentCategories.flatMap((category) =>
    category.skills.map((label) =>
      toSkillRef(category.id, category.label, label),
    ),
  );
}

export function listSkillsForCategory(categoryId: string): SkillRef[] {
  if (!isCategoryId(categoryId)) return [];
  const category = talentCategories.find((c) => c.id === categoryId);
  if (!category) return [];
  return category.skills.map((label) =>
    toSkillRef(category.id, category.label, label),
  );
}

export function findSkill(
  categoryId: string,
  skillSlug: string,
): SkillRef | null {
  if (!isCategoryId(categoryId)) return null;
  return (
    listSkillsForCategory(categoryId).find((s) => s.slug === skillSlug) ?? null
  );
}

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Pick showcase talent for a skill: prefer tag overlap, then fill from category. */
export function talentForSkill(skill: SkillRef): ShowcaseTalent[] {
  const pool = showcaseTalent.filter((p) => p.categoryId === skill.categoryId);
  const tagged = pool.filter((p) => p.skillSlugs.includes(skill.slug));
  const rest = pool.filter((p) => !p.skillSlugs.includes(skill.slug));
  const seed = hashSeed(skill.href);
  const rotate = <T,>(items: T[]) => {
    if (items.length === 0) return items;
    const offset = seed % items.length;
    return [...items.slice(offset), ...items.slice(0, offset)];
  };
  return [...rotate(tagged), ...rotate(rest)].slice(0, TALENT_PER_PAGE);
}

export function getSkillPage(
  categoryId: string,
  skillSlug: string,
): SkillPageModel | null {
  const skill = findSkill(categoryId, skillSlug);
  if (!skill) return null;

  const categorySkills = listSkillsForCategory(skill.categoryId);
  const relatedSkills = categorySkills
    .filter((s) => s.slug !== skill.slug)
    .slice(0, 8);
  const siblingSkills = categorySkills
    .filter((s) => s.slug !== skill.slug)
    .slice(0, 6);

  return {
    skill,
    relatedSkills,
    siblingSkills,
    talent: talentForSkill(skill),
    hero: buildHeroCopy(skill),
    capabilities: buildCapabilities(skill),
    faqs: buildFaqs(skill),
    hireSteps: buildHireSteps(skill),
    meta: buildMeta(skill),
  };
}

export function getCategoryPage(categoryId: string): CategoryPageModel | null {
  if (!isCategoryId(categoryId)) return null;
  const category = talentCategories.find((c) => c.id === categoryId);
  if (!category) return null;
  const skills = listSkillsForCategory(categoryId);
  return {
    categoryId: category.id,
    categoryLabel: category.label,
    href: category.href,
    skills,
    meta: {
      title: `Hire ${category.label} — Sortie Projects`,
      description: `Browse ${category.label.toLowerCase()} skills and hire people from the Sortie network.`,
    },
  };
}

export function generateSkillParams(): { skill: string }[] {
  // Used by category-specific routes; pass categoryId when calling.
  return [];
}

export function generateSkillParamsForCategory(
  categoryId: SkillCategoryId,
): { skill: string }[] {
  return listSkillsForCategory(categoryId).map((s) => ({ skill: s.slug }));
}

export const SKILL_CATEGORY_IDS = talentCategories.map(
  (c) => c.id,
) as SkillCategoryId[];
