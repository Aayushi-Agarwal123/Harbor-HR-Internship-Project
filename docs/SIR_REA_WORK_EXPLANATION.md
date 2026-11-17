# OrangeHRM REA and Harbor HR: explanation of the work

Date: 2026-11-16. This note explains the work recorded in this repository. It is written so a mentor can read it without a presentation. It is not a claim of complete OrangeHRM parity.

The repository does not contain a project git history that was used to assign each file to one person. The activities below are the activities the notes, evidence files, and source actually record. Activities that those files do not record are not added here.

Supporting documents, all dated 2026-11-16 unless noted:

- `docs/PROJECT_COMPLETE_OVERVIEW.md`
- `docs/REA_REVERSE_ENGINEERING_REPORT.md`
- `docs/HARBOR_HR_IMPLEMENTATION_REPORT.md`
- `docs/REQUIREMENT_BY_REQUIREMENT_AUDIT.md`
- `docs/PROJECT_WORKFLOW_AND_TIMELINE.md`
- `docs/PROJECT_FINAL_HANDOFF.md`
- `docs/FINAL_REQUIREMENT_TRACEABILITY.md` (the 57-row status register)

## 1. Project introduction

OrangeHRM was the application under study. The public demo at `https://opensource-demo.orangehrmlive.com` was inspected as a running product. Its source code was not copied. The goal of the inspection was to see screens, labels, routes, tables, and navigation that a user can reach, and to record what was not opened or not clicked.

REA, the reverse-engineering tooling available in the workspace, was used to inspect pages, keep evidence identifiers, and compare captures when a comparison was allowed by the existing evidence. Browser inspection of an already signed-in Chrome session was also used. The 2026-11-15 inspection note records that session on `127.0.0.1:9222`. Login was not submitted during that session.

Reverse engineering was performed because the guide, `OrangeHRM_REA_Reverse_Engineering_Guide.md`, asks for a black-box study: observe normal behavior, keep a screen inventory and a navigation map, record HTTP method, path, and status when a request was actually seen, and do not invent hidden APIs, password hashing, or database tables. Writes on the shared demo were not allowed. Automated scenario capture was allowed only after the site terms were confirmed.

The final objective was a small self-owned HRMS, Harbor HR. It uses its own React interface, its own FastAPI service, and its own PostgreSQL database named `harbor`. It does not call the OrangeHRM demo. Local behavior that was not clicked on the demo is labeled proposed. It is not described as an observed OrangeHRM save.

## 2. How the application was inspected

Inspection started from the guide and from page evidence, then moved through the signed-in demo by clicking the sidebar. Each click that changed the URL was recorded as an observed navigation relationship. Quick Launch buttons on the first dashboard inspection were seen and not clicked. Later Leave and Time URLs came from menu or top-bar navigation, not from those Quick Launch clicks.

Routes were taken from the address bar after navigation. Examples that are recorded:

- Login form action `/web/index.php/auth/validate`, and the terms-check page `/web/index.php/auth/login`
- Dashboard and module landings under `/web/index.php/`, including `pim/viewEmployeeList`, `leave/viewLeaveList`, `time/viewEmployeeTimesheet`, `recruitment/viewCandidates`, `admin/viewSystemUsers`, `performance/searchEvaluatePerformanceReview`, `directory/viewDirectory`, `maintenance/purgeEmployee`, `claim/viewAssignClaim`, and `buzz/viewBuzz`

UI work was label-level. Headings, filter names, table headers, empty-state text, and button names were recorded. Forms were not submitted on the demo. Save, Assign, Edit, Submit, Post, and Confirm were not clicked. Cell values and account display names were not copied into the written reports.

Evidence was stored as REA evidence identifiers (`ev_…`) and as redacted JSON under `evidence/`. The written inspection note is `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` (2026-11-15). Later redacted files cover Apply Leave, My Leave, Assign Leave, Leave List, timesheets, My Timesheet, and three Attendance pages. Those files supersede the 15 November “not opened” list for those pages only. Original evidence JSON was not edited in place to strip labels. REQ-008 remains PARTIAL because some JSON files still store account display labels and some screenshots were not kept.

