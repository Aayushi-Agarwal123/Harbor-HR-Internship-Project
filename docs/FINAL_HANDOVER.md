# Harbor HR handover

Date: 2026-11-17. This is the document to read before a demonstration. The checklist with evidence paths is `docs/FINAL_PROJECT_AUDIT.md`.

## What this project does

OrangeHRM was studied as a public demo. Harbor HR is a separate human-resources application built from what was observed. It does not contain OrangeHRM source, and it does not call `opensource-demo.orangehrmlive.com`.

## What REA was used for

REA inspected the running demo: pages, labels, routes, and evidence identifiers. Cursor then built Harbor HR from those notes. REA was not used to recover OrangeHRM's private server code.

On 2026-11-17 the installed doctor command was run again. Package `rea-agents` 6.9.0. Cursor registration in `C:\Users\Aayushi Agarwal\.cursor\mcp.json` is `aligned`. Doctor's live-server identity is `unknown`. The note is `docs/evidence/REQ-056-doctor-2026-11-17.md`.

## What was observed

The host was `https://opensource-demo.orangehrmlive.com`. A signed-in browser session on 2026-11-15 opened every sidebar module. Login was not submitted in that session. Save, Assign, Edit, Submit, and Confirm were not clicked.

Observed modules: Login, Dashboard, PIM, Leave, Time, Attendance labels, Recruitment, Performance, Directory, Maintenance, Claim, Buzz, and Admin System Users.

Not opened: Project Info, Punch In/Out, Admin user creation, the maintenance purge form, and six My Info sections. Harbor HR leaves those controls disabled. Inventing their behavior would not be an observation.

## Where evidence is saved

Original captures stay in `evidence/`. Do not edit them. Ten of those JSON files still contain an account label. Sanitized copies, with that field set to null, are in `docs/proposed-redactions/`. The share boundary is `docs/PRIVACY_SHARING_MANIFEST.md`. Do not zip the whole project folder. `.env` holds the local password and is ignored.

## How requirements were derived

The guide's tasks are REQ-001 through REQ-057 in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. Statuses were not changed in this handover. The totals are 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, and 3 OUT OF SCOPE.

`docs/requirements.md` is a separate 18-row list tagged OBSERVED or PROPOSED. It is not a second copy of the 57 statuses.

REQ-003 stays PARTIAL. The vulnerability policy prohibits security testing of the named demo, and no document permits automated capture. REQ-055 stays NOT VERIFIED. There is no second scenario with the same step IDs, and a new capture was not made.

## What Harbor HR implements

| Area | What works locally | What stays inactive |
|---|---|---|
| Login | Sign in, rejected password, logout | Demo success and logout were not observed |
| Dashboard | Employee count, sub-unit counts, Quick Launch routes | Search, Upgrade, punch times, location values |
| PIM | List, search, reset, add, edit, delete, six report titles | Create Login Details, file upload, unopened profile tabs |
| Leave | Proposed Leave List records. Apply shows the empty state | Assign, Entitlements, Reports, Configure |
| Time | List of stored timesheets | View, Edit, Submit, approve, reject |
| Attendance | Observed labels inside Time | View, Save, punch storage |
| Project Info and Punch In/Out | Nothing | Disabled. The pages were not opened |
| Recruitment, Performance, Claim, Buzz | Proposed local rows. Buzz is text only | Photos, video, payment, approval |
| My Info | Four observed sections for the seeded employee | Six unopened sections |
| Directory | Name and job-title search | Location |
| Maintenance | Password check, no purge | Purge form |
| Admin | System Users labels | Search, Reset, Add, and every other action |

Synthetic seed data: 55 employees and the user `demo_admin`, display name Asha Sharma. On 2026-11-17, before Playwright, `harbor` had 55 employees and 1 timesheet.

## How the pieces connect

The browser loads React from Vite on port 5173. Pages call FastAPI on port 8000. The session cookie is `harbor_session`. Passwords use PBKDF2-SHA256. The development database is PostgreSQL `harbor` at `127.0.0.1:5432`. If `DATABASE_URL` is unset, the API uses SQLite `backend/harbor.db`. Playwright does not use `harbor`. It uses SQLite `backend/harbor-e2e.db` and sets `HARBOR_RESET=1` for that file only.

## How to start

PostgreSQL must already be listening. Do not set `HARBOR_RESET`.

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc
$env:PYTHONPATH = "backend"
$env:DATABASE_URL = "postgresql+psycopg://postgres@127.0.0.1:5432/harbor"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Second terminal:

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc\frontend
npm run dev
```

Open `http://127.0.0.1:5173`. Sign in as `demo_admin`. The password is `HARBOR_LOCAL_PASSWORD` in the ignored `.env`.

After this handover the API and Vite were left running. Health returned database `harbor`.

## How to run tests

Stop whatever is listening on ports 8000 and 5173 first. Playwright refuses to reuse those servers.

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc
npx playwright test
```

On 2026-11-17 that command passed 11 tests, failed 0, in 3.1 minutes, on SQLite. Then start the API again on `harbor` without `HARBOR_RESET`.

PostgreSQL integration, which recreates only `harbor_test`:

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc\backend
python -m pytest tests/test_postgres_integration.py -q
```

That command was not repeated on 2026-11-17. The last recorded full backend pytest is the 2026-11-16 closure audit: 9 passed.

## Known limitations

- Automated demo capture is not authorized.
- Live login success, logout, and most demo searches were not observed.
- Project Info, Punch In/Out, and Admin user setup are not implemented because they were not observed or are out of scope.
- Docker Compose was not run. Docker is not installed.
- A full copy of `evidence/` is not safe to share.

## Files to show

1. `docs/FINAL_HANDOVER.md` (this file)
2. `docs/FINAL_PROJECT_AUDIT.md`
3. `docs/FINAL_REQUIREMENT_TRACEABILITY.md`
4. `docs/SIR_REA_WORK_EXPLANATION.md`
5. `README.md`

Readiness: **CONDITIONALLY READY**. The local application can be demonstrated. The guide checklist is 6 COMPLETE and 5 PARTIAL.
