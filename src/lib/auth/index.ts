import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema/auth";
import { sendAuthOtpEmail } from "@/lib/auth/email";
import {
  ACCOUNT_KIND_COOKIE,
  isAccountKind,
  type AccountKind,
} from "@/lib/auth/account-kind";

function readAccountKindFromCookieHeader(
  cookieHeader: string | null,
): AccountKind | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ACCOUNT_KIND_COOKIE}=`));
  if (!match) return undefined;
  const value = decodeURIComponent(match.split("=").slice(1).join("="));
  return isAccountKind(value) ? value : undefined;
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      accountKind: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const kind = readAccountKindFromCookieHeader(
            ctx?.headers?.get("cookie") ?? null,
          );
          return {
            data: {
              ...user,
              accountKind: kind,
            },
          };
        },
      },
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendAuthOtpEmail({ email, otp, type });
      },
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
