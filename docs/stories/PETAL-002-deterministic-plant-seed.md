# PETAL-002: Deterministic Plant Seed

Status: `Done`

## Product Goal

Enable every feature after this (rendering, interaction, growth, sharing) by building the deterministic plant generation engine. When a user opens Petal, they receive a unique plant generated from a seed. That same seed always produces the same plant. This is the foundation of the entire product.

## User Story

As a Petal user, I want a plant generated from a seed so that I can return later and see the same plant, and so I can share a plant with someone else by sharing a URL that produces an identical plant.

## Acceptance Criteria

- Plant generation lives in `packages/core/` and exports a pure function: `generatePlant(seed: string): Plant`
- A Plant object contains all trait data: leaf count, shapes, colors, spatial positions, etc. (see `plant-design.md`)
- Same seed input produces identical Plant output (deterministic)
- Plant generation uses a seeded PRNG (seedrandom) for all randomization
- A plant is generated on app load if no seed is present in the URL
- Generated plants are stored in localStorage with user/shelf/plant UUIDs (see `persistence-model.md`)
- Unit tests prove determinism: running the generator 10 times with the same seed produces identical results
- Code coverage remains ≥80%
- `/admin` debug view displays generated plant traits (text/number) so Ian can iterate and verify generation logic
- All quality gates pass: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm test:coverage`

## Technical Notes

### Plant Generation (`packages/core`)

1. **Seeded PRNG**: Use `seedrandom` library to create a deterministic random number generator from a seed string
2. **Trait Generation**: From the seeded RNG, generate all plant traits:
   - Base traits: leaf count, stem thickness, base hue, saturation, growth pattern, scale
   - Per-leaf traits: size, pitch class, color, 2D/3D position, rotation
   - Randomization: use slight continuous variation per-leaf (±5–10%) so identical seeds aren't boring, but determinism is preserved
3. **Data Structure**: Return a plant object with shape like:

   ```typescript
   interface Plant {
     id: string;
     seed: string;
     createdAt: number;
     leafCount: number;
     stemThickness: number;
     baseHue: number;
     saturation: number;
     growthPattern: string;
     scale: string;
     leaves: Leaf[];
   }

   interface Leaf {
     index: number;
     shape: string;
     size: number;
     pitchClass: string;
     color: { h: number; s: number; l: number };
     positionX: number;
     positionY: number;
     positionZ: number;
     rotation: number;
   }
   ```

### App Integration (`apps/web`)

1. **UUID Generation on Load**:
   - Check localStorage for `userId`, `shelfId`
   - If missing: generate both (use `crypto.randomUUID()`)
   - Store both in localStorage
2. **Plant Seed Generation**:
   - Check URL for a plant UUID (shareable link—PETAL-008 feature)
   - If not in URL: generate a new plant UUID and use it as the seed
   - Call `generatePlant(plantSeed)` to create the plant object
   - Store in localStorage under the shelf
3. **No Visual Rendering Yet**:
   - Don't build SVG/Canvas rendering in this story
   - Just prove generation works via tests and debug view

### Debug View (`/admin`)

1. Add an `/admin` route that displays a debug panel
2. Show the generated plant's traits as plain text/numbers:

   ```
   Plant ID: abc-123-def
   Seed: abc-123-def
   Leaf Count: 7
   Stem Thickness: 2.3
   Base Hue: 120
   Saturation: 65
   Growth Pattern: tight_rosette
   Scale: medium

   Leaves:
   0: oval, size=1.2, pitch=C4, color=#abc123, pos=(10, 20, 0), rot=0.5
   1: round, size=0.8, pitch=D4, color=#def456, pos=(30, 5, 0.2), rot=1.2
   ...
   ```

3. Include a "Generate New Plant" button to test generation multiple times
4. Store generation history (last 5 generations) so Ian can compare and verify consistency

## Out Of Scope

- Visual rendering (SVG/Canvas)—comes in PETAL-003
- Audio synthesis or pitch mapping—comes in PETAL-003
- Plant persistence to a backend/database—comes in PETAL-009+
- Share link handling—comes in PETAL-008
- Growth or decay logic—comes in PETAL-004 and beyond
- Authentication or user accounts

## Test Plan

1. **Determinism Test**: Generate the same plant 10 times with the same seed; assert all outputs are identical
2. **Variant Test**: Generate plants with different seeds; assert outputs differ
3. **Trait Bounds Test**: Verify generated traits stay within expected ranges (leaf count 4–12, hue 0–360, etc.)
4. **Per-Leaf Variation Test**: Verify that identical seeds produce identical leaf arrays, including per-leaf randomization
5. **Coverage**: All generation logic should be tested; aim for ≥80% coverage on `packages/core`

Example test structure:

```typescript
describe('plant generation', () => {
  it('generates identical plants from the same seed', () => {
    const seed = 'test-seed-123';
    const plant1 = generatePlant(seed);
    const plant2 = generatePlant(seed);
    expect(plant1).toEqual(plant2);
  });

  it('generates different plants from different seeds', () => {
    const plant1 = generatePlant('seed-1');
    const plant2 = generatePlant('seed-2');
    expect(plant1).not.toEqual(plant2);
  });

  it('respects leaf count bounds', () => {
    const plant = generatePlant('test-seed');
    expect(plant.leafCount).toBeGreaterThanOrEqual(4);
    expect(plant.leafCount).toBeLessThanOrEqual(12);
  });
});
```

## Human Review Plan

- **Local dev setup**: Agent sets up `packages/core` and the app's plant generation hook, runs the dev server
- **Admin view**: Ian opens `/admin` and triggers "Generate New Plant" multiple times, verifies:
  - Plant IDs are unique each generation
  - Traits vary appropriately (different seeds = different plants)
  - Same seed in URL always produces the same plant (copy-paste the URL or use a bookmark)
  - Numbers stay in reasonable ranges (leaf count 4–12, hue 0–360, etc.)
- **Code walkthrough**: Agent explains the seeded PRNG flow and trait generation logic
- **Tests pass**: Ian verifies `pnpm test` and `pnpm test:coverage` pass with ≥80% coverage
- **Quality gates**: Agent runs full local QA: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm test:coverage`
- **Approval**: Ian reviews the generation approach before PETAL-003 (rendering) begins

## Review Notes

- Does the generation approach feel clean and easy to extend later (for splicing, etc.)?
- Are the base traits and per-leaf traits well-structured for future audio/visual mapping?
- Is the code comment minimal but the trait names self-explanatory?
- Can Ian imagine tapping these generated leaves and hearing music from their position and size?
- Does the debug view make it easy to iterate and understand the generation logic?
