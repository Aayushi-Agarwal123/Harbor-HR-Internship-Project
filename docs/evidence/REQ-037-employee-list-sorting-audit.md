# REQ-037 Employee List sorting audit

Date: 2026-11-15.

REQ-037 stays Partial. No header was clicked for this note, and no demo page was opened.

## Acceptance criteria

Traceability row: SCR-03 employee list columns, sorting, pagination, buttons.

Guide inventory row: PIM employee list. Observe columns, sorting, pagination, and buttons. Evidence is DOM and a screenshot.

The guide does not add a separate rule that both ascending and descending must be shown. Sorting is one of the four items to observe. A header glyph is not that observation.

## Sources

| Source | Sorting fact |
|---|---|
| `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md` | Header glyphs were visible. No header was clicked. No before-and-after order. |
| `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` section 13.4 | Two later clicks and the unchanged query |
| `docs/evidence/REQ-042-employee-list-controls-mapping.md` | Same clicks, classified as unverified sort behavior |
| `docs/evidence/REQ-043-api-method-path-status.md` | Employee request status 200. It does not record a changed sort pair |

## Header clicks already recorded

| Attempt | Evidence | Result | Class |
|---|---|---|---|
| 2026-11-14 | Interaction note, column-sort section | No header click. No order comparison | Observed |
| Header cell `div.oxd-table-header-cell >> nth=3` | Parent `ev_f86463155257f631bfada23aab413de64b8fb4c51596c4993d97bc38590d6f5a`. Transactions `ev_a2f87ccee8ed185ce3121120a3e0dfb23e9e275b4d1381c92af2224b067a50ab` | Only the initial employee request | Observed |
| `.oxd-table-header-sort >> nth=2` | Parent `ev_f8463e8b835542cbe7fd74578c6c6943e964bd6523884a9eb82f4ee4caf48f91` | Only the initial employee request | Observed |
| Tree after the second click | `ev_eb3f4ff6018787b171d27f7a199aec5e532177848eca585a81aabbaeb720fd2b` | The differing glyph stayed on `First (& Middle) Name` | Observed |

The Id, name, job, status, sub unit, and supervisor headers included a glyph. `First (& Middle) Name` had a different trailing glyph from the others. That difference was visible before these clicks. It is not a verified sort direction.

## sortField and sortOrder

The default employee request, and the page-2 and page-3 requests, used `sortField=employee.firstName` and `sortOrder=ASC`. Status 200. The two clicks did not add an employee request, so no changed pair was recorded.

A click that changes `sortField` or `sortOrder` is unknown. The results file says a `columnheader` role was not an accepted scenario locator.

## Network

`docs/evidence/REQ-043-api-method-path-status.md` records `GET /web/index.php/api/v2/pim/employees` status 200 for the list, search, Reset, and offsets 50 and 100. Those rows do not show a second sort pair. No request in the retained notes changes `sortOrder` away from `ASC` or `sortField` away from `employee.firstName`.

## Row order

Not observed for a header click. The 2026-11-14 note says no before-and-after order was taken. The later click notes do not record a change in row order. Page button `2` changed which Id cell was first. That was pagination, not sorting.

## Criteria

| Item | Class |
|---|---|
| Column headers and their glyphs are visible | Observed and verified |
| A header received a completed click | Observed. Two later clicks completed |
| The click changed `sortField` or `sortOrder` | Unknown. No changed pair was recorded |
| An API request reflected a new sort | Unknown. The clicks did not add an employee request |
| Row order changed because of a header click | Unknown |
| Descending order | Unknown. The recorded value is `ASC` on the initial request |
| The different first-name glyph means ascending | Not used. That reading is not in the evidence |

Columns, pagination offsets, and buttons are recorded in the REQ-042 mapping. They are not sorting.

## Gap

Live header sorting was not established. Records-per-page was not in the inspected trees and is outside this sorting result. Local sort stays proposed.

## Next action

Do not click another header unless a later pass is permitted. Do not treat the visible glyph as a working sort.

## Status

Partial.
