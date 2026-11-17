import { useEffect, useState } from "react";
import { ApiError, api, type TimesheetSummary } from "../api/client";

type TimeView = "employee" | "mine" | "attendance-employee" | "attendance-mine" | "attendance-config";

const unused = "This control was visible and was not used. Harbor HR does not run that action.";
const myColumns = ["Project", "Activity", "9 Mon", "10 Tue", "11 Wed", "12 Thu", "13 Fri", "14 Sat", "15 Sun", "Total"];

function openTime(start: string | null) {
  const path = start ? `/time?start=${start}` : "/time";
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function TimePage() {
  const start = new URLSearchParams(window.location.search).get("start");
  const view: TimeView = start === "mine"
    ? "mine"
    : start === "attendance"
      ? "attendance-employee"
      : start === "my-attendance"
        ? "attendance-mine"
        : start === "attendance-config"
          ? "attendance-config"
          : "employee";
  const [rows, setRows] = useState<TimesheetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [appliedName, setAppliedName] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.timesheets({})
      .then((page) => {
        if (!cancelled) setRows(page.items);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setRows([]);
          setListError(error instanceof ApiError ? error.message : "Timesheets could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = appliedName
    ? rows.filter((row) => row.employee_name.toLowerCase().includes(appliedName.trim().toLowerCase()))
    : rows;

  return (
    <section>
      <header className="topbar">
        <h1>Time</h1>
      </header>
      <nav className="module-links" aria-label="Time">
        <button type="button" className={view === "employee" ? "nav-current" : undefined} onClick={() => openTime(null)}>Employee Timesheets</button>
        <button type="button" className={view === "mine" ? "nav-current" : undefined} onClick={() => openTime("mine")}>My Timesheets</button>
        <button type="button" className={view === "attendance-mine" ? "nav-current" : undefined} onClick={() => openTime("my-attendance")}>My Records</button>
        <button type="button" disabled title="Punch In/Out was visible in the Attendance menu and was not opened.">Punch In/Out</button>
        <button type="button" className={view === "attendance-employee" ? "nav-current" : undefined} onClick={() => openTime("attendance")}>Employee Records</button>
        <button type="button" className={view === "attendance-config" ? "nav-current" : undefined} onClick={() => openTime("attendance-config")}>Configuration</button>
        <button type="button" disabled title="Reports was visible and was not opened.">Reports</button>
        <button type="button" disabled title="Project Info was visible and was not opened.">Project Info</button>
      </nav>
      {view === "employee" ? (
        <article className="panel">
          <p className="muted time-note">/ Timesheets</p>
          <h2>Select Employee</h2>
          <form
            className="filters"
            onSubmit={(event) => {
              event.preventDefault();
              setAppliedName(employeeName);
            }}
          >
            <label>
              Employee Name *
              <input
                aria-label="Employee Name"
                placeholder="Type for hints..."
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
              />
            </label>
            <div className="filter-actions">
              <button type="submit">View</button>
            </div>
          </form>
          <p className="muted">* Required</p>
          <h2>Timesheets Pending Action</h2>
          {listError ? <p className="field-invalid" role="alert">{listError}</p> : null}
          <p className="muted">{loading ? "Loading timesheets." : `(${visible.length}) Records Found`}</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Timesheet Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading && visible.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No stored timesheets.</td>
                  </tr>
                ) : visible.map((row) => (
                  <tr key={row.id}>
                    <td>{row.employee_name}</td>
                    <td>{row.period_start} to {row.period_end}</td>
                    <td>
                      <button type="button" disabled title={unused}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted">Stored timesheet rows are listed here and are not edited. Edit, Submit, Approve, and Reject were not recorded on this page.</p>
        </article>
      ) : null}
      {view === "mine" ? (
        <article className="panel">
          <p className="muted time-note">/ Timesheets</p>
          <h2>My Timesheet</h2>
          <label>
            Timesheet Period
            <input aria-label="Timesheet Period" placeholder="yyyy-dd-mm" />
          </label>
          <p>Status: Not Submitted</p>
          <div className="form-actions">
            <button type="button" disabled title="Edit was visible and was not clicked.">Edit</button>
            <button type="button" disabled title="Submit was visible and was not clicked.">Submit</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {myColumns.map((column) => <th key={column}>{column}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={myColumns.length}>Cell values were observed and were not saved.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      ) : null}
      {view === "attendance-employee" ? (
        <article className="panel">
          <p className="muted time-note">/ Attendance</p>
          <h2>Employee Attendance Records</h2>
          <form className="filters" onSubmit={(event) => event.preventDefault()}>
            <label>
              Employee Name
              <input aria-label="Attendance employee" placeholder="Type for hints..." />
            </label>
            <label>
              Date *
              <input aria-label="Attendance date" placeholder="yyyy-dd-mm" />
            </label>
            <div className="filter-actions">
              <button type="button" disabled title={unused}>View</button>
            </div>
          </form>
          <p className="muted">* Required. The inspected record count and row values were not copied.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Total Duration (Hours)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3}>No attendance records are stored.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      ) : null}
      {view === "attendance-mine" ? (
        <article className="panel">
          <p className="muted time-note">/ Attendance</p>
          <h2>My Attendance Records</h2>
          <form className="filters" onSubmit={(event) => event.preventDefault()}>
            <label>
              Date *
              <input aria-label="My attendance date" placeholder="yyyy-dd-mm" />
            </label>
            <div className="filter-actions">
              <button type="button" disabled title={unused}>View</button>
            </div>
          </form>
          <p className="muted">* Required. The duration value was observed and was not saved.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Punch In</th>
                  <th>Punch In Note</th>
                  <th>Punch Out</th>
                  <th>Punch Out Note</th>
                  <th>Duration (Hours)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>Punch values were observed and were not saved.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      ) : null}
      {view === "attendance-config" ? (
        <article className="panel">
          <p className="muted time-note">/ Attendance</p>
          <h2>Attendance Configuration</h2>
          <form className="pim-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <input type="checkbox" defaultChecked disabled /> Employee can change current time when punching in/out
            </label>
            <label>
              <input type="checkbox" defaultChecked disabled /> Employee can edit/delete own attendance records
            </label>
            <label>
              <input type="checkbox" defaultChecked disabled /> Supervisor can add/edit/delete attendance records of subordinates
            </label>
            <div className="form-actions">
              <button type="button" disabled title="Save was visible and was not clicked. These settings are not stored.">Save</button>
            </div>
          </form>
        </article>
      ) : null}
    </section>
  );
}
