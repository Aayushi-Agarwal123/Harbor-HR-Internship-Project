import { api, type Claim, type ClaimInput } from "../api/client";
import { RecordsBoard } from "./RecordsBoard";

const currencies = ["USD", "EUR", "GBP"];
const blank: Record<string, string> = {
  employee_id: "",
  event_name: "",
  description: "",
  currency: "USD",
  submitted_date: "",
  status: "Submitted",
  amount: "",
};

function body(form: Record<string, string>): ClaimInput {
  return {
    employee_id: form.employee_id ? Number(form.employee_id) : null,
    event_name: form.event_name,
    description: form.description,
    currency: form.currency,
    submitted_date: form.submitted_date,
    status: form.status,
    amount: form.amount,
  };
}

export function ClaimPage() {
  return (
    <RecordsBoard<Claim>
      title="Claim"
      heading="Employee Claims"
      note="Creating a claim is proposed Harbor HR behavior. Status Submitted and Cancelled are Harbor HR labels. There is no approval or payment action."
      currentNav="Employee Claims"
      profileName="Asha Sharma"
      activeNav={[
        { label: "Submit Claim", action: "create" },
        { label: "My Claims", action: "profile" },
        { label: "Assign Claim", action: "create" },
      ]}
      disabledNav={[]}
      empty="No local claims match this search."
      headers={["Reference Id", "Employee Name", "Event Name", "Description", "Currency", "Submitted Date", "Status", "Amount"]}
      filters={[
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        { name: "reference_code", label: "Reference Id", kind: "text" },
        { name: "event_name", label: "Event Name", kind: "text" },
        { name: "status", label: "Status", kind: "select", options: ["Submitted", "Cancelled"] },
        { name: "start_date", label: "From Date", kind: "date" },
        { name: "end_date", label: "To Date", kind: "date" },
      ]}
      fields={[
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        { name: "event_name", label: "Event Name", kind: "text" },
        { name: "description", label: "Description", kind: "text" },
        { name: "currency", label: "Currency", kind: "select", options: currencies },
        { name: "submitted_date", label: "Submitted Date", kind: "date" },
        { name: "status", label: "Status", kind: "select", options: ["Submitted", "Cancelled"] },
        { name: "amount", label: "Amount", kind: "text" },
      ]}
      blank={blank}
      load={(filters) => api.claims(filters)}
      save={async (id, form) => {
        if (id === null) await api.createClaim(body(form));
        else await api.updateClaim(id, body(form));
      }}
      remove={(id) => api.deleteClaim(id)}
      cells={(row) => [
        row.reference_code,
        row.employee_name,
        row.event_name,
        row.description,
        row.currency,
        row.submitted_date,
        row.status,
        row.amount,
      ]}
      toForm={(row) => ({
        employee_id: String(row.employee_id),
        event_name: row.event_name,
        description: row.description,
        currency: row.currency,
        submitted_date: row.submitted_date,
        status: row.status,
        amount: row.amount,
      })}
    />
  );
}
