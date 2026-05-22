# MetaPay

MetaPay is a premium earning platform built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, Framer Motion, and Recharts.

## Features

- Modern dashboard with earning analytics and task cards
- Username / phone / password authentication
- Supabase Auth + Profile system
- In-app package activation and Paynecta payment flow
- Referral system with referral codes and earnings
- Inactive account experience with locked sections and activation prompts
- Admin panel for user, transaction, and package oversight
- Live activity feed and dashboard widgets
- Full Supabase schema, role policies, and edge-ready APIs

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Supabase (Auth, PostgreSQL, Realtime)

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Set your Supabase and Paynecta credentials in `.env.local`.

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

## Deployment

### GitHub Actions

A CI workflow is configured at `.github/workflows/ci.yml`.

### Vercel / Supabase

Deploy the app to Vercel and connect the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_PAYNECTA_URL`
- `PAYNECTA_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

### Supabase Setup

Run the SQL in `supabase-schema.sql` inside your Supabase SQL editor to create the MetaPay schema.

## Recommended Workflow

- Configure Supabase Auth and database
- Seed packages and tasks using Supabase SQL or the dashboard
- Configure Paynecta webhook to `https://<your-app>/api/payment/webhook`
- Start the app and test registration, login, payment, and dashboard flows

## Notes

- Inactive users can access the dashboard and profile pages but cannot start tasks or withdraw funds.
- Once payment is verified, the account is activated and premium features unlock.
