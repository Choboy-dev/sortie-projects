import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getTalentWorkspace,
  requireWorkspaceSession,
  signOutWorkspace,
} from "@/lib/workspace";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export default async function ApplyHomePage() {
  const session = await requireWorkspaceSession("talent");
  const workspace = await getTalentWorkspace(
    session.user.id,
    session.user.email,
  );

  if (!workspace.onboardingComplete || !workspace.dashboard) {
    redirect("/apply/onboarding");
  }

  const { dashboard } = workspace;

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
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-signal">At a glance</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {dashboard.title}
        </h1>
        <p className="mt-3 text-base text-muted">{dashboard.profileSummary}</p>
      </div>

      <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Admission
          </h2>
          <p className="mt-3 text-sm text-muted">Status</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {dashboard.admissionStatus}
          </p>
          <p className="mt-4 max-w-md text-base text-muted">
            {dashboard.nextAction}
          </p>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Intros
            </h2>
            <p className="mt-2 text-sm text-muted">{dashboard.emptyIntros}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Engagements
            </h2>
            <p className="mt-2 text-sm text-muted">
              {dashboard.emptyEngagements}
            </p>
          </div>
        </section>
      </div>

      <p className="mt-12 text-sm text-muted">
        Need to change your path?{" "}
        <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          Back to Sortie home
        </Link>
      </p>
    </WorkspaceShell>
  );
}
