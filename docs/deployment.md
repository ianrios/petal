# Deployment

Petal should deploy early and often so it can be tested on a real phone.

## Recommendation

Use:

- Vercel for the web app, preview deployments, and serverless API routes
- Supabase for hosted Postgres, migrations, anonymous identity, and future real-time features
- GitHub as the deployment trigger

This stack keeps the MVP shippable while still giving the project a credible full-stack architecture story.

## Why Vercel

Vercel is a good fit for the proof of concept because:

- Vite apps deploy directly.
- Pull requests and commits can get preview URLs.
- Serverless API routes can live with the app.
- The deployment story is simple enough to keep momentum.

## Why Supabase

Supabase is a good fit because:

- Local development can run through the Supabase CLI.
- Postgres gives the app a serious backend foundation.
- Anonymous users, share codes, row-level security, and real-time features can be added gradually.
- Migrations and generated TypeScript types create good interview material.

## Deployment Environments

Use three environment levels:

- Local: Mac development with Vite, local API, and optional local Supabase
- Preview: Vercel preview deploys connected to a hosted Supabase preview/dev project
- Production: Vercel production deploy connected to hosted Supabase production

For the first deployed proof of concept, local storage is acceptable. Add hosted Supabase when the share/fork model starts.

## First Production Shape

The first deployed version should include:

- Mobile-first web app
- Client-side seed generation
- Local storage persistence
- Shareable seed URL
- No login

The second deployed version should add:

- Supabase database
- API save/load
- Anonymous device/user identity
- Forked shared plants

## Share And Fork Model

Shared plants should not mutate the original owner's plant.

When a user opens a shared plant:

1. Load the source plant or source history node.
2. Create a forked copy for the visiting user/device.
3. Preserve `forkedFromPlantId` and `forkedFromVersionId`.
4. Let the original owner continue independently.

This should feel like lightweight Git branching for plants.

## History Nodes

Each meaningful plant state can be represented as a version node.

Good version triggers:

- Share created
- New leaf unlocked
- Pot revealed
- Plant forked
- Manual snapshot later if needed

Avoid versioning every tap. Store high-value state transitions, not every interaction.

## Future Deployment Options

If Vercel functions become limiting, keep these as later options:

- Render or Railway for a long-running Node API
- Fly.io for regional full-stack deployment
- Supabase Edge Functions for colocated backend behavior

Do not introduce these until the MVP proves it needs them.
