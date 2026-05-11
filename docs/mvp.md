# Petal MVP

Petal is a web-based plant tamagotchi and musical sound toy. Each plant is generated from a seed, grows through care, and becomes playable through leaves, pots, water, light, and hidden interactions.

The portfolio goal is to demonstrate senior full-stack software engineering through a polished interactive UI, a real backend architecture, stateful multi-user behavior, and a memorable creative product concept.

## Project Positioning

Petal should read as a small but complete product, not only a visual experiment.

Primary hiring signal:

- Polished React and TypeScript frontend architecture
- Real-time or multi-user backend design
- Durable product thinking and progressive feature disclosure
- Audio and interaction engineering
- Tasteful UI implementation on desktop and mobile

Personal story:

Petal connects software engineering, electronic music, human-computer interaction, assistive music technology, and agent-assisted product development. It is a project that could only come from this background.

## One-Sentence Pitch

Grow a tiny musical plant, care for it over time, and play its leaves like a living instrument.

## Target User Experience

The first-time user opens Petal on desktop or mobile and receives a generated plant. They can tap leaves to hear notes, water the plant, watch its health change, and notice that the plant's tuning and sound respond to care. After enough interaction, the plant gains a new leaf or reveals a small new capability.

The app should feel peaceful, tactile, slightly mysterious, and learnable through play.

## MVP Outcome

The MVP should be playable on a phone as a deployed web app.

By the end of the MVP, a user should be able to:

- Open Petal in a mobile browser
- Generate or receive a persistent seed-based plant
- Tap leaves to trigger musical sounds
- Water the plant and see/hear the plant state change
- Return later and see the same plant
- Share a plant link with another person

## Recommended MVP Stack

Frontend:

- React
- TypeScript
- Vite
- Tone.js for audio
- SVG or Canvas for the plant rendering
- CSS modules, vanilla CSS, or a small styling layer

Backend:

- Node.js with a small API
- PostgreSQL via Supabase, Neon, or similar hosted provider
- WebSocket or server-sent events only after the core loop works

Hosting:

- Vercel, Render, Fly.io, or Railway
- Use the simplest deployment path that supports a frontend, API, and database

Data model:

- Seeded plants should be reproducible from a share code
- Mutable plant state should live in backend storage once persistence is introduced
- Local storage is acceptable for the first proof of concept

## Product Loop

1. A plant is generated from a deterministic seed.
2. The plant has a pot, color palette, leaves, and sonic traits.
3. The user taps leaves to play sound.
4. The user waters the plant.
5. Water changes plant health, tuning stability, and visual state.
6. Repeated care unlocks a new leaf or minor feature.
7. The user can share the plant.

## MoSCoW Scope

### Must Have

- Mobile-first playable web app
- Deterministic plant generation from a seed
- One plant on screen with soft 2D botanical styling
- Tappable leaves that trigger sound
- Each leaf maps to a pitch and visual identity
- Plant health state: dry, okay, thriving
- Water interaction that changes health
- Health affects tuning or audio stability
- Persistent plant state using local storage or backend storage
- Shareable plant URL or share code
- Basic deployed environment
- README with setup, architecture notes, and portfolio framing

### Should Have

- Backend API for saving plants
- Anonymous user identity or device identity
- Plant state persisted across devices when opened from share link
- Pot traits that affect delay, reverb, or other time effects
- Color traits that affect tone, saturation, or modulation
- Simple progression: new leaf appears after enough care
- Lightweight activity log or event history
- Responsive desktop and mobile layouts
- Basic tests around plant generation and state transitions
- Clear architecture diagram in docs

### Could Have

- Shelf unlocked after earning or adding a pot
- Multiple plants per user
- Simple collaborative watering or visiting
- Live multi-user presence on a shared plant
- Hidden interactions and easter eggs
- Plant clippings to create a related plant
- Transplanting into different pots
- Marketplace or inventory for small add-ons
- Pattern memory that behaves like an organic sequencer
- 3D flourish on tap or rotate using CSS transforms, Three.js, or layered SVG
- Export or record a short audio clip
- Web Audio graph visualization

### Won't Have For MVP

- User accounts with passwords
- MIDI input
- Complex marketplace economy
- Full multiplayer synchronization
- Advanced 3D plant modeling
- Native mobile app
- Large asset pipeline
- Custom Rust or WASM audio engine
- Social feed

## Proof Of Concept Build Slice

The first proof of concept should be intentionally small:

- A Vite React app
- One generated plant
- Three to five tappable leaves
- Tone.js synth sound on tap
- Water button or water gesture
- Health meter represented visually, not as a heavy dashboard
- Local storage persistence
- Deployed URL that works on a phone

This proves the emotional and technical core before investing in backend complexity.

## Portfolio Architecture Narrative

The case study should explain the system as a product engineering problem:

- Seeded generation: deterministic plants from compact share codes
- Interaction model: touch gestures mapped to audio parameters
- State model: plant health, growth, hydration, and unlocks
- Audio model: plant anatomy mapped to synthesis and effects
- Persistence model: local-first state evolving into backend-backed state
- Multi-user roadmap: visits, collaborative care, and live shared interactions
- Agent workflow: using coding agents as implementation collaborators while retaining product and architectural ownership

## MVP Data Concepts

Plant:

- id
- seed
- owner/device id
- created at
- updated at
- hydration
- health
- growth stage
- pot type
- color palette
- leaves

Leaf:

- id
- index
- pitch
- size
- shape
- color
- unlocked
- interaction count

Care event:

- id
- plant id
- event type
- created at
- metadata

## Backend Learning Goals

The backend should be simple enough to ship but real enough to discuss in interviews.

Good learning targets:

- API design
- Database schema and migrations
- Deployment environment variables
- Server-side validation
- Share links and public/private state
- Basic rate limiting or abuse prevention
- Optional real-time updates

Avoid turning the MVP into a backend infrastructure project before the toy feels good.

## First Technical Milestones

1. Create Vite React TypeScript app.
2. Render a generated plant from a hardcoded seed.
3. Add Tone.js and unlock audio from user interaction.
4. Map leaves to pitches.
5. Add hydration and health state.
6. Persist state locally.
7. Add shareable seed URL.
8. Deploy and test on phone.
9. Add a small backend save API.
10. Write README and portfolio case-study notes.

## Open Questions

- Should the proof of concept start with SVG, Canvas, or a DOM/CSS illustration?
- Should backend persistence wait until after the mobile proof of concept?
- What is the first unlock: new leaf, pot, shelf, or share link?
- How mysterious should the UI be before it becomes frustrating?
- Should the plant continue changing with real elapsed time, or only through user interaction?
- Should shared plants be editable by anyone with the link, or only visitable/playable?

