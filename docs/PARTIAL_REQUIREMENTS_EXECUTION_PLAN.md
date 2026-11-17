# Partial requirements execution plan

Date: 2026-11-15. Project: `orangehrm-rea-poc`.

This plan reads `docs/FINAL_REQUIREMENT_TRACEABILITY.md`, `docs/FINAL_PROJECT_STATUS.md`, and `docs/FINAL_HANDOFF_AUDIT.md`. It does not change a requirement status, application source, a database, or an existing evidence file.

The 18 Partial IDs are REQ-006, REQ-008, REQ-009, REQ-014, REQ-020, REQ-025, REQ-028, REQ-031, REQ-032, REQ-034, REQ-037, REQ-038, REQ-039, REQ-041, REQ-042, REQ-043, REQ-051, and REQ-057.

Two status sentences are stale and are not current blockers. `docs/FINAL_PROJECT_STATUS.md` still says REA doctor was not run and that `compare_web_captures` was not called. Doctor evidence is `docs/evidence/REQ-056-rea-doctor.md`, and the Leave List comparison is `docs/evidence/REQ-055-compare-web-captures.md`. REQ-003 and REQ-055 stay Not Verified for the reasons in their later evidence notes. This plan does not reopen those investigations.

## Priority order

| Order | ID | Class | Why this order |
|---|---|---|---|
| 1 | REQ-009 | Quick win | A new redacted API register can be written from the existing employees capture. No demo call and no database. |
| 2 | REQ-043 | Quick win | The same new register records the method, path, and status that were already observed. Unobserved filters stay unrecorded. |
| 3 | REQ-032 | Quick win | Doctor is already evidenced. The remaining check is a PostgreSQL version read that must not open `harbor` or `harbor_test`. |
| 4 | REQ-057 | Independent | Review the privacy audit and proposed copies. Do not edit original JSON. |
| 5 | REQ-008 | Independent | Same privacy pass. Screenshots that were not kept stay absent. |
| 6 | REQ-034 | Independent | `.gitignore` already ignores raw JSON, databases, and PNGs. Redacted JSON that still holds account labels needs a review before any commit. |
| 7 | REQ-006 | Independent documentation | Confirm the workflow file still marks unobserved login and filters unknown. That does not close the live-observation gap. |
| 8 | REQ-031 | Independent documentation | Confirm proposed edit, delete, sort, and page size stay tagged. Do not present local tests as OrangeHRM proof. |
| 9 | REQ-028 | Dependency-blocked | Local flows exist. Closure waits on the unobserved live rules that REQ-014, REQ-020, REQ-025, and REQ-037 still lack. |
| 10 | REQ-014 | Permission-blocked | Live login success, failure, and logout were not observed. Automated capture waits on REQ-003. |
| 11 | REQ-041 | Permission-blocked | Same login outcomes. Local PBKDF2 stays a Harbor HR choice. |
| 12 | REQ-020 | Permission-blocked | Name, id, job, subunit, and Include were not submitted. |
| 13 | REQ-038 | Permission-blocked | Employment Status, empty result, and Reset exist. The other filters do not. |
| 14 | REQ-037 | Permission-blocked | Header clicks did not change `sortField` or `sortOrder`. Records-per-page was not observed. |
| 15 | REQ-042 | Permission-blocked | Same PIM interaction gap, plus row-action glyphs that must not be clicked. |
| 16 | REQ-039 | Permission-blocked | My Info sections that were opened stay the evidence. List-row details and six profile sections were not opened. |
| 17 | REQ-025 | Application evidence, not a new feature | Local edit and delete exist. Do not add fields for sections that were not opened, and do not save or delete on the demo. |
| 18 | REQ-051 | External tool blocked | `docker-compose.yml` exists. Docker is not installed and must not be installed for this project. Compose must not be started against port 5432. |

First requirement to execute: **REQ-009**.

## Classes

### Quick wins

REQ-009, REQ-043, and REQ-032. Each can be done with files that already exist, or with a read-only version check. None needs a new OrangeHRM capture.

### Independent tasks

REQ-057, REQ-008, REQ-034, REQ-006, and REQ-031. They can proceed without waiting for one another. REQ-006 and REQ-031 can be checked in documentation, but their live-observation gaps stay open.

