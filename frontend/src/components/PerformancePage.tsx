import { useState } from "react";
import { api, type Review, type ReviewInput, type Tracker } from "../api/client";
import { includeOptions, jobTitleOptions, subUnitOptions } from "../data/synthetic";
import { RecordsBoard } from "./RecordsBoard";

const statuses = ["Activated", "In Progress", "Completed"];
const blank: Record<string, string> = {
  employee_id: "",
  period_start: "",
  period_end: "",
  due_date: "",
  status: "Activated",
};

function body(form: Record<string, string>): ReviewInput {
  return {
    employee_id: form.employee_id ? Number(form.employee_id) : null,
    period_start: form.period_start,
    period_end: form.period_end,
    due_date: form.due_date,
    status: form.status,
  };
}

const trackerBlank: Record<string, string> = { employee_id: "", tracker_name: "", status: "Active" };

export function PerformancePage() {
  const [view, setView] = useState<"reviews" | "mine" | "all">("reviews");
  return (
    <>
      <nav className="module-links" aria-label="Performance">
        <button type="button" disabled title="Configure was visible and was not opened.">Configure</button>
        <button type="button" className={view === "reviews" ? "nav-current" : undefined} onClick={() => setView("reviews")}>Manage Reviews</button>
        <button type="button" className={view === "mine" ? "nav-current" : undefined} onClick={() => setView("mine")}>My Trackers</button>
        <button type="button" className={view === "all" ? "nav-current" : undefined} onClick={() => setView("all")}>Employee Trackers</button>
      </nav>
      {view === "reviews" ? (
    <RecordsBoard<Review>
      title="Performance"
      heading="Employee Reviews"
      note="Saving a review is proposed Harbor HR behavior. Review status options were not recorded. Configure was not opened."
      currentNav="Manage Reviews"
      disabledNav={[]}
      hideNav
      empty="No Records Found"
      headers={["Employee", "Job Title", "Sub Unit", "Review Period", "Due Date", "Review Status"]}
      filters={[
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        { name: "job_title", label: "Job Title", kind: "select", options: jobTitleOptions.filter((option) => option !== "-- Select --") },
        { name: "sub_unit", label: "Sub Unit", kind: "select", options: subUnitOptions.filter((option) => option !== "-- Select --") },
        { name: "include", label: "Include", kind: "select", options: [...includeOptions] },
        { name: "status", label: "Review Status", kind: "select", options: statuses },
        { name: "start_date", label: "From Date", kind: "date" },
        { name: "end_date", label: "To Date", kind: "date" },
      ]}
      fields={[
        { name: "employee_id", label: "Employee Name", kind: "employee" },
        { name: "period_start", label: "From Date", kind: "date" },
        { name: "period_end", label: "To Date", kind: "date" },
        { name: "due_date", label: "Due Date", kind: "date" },
        { name: "status", label: "Review Status", kind: "select", options: statuses },
      ]}
      blank={blank}
      load={(filters) => api.reviews(filters)}
      save={async (id, form) => {
        if (id === null) await api.createReview(body(form));
        else await api.updateReview(id, body(form));
      }}
      remove={(id) => api.deleteReview(id)}
      cells={(row) => [
        row.employee_name,
        row.job_title,
        row.sub_unit,
        `${row.period_start} to ${row.period_end}`,
        row.due_date,
        row.status,
      ]}
      toForm={(row) => ({
        employee_id: String(row.employee_id),
        period_start: row.period_start,
        period_end: row.period_end,
        due_date: row.due_date,
        status: row.status,
      })}
    />
      ) : (
        <RecordsBoard<Tracker>
          key={view}
          title="Performance"
          heading={view === "mine" ? "My Trackers" : "Employee Trackers"}
          note="Tracker pages were not opened on OrangeHRM. These records are proposed Harbor HR behavior. Status Active and Completed are Harbor HR choices."
          currentNav="Trackers"
          disabledNav={[]}
          hideNav
          profileName="Asha Sharma"
          lockToProfile={view === "mine"}
          empty="No Records Found"
          headers={["Employee", "Tracker", "Status"]}
          filters={[{ name: "employee_id", label: "Employee Name", kind: "employee" }]}
          fields={[
            { name: "employee_id", label: "Employee Name", kind: "employee" },
            { name: "tracker_name", label: "Tracker", kind: "text" },
            { name: "status", label: "Status", kind: "select", options: ["Active", "Completed"] },
          ]}
          blank={trackerBlank}
          load={(filters) => api.trackers(filters)}
          save={async (id, form) => {
            const body = {
              employee_id: form.employee_id ? Number(form.employee_id) : null,
              tracker_name: form.tracker_name,
              status: form.status,
            };
            if (id === null) await api.createTracker(body);
            else await api.updateTracker(id, body);
          }}
          remove={(id) => api.deleteTracker(id)}
          cells={(row) => [row.employee_name, row.tracker_name, row.status]}
          toForm={(row) => ({ employee_id: String(row.employee_id), tracker_name: row.tracker_name, status: row.status })}
        />
      )}
    </>
  );
}
