import { useState } from 'react';

const STORAGE_KEYS = {
  USER_ID: 'petal_user_id',
  SHELF_ID: 'petal_shelf_id',
  CURRENT_PLANT_ID: 'petal_current_plant_id',
  PLANTS: 'petal_plants',
};

export interface StoredPlant {
  id: string;
  seed: string;
  createdAt: number;
}

export interface PetalState {
  userId: string;
  shelfId: string;
  currentPlantId: string;
  plants: StoredPlant[];
}

function generateUUID(): string {
  return crypto.randomUUID();
}

function initializePetalState(): PetalState {
  const storedUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const storedShelfId = localStorage.getItem(STORAGE_KEYS.SHELF_ID);
  const storedCurrentPlantId = localStorage.getItem(STORAGE_KEYS.CURRENT_PLANT_ID);
  const storedPlants = localStorage.getItem(STORAGE_KEYS.PLANTS);

  const userId = storedUserId ?? generateUUID();
  const shelfId = storedShelfId ?? generateUUID();
  const plants: StoredPlant[] = storedPlants ? (JSON.parse(storedPlants) as StoredPlant[]) : [];
  const firstPlant = plants[0];
  const currentPlantId = storedCurrentPlantId ?? (firstPlant ? firstPlant.id : generateUUID());

  const newState: PetalState = {
    userId,
    shelfId,
    currentPlantId,
    plants,
  };

  if (!storedUserId || !storedShelfId || (!storedCurrentPlantId && plants.length === 0)) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(STORAGE_KEYS.SHELF_ID, shelfId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_PLANT_ID, currentPlantId);
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));
  }

  return newState;
}

export function usePersistence(): [PetalState, (updates: Partial<PetalState>) => void] {
  const [state, setState] = useState<PetalState>(initializePetalState);

  const updateState = (updates: Partial<PetalState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };

      if (updates.userId) localStorage.setItem(STORAGE_KEYS.USER_ID, updates.userId);
      if (updates.shelfId) localStorage.setItem(STORAGE_KEYS.SHELF_ID, updates.shelfId);
      if (updates.currentPlantId)
        localStorage.setItem(STORAGE_KEYS.CURRENT_PLANT_ID, updates.currentPlantId);
      if (updates.plants) localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(updates.plants));

      return newState;
    });
  };

  return [state, updateState];
}
