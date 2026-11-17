# Employee details and list inspection

Date: 2026-11-15. Project: `orangehrm-rea-poc`.

This pass used the existing Chrome process listening on `127.0.0.1:9222` (PID 8532). It did not open another browser, submit Login, save a form, or change an employee. Harbor HR source, original evidence JSON, and databases were not modified. No test suite was run.

Handoff readiness stays **CONDITIONALLY READY**. Section 13 records the employee response, Employment Status search, Reset, and pagination. Section 14 records a later stop: a reload of the Employee List returned the login page, so the remaining filters and header sorting were not run. Sections 1–12 are the earlier pass and are unchanged.

## 1. Inspection scope

Confirm the debugging tab, then inspect the Employee List only if the session was signed in. Read-only. Response bodies, cookies, and header values were not retained.

## 2. Browser session

| Fact | Value | Class |
|---|---|---|
| Target list | `ev_8b4c953786e5b100dd9dffa629d3a5414672311d51297c3bc13a24117549ffb5` | OBSERVED |
| Target | `C1075BA3A8F5B98B0CEE8BCCB5E2005B` | OBSERVED |
| Browser | Chrome/157.0.8103.51 | OBSERVED |
| URL before PIM was opened | `https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList` | OBSERVED |
| Leave-page inspect | `ev_3f9e9f734915c5a3e54c1752edcf79b55cc7dada085396cbdc122cd6c3c75533`, `2026-11-15T10:02:52.016Z` | OBSERVED |
| Leave heading | `Leave List` | OBSERVED |
| Sidebar present | Admin through Buzz, including PIM | OBSERVED |

The tab was not the login page. An account label was visible on the later Employee List. Its value is not copied here.

Earlier the same target was the login page. That was a previous pass. This pass found the Leave list instead.

## 3. How the Employee List was opened

Connected scenario parent `ev_767bff1d6c8a942d30c5d213be4f3d691345376b21890d14699dd5551b054563`. Summary `ev_65329b95fc22f992b8a6884bf05cb506b169992e644044f17f7877eb3204cb66`. Transaction view `ev_06ca62cd02a49471944f11be44dfa1a1cbbebaaddf68a059e1002ed38c591c5a`.

| Step | Result | Class |
|---|---|---|
| Reload the current Leave list URL | Stayed on `.../leave/viewLeaveList` | OBSERVED |
| Click the sidebar link named `PIM` | URL became `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList` | OBSERVED |

The PIM click completed. No login form was submitted.

## 4. Employee List structure

Final accessibility snapshot on the Employee List URL. Personal row text is not copied.

| Item | Observation | Class |
|---|---|---|
| Banner heading | `PIM` | OBSERVED |
| Page heading | `Employee Information` | OBSERVED |
| Breadcrumb role | None in the accessibility tree | OBSERVED |
| Module entries | Text `Configuration`; links `Employee List`, `Add Employee`, `Reports`. Those three link URLs in the snapshot are `#` | OBSERVED |
| Add control | Button whose name includes `Add`, separate from the `Add Employee` link | OBSERVED |
| Record count | `(102) Records Found` | OBSERVED |
| Columns | Checkbox, `Id`, `First (& Middle) Name`, `Last Name`, `Job Title`, `Employment Status`, `Sub Unit`, `Supervisor`, `Actions` | OBSERVED |
| Visible rows | A table body is present. Job Title, Employment Status, Sub Unit, and Supervisor cells are empty on the rows whose action cell has two buttons. One visible row has those job fields filled and only one action button | OBSERVED |
| Row text | Not copied into this file | — |

## 5. Filters and controls

