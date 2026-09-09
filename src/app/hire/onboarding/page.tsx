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
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-signal">Hiring setup</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Set up your company
        </h1>
        <p className="mt-3 text-base text-muted sm:text-lg">
          Company basics and what you want to hire first. Role briefs come in a
          later step.
        </p>
        <div className="mt-10">
          <CompanyOnboardingForm
            defaultName={session.user.name || ""}
            action={submitCompanyOnboarding}
          />
        </div>
      </div>
    </WorkspaceShell>
  );
}
