import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { talentProfile } from "@/lib/db/schema/workspace";
import { talentCategories } from "@/data/talent-menu";
import type {
  TalentOnboardingInput,
  TalentWorkspace,
} from "@/lib/workspace/types";

function categoryLabel(categoryId: string) {
  return (
    talentCategories.find((c) => c.id === categoryId)?.label ?? categoryId
  );
}

function parseSkills(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function buildTalentDashboard(
  profile: typeof talentProfile.$inferSelect,
): NonNullable<TalentWorkspace["dashboard"]> {
  const skills = parseSkills(profile.skills);
  const skillBit =
    skills.length > 0 ? skills.slice(0, 3).join(", ") : "skills TBD";
  const rateBit =
    profile.rateAmount != null
      ? ` · $${profile.rateAmount}/${profile.rateCurrency === "USD" ? "hr" : profile.rateCurrency}`
      : "";

  return {
    title: profile.displayName,
    admissionStatus: profile.admissionStatus,
    profileSummary: `${categoryLabel(profile.categoryId)} · ${skillBit} · ${profile.hoursPerWeek} hrs/week${rateBit}`,
    nextAction: "Continue admission when assessments open.",
    emptyIntros: "No intros yet. They show up here after matching starts.",
    emptyEngagements: "No active engagements yet.",
  };
}

export async function getTalentWorkspace(
  userId: string,
  email: string,
): Promise<TalentWorkspace> {
  const rows = await db
    .select()
    .from(talentProfile)
    .where(eq(talentProfile.userId, userId))
    .limit(1);

  const profile = rows[0] ?? null;
  const onboardingComplete = Boolean(profile?.onboardingCompletedAt);

  if (!profile || !onboardingComplete) {
    return {
      kind: "talent",
      email,
      onboardingComplete: false,
      profile: profile
        ? {
            displayName: profile.displayName,
            categoryId: profile.categoryId,
            categoryLabel: categoryLabel(profile.categoryId),
            skills: parseSkills(profile.skills),
            timezone: profile.timezone,
            hoursPerWeek: profile.hoursPerWeek,
            availableFrom: profile.availableFrom,
            rateAmount: profile.rateAmount,
            rateCurrency: profile.rateCurrency,
            admissionStatus: profile.admissionStatus,
          }
        : null,
      dashboard: null,
    };
  }

  return {
    kind: "talent",
    email,
    onboardingComplete: true,
    profile: {
      displayName: profile.displayName,
      categoryId: profile.categoryId,
      categoryLabel: categoryLabel(profile.categoryId),
      skills: parseSkills(profile.skills),
      timezone: profile.timezone,
      hoursPerWeek: profile.hoursPerWeek,
      availableFrom: profile.availableFrom,
      rateAmount: profile.rateAmount,
      rateCurrency: profile.rateCurrency,
      admissionStatus: profile.admissionStatus,
    },
    dashboard: buildTalentDashboard(profile),
  };
}

export async function completeTalentOnboarding(
  userId: string,
  input: TalentOnboardingInput,
): Promise<void> {
  const now = new Date();
  const values = {
    userId,
    displayName: input.displayName.trim(),
    categoryId: input.categoryId,
    skills: JSON.stringify(input.skills),
    timezone: input.timezone.trim(),
    hoursPerWeek: input.hoursPerWeek,
    availableFrom: input.availableFrom?.trim() || null,
    rateAmount: input.rateAmount,
    rateCurrency: input.rateCurrency || "USD",
    admissionStatus: "Applied" as const,
    onboardingCompletedAt: now,
    updatedAt: now,
  };

  await db
    .insert(talentProfile)
    .values(values)
    .onDuplicateKeyUpdate({
      set: {
        displayName: values.displayName,
        categoryId: values.categoryId,
        skills: values.skills,
        timezone: values.timezone,
        hoursPerWeek: values.hoursPerWeek,
        availableFrom: values.availableFrom,
        rateAmount: values.rateAmount,
        rateCurrency: values.rateCurrency,
        onboardingCompletedAt: values.onboardingCompletedAt,
        updatedAt: values.updatedAt,
      },
    });
}
