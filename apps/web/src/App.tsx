const quietSignals = ['seed held', 'soil listening', 'first leaf soon'] as const;

export function App() {
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
