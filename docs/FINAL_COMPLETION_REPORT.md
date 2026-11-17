# Harbor HR completion report

Date: 2026-11-14.

## 1. Original guide requirements

The guide asks for a black-box reconstruction: login, sidebar and dashboard, employee listing, search and filter, local add and edit, PostgreSQL persistence, Playwright for the normal and validation cases, and a trace from each parity claim to evidence or an explicit assumption. Leave is optional. Admin settings are out of scope. OrangeHRM source, logos, and live employee records must not be copied.

## 2. Completed functionality

- Local login, invalid login, blank-field message, session kept across reload, and logout.
- Dashboard, sidebar, and a return path from PIM to Dashboard.
- Employee list from the API, search, empty result, reset, and pagination.
- Add, required first name, cancel without saving, edit, and reload.
- Proposed sort, 10/25/50 rows, and confirmed delete.
- Reports list from the local API. The local reports filter is PROPOSED. Live Reports Search and Reset were not observed.
- Loading, empty, and HTTP error text on the employee list.

## 3. Newly implemented in this pass

- `sort`, `direction`, and `page_size` on `GET /api/employees`.
- Employee List controls for those query fields, and a Delete button.
- `reports` table, seed of the six recorded titles, and `GET /api/reports`.
- Reports screen loads those titles from the API.
- Health check runs `SELECT 1`.
- API tests for invalid status, sort, page size, reports, delete, and reopening a SQLite file.
- Playwright coverage for the items above.

## 4. Architecture

Browser React + TypeScript + Vite on port 5173. Vite proxies `/api` to FastAPI on port 8000. FastAPI uses SQLAlchemy. A missing or unknown `harbor_session` cookie returns 401. Passwords are PBKDF2-SHA256. There is no URL router; the shell is shown only after `GET /api/auth/me` succeeds.

## 5. Database and persistence

Verified database: PostgreSQL 16.2 at `127.0.0.1:5432`, database `harbor`. `backend/migrations/001_init.sql` was applied. The API health check reports `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`. A synthetic employee was created, the API process was restarted, the row was still in PostgreSQL, and it was deleted. The seed total is 55.

Docker is not installed, so Docker Compose was not the process that started PostgreSQL. `pgserver` started a local PostgreSQL 16.2 cluster in `backend/pgdata`. Playwright uses SQLite. The PostgreSQL integration test uses `harbor_test` and leaves `harbor` unchanged.

## 6. API endpoints

`GET /api/health`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `GET /api/employees`, `GET /api/employees/hints`, `GET /api/employees/meta`, `GET /api/employees/{id}`, `POST /api/employees`, `PATCH /api/employees/{id}`, `DELETE /api/employees/{id}`, `GET /api/reports`.

These are Harbor HR routes, not OrangeHRM routes. Details are in `docs/api-contracts.md`.

## 7. Playwright

Project freeze: `npx playwright test`: **9 passed, 0 failed, 0 skipped**, 27.2s. SQLite `backend/harbor-e2e.db`, not PostgreSQL. TC-04 checks `(1) Records Found` and that the only data row contains Asha and Sharma and does not contain Leo. At 390×844 the employee table stays inside the page and the add form stacks First Name above Last Name.

Guide audit, 2026-11-15: `npx playwright test`: **9 passed, 0 failed, 0 skipped**, exit 0, 29.9s. Same SQLite file, not PostgreSQL. TC-01 through TC-10 are in that run.

## 8. Build and TypeScript

Guide audit, 2026-11-15: `npx tsc --noEmit` exit 0. `npx vite build` exit 0. Output `frontend/dist/assets/index-DzMQ5VOn.css` and `frontend/dist/assets/index-DgEI7Mnw.js`.

Same pass: `python -m pytest tests/test_api.py tests/test_postgres_integration.py -q`: **5 passed, 0 failed, 0 skipped**, exit 0, 17.05s. The PostgreSQL test uses `harbor_test`. A following read-only query showed `harbor` still has 55 employees.

## 9. Evidence traceability

Original REA JSON was not modified. Requirements R-01 through R-18 are mapped in `docs/traceability-matrix.md`. Observed behavior stays tagged OBSERVED. Sort, page size, delete, name-search semantics, and the reports table are PROPOSED.

## 10. Remaining limitations

- Docker Compose is blocked because Docker is not installed. PostgreSQL itself was verified through `pgserver`, not through Compose.
- On 2026-11-15 the Cursor REA registration was aligned to the 6.9.0 launcher. A later doctor run still reported `healthy: true`, registration `aligned`, and `environment_healthy: false`. The connected MCP call `list_browser_targets` could not reach port 9222, so no live login, logout, detail screen, or network exchange was captured.
- Playwright uses SQLite, not PostgreSQL.
- Admin, Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, and Buzz are not built. Each opens `UnobservedPage`, which keeps the module name and says the module is outside the current prototype. The stated focus is Authentication, Dashboard, and PIM. Leave remains optional phase 2. Admin remains out of scope.
- Create Login Details, file upload, checkboxes, and glyph row actions stay disabled.
- The local sort and row-count controls were not seen on the demo.
- FastAPI still uses the deprecated startup hook. That does not change behavior.

## 11. Application URL

http://127.0.0.1:5173

## 12. Local account

Username `demo_admin`. The password is the local synthetic value in `frontend/src/data/synthetic.ts`. It is not an OrangeHRM credential and is not repeated here.

## Requirement status

| Requirement | Status |
|---|---|
| Login, invalid login, blank fields, session reload, logout | COMPLETED AND VERIFIED |
| Protected navigation | COMPLETED AND VERIFIED |
| Dashboard and sidebar | COMPLETED AND VERIFIED |
| Employee list, search, empty result, reset, pagination | COMPLETED AND VERIFIED |
| Add, validation, cancel, edit, persistence on SQLite | COMPLETED AND VERIFIED |
| Proposed sort and page size | COMPLETED AND VERIFIED |
| Proposed delete | COMPLETED AND VERIFIED |
| Reports list, search, reset from stored titles | COMPLETED AND VERIFIED |
| API error message on the list | COMPLETED AND VERIFIED |
| Password hashing and session cookie | COMPLETED AND VERIFIED |
| PostgreSQL persistence | COMPLETED AND VERIFIED |
| Docker Compose as the startup method | BLOCKED |
| Leave management | NOT IMPLEMENTED (guide phase 2, optional) |
| Admin settings | NOT IMPLEMENTED (guide: out of scope) |
| Live row-action glyphs, checkboxes, file upload, Create Login Details | NOT IMPLEMENTED (not observed; left inactive) |
| Sidebar modules other than Dashboard and PIM | NOT IMPLEMENTED. The page states they are outside the current prototype. |
