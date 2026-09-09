import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BrandLogo } from "@/components/marketing/brand-logo";

export default async function HireHomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/hire/auth");
  }

  if (session.user.accountKind && session.user.accountKind !== "company") {
    redirect("/apply");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-foreground">
      <header className="flex items-center justify-between border-b border-line bg-panel px-6 py-4">
        <BrandLogo href="/" markClassName="h-7 w-auto" />
        <form
          action={async () => {
            "use server";
            await auth.api.signOut({ headers: await headers() });
            redirect("/hire/auth");
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
        <p className="text-sm font-medium text-signal">Company workspace</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
          Welcome{session.user.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="mt-4 text-lg text-muted">
          Your hiring dashboard is next. Auth is live — role briefs, matching,
          and trials will land here.
        </p>
        <p className="mt-6 text-sm text-muted">
          Signed in as {session.user.email}
        </p>
      </main>
    </div>
  );
}
