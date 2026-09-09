import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Apply to the network — Sortie Projects",
  description:
    "Sign in or create a talent account with email OTP or Google to start Sortie network admission.",
};

export default function ApplyAuthPage() {
  return (
    <AuthForm
      kind="talent"
      title="Apply to the Sortie network"
      subtitle="Sign in with email or Google to begin the admission gauntlet. Less than 1% make it in."
    />
  );
}
