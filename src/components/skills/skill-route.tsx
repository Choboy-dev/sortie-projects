import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLandingPage } from "@/components/skills/category-landing-page";
import { SkillLandingPage } from "@/components/skills/skill-landing-page";
import {
  generateSkillParamsForCategory,
  getCategoryPage,
  getSkillPage,
} from "@/lib/skills";
import type { SkillCategoryId } from "@/lib/skills/types";

export function skillStaticParams(categoryId: SkillCategoryId) {
  return generateSkillParamsForCategory(categoryId);
}

export function skillMetadata(
  categoryId: SkillCategoryId,
  skillSlug: string,
): Metadata {
  const model = getSkillPage(categoryId, skillSlug);
  if (!model) return { title: "Skill not found — Sortie Projects" };
  return {
    title: model.meta.title,
    description: model.meta.description,
  };
}

export function SkillRoutePage({
  categoryId,
  skillSlug,
}: {
  categoryId: SkillCategoryId;
  skillSlug: string;
}) {
  const model = getSkillPage(categoryId, skillSlug);
  if (!model) notFound();
  return <SkillLandingPage model={model} />;
}

export function categoryMetadata(
  categoryId: SkillCategoryId,
): Metadata {
  const model = getCategoryPage(categoryId);
  if (!model) return { title: "Category not found — Sortie Projects" };
  return {
    title: model.meta.title,
    description: model.meta.description,
  };
}

export function CategoryRoutePage({
  categoryId,
}: {
  categoryId: SkillCategoryId;
}) {
  const model = getCategoryPage(categoryId);
  if (!model) notFound();
  return <CategoryLandingPage model={model} />;
}
