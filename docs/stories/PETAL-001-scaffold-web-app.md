# PETAL-001: Scaffold Web App

Status: `Done`

## Product Goal

Create the first runnable Petal web app foundation so the project can be developed locally, tested on a phone, and expanded through small stories.

This story is successful when Ian can run the app locally, open it on desktop, and have a clear path to opening it on a phone over the local network.

## User Story

As Ian, I want a clean React, TypeScript, and Vite app scaffold, so that I can start building the Petal proof of concept with fast local feedback and a deployable frontend foundation.

## Acceptance Criteria

- App is scaffolded with React, TypeScript, and Vite.
- Project uses `pnpm`.
- Project declares current Node LTS through `.nvmrc` and `package.json` engines.
- Project includes `.npmrc` settings that keep installs strict and predictable.
- App runs locally with hot reload.
- App can bind to the local network for phone testing.
- Desktop layout is usable during development.
- Mobile viewport is treated as the primary product surface.
- Project has scripts for `dev`, `build`, `test`, `test:coverage`, `lint`, `format`, `format:check`, and `typecheck`.
- TypeScript runs in strict mode.
- ESLint is configured with type-aware TypeScript rules.
- Prettier is configured and enforced.
- Vitest is configured with React Testing Library and coverage.
- Husky and lint-staged are configured for pre-commit checks.
- Husky is configured with a pre-push check that runs the full local quality gate.
- At least one smoke test verifies that the app shell renders.
- README includes local setup and run commands.
- The scaffold leaves room for future `packages/core`, API, and Supabase work.

## Technical Notes

- Prefer `pnpm` for package management.
- Use Node `24.15.0` LTS unless a newer Node 24 LTS patch is current when this story is implemented.
- Use Corepack so contributors get the expected `pnpm` version from `packageManager`.
- Use a structure that can grow toward the documented monorepo shape:
  - `apps/web` for the Vite app
  - `packages/core` later for shared generation and state logic
  - `api` or Vercel API routes later for backend behavior
  - `supabase` later for local database config and migrations
- Do not add Supabase, Tone.js, or backend code in this story unless needed by the scaffold.
- Keep initial UI minimal, but make it feel like Petal rather than a generic Vite starter.
- Include mobile-safe viewport metadata.
- Add a small Petal loading/entry surface that can eventually become the app loading state.
- Use vanilla CSS for this story. CSS is needed only for the initial responsive shell, mobile-first layout, typography, and placeholder app surface.
- Avoid a marketing landing page. This should feel like the quiet beginning of the app.
- On desktop, render a centered mobile-like play surface with room to add future dev/debug panels later.
- Configure Vite dev with host binding for phone testing, such as `--host 0.0.0.0`.

## Quality Gates

The scaffold should be intentionally strict from the beginning so agents cannot quietly pile up weak code.

Recommended tooling:

- `typescript`
- `eslint`
- `typescript-eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-testing-library`
- `prettier`
- `vitest`
- `@vitest/coverage-v8`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`
- `husky`
- `lint-staged`

Recommended TypeScript stance:

- `strict: true`
- No implicit `any`
- No unchecked indexed access if practical
- Exact optional property types if practical
- Separate app and test configs if needed

Recommended ESLint stance:

- Ban or strongly discourage `any`.
- Catch unused variables and imports.
- Prefer type-only imports.
- Catch floating promises when type-aware linting is available.
- Discourage non-null assertions.
- Enforce React Hooks rules.
- Include basic accessibility checks.
- Include Testing Library rules for tests.
- Keep `console` use deliberate.

Recommended Husky/lint-staged stance:

- Pre-commit should run formatting and linting against staged files.
- Pre-push should run the full local quality gate before code reaches the remote.

Recommended coverage stance:

- Add `test:coverage` with Vitest's V8 provider.
- Start strict now.
- Use `80%` minimum coverage thresholds for lines, statements, functions, and branches.
- If the scaffold cannot satisfy this honestly, improve the scaffold tests rather than lowering the threshold.

## Out Of Scope

- Plant generation.
- Audio playback.
- Hydration or elapsed-time state.
- Backend persistence.
- Vercel project setup and production deployment.
- Full design system.
- Tailwind or component library adoption.

## Test Plan

- Run the dev server locally.
- Confirm hot reload works by changing visible app text or styling.
- Run the production build.
- Run typecheck.
- Run lint.
- Run format check.
- Run tests.
- Run test coverage.
- Open the app in a mobile-sized viewport.
- If practical, open the local network URL on a phone.

Required commands:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm test:coverage
```

The pre-push hook should run the same non-interactive quality gate:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm test:coverage
```

`pnpm dev` should be verified manually because it is a long-running process.

## Human Review Plan

- Agent starts `pnpm dev` and shares the local and network URLs printed by Vite.
- Ian opens the app on desktop to review the centered mobile-like play surface.
- Ian opens the network URL on a phone or mobile viewport to review the first Petal entry surface.
- PETAL-001 can move to `Done` after Ian approves the running scaffold and the quality gates pass.

## Review Notes

- Does the app feel like the beginning of Petal, not a generic starter?
- Is the folder structure easy for agents to understand in future sessions?
- Are local commands documented clearly?
- Is the project still small enough to change quickly?
