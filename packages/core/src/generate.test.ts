import { describe, it, expect } from 'vitest';
import { generatePlant } from './generate';
import type { Plant } from './types/plant';

describe('plant generation', () => {
  describe('determinism', () => {
    it('generates identical plants from the same seed', () => {
      const seed = 'test-seed-123';
      const plant1 = generatePlant(seed);
      const plant2 = generatePlant(seed);
      expect(plant1).toEqual(plant2);
    });

    it('generates identical plants from the same seed over 10 iterations', () => {
      const seed = 'determinism-test-seed';
      const plants = Array.from({ length: 10 }, () => generatePlant(seed));
      const firstPlant = plants[0];
      plants.forEach((plant) => {
        expect({
          ...plant,
          createdAt: firstPlant.createdAt,
        }).toEqual(firstPlant);
      });
    });

    it('generates different plants from different seeds', () => {
      const plant1 = generatePlant('seed-alpha');
      const plant2 = generatePlant('seed-beta');
      expect(plant1).not.toEqual(plant2);
    });
  });

  describe('trait bounds and structure', () => {
    it('generates leaf count within bounds', () => {
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(plant.leafCount).toBeGreaterThanOrEqual(5);
        expect(plant.leafCount).toBeLessThanOrEqual(10);
      }
    });

    it('generates stem thickness within bounds', () => {
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(plant.stemThickness).toBeGreaterThanOrEqual(1.5);
        expect(plant.stemThickness).toBeLessThanOrEqual(3.5);
      }
    });

    it('generates base hue within valid range (0-360)', () => {
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(plant.baseHue).toBeGreaterThanOrEqual(0);
        expect(plant.baseHue).toBeLessThanOrEqual(360);
      }
    });

    it('generates saturation within valid range (40-80)', () => {
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(plant.saturation).toBeGreaterThanOrEqual(40);
        expect(plant.saturation).toBeLessThanOrEqual(80);
      }
    });

    it('has valid growth pattern', () => {
      const validPatterns = ['tight_rosette', 'loose', 'trailing'];
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(validPatterns).toContain(plant.growthPattern);
      }
    });

    it('has valid plant scale', () => {
      const validScales = ['small', 'medium', 'large'];
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(validScales).toContain(plant.scale);
      }
    });

    it('generates correct number of leaves', () => {
      for (let i = 0; i < 10; i++) {
        const plant = generatePlant(`seed-${i}`);
        expect(plant.leaves).toHaveLength(plant.leafCount);
      }
    });

    it('generates leaf indices in order', () => {
      const plant = generatePlant('seed-with-leaves');
      plant.leaves.forEach((leaf, idx) => {
        expect(leaf.index).toBe(idx);
      });
    });
  });

  describe('leaf traits', () => {
    it('generates valid leaf shapes', () => {
      const validShapes = ['round', 'oval', 'elongated', 'pointy'];
      const plant = generatePlant('leaf-shape-seed');
      plant.leaves.forEach((leaf) => {
        expect(validShapes).toContain(leaf.shape);
      });
    });

    it('generates leaf sizes within reasonable bounds', () => {
      const plant = generatePlant('leaf-size-seed');
      plant.leaves.forEach((leaf) => {
        expect(leaf.size).toBeGreaterThan(0);
        expect(leaf.size).toBeLessThan(2);
      });
    });

    it('generates valid pitch classes', () => {
      const validPitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      const plant = generatePlant('pitch-seed');
      plant.leaves.forEach((leaf) => {
        expect(validPitches).toContain(leaf.pitchClass);
      });
    });

    it('generates leaf colors with valid HSL values', () => {
      const plant = generatePlant('color-seed');
      plant.leaves.forEach((leaf) => {
        expect(leaf.color.h).toBeGreaterThanOrEqual(0);
        expect(leaf.color.h).toBeLessThanOrEqual(360);
        expect(leaf.color.s).toBeGreaterThanOrEqual(20);
        expect(leaf.color.s).toBeLessThanOrEqual(100);
        expect(leaf.color.l).toBeGreaterThanOrEqual(0);
        expect(leaf.color.l).toBeLessThanOrEqual(100);
      });
    });

    it('generates leaf positions and rotations', () => {
      const plant = generatePlant('position-seed');
      plant.leaves.forEach((leaf) => {
        expect(typeof leaf.positionX).toBe('number');
        expect(typeof leaf.positionY).toBe('number');
        expect(typeof leaf.positionZ).toBe('number');
        expect(leaf.positionZ).toBeGreaterThanOrEqual(-0.3);
        expect(leaf.positionZ).toBeLessThanOrEqual(0.3);
        expect(leaf.rotation).toBeGreaterThanOrEqual(0);
        expect(leaf.rotation).toBeLessThanOrEqual(2 * Math.PI);
      });
    });
  });

  describe('plant identity', () => {
    it('sets plant id to seed', () => {
      const seed = 'identity-seed';
      const plant = generatePlant(seed);
      expect(plant.id).toBe(seed);
      expect(plant.seed).toBe(seed);
    });

    it('sets createdAt to a valid timestamp', () => {
      const plant = generatePlant('timestamp-seed');
      expect(plant.createdAt).toBeGreaterThan(0);
      expect(plant.createdAt).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('genetic drift (slight variation)', () => {
    it('allows per-leaf saturation variation while maintaining determinism', () => {
      const seed = 'saturation-variation-seed';
      const plant1 = generatePlant(seed);
      const plant2 = generatePlant(seed);

      plant1.leaves.forEach((leaf1, idx) => {
        const leaf2 = plant2.leaves[idx];
        expect(leaf1.color.s).toBe(leaf2.color.s);
      });
    });

    it('allows per-leaf lightness variation while maintaining determinism', () => {
      const seed = 'lightness-variation-seed';
      const plant1 = generatePlant(seed);
      const plant2 = generatePlant(seed);

      plant1.leaves.forEach((leaf1, idx) => {
        const leaf2 = plant2.leaves[idx];
        expect(leaf1.color.l).toBe(leaf2.color.l);
      });
    });
  });

  describe('edge cases', () => {
    it('handles empty seed string', () => {
      const plant = generatePlant('');
      expect(plant).toBeDefined();
      expect(plant.leafCount).toBeGreaterThan(0);
    });

    it('handles very long seed string', () => {
      const longSeed = 'a'.repeat(1000);
      const plant = generatePlant(longSeed);
      expect(plant).toBeDefined();
      expect(plant.leafCount).toBeGreaterThan(0);
    });

    it('handles seeds with special characters', () => {
      const specialSeed = 'seed!@#$%^&*()[]{}';
      const plant = generatePlant(specialSeed);
      expect(plant).toBeDefined();
      expect(plant.leafCount).toBeGreaterThan(0);
    });

    it('handles seeds with unicode characters', () => {
      const unicodeSeed = 'seed-🌱-🌿-🍃';
      const plant = generatePlant(unicodeSeed);
      expect(plant).toBeDefined();
      expect(plant.leafCount).toBeGreaterThan(0);
    });
  });
});
