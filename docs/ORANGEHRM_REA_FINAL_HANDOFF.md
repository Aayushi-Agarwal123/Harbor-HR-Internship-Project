# OrangeHRM REA final handoff

Date: 2026-11-16. This is the closeout note for the Harbor HR reconstruction. It does not hide open items. No archive was created.

## Overview

Harbor HR is a separate React and FastAPI application. It was built from browser observations of the public OrangeHRM demo. OrangeHRM server code, logos, and proprietary assets were not copied. The local database is PostgreSQL through an earlier `pgserver` process. Docker is not how that database was started.

The master list is `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. Evidence notes for individual requirements are under `docs/evidence/`.

## Totals

57 requirements, REQ-001 through REQ-057.

| Status | Count |
|---|---|
| PASS | 40 |
| PARTIAL | 11 |
| NOT VERIFIED | 2 |
| OUT OF SCOPE | 4 |
| Total | 57 |

40 + 11 + 2 + 4 = 57. REQ-056 and REQ-057 stay Pass. REQ-003 stays Not Verified.

## Promoted in this closeout

REQ-042 is Pass. Columns, filter labels, one submitted Freelance filter, pagination offsets 50 and 100, `No Records Found`, and Reset are recorded in `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` and `docs/evidence/REQ-042-employee-list-controls-mapping.md`. Sort, page size, and row glyphs stay unknown and remain REQ-037.

## Partial

| ID | Blocker |
|---|---|
| REQ-006 | Workflow file exists. Live login success, logout, and several filters were not observed. |
| REQ-008 | Some original JSON still stores account labels. Proposed copies exist and must not replace the originals. |
| REQ-014 | Login was not submitted. Live success, failure, and logout were not seen. |
| REQ-020 | Only the Freelance empty search was observed. Name, id, job, subunit, and Include were not submitted. |
| REQ-025 | Local edit exists. Live edit and delete were not observed. The proposed-delete test was not in the isolated grep. |
| REQ-028 | Local flows exist. Some of them fill unknowns with proposed rules. |
| REQ-037 | Header clicks did not change `sortField` or `sortOrder`. Records-per-page was not in the inspected trees. |
| REQ-038 | Empty Freelance result and Reset are recorded. A non-empty matching search is not. |
| REQ-039 | Four signed-in profile sections were opened. Six sections, a selected list row, and an SCR-05 screenshot were not. |
| REQ-041 | WF-01 has evidence IDs and refuses an OrangeHRM hash claim. Success and failure outcomes are unknown. |
| REQ-051 | `docker-compose.yml` exists. `docker` is not installed, so Compose startup was not shown. |

## Not verified

| ID | Blocker |
|---|---|
| REQ-003 | The demo site's own usage terms were not confirmed. Privacy policy, GPL, and the vulnerability disclosure policy are different documents. |
| REQ-055 | A passive `compare_web_captures` run returned `changed`. No volatile literal was established, and the passive schema rejected a `normalization` key. Scenario comparison was not run. |

## Out of scope

REQ-026 Leave, REQ-027 Admin settings, REQ-044 optional login scenario, and REQ-045 optional script analysis.

## Tests

This closeout did not run Playwright or pytest. The retained isolated report is `test-results/isolated/tc-report.json`: 5 passed, 0 failed, 0 skipped, 38.4 seconds, started `2026-11-15T13:49:54.446Z`. It covers TC-01 through TC-10 on SQLite. The historical default suite, 9 passed in 39.4 seconds, was not re-run. The PostgreSQL integration result, 1 passed in 21.52 seconds on `harbor_test`, was not repeated. The in-memory API result for REQ-057 was 4 passed in 30.92 seconds. `docker --version` was not recognized.

## Privacy

`docs/PRIVACY_SHARING_MANIFEST.md` is the sharing boundary. A full folder copy is not safe. Original labeled JSON, three PIM notes, `.env`, and four screenshots stay ignored and are not sanitized. Do not print account labels, passwords, cookies, or tokens.

## Paths

- Traceability: `docs/FINAL_REQUIREMENT_TRACEABILITY.md`
- Assumptions: `docs/assumptions.md`
- Screen inventory: `docs/screen-inventory.md`
- Workflows: `docs/workflow-specifications.md`
- List and search results: `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md`
- Later module landings: `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`
- Privacy: `docs/FINAL_PRIVACY_AUDIT.md` and `docs/PRIVACY_SHARING_MANIFEST.md`
- REA connection: `docs/evidence/REQ-056-live-connection-verification.md`

## Work that needs authorization

A new demo login, logout, non-empty search, list-row details page, or fresh capture needs REQ-003 to be verified first. Do not click Save, edit, or delete on the demo. Do not install Docker only to close REQ-051 unless that install is separately approved.

## Transition

The reconstruction can be left here. The open items above are the remaining limits. They do not need to be closed before other work starts.
