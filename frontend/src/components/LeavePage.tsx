import { api, type LeaveInput, type LeaveRequest } from "../api/client";
import { RecordsBoard } from "./RecordsBoard";

const types = ["Annual", "Sick", "Unpaid"];
const listStatuses = ["Pending Approval"];
const myLeaveStatuses = ["Rejected", "Cancelled", "Pending Approval", "Scheduled", "Taken"];
const formStatuses = ["Pending Approval", "Scheduled", "Taken", "Cancelled"];
const inactive = "This control was visible on OrangeHRM and was not used. It stays inactive.";

const blank: Record<string, string> = {
  employee_id: "",
  leave_type: "Annual",
  start_date: "",
  end_date: "",
  status: "Pending Approval",
  comment: "",
};

function body(form: Record<string, string>): LeaveInput {
  return {
    employee_id: form.employee_id ? Number(form.employee_id) : null,
    leave_type: form.leave_type,
    start_date: form.start_date,
    end_date: form.end_date,
    status: form.status,
    comment: form.comment,
  };
}

function openLeave(path: string) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function LeaveNav({ current }: { current: string }) {
  const items = [
    { label: "Apply", path: "/leave?start=apply" },
    { label: "My Leave", path: "/leave?start=mine" },
    { label: "Leave List", path: "/leave" },
    { label: "Assign Leave", path: "/leave?start=assign" },
  ];
  return (
    <nav className="module-links" aria-label="Leave">
      {items.map((item) => (
        <button key={item.label} type="button" className={item.label === current ? "nav-current" : undefined} onClick={() => openLeave(item.path)}>
          {item.label}
        </button>
      ))}
      {["Entitlements", "Reports", "Configure"].map((label) => (
        <button key={label} type="button" disabled title={inactive}>{label}</button>
      ))}
    </nav>
  );
}

function ApplyLeave() {
  return (
    <section>
      <header className="topbar"><h1>Leave</h1></header>
      <LeaveNav current="Apply" />
      <article className="panel">
        <h2>Apply Leave</h2>
        <p className="info-note" role="status">No Leave Types with Leave Balance</p>
        <p className="muted">The inspected Apply Leave page had no form fields. No leave request is created here.</p>
      </article>
    </section>
  );
}

function AssignLeave() {
  return (
    <section>
      <header className="topbar"><h1>Leave</h1></header>
      <LeaveNav current="Assign Leave" />
      <article className="panel">
        <h2>Assign Leave</h2>
        <p className="muted">* Required</p>
        <form className="pim-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Employee Name *
            <input aria-label="Employee Name" placeholder="Type for hints..." />
          </label>
          <label>
            Leave Type *
            <select aria-label="Leave Type" disabled title="Leave Type options were not opened.">
              <option>-- Select --</option>
            </select>
          </label>
          <p>Leave Balance: 0.00 Day(s)</p>
          <label>
            From Date *
            <input aria-label="From Date" placeholder="yyyy-dd-mm" />
          </label>
          <label>
            To Date *
            <input aria-label="To Date" placeholder="yyyy-dd-mm" />
          </label>
          <label>
            Comments
            <textarea aria-label="Comments" />
          </label>
          <div className="form-actions">
            <button type="button" disabled title="Assign was visible and was not clicked. Harbor HR does not save an assignment from this page.">Assign</button>
          </div>
        </form>
      </article>
    </section>
  );
}

export function LeavePage() {
  const start = new URLSearchParams(window.location.search).get("start");
  if (start === "apply") return <ApplyLeave />;
  if (start === "assign") return <AssignLeave />;
  const mine = start === "mine";
  return (
    <RecordsBoard<LeaveRequest>
      key={start ?? "list"}
      title="Leave"
      heading={mine ? "My Leave List" : "Leave List"}
      note="Leave List can store a proposed Harbor HR request. Apply Leave showed no form. Assign was not clicked, so the Assign page does not save. Entitlements, Reports, and Configure were not opened. Leave type options on these filters were not opened; the stored types are Harbor HR choices."
      currentNav="Leave List"
      listPath="/leave"
      profileName="Asha Sharma"
      initialAction={mine ? "profile" : undefined}
      activeNav={[
        { label: "Apply", path: "/leave?start=apply" },
        { label: "My Leave", path: "/leave?start=mine" },
        { label: "Assign Leave", path: "/leave?start=assign" },
      ]}
      disabledNav={["Entitlements", "Reports", "Configure"]}
      empty="No Records Found"
      headers={["Date", "Employee Name", "Leave Type", "Leave Balance (Days)", "Number of Days", "Status", "Comments"]}
      filters={[
        { name: "start_date", label: "From Date", kind: "date" },
        { name: "end_date", label: "To Date", kind: "date" },
        {
          name: "status",
          label: "Show Leave with Status",
          kind: "select",
          options: mine ? myLeaveStatuses : listStatuses,
          emptyLabel: mine ? "Select" : "-- Select --",
        },
        { name: "leave_type", label: "Leave Type", kind: "select", options: types },
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        {
          name: "sub_unit",
          label: "Sub Unit",
          kind: "select",
          options: [],
          reason: "Sub Unit options were not opened.",
        },
        {
          name: "include_past",
          label: "Include Past Employees",
          kind: "checkbox",
          reason: "The checkbox was unchecked. Checking it was not recorded, so it stays inactive.",
        },
      ]}
      fields={[
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        { name: "leave_type", label: "Leave Type", kind: "select", options: types },
        { name: "start_date", label: "From Date", kind: "date" },
        { name: "end_date", label: "To Date", kind: "date" },
        { name: "status", label: "Status", kind: "select", options: formStatuses },
        { name: "comment", label: "Comments", kind: "text" },
      ]}
      blank={blank}
      load={(filters) => api.leaveRequests(filters)}
      save={async (id, form) => {
        if (id === null) await api.createLeave(body(form));
        else await api.updateLeave(id, body(form));
      }}
      remove={(id) => api.deleteLeave(id)}
      cells={(row) => [row.start_date, row.employee_name, row.leave_type, "—", String(row.days), row.status, row.comment]}
      toForm={(row) => ({
        employee_id: String(row.employee_id),
        leave_type: row.leave_type,
        start_date: row.start_date,
        end_date: row.end_date,
        status: row.status,
        comment: row.comment,
      })}
    />
  );
}
