# Final project audit

Date: 2026-11-17. Project: `C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc`. Guide checklist: section 16 of `OrangeHRM_REA_Reverse_Engineering_Guide.md`.

This audit inspected the files, the running Harbor HR API, and the Playwright suite. It did not open the OrangeHRM demo, did not edit original evidence JSON, did not change requirement statuses, and did not reset database `harbor`.

The 2026-11-14 text that previously occupied this filename said PostgreSQL was down and that Leave and the other modules were not rebuilt. That text is now `docs/FINAL_PROJECT_AUDIT-2026-11-14.md`. It is historical. It is not the current result.

## 1. Project overview

OrangeHRM was inspected as a public demo. Harbor HR is a separate React, TypeScript, Vite, FastAPI, and PostgreSQL application. It uses synthetic employees. It does not call `opensource-demo.orangehrmlive.com`.

The current requirement register is `docs/FINAL_REQUIREMENT_TRACEABILITY.md`: 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, 3 OUT OF SCOPE. Overall readiness remains **CONDITIONALLY READY**. A running application and a passing test suite do not close the permission gap or the unobserved workflows.

## 2. Guide checklist

| # | Checklist item | Status |
|---|---|---|
| 1 | REA connected in Cursor; browser tools confirmed | PARTIAL |
| 2 | Normal access to the public OrangeHRM demo verified | COMPLETE |
| 3 | Site rules and authorization for observation checked | PARTIAL |
| 4 | Screens captured with sanitized evidence | PARTIAL |
| 5 | Login, navigation, and PIM search workflows documented | PARTIAL |
| 6 | Network observations separated into facts and assumptions | COMPLETE |
| 7 | Requirements, data model, and new API contracts documented | COMPLETE |
| 8 | Local HRMS runs against PostgreSQL with synthetic users | COMPLETE |
| 9 | Playwright tests pass for all selected scenarios | COMPLETE |
| 10 | Traceability and unresolved differences recorded | COMPLETE |
| 11 | Secrets, cookies, tokens, and employee data excluded from artifacts | PARTIAL |

### 1. REA connected — PARTIAL

Checked: on 2026-11-17 the installed package `rea-agents@6.9.0` was run again. The note is `docs/evidence/REQ-056-doctor-2026-11-17.md`. For the explicit Cursor scope, `healthy` is true and `registration:cursor` is `aligned` at `C:\Users\Aayushi Agarwal\.cursor\mcp.json`. `identity.live_server.state` is still `unknown`. The 2026-11-15 doctor note and the browser inspection `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` remain the earlier records. No package was installed.

Missing: a fresh browser-tool call, and doctor's own proof of the running MCP server. Missing analysis engines are outside this web checklist item.

Action: none that can be done without `rea setup` or a new demo capture. Do not upgrade packages for this item.

### 2. Normal demo access — COMPLETE

Checked: `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` records a signed-in session on 2026-11-15. Sidebar clicks opened Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, and Buzz. Login was not submitted in that session. The session was already authenticated.

Missing: this audit did not repeat the visit. A new visit is not authorized. See item 3.

Action: none for this checklist line. Do not open the demo to re-prove it.

### 3. Site rules — PARTIAL

Checked: `docs/evidence/REQ-003-demo-terms-check.md`, `docs/evidence/REQ-003-investigation.md`, `docs/evidence/REQ-003-final-check.md`, and `docs/evidence/REQ-003-REQ-055-closeout-2026-11-16.md`. The login page had no terms link. The open-source vulnerability policy prohibits security testing, scanning, and probing of `opensource-demo.orangehrmlive.com`. No document that was read permits automated browser capture. The SaaS agreement does not name that host. Silence was not treated as permission. REQ-003 status remains PARTIAL.

Missing: an explicit permission or prohibition for ordinary UI capture, from the demo's own terms.

Action: a person must record that statement. Do not email the vulnerability mailbox without approval. Do not capture the demo until permission is explicit.

### 4. Sanitized screen evidence — PARTIAL