| Control | Observation | Tested this pass |
|---|---|---|
| Employee Name | Label `Employee Name`. Textbox name `Type for hints...` | Not submitted. **NOT VERIFIED** |
| Employee Id | Label `Employee Id`. Textbox has an empty accessible name | Not submitted. **NOT VERIFIED** |
| Employment Status | Closed text `-- Select --` | Options not opened. **NOT VERIFIED** |
| Include | Closed text `Current Employees Only` | Not changed. **NOT VERIFIED** |
| Supervisor Name | Label `Supervisor Name`. Textbox name `Type for hints...` | Not submitted. **NOT VERIFIED** |
| Job Title | Closed text `-- Select --` | Options not opened. **NOT VERIFIED** |
| Sub Unit | Closed text `-- Select --` | Options not opened. **NOT VERIFIED** |
| Buttons | `Reset` and `Search` | Not clicked. **NOT VERIFIED** |

Earlier Freelance search, Reset, and page-2 notes remain in `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md`. They were not repeated.

## 6. Sorting and pagination

| Item | Observation | Class |
|---|---|---|
| Header glyphs | The Id, name, job, status, sub unit, and supervisor headers include a glyph as well as the label | OBSERVED |
| Sort click | No header was clicked | **NOT VERIFIED** |
| Records-per-page | No records-per-page control or option list was in the accessibility tree | Not observed in this capture. Not proof the control cannot exist under another setting |
| Pagination | Navigation `Pagination Navigation` with buttons `1`, `2`, `3`, and one next glyph | OBSERVED. Not clicked this pass |

## 7. Employee detail navigation

| Item | Observation | Class |
|---|---|---|
| Name or id cells | They are table cells, not links, in this snapshot | OBSERVED |
| Row actions | Most visible rows have two buttons. Their accessible names are private-use glyphs, not View, Edit, or Delete | OBSERVED |
| One row | The row with job fields filled has only the first of those two glyphs | OBSERVED |
| Detail page | Not opened | **NOT VERIFIED** |

The glyphs were not clicked. Their effect is unknown, and one of them may change or delete a record. No detail tabs, sections, or fields were inspected.

## 8. API observations

Method, path, and status only. Query values, bodies, cookies, and header values were not retained. Transaction page evidence is the view of parent `ev_767bff1d6c8a942d30c5d213be4f3d691345376b21890d14699dd5551b054563`.

Employee List workflow, after the PIM click:

| Method | Path | Status | Query parameter names |
|---|---|---|---|
| GET | `/web/index.php/pim/viewPimModule` | 302 | none |
| GET | `/web/index.php/pim/viewEmployeeList` | 200 | none |
| GET | `/web/index.php/api/v2/pim/employees` | 200 | `limit`, `offset`, `model`, `includeEmployees`, `sortField`, `sortOrder` |
| GET | `/web/index.php/api/v2/admin/employment-statuses` | 200 | `limit` |
| GET | `/web/index.php/api/v2/admin/job-titles` | 200 | `limit` |
| GET | `/web/index.php/api/v2/admin/subunits` | 200 | none |
| GET | `/web/index.php/core/i18n/messages` | 304 | none |

Response field names and parameter values are **UNKNOWN**. No employee-detail request was observed.

The Leave list reload before the PIM click also produced leave requests. They belong to that page, not to employee details:

| Method | Path | Status | Query parameter names |
|---|---|---|---|
| GET | `/web/index.php/leave/viewLeaveList` | 200 | none |
| GET | `/web/index.php/api/v2/leave/employees/leave-requests` | 200 | `limit`, `offset`, `includeEmployees` |
| GET | `/web/index.php/api/v2/leave/leave-periods` | 200 | none |
| GET | `/web/index.php/api/v2/leave/workweek` | 200 | `model` |
| GET | `/web/index.php/api/v2/leave/leave-types` | 200 | `limit` |
| GET | `/web/index.php/api/v2/leave/holidays` | 200 | `fromDate`, `toDate` |

## 9. Evidence and target IDs

