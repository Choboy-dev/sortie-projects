import Link from "next/link";
import { BrandLogo } from "@/components/marketing/brand-logo";

type WorkspaceShellProps = {
  kindLabel: string;
  email?: string;
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
};

export function WorkspaceShell({
  kindLabel,
  email,
  signOutAction,
  children,
}: WorkspaceShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-foreground">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo href="/" markClassName="h-7 w-auto" />
            <span className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <p className="truncate text-sm font-medium text-muted">{kindLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {email ? (
              <p className="hidden text-sm text-muted md:block">{email}</p>
            ) : null}
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-md border border-line px-3 py-2 text-sm font-medium transition hover:bg-canvas"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 sm:py-14">
        {children}
      </main>
      <footer className="border-t border-line px-6 py-4">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-sm text-muted">
          <Link href="/" className="transition hover:text-foreground">
            Sortie Projects
          </Link>
          <span>Workspace</span>
        </div>
      </footer>
    </div>
  );
}
