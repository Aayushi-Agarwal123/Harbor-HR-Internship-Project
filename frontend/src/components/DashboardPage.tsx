import { useEffect, useState } from "react";
import { api, type BuzzPost, type Employee, type LeaveRequest } from "../api/client";
import { quickLaunch, widgetTitles } from "../data/synthetic";

const launchPaths: Record<string, string> = {
  "Assign Leave": "/leave?start=assign",
  "Leave List": "/leave",
  "Timesheets": "/time",
  "Apply Leave": "/leave?start=apply",
  "My Leave": "/leave?start=mine",
  "My Timesheet": "/time?start=mine",
};

const unsupported = "This control was visible on OrangeHRM and has no recorded destination.";

interface DashboardPageProps {
  displayName: string;
  onOpen: (path: string) => void;
}

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function DashboardPage({ displayName, onOpen }: DashboardPageProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<string | null>(null);
  const [posts, setPosts] = useState<BuzzPost[]>([]);
  const [leaveToday, setLeaveToday] = useState<LeaveRequest[]>([]);
  const [pendingLeave, setPendingLeave] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const first = await api.employees({ page: 1, page_size: 50, sort: "employee_number", direction: "asc" });
      const rows = [...first.items];
      if (first.total > rows.length) {
        const pages = Math.ceil(first.total / first.page_size);
        for (let page = 2; page <= pages; page += 1) {
          const next = await api.employees({ page, page_size: first.page_size, sort: "employee_number", direction: "asc" });
          rows.push(...next.items);
        }
      }
      const today = todayIso();
      const [feed, todayLeave, pending] = await Promise.all([
        api.buzzPosts(),
        api.leaveRequests({ start_date: today, end_date: today }),
        api.leaveRequests({ status: "Pending Approval" }),
      ]);
      if (!cancelled) {
        setEmployees(rows);
        setTotal(first.total);
        setPosts(feed.items.slice(0, 3));
        setLeaveToday(todayLeave.items.filter((row) => row.status !== "Cancelled"));
        setPendingLeave(pending.total);
        setNote(null);
        setLoading(false);
      }
    }
    load().catch(() => {
      if (!cancelled) {
        setNote("Local employee counts could not be loaded.");
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const bySubUnit = new Map<string, number>();
  employees.forEach((employee) => {
    const key = employee.sub_unit || "Unassigned";
    bySubUnit.set(key, (bySubUnit.get(key) ?? 0) + 1);
  });

  return (
    <section>
      <header className="topbar">
        <h1>Dashboard</h1>
        <div className="topbar-actions">
          <button type="button" className="upgrade" disabled title={unsupported}>
            Upgrade
          </button>
          <span className="user-chip">{displayName}</span>
        </div>
      </header>
      <div className="widget-grid">
        {widgetTitles.map((title) => (
          <article key={title} className={title === "Employee Distribution by Location" || title === "Employee Distribution by Sub Unit" ? "widget widget-span" : title === "Quick Launch" ? "widget widget-wide" : title === "Buzz Latest Posts" || title === "Employees on Leave Today" ? "widget widget-pair" : "widget"}>
            <h2>{title}</h2>
            {title === "Quick Launch" ? (
              <ul className="launch-list">
                {quickLaunch.map((name) => (
                  <li key={name}>
                    <button type="button" onClick={() => onOpen(launchPaths[name])}>
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {title === "Employee Distribution by Sub Unit" ? (
              loading ? <p className="muted">Loading local employees.</p> : note ? <p className="form-message" role="alert">{note}</p> : bySubUnit.size === 0 ? <p className="muted">No local employees are stored.</p> : (
                <ul className="distribution">
                  {[...bySubUnit.entries()].map(([name, count]) => (
                    <li key={name}><span>{name}</span><strong>{count}</strong></li>
                  ))}
                </ul>
              )
            ) : null}
            {title === "Buzz Latest Posts" ? (
              posts.length === 0 ? <p className="muted">No Posts Added</p> : (
                <ul className="fact-list">
                  {posts.map((post) => <li key={post.id}>{post.author_name}: {post.body}</li>)}
                </ul>
              )
            ) : null}
            {title === "Employees on Leave Today" ? (
              leaveToday.length === 0 ? <p className="muted">No Employees are on Leave Today</p> : (
                <ul className="fact-list">
                  {leaveToday.map((row) => <li key={row.id}>{row.employee_name}</li>)}
                </ul>
              )
            ) : null}
            {title === "Employee Distribution by Location" ? <p className="notice">Location is not stored in Harbor HR.</p> : null}
            {title === "Time at Work" ? (
              loading ? <p className="muted">Loading local employees.</p> : note ? <p className="form-message" role="alert">{note}</p> : (
                <>
                  <p className="metric-line">Local employees: <span className="metric">{total ?? 0}</span>.</p>
                  <p className="muted">Punch times were observed and are not stored.</p>
                </>
              )
            ) : null}
            {title === "My Actions" ? (
              <p className="muted">
                {pendingLeave ? `Pending Approval leave requests: ${pendingLeave}.` : "No pending leave requests. Observed action names are not stored."}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