Checked: redacted JSON under `evidence/`, including login, employee list, add employee, leave, time, and attendance files. Evidence IDs are cited in `docs/REA_REVERSE_ENGINEERING_REPORT.md`. REQ-008 and REQ-057 say some JSON still stores account display labels, some PNGs were not kept, and four screenshots stay excluded.

Missing: a fully sanitized copy of every original capture. This audit did not edit the originals.

Action: share only the set named in `docs/PRIVACY_SHARING_MANIFEST.md`. Do not edit original evidence JSON in place.

### 5. Login, navigation, and PIM search — PARTIAL

Checked: `docs/workflow-specifications.md`, `docs/navigation-map.md`, `docs/screen-inventory.md`, and `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. Login labels are evidence `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Sidebar order is recorded. A Freelance employment-status search returned `No Records Found`, and Reset was used. That is the 2026-11-14 interaction note.

Missing: live login success, live failure, and live logout. Name, id, job, subunit, and supervisor searches were not submitted on the demo. REQ-006, REQ-014, REQ-020, and REQ-038 stay PARTIAL.

Action: do not invent those outcomes. A new demo search needs the permission in item 3.

### 6. Network facts and assumptions — COMPLETE

Checked: `docs/evidence/REQ-009-api-register.md`. It labels rows Observed, Derived, or Unknown. It records method, path, and status, including `GET /web/index.php/api/v2/pim/employees` status 200. Query values that were not retained stay unknown. Harbor HR routes are excluded from that register. `docs/api-contracts.md` states that its paths are the new API.

Missing: nothing required to separate the classes that were actually seen. Unsubmitted filters still have no method or status. That absence is recorded.

Action: none.

### 7. Requirements, data model, and API contracts — COMPLETE

Checked: `docs/requirements.md` (18 OBSERVED or PROPOSED rows), `docs/FINAL_REQUIREMENT_TRACEABILITY.md` (57 rows), `docs/data-model.md` (marked PROPOSED, not a recovered OrangeHRM schema), and `docs/api-contracts.md` (Harbor HR only).

Missing: nothing for the existence of these documents. Individual requirement gaps are in section 4 of this audit.

Action: none for this checklist line.

### 8. PostgreSQL and synthetic users — COMPLETE

Checked on 2026-11-17, before Playwright stopped the listeners:

- `GET /api/health` returned 200 and `postgresql+psycopg://postgres@127.0.0.1:5432/harbor`.
- `POST /api/auth/login` as `demo_admin` returned 200 and set a `harbor_session` cookie. The password was read from the ignored `.env` and is not written here.
- `GET /api/auth/me` returned username `demo_admin` and display name `Asha Sharma`.
- `GET /api/employees` returned total 55.
- `GET /api/reports` returned 6 titles, including `PIM Sample Report`.
- Timesheets returned 1 row. Leave requests, candidates, reviews, claims, Buzz posts, vacancies, and trackers returned 0.
- A read-only count of database `harbor` returned employees 55, timesheets 1, users 1.

Seed names are synthetic in `backend/app/seed.py`. After Playwright, the API was started again without `HARBOR_RESET`. A later health check again returned 200 and database `harbor`. Vite was listening on `http://127.0.0.1:5173/`.

Missing: Docker Compose was not run. Docker is not installed. REQ-051 stays PARTIAL. Playwright does not use this database.

Action: none for local PostgreSQL startup. Do not set `HARBOR_RESET` on `harbor`.

### 9. Playwright — COMPLETE

Checked twice on 2026-11-17. The later run is the current result: `npx playwright test`, **11 passed**, 0 failed, 3.1 minutes, exit 0. Database: SQLite `backend/harbor-e2e.db` with `HARBOR_RESET=1`. The earlier same-day run was 11 passed in 2.8 minutes. Before the later run, `harbor` still had 55 employees and 1 timesheet. `backend/harbor-e2e.db.backup-20261117-final` was saved first.

