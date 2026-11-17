# Harbor HR final handoff

Date: 2026-11-16. Readiness: **CONDITIONALLY READY**.

This is the current handoff. Older files keep their original counts. The current requirement totals are in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`.

## How to run

From `C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc`, with PostgreSQL already listening on `127.0.0.1:5432`:

```powershell
$env:PYTHONPATH = "backend"
$env:DATABASE_URL = "postgresql+psycopg://postgres@127.0.0.1:5432/harbor"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Do not set `HARBOR_RESET`. In a second terminal:

```powershell
cd frontend
npm run dev
```

Open `http://127.0.0.1:5173`. Sign in as `demo_admin`. The password is `HARBOR_LOCAL_PASSWORD` in the ignored `.env`. It is not printed here.

Docker Compose is present and was not started. Docker was not installed. The verified server was PostgreSQL 16.2 through `pgserver`.

## Directory map

| Path | Role |
|---|---|
| `frontend/src` | React application |
| `backend/app` | FastAPI application |
| `backend/migrations` | SQL for the local schema |
| `backend/tests` | API tests and the `harbor_test` integration test |
| `tests/e2e` | Playwright |
| `evidence` | Redacted REA JSON. Do not edit originals to remove labels. |
| `docs` | Inventories, requirements, and this handoff |
| `scenarios/login-page.json` | An optional scenario definition. It was not executed. |

## Tests last recorded

These commands were not re-run while writing this handoff. The last recorded results are:

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed |
| `npx vite build` | Passed in 3.49s |
| `python -m pytest -q` | 9 passed in 33.07s |
| `npx playwright test` | 11 passed in 59.4s on SQLite `backend/harbor-e2e.db` |

Playwright must not run while ports 8000 and 5173 are in use. Its config sets `reuseExistingServer: false` and resets its own SQLite file. Stop only those listeners, run the suite, then start the API again on `harbor` without `HARBOR_RESET`.

## Requirement totals

40 PASS, 13 PARTIAL, 1 NOT VERIFIED, 3 OUT OF SCOPE. Total 57. Each REQ-001 through REQ-057 appears once.

NOT VERIFIED: REQ-055. PARTIAL includes REQ-003. OUT OF SCOPE: REQ-027, REQ-044, REQ-045.

## What a reviewer can treat as working

Local login, logout, and rejected credentials. Dashboard employee count and sub-unit counts. PIM list, search, add, edit, and local delete. Leave List proposed requests. Apply Leave as an empty state that does not save. Time list of stored timesheets, without edit or submit. Read-only Attendance labels. Proposed records for Recruitment, Performance, Claim, and Buzz text posts. My Info for the seeded employee. Directory name and job search. Maintenance password check without a purge. Admin as a disabled landing.

## What remains incomplete

- No authoritative permission for automated demo capture.
- No normalized scenario comparison.
- Live login success, logout, and most Save buttons were not observed.
- Timesheet View, Edit, and Submit stay disabled.
- Punch In/Out was not opened. Project Info was not opened.
- Admin users, roles, and settings were not built.
- Search, Upgrade, punch times, and location distribution stay inactive.
- Six My Info sections were not opened.
- The README "What is implemented" section is stale.

## Pending external action

A person must record the hosted demo's own terms or acceptable-use statement and whether automated browser inspection and scenario capture are permitted or prohibited. Do not email the vulnerability mailbox for that question without separate approval. Do not capture the demo until permission is explicit.

## Related documents

- `docs/PROJECT_COMPLETE_OVERVIEW.md`
- `docs/REA_REVERSE_ENGINEERING_REPORT.md`
- `docs/HARBOR_HR_IMPLEMENTATION_REPORT.md`
- `docs/REQUIREMENT_BY_REQUIREMENT_AUDIT.md`
- `docs/PROJECT_WORKFLOW_AND_TIMELINE.md`
- `docs/evidence/REQ-003-REQ-055-closeout-2026-11-16.md`
