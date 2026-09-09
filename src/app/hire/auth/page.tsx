import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in to hire — Sortie Projects",
  description:
    "Sign in or create a company account with email OTP or Google to hire Sortie talent.",
};

export default function HireAuthPage() {
  return (
    <AuthForm
      kind="company"
      title="Hire from the Sortie network"
      subtitle="Sign in with email or Google to review matched talent and start hiring."
    />
  );
}
