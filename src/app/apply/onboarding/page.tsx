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
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-signal">Admission setup</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Tell us who you are
        </h1>
        <p className="mt-3 text-base text-muted sm:text-lg">
          A short profile so we can place you when assessments open. No scores
          yet.
        </p>
        <div className="mt-10">
          <TalentOnboardingForm
            defaultName={session.user.name || ""}
            action={submitTalentOnboarding}
          />
        </div>
      </div>
    </WorkspaceShell>
  );
}
