# Plant Design

## Overview

Plants are deterministic musical organisms. Each plant is generated from a seed and has visual traits that map directly to auditory and interactive characteristics. Plants grow and decay over time, changing both visually and sonically.

## Core Trait Model

All plants start with a **fixed set of initial traits** generated from the seed. These traits are the foundation for audio, visuals, and interaction.

### Base Traits (Generated at Plant Creation)

Each plant has:

- **leaf_count**: number of leaves (fixed at generation, grows through care)
- **leaf_shape**: shape archetype (round, oval, elongated, pointy—discrete, but with continuous variation per leaf)
- **stem_thickness**: stem width (affects visual rendering and reverb character)
- **base_hue**: color hue in HSL space (affects tone timbre and saturation)
- **color_saturation**: saturation level (affects tone character)
- **growth_pattern**: rosette structure (tight vs. loose spacing)
- **scale**: plant size (small, medium, large—affects overall pitch range)

### Per-Leaf Traits

Each leaf has:

- **index**: leaf position in the plant (0 to leaf_count-1)
- **size**: leaf size in relative units (maps to pitch: larger = lower pitch)
- **pitch_class**: note (C, D, E, F, G, A, B) derived from plant scale and leaf size
- **color**: RGB or HSL derived from base_hue and per-leaf variation
- **position_x, position_y**: 2D position on the plant (for tap zones)
- **position_z**: depth in 3D space (plants render 2D but can rotate)
- **rotation**: angle in 3D space (affects how the leaf orients)

## Audio Mapping

### Pitch

- **Leaf size → pitch**: larger leaves = lower pitch
- Plant **scale** determines the overall octave range (e.g., middle C to C octave for a "medium" plant)
- **Growth**: as the plant grows, new leaves are added at the low end, expanding the pitch range downward

### Timbre & Tone Character

- **Base hue** → synth waveform or oscillator type (e.g., warm/woody vs. bright/metallic)
- **Saturation** → effect intensity (chorus, ring mod, saturation)
- **Pot type** → time effects (delay, reverb)

### Spatial Interaction (Leaf Tap Zones)

When a user taps a leaf:

- **Distance from stem**: determines decay/resonance character
  - Close to stem (center): short, knocky sound
  - Far from tip: long decay, resonance
- **Position on leaf (X-axis, tip to base)**: affects envelope shape or filter sweep
- **Leaf rotation in 3D space**: affects stereo pan or effect routing
- The same leaf tapped from different angles (after rotating the plant) produces different timbre variations

This means:

- Same plant can sound different at different angles (rich variation)
- Same seed + same tap always produces consistent results (deterministic)
- Users explore the plant by rotating and tapping

### Health & Tuning

- **Healthy plant**: in tune, stable pitch
- **Dry plant**: slight detuning, pitch instability, reduced resonance
- **Overgrown/overfed**: pitch can rise or shimmer, more aggressive character
- **Dying plant**: significant detuning, loss of leaves (especially large ones first), distortion or bitcrushing in tone

## Growth & Decay

### Initial State

- Plant starts with a fixed number of leaves (e.g., 5–7)
- These are the only leaves visible at plant creation

### Growth Through Care

- With sufficient water and light, the plant gains a new leaf every N time intervals or care actions
- New leaves are added to the rosette (might be smaller or at a different angle)
- Each new leaf adds a new note to the plant's range

### Decay Through Neglect

- With insufficient water, leaves start to look shriveled (visual change)
- The plant loses leaves, starting with the **largest leaves first**
- Each lost leaf removes a note from the pitch range
- Visual decay: color desaturates, leaves curl or wilt

### Time-Based Changes

- **Minutes**: subtle pitch drift, slight color variation
- **Hours**: visible hydration change, audible tuning drift
- **Days**: dramatic change in growth or decay progression
- **Weeks**: plant either thriving (multiple new leaves) or dying (mostly stems)

## Visual Representation

Plants are rendered as **succulents** with the following visual features:

- **Rosette structure**: leaves arranged around a central stem
- **Leaf anatomy**: each leaf has a base (attachment to stem), body, and tip
- **Stem**: visible at center, thickness affects overall appearance
- **Color palette**: derived from base_hue with per-leaf saturation and brightness variation
- **Pot**: revealed later through growth progression (out of scope for PETAL-002)
- **3D rotation**: plants can be rotated to show depth; visual rotation is smooth but leaves' interaction zones update to match

## Trait Inheritance & Splicing (Future)

When two plants are "spliced" together (cross-propagation):

- Create a new plant from a blend of both parent traits
- **Discrete traits**: pick one or the other (e.g., leaf_shape from parent A)
- **Continuous traits**: interpolate (e.g., base*hue = 0.6 * hue*A + 0.4 * hue_B)
- As the new plant grows, continuous traits can drift and stabilize, creating a unique sonic personality

## Randomness & Determinism

### Seed-Driven Generation

- All traits are derived from a single seed value
- Same seed → same plant (every time)
- Uses a seeded PRNG (seedrandom library) to ensure consistency

### Variation Without Cloning

- Within the discrete traits, each individual leaf gets **slight continuous variation** (±5–10% of base)
- Two plants with identical seeds will have the same leaf count, shapes, and colors
- But leaves might have slightly different sizes or slight color shifts per-leaf to create organic feel
- This means: identical twins aren't boring, and slight randomness doesn't break determinism

## Notes for Implementation

- **Generation happens in `packages/core`**: the plant generator takes a seed and returns a fully-specified plant object
- **Rendering happens in the app**: SVG/Canvas converts the plant object into visuals
- **Audio synthesis happens in Tone.js**: leaf tap data (position, size, rotation) are passed to a synth configured from plant traits
- **Time-based changes**: calculate based on created_at and current time, not background jobs
- **Tests should verify**: same seed → identical plant objects, leaf indices → consistent pitches, decay order is predictable