- `ev_8b4c953786e5b100dd9dffa629d3a5414672311d51297c3bc13a24117549ffb5` — target list
- `ev_3f9e9f734915c5a3e54c1752edcf79b55cc7dada085396cbdc122cd6c3c75533` — Leave list inspect
- `ev_767bff1d6c8a942d30c5d213be4f3d691345376b21890d14699dd5551b054563` — PIM click scenario
- `ev_65329b95fc22f992b8a6884bf05cb506b169992e644044f17f7877eb3204cb66` — scenario summary
- `ev_06ca62cd02a49471944f11be44dfa1a1cbbebaaddf68a059e1002ed38c591c5a` — network transactions
- Target `C1075BA3A8F5B98B0CEE8BCCB5E2005B`

## 10. Classification

- **OBSERVED:** signed-in Leave list, PIM click, Employee List URL, headings, columns, filter labels, record count, pagination button names, employee list and dropdown API method/path/status, and the employee request's query parameter names.
- **DERIVED:** none beyond the REA summary counts of transactions.
- **INFERRED:** none. The row glyphs are not classified as view, edit, or delete.
- **UNKNOWN:** response bodies, query values, detail screen, submitted filter results, sort-click behavior, and a records-per-page control.

## 11. Limitations

The accessibility snapshot does not show every row. `(102) Records Found` is the page text, not a count of copied rows. Network observation started with the scenario, so requests made before that attach are not in this capture. The scenario reloaded the Leave list before clicking PIM.

## 12. Readiness

**CONDITIONALLY READY.** The Employee List screen and its initial API calls were observed. Details, search submission, sorting, and records-per-page remain unverified in this earlier pass. Section 13 updates search, Reset, and pagination only.

## 13. Later pass: response body and read-only interactions

Same Chrome target `C1075BA3A8F5B98B0CEE8BCCB5E2005B` on `127.0.0.1:9222`. The tab stayed on `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList`. No employee was created, edited, or deleted. Row-action glyphs were not clicked. Personal values, the account label, cookies, and tokens are not copied. Harbor HR source, original evidence JSON, and databases were not modified.

Connected scenarios reload the current URL before their actions. Response bytes come from Playwright `Response.body()`. A credentialed follow-up load is possible, so a body is not proven to be the original socket bytes.

### 13.1 Employee response

Parent `ev_61a534d194bed31739f27c96ae0c4a2416e191a3ea43922602d112c689b76574`. Summary `ev_65c7e6bce66bc926b4ca877578c4552bc921caf40fa81be70d87813575587635`. Transaction view `ev_bbb281c65bf03d9232557bf743811272787bd73e153d385e6dd848ac13d21a53`. Body view `ev_0619ed53c02af25c932e29ea5588eba43cb59e82044591b0b4915074b3659151`.

| Fact | Value | Class |
|---|---|---|
| Request | `GET /web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC` | OBSERVED |
| Status | 200 | OBSERVED |
| `content-type` | `application/json` | OBSERVED |
| Body | Parsed JSON. Top-level keys `data`, `meta`, `rels` | OBSERVED |
| `data` | Array of 50 objects | OBSERVED |
| `meta` | Object with one key, `total`, integer `108` | OBSERVED |
| `rels` | Empty array | OBSERVED |
| Page text at the following inspect | `(108) Records Found` on `ev_6fd8c8514a6a462904f45d07df2e9ed7c2e6455718e8d6ce7927c80a4d632b1a` | OBSERVED |

Employee object keys and JSON types in all 50 items of that response:

| Field | Type in this response |
|---|---|
| `empNumber` | integer |
| `lastName`, `firstName`, `middleName`, `employeeId` | string |
| `terminationId` | null |
| `jobTitle` | object: `id`, `title`, `isDeleted`, all null |
| `subunit` | object: `id`, `name`, both null |
| `empStatus` | object: `id`, `name`, both null |
| `supervisors` | empty array |

Those nulls describe this page only. The page-2 accessibility snapshot later showed some non-empty Job Title, Employment Status, Sub Unit, and Supervisor cells. The JSON for that page was not decoded, so the populated field types are **UNKNOWN**.