| Test | Result |
|---|---|
| TC-01 valid login and TC-10 logout | Passed, 13.1s |
| TC-02 invalid credentials | Passed, 3.6s |
| Sidebar order, employee count, and Quick Launch routes | Passed, 15.3s |
| Layout at 1280, 768, and 390 | Passed, 4.1s |
| TC-09 logged-out visitor does not see PIM | Passed, 1.8s |
| TC-03 list, TC-04 name search, TC-05 empty, TC-06 reset, pagination | Passed, 11.9s |
| TC-07 add, TC-08 edit, validation, and persistence | Passed, 12.2s |
| Blank login, dashboard return, cancel, sort, page size, reports, and list error | Passed, 14.2s |
| Proposed local delete | Passed, 11.9s |
| Remaining modules save, filter, and keep unopened actions disabled | Passed, 31.9s |
| Timesheet list, My Timesheet, and attendance stay within recorded actions | Passed, 7.5s |

Node printed a `NO_COLOR` warning because `FORCE_COLOR` is set. That warning is not a failure.

Missing: the suite does not use PostgreSQL. It does not prove Project Info, Punch In/Out, Admin writes, or a demo workflow.

Action: none for the selected local scenarios. Do not describe this run as a PostgreSQL test.

The 2026-11-14 report of 9 passed in 27.2 seconds, and later notes of 9 passed in 39.4 seconds or 37.0 seconds, are earlier runs. They are not this result.

### 10. Traceability — COMPLETE

Checked: `docs/FINAL_REQUIREMENT_TRACEABILITY.md` gives every REQ-001 through REQ-057 one status, a limitation, and a next action. `docs/traceability-matrix.md` maps the shorter R-01 through R-18 list.

On 2026-11-17 the R-07 and R-09 rows were corrected. They still said non-PIM modules used `UnobservedPage` and that Quick Launch buttons were disabled. `frontend/src/App.tsx` renders a page for each sidebar module. `UnobservedPage.tsx` is not imported. Quick Launch opens the later-inspected Leave and Time routes. Search and Upgrade stay disabled. The old sentences were not erased from history; a dated correction was added. Requirement statuses were not changed.

Missing: the README section "What is implemented" still describes only Authentication, Dashboard, and PIM. That sentence is stale. It was not rewritten in this pass because it is outside the two rows that contradicted the source.

Action: use the 57-row register, not the README sentence, when describing scope.

### 11. Secrets excluded — PARTIAL

Checked: documentation refers to `HARBOR_LOCAL_PASSWORD` and the cookie name `harbor_session`. This audit did not print the password, the cookie value, or a token. `.env` is ignored. A word scan of JSON and Markdown found the words password, cookie, token, authorization, or session in documentation and in evidence files that describe login. The scan did not print values. REQ-057 already states that original labeled JSON and one evidence note still contain account display values and stay ignored, and that four screenshots are not sanitized.

Missing: a guarantee that every file under `evidence/` is safe to copy. A full folder copy is not a safe share.

Action: follow `docs/PRIVACY_SHARING_MANIFEST.md`. Do not edit original evidence JSON to strip labels.

## 3. Checklist totals

| Status | Count |
|---|---|
| COMPLETE | 6 |
| PARTIAL | 5 |
| NOT VERIFIED | 0 |
| BLOCKED | 0 |
| NOT APPLICABLE | 0 |
| Total | 11 |

Item 3 is PARTIAL rather than BLOCKED because the rules were checked and the result was recorded. The missing permission is an external action, and it is named in that item.

## 4. Requirements and traceability

Statuses were not changed. The register still has 57 rows: 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, 3 OUT OF SCOPE.

PARTIAL: REQ-003, REQ-006, REQ-008, REQ-014, REQ-020, REQ-025, REQ-026, REQ-028, REQ-037, REQ-038, REQ-039, REQ-041, REQ-051.

NOT VERIFIED: REQ-055. The passive comparison `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c` returned `changed` and rejected a normalization key. No new capture was made.

OUT OF SCOPE: REQ-027, REQ-044, REQ-045.

This audit did not find a PASS row that should be downgraded. Several PASS rows cite older test times. Today's Playwright run covers the local login, list, search, add, edit, delete, reports, module, and timesheet scenarios those rows describe. It does not replace the separate `harbor_test` restart in REQ-029. That restart was not repeated. The earlier count of 55 employees was confirmed again by a read-only query.

`docs/requirements.md` remains a different 18-row list. It is not a second status total.

## 5. Frontend verification

