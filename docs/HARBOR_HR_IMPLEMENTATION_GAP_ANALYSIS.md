# Harbor HR implementation gap analysis

Date: 2026-11-15. Source of requirement text: `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. Live pages: `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`.

Statuses below match the updated traceability counts: 32 pass, 17 partial, 4 not verified, 4 out of scope.

Harbor HR already had login, the sidebar, the employee list, search, reset, add, edit, reports, and PostgreSQL persistence. This pass added signed-in profile section labels on the local detail page, dashboard counts from the existing employees API, and read-only landing text for inspected modules. No schema change was required. `harbor` was not modified.

| ID | OrangeHRM page | Verified live behavior | Harbor HR now | Missing | Required next step | Verification | Evidence |
|---|---|---|---|---|---|---|---|
| REQ-001 | n/a | Browser evidence only | Separate React and FastAPI app | None for this prohibition | Keep the apps separate | Source review | Inspection reports |
| REQ-002 | Demo | No save, delete, or approve was submitted | Local writes stay local | None for this prohibition | Continue read-only demo use | Review of scenario actions | This session's scenarios |
| REQ-003 | Demo terms | No terms record | n/a | Authorization note | Record the terms check before more capture | Document | NOT VERIFIED |
| REQ-004 | Inventory screens | Landings plus My Info sections, Add Employee, Reports | Local screens exist | List-row details and many subpages | Keep the inventory current | Report | Inspection report |
| REQ-005 | Sidebar | Twelve links, observed order | `Sidebar.tsx` | None for the map | None | Existing sidebar test, not re-run | Dashboard inspect |
| REQ-006 | Workflows | Login success and logout still not captured live | Local flows | Live login and logout outcomes | Leave them unknown | Do not submit login | PARTIAL |
| REQ-007 | n/a | Guide cases TC-01–TC-10 | `tests/e2e/hrms.spec.ts` | Not re-run | Re-run only against SQLite, not `harbor` | Historical 9 passed | PASS |
| REQ-008 | Screenshots | Dashboard and Leave screenshots retained by REA | Not copied into the repo | Other PNGs | Do not copy images that contain account labels | Evidence IDs | PARTIAL |
| REQ-009 | Employees API | Earlier `GET /api/v2/pim/employees` 200 | Harbor `/api/employees` is separate | Original register not updated | Fold the redacted exchange into the register | Existing results doc | PARTIAL |
| REQ-010 | n/a | Traceability exists | File paths cited | None | None | Matrix | PASS |
| REQ-011 | n/a | Prototype exists | React, FastAPI, PostgreSQL-capable | Non-PIM data stores | Do not invent those stores | App boots historically | PASS |
| REQ-012 | n/a | Local suite | SQLite `harbor-e2e.db` | Not re-run this pass | Do not start it while port 5173 is in use | Historical 9 passed | PASS |
| REQ-013 | n/a | Unknowns listed | `docs/assumptions.md` | Live unknowns remain | Keep them | File | PASS |
| REQ-014 | Login | Page observed; success and logout not submitted | Local login and logout | Live outcomes | Do not claim demo login parity | Local tests historical | PARTIAL |
| REQ-015 | Login labels | Labels only | `LoginPage.tsx`, auth router | Redirect is local design | None | Historical TC-01, TC-02 | PASS |
| REQ-016 | Dashboard | Widgets and sidebar observed | `DashboardPage.tsx` | Widget payloads were not decoded | Do not invent widget numbers from OrangeHRM | Inspect `ev_1f13c7c9…` | PASS |
| REQ-017 | Dashboard | Quick Launch visible, not clicked | Counts come from local employees. Shortcuts stay disabled | Live shortcut destinations | Leave shortcuts disabled | `tsc` and `vite build` exit 0 | PASS |
| REQ-018 | Employee List | Columns and `(146) Records Found` this visit | `EmployeeListPage.tsx` | Cell values not copied | None | Inspect `ev_08220b53…` | PASS |
| REQ-019 | Employee List | Columns observed | `GET /api/employees` | None required | None | Historical TC-03 | PASS |
| REQ-020 | Employee List | Freelance status search earlier; other filters not submitted this pass | Local name search | Name, id, job, subunit, Include not submitted live | Keep name search proposed | Earlier investigation | PARTIAL |
| REQ-021 | Search | One empty status search | Local search and reset | Matching rules are local | None | Historical TC-04–TC-06 | PASS |
| REQ-022 | Add Employee | `/pim/addEmployee` opened. Save not clicked | `EmployeeForm.tsx` | None for the prohibition | Do not save on the demo | `ev_703e7eb7…` | PASS |
| REQ-023 | Add Employee | First, middle, last, id, Create Login Details, Choose File, Cancel, Save | Local add. Login details and file stay disabled | Those two controls were not exercised | Leave them disabled | Historical TC-07 | PASS |
| REQ-024 | Demo | No edit or delete | Local edit and delete | None for the prohibition | None | This session | PASS |
| REQ-025 | My Info | Personal, contact, emergency, and job labels. Save not clicked | Detail tabs use stored name, id, job, status, sub unit | Unopened sections and live edit | Do not invent those fields | Detail page, not retested in Playwright | PARTIAL |
| REQ-026 | Leave List | Landing only | Landing text, no leave store | Apply, My Leave, Assign, Entitlements, Reports, Configure | Stay out of scope | `ev_4186ec73…` | OUT OF SCOPE |
| REQ-027 | System Users | Landing only | Landing text, no user store | Add user and configuration | Stay out of scope | `ev_bb35e6a6…` | OUT OF SCOPE |
| REQ-028 | Definition of done | Local flows exist; live gaps remain | Same | Proposed rules remain labeled | Keep the tags | Traceability | PARTIAL |
| REQ-029 | n/a | n/a | Persistence shown historically on `harbor_test` | Not re-queried on `harbor` | Do not touch `harbor` | Historical 1 passed | PASS |
| REQ-030 | n/a | n/a | Playwright covers local validation | Not re-run | Skip while 5173 is busy | Historical 9 passed | PASS |
| REQ-031 | n/a | Tags exist | Proposed behavior is labeled | Some old JSON still has account labels | Do not edit originals | Privacy audit | PARTIAL |
| REQ-032 | n/a | Versions not rechecked | Tooling present historically | Doctor and versions | Read-only check only | NOT VERIFIED | NOT VERIFIED |
| REQ-033 | n/a | Folders exist | Same | None | None | Tree | PASS |
| REQ-034 | n/a | Gitignore covers raw evidence | Same | Redacted JSON still has labels | Review before commit | Privacy audit | PARTIAL |
| REQ-035 | Login | Inputs and labels | Local login | Live error and redirect | See REQ-014 | Login inspect | PASS |
| REQ-036 | Dashboard | Inspect and screenshot | Local dashboard | Account label excluded | None | `ev_47abd274…` | PASS |
| REQ-037 | Employee List | Pages 2 and 3 earlier. Header clicks did not change sort | Local sort and page size | Live header sort and records-per-page | Keep local sort proposed | Earlier investigation | PARTIAL |
| REQ-038 | Search | Freelance empty result and Reset | Local search | Other filters | None unless a new search is allowed | Earlier investigation | PARTIAL |
| REQ-039 | My Info | Signed-in profile sections above. List row not opened | Detail tabs | Selected-row page and four unopened sections | Do not call the list-row page observed | `ev_4b741f09…` | PARTIAL |
| REQ-040 | Add Employee | Fields observed, no save | Local form | None | None | `ev_703e7eb7…` | PASS |
| REQ-041 | Login workflow | Outcomes unknown | Local PBKDF2 is a Harbor choice | Live success and failure | Do not attribute the hash to OrangeHRM | Workflow doc | PARTIAL |
| REQ-042 | Employee List | Columns, one search, pagination, empty text, reset | Local equivalents | Sort, page size, row glyphs | Leave them proposed | Earlier investigation | PARTIAL |
| REQ-043 | Network | Employees and related lookups returned 200 earlier | Harbor routes are separate | Unsubmitted filter parameters | Do not invent them | Results doc | PARTIAL |
| REQ-044 | Optional scenario | File exists, not run | n/a | Optional | Skip | Scenario file | OUT OF SCOPE |
| REQ-045 | Scripts | Not requested | No copied bundles | Optional | Skip | n/a | OUT OF SCOPE |
| REQ-046 | n/a | `docs/requirements.md` tagged | n/a | None | None | File | PASS |
| REQ-047 | n/a | Data model is a design | `models.py` | None | None | File | PASS |
| REQ-048 | n/a | Harbor contract is separate | Routers | None | Do not describe it as OrangeHRM's API | Contract doc | PASS |
| REQ-049 | n/a | Not claimed as OrangeHRM internals | Cookie session and hashing | Admin roles | Out of scope | Auth code | PASS |
| REQ-050 | n/a | n/a | Migration file and seed exist | Not applied this pass | Do not apply to `harbor` | Historical | PASS |
| REQ-051 | n/a | n/a | Compose file unused | Docker not installed | Do not install Docker | Note | PARTIAL |
| REQ-052 | n/a | n/a | README commands | None | None | README | PASS |
| REQ-053 | n/a | n/a | No demo host in app code | None | None | Source | PASS |
| REQ-054 | n/a | n/a | TC-01–TC-10 present | Not re-run | Historical 9 passed | Spec file | PASS |
| REQ-055 | n/a | `compare_web_captures` not run | n/a | Comparison | Only on sanitized captures | NOT VERIFIED | NOT VERIFIED |
| REQ-056 | n/a | Doctor not re-run | REA tools worked this session | Doctor result | Do not restart Cursor for it | NOT VERIFIED | NOT VERIFIED |
| REQ-057 | n/a | New reports omit account labels and contact values | Same | Older JSON still has labels | Keep originals unchanged | This report | PARTIAL |

## Implementation decisions

Implemented from verified structure, using existing employee columns only:

- Employee detail sections for Personal Details, Contact Details, Emergency Contacts, and Job.
- Dashboard sub-unit counts from `GET /api/employees`.
- Sidebar pages that state the observed landing and say Harbor HR does not store that module.

Not implemented, because the behavior was not captured or the guide excludes it:

- Leave, Time, Recruitment, Admin, Performance, Claim, Buzz, and Directory record stores.
- Maintenance confirm.
- Add Employee save on the demo, Create Login Details, and file upload.
- Search, sort, and pagination changes. The existing local list behavior was left in place.
- Schema migrations. None were required.
