# Final handoff audit

Date: 2026-11-15. Project: `orangehrm-rea-poc`. Guide: `OrangeHRM_REA_Reverse_Engineering_Guide.md`, read in full.

This audit read source, documentation, evidence metadata, and existing test reports. It did not change application source, query or modify a database, run tests, restart servers, or interact with OrangeHRM. Original evidence JSON was not edited.

## Update after the authenticated inspection

A later session opened the twelve sidebar landings and the signed-in My Info sections named in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. The debugging tab is no longer the login page. Harbor HR source was then changed only in the frontend: employee detail sections, dashboard counts from the existing employees API, and sidebar landings that quote inspected facts. `harbor` was not queried or modified by that source change. The API on port 8000 was not restarted.

Readiness remains **CONDITIONALLY READY**.

## Strict audit on the running app

This browser inspection did not change application source, did not itself launch Playwright or pytest, and did not connect to PostgreSQL. It opened `http://127.0.0.1:5173`, signed in with the local account, and did not save or delete an employee. The isolated Playwright run recorded in the next section happened after this inspection.

The rendered dashboard showed seven widget headings, disabled Quick Launch buttons, and the text `Local employees: 55`. PIM showed `(55) Records Found`, 50 rows on page 1, and 5 rows after page 2. Add Employee showed First Name, Middle Name, Last Name, a readonly Employee Id, disabled Create Login Details, and disabled Choose File. Save was not clicked. Employee details showed the ten section buttons. The Job section showed stored fields as an em dash for the opened row and `Not stored in Harbor HR` for fields the schema does not have. Reports showed `(6) Records Found`. The live reports page had shown `(4) Records Found`. Leave showed the inspected landing text rather than a leave workflow.

`playwright.config.ts` sets `reuseExistingServer: false`, port 8000, port 5173, SQLite `harbor-e2e.db`, and `HARBOR_RESET=1`. That run is not safe while the current servers are up. `backend/tests/test_postgres_integration.py` drops and recreates `harbor_test` and also counts rows in `harbor`. It was not run.

## Isolated Playwright evidence

Command: `npx playwright test --config=playwright.isolated.config.ts --grep "TC-0"`.

Exit code 0. 5 passed, 0 failed, 0 skipped, duration 38.4 seconds. Started 2026-11-15T13:49:54.446Z. The JSON report is `test-results/isolated/tc-report.json`. The five executed functions collectively cover TC-01 through TC-10: TC-01 with TC-10, TC-02 alone, TC-09 alone, TC-03 through TC-06 together, and TC-07 with TC-08. The other four `test()` calls in `tests/e2e/hrms.spec.ts` were not selected.

The isolated API listened on port 8012 and the isolated frontend on port 5175. The database was SQLite `backend/harbor-e2e.db`. Health evidence in `test-results/isolated/health.json` names `sqlite:///C:/Users/Aayushi Agarwal/Downloads/orangehrm-rea-poc/backend/harbor-e2e.db`. Ports 8000 and 5173 were not used. PostgreSQL databases `harbor` and `harbor_test` were not used. After the run, API PID 23708 and frontend PID 28352 still had their original start times, 15-11-2026 01:34:47 and 15-11-2026 01:36:06. REQ-054 is pass on this evidence. REQ-056 is pass on `docs/evidence/REQ-056-rea-doctor.md` and `docs/evidence/REQ-056-live-connection-check.md`. REQ-003 and REQ-055 are not.

Recounted from the 57 requirement rows: 38 pass, 13 partial, 2 not verified, 4 out of scope.

## Executive summary

Harbor HR is a local React, FastAPI, and database-backed replica of the observed login, dashboard, sidebar, and PIM list, search, add, and edit flows. The isolated Playwright command above is the current TC-01 through TC-10 result. The older 9-passed, 39.4-second run and the `harbor_test` pytest result were not repeated.

Live OrangeHRM evidence is incomplete. The employee list, one Employment Status search, Reset, and pages 2 and 3 were observed earlier. The signed-in My Info profile was opened later. A selected list row, header sorting, records-per-page, and the name, id, job, subunit, and supervisor filters were not verified. Login was not submitted by the inspection.

Readiness is **CONDITIONALLY READY**.

## Independently verified now

