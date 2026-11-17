# Harbor HR implementation report

Date: 2026-11-16. This report describes the source that is present. A rendered page is not treated as a completed workflow. Proposed saves are Harbor HR behavior. They are not observed OrangeHRM saves.

## Frontend

React and TypeScript. Entry `frontend/src/main.tsx`. Routing is client-side in `frontend/src/routes.ts` and `frontend/src/App.tsx`. `parsePath` reads the pathname. Query strings such as `/leave?start=apply` and `/time?start=mine` are read by the page components from `window.location.search`.

Sidebar labels and order come from `frontend/src/data/synthetic.ts`. The shell is `frontend/src/components/Sidebar.tsx`. Search in the sidebar is disabled because no search request was recorded. The header Upgrade button is disabled for the same reason.

| Local route | Component | What works | What stays inactive |
|---|---|---|---|
| `/login`, `/forgot` | `LoginPage.tsx` | Local login, invalid login, logout | Forgot password is an explanation page. The live href was not retained. |
| `/dashboard` | `DashboardPage.tsx` | Employee count and sub-unit counts from the employees API. Leave-today and Buzz posts from those APIs. Quick Launch opens Leave and Time routes. | Search, Upgrade, punch times, location counts. |
| `/pim`, `/pim/add`, `/pim/reports`, `/pim/employees/:id`, `/pim/employees/:id/edit` | `PimPage.tsx` and `frontend/src/components/pim/` | List, name search, reset, pagination, add, edit, detail, local delete, report titles | Create Login Details and file upload. Live row glyphs. Unopened profile tabs on the detail page. |
| `/leave` | `LeavePage.tsx` | Leave List can create, edit, and delete a proposed request. My Leave filters to the seeded profile. Apply shows `No Leave Types with Leave Balance` and does not save. Assign shows the observed fields and does not save. | Entitlements, Reports, Configure. Assign. Include Past Employees. |
| `/time` | `TimePage.tsx` | Lists stored timesheets in the observed columns. My Timesheet shows `Status: Not Submitted` and the observed project headers. Attendance Employee Records, My Records, and Configuration render the observed labels. | View, Edit, Submit, Punch In/Out, Reports, Project Info, Attendance View, and Configuration Save. |
| `/recruitment` | `RecruitmentPage.tsx` | Proposed candidates and vacancies through `RecordsBoard.tsx` | Candidate Job Title filter. The live Vacancies page was not opened. |
| `/my-info` | `MyInfoPage.tsx` | Four observed sections for the seeded employee. Name and job fields use the employee API. Contact and emergency contacts have their own API. | Unopened tabs and unstored personal fields. |
| `/performance` | `PerformancePage.tsx` | Proposed reviews and trackers | Configure. Evaluation and approval were not observed. |
| `/directory` | `DirectoryPage.tsx` | Name and job-title search over local employees | Location. Observed card layout was not copied. |
| `/maintenance` | `MaintenancePage.tsx` | Cancel returns to the dashboard. Confirm checks the signed-in password and does not purge. | The purge form. |
| `/claim` | `ClaimPage.tsx` | Proposed claims. Status labels Submitted and Cancelled are Harbor HR labels. | Approval, payment, and View Details. |
| `/buzz` | `BuzzPage.tsx` | Text posts | Share Photos and Share Video. |
| `/admin` | `AdminPage.tsx` | Observed System Users labels | Search, Reset, Add, and every other admin action. No user rows are stored. |

`RecordsBoard.tsx` is the shared list, filter, add, edit, and delete board used by Leave, Recruitment, Performance, and Claim. A disabled control keeps a title that says the OrangeHRM control was visible and was not used.

## Backend

`backend/app/main.py` builds the FastAPI app. On startup it creates tables. It drops tables only when `HARBOR_RESET` is `1`. Playwright sets that flag for its SQLite file. The development API is started without it.

Authentication is `POST /api/auth/login`, `POST /api/auth/logout`, and `GET /api/auth/me`. The cookie is `harbor_session`. Passwords use PBKDF2-SHA256 with 200000 iterations. The local username is `demo_admin`. The password is `HARBOR_LOCAL_PASSWORD` in the ignored `.env` and is not repeated here.

| Prefix | File | Operations present in source |
|---|---|---|
| `/api/health` | `main.py` | GET |
| `/api/employees` | `employees.py` | GET list, hints, meta, one employee, POST, PATCH, DELETE. DELETE returns 409 when dependent rows exist. |
| `/api/reports` | `reports.py` | GET |
| `/api/timesheets` | `timesheets.py` | GET, POST, PATCH, DELETE. The UI does not expose create, edit, or delete. |
| `/api/leave-requests` | `records.py` | GET, POST, PATCH, DELETE |
| `/api/candidates` | `records.py` | GET, POST, PATCH, DELETE |
| `/api/vacancies` | `workflow.py` | GET, POST, PATCH, DELETE. PATCH updates the same row. |
| `/api/reviews` | `records.py` | GET, POST, PATCH, DELETE |
| `/api/trackers` | `workflow.py` | GET, POST, PATCH, DELETE |
| `/api/claims` | `records.py` | GET, POST, PATCH, DELETE |
| `/api/employees/{id}/contact` | `workflow.py` | GET, PUT. An all-blank save deletes the row. |
| `/api/employees/{id}/emergency-contacts` | `workflow.py` | GET, POST, DELETE |
| `/api/buzz` | `workflow.py` | GET, POST, DELETE |
| `/api/maintenance/confirm` | `workflow.py` | POST. Returns confirmation without a purge. |

