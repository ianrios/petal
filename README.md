# Petal

Petal is a web-based plant tamagotchi and musical sound toy. Users grow a tiny generated plant, care for it over time, and play its leaves like a living instrument.

The project is designed as a portfolio piece for senior full-stack engineering: polished React/TypeScript UI, playful audio interaction, persistent state, shareable plant identities, and a backend architecture that can grow into multi-user behavior.

## Current Planning

- [Raw ideas](./docs/ideas.md)
- [MVP and MoSCoW scope](./docs/mvp.md)
- [Agent-assisted build workflow](./docs/agent-workflow.md)
- [Local development plan](./docs/development.md)
- [Deployment plan](./docs/deployment.md)
- [Backlog](./backlog.md)

## Local Setup

Petal uses a `pnpm` workspace with the React/Vite app in `apps/web`.

Prerequisites:

- Node `24.15.0` from `.nvmrc`
- Corepack enabled
- `pnpm` supplied by the root `packageManager` field

Install and run:

```sh
nvm use
corepack enable
pnpm install
pnpm dev
```

The web dev server binds to `0.0.0.0` for local network testing. After `pnpm dev`
starts, open the local Vite URL on this machine or the network URL on a phone on the
same Wi-Fi network.

Quality gates:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm test:coverage
```

Hooks:

- Pre-commit runs `lint-staged` to format and lint staged files.
- Pre-push runs the full local quality gate.

## Agent And Review Workflow

Agents can start local servers while working on a story, but a story is not done until
Ian has had a chance to open the running app and review the product surface.

Preferred story loop:

1. Agent implements the story slice and runs the quality gates.
2. Agent starts `pnpm dev` when there is something visual or interactive to review.
3. Agent shares the local URL and network URL printed by Vite.
4. Ian reviews the app on desktop and, when relevant, on a phone.
5. Agent keeps the server running during review, makes requested changes, and reruns gates.
6. Ian approves the behavior.
7. Agent updates the story and backlog status to `Done`.

Until human review happens, keep visual or interaction stories in `In Progress`, even if
automated checks pass.

## MVP Direction

The first proof of concept should run as a real deployed web app on mobile:

- Generate one seed-based plant
- Tap leaves to trigger sound
- Water the plant to affect health and tuning
- Persist the plant locally or through a small backend
- Share a plant link with another person

## Working Title

Petal is the current working title.