The same response-body capture also parsed:

| Request | Status | Content type | Shape | Class |
|---|---|---|---|---|
| `GET /api/v2/admin/employment-statuses?limit=0` | 200 | `application/json` | `data` length 6, `meta.total` 6, `rels` empty. Items have integer `id` and string `name` | OBSERVED |
| `GET /api/v2/admin/job-titles?limit=0` | 200 | `application/json` | `data` length 28, `meta.total` 28. Item keys `id`, `title`, `description`, `note`, `jobSpecification` | OBSERVED |
| `GET /api/v2/admin/subunits` | 200 | `application/json` | `data` length 15. Item keys `id`, `name`, `unitId`, `description`, `level`, `left`, `right`. `meta` was an empty array | OBSERVED |

Status names in that payload, in id order 1 through 6: Freelance, Full-Time Contract, Full-Time Permanent, Full-Time Probation, Part-Time Contract, Part-Time Internship. Job-title and subunit strings are not copied.

### 13.2 Search and Reset

Search then Reset, parent `ev_6a2ea6e84e02ff1cbd698e6f8be3ab5dbedc8f6e83bd509ecf37805bd960aba0`. Summary `ev_0cb3f718bd419c87ca47fd4e074aeefa366d1d5890db17d16a6615edab427170`. Transaction view `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060`.

The first closed select was opened and the option named `Freelance` was chosen, then `Search`, then `Reset`. The page URL did not change.

| Step | Employee query after the click | Status | Class |
|---|---|---|---|
| Initial load | `limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC` | 200 | OBSERVED |
| Search | same query plus `empStatusId=1` | 200 | OBSERVED |
| Reset | `empStatusId` absent; query returned to the initial load | 200 | OBSERVED |

`empStatusId=1` is the Freelance row in the employment-status payload above. That link is **DERIVED** from the two responses in the same session, not from a documented id map.

A second search stopped before Reset so the screen could be read. Parent `ev_909fc8e850ca2efe9618d49f670a9d3b77dbf681e434d8b190b4fca959ed0d78`. Summary `ev_ddd317317a29361894ecc62e7e92a92bc30e13c24cb14269c3c5772e99291d90`. Transaction view `ev_779863b0550d6504da6a60d3c9dbdb800465fe3f31a232f061aec3606b343342`. Body view `ev_12345e3d3f8d1a4dc4e92878c3f3dbfd49014f76a85eb03ca1c9babe2fc217b7`.

| Fact | Value | Class |
|---|---|---|
| Unfiltered response on that reload | `meta.total` 122, `data` length 50, `content-type` `application/json` | OBSERVED |
| Filtered response | `empStatusId=1`, status 200, `content-type` `application/json`, `data` length 0, `meta.total` 0, `rels` empty | OBSERVED |
| Screen | Employment Status text `Freelance`. Table body empty. Text `No Records Found`. An `Info` paragraph repeats `No Records Found`. A `×` button is present | OBSERVED |

Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor Name were not submitted.

The filtered screen was then left by reloading the list. Parent `ev_99b8d0cd9cf50bad5a0587f2a597683d758b941156ccc097872bd2c749ecdd78`. Summary `ev_7dda3fa6dacfe5505112043a3b5566013eb90838cca81e850caad82bd4184e25`. Later inspect `ev_8b3e6b6a157230ad98536c10a02c52520a042d85a0bff11e7d037974d4ca4b5c`: URL still the Employee List, closed selects read `-- Select --`, Include read `Current Employees Only`, and the text was `(123) Records Found`.

The displayed total changed across captures: `(102)` in section 4, `(108)`, `(112)` after the page-2 scenario, `(119)` after the sort attempts, API `122`, then `(123)`. These are separate loads of a shared demo. They are not evidence that pagination itself changes the total.

### 13.3 Pagination

