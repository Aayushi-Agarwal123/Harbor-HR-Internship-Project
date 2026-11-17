# Remaining Partial requirements priority audit

Date: 2026-11-15.

This audit does not change a status, a total, source, configuration, a database, or an existing evidence file. No browser capture was run. No process was restarted.

Current matrix: 36 pass, 15 partial, 2 not verified, 4 out of scope. The Partial IDs are REQ-006, REQ-008, REQ-014, REQ-020, REQ-025, REQ-028, REQ-031, REQ-034, REQ-037, REQ-038, REQ-039, REQ-041, REQ-042, REQ-051, and REQ-057.

REQ-003 and REQ-055 stay Not Verified. Automated demo capture stays unauthorized. `docs/FINAL_PROJECT_STATUS.md` still says no terms check was recorded and that `compare_web_captures` was not called. Those two sentences are stale. The later evidence notes record the checks and the passive comparison. This audit does not edit that file.

## Priority

| Rank | ID | Why |
|---|---|---|
| 1 | REQ-038 | Search, an empty result, and Reset are already recorded. No new capture is required to judge that sentence. |
| 2 | REQ-042 | The same list evidence records columns, one filter, pagination, empty text, and Reset. Glyphs and page size stay unactivated. |
| 3 | REQ-037 | Columns, buttons, and offsets 50 and 100 are recorded. Header clicks did not change the sort query. A page-size control was not in the inspected trees. |
| 4 | REQ-031 | Parity tags exist. The remaining work is a read of docs that still quote account labels. |
| 5 | REQ-057 | Dashboard JSON is redacted. Proposed copies exist and have not been accepted. |
| 6 | REQ-008 | Redacted JSON for the main screens exists. Other JSON files and missing PNGs remain. |
| 7 | REQ-034 | `.gitignore` already ignores raw JSON, databases, and PNGs. Closing it would change ignore rules. |
| 8 | REQ-006 | The workflow file exists. Live login and several filters are still unknown. |
| 9 | REQ-028 | Local flows exist. Closure waits on the live unknowns. |
| 10 | REQ-025 | Local edit and delete exist. Live edit and delete were not observed and must not be performed on the demo. |
| 11 | REQ-020 | Only the Employment Status search was submitted. |
| 12 | REQ-039 | Four My Info sections were opened. Six sections and a list-row page were not. |
| 13 | REQ-014 | The login page was inspected. Login and logout were not submitted. |
| 14 | REQ-041 | Demo success and failure are the same missing login outcomes. |
| 15 | REQ-051 | Compose exists. Docker is not installed and must not be installed to close this row. |

## Each requirement

### REQ-038

Acceptance: SCR-04 search, empty results, and reset. The guide row also says filter fields, valid and empty results, and reset.

Status: Partial.

Verified: Freelance employment-status search, `No Records Found`, `meta.total` 0, and Reset removing `empStatusId`. Recorded in `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` and `docs/evidence/REQ-043-api-method-path-status.md`.

Incomplete: A non-empty valid search result was not observed. Name, id, job, subunit, and Include were not submitted.

Evidence: those two files. New capture: not required to judge the existing empty search and Reset. Further filters would be a new observation and depend on REQ-003. Not dependent on REQ-055. Safe without a restart or a database change.

Next action: Map the existing Freelance search, empty text, and Reset onto the sentence. Do not mark Pass while the guide's valid-result clause is unread. Complexity: Low.

### REQ-042

Acceptance: Record PIM columns, filters, pagination, empty text, and reset.

Status: Partial.

Verified: List columns, the Freelance filter, offsets 50 and 100, empty text, and Reset.

Incomplete: Sort, page size, and row-action glyphs were not activated. Glyphs must not be clicked without an identified action.

Evidence: the list interaction note cited by the traceability row. New capture: only if someone later activates sort or page size. That would depend on REQ-003. Not on REQ-055. Safe to write from existing notes.

Next action: Record the observed columns, filter, pages, empty text, and Reset, and leave glyphs proposed. Complexity: Low.

### REQ-037

Acceptance: SCR-03 columns, sorting, pagination, and buttons.

Status: Partial.

Verified: Columns and buttons in the list inspect. Page buttons set `offset` to 50 and 100. Two header clicks did not change `sortField` or `sortOrder`.

Incomplete: A live sort that changes the query was not observed. No records-per-page control was in the inspected trees. Local sort stays proposed.

Evidence: section 13 of the employee-details note. New capture: not required to preserve that negative result. Another attempt would depend on REQ-003. Not on REQ-055. Safe.

Next action: Keep the negative header-click result distinct from the local sort control. Complexity: Medium.

### REQ-031

Acceptance: Every parity claim has evidence or an assumption tag.

Status: Partial.

Verified: Traceability and requirements use those tags. Edit, delete, sort, and page size are labeled proposed.

Incomplete: Some docs and original JSON still quote account display labels.

Evidence: the matrix and `docs/FINAL_PRIVACY_AUDIT.md`. New capture: no. REQ-003 and REQ-055: no. Safe as a read. Do not edit original JSON.

Next action: List the docs that still quote labels, using the privacy audit, and do not present local tests as OrangeHRM proof. Complexity: Medium.

### REQ-057

Acceptance: Exclude secrets, cookies, tokens, and personal account data from shared artifacts.

Status: Partial.

Verified: `evidence/navigation.redacted.json` has a null account label. Tests use the synthetic local account.

Incomplete: Other original evidence JSON still stores account labels.

Evidence: `docs/FINAL_PRIVACY_AUDIT.md` and `docs/proposed-redactions/`. New capture: no. REQ-003 and REQ-055: no. Safe. Do not edit originals.

Next action: Review the proposed copies before any share. Complexity: Medium.

### REQ-008

