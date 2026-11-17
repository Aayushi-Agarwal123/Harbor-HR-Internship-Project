import { useEffect, useRef, useState, type FormEvent } from "react";
import { ApiError, api, type ContactDetails, type EmergencyContact, type Employee, type EmployeeInput } from "../api/client";
import { employmentStatusOptions, jobTitleOptions, subUnitOptions } from "../data/synthetic";

const SYNTHETIC_PROFILE_NAME = "Asha Sharma";

const sections = ["Personal Details", "Contact Details", "Emergency Contacts", "Job"] as const;
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

export function MyInfoPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [draft, setDraft] = useState<EmployeeInput | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [section, setSection] = useState<Section>("Personal Details");
  const [editing, setEditing] = useState(false);
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [emergency, setEmergency] = useState({ name: "", relationship: "", home_phone: "", mobile_phone: "", work_phone: "" });
  const contactSave = useRef(0);

  const emptyContact: ContactDetails = {
    street1: "", street2: "", city: "", state: "", postal_code: "", country: "",
    home_phone: "", mobile_phone: "", work_phone: "", work_email: "", other_email: "",
  };

  function startEdit(row: Employee) {
    setDraft({
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      job_title: row.job_title,
      employment_status: row.employment_status,
      sub_unit: row.sub_unit,
      supervisor: row.supervisor,
      scope: row.scope,
    });
    setEditing(true);
    setMessage(null);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!employee || !draft) return;
    try {
      const saved = await api.updateEmployee(employee.id, draft);
      setEmployee(saved);
      setEditing(false);
      setMessage(null);
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : "The profile could not be saved.");
    }
  }

  useEffect(() => {
    api.employees({ name: SYNTHETIC_PROFILE_NAME, page: 1, page_size: 10, sort: "employee_number", direction: "asc" })
      .then((page) => {
        const match = page.items.find((item) => `${item.first_name} ${item.last_name}` === SYNTHETIC_PROFILE_NAME);
        if (!match) {
          setMessage("The seeded Harbor HR profile Asha Sharma was not found.");
          return;
        }
        setEmployee(match);
        api.contact(match.id).then(setContact).catch(() => setContact(emptyContact));
        api.emergencyContacts(match.id).then((page) => setContacts(page.items)).catch(() => setContacts([]));
      })
      .catch((error: unknown) => {
        setMessage(error instanceof ApiError ? error.message : "The local profile could not be loaded.");
      });
  }, []);

  const fullName = employee
    ? [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ")
    : "";

  return (
    <section>
      <header className="topbar">
        <h1>My Info</h1>
      </header>
      <article className="panel">
        <p className="muted">
          Local synthetic profile {SYNTHETIC_PROFILE_NAME}. This is a seeded Harbor HR employee, not the OrangeHRM reference account.
        </p>
        {message ? <p className="form-message" role="alert">{message}</p> : null}
        {!employee && !message ? <p className="muted">Loading profile.</p> : null}
        <nav className="module-links" aria-label="My Info sections">
          {sections.map((name) => (
            <button
              key={name}
              type="button"
              className={name === section ? "nav-current" : undefined}
              aria-current={name === section ? "page" : undefined}
              onClick={() => setSection(name)}
            >
              {name}
            </button>
          ))}
        </nav>
        {employee && section === "Personal Details" ? (
          <>
            <h2>Personal Details</h2>
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
            <h2>Custom Fields</h2>
            <FieldList rows={[["Blood Type", notStored]]} />
            <h2>Attachments</h2>
            <p className="muted">Attachments were visible. Their column names were not recorded, and none are stored here.</p>
            <p className="time-note">
              OrangeHRM Save was visible and was not clicked. Name fields already stored in Harbor HR can be saved. License, nationality, and the other blank fields stay inactive because they were not stored.
            </p>
            {editing && draft ? (
              <form className="pim-form" onSubmit={(event) => void save(event)}>
                <label>First Name<input value={draft.first_name} onChange={(event) => setDraft({ ...draft, first_name: event.target.value })} /></label>
                <label>Middle Name<input value={draft.middle_name} onChange={(event) => setDraft({ ...draft, middle_name: event.target.value })} /></label>
                <label>Last Name<input value={draft.last_name} onChange={(event) => setDraft({ ...draft, last_name: event.target.value })} /></label>
                <div className="form-actions">
                  <button type="submit">Save</button>
                  <button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <button type="button" onClick={() => startEdit(employee)}>Edit</button>
            )}
          </>
        ) : null}
        {employee && section === "Contact Details" ? (
          <>
            <h2>Contact Details</h2>
            <p className="time-note">These fields were visible and were not saved on OrangeHRM. Saving them is proposed Harbor HR behavior for this profile only.</p>
            {contact ? (
              <form className="pim-form" onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const next: ContactDetails = {
                  street1: String(data.get("street1") ?? ""),
                  street2: String(data.get("street2") ?? ""),
                  city: String(data.get("city") ?? ""),
                  state: String(data.get("state") ?? ""),
                  postal_code: String(data.get("postal_code") ?? ""),
                  country: String(data.get("country") ?? ""),
                  home_phone: String(data.get("home_phone") ?? ""),
                  mobile_phone: String(data.get("mobile_phone") ?? ""),
                  work_phone: String(data.get("work_phone") ?? ""),
                  work_email: String(data.get("work_email") ?? ""),
                  other_email: String(data.get("other_email") ?? ""),
                };
                const saveId = contactSave.current + 1;
                contactSave.current = saveId;
                setContact(next);
                api.saveContact(employee.id, next).then((saved) => {
                  if (contactSave.current === saveId) setContact(saved);
                }).catch((error: unknown) => {
                  setMessage(error instanceof ApiError ? error.message : "Contact details could not be saved.");
                });
              }}>
                {([
                  ["street1", "Street 1"],
                  ["street2", "Street 2"],
                  ["city", "City"],
                  ["state", "State/Province"],
                  ["postal_code", "Zip/Postal Code"],
                  ["country", "Country"],
                  ["home_phone", "Home"],
                  ["mobile_phone", "Mobile"],
                  ["work_phone", "Work"],
                  ["work_email", "Work Email"],
                  ["other_email", "Other Email"],
                ] as Array<[keyof ContactDetails, string]>).map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <input name={key} value={contact[key]} onChange={(event) => setContact({ ...contact, [key]: event.target.value })} />
                  </label>
                ))}
                <button type="submit">Save</button>
              </form>
            ) : <p className="muted">Loading contact details.</p>}
          </>
        ) : null}
        {employee && section === "Emergency Contacts" ? (
          <>
            <h2>Emergency Contacts</h2>
            <p className="time-note">Observed columns: Name, Relationship, Home Telephone, Mobile, Work Telephone, Actions. Saving a contact is proposed Harbor HR behavior for this profile only.</p>
            <form className="pim-form" onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const next = {
                name: String(data.get("name") ?? ""),
                relationship: String(data.get("relationship") ?? ""),
                home_phone: String(data.get("home_phone") ?? ""),
                mobile_phone: String(data.get("mobile_phone") ?? ""),
                work_phone: String(data.get("work_phone") ?? ""),
              };
              api.createEmergency(employee.id, next).then((row) => {
                setContacts((current) => [...current, row]);
                setEmergency({ name: "", relationship: "", home_phone: "", mobile_phone: "", work_phone: "" });
              }).catch((error: unknown) => {
                setMessage(error instanceof ApiError ? error.message : "The contact could not be saved.");
              });
            }}>
              <label>Name<input name="name" value={emergency.name} onChange={(event) => setEmergency({ ...emergency, name: event.target.value })} /></label>
              <label>Relationship<input name="relationship" value={emergency.relationship} onChange={(event) => setEmergency({ ...emergency, relationship: event.target.value })} /></label>
              <label>Home Telephone<input name="home_phone" value={emergency.home_phone} onChange={(event) => setEmergency({ ...emergency, home_phone: event.target.value })} /></label>
              <label>Mobile<input name="mobile_phone" value={emergency.mobile_phone} onChange={(event) => setEmergency({ ...emergency, mobile_phone: event.target.value })} /></label>
              <label>Work Telephone<input name="work_phone" value={emergency.work_phone} onChange={(event) => setEmergency({ ...emergency, work_phone: event.target.value })} /></label>
              <button type="submit">Save</button>
            </form>
            {contacts.length === 0 ? <p className="info-note">No emergency contacts are stored.</p> : null}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th><th>Relationship</th><th>Home Telephone</th><th>Mobile</th><th>Work Telephone</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.relationship}</td>
                      <td>{row.home_phone}</td>
                      <td>{row.mobile_phone}</td>
                      <td>{row.work_phone}</td>
                      <td><button type="button" className="secondary" onClick={() => {
                        api.deleteEmergency(employee.id, row.id).then(() => setContacts((current) => current.filter((item) => item.id !== row.id))).catch((error: unknown) => {
                          setMessage(error instanceof ApiError ? error.message : "The contact could not be deleted.");
                        });
                      }}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2>Attachments</h2>
            <p className="muted">Attachment columns were reported to match the other profile pages. The column names were not recorded.</p>
          </>
        ) : null}
        {employee && section === "Job" ? (
          <>
            <h2>Job</h2>
            <FieldList
              rows={[
                ["Joined Date", notStored],
                ["Job Title", employee.job_title],
                ["Job Specification", notStored],
                ["Job Category", notStored],
                ["Sub Unit", employee.sub_unit],
                ["Location", notStored],
                ["Employment Status", employee.employment_status],
                ["Include Employment Contract Details", notStored],
              ]}
            />
            <p className="time-note">Joined date, location, and contract details were not stored. Job title, sub unit, and employment status can be saved.</p>
            {editing && draft && section === "Job" ? (
              <form className="pim-form" onSubmit={(event) => void save(event)}>
                <label>
                  Job Title
                  <select value={draft.job_title} onChange={(event) => setDraft({ ...draft, job_title: event.target.value })}>
                    <option value="">-- Select --</option>
                    {jobTitleOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Sub Unit
                  <select value={draft.sub_unit} onChange={(event) => setDraft({ ...draft, sub_unit: event.target.value })}>
                    <option value="">-- Select --</option>
                    {subUnitOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Employment Status
                  <select value={draft.employment_status} onChange={(event) => setDraft({ ...draft, employment_status: event.target.value })}>
                    <option value="">-- Select --</option>
                    {employmentStatusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <div className="form-actions">
                  <button type="submit">Save</button>
                  <button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <button type="button" onClick={() => startEdit(employee)}>Edit</button>
            )}
          </>
        ) : null}
      </article>
    </section>
  );
}