Observations were turned into structured notes: a screen inventory, a navigation map, workflow specifications, an API observation register, a requirements list, and the 57-row traceability register. Each implemented Harbor HR function is tied either to an evidence identifier or to an explicit design assumption.

Unknowns were left unknown. If a button was visible and not used, Harbor HR either leaves that control disabled with a recorded reason, or implements a local behavior and labels it proposed. Counts such as “15 records” or “155 records” are visit counts from the inspection, not Harbor HR data.

## 3. What was detected

Classes used in the project: **observed** means a recorded page fact; **derived** means a count the inspection itself recorded for that visit; **unknown** means it was not established; **proposed** means a Harbor HR design.

### Login

Observed heading `Login`, Username, Password, the Login button, and “Forgot your password?”. Evidence `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Success text, failure text, and logout were not observed. Login was not submitted.

### Dashboard

Observed heading `Dashboard`. Sidebar order: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz. Widgets: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location. Quick Launch names: Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet. Search and Upgrade were visible. Dashboard GET requests for time-at-work, action summary, shortcuts, the Buzz feed, leaves, subunit, and locations returned HTTP 200. Response bodies were not decoded. Punch times and location chart values are unknown. Evidence includes `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`.

### PIM

Employee List at `/pim/viewEmployeeList`. Filters include Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title, and Sub Unit. Columns include Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor, and Actions. A Freelance employment-status search returned `No Records Found`, and Reset was used. That is in the 2026-11-14 interaction note. Name, id, job title, subunit, and supervisor searches were not submitted. Header clicks did not change `sortField` or `sortOrder`. Cell values were not saved. Visit counts differed (`127`, later `146`). Those counts are derived for that visit only. An observed employee-list request was `GET /web/index.php/api/v2/pim/employees` with status 200. That path is an OrangeHRM observation. It is not the Harbor HR API.

Add Employee at `/pim/addEmployee` showed First Name, Middle Name, Last Name, Employee Id, Create Login Details, Choose File, Cancel, and Save. Save was not clicked.

Reports at `/pim/viewDefinedPredefinedReports` showed Employee Reports, including PIM Sample Report and All Employee Sub Unit Hierarchy Report. Search and Reset were not clicked. Two other report names were not extracted.

My Info opened `/pim/viewPersonalDetails/empNumber/7`. That was the signed-in profile, not a row chosen from the employee list. Personal Details, Contact Details, Emergency Contacts, and Job were opened. Save was not clicked. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened.

### Leave

Leave List at `/leave/viewLeaveList`. Columns: Date, Employee Name, Leave Type, Leave Balance (Days), Number of Days, Status, Comments, Actions. Empty text `No Records Found`. Status text included `-- Select --` and `Pending Approval`.

Apply Leave at `/leave/applyLeave` showed `No Leave Types with Leave Balance` and no form fields. Nothing was submitted. Evidence `ev_6bba3523be55168510070545ba5ae2bdf2c34be3fac0ec67777de82f922c7521`.

My Leave List at `/leave/viewMyLeaveList` showed From Date, To Date, and status values including Rejected, Cancelled, Pending Approval, Scheduled, and Taken. The list was empty. Filters were not changed and Search was not submitted. Evidence `ev_2217b0b987f3bd75cb88f5cf03b07ce07b5359493eeb88b7112a7fe8f0e70b85`.

Assign Leave at `/leave/assignLeave` showed Employee Name, Leave Type, Leave Balance `0.00 Day(s)`, From Date, To Date, Comments, and Assign. Assign was not clicked. Leave Type options were not opened. Evidence `ev_89af69caaf97f044e76e52d1ab3e9261acf9e73e870bd9a1f63f362b9346aaba`.

Entitlements, Reports, and Configure were visible and were not opened.

### Time, Attendance, and Project Info

Employee Timesheets at `/time/viewEmployeeTimesheet`. Menu items My Timesheets and Employee Timesheets. Headings Select Employee and Timesheets Pending Action. Columns Employee Name, Timesheet Period, and Actions. View was not clicked.

My Timesheet at `/time/viewMyTimesheet` showed a period textbox, `Status: Not Submitted`, and Edit and Submit. Neither button was clicked. Table headers included Project, Activity, day columns, and Total. Cell values were not saved. Evidence `ev_b2964dacd0d97287223046488621ca652a325b2375b113426e34a6b85e2a273a`.

Attendance menu items My Records, Punch In/Out, Employee Records, and Configuration were visible. Punch In/Out was not opened. The three opened pages were Employee Attendance Records (`/attendance/viewAttendanceRecord`), My Attendance Records (`/attendance/viewMyAttendanceRecord`), and Attendance Configuration (`/attendance/configure`). View and Save were not clicked. Configuration showed three checked boxes. Punch values were not saved.

Project Info was top-bar text on Time pages and was not opened. It is unknown. It is not requirement REQ-055.

### Recruitment, Performance, Directory, Maintenance, Claim, Buzz, Admin

| Module | What was opened | What was not established |
|---|---|---|
| Recruitment | Candidates at `/recruitment/viewCandidates`. Derived count `(15) Records Found` for that visit. | Vacancies page. Status and method option lists. Row values. |
| Performance | Employee Reviews at `/performance/searchEvaluatePerformanceReview`. Empty text `No Records Found`. | My Trackers, Employee Trackers, Configure, evaluation, and approval. |
| Directory | `/directory/viewDirectory`. Filters Employee Name, Job Title, and Location. Derived count `(155) Records Found`. | Search and Reset were not clicked. Card contents were not copied. |
| Maintenance | `/maintenance/purgeEmployee` showed a credential gate, not a purge form. Cancel returned to `/dashboard/index`. | Confirm was not clicked. The purge screen is unknown. |
| Claim | Employee Claims at `/claim/viewAssignClaim`. Derived count `(3) Records Found`. Status text `Submitted` was visible. | Submit Claim, My Claims, Assign Claim, View Details, and row values. |
| Buzz | `/buzz/viewBuzz`. Share Photos, Share Video, Post, and the textbox `What's on your mind?`. | Post was not clicked. Feed text was not copied. |
| Admin | System Users at `/admin/viewSystemUsers`. Derived count `(16) Records Found`. Filters Username, User Role, Employee Name, and Status. | Add, configuration labels, user rows, and roles. Admin writes are out of scope. |

