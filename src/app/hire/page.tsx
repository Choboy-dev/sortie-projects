import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getCompanyWorkspace,
  requireWorkspaceSession,
  signOutWorkspace,
} from "@/lib/workspace";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export default async function HireHomePage() {
  const session = await requireWorkspaceSession("company");
  const workspace = await getCompanyWorkspace(
    session.user.id,
    session.user.email,
  );

  if (!workspace.onboardingComplete || !workspace.dashboard) {
    redirect("/hire/onboarding");
  }

  const { dashboard } = workspace;

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
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-signal">Hiring desk</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {dashboard.title}
        </h1>
        <p className="mt-3 text-base text-muted">
          Hiring focus: {dashboard.hiringFocus}
        </p>
      </div>

      <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Next step
          </h2>
          <p className="mt-4 max-w-md text-base text-muted">
            {dashboard.nextAction}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex cursor-not-allowed rounded-md border border-line px-4 py-2.5 text-sm font-medium text-muted">
              Post a full role (soon)
            </span>
            <Link
              href={dashboard.browseHref}
              className="inline-flex rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-strong"
            >
              Browse talent
            </Link>
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Pipeline
          </h2>
          <p className="mt-2 text-sm text-muted">
            Matched talent and trials will show here. Nothing queued yet.
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-muted">
        Need the marketing site?{" "}
        <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          Back to Sortie home
        </Link>
      </p>
    </WorkspaceShell>
  );
}
