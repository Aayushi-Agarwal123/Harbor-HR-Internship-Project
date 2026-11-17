import { useEffect, useState } from "react";
import { ApiError, api } from "./api/client";
import { AdminPage } from "./components/AdminPage";
import { BuzzPage } from "./components/BuzzPage";
import { ClaimPage } from "./components/ClaimPage";
import { DashboardPage } from "./components/DashboardPage";
import { DirectoryPage } from "./components/DirectoryPage";
import { ForgotPage, LoginPage } from "./components/LoginPage";
import { LeavePage } from "./components/LeavePage";
import { MaintenancePage } from "./components/MaintenancePage";
import { MyInfoPage } from "./components/MyInfoPage";
import { PerformancePage } from "./components/PerformancePage";
import { PimPage } from "./components/PimPage";
import { RecruitmentPage } from "./components/RecruitmentPage";
import { Sidebar } from "./components/Sidebar";
import { TimePage } from "./components/TimePage";
import { parsePath, pathForModule, pathForPim, type AppLocation, type PimView } from "./routes";

interface Session {
  username: string;
  displayName: string;
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [bootError, setBootError] = useState<string | null>(null);
  const [location, setLocation] = useState<AppLocation>(() => parsePath(window.location.pathname));

  useEffect(() => {
    api.me()
      .then((user) => setSession({ username: user.username, displayName: user.display_name }))
      .catch((error: unknown) => {
        setSession(null);
        if (error instanceof ApiError && error.status === 0) {
          setBootError(error.message);
        }
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const onPop = () => setLocation(parsePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function go(path: string, mode: "push" | "replace" = "push") {
    const url = new URL(path, window.location.origin);
    const next = parsePath(url.pathname);
    const target = `${url.pathname}${url.search}`;
    if (`${window.location.pathname}${window.location.search}` !== target) {
      const write = mode === "push" ? window.history.pushState : window.history.replaceState;
      write.call(window.history, null, "", target);
    }
    setLocation(next);
  }

  useEffect(() => {
    if (ready && session && (location.kind === "login" || location.kind === "forgot")) go("/dashboard", "replace");
  }, [ready, session, location.kind]);

  if (!ready) {
    return <main className="login-screen"><p className="muted">Loading Harbor HR.</p></main>;
  }

  if (!session) {
    if (location.kind === "forgot") {
      return <ForgotPage onBack={() => go("/login")} />;
    }
    const returnPath = location.kind === "module" ? location.path : "/dashboard";
    return (
      <LoginPage
        bootError={bootError}
        onForgot={() => go("/forgot")}
        onSignedIn={(next) => {
          setSession(next);
          go(returnPath, "replace");
          setBootError(null);
        }}
      />
    );
  }

  function openPim(view: PimView, employeeId: number | null) {
    go(pathForPim(view, employeeId));
  }

  return (
    <div className="shell">
      <Sidebar
        current={location.kind === "module" ? location.module : null}
        onNavigate={(id) => go(pathForModule(id))}
        onLogout={() => {
          void api.logout().finally(() => {
            setSession(null);
            go("/login", "replace");
          });
        }}
      />
      <main className="content">
        {location.kind === "unknown" ? (
          <section>
            <header className="topbar"><h1>Page not found</h1></header>
            <article className="panel">
              <p>This address is not a Harbor HR page.</p>
              <button type="button" onClick={() => go("/dashboard")}>Back to Dashboard</button>
            </article>
          </section>
        ) : null}
        {location.kind === "module" && location.module === "dashboard" ? (
          <DashboardPage displayName={session.displayName} onOpen={(path) => go(path)} />
        ) : null}
        {location.kind === "module" && location.module === "admin" ? <AdminPage /> : null}
        {location.kind === "module" && location.module === "leave" ? <LeavePage /> : null}
        {location.kind === "module" && location.module === "time" ? <TimePage /> : null}
        {location.kind === "module" && location.module === "recruitment" ? <RecruitmentPage /> : null}
        {location.kind === "module" && location.module === "performance" ? <PerformancePage /> : null}
        {location.kind === "module" && location.module === "directory" ? <DirectoryPage /> : null}
        {location.kind === "module" && location.module === "claim" ? <ClaimPage /> : null}
        {location.kind === "module" && location.module === "buzz" ? <BuzzPage /> : null}
        {location.kind === "module" && location.module === "pim" ? (
          <PimPage view={location.pimView} employeeId={location.employeeId} onNavigate={openPim} />
        ) : null}
        {location.kind === "module" && location.module === "maintenance" ? (
          <MaintenancePage username={session.username} onCancel={() => go("/dashboard")} />
        ) : null}
        {location.kind === "module" && location.module === "my-info" ? <MyInfoPage /> : null}
      </main>
    </div>
  );
}
