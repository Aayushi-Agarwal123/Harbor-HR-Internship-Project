import { useEffect, useState, type FormEvent } from "react";
import { ApiError, api, type Employee } from "../api/client";
import { jobTitleOptions } from "../data/synthetic";

export function DirectoryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Employee | null>(null);

  async function search(nextName = name, nextJob = job) {
    setLoading(true);
    setMessage(null);
    setSelected(null);
    try {
      const page = await api.employees({
        name: nextName,
        job_title: nextJob,
        page: 1,
        page_size: 50,
        sort: "first_name",
        direction: "asc",
      });
      const rest = page.total > page.items.length
        ? await api.employees({
          name: nextName,
          job_title: nextJob,
          page: 2,
          page_size: 50,
          sort: "first_name",
          direction: "asc",
        })
        : { items: [] as Employee[] };
      setEmployees([...page.items, ...rest.items]);
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "The directory could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void search("", "");
  }, []);

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    await search();
  }

  return (
    <section>
      <header className="topbar">
        <h1>Directory</h1>
      </header>
      <article className="panel">
        <h2>Directory</h2>
        <p className="time-note">
          Directory card text was not copied. This list uses the local employee records. Search and Reset were not clicked on OrangeHRM, so this search is proposed Harbor HR behavior.
        </p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        <form className="filters" onSubmit={(event) => void onSearch(event)}>
          <label>
            Employee Name
            <input value={name} placeholder="Type for hints..." onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Job Title
            <select value={job} onChange={(event) => setJob(event.target.value)}>
              <option value="">-- Select --</option>
              {jobTitleOptions.filter((option) => option !== "-- Select --").map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Location
            <input value="" disabled title="Location was a Directory filter. The employee record does not store a location, so this filter stays inactive." />
          </label>
          <div className="filter-actions">
            <button type="button" className="secondary" onClick={() => { setName(""); setJob(""); void search("", ""); }}>Reset</button>
            <button type="submit">Search</button>
          </div>
        </form>
        {loading ? <p className="muted">Loading the directory.</p> : null}
        {!loading && employees.length === 0 ? <p className="info-note" role="status">No Records Found</p> : null}
        <div className="day-grid">
          {employees.map((employee) => (
            <button key={employee.id} type="button" className="day-card" onClick={() => setSelected(employee)}>
              <strong>{employee.first_name} {employee.last_name}</strong>
              <span>{employee.job_title || "—"}</span>
              <span>{employee.sub_unit || "—"}</span>
            </button>
          ))}
        </div>
        {selected ? (
          <dl className="detail-list">
            <div><dt>Employee Id</dt><dd>{selected.employee_number}</dd></div>
            <div><dt>Job Title</dt><dd>{selected.job_title || "—"}</dd></div>
            <div><dt>Sub Unit</dt><dd>{selected.sub_unit || "—"}</dd></div>
            <div><dt>Employment Status</dt><dd>{selected.employment_status || "—"}</dd></div>
          </dl>
        ) : null}
      </article>
    </section>
  );
}
