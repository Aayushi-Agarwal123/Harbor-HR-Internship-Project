import { useState, type FormEvent } from "react";
import { ApiError, api } from "../api/client";

interface MaintenancePageProps {
  username: string;
  onCancel: () => void;
}

export function MaintenancePage({ username, onCancel }: MaintenancePageProps) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function confirm(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    try {
      const result = await api.confirmMaintenance(password);
      setPassword("");
      setConfirmed(result.confirmed && result.purge === false);
    } catch (error) {
      setConfirmed(false);
      setMessage(error instanceof ApiError ? error.message : "The password could not be checked.");
    }
  }

  return (
    <section>
      <header className="topbar">
        <h1>Maintenance</h1>
      </header>
      <article className="panel">
        <h2>Administrator Access</h2>
        <p>A critical administrator function requires credential validation.</p>
        <p className="time-note">
          Confirm was not clicked on OrangeHRM. Harbor HR checks the signed-in password and does not open or run a purge.
        </p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        {confirmed ? (
          <>
            <p role="status">Access confirmed. No purge is available.</p>
            <button type="button" onClick={onCancel}>Back to Dashboard</button>
          </>
        ) : (
          <form className="pim-form" onSubmit={(event) => void confirm(event)}>
            <label htmlFor="maintenance-username">Username</label>
            <input id="maintenance-username" name="username" value={username} disabled />
            <label htmlFor="maintenance-password">Password</label>
            <input id="maintenance-password" name="password" type="password" autoComplete="off" value={password} onChange={(event) => setPassword(event.target.value)} />
            <div className="form-actions">
              <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
              <button type="submit">Confirm</button>
            </div>
          </form>
        )}
      </article>
    </section>
  );
}
