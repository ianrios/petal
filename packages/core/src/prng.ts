import seedrandom from 'seedrandom';

export type RandomFunction = () => number;

export function createSeededRandom(seed: string): RandomFunction {
  return seedrandom(seed);
}

export function randomInt(rng: RandomFunction, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randomRange(rng: RandomFunction, min: number, max: number): number {
  return rng() * (max - min) + min;
}

export function randomChoice<T>(rng: RandomFunction, choices: readonly T[]): T {
  const index = Math.floor(rng() * choices.length);
  return choices[index];
}

export function randomGaussian(rng: RandomFunction, mean: number, stdDev: number): number {
  let u1 = 0;
  let u2 = 0;
  while (u1 === 0) u1 = rng();
  while (u2 === 0) u2 = rng();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}
