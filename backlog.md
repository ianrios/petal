# Backlog

Use this file as the simple story list. When a story is ready to plan in detail, create a matching file in `docs/stories/<story-id>.md`.

Statuses:

- `Idea`
- `Ready`
- `In Progress`
- `Blocked`
- `Done`

## Now

### PETAL-001: Scaffold Web App

Status: `Ready`

Create the initial React, TypeScript, and Vite app.

Acceptance criteria:

- App runs locally with hot reload
- Desktop and mobile viewport layouts are usable
- Project has basic scripts for dev, build, test, lint, and typecheck
- README includes local setup commands

### PETAL-002: Deterministic Plant Seed

Status: `Ready`

Generate the same plant from the same seed.

Acceptance criteria:

- Seed can come from the URL
- Missing seed creates a new seed
- Same seed produces same initial plant traits
- Core generation logic has tests

### PETAL-003: First Leaf Instrument

Status: `Ready`

Render a first plant state with one playable leaf and a faded stem hinting at the future pot.

Acceptance criteria:

- One visible leaf can be tapped or clicked
- Leaf triggers a pleasant sound
- Stem is visible but blurred or faded into the background
- Works on phone and desktop

### PETAL-004: Hydration And Real-Time Drift

Status: `Idea`

Make the plant change based on real elapsed time.

Acceptance criteria:

- Plant stores `lastCalculatedAt`
- Minutes create subtle change
- One day creates visible/audible change
- One week creates major dry/overgrown/changed state
- State recalculates on load

## Next

### PETAL-005: Water Interaction

Status: `Idea`

Add a watering interaction that changes hydration, tuning, and plant visual state.

Acceptance criteria:

- User can water the plant
- Hydration increases
- Overwatering is possible later, but not required in first pass
- Health affects tuning stability

### PETAL-006: First Growth Unlock

Status: `Idea`

Unlock a second leaf after enough care.

Acceptance criteria:

- Growth progress is tracked
- New leaf appears after enough interaction or elapsed time
- Camera/viewport zooms out slightly after the new leaf appears
- Sound palette expands with the new leaf

### PETAL-007: Reveal Pot

Status: `Idea`

Reveal the pot after enough leaves/growth.

Acceptance criteria:

- Earlier plant states only hint at the stem/pot
- Pot appears after growth threshold
- Pot type affects audio effects
- Camera/viewport zooms out when the pot appears

### PETAL-008: Shareable Plant URL

Status: `Idea`

Let users share a plant seed or snapshot.

Acceptance criteria:

- Share URL can recreate a plant
- Shared plants do not mutate the original
- Recipient gets a forked copy
- Fork metadata is preserved once backend exists

### PETAL-009: Local Persistence

Status: `Idea`

Persist plant state locally before backend persistence.

Acceptance criteria:

- Reloading the browser keeps current plant state
- Local state is versioned enough to migrate during development
- Reset/new plant flow exists

## Later

### PETAL-010: Supabase Schema

Status: `Idea`

Add backend persistence with Supabase/Postgres.

Acceptance criteria:

- Plants table exists
- Plant versions/history table exists
- Care events table exists
- Anonymous owner/device identity is supported
- Migrations are committed

### PETAL-011: Save And Load API

Status: `Idea`

Add API endpoints for saving, loading, and forking plants.

Acceptance criteria:

- Save plant endpoint
- Load plant endpoint
- Fork plant endpoint
- Server-side validation
- Tests for API contracts

### PETAL-012: Plant History Nodes

Status: `Idea`

Track meaningful plant state snapshots as history nodes.

Acceptance criteria:

- New leaf unlock creates a version node
- Pot reveal creates a version node
- Share creates a version node
- Fork references source version

### PETAL-013: Shelf Reveal

Status: `Idea`

Reveal a shelf after the plant grows enough or after the user earns a pot.

Acceptance criteria:

- Shelf is hidden early
- Shelf appears through progression
- Shelf can eventually hold multiple plants
- Desktop layout uses shelf space gracefully

### PETAL-014: Story Template

Status: `Ready`

Create a reusable story planning template.

Acceptance criteria:

- Template exists in `docs/stories/_template.md`
- Template includes product goal, acceptance criteria, technical notes, and test plan
- Agents can use it when expanding backlog items

