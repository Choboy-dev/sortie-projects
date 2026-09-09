"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import {
  ACCOUNT_KIND_COOKIE,
  homePathForKind,
  type AccountKind,
} from "@/lib/auth/account-kind";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { cn } from "@/lib/utils";

type AuthFormProps = {
  kind: AccountKind;
  title: string;
  subtitle: string;
};

function setAccountKindCookie(kind: AccountKind) {
  document.cookie = `${ACCOUNT_KIND_COOKIE}=${kind}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

export function AuthForm({ kind, title, subtitle }: AuthFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const googleEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED);

  useEffect(() => {
    setAccountKindCookie(kind);
  }, [kind]);

  function sendOtp(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      setAccountKindCookie(kind);
      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (sendError) {
        setError(sendError.message || "Could not send code. Try again.");
        return;
      }
      setStep("otp");
    });
  }

  function verifyOtp(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      setAccountKindCookie(kind);
      const { error: signInError } = await authClient.signIn.emailOtp({
        email,
        otp,
      });
      if (signInError) {
        setError(signInError.message || "Invalid code. Try again.");
        return;
      }
      router.replace(homePathForKind(kind));
      router.refresh();
    });
  }

  function continueWithGoogle() {
    setError(null);
    setAccountKindCookie(kind);
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: homePathForKind(kind),
        errorCallbackURL: `${kind === "company" ? "/hire/auth" : "/apply/auth"}?error=google`,
      });
    });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-foreground">
      <header className="border-b border-line bg-panel px-6 py-4">
        <BrandLogo href="/" markClassName="h-7 w-auto" />
      </header>

      <main
        id="main"
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12"
      >
        <p className="text-sm font-medium text-signal">
          {kind === "company" ? "For companies" : "For talent"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-base text-muted">{subtitle}</p>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={continueWithGoogle}
            disabled={pending || !googleEnabled}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-md border border-line bg-panel px-4 py-3 text-sm font-semibold text-foreground transition",
              googleEnabled
                ? "hover:bg-canvas active:scale-[0.99]"
                : "cursor-not-allowed opacity-50",
            )}
          >
            <GoogleMark />
            Continue with Google
          </button>
          {!googleEnabled ? (
            <p className="text-xs text-muted">
              Google sign-in activates once GOOGLE_CLIENT_ID and
              GOOGLE_CLIENT_SECRET are configured.
            </p>
          ) : null}

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          {step === "email" ? (
            <form onSubmit={sendOtp} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Work email
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-md border border-line bg-panel px-3 py-3 text-sm outline-none ring-signal focus:ring-2"
                  placeholder="you@company.com"
                />
              </label>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center rounded-md bg-signal px-4 py-3 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.99] disabled:opacity-60"
              >
                {pending ? "Sending code…" : "Continue with email"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <p className="text-sm text-muted">
                Enter the 6-digit code we sent to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">
                  One-time code
                </span>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full rounded-md border border-line bg-panel px-3 py-3 text-center font-mono text-lg tracking-[0.35em] outline-none ring-signal focus:ring-2"
                  placeholder="••••••"
                />
              </label>
              <button
                type="submit"
                disabled={pending || otp.length < 6}
                className="inline-flex w-full items-center justify-center rounded-md bg-signal px-4 py-3 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.99] disabled:opacity-60"
              >
                {pending ? "Verifying…" : "Verify and continue"}
              </button>
              <button
                type="button"
                className="w-full text-sm font-medium text-signal hover:text-signal-strong"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError(null);
                }}
              >
                Use a different email
              </button>
            </form>
          )}

          {error ? (
            <p className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          ) : null}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          {kind === "company" ? (
            <>
              Looking to join the network?{" "}
              <a className="font-medium text-signal hover:text-signal-strong" href="/apply/auth">
                Apply as talent
              </a>
            </>
          ) : (
            <>
              Hiring instead?{" "}
              <a className="font-medium text-signal hover:text-signal-strong" href="/hire/auth">
                Continue as a company
              </a>
            </>
          )}
        </p>
      </main>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.6C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.3 5.2C39.2 36.3 44 31 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}
