import { Resend } from "resend";

export async function sendAuthOtpEmail(input: {
  email: string;
  otp: string;
  type: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Sortie Projects <onboarding@resend.dev>";

  const subject =
    input.type === "sign-in"
      ? "Your Sortie sign-in code"
      : "Your Sortie verification code";

  if (!apiKey) {
    console.warn(
      `[auth] RESEND_API_KEY missing — OTP for ${input.email}: ${input.otp}`,
    );
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: input.email,
    subject,
    html: `
      <div style="font-family: Figtree, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #0c1410;">
        <p style="font-size: 16px; line-height: 1.5;">Your Sortie code is:</p>
        <p style="font-size: 32px; letter-spacing: 0.2em; font-weight: 700; color: #0f8f6c;">${input.otp}</p>
        <p style="font-size: 14px; color: #5c6b63; line-height: 1.5;">
          This code expires in 10 minutes. If you didn’t request it, you can ignore this email.
        </p>
      </div>
    `,
  });
}
