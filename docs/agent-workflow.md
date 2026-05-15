# Agent Workflow

Petal should be built as an agent-assisted product, with Ian acting as product owner, architect, reviewer, and taste filter.

The goal is not to outsource judgment. The goal is to use agents to create implementation momentum while keeping the product coherent.

## Operating Model

Ian owns:

- Product direction
- Scope decisions
- Technical architecture
- Code review
- Interaction quality
- Visual and audio taste
- Final deployment decisions

Agents can own:

- Isolated implementation tasks
- Test scaffolding
- Refactors with clear boundaries
- Documentation drafts
- Backend endpoint prototypes
- UI component variants
- Research spikes

## Server And Review Handoff

Agents should be willing to run local servers for the current story. Ian should not need
to manually start a server just to discover what changed, although he can take over the
server whenever he wants.

Default handoff for visual or interactive work:

1. Agent starts the relevant dev server, usually `pnpm dev`.
2. Agent confirms the app responds locally.
3. Agent gives Ian the local URL and any network URL printed by the server.
4. Agent leaves the server running while Ian reviews the behavior.
5. Ian tests on desktop and phone as needed.
6. Agent applies review feedback and reruns the quality gates.
7. Agent stops the server when the review loop is finished, unless Ian asks to keep it running.

Automated verification is necessary but not sufficient for product-facing stories. A story
that changes UI, interaction, audio, plant behavior, or product feel should stay
`In Progress` until Ian has reviewed the running app and approved the result.

Status guidance:

- `Ready`: The story has enough scope to start.
- `In Progress`: An agent is implementing, validating, or waiting for Ian's review.
- `Blocked`: The story cannot continue without a clearly documented decision, dependency, or fix.
- `Done`: Quality gates pass and Ian has approved the running behavior.

## Recommended Build Rhythm

Daily loop:

1. Pick one concrete product outcome.
2. Write or update the acceptance criteria.
3. Assign bounded implementation work to agents.
4. Review diffs locally.
5. Have the agent start the app and share the local and network URLs.
6. Run the app on desktop and phone.
7. Keep, revise, or revert based on product feel.
8. Mark the story done only after Ian review and passing quality gates.
9. Write a short dev log entry for future portfolio material.

Weekly loop:

1. Deploy a working version.
2. Record a short screen capture.
3. Update the roadmap.
4. Identify one architecture story worth preserving.
5. Cut anything that does not make the toy more playable or the engineering story clearer.

## Early Agent Task Splits

### Frontend Shell

Build the Vite React TypeScript app, base layout, mobile viewport behavior, routing, and app state boundaries.

Acceptance criteria:

- App runs locally
- App is usable on mobile viewport
- No backend dependency required
- Clean component structure

### Plant Generation

Create deterministic seed-based plant generation.

Acceptance criteria:

- Same seed produces same plant
- Plant has leaves, palette, pot, and audio traits
- Generation code has focused unit tests
- Share codes can be parsed from the URL

### Plant Rendering

Render a soft 2D plant with tappable leaves.

Acceptance criteria:

- Leaves are individually interactive
- Layout is responsive
- Touch targets work on phone
- Visual state changes when plant is dry, okay, or thriving

### Audio Interaction

Add Tone.js sound playback.

Acceptance criteria:

- First user interaction unlocks audio
- Each leaf has a pitch
- Health affects tuning or modulation
- Sounds are pleasant enough for repeated tapping

### Care State

Implement hydration, health, and growth state.

Acceptance criteria:

- Watering changes hydration
- Time or interaction changes plant condition
- State persists locally
- New leaf unlock condition is implemented

### Backend Spike

Prototype a minimal save/load API.

Acceptance criteria:

- Plant can be saved by id or share code
- Plant can be loaded from API
- Schema is documented
- Deployment path is clear

## Review Checklist

Before accepting agent work:

- Does the app still run?
- Did Ian get a URL to review the running app?
- Does the interaction feel better, not just more complete?
- Is the code easy to explain in an interview?
- Did the change stay inside its assigned area?
- Are names and concepts consistent with the product?
- Is there at least one test for deterministic logic?
- Does it work on a phone-sized viewport?
- Has Ian approved the behavior before the story was marked `Done`?

## Portfolio Evidence To Capture

Save evidence as the project evolves:

- Screenshots of early and final plant states
- Short videos of tapping, watering, and unlocking
- Architecture diagrams
- Seed generation examples
- Backend schema evolution
- Notes on agent-assisted implementation decisions
- Bugs caught through review
- Tradeoffs made to ship faster
