export {
  requireWorkspaceSession,
  signOutWorkspace,
} from "@/lib/workspace/session";
export {
  getTalentWorkspace,
  completeTalentOnboarding,
} from "@/lib/workspace/talent";
export {
  getCompanyWorkspace,
  completeCompanyOnboarding,
} from "@/lib/workspace/company";
export type {
  TalentOnboardingInput,
  CompanyOnboardingInput,
  TalentWorkspace,
  CompanyWorkspace,
  WorkspaceKind,
} from "@/lib/workspace/types";