Validation lives in `backend/app/validation.py` and the routers. Timesheet periods are at most 14 days. Leave requests are at most 30 days. Those limits are Harbor HR rules, not observed OrangeHRM messages. API errors use FastAPI's status codes. The frontend `ApiError` reads a string `detail` or a field map.

OrangeHRM paths such as `/api/v2/pim/employees` are observations. They are not this API. The Harbor contract is `docs/api-contracts.md`.

## Database

`backend/app/database.py` uses `DATABASE_URL`. If unset, the default is SQLite `backend/harbor.db`. The running development API uses `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`. PostgreSQL 16.2 was recorded from the server startup line. Docker was not used.

Tables in `backend/app/models.py`: `users`, `sessions`, `reports`, `employees`, `timesheets`, `timesheet_days`, `leave_requests`, `candidates`, `performance_reviews`, `claims`, `employee_contacts`, `emergency_contacts`, `vacancies`, `performance_trackers`, `buzz_posts`.

Migrations: `001_init.sql`, `002_timesheets.sql`, `003_modules.sql`, `004_workflows.sql`. Startup also calls `create_all`. Seed data is `backend/app/seed.py`: 55 synthetic employees and the local user. Employee names are synthetic. They are not copied demo rows.

The last count of `harbor` in this project, after the 2026-11-16 Playwright run, was 55 employees, 1 timesheet, and 0 leave requests, candidates, reviews, claims, and Buzz posts. That timesheet was not deleted. This documentation pass did not query the database again.

`backend/tests/test_postgres_integration.py` creates and edits a row on `harbor_test`, restarts its own API, and checks that `harbor` employee and timesheet counts do not change.

## Testing that was actually recorded

`docs/test-report.md` is an earlier freeze: 5 pytest tests and 9 Playwright tests. It is not the latest suite.

The latest recorded commands, from the 2026-11-16 closure audit, are:

| Command | Result |
|---|---|
| `npx tsc --noEmit` in `frontend` | Exit 0 |
| `npx vite build` | Exit 0 in 3.49s. `dist/assets/index-D_PdIJzT.css` 10.78 kB and `dist/assets/index-CGfDi_2_.js` 308.11 kB |
| `python -m pytest -q` in `backend` | 9 passed, 33.07s, including `harbor_test` |
| `npx playwright test` | 11 passed, 59.4s, isolated SQLite |

Playwright files: `tests/e2e/hrms.spec.ts` (TC-01 through TC-10, layout, Quick Launch routes), `tests/e2e/modules.spec.ts`, and `tests/e2e/timesheets.spec.ts`. The timesheet UI test checks that Edit and Submit stay disabled. It does not approve a timesheet. The API test `test_timesheet_validation_edit_and_delete` still exercises the timesheet API directly.

Not covered by the latest suite: PostgreSQL as the Playwright database, a new demo capture, Project Info, Admin writes, and punch storage.

## Module comparison

| Module | Detected | Implemented | Works | Not claimed |
|---|---|---|---|---|
| Login | Labels only | Local session | Login, invalid login, logout | Demo success and logout |
| Dashboard | Widgets and sidebar | Local counts and shortcuts | Count, sub-units, Quick Launch routes | Search, Upgrade, punch, location values |
| PIM | List, add, reports, four profile sections | Full local CRUD for stored fields | List, search, add, edit, delete, reports | Live save, unopened tabs, row glyphs |
| Leave | List, empty Apply, My Leave filters, Assign fields | List persistence plus the observed empty Apply and inactive Assign | List save is proposed. Apply does not save. | Assign, Entitlements, Reports, Configure |
| Time | List and My Timesheet labels | List of stored rows and a read-only My Timesheet | Listing | View, Edit, Submit, approve, reject |
| Attendance | Three pages and an unopened Punch item | Read-only labels inside `/time` | Display | View, Save, punch storage |
| Project Info | Menu label only | Disabled button | Nothing | The page |
| Recruitment | Candidates landing | Proposed candidates and vacancies | Local CRUD | Live vacancy page and hiring workflow |
| My Info | Four sections | Those sections for one seeded employee | Name, contact, emergency contact | Other tabs and live Save |
| Performance | Reviews landing | Proposed reviews and trackers | Local CRUD | Configure and approval |
| Directory | Three filters | Name and job search | Local search | Location and card layout |
| Maintenance | Gate and Cancel | Password check, no purge | Cancel and rejected password | Purge |
| Claim | Claims landing | Proposed claims | Local CRUD | Payment and View Details |
| Buzz | Composer | Text posts | Post and delete | Photos and video |
| Admin | System Users landing | Disabled landing | Display | Users, roles, settings |
