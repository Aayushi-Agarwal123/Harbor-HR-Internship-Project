# Guide requirement audit

Date: 2026-11-15. Source of truth: `OrangeHRM_REA_Reverse_Engineering_Guide.md` (5 November 2026), sections 1–17. Project: `orangehrm-rea-poc`.

Statuses mean this pass only. A file existing is not enough for VERIFIED. Original evidence JSON was not edited. Development database `harbor` was not modified. Leave was not built. Admin was not built.

This pass executed:

| Command | Result |
|---|---|
| `node --version` / `npm --version` / `python --version` | Node `v24.22.1`, npm `11.19.1`, Python `3.12.10` |
| `docker --version` | Command not found. Docker Compose was not run. |
| `npx rea-agents@latest doctor --client cursor --json` | Exit completed. `healthy: false`. Node check passed. Cursor registration requests `rea-agents@6.8.0` while the CLI package resolved by this command is `6.9.0`. `rea setup` was not run. |
| `python -m pytest tests/test_api.py tests/test_postgres_integration.py -q` from `backend` | **5 passed, 0 failed, 0 skipped**, exit 0, 17.05s. PostgreSQL work uses `harbor_test`. |
| `npx playwright test` from the project root | **9 passed, 0 failed, 0 skipped**, exit 0, 29.9s. SQLite `backend/harbor-e2e.db`, not PostgreSQL. |
| `npx tsc --noEmit` in `frontend` | Exit 0 |
| `npx vite build` in `frontend` | Exit 0. `dist/assets/index-DzMQ5VOn.css`, `dist/assets/index-DgEI7Mnw.js` |
| Read-only `select count(*) from employees` on `harbor` | `('harbor', 55)` |
| `GET /api/health`, `GET /` on port 5173, local login, `GET /api/employees` | 200, 200, 200, total 55 |

## Requirement classification