Acceptance: Keep redacted browser evidence and screenshots where available.

Status: Partial.

Verified: Login, dashboard, list, add, and reports JSON parse. The dashboard account label is null.

Incomplete: Other JSON files still store labels. Some PNGs were not kept. Missing screenshots cannot be invented.

Evidence: the JSON named in the row and `docs/proposed-redactions/`. New capture: no. REQ-003 and REQ-055: no. Safe.

Next action: Use the proposed copies only if they are accepted. Complexity: Medium.

### REQ-034

Acceptance: Ignore unsanitized evidence, profiles, and secrets.

Status: Partial.

Verified: `.gitignore` ignores `evidence/*.raw.json`, database files, and screenshot PNGs.

Incomplete: Redacted JSON is not ignored, and some of those files still contain account labels.

Evidence: `.gitignore` and the privacy audit. New capture: no. REQ-003 and REQ-055: no. A later ignore-rule edit is a configuration change, so it is not part of a read-only close.

Next action: Review before any commit. Do not commit from this audit. Complexity: Low to inspect, and not closable without an ignore change.

### REQ-006

Acceptance: Produce workflow specifications and UI observations.

Status: Partial.

Verified: `docs/workflow-specifications.md` separates local flows from unobserved live flows.

Incomplete: Live login success, logout, and several filters were not observed.

Evidence: that workflow file. New capture: required to close the live gap, and automated capture depends on REQ-003. Not on REQ-055. The safe action is to keep the unknowns marked.

Next action: Keep those items unknown. Complexity: Low to confirm the tags, High to close.

### REQ-028

Acceptance: Local login, navigation, list, search, and add/edit behave as documented.

Status: Partial.

Verified: Those local flows exist. `docs/assumptions.md` keeps the live gaps.

Incomplete: The local app fills some unobserved rules with proposed behavior.

Evidence: `docs/assumptions.md`. New capture: required before the proposed tags can be removed. Depends on REQ-014, REQ-020, REQ-025, and REQ-037, and automated capture depends on REQ-003. Not on REQ-055. Safe to leave the tags.

Next action: Keep proposed tags on unobserved rules. Complexity: High.

### REQ-025

Acceptance: Rebuild edit and delete locally.

Status: Partial.

Verified: Opened My Info sections. Local `PATCH` and `DELETE`. Isolated TC-07/TC-08 passed. Save was not clicked on the demo.

Incomplete: Live edit and delete were not observed. The separate proposed-delete test was outside the isolated grep. Unopened sections have no local data.

Evidence: the My Info evidence IDs in the traceability row and `EmployeeDetailPage.tsx`. New capture: a live edit or delete must not be performed. Reading more sections would be a new observation and depends on REQ-003. Not on REQ-055. Safe to leave the local form as a proposed reconstruction.

Next action: Do not treat the local form as a copy of an unopened live screen. Complexity: Medium.

### REQ-020

Acceptance: Observe employee search with non-sensitive examples.

Status: Partial.

Verified: Freelance status search, empty result, and Reset.

Incomplete: Name, id, job, subunit, and Include were not submitted.

Evidence: the employee-details note. New capture: yes, for the remaining filters. Automated capture depends on REQ-003. Not on REQ-055. Not safe to submit new searches in this audit.

Next action: Keep local name search tagged proposed. Complexity: Medium.

### REQ-039

Acceptance: SCR-05 employee details.

Status: Partial.

Verified: Signed-in Personal Details, Contact Details, Emergency Contacts, and Job.

Incomplete: A selected list row was not opened. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened.

Evidence: the four evidence IDs in the traceability row. New capture: yes. Depends on REQ-003 for automated capture. Not on REQ-055. Do not copy contact values.

Next action: Do not mark a selected-row details page as observed. Complexity: High.

### REQ-014

Acceptance: Observe normal login and logout on the demo.

Status: Partial.

Verified: Login page `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Login was not submitted. Local TC-01 and TC-10 cover Harbor HR only.

Incomplete: Live success, failure, and logout.

Evidence: that login inspection. New capture: yes. Depends on REQ-003. Not on REQ-055. Do not store credentials.

Next action: Do not claim demo login parity. Complexity: High.

### REQ-041

Acceptance: WF-01 Login with evidence IDs, outcomes, and no cryptographic claims about OrangeHRM.

Status: Partial.

Verified: The workflow file exists. `backend/app/security.py` uses PBKDF2-SHA256 as a Harbor HR choice.

Incomplete: Demo success and failure are unknown.

Evidence: the workflow file and `security.py`. New capture: the same login observation as REQ-014. Depends on REQ-014 and REQ-003. Not on REQ-055.

Next action: Do not describe PBKDF2 as OrangeHRM's scheme. Complexity: High.

### REQ-051

Acceptance: Docker Compose for local startup.

Status: Partial.

Verified: `docker-compose.yml` exists. PostgreSQL was started with `pgserver`. The running postmaster is the process recorded for REQ-032.

Incomplete: Docker is not installed. Compose was not run.

Evidence: the compose file and the handoff note. New capture: no. REQ-003 and REQ-055: no. Closing it requires installing Docker or starting Compose, which this project does not allow. Port 5432 is already in use.

Next action: Leave this Partial. Complexity: High, and blocked.

## Selection

Best next requirement: **REQ-038**.

Reason: Its traceability sentence is search, empty results, and reset, and those three observations already exist. It does not need a new demo capture, a service restart, or a database change, and it does not depend on REQ-055. The guide also asks for a valid non-empty result, which was not observed, so this audit does not mark it Pass.

Acceptance criteria: SCR-04 search, empty results, and reset.

Exact next action: Map the recorded Freelance search, `No Records Found`, and Reset onto that sentence, and leave the unsubmitted filters and the missing non-empty result unfilled.
