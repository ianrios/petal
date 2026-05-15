import { useState } from 'react';
import { generatePlant, type Plant } from '@petal/core';
import { Link } from 'react-router';
import { usePersistence, type StoredPlant } from '../hooks/usePersistence';
import { usePlant } from '../hooks/usePlant';
import '../styles/admin.css';

interface TestPlant {
  timestamp: number;
  seed: string;
  plant: Plant;
}

type TabType = 'collection' | 'current' | 'test';

export function AdminDebugView() {
  const [petalState, updateState] = usePersistence();
  const [testPlants, setTestPlants] = useState<TestPlant[]>([]);
  const [testSeed, setTestSeed] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('collection');
  const [selectedTestIndex, setSelectedTestIndex] = useState<number | null>(null);

  const currentStoredPlant = petalState.plants.find((p) => p.id === petalState.currentPlantId);
  const currentGeneratedPlant = usePlant(currentStoredPlant?.seed ?? '');
  const selectedTestPlant =
    selectedTestIndex !== null ? testPlants[selectedTestIndex]?.plant : null;

  const generateNewStoredPlant = () => {
    const newSeed = crypto.randomUUID();
    const newPlant: StoredPlant = {
      id: newSeed,
      seed: newSeed,
      createdAt: Date.now(),
    };

    const updatedPlants = [newPlant, ...petalState.plants];
    updateState({
      plants: updatedPlants,
      currentPlantId: newPlant.id,
    });
  };

  const setCurrentPlant = (plantId: string) => {
    updateState({ currentPlantId: plantId });
  };

  const deletePlant = (plantId: string) => {
    if (confirm('Delete this plant? This cannot be undone.')) {
      const updatedPlants = petalState.plants.filter((p) => p.id !== plantId);
      const newCurrentId =
        petalState.currentPlantId === plantId
          ? (updatedPlants[0]?.id ?? crypto.randomUUID())
          : petalState.currentPlantId;

      updateState({
        plants: updatedPlants,
        currentPlantId: newCurrentId,
      });
    }
  };

  const generateTestPlant = () => {
    const seed = testSeed || crypto.randomUUID();
    const plant = generatePlant(seed);
    const entry: TestPlant = {
      timestamp: Date.now(),
      seed,
      plant,
    };

    setTestPlants((prev) => [entry, ...prev.slice(0, 4)]);
    setTestSeed('');
  };

  const handleTestSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestSeed(e.currentTarget.value);
  };

  const handleTestSeedEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateTestPlant();
    }
  };

  const clearTestHistory = () => {
    if (confirm('Clear test plant history? Your stored plants will not be affected.')) {
      setTestPlants([]);
      setTestSeed('');
      setSelectedTestIndex(null);
    }
  };

  return (
    <div className="admin-view">
      <header className="admin-header">
        <h1>Petal Admin — Plant Data & Testing</h1>
        <Link to="/" className="admin-back-link">
          Back to App
        </Link>
      </header>

      <main className="admin-main">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'collection' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('collection');
            }}
          >
            Plant Collection
          </button>
          <button
            className={`admin-tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('current');
            }}
          >
            Current Plant Details
          </button>
          <button
            className={`admin-tab ${activeTab === 'test' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('test');
            }}
          >
            Test Seeds
          </button>
          <button
            onClick={clearTestHistory}
            className="admin-clear-btn"
            title="Clear test plant history (stored plants unaffected)"
          >
            🗑️ Clear Test History
          </button>
        </div>

        {activeTab === 'collection' && (
          <section className="admin-collection">
            <h2>Plant Collection</h2>
            <button
              onClick={generateNewStoredPlant}
              className="admin-generate-btn"
              style={{ marginBottom: '1.5rem' }}
            >
              ➕ Generate New Plant
            </button>

            {petalState.plants.length > 0 ? (
              <div className="plants-list">
                {petalState.plants.map((plant) => (
                  <div
                    key={plant.id}
                    className={`plant-item ${plant.id === petalState.currentPlantId ? 'current' : ''}`}
                  >
                    <div className="plant-item-info">
                      <div className="plant-item-id">
                        <strong>ID:</strong> <code>{plant.id.slice(0, 12)}...</code>
                      </div>
                      <div className="plant-item-seed">
                        <strong>Seed:</strong> <code>{plant.seed.slice(0, 12)}...</code>
                      </div>
                      <div className="plant-item-created">
                        <strong>Created:</strong> {new Date(plant.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="plant-item-actions">
                      {plant.id !== petalState.currentPlantId && (
                        <button
                          onClick={() => {
                            setCurrentPlant(plant.id);
                          }}
                          className="plant-action-btn"
                        >
                          Switch
                        </button>
                      )}
                      {petalState.plants.length > 1 && (
                        <button
                          onClick={() => {
                            deletePlant(plant.id);
                          }}
                          className="plant-action-btn plant-delete-btn"
                        >
                          Delete
                        </button>
                      )}
                      {plant.id === petalState.currentPlantId && (
                        <span className="plant-current-label">★ Current</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#909898', marginTop: '1rem' }}>
                No plants yet. Generate one to get started.
              </p>
            )}
          </section>
        )}

        {activeTab === 'current' && (
          <section className="admin-current">
            <h2>Your Account</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label htmlFor="user-id">User ID:</label>
                <code id="user-id">{petalState.userId}</code>
              </div>
              <div className="detail-item">
                <label htmlFor="shelf-id">Shelf ID:</label>
                <code id="shelf-id">{petalState.shelfId}</code>
              </div>
              <div className="detail-item">
                <label htmlFor="plants-count">Total Plants:</label>
                <span id="plants-count">{String(petalState.plants.length)}</span>
              </div>
            </div>

            {currentStoredPlant && currentGeneratedPlant ? (
              <>
                <h2>Current Plant (Stored)</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <label htmlFor="plant-id">Plant ID:</label>
                    <code id="plant-id">{currentStoredPlant.id.slice(0, 16)}...</code>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="plant-seed">Seed:</label>
                    <code id="plant-seed">{currentStoredPlant.seed.slice(0, 16)}...</code>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="plant-created">Created At:</label>
                    <span id="plant-created">
                      {new Date(currentStoredPlant.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <h2>Generated Traits (from Seed)</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <label htmlFor="leaf-count">Leaf Count:</label>
                    <span id="leaf-count">{String(currentGeneratedPlant.leafCount)}</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="stem-thickness">Stem Thickness:</label>
                    <span id="stem-thickness">
                      {currentGeneratedPlant.stemThickness.toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="base-hue">Base Hue:</label>
                    <span id="base-hue">
                      {String(currentGeneratedPlant.baseHue)}° (
                      <span
                        className="color-preview"
                        style={{
                          backgroundColor: `hsl(${String(currentGeneratedPlant.baseHue)}, 65%, 50%)`,
                        }}
                      />
                      )
                    </span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="saturation">Saturation:</label>
                    <span id="saturation">{String(currentGeneratedPlant.saturation)}%</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="growth-pattern">Growth Pattern:</label>
                    <span id="growth-pattern">{currentGeneratedPlant.growthPattern}</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="scale">Scale:</label>
                    <span id="scale">{currentGeneratedPlant.scale}</span>
                  </div>
                </div>

                <h3>Leaves ({currentGeneratedPlant.leaves.length})</h3>
                <div className="leaves-container">
                  {currentGeneratedPlant.leaves.map((leaf: Plant['leaves'][0]) => (
                    <div key={leaf.index} className="leaf-card">
                      <div className="leaf-header">Leaf {leaf.index}</div>
                      <div className="leaf-content">
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-shape`}>Shape:</label>
                          <span id={`leaf-${String(leaf.index)}-shape`}>{leaf.shape}</span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-size`}>Size:</label>
                          <span id={`leaf-${String(leaf.index)}-size`}>{leaf.size.toFixed(2)}</span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-pitch`}>Pitch:</label>
                          <span id={`leaf-${String(leaf.index)}-pitch`}>{leaf.pitchClass}</span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-color`}>Color:</label>
                          <span
                            id={`leaf-${String(leaf.index)}-color`}
                            className="color-preview"
                            style={{
                              backgroundColor: `hsl(${String(leaf.color.h)}, ${String(leaf.color.s)}%, ${String(leaf.color.l)}%)`,
                            }}
                          />
                          <span>
                            HSL({String(leaf.color.h)}, {String(leaf.color.s)}%,
                            {String(leaf.color.l)}%)
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-position`}>Position:</label>
                          <span id={`leaf-${String(leaf.index)}-position`}>
                            ({leaf.positionX.toFixed(1)}, {leaf.positionY.toFixed(1)},
                            {leaf.positionZ.toFixed(2)})
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`leaf-${String(leaf.index)}-rotation`}>Rotation:</label>
                          <span id={`leaf-${String(leaf.index)}-rotation`}>
                            {String(Math.round(leaf.rotation * (180 / Math.PI)))}°
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p style={{ color: '#909898', marginTop: '1rem' }}>
                No plant created yet. Go to the main app to create one.
              </p>
            )}
          </section>
        )}

        {activeTab === 'test' && (
          <section className="admin-test">
            <h2>Test Specific Seeds</h2>
            <div className="control-group">
              <label htmlFor="test-seed-input">Seed (optional, or press Enter to generate):</label>
              <input
                id="test-seed-input"
                type="text"
                value={testSeed}
                onChange={handleTestSeedChange}
                onKeyDown={handleTestSeedEnter}
                placeholder="Leave empty for random UUID"
              />
              <button onClick={generateTestPlant}>Generate Test Plant</button>
              <p style={{ fontSize: '0.85rem', color: '#909898', marginTop: '0.5rem' }}>
                Test plants are ephemeral and won't affect your stored plant.
              </p>
            </div>

            {testPlants.length > 0 && (
              <>
                <h3>Test History</h3>
                <div className="history-container">
                  <div className="history-list">
                    {testPlants.map((entry, idx) => {
                      const entryKey = `${String(entry.timestamp)}-${String(idx)}`;
                      const isActive = selectedTestIndex === idx ? 'active' : '';
                      return (
                        <button
                          key={entryKey}
                          className={`history-item ${isActive}`}
                          onClick={() => {
                            setSelectedTestIndex(idx);
                          }}
                        >
                          <div className="history-item-seed">{entry.seed.slice(0, 8)}...</div>
                          <div className="history-item-time">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedTestPlant && (
              <section className="admin-details">
                <h2>Test Plant Details</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <label htmlFor="test-plant-seed">Seed:</label>
                    <code id="test-plant-seed">{selectedTestPlant.seed}</code>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-leaf-count">Leaf Count:</label>
                    <span id="test-leaf-count">{String(selectedTestPlant.leafCount)}</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-stem-thickness">Stem Thickness:</label>
                    <span id="test-stem-thickness">
                      {selectedTestPlant.stemThickness.toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-base-hue">Base Hue:</label>
                    <span id="test-base-hue">
                      {String(selectedTestPlant.baseHue)}° (
                      <span
                        className="color-preview"
                        style={{
                          backgroundColor: `hsl(${String(selectedTestPlant.baseHue)}, 65%, 50%)`,
                        }}
                      />
                      )
                    </span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-saturation">Saturation:</label>
                    <span id="test-saturation">{String(selectedTestPlant.saturation)}%</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-growth-pattern">Growth Pattern:</label>
                    <span id="test-growth-pattern">{selectedTestPlant.growthPattern}</span>
                  </div>
                  <div className="detail-item">
                    <label htmlFor="test-scale">Scale:</label>
                    <span id="test-scale">{selectedTestPlant.scale}</span>
                  </div>
                </div>

                <h3>Leaves ({selectedTestPlant.leaves.length})</h3>
                <div className="leaves-container">
                  {selectedTestPlant.leaves.map((leaf: Plant['leaves'][0]) => (
                    <div key={leaf.index} className="leaf-card">
                      <div className="leaf-header">Leaf {leaf.index}</div>
                      <div className="leaf-content">
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-shape`}>Shape:</label>
                          <span id={`test-leaf-${String(leaf.index)}-shape`}>{leaf.shape}</span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-size`}>Size:</label>
                          <span id={`test-leaf-${String(leaf.index)}-size`}>
                            {leaf.size.toFixed(2)}
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-pitch`}>Pitch:</label>
                          <span id={`test-leaf-${String(leaf.index)}-pitch`}>
                            {leaf.pitchClass}
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-color`}>Color:</label>
                          <span
                            id={`test-leaf-${String(leaf.index)}-color`}
                            className="color-preview"
                            style={{
                              backgroundColor: `hsl(${String(leaf.color.h)}, ${String(leaf.color.s)}%, ${String(leaf.color.l)}%)`,
                            }}
                          />
                          <span>
                            HSL({String(leaf.color.h)}, {String(leaf.color.s)}%,
                            {String(leaf.color.l)}%)
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-position`}>
                            Position:
                          </label>
                          <span id={`test-leaf-${String(leaf.index)}-position`}>
                            ({leaf.positionX.toFixed(1)}, {leaf.positionY.toFixed(1)},
                            {leaf.positionZ.toFixed(2)})
                          </span>
                        </div>
                        <div className="leaf-item">
                          <label htmlFor={`test-leaf-${String(leaf.index)}-rotation`}>
                            Rotation:
                          </label>
                          <span id={`test-leaf-${String(leaf.index)}-rotation`}>
                            {String(Math.round(leaf.rotation * (180 / Math.PI)))}°
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
