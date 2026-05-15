# Persistence Model

## Overview

Petal uses a session-based UUID model with no authentication. Each user gets a unique session identity, and plants can be published to a marketplace ("the Greenhouse") for sharing.

## Key Entities & UUIDs

### User UUID

- Generated on first app load
- Stored in `sessionStorage` or `localStorage`
- Persists for the browser session (or longer if localStorage used)
- Ties all plants and shelf activity to an owner
- Anonymous—no login required
- User can manually clear it for testing; otherwise persists indefinitely

### Shelf UUID

- Generated on first app load (same load as user UUID)
- One per user session
- Contains up to 3 plants initially
- Stored locally alongside user UUID
- Plants on the shelf are "private" until shared

### Plant UUID

- Generated when a plant is created (first load or via "new plant" action)
- Deterministic given a seed: same seed **always** produces same plant UUID (for testing/reproducibility)
- **Not exposed in URL** until the plant is shared externally
- Once shared, the plant UUID appears in the shareable link

## Persistence Flow

### First Load

1. App checks for user UUID in storage
2. If missing: generate user UUID and shelf UUID, store both
3. Check if URL contains a plant UUID (share link)
   - If yes: load that plant from marketplace and fork it to user's shelf
   - If no: generate a new plant, add it to the shelf
4. Render the plant

### Returning User

1. App checks for user UUID in storage
2. If found: load user's shelf and plants from storage
3. If URL has a plant UUID: optionally show merge/fork dialog
4. Render the user's shelf or specific plant

### Sharing a Plant

1. User triggers "share" on a plant in their shelf
2. Plant is uploaded to marketplace (Greenhouse)
3. Plant UUID is now public and exposed in shareable URL
4. Anyone who opens the link gets a fork of that plant added to their shelf

## Data Storage Timeline

**PETAL-002 (now):** Local storage only. Plants and UUIDs live in `localStorage`/`sessionStorage`.

**PETAL-009 (Local Persistence):** Upgrade to a proper local database layer.

**PETAL-010+ (Supabase):** Backend persistence and marketplace sync. At that point, plants can be queried from the Greenhouse instead of being embedded in localStorage.

## Implementation Notes

- Keep the UUID model simple and explicit in the code—don't hide it behind an abstraction
- Plant generation should accept an optional seed; if missing, generate a UUID to use as the seed
- Tests should seed plants deterministically to prove UUID → plant consistency
- The URL share flow comes in PETAL-008; for now, focus on generating and storing UUIDs correctly
