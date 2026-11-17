import { useEffect, useState } from "react";
import { ApiError, api, type Employee } from "../../api/client";

interface EmployeeDetailPageProps {
  employeeId: number;
  onEdit: () => void;
  onBack: () => void;
}

const sections = [
  "Personal Details",
  "Contact Details",
  "Emergency Contacts",
  "Dependents",
  "Immigration",
  "Job",
  "Salary",
  "Report-to",
  "Qualifications",
  "Memberships",
] as const;

type Section = (typeof sections)[number];

const notStored = "Not stored in Harbor HR";

function FieldList({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="detail-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EmployeeDetailPage({ employeeId, onEdit, onBack }: EmployeeDetailPageProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [section, setSection] = useState<Section>("Personal Details");

  useEffect(() => {
    api.employee(employeeId)
      .then(setEmployee)
      .catch((error: unknown) => {
        setMessage(error instanceof ApiError ? error.message : "The employee could not be loaded.");
      });
  }, [employeeId]);

  if (message) {
    return <p className="form-message" role="alert">{message}</p>;
  }
  if (!employee) {
    return <p className="muted">Loading employee details.</p>;
  }

  const fullName = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ");

  return (
    <section className="panel card">
      <h2>Employee Details</h2>
      <p className="muted">
        Section labels follow the signed-in My Info profile. A list-row details page was not opened, and Save was not clicked on the live form.
      </p>
      <nav className="module-links" aria-label="Employee sections">
        {sections.map((name) => (
          <button
            key={name}
            type="button"
            className={name === section ? "nav-current" : undefined}
            onClick={() => setSection(name)}
          >
            {name}
          </button>
        ))}
      </nav>
      {section === "Personal Details" ? (
        <FieldList
          rows={[
            ["Employee Full Name", fullName],
            ["Employee Id", employee.employee_number],
            ["Other Id", notStored],
            ["Driver's License Number", notStored],
            ["License Expiry Date", notStored],
            ["Nationality", notStored],
            ["Marital Status", notStored],
            ["Date of Birth", notStored],
            ["Gender", notStored],
          ]}
        />
      ) : null}
      {section === "Contact Details" ? (
        <FieldList
          rows={[
            ["Street 1", notStored],
            ["Street 2", notStored],
            ["City", notStored],
            ["State/Province", notStored],
            ["Zip/Postal Code", notStored],
            ["Country", notStored],
            ["Home", notStored],
            ["Mobile", notStored],
            ["Work", notStored],
            ["Work Email", notStored],
            ["Other Email", notStored],
          ]}
        />
      ) : null}
      {section === "Emergency Contacts" ? (
        <>
          <p className="info-note">No Records Found</p>
          <p className="muted">Observed columns: Name, Relationship, Home Telephone, Mobile, Work Telephone, Actions. No local contacts are stored.</p>
        </>
      ) : null}
      {section === "Job" ? (
        <FieldList
          rows={[
            ["Joined Date", notStored],
            ["Job Title", employee.job_title],
            ["Job Specification", notStored],
            ["Job Category", notStored],
            ["Sub Unit", employee.sub_unit],
            ["Location", notStored],
            ["Employment Status", employee.employment_status],
          ]}
        />
      ) : null}
      {section !== "Personal Details" && section !== "Contact Details" && section !== "Emergency Contacts" && section !== "Job" ? (
        <p className="muted">{section} was visible on My Info and was not opened. Harbor HR does not store this section.</p>
      ) : null}
      <div className="form-actions">
        <button type="button" className="secondary" onClick={onBack}>Back</button>
        <button type="button" onClick={onEdit}>Edit</button>
      </div>
    </section>
  );
}
