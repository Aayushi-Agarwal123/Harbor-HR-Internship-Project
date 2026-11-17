# Test report

Date: 2026-11-14. Local Harbor HR only. No request was sent to the OrangeHRM demo.

## PostgreSQL

PostgreSQL 16.2 is listening on `127.0.0.1:5432`. `backend/migrations/001_init.sql` created `users`, `employees`, `sessions`, and `reports`. After startup the API reported `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`, login succeeded, and the employee total was 55. A synthetic employee was inserted, the API process was stopped and started, the row was still in PostgreSQL, and it was then deleted. The total returned to 55.

Docker Compose was not run. Docker is not installed. The server was started with `pgserver`.

## Backend

Project freeze command: `python -m pytest tests/test_api.py tests/test_postgres_integration.py -q`: **5 passed, 0 failed, 0 skipped**, exit 0, 13.49s. PostgreSQL coverage uses `harbor_test`. A read-only query afterward reported database `harbor` and 55 employees.

An earlier `python -m pytest tests -q` result of 4 passed covered only the SQLite file. It is not the latest count.

## Frontend

`npx tsc --noEmit` and `npx vite build` were not run in the master handoff pass. The last recorded successful build, from an earlier pass, produced `frontend/dist/assets/index-DzMQ5VOn.css` and `frontend/dist/assets/index-gTnk6TvH.js`.

## Playwright

Project freeze command: `npx playwright test`: **9 passed, 0 failed, 0 skipped**, 27.2s. SQLite `backend/harbor-e2e.db`. TC-04 checks one data row for Asha Sharma and that the row text does not contain Leo. At 390×844 the table stays inside the page and the add form stacks the name fields.

The run includes the prior cases plus a layout test. At 1280×800 the sidebar is narrower than half the shell. At 768×900 and 390×844 the sidebar spans the shell. No horizontal overflow was detected at those three sizes. Upgrade is visible and the sidebar Search box is disabled.

| Test | Result |
|---|---|
| TC-01 valid login, reload keeps the session, TC-10 logout | Passed |
| TC-02 invalid credentials | Passed |
| Sidebar order, Upgrade, disabled Search, disabled Quick Launch | Passed |
| Layout at 1280×800, 768×900, and 390×844 | Passed |
| TC-09 logged-out `#pim` stays on Login | Passed |
| TC-03 list, TC-04 one Asha Sharma row, TC-05 empty, TC-06 reset, page 2 | Passed |
| TC-07 add, required first name, TC-08 edit, reload | Passed |
| Blank login, Dashboard return, Cancel, sort, 10 rows, reports, list HTTP 500 | Passed |
| Proposed Delete | Passed |

TC-04 checks `(1) Records Found`, one table row, cells Asha and Sharma, and no Leo cell. The sidebar test checks the twelve observed labels in order. The Quick Launch test checks that Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet are visible and disabled. No Quick Launch destination is asserted, because none was captured.

## Evidence

Fourteen JSON files under `evidence/` parsed. None were modified.

## Not claimed

Live OrangeHRM Save, delete, column sorting, records-per-page, and XHR paths were not observed. Playwright did not run against PostgreSQL.

## Guide audit, 2026-11-15

Fresh commands, not reused from the freeze:

- `python -m pytest tests/test_api.py tests/test_postgres_integration.py -q`: **5 passed, 0 failed, 0 skipped**, exit 0, 17.05s. PostgreSQL coverage uses `harbor_test`.
- `npx playwright test`: **9 passed, 0 failed, 0 skipped**, exit 0, 29.9s. SQLite `backend/harbor-e2e.db`, not PostgreSQL.
- `npx tsc --noEmit`: exit 0. `npx vite build`: exit 0. Output `frontend/dist/assets/index-DzMQ5VOn.css` and `frontend/dist/assets/index-DgEI7Mnw.js`.
- Read-only query after those commands: database `harbor`, 55 employees.
- `GET /api/health` 200 with `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`. Frontend `GET /` 200. Local login 200. Employee total 55.
- `docker --version` failed because Docker is not installed.
- `npx rea-agents@latest doctor --client cursor --json` reported `healthy: false` and Cursor registration drift (`rea-agents@6.8.0` versus CLI `6.9.0`). Setup was not changed.

