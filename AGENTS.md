# Agent Instructions

Petal is a portfolio project for a senior full-stack software engineer. It should demonstrate polished React/TypeScript frontend work, thoughtful product architecture, backend persistence, mobile-first interaction design, and a memorable audio/plant-care concept.

Before starting new work, read these files:

1. `README.md`
2. `docs/ideas.md`
3. `docs/mvp.md`
4. `docs/agent-workflow.md`
5. `docs/development.md`
6. `docs/deployment.md`
7. `backlog.md`

## Product Direction

Petal is a web-based plant tamagotchi and musical sound toy. The user grows a tiny generated plant, cares for it over real elapsed time, and plays its leaves like a living instrument.

The UI should be mobile-first, mysterious, quiet, tactile, and soft, while remaining usable on desktop during development.

## Engineering Direction

Prefer:

- React
- TypeScript
- Vite
- Tone.js
- Deterministic seed-based generation
- Local-first behavior before backend persistence
- Supabase/Postgres for backend persistence
- Vercel for deployment

Avoid adding new frameworks or services unless the relevant planning doc has been updated first.

## How To Work

- Keep changes tied to a backlog story.
- If a story does not exist, add one to `backlog.md` before implementation.
- For planned stories, create `docs/stories/<story-id>.md`.
- Keep implementation slices small enough to run and review on a phone.
- Preserve the product vocabulary already in the docs.
- Update docs when architectural decisions change.
- Add tests for deterministic generation, state transitions, and backend contracts.

## Definition Of Done

A change is not done until:

- The app still runs locally.
- The relevant user interaction works on a mobile viewport.
- State changes are understandable from the product model.
- Any new architectural decision is reflected in docs.
- The code can be explained in an interview.