| Action | Evidence | Employee query | Page URL | Class |
|---|---|---|---|---|
| Button `2` | Parent `ev_5a2efb5c3295313a875677d1169684f877abd3aa9df7def44089f7d61eca3506`. Summary `ev_22d9dbc7db269e548b3a7fc773b4db065be5f6951ad1d9e9cc86692212fc531a`. Transactions `ev_05566f07f6331440c3662de6c0f9b4f9638b246b4fe304e31b776b686cdb5501` | `offset=50`; `limit`, `model`, `includeEmployees`, `sortField`, and `sortOrder` unchanged. Status 200 | Unchanged | OBSERVED |
| Button `3` | Parent `ev_d3d946d527e1e766e588f3f90fb91b3e6a37fb06feef41ed78f36600b3551a54`. Summary `ev_65335b80e2c3b383a90017eca8febc3c8c1d01a9e564bdcde57914a892f987ff`. Transactions `ev_19b1c588f71cd525f8a96dbff77d998b99b905fb107737001acb82ce82794e75` | `offset=100`; the other parameters unchanged. Status 200 | Unchanged | OBSERVED |

Buttons `1`, `2`, and `3` were present after the final reload. No records-per-page control was in the accessibility tree of `ev_6fd8c8514a6a462904f45d07df2e9ed7c2e6455718e8d6ce7927c80a4d632b1a`, `ev_eb3f4ff6018787b171d27f7a199aec5e532177848eca585a81aabbaeb720fd2b`, or `ev_8b3e6b6a157230ad98536c10a02c52520a042d85a0bff11e7d037974d4ca4b5c`. That is not proof the control cannot exist outside this tree.

### 13.4 Header sorting

The default request uses `sortField=employee.firstName` and `sortOrder=ASC`. Page 2 and page 3 kept that pair. In the accessibility tree, `First (& Middle) Name` carried a different trailing glyph from `Id`, `Last Name`, `Job Title`, `Employment Status`, `Sub Unit`, and `Supervisor`.

Two completed clicks did not add an employee request and did not move that glyph:

| Click | Evidence | Result | Class |
|---|---|---|---|
| Header cell `div.oxd-table-header-cell >> nth=3` | Parent `ev_f86463155257f631bfada23aab413de64b8fb4c51596c4993d97bc38590d6f5a`. Summary `ev_1ffa9e4abb14b4b01bd298c25b4d6929436a28ebe08f7d327e1139b3789992a6`. Transactions `ev_a2f87ccee8ed185ce3121120a3e0dfb23e9e275b4d1381c92af2224b067a50ab` | Only the initial employee request | OBSERVED |
| `.oxd-table-header-sort >> nth=2` | Parent `ev_f8463e8b835542cbe7fd74578c6c6943e964bd6523884a9eb82f4ee4caf48f91`. Summary `ev_f788767b33e197b300daf5bfec6d0ec3152fd007f9ed5d0d930e1aa1c19ad4f3` | Only the initial employee request | OBSERVED |
| Tree after the second click | `ev_eb3f4ff6018787b171d27f7a199aec5e532177848eca585a81aabbaeb720fd2b` | Active glyph still on `First (& Middle) Name` | OBSERVED |

A `columnheader` role is not an accepted scenario locator. Clicking a header so that `sortField` or `sortOrder` changes is **UNKNOWN**.

### 13.5 Employee details

Still **UNKNOWN**. Name and id cells are not links. The rendered `Employee List`, `Add Employee`, and `Reports` links have URL `#`. `My Info` points at `/web/index.php/pim/viewMyDetails`, which is the signed-in user rather than a selected row. Row actions remain private-use glyph buttons and were not clicked. No employee-detail request was observed.

### 13.6 Classification for this pass