The full classification is `docs/guide-requirement-audit.md`.

## Closure pass, 2026-11-15

No application code changed, and the running API and frontend were not stopped. Fresh checks against those servers: health 200, frontend 200, local login 200, employee total 55 on database `harbor`.

`npx rea-agents@6.9.0 doctor --client cursor --json` after the registration repair: exit 0, `healthy: true`, Cursor registration `aligned`. `environment_healthy` remained false. Playwright was not run again. `scenarios/login-page.json` was not executed. No live OrangeHRM network exchange was captured.

## Internship handoff, 2026-11-15

Copy-only change to `frontend/src/components/UnobservedPage.tsx`. The fallback page keeps the selected module name and states that the module is outside the current Harbor HR prototype. Authentication, Dashboard, and PIM remain the implemented scope. Leave stays optional phase 2. Admin stays out of scope. No other module was added.

`npx playwright test` after that copy change: **9 passed, 0 failed, 0 skipped**, 27.5s. SQLite `backend/harbor-e2e.db`, not PostgreSQL.

The backend suite was not run again in this handoff. The last result remains the project-freeze command: **5 passed, 0 failed, 0 skipped**, exit 0, 13.49s, with PostgreSQL coverage on `harbor_test` only. Development database `harbor` was last verified at 55 employees and was not queried or modified in this handoff. Docker Compose remains blocked because Docker is not installed.

Sections above are earlier recorded runs. They are not the results of the verification below.

## Safe verification, 2026-11-15

Commands run in this pass:

- `python -m pytest tests/test_postgres_integration.py -v` from `backend`: **1 passed, 0 failed, 0 skipped**, exit 0, 21.52s. The API under test used `postgresql+psycopg://postgres@127.0.0.1:5432/harbor_test` on port 8011. The test drops and recreates `harbor_test` only. It creates an employee, edits it, stops that API, starts it again, and reads the edited row back. That restart check applies to `harbor_test`, not `harbor`. Before and after the test, `harbor` had 55 employees.
- `npx playwright test` from the project root: **9 passed, 0 failed, 0 skipped**, 39.4s. The Playwright web server used SQLite `backend/harbor-e2e.db` with `HARBOR_RESET=1`. It did not use `harbor`. Uvicorn reported startup complete. The only console note was Node ignoring `NO_COLOR` because `FORCE_COLOR` is set. No test failure and no server error was printed.
- The in-memory suite `tests/test_api.py` was not run again in this pass.

`harbor` was queried again after Playwright and still had 55 employees. `GET /api/health` on port 8000 reported `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`. The prior `backend/harbor-e2e.db` was copied to `backend/harbor-e2e.db.backup-20261115-013131` (45,056 bytes) before Playwright. That backup was not overwritten. Playwright then rewrote `backend/harbor-e2e.db`.

## Master handoff audit, 2026-11-15

This audit did not execute tests and did not query a database. The PostgreSQL and Playwright results above remain the latest recorded runs. They are historical relative to the master audit. The in-memory API suite was not part of that latest run.

## Consolidation, 2026-11-16

`python -m pytest tests -q` from `backend`: **9 passed, 0 failed**, 26.94s. The run includes `tests/test_api.py`, `tests/test_modules.py`, and `tests/test_postgres_integration.py` on `harbor_test`.

`npx tsc --noEmit` exited 0. `npx vite build` exited 0 in 2.81s and wrote `frontend/dist/assets/index-rSlMx95G.js`.

`npx playwright test`: **11 passed, 0 failed**, 41.4s, on SQLite `backend/harbor-e2e.db` with `HARBOR_RESET=1`. The earlier 9-test result is not this suite. A copy of the previous e2e database is `backend/harbor-e2e.db.backup-20261116-162208`.

After the suite, the development API health database ended with `/harbor`. `harbor` held 55 employees and 0 rows in the timesheet and module tables. The seeded middle name was empty.
