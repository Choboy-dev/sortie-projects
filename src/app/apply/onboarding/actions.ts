"use server";

import { redirect } from "next/navigation";
import {
  completeTalentOnboarding,
  requireWorkspaceSession,
  type TalentOnboardingInput,
} from "@/lib/workspace";
import { isSkillCategoryId } from "@/lib/skills";

export async function submitTalentOnboarding(
  input: TalentOnboardingInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await requireWorkspaceSession("talent");

  const displayName = input.displayName?.trim() ?? "";
  if (displayName.length < 2) {
    return { ok: false, error: "Enter a display name." };
  }
  if (!isSkillCategoryId(input.categoryId)) {
    return { ok: false, error: "Pick a valid category." };
  }
  if (!input.timezone?.trim()) {
    return { ok: false, error: "Pick a timezone." };
  }
  if (
    !Number.isFinite(input.hoursPerWeek) ||
    input.hoursPerWeek < 5 ||
    input.hoursPerWeek > 60
  ) {
    return { ok: false, error: "Hours per week should be between 5 and 60." };
  }

  const skills = (input.skills ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  await completeTalentOnboarding(session.user.id, {
    displayName,
    categoryId: input.categoryId,
    skills,
    timezone: input.timezone.trim(),
    hoursPerWeek: Math.round(input.hoursPerWeek),
    availableFrom: input.availableFrom?.trim() || null,
    rateAmount:
      input.rateAmount != null && Number.isFinite(input.rateAmount)
        ? Math.round(input.rateAmount)
        : null,
    rateCurrency: "USD",
  });

  redirect("/apply");
}
