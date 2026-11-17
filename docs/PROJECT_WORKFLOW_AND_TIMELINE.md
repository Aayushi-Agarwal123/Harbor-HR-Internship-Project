# Project workflow and timeline

Dates below are the dates written in the repository notes. This file does not add dates that those notes do not contain. Git history was not used. The workspace git root is not this project's history.

## 1. Guide and objectives

`OrangeHRM_REA_Reverse_Engineering_Guide.md` defines the study: permitted observation of the public demo, a screen inventory, workflow notes, and a local React, FastAPI, and PostgreSQL HRMS. It forbids copying OrangeHRM source, bulk scraping, and demo writes. It requires a terms check before automated scenario capture.

## 2. Early evidence and the first local app

`docs/test-report.md` is dated 2026-11-14. By then the local API used PostgreSQL database `harbor`, login worked, and the employee total was 55. Pytest of the API and `harbor_test` was 5 passed. Playwright was 9 passed on SQLite. The README still described only Authentication, Dashboard, and PIM as the prototype. That README sentence was not rewritten when later modules were added.

Employee-list evidence includes `evidence/employee-list.redacted.json` and `evidence/employee-list-2026-11-12.redacted.json`. Add Employee and login evidence are `evidence/add-employee.redacted.json` and `evidence/login-page.redacted.json`.

## 3. Read-only module inspection

`docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` records 2026-11-15. An existing Chrome session on `127.0.0.1:9222` was already signed in. Login was not submitted. Sidebar clicks opened Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, and Buzz. Maintenance Cancel returned to the dashboard. Confirm was not clicked. Save was not clicked. The report's closing "not opened" list was accurate for that session.

## 4. Later page inspections

Redacted files dated by their contents, not by a new capture in this documentation pass, record pages the 15 November report had not opened:

- `evidence/leave-apply.redacted.json`, `evidence/my-leave.redacted.json`, `evidence/assign-leave.redacted.json`, `evidence/leave-list.redacted.json`
- `evidence/time-landing.redacted.json`, `evidence/timesheets-menu.redacted.json`, `evidence/my-timesheet.redacted.json`
- `evidence/attendance-records.redacted.json`, `evidence/my-attendance-records.redacted.json`, `evidence/attendance-configuration.redacted.json`

Those files say which buttons were not clicked. Project Info remains an unopened label.

## 5. Terms and comparison

On 2026-11-15, `docs/evidence/REQ-003-demo-terms-check.md`, `REQ-003-investigation.md`, and `REQ-003-final-check.md` looked for a demo terms page and did not find one. Privacy policies, the GPL, and the vulnerability policy were read as different documents.

`docs/evidence/REQ-055-scenario-comparison.md` records the passive comparison `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c`. It returned `changed`. The passive input rejected `normalization`. No scenario pair with the same step IDs was found.

On 2026-11-16, `docs/evidence/REQ-003-REQ-055-closeout-2026-11-16.md` re-read the vulnerability policy and the SaaS agreement. REQ-003 became PARTIAL. REQ-055 stayed NOT VERIFIED. No new capture was made.

## 6. Local module implementation

Migrations `001_init.sql` through `004_workflows.sql` add employees, timesheets, leave, recruitment, performance, claims, contacts, vacancies, trackers, and Buzz. Routers are `backend/app/routers/auth.py`, `employees.py`, `reports.py`, `timesheets.py`, `records.py`, and `workflow.py`.

The frontend grew from PIM pages to `LeavePage.tsx`, `TimePage.tsx`, `RecruitmentPage.tsx`, `MyInfoPage.tsx`, `PerformancePage.tsx`, `DirectoryPage.tsx`, `MaintenancePage.tsx`, `ClaimPage.tsx`, `BuzzPage.tsx`, and `AdminPage.tsx`. Shared lists use `RecordsBoard.tsx`.

The timesheet UI was later aligned to the observed screens. Create, edit, approve, and delete are not offered on the page. The API routes remain. One timesheet row in `harbor` was preserved.

## 7. Verification recorded on 2026-11-16

The closure audit recorded `tsc --noEmit` exit 0, `vite build` exit 0 in 3.49s, pytest 9 passed in 33.07s, and Playwright 11 passed in 59.4s. After that run, `harbor` still had 55 employees and 1 timesheet. The API was restarted on `harbor` without `HARBOR_RESET`. Vite listened on port 5173.

The signed-in local browser showed Dashboard, PIM, Leave List, Apply Leave, Assign Leave, My Leave List, Select Employee, My Timesheet, the three Attendance headings, Candidates, Personal Details, Employee Reviews, Directory, Administrator Access, Employee Claims, Buzz, and System Users.

## 8. Traceability

`docs/FINAL_REQUIREMENT_TRACEABILITY.md` is the 57-row register. `docs/requirements.md` is a separate 18-row OBSERVED and PROPOSED list. `docs/REMAINING_MODULES.md` is the module-status note. Older handoff files such as `docs/FINAL_HANDOFF_SUMMARY.md` and `docs/test-report.md` keep earlier counts. They are historical. They are not the current totals.
