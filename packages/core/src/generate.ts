import {
  createSeededRandom,
  randomInt,
  randomRange,
  randomChoice,
  type RandomFunction,
} from './prng';
import type {
  Plant,
  Leaf,
  LeafShape,
  GrowthPattern,
  PlantScale,
  PitchClass,
  Color,
} from './types/plant';

const LEAF_SHAPES: readonly LeafShape[] = ['round', 'oval', 'elongated', 'pointy'];
const GROWTH_PATTERNS: readonly GrowthPattern[] = ['tight_rosette', 'loose', 'trailing'];
const PLANT_SCALES: readonly PlantScale[] = ['small', 'medium', 'large'];
// TODO: make chromatic
const PITCH_CLASSES: readonly PitchClass[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export function generatePlant(seed: string): Plant {
  const rng = createSeededRandom(seed);

  const leafCount = randomInt(rng, 5, 10);
  const stemThickness = randomRange(rng, 1.5, 3.5);
  const baseHue = randomInt(rng, 0, 360);
  const saturation = randomInt(rng, 40, 80);
  const growthPattern = randomChoice(rng, GROWTH_PATTERNS);
  const scale = randomChoice(rng, PLANT_SCALES);

  const leaves: Leaf[] = [];
  for (let i = 0; i < leafCount; i++) {
    leaves.push(generateLeaf(rng, i, baseHue, saturation, scale));
  }

  return {
    id: seed,
    seed,
    createdAt: Date.now(),
    leafCount,
    stemThickness,
    baseHue,
    saturation,
    growthPattern,
    scale,
    leaves,
  };
}

function generateLeaf(
  rng: RandomFunction,
  index: number,
  baseHue: number,
  baseSaturation: number,
  scale: PlantScale,
): Leaf {
  const shape = randomChoice(rng, LEAF_SHAPES);
  const baseSize = getBaseSizeForScale(scale);
  const sizeVariation = randomRange(rng, 0.7, 1.3);
  const size = baseSize * sizeVariation;

  const angle = (index / Math.max(1, Math.ceil(6))) * 2 * Math.PI;
  const radius = getRadiusForScale(scale);

  const positionX = Math.cos(angle) * radius;
  const positionY = Math.sin(angle) * radius;
  const positionZ = randomRange(rng, -0.3, 0.3);

  const rotation = randomRange(rng, 0, 2 * Math.PI);

  const leafPitchIndex = index % 7;
  const pitchClass = PITCH_CLASSES[leafPitchIndex];

  const saturationVariation = randomRange(rng, -10, 10);
  const color: Color = {
    h: baseHue,
    s: Math.max(20, Math.min(100, baseSaturation + saturationVariation)),
    l: randomRange(rng, 35, 60),
  };

  return {
    index,
    shape,
    size,
    pitchClass,
    color,
    positionX,
    positionY,
    positionZ,
    rotation,
  };
}

function getBaseSizeForScale(scale: PlantScale): number {
  switch (scale) {
    case 'small':
      return 0.7;
    case 'medium':
      return 1.0;
    case 'large':
      return 1.4;
  }
}

function getRadiusForScale(scale: PlantScale): number {
  switch (scale) {
    case 'small':
      return 20;
    case 'medium':
      return 30;
    case 'large':
      return 40;
  }
}