| ID | Guide | Requirement | Files | What exists | Evidence | Test | Status | Remaining |
|---|---|---|---|---|---|---|---|---|
| A-01 | 2 | Windows, Node supported by REA, Python 3.11+, Playwright | This machine | Windows, Node 24.22.1, Python 3.12.10, Playwright installed | n/a | Version commands this pass | VERIFIED | None for the local toolchain |
| A-02 | 2, 3, 16 | REA installed and Cursor MCP connected, browser tools confirmed | `C:\Users\Aayushi Agarwal\.cursor\mcp.json` | 2026-11-15 closure: the REA entry now launches `rea-agents` 6.9.0 through Node. `npx rea-agents@6.9.0 doctor --client cursor --json` returned exit 0, `healthy: true`, and Cursor registration `state: aligned`. `environment_healthy` is still false. Playwright and Vault registrations were left in place. The skill copy was not updated. The already running MCP process was not restarted. | Doctor output this closure pass | Doctor, not a new browser session | PARTIAL | Registration drift is repaired on disk. Cursor must be restarted before the live MCP process uses the new command. Optional native engines were not installed. |
| A-03 | 6 | Isolated Chrome CDP observation | `evidence/capture-manifest.md` | Earlier captures used local CDP. This pass did not open Chrome or the live demo. | `ev_7d2999e258605ee12d3bfad3a346cb79fe98340e238ba40d6955d2d93b0ad0e4`, `ev_6e407e02060f349249623f3f748b83e3fec1abd0369af2b2791dca8581157f68` | Not repeated | PARTIAL | No new CDP session this pass |
| A-04 | 5 | Manual investigation before automation | Screen inventory, navigation map, later PIM notes | Login, dashboard, PIM list, one status search, add form, and reports were recorded on earlier dates. | Capture manifest and `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md` | Not repeated | PARTIAL | Live login, logout, and employee details were not performed |
| A-05 | 7 | Login and logout observation | `docs/workflow-specifications.md` WF-01 | Login page controls were observed. The Login button was not clicked. Logout was not observed. | `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c` | Local TC-01, TC-02, TC-10 only | PARTIAL | Live success, failure, and logout remain UNKNOWN |
| A-06 | 1, 5 | Dashboard and navigation observation | `docs/screen-inventory.md`, `docs/navigation-map.md`, `docs/REAL_ORANGEHRM_INTERACTION_MATRIX.md` | Historical for the first audit: other module pages were not opened. Later OBSERVED: the sidebar landings in the interaction matrix. Subpages that the inspection report still lists as unopened remain UNKNOWN. | `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22` plus the landing rows in the interaction matrix | Playwright sidebar order | VERIFIED for the observed menu and the later landings. Unopened subpages stay UNKNOWN. | Do not build unopened subpages from labels |
| A-07 | 8 | PIM employee listing | `EmployeeListPage.tsx` | Columns, count text, and pager buttons were observed. Local list uses synthetic rows. | `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493` | TC-03 passed | VERIFIED for local listing. Live cell values were not copied. | None required |
| A-08 | 8 | Employee search and filtering | `EmployeeListPage.tsx`, interaction note | Freelance search, empty text, and Reset were observed. Name search was not submitted on the demo. | `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d`, `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d` | TC-04, TC-05, TC-06 passed on the local name rule | PARTIAL | Local name matching is PROPOSED. Include, job, subunit, and id searches were not live-verified. |
| A-09 | 5 | Employee details | `EmployeeDetailPage.tsx`, `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` | Historical: the first audit had no detail page. Later OBSERVED: the signed-in My Info sections. A selected list row was not opened. The local page is PROPOSED. | `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`, `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`, `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`, `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4` | TC-08 opens the local detail page | PARTIAL. The local page is not the live list-row screen. | Do not invent the unopened sections |
| A-10 | 5, 8 | Add employee observation, no live write | `evidence/add-employee.redacted.json`, `EmployeeForm.tsx` | Fields were observed. Save was not clicked. Local save is proposed. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | TC-07 passed locally | PARTIAL | Live validation is UNKNOWN |
| A-11 | 4, 9, 16 | Sanitized evidence | `evidence/*.redacted.json`, `screenshots/` | Redacted JSON and viewport metadata exist. Login and employee-list PNGs exist. Add and reports PNGs were not copied because they include branding or names. | Capture manifest | JSON files were not re-hashed this pass | PARTIAL | Screenshot coverage is incomplete by design |
| A-12 | 1, 8 | API interaction register | `evidence/api-observations.md` | Network lists were empty. OrangeHRM method, path, and status for login, search, and save are UNKNOWN. | Capture manifest, `observation_ms` 0 | n/a | UNKNOWN | Do not invent OrangeHRM endpoints |
| A-13 | 7, 11 | Workflow specifications | `docs/workflow-specifications.md` | WF-01 through WF-06 exist. WF-03 now points at the later Freelance search without replacing the first inspect. | Evidence IDs in that file | n/a | VERIFIED as documentation of what was seen | Edit and delete workflows remain unobserved |
| A-14 | 11 | Requirements tagged | `docs/requirements.md` | R-01–R-18 are tagged OBSERVED or PROPOSED. | Same evidence IDs | Traceability matrix | VERIFIED | None |
| A-15 | 11 | Proposed data model | `docs/data-model.md`, `backend/app/models.py`, `backend/migrations/001_init.sql` | Local User, Employee, Session, and Report tables. Not an OrangeHRM schema. | Guide example only | PostgreSQL test creates and edits on `harbor_test` | VERIFIED as a proposed model | OrangeHRM schema remains UNKNOWN |
| A-16 | 11 | Proposed API contracts | `docs/api-contracts.md`, `backend/app/routers/` | Login, logout, me, employees CRUD, hints, meta, reports, health. | None for OrangeHRM | API tests passed | VERIFIED as Harbor HR routes | Not OrangeHRM contracts |
| A-17 | 12 | Architecture | `docs/architecture.md` | React, FastAPI, PostgreSQL for the running app. Playwright uses SQLite. | n/a | Health check this pass | VERIFIED | Docker Compose is not part of the running path |
| A-18 | 12 | React frontend | `frontend/src` | Login, dashboard, sidebar, PIM list, search, reset, add, edit, validation, loading, empty, and error states. | Requirements R-01–R-18 | Playwright 9 passed | VERIFIED for the required local screens | Other modules are the outside-scope page |
| A-19 | 12 | FastAPI backend | `backend/app` | Session cookie, PBKDF2-SHA256, validation, synthetic seed when the table is empty. | PROPOSED | 5 passed | VERIFIED | Single local account. Multi-role RBAC was not built. |
| A-20 | 12, 16 | PostgreSQL persistence | `backend/tests/test_postgres_integration.py` | Create, edit, API restart, and read ran against `harbor_test`. `harbor` stayed at 55. | n/a | This pass, 17.05s | VERIFIED | Not verified through Docker Compose |
| A-21 | 13 | Playwright TC-01–TC-10 | `tests/e2e/hrms.spec.ts` | All ten IDs are in the file. The suite uses SQLite. | Guide section 13 | 9 passed, 29.9s | VERIFIED for the local app | Not run on PostgreSQL |
| A-22 | 1, 11 | Evidence-to-test traceability | `docs/traceability-matrix.md` | Each R-ID has evidence or an explicit proposed tag, a file, and a test or `n/a`. | Matrix | This Playwright run | VERIFIED | R-07 and R-10 have no automated assertion |
| A-23 | 12 | README and startup | `README.md` | pgserver startup, migration, API, frontend, test commands. Docker is described as unavailable. | n/a | Health and login this pass | VERIFIED | Compose startup is BLOCKED |
| A-24 | 1, 16 | Unknowns and assumptions | `docs/assumptions.md` | First-inspect unknowns are kept. Later search notes are separate. | Interaction report | n/a | VERIFIED | The unknown list is still the correct live gap list |
| A-25 | 12 | Docker Compose | `docker-compose.yml` | File exists. `docker` is not installed. | n/a | Not run | BLOCKED | Do not claim Compose was verified |
| A-26 | 9 | Optional login scenario | `scenarios/login-page.json` | File matches the guide example. It was not validated and not executed. | n/a | Not run | OPTIONAL | Skip automated demo capture unless site rules are confirmed |
| A-27 | 10 | Frontend JS analysis | Not produced | `export_web_scripts` and bundle analysis were not called. | Capture manifest says they were not called | n/a | OPTIONAL | Do not copy OrangeHRM scripts |
| A-28 | 1 | Leave | Sidebar only | Outside-scope page | Guide: phase 2 | Not built | OPTIONAL | Do not add it to close the menu |
| A-29 | 1 | Admin | Sidebar only | Outside-scope page | Guide: out of scope | Not built | OUT OF SCOPE | Do not add it |
| A-30 | 13 | Responsive layout | `frontend/src/styles.css` | Local layout at 1280×800, 768×900, and 390×844 | PROPOSED. Not OrangeHRM screenshots. | Playwright layout test passed | VERIFIED for those local viewports | Not pixel parity |

