# PETAL-002 Implementation Notes

## Completed

✅ Created `packages/core` with full plant generation logic  
✅ Seeded PRNG implementation using `seedrandom`  
✅ Deterministic trait generation (24 unit tests, 91.89% coverage)  
✅ Integrated plant generation into web app with UUID persistence  
✅ Created `/admin` debug view with generation history and plant trait display  
✅ Added React Router for `/admin` route  
✅ All quality gates passing: build, typecheck, lint, format, test, coverage

## Deferred / Not Implemented (For Future Stories)

### PETAL-002 was intentionally scoped to NOT include:

- **Visual rendering**: No SVG/Canvas rendering (comes in PETAL-003)
- **Audio synthesis**: No Tone.js integration (comes in PETAL-003)
- **Plant persistence to backend**: Only localStorage implemented (comes in PETAL-009+)
- **Share link handling**: URL-based plant sharing deferred (comes in PETAL-008)
- **Growth/decay logic**: Time-based plant changes not implemented yet (comes in PETAL-004+)
- **Initial plant creation on load**: UUIDs generated but no automatic plant creation yet

### Web app test coverage:

- `packages/core` has strong coverage (91.89% overall, 100% for generate.ts)
- Web app components have minimal test coverage (hooks and views not yet tested)
  - This is acceptable for MVP—generation logic is proven solid
  - Component tests can be added as the UI matures

## Known Unknowns / Questions for Ian

### Plant generation details:

1. **Initial plant on app load**: Currently UUIDs are generated but no plant is auto-created on first load. Should we:
   - Auto-generate a plant UUID and plant object on first load?
   - Or wait for user to click "Create Plant"?
   - Or populate from URL if present, otherwise wait for user action?

2. **localStorage vs database**: Persistence currently uses localStorage. When PETAL-009 adds local database, should:
   - All data move to IndexedDB/SQLite?
   - Or keep UUIDs in localStorage and plants in database?
   - Any specific structure preferences?

3. **Plant UUID generation**: Currently plant UUID = seed (they're identical). Should they be separate, or is this approach fine?

### Debug view iteration:

The `/admin` view is functional but minimal. As you test generation, we can add:

- Comparison views (side-by-side leaf data for different seeds)
- CSV export of trait values
- Visual preview of plant (when rendering is added)
- Seed input with URL generation for easy sharing

## Architectural Decisions Made

### packages/core structure:

```
src/
  types/plant.ts          # All type definitions
  prng.ts                 # Seeded RNG utilities
  generate.ts             # Main generatePlant() function
  index.ts                # Barrel export
  generate.test.ts        # 24 tests, 100% coverage of core logic
```

**Rationale**: Modular structure makes it easy for future agents to find what they need and extend (e.g., adding plant splicing, inheritance logic).

### usePersistence hook:

Initializes state with a function rather than effects to avoid cascading renders. Follows React 19 patterns.

### Admin view design:

- Intentionally simple (text/numbers, no visuals yet)
- History keeps last 5 generations for easy comparison
- Perfect for testing seed determinism as you iterate

## Next Steps for Ian (Before PETAL-003)

1. **Test `/admin` view**:
   - Navigate to `http://localhost:5173/admin`
   - Generate several plants with same seed—verify they're identical
   - Generate plants with different seeds—verify traits vary

2. **Review generation approach**:
   - Do the base traits feel right? (leaf count, stem thickness, hue, saturation, etc.)
   - Are per-leaf traits structured well for future audio mapping?
   - Do you want to adjust any trait ranges or distributions?

3. **Clarify unknowns** (above) so we can finalize PETAL-003 approach

4. **Approved for PETAL-003** once you verify generation logic and approve the approach

## Files Modified

- Created: `packages/core/` (6 source files + tsconfig, vitest config, package.json)
- Created: `apps/web/src/hooks/usePersistence.ts`, `usePlant.ts`
- Created: `apps/web/src/views/AdminDebugView.tsx`
- Created: `apps/web/src/Router.tsx`, `src/styles/admin.css`
- Modified: `apps/web/src/main.tsx` (added Router)
- Modified: Root `package.json`, `tsconfig.json`, `eslint.config.js`
- Created: `docs/persistence-model.md`, `docs/plant-design.md`

Total: ~1500 lines of new code + types + tests + styles