| Item | Result |
|---|---|
| Dashboard JSON | `evidence/navigation.redacted.json` parses. `visible_user_label` is null, `visible_user_label_present` is true, and `visible_user_label_saved` is false. Inspection ID `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`. The two account display strings found in other files are absent from this file. |
| Backup | `backend/harbor-e2e.db.backup-20261115-013131` exists and is 45,056 bytes. It was not overwritten. |
| Playwright config | `playwright.config.ts` sets `DATABASE_URL` to `sqlite:///./harbor-e2e.db` and `HARBOR_RESET=1`. |
| PostgreSQL test source | `backend/tests/test_postgres_integration.py` refuses any database other than `harbor_test`, recreates only that database, and reads an edited row after an API restart. |
| Guide test IDs | TC-01 through TC-10 are present in `tests/e2e/hrms.spec.ts`. TC-01 and TC-10 share one test. The file has 9 `test()` calls. |

## Historical results, not re-executed

| Report | Recorded result | Limit |
|---|---|---|
| `python -m pytest tests/test_postgres_integration.py -v` from `backend` | 1 passed, 0 failed, 0 skipped, 21.52s, database `harbor_test` | Not run in this audit. |
| `npx playwright test` | 9 passed, 0 failed, 0 skipped, 39.4s, SQLite `backend/harbor-e2e.db` | Historical default suite. Not re-executed. Distinct from the isolated 5 passed, 38.4s run. |
| Development database `harbor` | Last recorded employee count 55 | Not queried. Treat as historical. |
| Earlier combined pytest | 5 passed, including the in-memory API file, 17.05s in the guide-audit note | Not the latest isolated PostgreSQL run, and not re-run here. |

## Requirement audit

The full matrix is `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. Counts from that matrix:

| Status | Count |
|---|---|
| PASS | 38 |
| PARTIAL | 13 |
| NOT VERIFIED | 2 |
| OUT OF SCOPE | 4 |
| Total | 57 |

Mandatory gaps that keep the project from READY:

- SCR-05 was not opened in the first inventory. Later OBSERVED: signed-in My Info Personal Details, Contact Details, Emergency Contacts, and Job. A selected Employee List row was not opened. Local details and edit remain a PROPOSED reconstruction.
- Live login success, failure, and logout were not performed.
- Header sorting did not change `sortField` or `sortOrder` in the attempts that were recorded.
- No records-per-page control was present in the inspected accessibility trees.
- Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor Name were not submitted.
- The authenticated inspection is recorded in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. It is not a login page.
- Docker Compose was not run. The recorded note says Docker is not installed.
- `compare_web_captures` was not found during that audit section. Doctor was later checked, and REQ-056 is pass.

## Implementation coverage

Static reading only.

| Area | What the code does |
|---|---|
| Login and logout | `LoginPage.tsx` and `backend/app/routers/auth.py`. Session cookie and PBKDF2-SHA256 are Harbor HR choices, not observed OrangeHRM internals. |
| Dashboard and sidebar | `DashboardPage.tsx` and `Sidebar.tsx`. Quick Launch buttons and sidebar search are disabled. |
| Other modules | `UnobservedPage.tsx`. Leave is optional. Admin is out of scope. |
| PIM list | `EmployeeListPage.tsx` calls the local employees API. Reset, search, pagination, and a local sort control are implemented. Live sort parity is not established. |
| Add and edit | `EmployeeForm.tsx` and `EmployeeDetailPage.tsx` call POST and PATCH. Create Login Details and Choose File are disabled. |
| Delete | A local Delete button calls DELETE. The live row glyphs were not clicked, so this is proposed. |
| Reports | `EmployeeReportsPage.tsx` filters a fixed local list. Row glyphs are disabled. |
| Database | `database.py` uses `DATABASE_URL` or SQLite. Playwright forces SQLite. The integration test uses `harbor_test` only. |

## Remaining limitations

- Account display labels remain in original evidence files other than the dashboard JSON. See `docs/FINAL_PRIVACY_AUDIT.md`.
- `evidence/api-observations.md` is the older register. It was not edited, and it does not include the later employees API capture in `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md`.
- `docs/assumptions.md` still lists first-inspection unknowns. The false in-memory database sentence is now marked historical.
- The isolated grep covers TC-01 through TC-10 only. Sidebar order, responsive layout, blank login, and the proposed delete test were not part of that command.

## Recommended next steps

1. Sign in manually on the existing Chrome tab. Do not store the password.
2. Continue only the unread filters, header sorting, and the records-per-page check.
3. Do not click unidentified row glyphs.
4. Re-run Playwright and the `harbor_test` integration test only when rewriting `harbor-e2e.db` and recreating `harbor_test` are acceptable. Do not touch `harbor`.
5. Review `docs/proposed-redactions/` before sharing original JSON.