- **OBSERVED:** employee query values, status 200, `application/json`, the field names and types in the decoded pages, `meta.total`, pagination offsets 50 and 100, Freelance search (`empStatusId=1`, total 0, `No Records Found`), and Reset removing `empStatusId`.
- **DERIVED:** `empStatusId=1` corresponds to the Freelance status row because that id and name occurred in the status payload and the control showed Freelance after the option click.
- **INFERRED:** none. Header glyphs are not classified as ascending or descending beyond the request parameters that were actually sent.
- **UNKNOWN:** employee-detail route, a header click that changes `sortField` or `sortOrder`, a records-per-page control, and JSON types for populated job, status, subunit, and supervisor values. Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor searches were not run.

### 13.7 Readiness

**CONDITIONALLY READY.** The list API shape, one status search, Reset, and pages 2 and 3 were verified. Details and header sorting were not. This is not a complete handoff.

## 14. Later pass stopped at login

Target list `ev_da69d6b01cecdc9d6615db739638d4032abb38e64c8ba56c08fdf40de15ed98e`. The same target `C1075BA3A8F5B98B0CEE8BCCB5E2005B` was on `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList` before any action in this pass. Chrome/157.0.8103.51. Login was not submitted.

The next connected scenario reloaded that URL and did not stay there. Parent `ev_c90cf1ef6d7ba36260d6914feda341be6bc4a518bb0bfbf6bff2a2d3053ad625`. Summary `ev_6aa265a8761128e87131a9117f32d46ed43771cb9385e4ba869e824a4ef2636b`. Transaction view `ev_ec363d8c0fa1c5d6add5e78260b6562e0628ac9b3cdac99ffa946b85a5e29c70`.

| Fact | Value | Class |
|---|---|---|
| `GET /web/index.php/pim/viewEmployeeList` | 302 at `2026-11-15T12:39:42.502Z` | OBSERVED |
| Following document | `GET /web/index.php/auth/login` 200 | OBSERVED |
| Job Title click | Failed after 10000 ms because the page was already the login page. No filter was submitted | OBSERVED |
| Passive confirm | `ev_d3ca4e8a2c76f5b466375c81cfc310784567d2e955be61774ba1001703eb2eb4`, URL still `.../auth/login` | OBSERVED |

The `location` response header name was present on the 302. Its value was not retained. The login URL is the next document request, not a decoded header value.

No employee was created, edited, or deleted. No Harbor HR source, database, or original evidence file was changed. No new project JSON was written.

### 14.1 Not run in this pass

Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor Name were not inspected or submitted. Header clicks were not repeated. The records-per-page tree was not re-inspected. Those items stay as recorded in section 13: Employment Status search and Reset were already observed; the other filters, a header click that changes `sortField` or `sortOrder`, and a records-per-page control remain UNKNOWN. Employee details were not opened in this pass. Later signed-in My Info sections are in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. A selected list row remains UNKNOWN.

### 14.2 Classification

- **OBSERVED:** the tab was the Employee List, then a reload received 302 and the login document returned 200.
- **DERIVED:** none.
- **INFERRED:** none. The 302 does not by itself prove whether the session cookie was absent, expired, or dropped by the attached reload.
- **UNKNOWN:** why this reload was redirected when earlier reloads of the same URL stayed on the Employee List.

### 14.3 Readiness

**CONDITIONALLY READY.** This pass is blocked until the existing tab is signed in on the Employee List again. Login was not entered.

## 15. Recheck still on the login page

Target list `ev_e81fc7aa857b9f150594c897f56ea484127fe6b428e31420a72895528ae446c1`. The same target `C1075BA3A8F5B98B0CEE8BCCB5E2005B` was still `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`. Chrome/157.0.8103.51. No other page target was open. Login was not submitted, and no second browser was opened.

Employee Name, Employee Id, Job Title, Sub Unit, Supervisor Name, header sorting, and records-per-page were not run. Section 13 remains the last verified list interaction. No Harbor HR source, database, or original evidence file was changed. No new project JSON was written.

- **OBSERVED:** the only page target is the login URL.
- **DERIVED:** none.
- **INFERRED:** none.
- **UNKNOWN:** whether a later manual sign-in will keep the Employee List across a reload.