## Completed

Login, invalid login, blank login, session reload, logout, protected PIM, dashboard, sidebar order, PIM list, local search, empty result, reset, pagination, add validation, edit after reload, PostgreSQL create/edit/restart on `harbor_test`, synthetic data, and the required documents.

## Outstanding

- Live OrangeHRM login success, login failure, and logout: UNKNOWN.
- Live selected-row employee details, Save, delete, a sort that changes `sortField` or `sortOrder`, and records-per-page: UNKNOWN. Signed-in My Info sections were later OBSERVED.
- OrangeHRM XHR method, path, and status: UNKNOWN.
- Local name search, sort, page size, and delete: PROPOSED, covered by tests, not live parity.
- REA Cursor registration is aligned and doctor `healthy` is true. `environment_healthy` is still false. The running MCP process was not restarted. Live OrangeHRM session was not available on port 9222.
- Docker Compose: BLOCKED.
- Playwright does not use PostgreSQL.
- Leave: OPTIONAL. Admin: OUT OF SCOPE.
- `scenarios/login-page.json` was not run.
- No new live-demo capture was made in this pass.

## Closure pass, 2026-11-15

The version pin alone left the registration `stale`. A dry run of `rea setup --client cursor` planned a direct Node command and a skill update. Only the REA command in `mcp.json` was changed. Playwright and Vault entries were preserved. The skill was not updated. Hopper, Ghidra, IDA, JADX, and Kuna were not installed.

`list_browser_targets` against `http://127.0.0.1:9222` returned `provider_unavailable` / `endpoint_unreachable`. Nothing was listening on 9222 or 9223. Login submission, logout, employee details, and OrangeHRM network calls were not observed. `scenarios/login-page.json` was not executed, because that would open a new browser against the public demo without an existing authorized session.

The running Harbor HR servers were left up. Read-only checks: health 200 on `harbor`, frontend 200, local login 200, employee total 55. Playwright, pytest, TypeScript, and the production build were not repeated, because application code did not change and stopping the servers was not required.

## Live evidence pass after registration repair

`npx rea-agents@6.9.0 doctor --client cursor --json` returned exit 0. Registration health and doctor `healthy` are true. Cursor registration state is `aligned`. `environment_healthy` is false. Hopper, Ghidra, IDA, JADX, and Kuna were not installed; the guide does not require them for this web study.

The REA MCP server answered `list_browser_targets`. The result was `provider_unavailable`, reason `endpoint_unreachable`, for `http://127.0.0.1:9222`. Ports 9222 and 9223 had no listener. No browser was launched. No demo page was opened. No evidence ID, screen, action, HTTP method, path, or status was captured.

Mandatory live observations that remain UNKNOWN: login submission outcome, logout, employee details, and OrangeHRM network exchanges. Harbor HR code, original evidence JSON, and database `harbor` were not modified. Expensive tests were not repeated.

The definition of done is met for the local replica. The project is not 100% complete. Docker Compose was not run, and the live login, logout, employee-detail, and network observations remain unknown.
