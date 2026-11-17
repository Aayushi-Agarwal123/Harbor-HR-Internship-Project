# REQ-009 API observation register

Date: 2026-11-15.

This register is new. `evidence/api-observations.md` was not edited. No live request was made for this file. No credential, cookie, token, header value, or employee personal value is stored here.

Source: `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md`. Harbor HR routes are not OrangeHRM observations and are not listed.

## Classes

| Class | Meaning in this file |
|---|---|
| Observed | The source states the method, path, status, or response shape as seen |
| Derived | The source itself marks the link as derived from two responses |
| Unknown | The source says the value was not retained or the call was not seen |

## Observed exchanges

Section 8 recorded method, path, status, and query parameter names. It said response field names and parameter values were unknown at that point. Section 13 later recorded values and JSON shapes for the employee-list calls. Section 14 recorded the redirect to login. The rows below keep that order.

### Leave list reload, before the PIM click

These calls belong to the Leave list, not to an employee detail page. Transaction view of parent `ev_767bff1d6c8a942d30c5d213be4f3d691345376b21890d14699dd5551b054563`: `ev_06ca62cd02a49471944f11be44dfa1a1cbbebaaddf68a059e1002ed38c591c5a`.

| Method | Path | Status | Query names | Response | Class |
|---|---|---|---|---|---|
| GET | `/web/index.php/leave/viewLeaveList` | 200 | none | Not retained | Observed |
| GET | `/web/index.php/api/v2/leave/employees/leave-requests` | 200 | `limit`, `offset`, `includeEmployees` | Not retained | Observed |
| GET | `/web/index.php/api/v2/leave/leave-periods` | 200 | none | Not retained | Observed |
| GET | `/web/index.php/api/v2/leave/workweek` | 200 | `model` | Not retained | Observed |
| GET | `/web/index.php/api/v2/leave/leave-types` | 200 | `limit` | Not retained | Observed |
| GET | `/web/index.php/api/v2/leave/holidays` | 200 | `fromDate`, `toDate` | Not retained | Observed |

Query values for this leave reload were not retained. Purpose, as stated in the source: requests produced by the Leave list reload.

### Employee List, after the PIM click

Same transaction view as the table above.

| Method | Path | Status | Query names | Response | Class |
|---|---|---|---|---|---|
| GET | `/web/index.php/pim/viewPimModule` | 302 | none | Body not retained | Observed |
| GET | `/web/index.php/pim/viewEmployeeList` | 200 | none | Document. Body not retained | Observed |
| GET | `/web/index.php/api/v2/pim/employees` | 200 | `limit`, `offset`, `model`, `includeEmployees`, `sortField`, `sortOrder` | Field names unknown in section 8 | Observed |
| GET | `/web/index.php/api/v2/admin/employment-statuses` | 200 | `limit` | Unknown in section 8 | Observed |
| GET | `/web/index.php/api/v2/admin/job-titles` | 200 | `limit` | Unknown in section 8 | Observed |
| GET | `/web/index.php/api/v2/admin/subunits` | 200 | none | Unknown in section 8 | Observed |
| GET | `/web/index.php/core/i18n/messages` | 304 | none | Not retained | Observed |

The source describes the three `admin` calls as the list and dropdown requests that followed the PIM click. No employee-detail request was in this capture.

### Employee response body

Parent `ev_61a534d194bed31739f27c96ae0c4a2416e191a3ea43922602d112c689b76574`. Summary `ev_65c7e6bce66bc926b4ca877578c4552bc921caf40fa81be70d87813575587635`. Transactions `ev_bbb281c65bf03d9232557bf743811272787bd73e153d385e6dd848ac13d21a53`. Body `ev_0619ed53c02af25c932e29ea5588eba43cb59e82044591b0b4915074b3659151`.

| Fact | Value | Class |
|---|---|---|
| Request | `GET /web/index.php/api/v2/pim/employees` | Observed |
| Query | `limit=50`, `offset=0`, `model=detailed`, `includeEmployees=onlyCurrent`, `sortField=employee.firstName`, `sortOrder=ASC` | Observed |
| Status | 200 | Observed |
| Content type | `application/json` | Observed |
| Top-level keys | `data`, `meta`, `rels` | Observed |
| `data` | Array of 50 objects | Observed |
| `meta` | One key, `total`, integer 108 | Observed |
| `rels` | Empty array | Observed |

Object keys and JSON types in all 50 items of that response. Values of name and id fields are not copied.

| Field | Type in this response | Class |
|---|---|---|
| `empNumber` | integer | Observed |
| `lastName`, `firstName`, `middleName`, `employeeId` | string | Observed |
| `terminationId` | null | Observed |
| `jobTitle` | object with `id`, `title`, `isDeleted`, all null | Observed |
| `subunit` | object with `id`, `name`, both null | Observed |
| `empStatus` | object with `id`, `name`, both null | Observed |
| `supervisors` | empty array | Observed |

The source says those nulls describe this page only. Page 2 later showed some non-empty job, status, subunit, and supervisor cells. That page's JSON was not decoded, so the populated types are unknown.

The same body capture also parsed these. Section 13 writes the paths without the `/web/index.php` prefix used in section 8. This register does not treat that wording as a second host.