## 4. Requirement analysis

The guide’s tasks were written as REQ-001 through REQ-057 in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. A separate file, `docs/requirements.md`, has 18 rows tagged OBSERVED or PROPOSED. That file is not the status register and does not use PASS, PARTIAL, NOT VERIFIED, or OUT OF SCOPE.

Each register row has the requirement, the evidence or source that supports it, the Harbor HR file when one exists, how it was checked, one status, the remaining limitation, and the next action. Statuses were not changed while writing this explanation.

The register defines the four statuses:

- **PASS** — current files support the requirement.
- **PARTIAL** — part of the requirement is present and a named gap remains.
- **NOT VERIFIED** — the required evidence was not produced.
- **OUT OF SCOPE** — the guide marks the item optional or excluded.

Latest breakdown, 57 unique rows, one status each:

- **40 PASS**
- **13 PARTIAL:** REQ-003, REQ-006, REQ-008, REQ-014, REQ-020, REQ-025, REQ-026, REQ-028, REQ-037, REQ-038, REQ-039, REQ-041, REQ-051
- **1 NOT VERIFIED:** REQ-055
- **3 OUT OF SCOPE:** REQ-027 (Admin settings), REQ-044 (optional public login scenario), REQ-045 (optional frontend script analysis)

The full table of requirement text and remaining limitation is `docs/REQUIREMENT_BY_REQUIREMENT_AUDIT.md`.

## 5. Harbor HR implementation

An independent HRMS was built because the guide asks for a local application that reconstructs observed behavior with synthetic data. It must not copy OrangeHRM source and must not send requests to the demo.

### Stack

The browser loads a React and TypeScript application served by Vite on port 5173. Client routing is in `frontend/src/routes.ts`. `parsePath` reads the pathname. Pages such as Leave and Time read the query string themselves (`/leave?start=apply`, `/time?start=mine`). The sidebar order is `frontend/src/data/synthetic.ts`.

