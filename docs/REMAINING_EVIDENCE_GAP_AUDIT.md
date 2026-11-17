# Remaining evidence gap audit

Date: 2026-11-15. Project: `orangehrm-rea-poc`.

This pass re-read the OrangeHRM REA guide and the current handoff documents, then checked the evidence and configuration those gaps depend on. It did not modify source, original evidence, databases, or backups. It did not attach to a browser, submit a form, call an API, run a test, or query PostgreSQL.

The handoff counts remain 57 requirements, 33 PASS, 14 PARTIAL, 6 NOT VERIFIED, and 4 OUT OF SCOPE. No row was promoted to PASS.

## Executive summary

The remaining work is evidence and documentation, not a missing core application. Six gaps are still open:

| Gap | Current status | Safe to close in this environment |
|---|---|---|
| Employee details | Not observed | Not in this pass. A local Chrome process is listening on `127.0.0.1:9222`, but this audit did not attach to it. |
| Live login and logout | Login page observed. Submit and logout not observed. | Not in this pass. A later manual session can observe them. |
| API method, path, and status | Not captured | Not in this pass. Needs a new observation window before one permitted action. |
| Search, sorting, and records-per-page | Partly observed | Not in this pass. Some absences are already recorded. |
| Account-label privacy | Dashboard file is redacted. Ten original JSON files still store display labels. | Proposed copies already exist. Originals were not changed. |
| PostgreSQL documentation | Code, README, and tests disagree with one assumptions sentence. | A documentation correction is safe. It was not applied, because this task creates only this report. |

Readiness stays **CONDITIONALLY READY**.

## Gap 1 — Employee details

**Existing evidence.** Historical: the first `docs/screen-inventory.md` row for SCR-05 had no evidence ID, and the first workflow pass had not opened employee details. The inventory and `docs/workflow-specifications.md` now record the later signed-in My Info sections. A selected Employee List row was not opened. The 2026-11-14 employee-list note says row-action glyphs had no accessible name Edit or Delete and were not clicked. No employee-details JSON file exists.

**Missing.** DOM, accessibility text, URL, tabs, and a screenshot of one live employee record. There is no observed edit form.

**Local stand-in.** `frontend/src/components/pim/EmployeeDetailPage.tsx` loads a local employee and states that the live screen was not inspected. That is proposed behavior. It is not evidence of OrangeHRM.

**Safe verification.** Possible only with a permitted browser session. The smallest action is to inspect a details page that is already open, without clicking Save, Edit, or Delete. If no details page is open, do not click a row glyph until a person confirms it is a view action.

**Limitation.** Earlier closure notes say port 9222 was closed. This pass found `chrome.exe` listening on `127.0.0.1:9222`. The tab, login state, and URL were not inspected. No new evidence ID was created.

**Next action.** Do not implement more detail fields. The signed-in My Info sections are already recorded. A selected list-row page remains unopened. Do not describe those My Info sections as that page.

## Gap 2 — Live login and logout

**Existing evidence.** `evidence/login-page.redacted.json`, inspection `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`, URL ending in `/auth/login`. The capture used `observation_ms` 0 and did not request storage. `docs/workflow-specifications.md` says the Login button was not clicked, so success and failure text are unknown. The dashboard file records a page that was already open. It contains no logout control name. A later screen-inventory note says a closed port blocked another login and logout inspection.

**Missing.** A submitted valid login, the resulting route, a rejected login message, the logout control, and the page shown after logout. The form action URL is known from the DOM. The form method value was not retained. That URL is not an HTTP exchange.

**Safe verification.** Possible later by typing the published demo credentials by hand, observing one success and one failure, then logging out. Do not save cookies, tokens, or the password hint. This pass did not do that.

**Limitation.** Same unused Chrome listener as Gap 1. Attaching was intentionally skipped.

**Next action.** Keep local TC-01, TC-02, and TC-10 labeled as Harbor HR tests. Do not describe them as demo observations.

## Gap 3 — API method, path, and status

**Existing evidence.** `evidence/api-observations.md` says the login, dashboard, list, add-employee, and reports inspects saved no network requests. `observation_ms` was 0, so requests that happened before the inspect were not available. The login form action is the only related URL, and the register marks it as DOM, not an HTTP status. A 2026-11-15 attempt found no listener and captured nothing.

**Missing.** Method, path, and status for login, search, pagination, and save. No response body should be stored even if a later capture sees one.

**Safe verification.** Start an observation before one ordinary manual action, then record only method, path, and status. Do not save headers, cookies, or bodies. This pass made no network call.

**Limitation.** No observation window was opened. The listening Chrome process was not used.

**Next action.** Leave OrangeHRM routes UNKNOWN. Harbor HR routes in `docs/api-contracts.md` stay proposed.

## Gap 4 — Search fields, sorting, and records-per-page

**Existing evidence.** The first employee-list inspect shows the filter labels and does not click Search. The 2026-11-14 interaction note, which is not an original redacted JSON replacement, records more:

- Filter labels and the opened option lists for Employment Status, Include, Job Title, and Sub Unit.
- A one-character Employee Name prefix. Suggestions appeared. Search was not clicked, and the record count did not change.
- The same prefix in Supervisor Name. Search was not clicked.
- Employee Id was filled and then cleared. The typed characters were not retained, and Search was not clicked.
- One submitted search: Employment Status Freelance. The table was empty, the page said no records were found, and the URL did not change. Evidence `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d`.
- Reset after that status search. Evidence `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d`. The empty-result notice was still present after the recorded wait.
- Page button 2. Evidence `ev_4aa9dfeae3689fe1c9db1a11e3540731b8df4a3cbdb0d0d429fcaea124097f1d`. The URL stayed the same. The first visible id changed. No selected state was exposed. Row text was not saved.

