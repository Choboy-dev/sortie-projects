import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "@/lib/auth";
import {
  authPathForKind,
  homePathForKind,
  type AccountKind,
} from "@/lib/auth/account-kind";
import type { WorkspaceKind } from "@/lib/workspace/types";

export async function requireWorkspaceSession(
  kind: WorkspaceKind,
): Promise<Session> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(authPathForKind(kind));
  }

  const accountKind = session.user.accountKind as AccountKind | null | undefined;
  if (accountKind && accountKind !== kind) {
    redirect(homePathForKind(accountKind));
  }

  return session;
}

export async function signOutWorkspace(kind: WorkspaceKind) {
  await auth.api.signOut({ headers: await headers() });
  redirect(authPathForKind(kind));
}