The API is FastAPI in `backend/app/main.py`, normally on port 8000. On startup it creates tables. It drops tables only when `HARBOR_RESET` is `1`. The development server is started without that flag. Playwright sets the flag for its own SQLite file, `backend/harbor-e2e.db`.

Sessions use an HttpOnly cookie named `harbor_session`. Passwords are hashed with PBKDF2-SHA256 and 200000 iterations in `backend/app/security.py`. The local username is `demo_admin`. The password is the environment value `HARBOR_LOCAL_PASSWORD` in an ignored `.env`. It is not written in this document.

`backend/app/database.py` reads `DATABASE_URL`. If that variable is unset, the default is SQLite `backend/harbor.db`. The development database that was verified is PostgreSQL 16.2 at `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`, started with `pgserver`. Docker Compose exists as `docker-compose.yml`. Docker was not installed, so Compose was not demonstrated. That is REQ-051, PARTIAL.

SQLAlchemy models in `backend/app/models.py` define `users`, `sessions`, `reports`, `employees`, `timesheets`, `timesheet_days`, `leave_requests`, `candidates`, `performance_reviews`, `claims`, `employee_contacts`, `emergency_contacts`, `vacancies`, `performance_trackers`, and `buzz_posts`. SQL files are `backend/migrations/001_init.sql` through `004_workflows.sql`. Seed data in `backend/app/seed.py` creates 55 synthetic employees and the local user. Those names are not copied demo rows.

The last recorded counts of `harbor`, after the 2026-11-16 Playwright run, were 55 employees, 1 timesheet, and 0 leave requests, candidates, reviews, claims, and Buzz posts. That timesheet was not deleted. This explanation did not query the database again.

### API surface present in source

