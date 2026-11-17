# REQ-038 SCR-04 evidence mapping

Date: 2026-11-15.

REQ-038 stays Partial. No new search was submitted. No demo page was opened.

## Acceptance criteria

Traceability row: SCR-04 search, empty results, and reset.

Guide inventory row: Employee search. Observe filter fields, valid and empty results, and reset behavior. Evidence is a UI observation plus network metadata.

## Sources

| File | Role |
|---|---|
| `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` section 13.2 | Later query and screen facts |
| `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md` | Earlier click record cited by that results file |
| `docs/evidence/REQ-043-api-method-path-status.md` | Method, path, and status only |

## Mapping

| Observation | Source | Evidence | SCR-04 part | Satisfies it |
|---|---|---|---|---|
| The option named `Freelance` was chosen and Search was clicked. The status text became `Freelance`. The URL did not change. | 2026-11-14 interaction note | `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` | Search | Yes, for one Employment Status search |
| The same click's later capture sent `GET /web/index.php/api/v2/pim/employees` with `empStatusId=1` and status 200 | Results file section 13.2; REQ-043 | Parent `ev_6a2ea6e84e02ff1cbd698e6f8be3ab5dbedc8f6e83bd509ecf37805bd960aba0`. Transactions `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060` | Network metadata for that search | Yes, for method, path, and status |
| The table body was empty. The text was `No Records Found`, repeated by an Info paragraph | 2026-11-14 interaction note, and results file section 13.2 | Screen evidence `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d`. Later body `ev_12345e3d3f8d1a4dc4e92878c3f3dbfd49014f76a85eb03ca1c9babe2fc217b7` with `data` length 0 and `meta.total` 0 | Empty result | Yes |
| Reset was clicked. Employment Status returned to `-- Select --`. Include stayed `Current Employees Only`. The text was `(121) Records Found` and data rows were present. The Info notice was still present after 1.5 seconds | 2026-11-14 interaction note | `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d` | Reset behavior | Yes, for Reset after the Freelance search |
| Reset's later query had no `empStatusId` and returned status 200 | Results file section 13.2; REQ-043 | Transactions `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060` | Network metadata for Reset | Yes |

Filter labels were visible on the list: Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title, and Sub Unit. That is in section 5 of the results file. Seeing a label is not a submitted search.

## Observed and derived

Observed: the Freelance option was selected, Search and Reset were clicked, the empty table and `No Records Found` appeared, and Reset restored `-- Select --` with `(121) Records Found`. The employee request status was 200. The filtered body had `data` length 0 and `meta.total` 0.

Derived, and not an observed search fact: `empStatusId=1` is the Freelance status row. The results file marks that link derived from the status payload and the control text.

The unfiltered list loads, including `data` length 50 and `meta.total` 122, are not search results. The rows restored by Reset are the cleared list, not a search that found matches.

## Completed portions

One Employment Status search, its empty result, and Reset after that search are recorded, with network status 200.

## Missing non-empty search result

Not Observed. No retained note shows a submitted search whose result listed matching employees. The empty Freelance result is not that result. No search was submitted for this mapping.

## Unsubmitted filters

Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor Name were not submitted. Include was not changed. A one-character name prefix and an Employee Id value were typed in the 2026-11-14 note, and Search was not clicked. Those are not tested searches.

## Status

Partial. Next action: do not submit another search unless a later pass is permitted. A valid non-empty search result is still missing.

## Re-audit later on 2026-11-15

No demo page was opened. No search was submitted. The interaction note, results section 13.2, WF-03, and the screen-inventory SCR-04 row were read again. `screenshots/pim-employee-list-viewport.png` is the first unfiltered list capture. It was not reopened. No screenshot file records a submitted non-empty search.

Guide SCR-04 requires filter fields, a valid result, an empty result, and reset behavior, with UI observation and network metadata. Section 8 also asks for labels, empty messaging, behavior after reset, loading, validation, URL effect, and method, path, and status.

| Criterion | Evidence | Class | Result |
|---|---|---|---|
| Filter labels are visible | Interaction note filter table. Results section 5 and 13.2. | Observed | Pass for visibility only |
| One submitted Employment Status search | `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` | Observed | Pass for Freelance only |
| Empty result | Same screen evidence. Body `ev_12345e3d3f8d1a4dc4e92878c3f3dbfd49014f76a85eb03ca1c9babe2fc217b7`: `data` length 0, `meta.total` 0 | Observed | Pass |
| Reset after that search | `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d`. Status `-- Select --`, `(121) Records Found`, rows present. Info notice still present after 1.5 seconds | Observed | Pass for this reset only |
| Network method, path, and status for that search and Reset | `GET /web/index.php/api/v2/pim/employees`, status 200. Search adds `empStatusId=1`. Reset removes it. Transactions `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060` | Observed | Pass for this pair |
| `empStatusId=1` means Freelance | Results section 13.2 | Derived | Not a separate search |
| URL unchanged by Search and Reset | Both notes | Observed | Pass |
| Valid non-empty matching result | None | Unknown | Not Verified |
| Employee Name, Employee Id, Job Title, Sub Unit, Supervisor Name, and Include submitted as searches | Name and supervisor prefixes were typed. Employee Id was filled and cleared. Search was not clicked. Include was not changed. | Observed as unsubmitted | Not Verified |
| Hint text `Searching....` after typing `A` | `ev_7b891ef55f30f7fb309fd5ce058106e52765485a1e7c7a09b296592b39892bf7` | Observed | Not a Search click and not a result |
| Validation errors | None recorded | Unknown | Not Verified |
| Reset of a typed name or id | The only Reset followed the Freelance search | Unknown | Not Verified |

The unfiltered totals, including `(121)` after Reset and API `meta.total` 122, are not matching search results. The empty Freelance result does not prove that another filter would return rows.

REQ-038 stays Partial. The missing mandatory item is a valid non-empty result. The other filter fields were not submitted.
