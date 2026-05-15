import { useEffect } from 'react';
import { generatePlant } from '@petal/core';
import { usePersistence, type StoredPlant } from './hooks/usePersistence';

const quietSignals = ['seed held', 'soil listening', 'first leaf soon'] as const;

export function App() {
  const [petalState, updateState] = usePersistence();

  useEffect(() => {
    const hasPlant = petalState.plants.length > 0;

    if (!hasPlant) {
      const newPlantSeed = crypto.randomUUID();
      const generatedPlant = generatePlant(newPlantSeed);
      const storedPlant: StoredPlant = {
        id: generatedPlant.id,
        seed: generatedPlant.seed,
        createdAt: generatedPlant.createdAt,
      };

      updateState({
        plants: [storedPlant],
        currentPlantId: newPlantSeed,
      });
    }
  }, [petalState, updateState]);

  const currentPlant = petalState.plants.find((p) => p.id === petalState.currentPlantId);

  return (
    <main className="app-shell" aria-labelledby="petal-title">
      <section className="play-surface" aria-label="Petal entry surface">
        <div className="ambient-field" aria-hidden="true">
          <span className="leaf-orbit leaf-orbit-one" />
          <span className="leaf-orbit leaf-orbit-two" />
          <span className="leaf-orbit leaf-orbit-three" />
        </div>

        <div className="entry-content">
          <p className="kicker">Petal</p>
          <h1 id="petal-title">A small green thing is waking.</h1>
          <p className="entry-copy">
            Hold still for the first plant. The room is quiet enough to hear it arrive.
          </p>
          {currentPlant && (
            <p style={{ fontSize: '0.85rem', color: '#90a8a8', marginTop: '1rem' }}>
              Plant ID: <code>{currentPlant.id.slice(0, 8)}...</code>
            </p>
          )}
        </div>

        <ul className="signal-list" aria-label="Early plant signals">
          {quietSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
