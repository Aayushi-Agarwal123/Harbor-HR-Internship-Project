# REA remaining inspection results

Date: 2026-11-15. Project: `orangehrm-rea-poc`.

This pass attached to the existing Chrome listener on `127.0.0.1:9222`. It did not launch a browser, submit a login, click Save, edit an employee, or query a database. Harbor HR source was not changed. Original evidence JSON was not changed. No test suite was run.

Handoff readiness stays **CONDITIONALLY READY**. No requirement was promoted to PASS.

## Browser connection

Chrome was listening on `127.0.0.1:9222`, process observed by the local port check. REA `list_browser_targets` connected.

| Fact | Value | Class |
|---|---|---|
| Evidence | `ev_01d9d1bb460aedb83760b443aa71b9b9b1dfefd4b3ba987df0cb35a4fc6c14d2` | OBSERVED |
| Browser | Chrome/157.0.8103.51 | OBSERVED |
| Target | `C1075BA3A8F5B98B0CEE8BCCB5E2005B` | OBSERVED |
| Title | `OrangeHRM` | OBSERVED |
| URL at attach | `https://opensource-demo.orangehrmlive.com/web/index.php/attendance/configure` | OBSERVED |
| Attachment state | CDP could not establish debugger attachment state | UNKNOWN |

The page was not the login URL. A later navigation of this same tab left it on the login page. That change is recorded below. Login was not submitted afterward.

## Page that was already open

Passive inspect, `observation_ms` 0. Evidence `ev_6f79d0c2f8a75aed3f4ea8ed2388bc57e5b24f167652f1d69b3c47baa31b30f4`. Confidence `observed`. Window `2026-11-15T09:34:34.534Z` to `2026-11-15T09:34:35.106Z`.

| Fact | Class |
|---|---|
| Headings `Attendance Configuration` and `Attendance` | OBSERVED |
| Sidebar links Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz | OBSERVED |
| Top text `Timesheets`, `Attendance`, `Reports`, `Project Info` | OBSERVED |
| Search textbox and Upgrade control | OBSERVED |
| Three checked checkboxes whose labels concern changing punch time, editing own attendance, and supervisor attendance changes | OBSERVED |
| Button `Save` | OBSERVED. Not clicked. |
| An account label is present in the header | OBSERVED. The value is not copied here. |
| Network requests in the attach window | 0. Prior activity was unavailable. |

This is a Time attendance configuration screen. It is not the employee details screen.

## Employee List and employee details

A connected scenario opened the previously recorded Employee List URL in the same tab. Parent evidence `ev_d9db40bc163d0a9f3060e23a6aa28ae6f31e715b290d26c75cb043530a4f8e01`. Summary view `ev_037c4e78e26c05a57ac85c4c49adadaa992e8f79f543290df6267c91f8078f7d`. Transaction view `ev_a1796eb79973ff06dc56f813a188965044816fb9b038fef211b84bba3be0d9af`.

| Step | Before | After | Class |
|---|---|---|---|
| `goto_start` | `.../attendance/configure` | `.../auth/login` | OBSERVED |
| Wait | login URL | login URL | OBSERVED |

The Employee List did not render. No employee row was opened. No detail tabs, fields, or edit controls were seen. Employee details stay **NOT VERIFIED**.

The final accessibility snapshot is the login page: heading `Login`, button `Login`, and the forgot-password prompt. The published credential hint was visible. Its text is not copied into this file. The Login button was not clicked.

## Login and logout

| Item | Status | Why |
|---|---|---|
| Existing authenticated state, before navigation | OBSERVED | Sidebar and a module URL were visible. The account label value is not recorded. |
| Login submission | NOT VERIFIED | The form was not submitted. |
| Failed login message | NOT VERIFIED | No invalid credentials were sent. |
| Logout control and result | NOT VERIFIED | No logout control was used. |

The tab is now the login page because the Employee List request was redirected. That is not an observed logout action. Reauthentication was not attempted.

## Network observations

