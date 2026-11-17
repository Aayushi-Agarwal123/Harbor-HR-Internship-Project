# Requirement-by-requirement audit

Date: 2026-11-16. Statuses are copied from `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. They were not changed for this audit. The register has 57 rows: 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, 3 OUT OF SCOPE.

Why each item exists: the guide asks for a permitted black-box study, a screen and workflow record, a local HRMS, PostgreSQL persistence, Playwright coverage, and an honest trace from observation to code. Optional items stay out of scope. A row is PASS only when the register says the files support it. PARTIAL means a named gap remains. NOT VERIFIED means the required evidence was not produced. OUT OF SCOPE means the guide marks the item optional or excluded.

## REQ-003 and REQ-055

REQ-003 asks to confirm the demo site terms before automated capture. The open-source vulnerability policy prohibits security testing, scanning, and probing of `opensource-demo.orangehrmlive.com`. No document permits automated browser capture. The login page had no terms link. Silence is not permission. Status: PARTIAL. New captures stay unauthorized. Detail: `docs/evidence/REQ-003-REQ-055-closeout-2026-11-16.md`.

REQ-055 asks to compare two captures with `compare_web_captures` after normalizing volatile fields. The passive comparison `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c` returned `changed` and rejected a normalization key. No evidence file contains a `step_id`. There is no second sanitized scenario with the same steps. Status: NOT VERIFIED. A new capture was not created because REQ-003 does not permit one.

## All 57 requirements

The work column in the register names the evidence file or source file. Verification is the test or inspection named in that register. This table keeps the requirement, the status, and the remaining limitation.

| ID | Requirement | Status | Remaining limitation |
|---|---|---|---|
| REQ-001 | Reconstruct observable behavior. Do not copy OrangeHRM source. | PASS | None for this prohibition. |
| REQ-002 | Use permitted demo access only. Do not brute-force, scrape in bulk, or make destructive demo changes. | PASS | Site-terms confirmation is REQ-003. |
| REQ-003 | Confirm the demo site's terms before automated capture. | PARTIAL | Explicit capture permission is absent. The vulnerability policy does not decide ordinary UI capture, and silence is not permission. |
| REQ-004 | Produce a screen inventory. | PASS | The older inventory file was not rewritten after My Info and the twelve landings. |
| REQ-005 | Produce a navigation map. | PASS | Several live subpages remain unopened. The sidebar map itself exists. |
| REQ-006 | Produce workflow specifications and UI observations. | PARTIAL | Live login success, logout, and several filters were not observed. |
| REQ-007 | Produce test cases. | PASS | The default nine-test command remains historical. |
| REQ-008 | Keep redacted browser evidence and screenshots where available. | PARTIAL | Other JSON files still store account display labels. Some PNGs were not kept. |
| REQ-009 | Keep an API observation register with no credentials, tokens, or cookies. | PASS | None for this register. Unsubmitted filter parameters stay unknown and are not invented. |
| REQ-010 | Link each implemented function to evidence or an assumption. | PASS | R-14 edit is explicitly proposed. |
| REQ-011 | Build a small self-owned HRMS. | PASS | Attendance screens are read-only. Project Info was not opened. Admin administration is out of scope. Several module controls stay inactive. |
| REQ-012 | Provide a Playwright regression suite. | PASS | Not re-executed in this audit. The suite does not use PostgreSQL. |
| REQ-013 | List unknowns and design assumptions. | PASS | The old in-memory sentence is marked historical. Live unknowns remain in that file. |
| REQ-014 | Observe normal login and logout on the demo. | PARTIAL | Live success, failure, and logout were not seen. |
| REQ-015 | Rebuild login and logout locally. | PASS | Local behavior is proposed relative to the demo. |
| REQ-016 | Observe dashboard and navigation. | PASS | Account identity is excluded from the retained dashboard JSON. |
| REQ-017 | Rebuild a minimal dashboard and sidebar. | PASS | Search, Upgrade, punch times, and location values remain unsupported. |
| REQ-018 | Observe the PIM employee list. | PASS | Cell values were not saved. |
| REQ-019 | Rebuild the employee list. | PASS | Column-header assertions are not one-by-one in Playwright. |
| REQ-020 | Observe employee search with non-sensitive examples. | PARTIAL | Name, id, job, subunit, and Include were not submitted on the demo. |
| REQ-021 | Rebuild search, filter, and reset. | PASS | Matching rules are a local design. |
| REQ-022 | Observe Add Employee and do not save it on the demo. | PASS | Screenshot PNG was not copied for this screen. |
| REQ-023 | Rebuild add employee with synthetic data. | PASS | Create Login Details and file upload stay disabled. |
| REQ-024 | Do not edit or delete records on the shared demo. | PASS | This is a prohibition, not a live observation. |
| REQ-025 | Rebuild edit and delete locally. | PARTIAL | Live edit and delete were not observed. Unopened profile sections have no local data. |
| REQ-026 | Leave management is optional read-only observation and optional phase 2. | PARTIAL | The guide does not require Leave for the original definition of done. Assign, Entitlements, Reports, and Configure actions were not recorded. |
| REQ-027 | Admin settings are out of scope. | OUT OF SCOPE | Settings and the add-user form were not inspected. |
| REQ-028 | Definition of done: local login, navigation, list, search, and add/edit behave as documented. | PARTIAL | Documented behavior includes unknowns that the local app fills with proposed rules. |
| REQ-029 | Changes persist in local PostgreSQL. | PASS | Persistence was shown on `harbor_test`, not by a new query of `harbor`. The prior `harbor` count of 55 is historical. |
| REQ-030 | Playwright covers normal and validation cases. | PASS | The nine-test command remains historical. Neither Playwright run used PostgreSQL. |
| REQ-031 | Every parity claim has evidence or an assumption tag. | PASS | None for the tagging requirement. Account labels in original JSON remain REQ-057. |
| REQ-032 | Check Node, REA, Chrome, Python, and PostgreSQL prerequisites. | PASS | None. Chrome was not queried again. The 16.2 string is the server startup line, not a client version. |
| REQ-033 | Use the suggested project folders. | PASS | None. |
| REQ-034 | Ignore unsanitized evidence, profiles, and secrets. | PASS | No browser-profile directory is present. |
| REQ-035 | SCR-01 login: inputs, labels, errors, redirect. | PASS | The screen was observed. Success and error paths were not part of that observation. See REQ-014. |
| REQ-036 | SCR-02 dashboard. | PASS | Account identity is not retained in the dashboard JSON. |
| REQ-037 | SCR-03 employee list columns, sorting, pagination, buttons. | PARTIAL | No header click changed the sort query or a recorded row order. Records-per-page was not in the inspected trees. Local sort is proposed. |
| REQ-038 | SCR-04 search, empty results, and reset. | PARTIAL | Name, id, job, subunit, supervisor, and Include were not submitted. A valid non-empty search result was not observed. |
| REQ-039 | SCR-05 employee details. | PARTIAL | Six profile sections were not opened. No SCR-05 screenshot is cited. A selected list-row page was not opened. |
| REQ-040 | SCR-06 add-employee fields, no live write by default. | PASS | Save validation was not tested. The PNG was not stored. |
| REQ-041 | WF-01 Login with evidence IDs, outcomes, and no cryptographic claims about OrangeHRM. | PARTIAL | Demo success and failure outcomes were not observed. |
| REQ-042 | Record PIM columns, filters, pagination, empty text, and reset. | PASS | Sort, page size, and row glyphs were not activated. They are outside this sentence and remain REQ-037. |
| REQ-043 | Record network method, path, and status when observed. | PASS | None for the observed exchanges. Name, id, job, subunit, and supervisor searches were not submitted, so they have no method or status. |
| REQ-044 | Optional public login scenario. | OUT OF SCOPE | Optional, and not run. |
| REQ-045 | Optional frontend script analysis. | OUT OF SCOPE | Optional. |
| REQ-046 | `docs/requirements.md` tagged observed, inferred, or proposed. | PASS | None found in this pass. |
| REQ-047 | `docs/data-model.md` is a proposed design, not a recovered schema. | PASS | None. |
| REQ-048 | `docs/api-contracts.md` describes the new API, not OrangeHRM endpoints. | PASS | The Harbor contract must not be described as the OrangeHRM contract. |
| REQ-049 | Use safe sessions, password hashing, validation, and local access control. | PASS | Role-based admin permissions were not built. Admin is out of scope. |
| REQ-050 | Add migrations and synthetic seed data. | PASS | This audit did not run a migration. |
| REQ-051 | Docker Compose for local startup. | PARTIAL | Docker is not installed, so startup was not demonstrated. |
| REQ-052 | README with run and test commands. | PASS | None. |
| REQ-053 | The new application must not call the OrangeHRM demo. | PASS | None found. |
| REQ-054 | TC-01 through TC-10 pass against the local replica. | PASS | The other four `test()` calls in that file were not selected by this grep. The default config still names ports 8000 and 5173 and was not used. |
| REQ-055 | Compare captures with `compare_web_captures` after normalizing volatile fields. | NOT VERIFIED | There is no second sanitized scenario with the same step IDs, and no confirmed volatile literal. The passive input rejected `normalization`. |
| REQ-056 | REA is connected in Cursor and doctor has been checked. | PASS | Doctor's own `live_server.state` is `unknown`. The live call is the connection proof. Missing analysis engines are outside this requirement. |
| REQ-057 | Exclude secrets, cookies, tokens, and personal account data from shared artifacts. | PASS | Original labeled JSON and one evidence note still contain the values and stay ignored. A full folder copy is not a safe share. Four screenshots stay excluded and are not sanitized. |
