# Petal: Agent Workflow & Setup Guide

Petal is a web-based plant tamagotchi and musical sound toy. Each plant is generated from a seed, grows through care, and becomes playable through its leaves as musical notes.

## Quick Start

### First Time Setup

```bash
# 1. Ensure Node 24.15.0+ is installed
./scripts/setup.sh

# 2. Start the dev server
pnpm dev

# 3. Open in browser
# Main app: http://localhost:5173
# Admin dashboard: http://localhost:5173/admin
```

If `setup.sh` fails on Node version, see **Node Version** section below.

## Node Version

**Required:** Node 24.15.0 or later (specified in `.nvmrc` and `package.json` engines field).

### Setup Options

**Option 1: Using nvm (Recommended)**

```bash
nvm install 24.15.0
nvm use 24.15.0
```

**Option 2: Using direnv (Best for the team)**

```bash
# Install direnv first: https://direnv.net/
direnv allow
# Node version auto-switches when you cd into project
```

**Option 3: Using Homebrew**

```bash
brew install node@24
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
```

**Tip:** If agents keep needing the PATH export, ensure direnv is installed and `.envrc` is allowed.

## Project Structure

```
apps/web/                 # Vite React app
packages/core/            # Plant generation logic (shared package)
docs/                     # Design docs, stories, architecture notes
scripts/                  # Setup and utility scripts
.envrc                    # direnv config (Node version auto-switch)
CLAUDE.md                 # This file
```

## Agent Workflow

### Starting a Session

1. Run `./scripts/setup.sh` to check Node version and install deps
2. Start dev server: `pnpm dev`
3. Open http://localhost:5173 (main app) or http://localhost:5173/admin (testing)

### Understanding the App Structure

- **Main app (`/`)**: Users land here, get auto-generated plants, interact with them
- **Admin dashboard (`/admin`)**: For Ian to test generation with specific seeds, tweak parameters, verify determinism
- **packages/core**: Pure plant generation logic, tests, types—used by both web app and can be reused elsewhere

### Key Files for Agents

**Plant Generation** (immutable, well-tested):

- `packages/core/src/generate.ts` — main `generatePlant(seed)` function
- `packages/core/src/types/plant.ts` — all Plant and Leaf types
- `packages/core/src/generate.test.ts` — 24 tests, 91.89% coverage

**Web App Integration**:

- `apps/web/src/Router.tsx` — routing setup
- `apps/web/src/hooks/usePersistence.ts` — UUID and localStorage management
- `apps/web/src/hooks/usePlant.ts` — generates plant from seed
- `apps/web/src/views/AdminDebugView.tsx` — Ian's testing dashboard

**Design & Architecture**:

- `docs/plant-design.md` — trait definitions, audio mapping, growth mechanics
- `docs/persistence-model.md` — UUID flow, storage strategy
- `docs/stories/PETAL-002-deterministic-plant-seed.md` — current story details

## Quality Gates

All these must pass before committing:

```bash
pnpm build          # Compile packages/core and web app
pnpm typecheck      # TypeScript check across workspace
pnpm lint           # ESLint (strict type-aware rules)
pnpm format:check   # Prettier formatting
pnpm test           # All tests (packages/core and apps/web)
pnpm test:coverage  # Coverage must stay ≥80% on packages/core
```

Pre-push hook runs the full suite automatically.

## Common Tasks for Agents

### Adding a New Workspace Package

When creating a new package (e.g., `packages/api`):

1. **TypeScript config**: Set `declaration: true` in tsconfig.json so other packages can consume it
2. **ESLint**: Add package `dist/` and test files to exclusions in root `eslint.config.js`:
   ```js
   ignores: [
     'packages/yourpkg/dist/**',
     'packages/yourpkg/**/*.test.ts',
     // ...
   ];
   ```
3. **Build output**: Use `module: "esnext", target: "esnext"` for ESM output (web compatibility)
4. **Test config**: Use `vitest.config.ts` with v8 coverage provider, 80% threshold

### Modifying package.json

After adding/removing dependencies:

```bash
pnpm install       # Updates pnpm-lock.yaml
# If locked-file errors occur:
pnpm install --no-frozen-lockfile
```

### Running the Dev Server

```bash
pnpm dev           # Starts Vite with hot reload
# Prints local and network URLs for phone testing
# Press 'q' to quit
```

### Running Tests

```bash
pnpm test          # Run all tests once
pnpm test --watch  # Watch mode for active development
pnpm test:coverage # Coverage report (packages/core: 91.89%, threshold: 80%)
```

### Checking/Fixing Code Style

```bash
pnpm lint          # Find issues
pnpm lint --fix    # Fix what you can
pnpm format        # Auto-format all files (Prettier)
```

## What Ian Tests & Approves

- **Admin dashboard behavior**: Ian tests `/admin` to verify plant generation with specific seeds
- **Generation consistency**: Same seed → identical plants, different seeds → different traits
- **Trait ranges**: Leaf counts, hue, saturation, etc. feel right for musical instruments
- **Interaction patterns**: Does tapping a leaf make sense given position/size?

Agents should NOT make generation changes without running the app and having Ian test them first.

## Known Constraints & Decisions

### Why `packages/core` is a shared package

Plant generation is pure, deterministic, and can be reused in tests, CLI tools, or a future backend API. Putting it in a shared package prevents duplication.

### Why no automatic plant creation on load yet

Current behavior: UUIDs are generated but no plant object. This is intentional for PETAL-002. Once Ian approves the generation approach (via testing `/admin`), PETAL-003 will add:

- Visual rendering
- Auto-plant creation on `/ ` load
- Audio synthesis

### Plant UUID = Seed (Currently)

The plant's `id` field is the same as its `seed`. This is simpler and works for MVP. If we later need to fork/inherit plants, we can add a `parentSeed` field without changing this design.

## Troubleshooting

**"pnpm: command not found"**

- Run `./scripts/setup.sh` or ensure Node 24 is active

**"Cannot find module '@petal/core'"**

- Run `pnpm install` in root
- Ensure `packages/core/dist/` exists (run `pnpm build`)

**Tests fail on import errors**

- Clear node_modules: `rm -rf node_modules && pnpm install`
- Rebuild packages: `pnpm build`

**ESLint errors about missing files**

- Likely a new workspace package. Check `eslint.config.js` ignores section.
- Add the package's `dist/` and test file patterns to the ignores.

**Typecheck errors in new package**

- Update root `tsconfig.json` references:
  ```json
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/yourpkg" },  // Add this
    { "path": "./apps/web" }
  ]
  ```

## Links & References

- **GitHub**: https://github.com/ianrios/petal (if public)
- **Design & Product**: See `docs/` directory
- **Current Sprint**: `docs/stories/PETAL-002-deterministic-plant-seed.md`
- **Backlog**: `backlog.md`

## For Future Agents

When you finish a story:

1. **Update backlog.md** — move story from "In Progress" → "Done"
2. **Update the story file** — set Status to `Done`, add any "Out of Scope" notes
3. **Update this CLAUDE.md** — if you discover new gotchas or constraints
4. **Leave notes** — create a `PETAL-XXX-NOTES.md` file with what was deferred and why (see `PETAL-002-NOTES.md` for example)

The goal is to make the next agent's job easier.
