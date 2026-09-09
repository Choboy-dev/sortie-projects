import { redirect } from "next/navigation";
import {
  getCompanyWorkspace,
  requireWorkspaceSession,
  signOutWorkspace,
} from "@/lib/workspace";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { CompanyOnboardingForm } from "@/components/workspace/company-onboarding-form";
import { submitCompanyOnboarding } from "@/app/hire/onboarding/actions";

export default async function CompanyOnboardingPage() {
  const session = await requireWorkspaceSession("company");
  const workspace = await getCompanyWorkspace(
    session.user.id,
    session.user.email,
  );

  if (workspace.onboardingComplete) {
    redirect("/hire");
  }

  async function signOut() {
    "use server";
    await signOutWorkspace("company");
  }

  return (
    <WorkspaceShell
      kindLabel="Company workspace"
      email={session.user.email}
      signOutAction={signOut}
    >
      <div className="flex min-h-[70vh] items-center py-4">
        <CompanyOnboardingForm
          defaultName={session.user.name || ""}
          action={submitCompanyOnboarding}
        />
      </div>
    </WorkspaceShell>
  );
}