Verified by the Playwright run above, not by a separate manual click pass. The tests signed in, opened the dashboard, checked the sidebar order and the employee count, followed Quick Launch into Leave and Time, searched and reset the employee list, added and edited an employee, opened reports, and opened the other module screens. The timesheet test checks that Edit and Submit stay disabled. The module test checks that unopened actions stay disabled.

Not claimed as working: Search, Upgrade, Assign Leave, timesheet View/Edit/Submit, attendance View and Save, Punch In/Out, Project Info, Share Photos, Share Video, directory Location, and every Admin action.

## 6. Backend and PostgreSQL

The API was started again after the 3.1 minute Playwright run with `DATABASE_URL` set to database `harbor` and without `HARBOR_RESET`. `GET /api/health` returned 200 and that database URL. Vite answered on port 5173. Tables are defined in `backend/app/models.py` and `backend/migrations/001_init.sql` through `004_workflows.sql`. Pytest was not re-run. The last recorded backend pytest remains the 2026-11-16 closure audit: 9 passed in 33.07 seconds, including `harbor_test`. A read-only count before the later Playwright run was 55 employees and 1 timesheet.

## 7. Playwright results

Latest run: 11 passed, 0 failed, exit 0, 3.1 minutes, 2026-11-17, isolated SQLite. An earlier run the same day was 11 passed in 2.8 minutes. No assertion was removed or weakened. The per-test times in the table above are from the 2.8 minute run. The 3.1 minute run passed the same 11 tests.

## 8. Security

No secret value is written in this report. The local password remains only in the ignored `.env`. Original evidence files were not modified. On 2026-11-17 the ten labeled JSON files were copied again to `docs/proposed-redactions/` with the account-label field set to null. Other evidence JSON files did not have a nonempty account-label string. The three PIM Markdown notes and four screenshots named in `docs/PRIVACY_SHARING_MANIFEST.md` stay local only.

## 9. Work completed during this audit

- Confirmed health, login, 55 synthetic employees, 6 reports, and the existing 1 timesheet on database `harbor`.
- Ran the existing Playwright suite: 11 passed.
- Restarted the API on `harbor` without `HARBOR_RESET`, and restarted Vite.
- Preserved the old audit as `docs/FINAL_PROJECT_AUDIT-2026-11-14.md`.
- Corrected the stale R-07 and R-09 rows in `docs/traceability-matrix.md`.
- Wrote this report.

A later completion pass the same day, without changing application code or requirement statuses:

- Re-ran the installed REA doctor. Cursor registration is aligned. Live-server identity remains unknown.
- Rewrote the ten sanitized JSON copies. Originals were not edited.
- Updated `README.md` so it no longer says the other modules are outside the prototype, and so it no longer says the password is stored in `synthetic.ts`.
- Updated `docs/architecture.md` so routing matches `frontend/src/routes.ts`.
- Confirmed `harbor` still had 55 employees and 1 timesheet, then ran Playwright again: 11 passed in 3.1 minutes.
- Restarted the API on `harbor` without `HARBOR_RESET`. Health returned that database. Vite was listening on port 5173.
- Wrote `docs/FINAL_HANDOVER.md`.

Project Info, Punch In/Out, and Admin user setup were not implemented. The guide and the evidence do not contain those screens. Adding them would invent behavior.

## 10. Remaining work and blockers

- REQ-003: capture permission is not established.
- REQ-055: no normalized scenario comparison.
- Live login success, logout, and most Save actions were not observed.
- Project Info and Punch In/Out were not opened.
- Admin users and settings are out of scope.
- Docker Compose was not demonstrated.
- A full copy of `evidence/` is not safe to share. Use `docs/proposed-redactions/` and `docs/PRIVACY_SHARING_MANIFEST.md`.
- The unfinished demo-capture permission is an external blocker. Checklist item 3 stays PARTIAL because the rules were checked. It is not a code task.

## 11. Readiness

**CONDITIONALLY READY** to show as a local Harbor HR demonstration with the gaps above stated out loud. It is not complete OrangeHRM parity, and the guide checklist is 6 COMPLETE and 5 PARTIAL.
