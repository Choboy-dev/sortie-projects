# Auth architecture (Sortie)

## Paths
- **Companies:** `/hire/auth` → `/hire`
- **Talent:** `/apply/auth` → `/apply`

Passwordless email OTP (Resend) and optional Google OAuth. Account kind is stored on the user (`company` | `talent`) from the entry path cookie `sortie_account_kind`.

## Stack
- better-auth + emailOTP plugin
- Drizzle ORM + Hostinger MySQL (`u665258891_sortie`)
- Resend for OTP delivery

## Local setup
1. Copy `.env.example` → `.env.local` and fill values.
2. `npm run db:push` when schema changes.
3. `npm run dev` — with empty `RESEND_API_KEY`, OTPs are logged to the server console.
4. Google: set client ID/secret, enable the Google+OAuth redirect URI  
   `{BETTER_AUTH_URL}/api/auth/callback/google`, then set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`.

## Production (Hostinger)
- `DATABASE_URL` uses `localhost` on the same hosting account.
- `BETTER_AUTH_URL=https://sortieprojects.com`
- Set real `RESEND_API_KEY` + verified `RESEND_FROM_EMAIL`.
- Set Google OAuth credentials when ready; rebuild after changing `NEXT_PUBLIC_*`.
