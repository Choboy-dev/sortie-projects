"use server";

import { redirect } from "next/navigation";
import {
  completeCompanyOnboarding,
  requireWorkspaceSession,
  type CompanyOnboardingInput,
} from "@/lib/workspace";
import { isSkillCategoryId } from "@/lib/skills";

export async function submitCompanyOnboarding(
  input: CompanyOnboardingInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await requireWorkspaceSession("company");

  const companyName = input.companyName?.trim() ?? "";
  const hiringTitle = input.hiringTitle?.trim() ?? "";
  if (companyName.length < 2) {
    return { ok: false, error: "Enter your company name." };
  }
  if (hiringTitle.length < 2) {
    return { ok: false, error: "Enter the role title you want to fill." };
  }
  if (!isSkillCategoryId(input.hiringCategoryId)) {
    return { ok: false, error: "Pick a valid category." };
  }
  if (!input.timezone?.trim()) {
    return { ok: false, error: "Pick a timezone." };
  }

  let website = input.website?.trim() || null;
  if (website && !/^https?:\/\//i.test(website)) {
    website = `https://${website}`;
  }

  await completeCompanyOnboarding(session.user.id, {
    companyName,
    website,
    hiringTitle,
    hiringCategoryId: input.hiringCategoryId,
    timezone: input.timezone.trim(),
  });

  redirect("/hire");
}
