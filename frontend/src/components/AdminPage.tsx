const topLabels = [
  "User Management",
  "Job",
  "Organization",
  "Qualifications",
  "Configuration",
  "Nationalities",
  "Corporate Branding",
] as const;

const columns = ["Username", "User Role", "Employee Name", "Status", "Actions"] as const;

const pending = "This control was visible on System Users and was not used. It is not active in Harbor HR.";

export function AdminPage() {
  return (
    <section>
      <header className="topbar">
        <h1>Admin</h1>
      </header>
      <nav className="module-links" aria-label="Admin">
        {topLabels.map((label) => (
          label === "User Management" ? (
            <span key={label} className="module-text nav-current">{label}</span>
          ) : (
            <button key={label} type="button" disabled title={pending}>{label}</button>
          )
        ))}
      </nav>
      <article className="panel">
        <p className="muted">/ User Management</p>
        <h2>System Users</h2>
        <p className="muted">Harbor HR does not store system users. The reference record count is not shown here.</p>
        <form className="filters" onSubmit={(event) => event.preventDefault()}>
          <label>
            Username
            <input name="username" disabled />
          </label>
          <label>
            User Role
            <input name="user-role" disabled />
          </label>
          <label>
            Employee Name
            <input name="employee-name" disabled />
          </label>
          <label>
            Status
            <input name="status" disabled />
          </label>
          <div className="filter-actions">
            <button type="button" className="secondary" disabled title={pending}>Reset</button>
            <button type="button" disabled title={pending}>Search</button>
          </div>
        </form>
        <div className="toolbar">
          <button type="button" disabled title={pending}>Add</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" aria-label="Select all users" disabled />
                </th>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>No local system users are stored.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
