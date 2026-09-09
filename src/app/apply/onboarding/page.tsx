import { redirect } from "next/navigation";
import {
  getTalentWorkspace,
  requireWorkspaceSession,
  signOutWorkspace,
} from "@/lib/workspace";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { TalentOnboardingForm } from "@/components/workspace/talent-onboarding-form";
import { submitTalentOnboarding } from "@/app/apply/onboarding/actions";

export default async function TalentOnboardingPage() {
  const session = await requireWorkspaceSession("talent");
  const workspace = await getTalentWorkspace(
    session.user.id,
    session.user.email,
  );

  if (workspace.onboardingComplete) {
    redirect("/apply");
  }

  async function signOut() {
    "use server";
    await signOutWorkspace("talent");
  }

  return (
    <WorkspaceShell
      kindLabel="Talent workspace"
      email={session.user.email}
      signOutAction={signOut}
    >
      <div className="flex min-h-[70vh] items-center py-4">
        <TalentOnboardingForm
          defaultName={session.user.name || ""}
          action={submitTalentOnboarding}
        />
      </div>
    </WorkspaceShell>
  );
}
