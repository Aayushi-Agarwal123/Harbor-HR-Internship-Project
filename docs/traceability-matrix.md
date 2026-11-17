# Traceability

| Requirement | Evidence | Prototype | Test status |
|---|---|---|---|
| R-01 Login labels | `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c` in `evidence/capture-manifest.md` | `frontend/src/components/LoginPage.tsx` | Playwright TC-01 uses Username, Password, Login, and the Login heading. It does not check the live form action. |
| R-02 Form action URL | same login inspect, DOM action URL | Documented only. The prototype does not post to it. | n/a |
| R-03 Credential hint exists | same, accessibility text | Not copied into the UI | n/a |
| R-04 Local synthetic sign-in | none — proposed | `POST /api/auth/login`, `LoginPage` | Playwright TC-01, TC-02 |
| R-05 Sidebar labels and order | `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22` | `navItems` in `frontend/src/data/synthetic.ts`, `Sidebar.tsx` | Playwright asserts the twelve labels in that order. |
| R-06 Dashboard heading, Upgrade, Search | same dashboard inspect | `DashboardPage`, `Sidebar` | TC-01 asserts the Dashboard heading. The sidebar test asserts Upgrade is visible and Search is disabled. |
| R-07 Modules outside the current prototype | Later landings are in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` and `evidence/*.redacted.json`. | `App.tsx` renders `LeavePage`, `TimePage`, `RecruitmentPage`, `MyInfoPage`, `PerformancePage`, `DirectoryPage`, `MaintenancePage`, `ClaimPage`, `BuzzPage`, and `AdminPage`. `UnobservedPage.tsx` is not imported. | `tests/e2e/modules.spec.ts` and `tests/e2e/timesheets.spec.ts`. Disabled controls stay disabled. |
| R-08 Employee-list labels | `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493` | `PimPage`, `EmployeeListPage` | TC-03 asserts the Employee Information heading and the record count. Column headers are not individually asserted. |
| R-11 Local search behavior | Freelance empty result is observed. Name filtering is proposed. | `GET /api/employees`, `EmployeeListPage` | Freeze pass TC-04: `(1) Records Found`, one data row containing Asha and Sharma, and that row does not contain Leo. |
| R-12 Records text and pager labels | employee-list inspects | Count is the local total. Page size 50. | Playwright pagination assertion |
| R-13 Add Employee labels | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | `EmployeeForm`. Save persists locally. Live Save was not clicked. | Playwright TC-07 |
| R-14 Edit and details | none — proposed | `EmployeeDetailPage`, `EmployeeForm` | Playwright TC-08 |
| R-15 Session protection | none — proposed | Cookie session and login gate | Playwright TC-09, TC-10 |
| R-09 Quick Launch names | The first dashboard inspect did not click the buttons. Later Leave and Time inspections recorded Apply, My Leave, Assign, Employee Timesheets, and My Timesheet. | `DashboardPage.tsx` opens those local routes. Search and Upgrade stay disabled. | `tests/e2e/hrms.spec.ts` opens the six routes. |
| R-10 Forgot password copy | login inspect link text; href missing | `ForgotPage` | Manual check planned |
| R-16 Sort and page size | No live control was observed | `GET /api/employees` `sort`, `page_size`; list toolbar | Playwright sort, page size, and page 2 |
| R-17 Local delete | none — proposed | `DELETE /api/employees/{id}` and the Delete button | Playwright delete test; API 204 |
| R-18 Report titles | `evidence/pim-reports.redacted.json` and the 2026-11-14 reports captures | `GET /api/reports`, `EmployeeReportsPage` | Playwright reports search and reset |

A repeated 2026-11-15 attempt, after REA doctor reported `healthy: true`, still found no browser on port 9222. Live login, logout, and employee details stay UNKNOWN. No new evidence ID was issued. Playwright in `tests/e2e/hrms.spec.ts` uses SQLite file `backend/harbor-e2e.db`, not PostgreSQL. It does not call the OrangeHRM demo. PostgreSQL create, edit, and restart persistence is `backend/tests/test_postgres_integration.py` against `harbor_test` only. That test does not modify the development database `harbor`.

## Closeout, 2026-11-16

See `docs/ORANGEHRM_FINAL_CLOSEOUT.md`. Fresh counts: API 4 passed in 4.93s, `harbor_test` 1 passed in 11.79s, Playwright 9 passed in 29.5s. Live OrangeHRM items stay unknown. The section below is the earlier same-day run.

## Execution, 2026-11-16

Fresh runs, not a reuse of the 2026-11-15 counts:

- `python -m pytest tests/test_api.py -q`: 4 passed, 7.77s. In-memory SQLite.
- `python -m pytest tests/test_postgres_integration.py -q`: 1 passed, 22.64s. `harbor_test` only. The edited row was read after the test API restarted.
- `npx playwright test`: 9 passed, 0 failed, 0 skipped, 37.0s. SQLite `backend/harbor-e2e.db`.
- After those runs, `GET /api/health` reported `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`. Frontend `GET /login` returned 200.

Live OrangeHRM login, logout, employee details, and XHR method/path/status remain unobserved. Original evidence JSON was not modified.

## Correction, 2026-11-17

The R-07 and R-09 rows above were stale. They still described `UnobservedPage` and disabled Quick Launch buttons. `frontend/src/App.tsx` renders a page for each sidebar module. Quick Launch opens the later-inspected Leave and Time routes. Search and Upgrade stay disabled. This correction does not change any REQ status.
