import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ApiError, api } from "../../api/client";
import { Icon } from "../Icons";

const rowGlyphs = ["U+F5DE", "U+F4C9", "U+F3B8"] as const;
const verifiedHint = "PIM Sample Report";
const verifiedPrefix = "PIM";

function recordsText(count: number): string {
  return count === 1 ? "(1) Record Found" : `(${count}) Records Found`;
}

export function EmployeeReportsPage() {
  const hintRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [hintSelected, setHintSelected] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [appliedName, setAppliedName] = useState<string | null>(null);
  const [reportNames, setReportNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.reports()
      .then((rows) => {
        if (!cancelled) setReportNames(rows.map((row) => row.name));
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(reason instanceof ApiError ? reason.message : "The report list could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const suggestionOpen = query.startsWith(verifiedPrefix) && !(hintSelected && query === verifiedHint);
  const visibleReports = appliedName === null
    ? reportNames
    : reportNames.filter((name) => name === appliedName);

  function selectHint() {
    setQuery(verifiedHint);
    setHintSelected(true);
    setInvalid(false);
  }

  function search(event: FormEvent) {
    event.preventDefault();
    if (hintSelected && query === verifiedHint) {
      setAppliedName(verifiedHint);
      setInvalid(false);
      return;
    }
    if (query.length > 0) {
      setInvalid(true);
    }
  }

  function reset() {
    setQuery("");
    setHintSelected(false);
    setInvalid(false);
    setAppliedName(null);
  }

  function onQueryKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && suggestionOpen) {
      event.preventDefault();
      hintRef.current?.focus();
    }
  }

  return (
    <section className="panel">
      <h2>Employee Reports</h2>
      <form className="filters" onSubmit={search}>
        <div className="hint-field">
          <label htmlFor="report-name">Report Name</label>
          <input
            id="report-name"
            placeholder="Type for hints..."
            value={query}
            aria-invalid={invalid}
            aria-autocomplete="list"
            aria-expanded={suggestionOpen}
            aria-controls="report-hint"
            onChange={(event) => {
              setQuery(event.target.value);
              setHintSelected(false);
            }}
            onKeyDown={onQueryKeyDown}
          />
          {invalid ? <p className="field-invalid">Invalid</p> : null}
          {suggestionOpen ? (
            <ul id="report-hint" className="hint-list" role="listbox">
              <li>
                <button
                  ref={hintRef}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={selectHint}
                >
                  {verifiedHint}
                </button>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="filter-actions">
          <button type="button" className="secondary" onClick={reset}>
            Reset
          </button>
          <button type="submit">Search</button>
        </div>
      </form>
      {loading ? <p className="muted">Loading reports.</p> : null}
      {error ? <p className="form-message" role="alert">{error}</p> : null}
      <div className="toolbar">
        <button type="button" className="with-icon" disabled>
          <Icon name="plus" />
          Add
        </button>
      </div>
      <p className="records">{recordsText(visibleReports.length)}</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="check-col">
                <input type="checkbox" disabled aria-label="Selection" />
              </th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleReports.map((name) => (
              <tr key={name}>
                <td>
                  <input type="checkbox" disabled aria-label={`Select ${name}`} />
                </td>
                <td>{name}</td>
                <td className="row-actions">
                  {rowGlyphs.map((glyph) => (
                    <button type="button" className="icon-button" key={glyph} disabled aria-label={`Unavailable action ${glyph}`}>
                      <Icon name="mark" />
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="toolbar">
        <button type="button" className="icon-button" disabled aria-label="Help">
          <Icon name="help" />
        </button>
      </p>
    </section>
  );
}