Bodies, cookies, and header values were not retained. Header names were retained. Fourteen transactions were on `https://opensource-demo.orangehrmlive.com`. The workflow-relevant ones are:

| Method | Path | Status | Resource | Workflow | Evidence |
|---|---|---|---|---|---|
| GET | `/web/index.php/pim/viewEmployeeList` | 302 | document | Attempt to open Employee List from the open tab | `ev_a1796eb79973ff06dc56f813a188965044816fb9b038fef211b84bba3be0d9af`, request started `2026-11-15T09:39:10.072Z` |
| GET | `/web/index.php/auth/login` | 200 | document | Follow of that redirect | same view |
| GET | `/web/index.php/core/i18n/messages` | 304 | xhr | Login page after the redirect | same view |

The other transactions are stylesheets, scripts, images, and fonts for that login page. No employee search, save, or details request was observed. The 302 does not identify whether the scenario client sent the already-open page's session cookie. REA records that an attached scenario cannot recover pre-attach events and does not prove the caller's full browser state was preserved.

## Employee List interactions

Not performed. The list page was not reached. Employee Name, Employee Id, Job Title, Sub Unit, Supervisor, column sorting, and records-per-page stay **NOT VERIFIED** for this pass. Earlier Freelance search, Reset, and page-2 notes are unchanged.

## Privacy

Original JSON files were not modified. Values were not printed. Each listed original has a non-empty account-label string. Each proposed copy under `docs/proposed-redactions/` sets that field to null, records that a label was present, and records that the value was not saved.

| Original | Proposed copy | Recommendation |
|---|---|---|
| `evidence/add-employee.redacted.json` | `docs/proposed-redactions/add-employee.redacted.json` | Keep the original unchanged. Use the proposal only after a person reviews a shared package. |
| `evidence/assign-leave.redacted.json` | matching file in `docs/proposed-redactions/` | Same |
| `evidence/employee-list.redacted.json` | matching file | Same |
| `evidence/employee-list-2026-11-12.redacted.json` | matching file | Same |
| `evidence/leave-apply.redacted.json` | matching file | Same |
| `evidence/leave-list.redacted.json` | matching file | Same |
| `evidence/my-leave.redacted.json` | matching file | Same |
| `evidence/pim-reports.redacted.json` | matching file | Same |
| `evidence/time-landing.redacted.json` | matching file | Same |
| `evidence/pim-interaction-investigation/reports-page-2026-11-13.json` | `docs/proposed-redactions/pim-interaction-investigation/reports-page-2026-11-13.json` | Same. The proposal nulls `account_label` and still has `account_location`. |

The label is not required to keep the screen structure. The proposed copies already separate presence from the value.

## PostgreSQL

No database connection was opened in this pass.

| Question | Result | Basis |
|---|---|---|
| Configured | Yes, as an override | `backend/app/database.py` uses `DATABASE_URL` when set. The default is SQLite `backend/harbor.db`. |
| Connection verified this pass | No | No query was run. |
| Test database verified this pass | No | `backend/tests/test_postgres_integration.py` targets `harbor_test`. It was not executed. |
| Playwright database | SQLite | `playwright.config.ts` uses `backend/harbor-e2e.db`. Not executed. |
| Docker Compose environment | Not verified | Docker was already known to be unavailable. Compose was not started. |
| Documentation conflict | Still present | `docs/assumptions.md` still says employees are kept in memory and PostgreSQL is not connected. That sentence was not edited, because this pass did not re-verify a live connection. |

## What remains blocked

An authenticated Employee List is required before employee details, filter searches, sorting, or employee API calls can be inspected. This pass must not type the published password. A person needs to sign in on the existing browser, leave the Employee List open, and ask for another read-only pass. Row-action glyphs should still not be clicked unless a person confirms one is only a view.

## Files

Created: `docs/REA_REMAINING_INSPECTION_RESULTS.md`.

Not modified: Harbor HR source, original evidence JSON, databases, and the historical handoff documents.
