import type { AccountKind } from "@/lib/auth/account-kind";

export type TalentOnboardingInput = {
  displayName: string;
  categoryId: string;
  skills: string[];
  timezone: string;
  hoursPerWeek: number;
  availableFrom: string | null;
  rateAmount: number | null;
  rateCurrency: string;
};

export type CompanyOnboardingInput = {
  companyName: string;
  website: string | null;
  hiringTitle: string;
  hiringCategoryId: string;
  timezone: string;
};

export type TalentWorkspace = {
  kind: "talent";
  email: string;
  onboardingComplete: boolean;
  profile: {
    displayName: string;
    categoryId: string;
    categoryLabel: string;
    skills: string[];
    timezone: string;
    hoursPerWeek: number;
    availableFrom: string | null;
    rateAmount: number | null;
    rateCurrency: string;
    admissionStatus: string;
  } | null;
  dashboard: {
    title: string;
    admissionStatus: string;
    profileSummary: string;
    nextAction: string;
    emptyIntros: string;
    emptyEngagements: string;
  } | null;
};

export type CompanyWorkspace = {
  kind: "company";
  email: string;
  onboardingComplete: boolean;
  profile: {
    companyName: string;
    website: string | null;
    hiringTitle: string;
    hiringCategoryId: string;
    hiringCategoryLabel: string;
    timezone: string;
  } | null;
  dashboard: {
    title: string;
    hiringFocus: string;
    nextAction: string;
    browseHref: string;
  } | null;
};

export type WorkspaceKind = Extract<AccountKind, "talent" | "company">;
