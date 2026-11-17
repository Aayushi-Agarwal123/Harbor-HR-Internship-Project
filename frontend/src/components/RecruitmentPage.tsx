import { useState } from "react";
import { api, type Candidate, type CandidateInput, type Vacancy } from "../api/client";
import { jobTitleOptions } from "../data/synthetic";
import { RecordsBoard } from "./RecordsBoard";

const statuses = ["Application Initiated", "Shortlisted", "Rejected"];
const methods = ["Manual", "Online"];
const blank: Record<string, string> = {
  candidate_name: "",
  vacancy: "",
  hiring_manager: "",
  application_date: "",
  status: "Application Initiated",
  keywords: "",
  method: "",
};

function body(form: Record<string, string>): CandidateInput {
  return {
    candidate_name: form.candidate_name,
    vacancy: form.vacancy,
    hiring_manager: form.hiring_manager,
    application_date: form.application_date,
    status: form.status,
    keywords: form.keywords,
    method: form.method,
  };
}

const vacancyBlank: Record<string, string> = {
  job_title: "",
  vacancy_name: "",
  hiring_manager: "",
  status: "Open",
};

export function RecruitmentPage() {
  const [view, setView] = useState<"candidates" | "vacancies">("candidates");
  return (
    <>
      <nav className="module-links" aria-label="Recruitment">
        <button type="button" className={view === "candidates" ? "nav-current" : undefined} onClick={() => setView("candidates")}>Candidates</button>
        <button type="button" className={view === "vacancies" ? "nav-current" : undefined} onClick={() => setView("vacancies")}>Vacancies</button>
      </nav>
      {view === "vacancies" ? (
        <RecordsBoard<Vacancy>
          title="Recruitment"
          heading="Vacancies"
          note="The Vacancies page was not opened on OrangeHRM. This list is proposed Harbor HR behavior. Job titles come from the recorded employee catalog. Status Open and Closed are Harbor HR choices."
          currentNav="Vacancies"
          disabledNav={[]}
          hideNav
          empty="No local vacancies are stored."
          headers={["Vacancy", "Job Title", "Hiring Manager", "Status"]}
          filters={[]}
          fields={[
            { name: "vacancy_name", label: "Vacancy", kind: "text" },
            { name: "job_title", label: "Job Title", kind: "select", options: jobTitleOptions.filter((option) => option !== "-- Select --") },
            { name: "hiring_manager", label: "Hiring Manager", kind: "text" },
            { name: "status", label: "Status", kind: "select", options: ["Open", "Closed"] },
          ]}
          blank={vacancyBlank}
          load={() => api.vacancies()}
          save={async (id, form) => {
            const body = { job_title: form.job_title, vacancy_name: form.vacancy_name, hiring_manager: form.hiring_manager, status: form.status };
            if (id === null) await api.createVacancy(body);
            else await api.updateVacancy(id, body);
          }}
          remove={(id) => api.deleteVacancy(id)}
          cells={(row) => [row.vacancy_name, row.job_title, row.hiring_manager, row.status]}
          toForm={(row) => ({ job_title: row.job_title, vacancy_name: row.vacancy_name, hiring_manager: row.hiring_manager, status: row.status })}
        />
      ) : (
    <RecordsBoard<Candidate>
      title="Recruitment"
      heading="Candidates"
      note="Candidate rows were not copied. Creating a candidate is proposed Harbor HR behavior. Status and method options were not recorded, so these lists are Harbor HR choices. Job Title stays inactive on this list because it belongs to a vacancy."
      currentNav="Candidates"
      disabledNav={[]}
      hideNav
      empty="No local candidates match this search."
      headers={["Vacancy", "Candidate", "Hiring Manager", "Date of Application", "Status"]}
      filters={[
        {
          name: "job_title",
          label: "Job Title",
          kind: "disabled",
          reason: "Job Title was a filter. Candidate rows were not copied, and a separate job title is not stored.",
        },
        { name: "vacancy", label: "Vacancy", kind: "text" },
        { name: "hiring_manager", label: "Hiring Manager", kind: "text" },
        { name: "status", label: "Status", kind: "select", options: statuses },
        { name: "candidate_name", label: "Candidate Name", kind: "text" },
        { name: "keywords", label: "Keywords", kind: "text" },
        { name: "application_from", label: "Date of Application From", kind: "date" },
        { name: "application_to", label: "Date of Application To", kind: "date" },
        { name: "method", label: "Method of Application", kind: "select", options: methods },
      ]}
      fields={[
        { name: "candidate_name", label: "Candidate Name", kind: "text" },
        { name: "vacancy", label: "Vacancy", kind: "text" },
        { name: "hiring_manager", label: "Hiring Manager", kind: "text" },
        { name: "application_date", label: "Date of Application", kind: "date" },
        { name: "status", label: "Status", kind: "select", options: statuses },
        { name: "method", label: "Method of Application", kind: "select", options: methods },
        { name: "keywords", label: "Keywords", kind: "text" },
      ]}
      blank={blank}
      load={(filters) => api.candidates(filters)}
      save={async (id, form) => {
        if (id === null) await api.createCandidate(body(form));
        else await api.updateCandidate(id, body(form));
      }}
      remove={(id) => api.deleteCandidate(id)}
      cells={(row) => [row.vacancy, row.candidate_name, row.hiring_manager, row.application_date, row.status]}
      toForm={(row) => ({
        candidate_name: row.candidate_name,
        vacancy: row.vacancy,
        hiring_manager: row.hiring_manager,
        application_date: row.application_date,
        status: row.status,
        keywords: row.keywords,
        method: row.method,
      })}
    />
      )}
    </>
  );
}