Authentication: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`. Health: `GET /api/health`.

Employees support list, hints, meta, one record, create, update, and delete. Delete returns HTTP 409 when a dependent row exists. Reports are read with `GET /api/reports`.

Timesheets support list, one record, create, update, and delete in the API. The Time page does not expose create, edit, or delete. A period is limited to 14 days. That limit is a Harbor HR rule, not an observed OrangeHRM message.

Leave requests, candidates, reviews, and claims support list, create, update, and delete. Vacancies and performance trackers do the same. Employee contact is get and put; a save with every field blank deletes the contact row. Emergency contacts support list, create, and delete. Buzz supports list, create, and delete. `POST /api/maintenance/confirm` checks the password and does not purge.

Leave requests are limited to 30 days. That is also a Harbor HR rule. The frontend reads FastAPI error details as a string or a field map.

### How observations shaped each screen

| Local route | What the code does | How that follows the evidence |
|---|---|---|
| `/login`, `/forgot` | Local login, rejected credentials, and logout work. Forgot password is an explanation page. | Only the login labels were observed. Success, failure, and the live forgot-password address were not retained. |
| `/dashboard` | Employee count and sub-unit counts come from the employees API. Leave-today and Buzz posts come from those APIs. Quick Launch opens the later-inspected Leave and Time routes. | Search and Upgrade stay disabled. Punch times and location counts were not decoded. |
| `/pim` and employee add, reports, detail, and edit | List, name search, reset, pagination, add, edit, detail, local delete, and report titles work. | Create Login Details and file upload stay disabled. Sort and page size are local designs because header clicks did not change the demo query. Unopened profile tabs have no local data. |
| `/leave` | Leave List can create, edit, and delete a proposed request. My Leave filters to the seeded profile. Apply shows the observed empty text and does not save. Assign shows the observed fields and does not save. | Entitlements, Reports, Configure, Assign, and Include Past Employees stay inactive. Leave List persistence was not an observed demo save. |
| `/time` | Lists stored timesheets in the observed columns. My Timesheet shows `Status: Not Submitted` and the observed project headers. The three Attendance views show the observed labels. | View, Edit, Submit, Punch In/Out, Reports, Project Info, Attendance View, and Configuration Save stay disabled. |
| `/recruitment`, `/performance`, `/claim` | Shared board in `RecordsBoard.tsx` stores proposed rows. | The live vacancy page, Configure, approval, payment, and View Details were not opened. |
| `/my-info` | The four opened sections for the seeded employee. Name and job use the employee API. Contact and emergency contacts have their own API. | The other six sections were not opened. Live Save was not clicked. |
| `/directory` | Name and job-title search over local employees. | Location stays disabled. The observed card layout was not copied. |
| `/maintenance` | Cancel returns to the dashboard. Confirm checks the signed-in password and does not delete employees. | The purge form was not seen. |
| `/buzz` | Text posts can be created and deleted. | Share Photos and Share Video stay disabled. Post was not clicked on the demo. |
| `/admin` | Shows the observed System Users labels. | Search, Reset, Add, and every other admin action stay disabled. No user rows are stored. |

A disabled control keeps a title stating that the OrangeHRM control was visible and was not used. Rendering a heading is not treated as a completed workflow.

## 6. Testing and validation

This explanation did not re-run the test commands. The numbers below are the numbers written in the project notes. They are historical results, not a fresh verification on the day this file was written.

### Recorded on 2026-11-14 (`docs/test-report.md`)

No request was sent to the OrangeHRM demo.

- PostgreSQL 16.2 was listening on `127.0.0.1:5432`. After startup the API reported database `harbor`, login succeeded, and the employee total was 55. A synthetic employee was inserted, the API was restarted, the row was still present, and it was then deleted. The total returned to 55.
- `python -m pytest tests/test_api.py tests/test_postgres_integration.py -q`: 5 passed, 0 failed, 0 skipped, 13.49 seconds. The integration test uses `harbor_test`.
- An earlier `python -m pytest tests -q` result of 4 passed covered only SQLite. The 14 November note says that 4-passed run is not the then-latest count.
- `npx tsc --noEmit` and `npx vite build` were not run in that freeze. An earlier successful build had produced `frontend/dist/assets/index-DzMQ5VOn.css` and `frontend/dist/assets/index-gTnk6TvH.js`.
- `npx playwright test`: 9 passed, 0 failed, 0 skipped, 27.2 seconds, on SQLite `backend/harbor-e2e.db`.
- The traceability register separately records a historical default suite of 9 passed in 39.4 seconds. That figure is not the same recorded duration as the 27.2 second freeze. Both numbers are left as written. Neither was re-executed for this document.
- That 14 November Playwright run expected Quick Launch buttons to be visible and disabled. Later work changed Quick Launch so that the inspected Leave and Time destinations open. The 14 November expectation is historical.

### Recorded on 2026-11-16 (closure audit, cited by the implementation report and REQ-011)

- `npx tsc --noEmit` in `frontend`: exit 0.
- `npx vite build`: exit 0 in 3.49 seconds. Assets `dist/assets/index-D_PdIJzT.css` (10.78 kB) and `dist/assets/index-CGfDi_2_.js` (308.11 kB).
- `python -m pytest -q` in `backend`: 9 passed, 33.07 seconds, including `harbor_test`.
- `npx playwright test`: 11 passed, 59.4 seconds, isolated SQLite.

The 11 Playwright tests are `tests/e2e/hrms.spec.ts` (TC-01 through TC-10, layout, and Quick Launch routes), `tests/e2e/modules.spec.ts`, and `tests/e2e/timesheets.spec.ts`. The timesheet UI test checks that Edit and Submit stay disabled. It does not approve a timesheet. The API test `test_timesheet_validation_edit_and_delete` still calls the timesheet API directly.

Playwright does not use PostgreSQL. Its config starts its own API with `HARBOR_RESET=1`. It must not be started while ports 8000 and 5173 are already in use.

Not covered by that suite: PostgreSQL as the Playwright database, a new demo capture, Project Info, Admin writes, and punch storage.

After that 16 November run, the recorded `harbor` counts were still 55 employees and 1 timesheet. The API was restarted on `harbor` without `HARBOR_RESET`. A signed-in local browser showed the local headings for Dashboard, PIM, Leave List, Apply Leave, Assign Leave, My Leave List, Select Employee, My Timesheet, the three Attendance views, Candidates, Personal Details, Employee Reviews, Directory, Administrator Access, Employee Claims, Buzz, and System Users.

## 7. Challenges and limitations

Several workflows were visible and not completed on the demo. Live login success, live login failure, and live logout were not seen. Most Save buttons were not clicked. A selected employee-list row was not opened as a details page. Leave type options were not opened. Timesheet View, Edit, and Submit were not clicked. Attendance punch values were not saved. Project Info and Punch In/Out were not opened. The recruitment Vacancies page, six My Info sections, Admin user creation, and the maintenance purge form were not opened.

Harbor HR keeps those controls disabled, or implements a clearly local behavior:

- Disabled: sidebar Search, header Upgrade, Assign Leave, timesheet View/Edit/Submit, attendance View and Save, Punch In/Out, Project Info, Share Photos, Share Video, directory Location, and every Admin action.
- Proposed, and working only as local persistence: Leave List create/edit/delete, recruitment candidates and vacancies, performance reviews and trackers, claims, Buzz text posts, PIM sort and page size, and local employee delete. These are not observed OrangeHRM saves.
- Read-only display: the three Attendance screens, My Timesheet cell text, and the Admin landing.

### REQ-003

REQ-003 requires confirmation of the demo site’s terms before automated capture. On 2026-11-15 the login page was checked and had no terms link. Privacy policies, the GPL, and the vulnerability policy were read as different documents. On 2026-11-16 the open-source vulnerability policy and the SaaS agreement were read again. The vulnerability policy prohibits security testing, scanning, and probing of `opensource-demo.orangehrmlive.com`. No document that was read permits automated browser capture. The SaaS agreement does not name that demo host, so it was not treated as the demo’s terms. Silence was not treated as permission. Status: PARTIAL. Detail: `docs/evidence/REQ-003-REQ-055-closeout-2026-11-16.md`.

New automated captures of the demo were not performed because permission was not established. The vulnerability mailbox was not contacted. That mailbox is for vulnerability reports, and sending it a terms question was not approved.

### REQ-055

REQ-055 requires a comparison with `compare_web_captures` after known volatile fields are normalized. The passive comparison `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c` compared two existing Leave List inspections and returned overall status `changed`. The passive input rejected a `normalization` key. No evidence file in the repository contains a `step_id`. `scenarios/login-page.json` has one step, `settle_login_page`, and was not retained as an executed capture. Status: NOT VERIFIED. A second capture was not created, because REQ-003 does not permit one.

## 8. Work recorded in the repository

The files show this sequence of work. They do not show a separate attribution line for each activity.

- Reading the guide and keeping its limits: no copied OrangeHRM source, no demo writes, no bulk scraping, no brute force.
- Collecting and redacting page evidence for login, the employee list, Add Employee, and later module landings, and writing inspection notes that name what was clicked and what was not.
- Recording method, path, and status for requests that were actually seen, including the employee-list GET, without storing credentials, tokens, or cookies in the API register.
- Building the first local slice: login, dashboard, and PIM, with PostgreSQL database `harbor`, 55 synthetic employees, pytest, and Playwright. That state is the 2026-11-14 test report. The README section “What is implemented” still describes only that slice. The sentence is stale. Later source added the other modules.
- Inspecting the remaining sidebar modules on 2026-11-15 without submitting login and without clicking Save or Confirm.
- Adding later evidence for Leave, Time, and Attendance pages that the 15 November note had not opened, and aligning the Time and Leave screens to those files. The timesheet page no longer offers create, edit, approve, or delete. The API routes remain. The existing timesheet row was kept.
- Adding FastAPI routers, SQLAlchemy models, and migrations for timesheets, leave, recruitment, performance, claims, contacts, vacancies, trackers, and Buzz.
- Writing Playwright coverage for the local flows, including checks that unsupported Time and Attendance actions stay disabled.
- Mapping every REQ-001 through REQ-057 to evidence or source, and leaving gaps as PARTIAL, NOT VERIFIED, or OUT OF SCOPE.
- Re-reading official policy documents for REQ-003 and recording why REQ-055 cannot be closed without a permitted second capture.
- Writing the six project documents listed at the top of this file, without changing application behavior, the database, or requirement statuses.

Debugging that the notes record includes keeping Playwright off the `harbor` database, restarting the API without `HARBOR_RESET` after the suite, and preserving the 55-employee and 1-timesheet counts. Dashboard layout work is recorded as a local UI correction: full-width sub-unit distribution, with Search and Upgrade left disabled. It is not an OrangeHRM observation of pixel layout.

## 9. Current project status

**CONDITIONALLY READY.** The local application can be demonstrated. It is not a finished copy of OrangeHRM.

Complete enough to demonstrate, on Harbor HR only:

- Local login, rejected credentials, and logout.
- Dashboard employee count, sub-unit counts, and Quick Launch routes into Leave and Time.
- PIM list, name search, reset, add, edit, local delete, and report titles.
- Leave List as proposed local records. Apply Leave as the observed empty state, which does not save.
- A timesheet list of stored rows, without edit or submit.
- Attendance labels, without stored punches.
- My Info for the seeded employee on the four observed sections.
- Directory search by name and job title.
- Maintenance password check that does not purge.
- Proposed local records for candidates, vacancies, reviews, trackers, claims, and Buzz text posts.
- Admin as a disabled System Users landing.

Partial:

- The 13 PARTIAL requirements listed in section 4.
- Leave Assign, Entitlements, Reports, and Configure.
- Timesheet and attendance actions that stay disabled.
- Directory location, Buzz photos and video, and unopened My Info sections.
- Docker Compose, which was not run.

Pending:

- An authoritative statement of whether automated demo capture is permitted. Until that exists, REQ-003 stays PARTIAL and new captures stay unauthorized.
- A normalized scenario comparison. REQ-055 stays NOT VERIFIED.
- Project Info and Punch In/Out, which were not opened.
- Admin users, roles, and settings, which are out of scope.
- Live observation of login success, logout, and the Save actions that were not clicked.

How to run the local application is in `docs/PROJECT_FINAL_HANDOFF.md`. Do not set `HARBOR_RESET` against database `harbor`.

## 10. Final summary of the journey

The work began from the reverse-engineering guide: study the public OrangeHRM demo without copying its source, and build a separate HRMS. Early evidence, including an employee-list file dated 2026-11-12 in its filename, recorded login labels, the employee list, and Add Employee. By 2026-11-14 the local API was on PostgreSQL database `harbor` with 55 synthetic employees, and the recorded tests were 5 pytest passes and 9 Playwright passes. That first application covered authentication, the dashboard, and PIM.

On 2026-11-15 an already signed-in browser session was used to open every sidebar module. Login was not submitted. Saves were not clicked. Maintenance Cancel returned to the dashboard. The same day, demo terms were looked for and were not found on the login page. A passive comparison of two existing Leave List inspections returned `changed` and did not accept a normalization key.

Later redacted evidence opened Apply Leave, My Leave, Assign Leave, the timesheet screens, and three Attendance pages. Harbor HR was extended so those screens show the observed labels. Actions that were not clicked stay disabled. Other modules received proposed local persistence through FastAPI and PostgreSQL, with the limitation written on the screen or in the register. Admin was left as a disabled landing because user administration is out of scope and the add-user form was not inspected.

On 2026-11-16 the vulnerability policy was read again. It prohibits security testing, scanning, and probing of the named demo, and it does not grant capture permission. REQ-003 was marked PARTIAL. REQ-055 stayed NOT VERIFIED. No new demo capture was made. The same day’s recorded checks were a clean TypeScript pass, a production build in 3.49 seconds, 9 pytest passes, and 11 Playwright passes on isolated SQLite. Database `harbor` still had 55 employees and 1 timesheet.

The result is a local HRMS that a reviewer can run, with a written line from each screen back to evidence or to an explicit assumption. Forty requirements pass on that record. Thirteen remain partial. One is not verified. Three are out of scope. The honest status is CONDITIONALLY READY.
