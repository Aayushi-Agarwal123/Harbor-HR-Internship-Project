import { moduleLandings } from "../data/moduleLandings";
import { navItems, type NavId } from "../data/synthetic";

export function UnobservedPage({ id }: { id: NavId }) {
  const item = navItems.find((entry) => entry.id === id);
  const landing = moduleLandings[id];
  return (
    <section>
      <header className="topbar">
        <h1>{item?.label ?? "Module"}</h1>
      </header>
      <article className="panel">
        <h2>{landing?.heading ?? item?.label ?? "Module"}</h2>
        <p>Implementation pending. The notes below are from the inspected landing. Harbor HR does not store records for this module.</p>
        {landing ? (
          <>
            <p className="muted">Observed landing: {landing.url}</p>
            <ul className="fact-list">
              {landing.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="muted">Evidence {landing.evidenceId}. Harbor HR does not store records for this module, and no live form was submitted.</p>
          </>
        ) : (
          <p className="muted">This sidebar destination has no landing inspection yet.</p>
        )}
      </article>
    </section>
  );
}
