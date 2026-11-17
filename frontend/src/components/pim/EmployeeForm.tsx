import { useEffect, useState, type FormEvent } from "react";
import { ApiError, api, type EmployeeInput } from "../../api/client";
import { employmentStatusOptions, jobTitleOptions, subUnitOptions } from "../../data/synthetic";

interface EmployeeFormProps {
  title: string;
  employeeId?: number;
  onCancel: () => void;
  onSaved: (id: number) => void;
}

const empty: EmployeeInput = {
  first_name: "",
  middle_name: "",
  last_name: "",
  job_title: "",
  employment_status: "",
  sub_unit: "",
  supervisor: "",
  scope: "current",
};

export function EmployeeForm({ title, employeeId, onCancel, onSaved }: EmployeeFormProps) {
  const [input, setInput] = useState<EmployeeInput>(empty);
  const [number, setNumber] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = employeeId
      ? api.employee(employeeId).then((row) => {
          setNumber(row.employee_number);
          setInput({
            first_name: row.first_name,
            middle_name: row.middle_name,
            last_name: row.last_name,
            job_title: row.job_title,
            employment_status: row.employment_status,
            sub_unit: row.sub_unit,
            supervisor: row.supervisor,
            scope: row.scope,
          });
        })
      : api.nextNumber().then((meta) => setNumber(meta.next_employee_number));
    load
      .catch((error: unknown) => {
        setMessage(error instanceof ApiError ? error.message : "The form could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, [employeeId]);

  function update(key: keyof EmployeeInput, value: string) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    try {
      const saved = employeeId
        ? await api.updateEmployee(employeeId, input)
        : await api.createEmployee(input);
      onSaved(saved.id);
    } catch (error) {
      if (error instanceof ApiError) {
        setFields(error.fields);
        setMessage(Object.keys(error.fields).length ? null : error.message);
      }
    }
  }

  if (loading) {
    return <p className="muted">Loading the employee form.</p>;
  }

  return (
    <section className="panel card">
      <h2>{title}</h2>
      <p className="muted">Local save. This is not the OrangeHRM Save action, which was not submitted.</p>
      <form className="pim-form" noValidate onSubmit={submit}>
        <div>
          <span className="field-label">Employee Full Name</span>
          <span className="required" aria-hidden="true"> *</span>
        </div>
        <div className="field-row">
          <label>
            First Name
            <input value={input.first_name} onChange={(event) => update("first_name", event.target.value)} />
            {fields.first_name ? <span className="field-invalid">{fields.first_name}</span> : null}
          </label>
          <label>
            Middle Name
            <input value={input.middle_name} onChange={(event) => update("middle_name", event.target.value)} />
          </label>
          <label>
            Last Name
            <input value={input.last_name} onChange={(event) => update("last_name", event.target.value)} />
            {fields.last_name ? <span className="field-invalid">{fields.last_name}</span> : null}
          </label>
        </div>
        <label>
          Employee Id
          <input value={number} readOnly aria-label="Employee Id" />
        </label>
        <label>
          Employment Status
          <select value={input.employment_status} onChange={(event) => update("employment_status", event.target.value)}>
            <option value="">-- Select --</option>
            {employmentStatusOptions.filter((option) => option !== "-- Select --").map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Job Title
          <select value={input.job_title} onChange={(event) => update("job_title", event.target.value)}>
            <option value="">-- Select --</option>
            {jobTitleOptions.filter((option) => option !== "-- Select --").map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Sub Unit
          <select value={input.sub_unit} onChange={(event) => update("sub_unit", event.target.value)}>
            <option value="">-- Select --</option>
            {subUnitOptions.filter((option) => option !== "-- Select --").map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="check-line">
          <input type="checkbox" disabled />
          Create Login Details
        </label>
        <div className="file-box">
          <button type="button" disabled>Choose File</button>
          <p className="muted">Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px</p>
        </div>
        <p className="muted"><span className="required">*</span> Required</p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        <div className="form-actions">
          <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}
