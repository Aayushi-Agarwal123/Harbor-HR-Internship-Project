# REQ-043 method, path, and status

Date: 2026-11-15.

Acceptance text: record network method, path, and status when observed.

This note copies those three fields from `docs/evidence/REQ-009-api-register.md`. Each row was checked against `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md`. No live request was made. `evidence/api-observations.md` was not edited.

Derived information is separate. `empStatusId=1` matching the Freelance label is derived in the source. It is not an HTTP status.

## Observed

Transaction view for the first two tables: `ev_06ca62cd02a49471944f11be44dfa1a1cbbebaaddf68a059e1002ed38c591c5a`, parent `ev_767bff1d6c8a942d30c5d213be4f3d691345376b21890d14699dd5551b054563`.

| Method | Path | Status |
|---|---|---|
| GET | `/web/index.php/leave/viewLeaveList` | 200 |
| GET | `/web/index.php/api/v2/leave/employees/leave-requests` | 200 |
| GET | `/web/index.php/api/v2/leave/leave-periods` | 200 |
| GET | `/web/index.php/api/v2/leave/workweek` | 200 |
| GET | `/web/index.php/api/v2/leave/leave-types` | 200 |
| GET | `/web/index.php/api/v2/leave/holidays` | 200 |
| GET | `/web/index.php/pim/viewPimModule` | 302 |
| GET | `/web/index.php/pim/viewEmployeeList` | 200 |
| GET | `/web/index.php/api/v2/pim/employees` | 200 |
| GET | `/web/index.php/api/v2/admin/employment-statuses` | 200 |
| GET | `/web/index.php/api/v2/admin/job-titles` | 200 |
| GET | `/web/index.php/api/v2/admin/subunits` | 200 |
| GET | `/web/index.php/core/i18n/messages` | 304 |

Later employee body. Transactions `ev_bbb281c65bf03d9232557bf743811272787bd73e153d385e6dd848ac13d21a53`. Body `ev_0619ed53c02af25c932e29ea5588eba43cb59e82044591b0b4915074b3659151`.

| Method | Path | Status |
|---|---|---|
| GET | `/web/index.php/api/v2/pim/employees` | 200 |

Section 13 writes three paths without the `/web/index.php` prefix. The statuses below are the ones printed with that spelling. They are not a second set of statuses.

| Method | Path as written | Status |
|---|---|---|
| GET | `/api/v2/admin/employment-statuses` | 200 |
| GET | `/api/v2/admin/job-titles` | 200 |
| GET | `/api/v2/admin/subunits` | 200 |

Search, Reset, and pagination name the employee query and status 200. The path string is the employees path from the body section, not a new path.

| Step | Method | Path | Status | Evidence |
|---|---|---|---|---|
| Initial load | GET | `/web/index.php/api/v2/pim/employees` | 200 | `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060` |
| Search | GET | `/web/index.php/api/v2/pim/employees` | 200 | same transaction view |
| Reset | GET | `/web/index.php/api/v2/pim/employees` | 200 | same transaction view |
| Page button `2` | GET | `/web/index.php/api/v2/pim/employees` | 200 | `ev_05566f07f6331440c3662de6c0f9b4f9638b246b4fe304e31b776b686cdb5501` |
| Page button `3` | GET | `/web/index.php/api/v2/pim/employees` | 200 | `ev_19b1c588f71cd525f8a96dbff77d998b99b905fb107737001acb82ce82794e75` |

Second filtered response. Transactions `ev_779863b0550d6504da6a60d3c9dbdb800465fe3f31a232f061aec3606b343342`. Body `ev_12345e3d3f8d1a4dc4e92878c3f3dbfd49014f76a85eb03ca1c9babe2fc217b7`.

| Method | Path | Status |
|---|---|---|
| GET | `/web/index.php/api/v2/pim/employees` | 200 |

The same capture's unfiltered reload records `meta.total` 122 and a content type. It does not restate an HTTP status. No status is added here.

Redirect. Transactions `ev_ec363d8c0fa1c5d6add5e78260b6562e0628ac9b3cdac99ffa946b85a5e29c70`.

| Method | Path | Status |
|---|---|---|
| GET | `/web/index.php/pim/viewEmployeeList` | 302 |
| GET | `/web/index.php/auth/login` | 200 |

## Derived, not an HTTP status

`empStatusId=1` is the Freelance row because that id and name were in the status payload and the control showed Freelance. The source marks this derived. The HTTP status of that search remains the observed 200 above.

## Not observed, so not recorded

No method, path, or status is recorded for Employee Name, Employee Id, Job Title, Sub Unit, or Supervisor Name. Those filters were not submitted. No employee-detail request was observed. The header clicks did not add an employee request with a new status. A records-per-page request was not observed.