### Dependency-blocked tasks

REQ-028 depends on the live gaps in REQ-014, REQ-020, REQ-025, and REQ-037. Closing it by deleting the proposed tags would hide unknowns.

### Application implementation tasks

No Partial requirement currently justifies an application source change.

REQ-025 already has local `PATCH` and `DELETE`, and the detail page labels the opened My Info sections. Unopened sections must stay without invented values. REQ-037 already has a local sort control, and that control stays proposed until a live sort is observed.

### External access or permission blocked

REQ-014, REQ-041, REQ-020, REQ-038, REQ-037, REQ-042, REQ-039, and REQ-051.

REQ-003 is Not Verified, so automated capture of the hosted demo is not permitted. Login, logout, and additional filter submits are form actions. Row-action glyphs stay unclicked. REQ-051 needs Docker, which the recorded note says is not installed.

## Requirement detail

### REQ-009

Acceptance: Keep an API observation register with no credentials, tokens, or cookies.

Done: `evidence/api-observations.md` is the older register. `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` records `GET /web/index.php/api/v2/pim/employees` with status 200. Personal response values were not copied.

Remaining: The older register does not contain that later exchange, and it must not be edited.

Evidence: the two files above. Missing: one new register that copies only method, path, and status.

Dependencies: none. Complexity: low. REA: not required. Safe to complete by writing a new register.

### REQ-043

Acceptance: Record network method, path, and status when observed.

Done: the later list reload recorded employees, employment statuses, job titles, and subunits at status 200. Page 2 used `offset=50`. Page 3 used `offset=100`. The Freelance search added `empStatusId=1` and `meta.total` 0. A later reload returned 302 to login.

Remaining: those facts are not in the older register. Name, id, job, subunit, and supervisor searches were not submitted, so their parameters stay unrecorded.

Evidence: the REQ-009 sources. Missing: the same new register. Do not invent filter parameters.

Dependencies: REQ-009's new register. Complexity: low. REA: the captures already exist. Safe for the observed exchanges only.

### REQ-032

Acceptance: Check Node, REA, Chrome, Python, and PostgreSQL prerequisites.

Done: Node v24.22.1, npm 11.19.1, and Python 3.12.10. Chrome 157 was observed in the earlier CDP session. REA doctor exited 0 in `docs/evidence/REQ-056-rea-doctor.md`. The tracker sentence "REA doctor was not run" is stale.

Remaining: the PostgreSQL version was not read. This audit did not recheck Chrome.

Evidence: the doctor note and the traceability row. Missing: a version string read without opening `harbor` or `harbor_test`.

Dependencies: none on the demo. Complexity: low. REA: doctor is already done; do not run it again. Safe if the version comes from the installed binary or the cluster version file, not from a database session.

### REQ-057

Acceptance: Exclude secrets, cookies, tokens, and personal account data from shared artifacts.

Done: dashboard JSON `evidence/navigation.redacted.json` stores no account label. Tests use the synthetic local account. `docs/FINAL_PRIVACY_AUDIT.md` lists the remaining files.

Remaining: other original evidence JSON still stores account display labels.

Evidence: the privacy audit and the dashboard JSON. Missing: a reviewed share set. Proposed copies live under `docs/proposed-redactions/` and have not been accepted.

Dependencies: none. Complexity: medium, because each file must be checked without copying labels into a new note. REA: not required. Safe as a review. Do not edit originals.

### REQ-008

Acceptance: Keep redacted browser evidence and screenshots where available.

Done: login, dashboard, list, add, and reports JSON parse. The dashboard account label is null.

Remaining: other JSON files still store account display labels. Some PNGs were not kept.

Evidence: the JSON files named in the traceability row. Missing: accepted redacted copies, and screenshots that were never retained. Absence of a PNG is a fact, not a file to invent.

Dependencies: REQ-057's review. Complexity: medium. REA: existing evidence only. Safe if originals stay unchanged.

### REQ-034

Acceptance: Ignore unsanitized evidence, profiles, and secrets.

Done: `.gitignore` ignores `evidence/*.raw.json`, database files, and screenshot PNGs.

