import { useEffect, useState, type FormEvent } from "react";
import { ApiError, api, type Employee } from "../api/client";

const pending = "This control was visible on OrangeHRM and was not used. It stays inactive.";

export interface RecordField {
  name: string;
  label: string;
  kind: "employee" | "text" | "date" | "select" | "disabled" | "checkbox";
  options?: string[];
  emptyLabel?: string;
  reason?: string;
}

interface RecordsBoardProps<T extends { id: number }> {
  title: string;
  heading: string;
  note: string;
  currentNav: string;
  listPath?: string;
  disabledNav: string[];
  activeNav?: Array<{ label: string; action?: "create" | "profile"; path?: string }>;
  profileName?: string;
  hideNav?: boolean;
  lockToProfile?: boolean;
  initialAction?: "create" | "profile";
  empty: string;
  headers: string[];
  filters: RecordField[];
  fields: RecordField[];
  load: (filters: Record<string, string>) => Promise<{ total: number; items: T[] }>;
  save: (id: number | null, body: Record<string, string>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  cells: (row: T) => string[];
  toForm: (row: T) => Record<string, string>;
  blank: Record<string, string>;
}

export function RecordsBoard<T extends { id: number }>({
  title,
  heading,
  note,
  currentNav,
  listPath,
  disabledNav,
  activeNav = [],
  profileName,
  hideNav = false,
  lockToProfile = false,
  initialAction,
  empty,
  headers,
  filters,
  fields,
  load,
  save,
  remove,
  cells,
  toForm,
  blank,
}: RecordsBoardProps<T>) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(blank);
  const [fieldsError, setFieldsError] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  async function refresh(next = filter) {
    setLoading(true);
    setMessage(null);
    try {
      const page = await load(next);
      setRows(page.items);
      setTotal(page.total);
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "The records could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    api.employees({ page: 1, page_size: 50, sort: "first_name", direction: "asc" })
      .then(async (page) => {
        const rest = page.total > page.items.length
          ? await api.employees({ page: 2, page_size: 50, sort: "first_name", direction: "asc" })
          : { items: [] as Employee[] };
        const people = [...page.items, ...rest.items];
        setEmployees(people);
        if ((lockToProfile || initialAction === "profile") && profileName) {
          const match = people.find((employee) => `${employee.first_name} ${employee.last_name}` === profileName);
          if (match) {
            const next = { employee_id: String(match.id) };
            setFilter(next);
            void refresh(next);
          }
        }
        if (initialAction === "create") openCreate();
      })
      .catch(() => setMessage("Employees could not be loaded."));
    void refresh({});
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(blank);
    setFieldsError({});
    setMessage(null);
    setMode("form");
  }

  function openEdit(row: T) {
    setEditing(row.id);
    setForm(toForm(row));
    setFieldsError({});
    setMessage(null);
    setMode("form");
  }

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    await refresh(filter);
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setFieldsError({});
    setMessage(null);
    try {
      await save(editing, form);
      setMode("list");
      await refresh(filter);
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldsError(error.fields);
        setMessage(Object.keys(error.fields).length ? null : error.message);
      }
    }
  }

  async function confirmDelete() {
    if (pendingDelete === null) return;
    try {
      await remove(pendingDelete);
      setPendingDelete(null);
      await refresh(filter);
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "The record could not be deleted.");
      setPendingDelete(null);
    }
  }

  function input(field: RecordField, value: string, onChange: (value: string) => void) {
    if (field.kind === "disabled") {
      return <input value="" disabled title={field.reason ?? pending} />;
    }
    if (field.kind === "checkbox") {
      return <input type="checkbox" checked={false} disabled title={field.reason ?? pending} />;
    }
    if (field.kind === "employee") {
      return (
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">-- Select --</option>
          {employees.map((employee) => (
            <option key={employee.id} value={String(employee.id)}>
              {employee.first_name} {employee.last_name}
            </option>
          ))}
        </select>
      );
    }
    if (field.kind === "select") {
      return (
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{field.emptyLabel ?? "-- Select --"}</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    return (
      <input
        type={field.kind === "date" ? "date" : "text"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <section>
      <header className="topbar">
        <h1>{title}</h1>
      </header>
      {hideNav ? null : (
        <nav className="module-links" aria-label={title}>
          <button type="button" className="nav-current" onClick={() => {
            if (listPath) {
              window.history.pushState(null, "", listPath);
              window.dispatchEvent(new PopStateEvent("popstate"));
              return;
            }
            setFilter({});
            setMode("list");
            void refresh({});
          }}>{currentNav}</button>
          {activeNav.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.path) {
                  window.history.pushState(null, "", item.path);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  return;
                }
                if (item.action === "create") openCreate();
                else {
                  const match = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === profileName);
                  const next: Record<string, string> = match ? { employee_id: String(match.id) } : {};
                  setFilter(next);
                  setMode("list");
                  void refresh(next);
                }
              }}
            >
              {item.label}
            </button>
          ))}
          {disabledNav.map((label) => (
            <button key={label} type="button" disabled title={pending}>{label}</button>
          ))}
        </nav>
      )}
      <article className="panel">
        <h2>{heading}</h2>
        <p className="time-note">{note}</p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        {mode === "list" ? (
          <>
            <form className="filters" onSubmit={(event) => void onSearch(event)}>
              {filters.map((field) => (
                <label key={field.name}>
                  {field.label}
                  {input(field, filter[field.name] ?? "", (value) => setFilter((current) => ({ ...current, [field.name]: value })))}
                </label>
              ))}
              <div className="filter-actions">
                <button type="button" className="secondary" onClick={() => { setFilter({}); void refresh({}); }}>Reset</button>
                <button type="submit">Search</button>
              </div>
            </form>
            <div className="toolbar">
              <button type="button" onClick={openCreate}>Add</button>
            </div>
            {loading ? <p className="muted">Loading records.</p> : null}
            {!loading && rows.length === 0 ? <p className="info-note" role="status">{empty}</p> : null}
            <p className="muted">({total}) Records Found</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      {cells(row).map((cell, index) => <td key={`${row.id}-${index}`}>{cell}</td>)}
                      <td>
                        <button type="button" onClick={() => openEdit(row)}>Edit</button>
                        <button type="button" className="secondary" onClick={() => setPendingDelete(row.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pendingDelete !== null ? (
              <div className="confirm-box" role="alertdialog" aria-label={`Delete ${heading}`}>
                <p>Delete this record? This cannot be undone.</p>
                <button type="button" onClick={() => void confirmDelete()}>Delete record</button>
                <button type="button" className="secondary" onClick={() => setPendingDelete(null)}>Cancel</button>
              </div>
            ) : null}
          </>
        ) : (
          <form className="pim-form" onSubmit={(event) => void onSave(event)}>
            {fields.map((field) => (
              <label key={field.name}>
                {field.label}
                {input(field, form[field.name] ?? "", (value) => setForm((current) => ({ ...current, [field.name]: value })))}
                {fieldsError[field.name] ? <span className="field-invalid">{fieldsError[field.name]}</span> : null}
              </label>
            ))}
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" className="secondary" onClick={() => setMode("list")}>Cancel</button>
            </div>
          </form>
        )}
      </article>
    </section>
  );
}
