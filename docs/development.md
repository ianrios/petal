# Local Development

Petal should be developed as a full-stack app that can run locally with hot reload across frontend, API, and database-adjacent work.

## Recommended Local Stack

Use a simple monorepo structure:

```txt
apps/web       React + TypeScript + Vite frontend
api            Vercel-style serverless API routes or small Node API
packages/core  Shared plant generation, state, and validation logic
supabase       Local database config, migrations, seed data
```

This keeps the frontend fast, the backend real, and the domain logic shared between client and server.

## Local Commands

Target developer experience:

```sh
pnpm dev
```

Runs:

- Vite dev server with hot module replacement
- API dev server or Vercel local functions
- Supabase local stack when backend persistence is being worked on

Useful scripts to add once the app is scaffolded:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "pnpm --filter @petal/web dev",
    "dev:api": "vercel dev",
    "dev:db": "supabase start",
    "test": "turbo test",
    "typecheck": "turbo typecheck",
    "lint": "turbo lint"
  }
}
```

If Turborepo feels like too much for the proof of concept, use `concurrently` first and add Turbo later.

## Hot Reload Strategy

Frontend:

- Vite provides fast React refresh and module hot reload.
- During local development, expose the Vite server on the local network so the app can be tested on a phone.

API:

- Start with Vercel-style API routes or a small Node server.
- Keep API handlers thin.
- Put plant generation and state transition rules in `packages/core`.

Database:

- Use Supabase CLI for local Postgres when persistence begins.
- Keep migrations in the repo.
- Generate TypeScript types from the database schema after tables stabilize.

## Mobile Testing

The app is mobile-first, but desktop development should remain comfortable.

Local mobile testing approach:

1. Run the web dev server with host binding enabled.
2. Find the Mac's local network IP.
3. Open the Vite network URL on the phone.
4. Keep desktop responsive views open for faster iteration.

Expected Vite command shape:

```sh
vite --host 0.0.0.0
```

The phone and Mac must be on the same network.

## Environment Variables

Use `.env.local` for local secrets and never commit it.

Client-exposed Vite variables must start with `VITE_`, but those values are bundled into client code and must not contain secrets.

Server-only secrets stay in API/server environments.

## Local-First Plan

Build in this order:

1. Client-only proof of concept with local storage.
2. Shared `packages/core` for seed generation and plant state.
3. Local Supabase schema for plants and care events.
4. API save/load endpoints.
5. Share and fork flows.
6. Optional real-time or collaborative behavior.

## Real Elapsed Time

Plant state should evolve based on timestamps, not background jobs in the MVP.

When a plant is loaded:

1. Read `lastCalculatedAt`.
2. Compare it to current time.
3. Apply elapsed-time state transitions.
4. Save the updated state after user interaction or sync.

This gives the feeling of a living plant without requiring cron jobs at the beginning.

