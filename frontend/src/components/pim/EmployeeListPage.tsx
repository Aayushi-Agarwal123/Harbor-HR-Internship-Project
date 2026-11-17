import { useEffect, useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { ApiError, api, type Employee } from "../../api/client";
import {
  employmentStatusOptions,
  includeOptions,
  jobTitleOptions,
  subUnitOptions,
} from "../../data/synthetic";
import { Icon } from "../Icons";

interface EmployeeListPageProps {
  onOpenAdd: () => void;
  onOpenDetails: (id: number) => void;
}

const closedOption = "-- Select --";
const defaultInclude = "Current Employees Only";
const pageSizeOptions = [10, 25, 50] as const;

interface Filters {
  name: string;
  employee_number: string;
  employment_status: string;
  job_title: string;
  sub_unit: string;
  supervisor: string;
  include: string;
}

const emptyFilters: Filters = {
  name: "",
  employee_number: "",
  employment_status: "",
  job_title: "",
  sub_unit: "",
  supervisor: "",
  include: defaultInclude,
};

function recordsText(count: number): string {
  return count === 0 ? "No Records Found" : `(${count}) Records Found`;
}

export function EmployeeListPage({ onOpenAdd, onOpenDetails }: EmployeeListPageProps) {
  const nameListId = useId();
  const supervisorListId = useId();
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState(closedOption);
  const [include, setInclude] = useState(defaultInclude);
  const [supervisorName, setSupervisorName] = useState("");
  const [jobTitle, setJobTitle] = useState(closedOption);
  const [subUnit, setSubUnit] = useState(closedOption);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [sort, setSort] = useState("employee_number");
  const [direction, setDirection] = useState("asc");
  const [reloadKey, setReloadKey] = useState(0);
  const [rows, setRows] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoNotice, setInfoNotice] = useState(false);
  const [nameHints, setNameHints] = useState<string[]>([]);
  const [nameSearching, setNameSearching] = useState(false);
  const [supervisorHints, setSupervisorHints] = useState<string[]>([]);
  const [supervisorSearching, setSupervisorSearching] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.employees({ ...applied, page, page_size: pageSize, sort, direction })
      .then((result) => {
        if (cancelled) return;
        setRows(result.items);
        setTotal(result.total);
        setError(null);
        if (result.total === 0) {
          setInfoNotice(true);
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(reason instanceof ApiError ? reason.message : "The employee list could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [applied, page, pageSize, sort, direction, reloadKey]);

  useEffect(() => {
    return watchHints(employeeName, setNameSearching, setNameHints);
  }, [employeeName]);

  useEffect(() => {
    return watchHints(supervisorName, setSupervisorSearching, setSupervisorHints);
  }, [supervisorName]);

  function search(event: FormEvent) {
    event.preventDefault();
    const next: Filters = {
      name: employeeName.trim(),
      employee_number: employeeId.trim(),
      employment_status: employmentStatus === closedOption ? "" : employmentStatus,
      job_title: jobTitle === closedOption ? "" : jobTitle,
      sub_unit: subUnit === closedOption ? "" : subUnit,
      supervisor: supervisorName.trim(),
      include,
    };
    setPage(1);
    setApplied(next);
  }

  function reset() {
    setEmployeeName("");
    setEmployeeId("");
    setEmploymentStatus(closedOption);
    setInclude(defaultInclude);
    setSupervisorName("");
    setJobTitle(closedOption);
    setSubUnit(closedOption);
    setPage(1);
    setApplied(emptyFilters);
  }

  function remove(row: Employee) {
    const confirmed = window.confirm(`Delete ${row.first_name} ${row.last_name}?`);
    if (!confirmed) return;
    api.deleteEmployee(row.id)
      .then(() => setReloadKey((value) => value + 1))
      .catch((reason: unknown) => {
        setError(reason instanceof ApiError ? reason.message : "The employee could not be deleted.");
      });
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);

  return (
    <section className="panel">
      <h2>Employee Information</h2>
      <form className="filters" onSubmit={search}>
        <HintField
          id="employee-name"
          label="Employee Name"
          listId={nameListId}
          value={employeeName}
          searching={nameSearching}
          matches={nameHints}
          onChange={setEmployeeName}
        />
        <label htmlFor="employee-id">
          Employee Id
          <input id="employee-id" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} />
        </label>
        <OptionField id="employment-status" label="Employment Status" value={employmentStatus} options={employmentStatusOptions} onChange={setEmploymentStatus} />
        <OptionField id="include" label="Include" value={include} options={includeOptions} onChange={setInclude} />
        <HintField
          id="supervisor-name"
          label="Supervisor Name"
          listId={supervisorListId}
          value={supervisorName}
          searching={supervisorSearching}
          matches={supervisorHints}
          onChange={setSupervisorName}
        />
        <OptionField id="job-title" label="Job Title" value={jobTitle} options={jobTitleOptions} onChange={setJobTitle} />
        <OptionField id="sub-unit" label="Sub Unit" value={subUnit} options={subUnitOptions} onChange={setSubUnit} />
        <div className="filter-actions">
          <button type="button" className="secondary" onClick={reset}>Reset</button>
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="toolbar">
        <button type="button" className="with-icon" onClick={onOpenAdd}>
          <Icon name="plus" />
          Add
        </button>
        <label htmlFor="sort">
          Sort
          <select id="sort" value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}>
            <option value="employee_number">Id</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="job_title">Job Title</option>
            <option value="employment_status">Employment Status</option>
            <option value="sub_unit">Sub Unit</option>
          </select>
        </label>
        <label htmlFor="sort-direction">
          Direction
          <select id="sort-direction" value={direction} onChange={(event) => { setDirection(event.target.value); setPage(1); }}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label htmlFor="page-size">
          Rows
          <select id="page-size" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>
            {pageSizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
      </div>
      {loading ? <p className="muted">Loading employee records.</p> : null}
      {error ? <p className="form-message" role="alert">{error}</p> : null}
      <p className="records">{recordsText(total)}</p>
      {infoNotice ? (
        <p className="info-note">
          Info: No Records Found
          <button type="button" disabled aria-label="×">×</button>
        </p>
      ) : null}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="check-col"><input type="checkbox" disabled aria-label="Selection" /></th>
              <th>Id</th>
              <th>First (&amp; Middle) Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Employment Status</th>
              <th>Sub Unit</th>
              <th>Supervisor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td><input type="checkbox" disabled aria-label={`Select ${row.first_name} ${row.last_name}`} /></td>
                <td>{row.employee_number}</td>
                <td>{row.middle_name ? `${row.first_name} ${row.middle_name}` : row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.job_title}</td>
                <td>{row.employment_status}</td>
                <td>{row.sub_unit}</td>
                <td>{row.supervisor}</td>
                <td className="row-actions">
                  <button type="button" onClick={() => onOpenDetails(row.id)}>Details</button>
                  <button type="button" onClick={() => remove(row)}>Delete</button>
                  <button type="button" className="icon-button" disabled aria-label="Unavailable action"><Icon name="mark" /></button>
                  <button type="button" className="icon-button" disabled aria-label="Unavailable action"><Icon name="mark" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > pageSize ? (
        <nav className="pager" aria-label="Pagination Navigation">
          {currentPage > 1 ? (
            <button type="button" aria-label="Previous page" onClick={() => setPage(currentPage - 1)}>‹</button>
          ) : null}
          {Array.from({ length: pageCount }, (_, index) => {
            const number = index + 1;
            return (
              <button key={number} type="button" aria-current={number === currentPage ? "page" : undefined} onClick={() => setPage(number)}>
                {number}
              </button>
            );
          })}
          {currentPage < pageCount ? (
            <button type="button" aria-label="Next page" onClick={() => setPage(currentPage + 1)}>›</button>
          ) : null}
        </nav>
      ) : null}
    </section>
  );
}

function watchHints(
  query: string,
  setSearching: (value: boolean) => void,
  setMatches: (value: string[]) => void,
) {
  const typed = query.trim();
  if (!typed) {
    setSearching(false);
    setMatches([]);
    return undefined;
  }
  setSearching(true);
  let cancelled = false;
  const timer = window.setTimeout(() => {
    api.hints(typed)
      .then((names) => {
        if (!cancelled) setMatches(names);
      })
      .catch(() => {
        if (!cancelled) setMatches([]);
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
  }, 400);
  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}

function OptionField({
  id, label, value, options, onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id}>
      {label}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function HintField({
  id, label, listId, value, searching, matches, onChange,
}: {
  id: string;
  label: string;
  listId: string;
  value: string;
  searching: boolean;
  matches: string[];
  onChange: (value: string) => void;
}) {
  const open = value.trim().length > 0 && (searching || matches.length > 0);
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowDown") return;
    const option = document.getElementById(listId)?.querySelector("button");
    if (option instanceof HTMLButtonElement) {
      event.preventDefault();
      option.focus();
    }
  }
  return (
    <div className="hint-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder="Type for hints..."
        value={value}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      {open ? (
        <ul id={listId} className="hint-list" role="listbox">
          {searching ? (
            <li><span className="hint-pending" role="option" aria-selected={false}>Searching....</span></li>
          ) : matches.map((name) => (
            <li key={name}>
              <button type="button" role="option" aria-selected={false} onClick={() => onChange(name)}>{name}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
