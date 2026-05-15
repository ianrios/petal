export type LeafShape = 'round' | 'oval' | 'elongated' | 'pointy';
export type GrowthPattern = 'tight_rosette' | 'loose' | 'trailing';
export type PlantScale = 'small' | 'medium' | 'large';
export type PitchClass = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

export interface Color {
  h: number;
  s: number;
  l: number;
}

export interface Leaf {
  index: number;
  shape: LeafShape;
  size: number;
  pitchClass: PitchClass;
  color: Color;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotation: number;
}

export interface Plant {
  id: string;
  seed: string;
  createdAt: number;
  leafCount: number;
  stemThickness: number;
  baseHue: number;
  saturation: number;
  growthPattern: GrowthPattern;
  scale: PlantScale;
  leaves: Leaf[];
}
