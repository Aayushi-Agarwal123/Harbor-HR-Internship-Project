import { useState, type FormEvent } from "react";
import { ApiError, api } from "../api/client";
import { LOCAL_USERNAME } from "../data/synthetic";

interface Session {
  username: string;
  displayName: string;
}

interface LoginPageProps {
  onSignedIn: (session: Session) => void;
  onForgot: () => void;
  bootError?: string | null;
}

export function LoginPage({ onSignedIn, onForgot, bootError = null }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(bootError);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!username.trim() || !password) {
      setMessage("Enter both username and password.");
      return;
    }
    setPending(true);
    try {
      const user = await api.login(username.trim(), password);
      onSignedIn({ username: user.username, displayName: user.display_name });
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "Those credentials were not recognized.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-card">
        <p className="wordmark">Harbor HR</p>
        <h1>Login</h1>
        <form onSubmit={submit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoFocus
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" disabled={pending}>Login</button>
          {message ? <p className="form-message" role="alert">{message}</p> : null}
        </form>
        <button type="button" className="text-button" onClick={onForgot}>
          Forgot your password?
        </button>
        <p className="fine-print">Local account: {LOCAL_USERNAME}</p>
      </section>
    </main>
  );
}

export function ForgotPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="login-screen">
      <section className="login-card">
        <p className="wordmark">Harbor HR</p>
        <h1>Forgot your password?</h1>
        <p className="muted">Password reset is not available in this local application.</p>
        <button type="button" onClick={onBack}>Back to Login</button>
      </section>
    </main>
  );
}
