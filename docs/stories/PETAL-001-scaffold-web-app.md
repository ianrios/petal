# PETAL-001: Scaffold Web App

Status: `Ready`

## Product Goal

Create the first runnable Petal web app foundation so the project can be developed locally, tested on a phone, and expanded through small stories.

This story is successful when Ian can run the app locally, open it on desktop, and have a clear path to opening it on a phone over the local network.

## User Story

As Ian, I want a clean React, TypeScript, and Vite app scaffold, so that I can start building the Petal proof of concept with fast local feedback and a deployable frontend foundation.

## Acceptance Criteria

- App is scaffolded with React, TypeScript, and Vite.
- App runs locally with hot reload.
- App can bind to the local network for phone testing.
- Desktop layout is usable during development.
- Mobile viewport is treated as the primary product surface.
- Project has scripts for `dev`, `build`, `test`, `lint`, and `typecheck`.
- README includes local setup and run commands.
- The scaffold leaves room for future `packages/core`, API, and Supabase work.

## Technical Notes

- Prefer `pnpm` for package management.
- Use a structure that can grow toward the documented monorepo shape:
  - `apps/web` for the Vite app
  - `packages/core` later for shared generation and state logic
  - `api` or Vercel API routes later for backend behavior
  - `supabase` later for local database config and migrations
- Do not add Supabase, Tone.js, or backend code in this story unless needed by the scaffold.
- Keep initial UI minimal, but make it feel like Petal rather than a generic Vite starter.
- Include mobile-safe viewport metadata.
- Add a small placeholder app surface that can become the first plant scene.

## Out Of Scope

- Plant generation.
- Audio playback.
- Hydration or elapsed-time state.
- Backend persistence.
- Deployment setup beyond keeping the app deployable.
- Full design system.

## Test Plan

- Run the dev server locally.
- Confirm hot reload works by changing visible app text or styling.
- Run the production build.
- Run typecheck.
- Run lint.
- Run tests if a test runner is included in the scaffold.
- Open the app in a mobile-sized viewport.
- If practical, open the local network URL on a phone.

## Review Notes

- Does the app feel like the beginning of Petal, not a generic starter?
- Is the folder structure easy for agents to understand in future sessions?
- Are local commands documented clearly?
- Is the project still small enough to change quickly?

