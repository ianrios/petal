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

## Recommended Build Rhythm

Daily loop:

1. Pick one concrete product outcome.
2. Write or update the acceptance criteria.
3. Assign bounded implementation work to agents.
4. Review diffs locally.
5. Run the app on desktop and phone.
6. Keep, revise, or revert based on product feel.
7. Write a short dev log entry for future portfolio material.

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
- Does the interaction feel better, not just more complete?
- Is the code easy to explain in an interview?
- Did the change stay inside its assigned area?
- Are names and concepts consistent with the product?
- Is there at least one test for deterministic logic?
- Does it work on a phone-sized viewport?

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