**Missing.** A submitted search for Employee Name, Employee Id, Include, Job Title, Sub Unit, or Supervisor Name. Reset after a typed value. A before-and-after column sort. A records-per-page control.

**What is not missing.** Header glyphs were visible, and no header was clicked, so sort behavior is unobserved rather than absent. No records-per-page control appeared in the captured trees. That is an observed absence on those captures, not proof that the demo cannot offer one after a change of settings.

`docs/assumptions.md` still says the live Search button was not pressed. That sentence is older than the Freelance search note and should not be treated as the latest evidence.

**Safe verification.** One additional permitted search at a time, using a non-sensitive value already visible in the dropdowns, then Reset. Do not open a person from a suggestion. Do not click row actions. A sort check is safe only if it changes order and not stored data. This pass performed none of those clicks.

**Next action.** Keep Harbor HR name search, sort, and page size marked proposed. The Freelance empty search and the page-2 click can stay observed.

## Gap 5 — Account-label privacy

**Existing evidence.** `evidence/navigation.redacted.json` stores a null account label, records that a label was present, and records that the value was not saved. Its inspection ID is unchanged. The old dashboard label is not in that file.

A key scan of original JSON, without printing values, still finds a non-empty account-label field in these files:

- `evidence/add-employee.redacted.json`
- `evidence/assign-leave.redacted.json`
- `evidence/employee-list.redacted.json`
- `evidence/employee-list-2026-11-12.redacted.json`
- `evidence/leave-apply.redacted.json`
- `evidence/leave-list.redacted.json`
- `evidence/my-leave.redacted.json`
- `evidence/pim-reports.redacted.json`
- `evidence/time-landing.redacted.json`
- `evidence/pim-interaction-investigation/reports-page-2026-11-13.json`

The three Attendance JSON files record that the account label was not saved. They were not edited.

**Proposed inventory.** Copies that null those ten account-label fields, and record presence without the value, are already in `docs/proposed-redactions/` under the same relative names. They are proposals. They do not replace the originals.

**Also not auto-redacted.** One interaction JSON has a 55-character `employee_name` value. It was not printed. Its role is not confirmed, so it was not included in the proposed account-label copies.

**Documentation.** PIM notes and parts of the screen inventory still quote account labels that remain in the original evidence. This pass did not change those files.

**Safe verification.** Compare a proposed copy with its original by key state: original non-empty, copy null, presence true, saved false. Do not print the value. This pass did not modify either set.

**Next action.** If a package will be shared, distribute the proposed copies only after a person reviews them. Do not overwrite `evidence/`.

## Gap 6 — PostgreSQL documentation

**Code and tests, read only.**

- `backend/app/database.py` uses `DATABASE_URL` when it is set. Otherwise it uses SQLite file `backend/harbor.db`.
- `backend/tests/test_api.py` forces an in-memory SQLite URL before importing the app.
- `playwright.config.ts` starts the API with SQLite `backend/harbor-e2e.db` and `HARBOR_RESET=1`.
- `backend/tests/test_postgres_integration.py` points its temporary API at `harbor_test` on `127.0.0.1:5432` as the local `postgres` user. It recreates only `harbor_test`. It can read a count from `harbor`. It does not drop `harbor`.
- `docker-compose.yml` defines PostgreSQL 16 and database `harbor` with a different local user from the integration test. The compose password is a local configuration value and is not repeated here.
- `README.md` says the running application uses PostgreSQL and that Docker is not installed, so an earlier run used `pgserver`.

**Discrepancy.** `docs/assumptions.md` still says the frontend keeps employees in memory and PostgreSQL is not connected. That sentence conflicts with `database.py`, the README, and the PostgreSQL test. It also conflicts with the later sentence in the same file that calls Harbor HR sort and page size proposed local behavior rather than an in-memory demo.

**What this pass did not do.** It did not connect to PostgreSQL, read a row count, change `DATABASE_URL`, or edit the assumptions file. The historical count of 55 employees in `harbor` remains historical.

**Safe verification.** A later documentation edit can replace that one sentence with the configuration above. A later count query is optional and was not required to see the contradiction.

**Next action.** Correct the sentence in a documentation-only change. Do not point the correction at a new database migration.

## Recommended order

1. Correct the stale assumptions sentences for Search and PostgreSQL. Documentation only.
2. Decide whether shared packages use `docs/proposed-redactions/` instead of the ten original JSON files. Do not edit the originals.
3. When a permitted demo session is open, inspect one already-open employee details page without saving.
4. Observe one manual login, one failed login, and one logout. Store no cookies or passwords.
5. Repeat one ordinary search with observation started first, and record only method, path, and status.
6. Submit the still-untested filters one at a time, then Reset. Treat sort as a separate read-only check. Do not invent a records-per-page control that the captures did not show.

Do not start a UI redesign or new feature work for these gaps.

## Final readiness

**CONDITIONALLY READY**

No gap above was closed by a new observation. The local application and the historical tests remain as recorded in `docs/FINAL_HANDOFF_AUDIT.md`. Employee details, live login and logout, and OrangeHRM API exchanges are still unobserved.