Remaining: redacted JSON is not ignored, and some of those files still contain account labels. No commit was made from this work.

Evidence: `.gitignore` and the privacy audit. Missing: a decision, recorded without changing the ignore file until a later task asks for it, on whether labeled JSON may be shared.

Dependencies: REQ-008 and REQ-057. Complexity: low. REA: not required. Safe as a review. A `.gitignore` edit is a later change, not part of this plan.

### REQ-006

Acceptance: Produce workflow specifications and UI observations.

Done: `docs/workflow-specifications.md` separates local flows from unobserved live flows.

Remaining: live login success, logout, and several filters were not observed. The tracker next action is to keep those items marked unknown.

Evidence: the workflow file. Missing: live outcomes. Do not fill them from Harbor HR.

Dependencies: REQ-014 and REQ-020 for any future observation. Complexity: low for a tag check, high for closure. REA can inspect an already open page. It cannot complete this row while login and the remaining filters are unobserved. Automated capture stays blocked by REQ-003.

### REQ-031

Acceptance: Every parity claim has evidence or an assumption tag.

Done: the requirements and traceability files use those tags. Proposed edit, delete, sort, and page size are labeled. Tests exist for proposed behavior.

Remaining: some docs and original JSON still quote account display labels. Proposed tests must not be described as live OrangeHRM proof.

Evidence: the traceability matrix. Missing: a pass over the docs that still quote labels, using the privacy audit as the source list.

Dependencies: REQ-057 for the label list. Complexity: medium. REA: not required. Safe as a documentation check.

### REQ-028

Acceptance: Definition of done: local login, navigation, list, search, and add/edit behave as documented.

Done: those local flows exist. `docs/assumptions.md` keeps the live gaps.

Remaining: documented behavior includes unknowns that the local app fills with proposed rules.

Evidence: `docs/assumptions.md` and the local pages named in the handoff audit. Missing: live evidence for the proposed rules.

Dependencies: REQ-014, REQ-020, REQ-025, and REQ-037. Complexity: high. REA: no source change is justified. This row stays Partial until those observations exist or the proposed tags remain the accepted limit.

### REQ-014

Acceptance: Observe normal login and logout on the demo.

