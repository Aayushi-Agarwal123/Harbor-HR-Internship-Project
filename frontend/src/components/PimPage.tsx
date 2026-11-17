import { useState } from "react";
import type { PimView } from "../routes";
import { EmployeeDetailPage } from "./pim/EmployeeDetailPage";
import { EmployeeForm } from "./pim/EmployeeForm";
import { EmployeeListPage } from "./pim/EmployeeListPage";
import { EmployeeReportsPage } from "./pim/EmployeeReportsPage";

interface PimPageProps {
  view: PimView;
  employeeId: number | null;
  onNavigate: (view: PimView, employeeId: number | null) => void;
}

export function PimPage({ view, employeeId, onNavigate }: PimPageProps) {
  const [listKey, setListKey] = useState(0);

  return (
    <section>
      <header className="topbar">
        <h1>PIM</h1>
      </header>
      <nav className="module-links" aria-label="PIM">
        <span className="module-text">Configuration</span>
        <button type="button" className={view === "list" || view === "detail" || view === "edit" ? "nav-current" : undefined} aria-current={view === "list" ? "page" : undefined} onClick={() => onNavigate("list", null)}>
          Employee List
        </button>
        <button type="button" className={view === "add" ? "nav-current" : undefined} aria-current={view === "add" ? "page" : undefined} onClick={() => onNavigate("add", null)}>
          Add Employee
        </button>
        <button type="button" className={view === "reports" ? "nav-current" : undefined} aria-current={view === "reports" ? "page" : undefined} onClick={() => onNavigate("reports", null)}>
          Reports
        </button>
      </nav>
      {view === "list" ? (
        <EmployeeListPage key={listKey} onOpenAdd={() => onNavigate("add", null)} onOpenDetails={(id) => onNavigate("detail", id)} />
      ) : null}
      {view === "add" ? (
        <EmployeeForm
          title="Add Employee"
          onCancel={() => onNavigate("list", null)}
          onSaved={(id) => {
            setListKey((value) => value + 1);
            onNavigate("detail", id);
          }}
        />
      ) : null}
      {view === "detail" && employeeId !== null ? (
        <EmployeeDetailPage employeeId={employeeId} onBack={() => onNavigate("list", null)} onEdit={() => onNavigate("edit", employeeId)} />
      ) : null}
      {view === "edit" && employeeId !== null ? (
        <EmployeeForm
          title="Edit Employee"
          employeeId={employeeId}
          onCancel={() => onNavigate("detail", employeeId)}
          onSaved={() => {
            setListKey((value) => value + 1);
            onNavigate("detail", employeeId);
          }}
        />
      ) : null}
      {view === "reports" ? <EmployeeReportsPage /> : null}
      <p className="page-footer">OrangeHRM OS 5.9</p>
    </section>
  );
}
