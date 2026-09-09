import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BrandLogo } from "@/components/marketing/brand-logo";

export default async function ApplyHomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/apply/auth");
  }

  if (session.user.accountKind && session.user.accountKind !== "talent") {
    redirect("/hire");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-foreground">
      <header className="flex items-center justify-between border-b border-line bg-panel px-6 py-4">
        <BrandLogo href="/" markClassName="h-7 w-auto" />
        <form
          action={async () => {
            "use server";
            await auth.api.signOut({ headers: await headers() });
            redirect("/apply/auth");
          }}
        >
          <button
            type="submit"
            className="rounded-md border border-line px-3 py-2 text-sm font-medium hover:bg-canvas"
          >
            Sign out
          </button>
        </form>
      </header>
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-sm font-medium text-signal">Talent workspace</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
          Welcome{session.user.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="mt-4 text-lg text-muted">
          Your admission dashboard is next. Auth is live — assessments,
          interviews, and network status will land here.
        </p>
        <p className="mt-6 text-sm text-muted">
          Signed in as {session.user.email}
        </p>
      </main>
    </div>
  );
}