Done: login page evidence `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Login was not submitted. Local TC-01 and TC-10 cover Harbor HR only.

Remaining: live success, failure, and logout.

Evidence: that login inspection. Missing: a submitted login and a logout, neither of which was performed.

Dependencies: REQ-003 before any automated capture. Credentials must not be stored. Complexity: high. REA: the login page was not an open CDP target in the last check. Do not navigate an authenticated tab to login for this plan.

### REQ-041

Acceptance: WF-01 Login with evidence IDs, outcomes, and no cryptographic claims about OrangeHRM.

Done: the workflow file exists. `backend/app/security.py` uses PBKDF2-SHA256 as a Harbor HR choice. Local tests exist.

Remaining: demo success and failure outcomes are unknown.

Evidence: the workflow file and `security.py`. Missing: the same live outcomes as REQ-014.

Dependencies: REQ-014. Complexity: medium once REQ-014 exists. REA: documentation can keep the cryptographic claim out. It cannot invent the demo outcome.

### REQ-020

Acceptance: Observe employee search with non-sensitive examples.

Done: a later Freelance employment-status search, an empty result, and Reset.

Remaining: name, id, job, subunit, and Include were not submitted. Local name search stays proposed.

Evidence: the 2026-11-14 interaction note cited by REQ-042. Missing: those five filters.

Dependencies: REQ-003 for automated capture. A future manual pass must not save employee cells. Complexity: medium. REA can inspect the current list page. Submitting new searches is a new observation, not a completed one.

### REQ-038

Acceptance: SCR-04 search, empty results, and reset.

Done: Freelance search, empty state, and Reset. Local search exists. Historical TC-04 through TC-06 cover Harbor HR.

Remaining: not every filter was submitted.

Evidence: the same interaction note. Missing: the filters named under REQ-020.

Dependencies: REQ-020. Complexity: low after that observation. REA: same limit as REQ-020.

### REQ-037

Acceptance: SCR-03 employee list columns, sorting, pagination, buttons.

Done: the list inspect. Later clicks set `offset` to 50 and 100. Header clicks did not change `sortField` or `sortOrder`. Local list, sort, and pagination exist.

Remaining: a live header sort that changes the query was not observed. Records-per-page was not observed. Local sort stays proposed.

Evidence: the interaction note. Missing: a sort request and a page-size control. The handoff audit says no records-per-page control was present in the inspected accessibility trees.

Dependencies: a new permitted observation. Repeating the same header click is not a new result. Complexity: medium. REA: inspect only. Do not treat the local sort control as the live control.

### REQ-042

Acceptance: Record PIM columns, filters, pagination, empty text, and reset.

Done: list evidence plus the 2026-11-14 interaction note. Local equivalents exist.

Remaining: sort, page size, and row-action glyphs were not activated on the demo.

Evidence: the list JSON and the interaction note. Missing: those three activations. Glyphs stay unclicked because their action was not identified.

Dependencies: REQ-037 for sort and page size. Glyphs have no safe completion path until the action is known from evidence. Complexity: medium for the record, and blocked for the glyphs. REA: do not click unidentified glyphs.

### REQ-039

Acceptance: SCR-05 employee details.

Done: signed-in My Info `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`, Contact Details `ev_a9f44f85…570f2911`, Emergency Contacts `ev_feaa0c9d…352381b8`, and Job `ev_4dde5dd8…8e899cd4`. `EmployeeDetailPage.tsx` uses the opened labels and does not invent unstored values. Isolated TC-07/TC-08 passed and does not prove the live list-row screen.

Remaining: a selected Employee List row was not opened. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened.

Evidence: the four IDs above. Missing: list-row details and those six sections. Contact values from the opened Contact Details page must not be copied.

Dependencies: an authenticated read-only pass that does not save. REQ-003 blocks automated capture. Complexity: high. REA can inspect an already open profile section. Opening the remaining sections is future work, not a completed observation.

### REQ-025

Acceptance: Rebuild edit and delete locally.

Done: the same My Info sections as REQ-039 were opened. Save was not clicked. The detail page stores name, id, job, status, and sub unit. Other labels say they are not stored. Local `PATCH` and `DELETE` exist. Isolated TC-07/TC-08 passed. The separate proposed-delete test was outside that grep.

Remaining: live edit and delete were not observed. Unopened profile sections have no local data.

Evidence: the My Info IDs and `EmployeeDetailPage.tsx`. Missing: a live edit screen from a list row, and a live delete. Both stay prohibited on the shared demo.

Dependencies: REQ-039 for any further read-only section. Complexity: the local rebuild is already present, so implementation complexity is none. Proving live edit or delete is not allowed. REA: do not click Save or a delete glyph.

### REQ-051

Acceptance: Docker Compose for local startup.

Done: `docker-compose.yml` exists. An earlier pass started PostgreSQL with `pgserver`. The running API uses that local server. Compose was not started.

Remaining: the recorded note says Docker is not installed. Compose was not run.

Evidence: the compose file and the handoff note. Missing: a Docker run. Installing Docker is outside this project, and starting Compose against port 5432 could disturb the running cluster.

Dependencies: an explicit decision to install Docker. Complexity: high and unsafe under the current constraint. REA: not applicable. Leave this Partial.

## Blockers that apply to more than one row

| Blocker | Rows |
|---|---|
| REQ-003 has no hosted-demo usage terms, so automated capture stays off | REQ-014, REQ-020, REQ-037, REQ-038, REQ-039, REQ-041, REQ-042 |
| Do not save, edit, or delete a demo employee, and do not click an unidentified row glyph | REQ-025, REQ-039, REQ-042 |
| Do not open `harbor` or `harbor_test`, and do not restart the API on port 8000 or the frontend on port 5173 | REQ-032 and every test idea |
| Do not edit original evidence JSON or copy account labels, contact values, or the published login hint | REQ-008, REQ-009, REQ-031, REQ-034, REQ-043, REQ-057 |
| Docker is not installed and must not be installed to close a row | REQ-051 |

## What this plan does not do

It does not mark any row Pass. It does not repeat the REQ-003 terms search or the REQ-055 normalization investigation. It does not recommend new Harbor HR fields, a default Playwright run, or a PostgreSQL integration rerun.
