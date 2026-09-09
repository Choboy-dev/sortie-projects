export type AccountKind = "company" | "talent";

export const ACCOUNT_KIND_COOKIE = "sortie_account_kind";

export function isAccountKind(value: unknown): value is AccountKind {
  return value === "company" || value === "talent";
}

export function homePathForKind(kind: AccountKind) {
  return kind === "company" ? "/hire" : "/apply";
}

export function authPathForKind(kind: AccountKind) {
  return kind === "company" ? "/hire/auth" : "/apply/auth";
}
