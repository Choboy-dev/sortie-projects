import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { companyProfile } from "@/lib/db/schema/workspace";
import { talentCategories } from "@/data/talent-menu";
import type {
  CompanyOnboardingInput,
  CompanyWorkspace,
} from "@/lib/workspace/types";

function categoryLabel(categoryId: string) {
  return (
    talentCategories.find((c) => c.id === categoryId)?.label ?? categoryId
  );
}

function browseHref(categoryId: string) {
  const category = talentCategories.find((c) => c.id === categoryId);
  return category?.href ?? "/developers";
}

function buildCompanyDashboard(
  profile: typeof companyProfile.$inferSelect,
): NonNullable<CompanyWorkspace["dashboard"]> {
  return {
    title: profile.companyName,
    hiringFocus: `${profile.hiringTitle} · ${categoryLabel(profile.hiringCategoryId)}`,
    nextAction: "Full role posting is coming soon. Browse talent by skill in the meantime.",
    browseHref: browseHref(profile.hiringCategoryId),
  };
}

export async function getCompanyWorkspace(
  userId: string,
  email: string,
): Promise<CompanyWorkspace> {
  const rows = await db
    .select()
    .from(companyProfile)
    .where(eq(companyProfile.userId, userId))
    .limit(1);

  const profile = rows[0] ?? null;
  const onboardingComplete = Boolean(profile?.onboardingCompletedAt);

  if (!profile || !onboardingComplete) {
    return {
      kind: "company",
      email,
      onboardingComplete: false,
      profile: profile
        ? {
            companyName: profile.companyName,
            website: profile.website,
            hiringTitle: profile.hiringTitle,
            hiringCategoryId: profile.hiringCategoryId,
            hiringCategoryLabel: categoryLabel(profile.hiringCategoryId),
            timezone: profile.timezone,
          }
        : null,
      dashboard: null,
    };
  }

  return {
    kind: "company",
    email,
    onboardingComplete: true,
    profile: {
      companyName: profile.companyName,
      website: profile.website,
      hiringTitle: profile.hiringTitle,
      hiringCategoryId: profile.hiringCategoryId,
      hiringCategoryLabel: categoryLabel(profile.hiringCategoryId),
      timezone: profile.timezone,
    },
    dashboard: buildCompanyDashboard(profile),
  };
}

export async function completeCompanyOnboarding(
  userId: string,
  input: CompanyOnboardingInput,
): Promise<void> {
  const now = new Date();
  const values = {
    userId,
    companyName: input.companyName.trim(),
    website: input.website?.trim() || null,
    hiringTitle: input.hiringTitle.trim(),
    hiringCategoryId: input.hiringCategoryId,
    timezone: input.timezone.trim(),
    onboardingCompletedAt: now,
    updatedAt: now,
  };

  await db
    .insert(companyProfile)
    .values(values)
    .onDuplicateKeyUpdate({
      set: {
        companyName: values.companyName,
        website: values.website,
        hiringTitle: values.hiringTitle,
        hiringCategoryId: values.hiringCategoryId,
        timezone: values.timezone,
        onboardingCompletedAt: values.onboardingCompletedAt,
        updatedAt: values.updatedAt,
      },
    });
}
