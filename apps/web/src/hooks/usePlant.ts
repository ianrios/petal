import { useMemo } from 'react';
import { generatePlant, type Plant } from '@petal/core';

export function usePlant(seed: string): Plant | null {
  return useMemo(() => {
    try {
      return generatePlant(seed);
    } catch (error) {
      console.error('Failed to generate plant:', error);
      return null;
    }
  }, [seed]);
}
