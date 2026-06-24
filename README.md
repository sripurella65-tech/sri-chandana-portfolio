# Sri Chandana Purella — Portfolio

A production-ready Next.js portfolio for a Data, AI & Cloud Engineer, with visitor analytics, optional recruiter lead capture, real-time alerts, and a protected admin dashboard.

## Local setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Initialize Neon tables: `pnpm db:push`
4. Run the site: `pnpm dev`

The public experience remains usable if analytics services are unavailable.

## Vercel deployment

Import the repository into Vercel, configure all variables from `.env.example`, then deploy. Run `pnpm db:push` once against the production `DATABASE_URL`.

## Important before publishing

- Replace `public/resume.html` with a verified PDF resume and update the hero link if desired.
- Confirm employment wording, project claims, and contact details.
- Set a long, unique `ADMIN_PASSWORD`.
- Configure at least one notification channel: Resend, Slack, or Telegram.
- Review your privacy disclosure and applicable data collection requirements.
