# Harbor HR supervisor demo guide

Date: 2026-11-15. Status: **conditionally ready**, not complete.

This guide is for a live demonstration of the local Harbor HR application. It does not start from the OrangeHRM demo. Do not reset, seed, or query the development database as part of preparing the meeting. Do not set `HARBOR_RESET`.

## Servers already running

Checked without stopping anything:

| Port | Process | Result |
|---|---|---|
| 5432 | `postgres.exe` from the local `pgserver` cluster, data directory `backend/pgdata` | Listening on `127.0.0.1` |
| 8000 | `python -m uvicorn app.main:app --host 127.0.0.1 --port 8000` | `GET /api/health` returned 200. Database string: `postgresql+psycopg://postgres@127.0.0.1:5432/harbor` |
| 5173 | Vite with `--host 127.0.0.1 --port 5173 --strictPort` | `GET /` returned 200 |

Reuse these processes. Starting the API again is unnecessary and is not safe to do casually: `backend/app/main.py` calls `seed()` on startup. When employees already exist, that function returns after ensuring report titles. It still writes if a report title is missing. `HARBOR_RESET=1` drops tables. Neither action belongs in this demo.

## Exact startup, only if a port is down

Working directory: `C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc`.

The ASGI application is `app.main:app`, from `backend/app/main.py`. The frontend script is `npm run dev` in `frontend/package.json`. Vite is configured in `frontend/vite.config.ts` for port 5173 and proxies `/api` to `http://127.0.0.1:8000`.

Terminal 1, PostgreSQL, only if nothing is listening on 5432:

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc
python backend\start_postgres.py
```

Do not run `python backend\apply_migration.py` for this meeting. The cluster is already in use.

Terminal 2, API, only if `http://127.0.0.1:8000/api/health` does not answer:

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc
$env:PYTHONPATH = "backend"
$env:DATABASE_URL = "postgresql+psycopg://postgres@127.0.0.1:5432/harbor"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Confirm the health JSON names database `harbor`. If it names SQLite, stop and do not continue the demo on that process.

Terminal 3, frontend, only if `http://127.0.0.1:5173` does not answer:

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc\frontend
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

## URLs

- Application: `http://127.0.0.1:5173`
- API health: `http://127.0.0.1:8000/api/health`
- There is no URL router. Sidebar clicks change in-memory state. A new browser URL path will not open PIM.

## Database safety

- `harbor` on `127.0.0.1:5432` is the development database. Do not drop, truncate, reseed, or migrate it.
- Do not click Add, Save, Edit, or Delete during the meeting. Those actions write to `harbor`.
- `harbor_test` is only for the PostgreSQL integration test. Do not run that test.
- Playwright uses SQLite `backend/harbor-e2e.db` and sets `HARBOR_RESET=1`. Do not run Playwright.
- Docker Compose is not the running setup. Docker was not available when this project was last checked. Do not start Compose against port 5432.

## Sign-in

The local username is `demo_admin`, defined in `frontend/src/data/synthetic.ts` and named in the README. The local password is only in that source file. It is a Harbor HR fixture, not an OrangeHRM credential. This guide does not repeat it.

## Demo sequence

Stay on the read-only path.

1. Open `http://127.0.0.1:5173`. Explain that this is the local replica, not the OrangeHRM demo.
2. Sign in. The app calls `POST /api/auth/login` and then loads the dashboard. Say that OrangeHRM login success and logout were not captured on the live demo. The local session is a Harbor HR design.
3. On the dashboard, point out the sidebar order: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz. That order was observed. Quick Launch buttons are disabled because their destinations were not captured.
4. Click **PIM**. The employee list loads from `GET /api/employees`. Columns follow the observed list. The rows are synthetic. They are not copied OrangeHRM employees.
5. Search for a synthetic name such as `Asha`, then click **Reset**. Say that a live Employment Status search and Reset were observed, and that name, id, job title, subunit, and supervisor searches were not submitted on the demo. Local name matching is proposed.
6. Click page 2 if it is shown. Say that live pages 2 and 3 changed the OrangeHRM `offset` parameter. The local page-size control, 10, 25, and 50, was not observed on the demo.
7. Open **Reports**. The six titles come from the local API. A local filter that keeps only the exact hint `PIM Sample Report` is PROPOSED. Live Reports Search and Reset were not observed. Do not click the disabled row glyphs.
8. Click **Time**, then **Leave**. Time has a proposed timesheet workflow. Leave has a proposed request form. Attendance and Project Info were Time menu labels on OrangeHRM, not separate sidebar modules, and they are not Harbor HR screens. Admin is out of scope.
9. Click **Log out** in the sidebar. The shell returns to the login page through `POST /api/auth/logout`.

If the supervisor asks to see add or edit, say those screens exist and are covered by historical local tests, then show the form only if a write to `harbor` is acceptable. Cancel without saving otherwise. Do not demonstrate Delete.

## What to tell the supervisor