| Request as written in section 13 | Status | Content type | Shape | Class |
|---|---|---|---|---|
| `GET /api/v2/admin/employment-statuses?limit=0` | 200 | `application/json` | `data` length 6, `meta.total` 6, `rels` empty. Items have integer `id` and string `name` | Observed |
| `GET /api/v2/admin/job-titles?limit=0` | 200 | `application/json` | `data` length 28, `meta.total` 28. Item keys `id`, `title`, `description`, `note`, `jobSpecification` | Observed |
| `GET /api/v2/admin/subunits` | 200 | `application/json` | `data` length 15. Item keys `id`, `name`, `unitId`, `description`, `level`, `left`, `right`. `meta` was an empty array | Observed |

Employment-status names in that payload, in id order 1 through 6: Freelance, Full-Time Contract, Full-Time Permanent, Full-Time Probation, Part-Time Contract, Part-Time Internship. Job-title and subunit strings were not copied in the source and are not added here.

### Search, Reset, and pagination

Search then Reset. Parent `ev_6a2ea6e84e02ff1cbd698e6f8be3ab5dbedc8f6e83bd509ecf37805bd960aba0`. Summary `ev_0cb3f718bd419c87ca47fd4e074aeefa366d1d5890db17d16a6615edab427170`. Transactions `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060`.

| Step | Employee query | Status | Class |
|---|---|---|---|
| Initial load | `limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC` | 200 | Observed |
| Search | that query plus `empStatusId=1` | 200 | Observed |
| Reset | `empStatusId` absent; query returned to the initial load | 200 | Observed |

`empStatusId=1` matching the Freelance status row is **Derived**. The source says the id and the name occurred in the status payload, and the control showed Freelance after the option click. It is not a documented id map.

Second search, stopped before Reset. Parent `ev_909fc8e850ca2efe9618d49f670a9d3b77dbf681e434d8b190b4fca959ed0d78`. Summary `ev_ddd317317a29361894ecc62e7e92a92bc30e13c24cb14269c3c5772e99291d90`. Transactions `ev_779863b0550d6504da6a60d3c9dbdb800465fe3f31a232f061aec3606b343342`. Body `ev_12345e3d3f8d1a4dc4e92878c3f3dbfd49014f76a85eb03ca1c9babe2fc217b7`.

| Fact | Value | Class |
|---|---|---|
| Unfiltered response on that reload | `meta.total` 122, `data` length 50, content type `application/json` | Observed |
| Filtered response | `empStatusId=1`, status 200, content type `application/json`, `data` length 0, `meta.total` 0, `rels` empty | Observed |

Pagination. The other employee query parameters stayed unchanged. Status 200. The page URL was unchanged.

| Action | Evidence | Query change | Class |
|---|---|---|---|
| Button `2` | Parent `ev_5a2efb5c3295313a875677d1169684f877abd3aa9df7def44089f7d61eca3506`. Summary `ev_22d9dbc7db269e548b3a7fc773b4db065be5f6951ad1d9e9cc86692212fc531a`. Transactions `ev_05566f07f6331440c3662de6c0f9b4f9638b246b4fe304e31b776b686cdb5501` | `offset=50` | Observed |
| Button `3` | Parent `ev_d3d946d527e1e766e588f3f90fb91b3e6a37fb06feef41ed78f36600b3551a54`. Summary `ev_65335b80e2c3b383a90017eca8febc3c8c1d01a9e564bdcde57914a892f987ff`. Transactions `ev_19b1c588f71cd525f8a96dbff77d998b99b905fb107737001acb82ce82794e75` | `offset=100` | Observed |

### Redirect to login

Parent `ev_c90cf1ef6d7ba36260d6914feda341be6bc4a518bb0bfbf6bff2a2d3053ad625`. Summary `ev_6aa265a8761128e87131a9117f32d46ed43771cb9385e4ba869e824a4ef2636b`. Transactions `ev_ec363d8c0fa1c5d6add5e78260b6562e0628ac9b3cdac99ffa946b85a5e29c70`.

| Method | Path | Status | Class |
|---|---|---|---|
| GET | `/web/index.php/pim/viewEmployeeList` | 302 at `2026-11-15T12:39:42.502Z` | Observed |
| GET | `/web/index.php/auth/login` | 200 | Observed |

The `location` header name was present on the 302. Its value was not retained. The login URL is the next document request.

## Derived

| Item | Basis |
|---|---|
| `empStatusId=1` is the Freelance employment-status row | Status payload id and name, plus the control text after the option click |

## Unknown

| Item | Why it is unknown |
|---|---|
| Employee Name, Employee Id, Job Title, Sub Unit, and Supervisor Name request parameters | Those filters were not submitted |
| A request that changes `sortField` or `sortOrder` after a header click | The two completed header clicks sent only the initial employee request |
| Records-per-page parameter | No such control was in the inspected accessibility trees |
| Employee-detail request | No detail request was observed |
| Response bodies for the section 8 leave calls and for `core/i18n/messages` | Not retained |
| Query values for the section 8 leave calls | Not retained |
| Populated JSON types for job, status, subunit, and supervisor on page 2 | That page's JSON was not decoded |
| Why the later reload of the employee list returned 302 | The source does not establish whether a session cookie was absent, expired, or dropped |
| Cookies, tokens, and credential values | Not retained, and not required for this register |

## Redaction check

The source says personal row text, the account label, cookies, and tokens were not copied. This register copies status option names and field names only. It does not copy employee name strings, employee id strings, job-title strings, subunit strings, cookies, tokens, or the 302 location value.

## Older register

`evidence/api-observations.md` still says method, path, and status were not captured. That statement describes the older inspects. It is not edited by this file. The exchanges above are the later observations.
