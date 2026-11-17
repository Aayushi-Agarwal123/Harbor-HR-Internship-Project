# Requirements

Tags: OBSERVED means a live REA record contains the fact. PROPOSED means the local prototype needed a behavior that was not observed. INFERRED is not used for these items.

| ID | Tag | Requirement |
|---|---|---|
| R-01 | OBSERVED | The public login screen has a heading `Login`, textboxes `Username` and `Password`, and a button `Login`. |
| R-02 | OBSERVED | The login form's action URL is `/web/index.php/auth/validate`. |
| R-03 | OBSERVED | The login screen shows a username hint `Username : Admin` and a separate password hint. |
| R-04 | PROPOSED | Local sign-in accepts only the synthetic account and never calls the live demo. |
| R-05 | OBSERVED | After a session exists, a sidebar lists Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz, in that order. |
| R-06 | OBSERVED | The dashboard heading text is `Dashboard`, and an `Upgrade` button and a `Search` textbox are present. |
| R-07 | PROPOSED | Sidebar entries other than Dashboard and PIM keep their observed labels and open a page that names the module and says it is outside the current prototype. Leave is optional phase 2. Admin is out of scope. |
| R-08 | OBSERVED | The employee list heading is `Employee Information` at `/web/index.php/pim/viewEmployeeList`, with the column headers and filter labels in `evidence/employee-list.redacted.json`. |
| R-11 | PROPOSED | Local search filters synthetic rows. The live Freelance status search returned no records. Name, id, job, subunit, supervisor, and Include filtering were not live-verified. |
| R-14 | PROPOSED | A local detail view and edit form persist first name, last name, job, status, and sub unit. Signed-in My Info sections were later observed. A selected list-row screen was not opened. This form is not that screen. |
| R-15 | PROPOSED | Login, logout, and employee routes require the local session cookie. |
| R-12 | OBSERVED | The employee list shows `(127) Records Found` and pager buttons `1`, `2`, and `3`. Page size and the selected page were not labeled. |
| R-13 | OBSERVED | The Add Employee page is `/web/index.php/pim/addEmployee`, with the fields and buttons in `evidence/add-employee.redacted.json`. It was not submitted. |
| R-09 | OBSERVED | Quick Launch exposes buttons named Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet. Quick Launch itself was not clicked. Later inspections opened Apply (`/leave/applyLeave`), My Leave (`/leave/viewMyLeaveList`), Assign Leave (`/leave/assignLeave`), Employee Timesheets (`/time/viewEmployeeTimesheet`), and My Timesheets (`/time/viewMyTimesheet`). |
| R-10 | PROPOSED | Forgot-password is a local explanation page. The live href was not retained. |
| R-16 | PROPOSED | The employee list can sort by id, name, job, status, or sub unit, and can show 10, 25, or 50 rows. No records-per-page control was observed, and column sorting was not clicked. |
| R-17 | PROPOSED | A local Delete button removes one employee after confirmation. The live row-action glyphs were not activated. |
| R-18 | PROPOSED | Report titles are stored locally. The local filter keeps a row only for the exact hint `PIM Sample Report`. Live Reports Search and Reset were not completed. |

## Non-functional

- The prototype must not request `opensource-demo.orangehrmlive.com`.
- Saved evidence must not contain the printed password hint, cookies, or tokens.
- Visual design is independent. OrangeHRM logo files are not copied.

No requirement tag changed after the registration repair. The live login result, logout, employee details, and OrangeHRM HTTP exchanges are still not OBSERVED.

This file is the observation register. It has 18 rows: 9 OBSERVED and 9 PROPOSED. It does not use PASS, PARTIAL, NOT VERIFIED, or OUT OF SCOPE. Those totals live only in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`: 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, 3 OUT OF SCOPE, 57 rows. `docs/REMAINING_MODULES.md` records module status and cites those totals.