- The project is a black-box reconstruction plus a separate local application.
- Evidence distinguishes observed demo behavior from proposed local behavior.
- The handoff audit counted 32 pass, 16 partial, 5 not verified, and 4 out of scope, out of 57 guide rows.
- Historical checks, not repeated for this meeting: PostgreSQL integration 1 passed in 21.52s on `harbor_test`; Playwright 9 passed in 39.4s on SQLite. The last recorded `harbor` count was 55 employees and was not queried again.
- The live employee-details screen was never opened. Local details are a proposed screen opened with the local **Details** button, not an OrangeHRM glyph.

## Known incomplete features

- No live OrangeHRM login, logout, or employee-details evidence.
- Header sorting on the demo did not change `sortField` or `sortOrder` in the clicks that were tried. Harbor HR still has its own sort controls.
- No records-per-page control was found in the inspected OrangeHRM accessibility trees.
- Name, employee id, job title, subunit, and supervisor filters were not submitted on the demo.
- Create Login Details, Choose File, selection checkboxes, and private-use row glyphs are disabled.
- Attendance and Project Info are not Harbor HR screens. Admin user administration is out of scope. Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, and Buzz have proposed local workflows. Some observed controls stay disabled because their OrangeHRM pages were not opened.
- Docker Compose was not run.
- The Chrome debugging tab was last seen on the OrangeHRM login page. This demo does not use it.

## Recovery

| Symptom | What to do |
|---|---|
| `http://127.0.0.1:5173` does not load | Start only the frontend command above. Do not stop the API. |
| Health does not answer | Start only the API command above. Read the health database string before signing in. |
| Health names a SQLite file | The process was started without `DATABASE_URL`. Do not use it for the demo. Leave it running and ask for a separate decision before stopping it. |
| Port 5432 is closed | Run `python backend\start_postgres.py` only. Do not run the migration. |
| Login fails | Confirm health still names `harbor`. Do not create another user. The fixture is the existing `demo_admin` account. |
| A save dialog is open | Click **Cancel**. Do not click **Save** or **Delete**. |

## Short technical Q&A

**Is this OrangeHRM?** No. It is a separate React and FastAPI application. It does not call the demo.

**Where is the data?** The running API health check reports PostgreSQL database `harbor` on `127.0.0.1:5432`. Playwright's SQLite file is a different database and is not what this demo uses.

**Why are some sidebar items empty pages?** Only Dashboard and PIM were in the current build. The other labels were observed in the OrangeHRM sidebar and are shown so the navigation can be compared. Their pages were not implemented.

**Were the tests run today?** No. The numbers above are the last recorded runs.

**Can we open the live demo?** Not as part of this script. The debugging session was unauthenticated, and several workflows are still unverified.

## Requirement gaps that can be inspected later

Five **NOT VERIFIED** rows in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

| ID | Gap | Safe next step |
|---|---|---|
| REQ-003 | Demo site terms were not recorded. | Read the public terms page only if that visit is authorized. Do not sign in. |
| REQ-032 | Node, REA, Python, and PostgreSQL versions were not rechecked in the audit. | Version commands are read-only. Do not install or upgrade. |
| REQ-039 | SCR-05 was unopened in the first inventory. Later signed-in My Info sections were observed. A selected list row was not opened. | Do not click unidentified row glyphs. Do not treat the local detail page as the live list-row screen. |
| REQ-055 | `compare_web_captures` was not run. | Only on already sanitized captures. |
| REQ-056 | REA doctor was not re-run in the audit. | `doctor` is read-only. Do not reinstall REA. |

Sixteen **PARTIAL** rows:

| ID | Gap | Safe next step |
|---|---|---|
| REQ-006 | Live login, logout, and several filters were not observed. | Documentation only, unless a new authorized read-only session exists. |
| REQ-008 | Some original JSON still stores account labels. | Use `docs/proposed-redactions/`. Do not edit originals. |
| REQ-009 | `evidence/api-observations.md` predates the later employee API notes. | Copy the redacted notes into the register. Do not copy personal values. |
| REQ-014 | Live login and logout were not performed. | Do not submit the demo login unless explicitly authorized. |
| REQ-020 | Name, id, job, subunit, and supervisor searches were not submitted. | Read-only on the demo only after manual sign-in and authorization. |
| REQ-025 | Local edit and delete are proposed. | Do not exercise them against `harbor` in the demo. |
| REQ-028 | Local behavior fills unobserved demo rules. | Explain the proposed tags. No data change. |
| REQ-031 | Some docs still quote account labels. | Do not copy those labels into new notes. |
| REQ-034 | Redacted JSON is not gitignored and some files still contain labels. | Review before any commit. Do not commit during the demo. |
| REQ-037 | Live header sort and records-per-page were not verified. | Read-only header inspection only with authorization. |
| REQ-038 | Not every search filter was submitted. | Same limit as REQ-020. |
| REQ-041 | Demo login success and failure text are unknown. | Do not describe the local password hash as OrangeHRM's. |
| REQ-042 | Sort, page size, and row glyphs were not activated on the demo. | Leave them proposed. |
| REQ-043 | The original API register was not updated, and the last reload redirected to login. | Update the register from the existing results document. |
| REQ-051 | Docker Compose was not run. | Do not install Docker for the meeting. |
| REQ-057 | Account labels remain in original evidence. | Share the privacy audit, not the raw JSON. |

Do not open uninspected OrangeHRM workflows for this meeting.
