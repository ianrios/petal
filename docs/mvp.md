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

- Vercel for the app and API
- Supabase for hosted Postgres
- Use the simplest deployment path that supports mobile testing early

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

## Progression Model

The first user state is intentionally small and mysterious: one visible leaf with a stem fading or blurring into the background where a pot will eventually appear.

As the plant grows:

1. A new leaf unlocks.
2. The view zooms out slightly.
3. More of the stem becomes visible.
4. The pot is eventually revealed.
5. Later growth reveals the shelf and multi-plant affordances.

The interface can be mysterious because Ian is the first user and product tester. Frustration should be tuned through playtesting rather than over-explaining the UI upfront.

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

## Share And Fork Model

Shared plants should fork instead of mutating the original.

When someone opens a shared plant, they receive a cloned copy from that plant's shared version. The original owner can continue playing with their plant independently, and the recipient's care history diverges from that point.

This should feel like a lightweight version of Git branches or budget scenario versions:

- Original plant keeps its own timeline
- Shared version becomes a history node
- Recipient creates a fork from that node
- Future backend versions can support pulling back or revisiting older plant versions

## Time Model

Plants should change based on real elapsed time.

For MVP, use timestamp-based calculation on load and interaction instead of background jobs:

- After a few minutes, the plant is only slightly different
- After a day, the plant is meaningfully different
- After a week, the plant is dramatically different

This creates the feeling of a living plant while keeping the backend simple.

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

## Decisions

- Start with SVG or DOM/SVG hybrid for the first plant; defer Canvas until interaction or rendering complexity requires it.
- Backend persistence should wait until after the mobile proof of concept feels good.
- The first unlock is a new leaf.
- The pot is hidden at first and revealed through zoomed-out growth progression.
- The shelf appears later after enough growth or after pot progression.
- The UI can be mysterious and tuned through Ian's own playtesting.
- Plants change with real elapsed time.
- Shared plants fork into cloned copies instead of mutating the original.
- The first proof of concept should use generated SVG React components, with plant geometry produced from seed data.
- The first backend version should use a Vercel API layer in front of Supabase for saves, loads, and forks.
- Early history nodes should be automatic only.

## Tunable Defaults

These are working defaults, not permanent rules.

Rendering:

- Use SVG React components for the plant.
- Keep generation logic in `packages/core`.
- Defer Canvas until SVG becomes limiting.
- Defer Three.js until the small 3D flourish has a clear interaction need.

Backend access:

- Local proof of concept can be client-only.
- First backend pass should use Vercel API routes.
- Supabase direct client access can be used later for anonymous auth or real-time features if row-level security is clear.

Elapsed time:

- Minutes: slight posture, color, or tuning drift.
- One day: visible hydration change and more audible tuning drift.
- One week: dramatic dry or overgrown state.
- Growth should come from both care and elapsed time, but neglect should shape the plant too.

Pot effect:

- First pot effect should be a gentle delay/reverb blend.
- Delay gives rhythmic character.
- Reverb gives peaceful plant-space character.
- More exotic effects like chorus, ring modulation, wave folding, and saturation should come later through plant color or rare traits.

History:

- Automatically create history nodes for share, fork, new leaf, pot reveal, and shelf reveal.
- Do not version every tap or water event.
- Manual snapshots can be added later if the history UI becomes interesting.
