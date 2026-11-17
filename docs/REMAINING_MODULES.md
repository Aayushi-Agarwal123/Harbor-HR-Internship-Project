# Remaining Harbor HR modules

These pages keep the observed OrangeHRM landing labels. Saving records is proposed Harbor HR behavior. It is not an observed OrangeHRM save.

Attendance and Projects are not separate sidebar routes. They were not added. Admin stays a disabled landing.

## Leave

Evidence `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400`.

Observed later: Leave List filters and columns, empty text `No Records Found`. Apply Leave has no fields and shows `No Leave Types with Leave Balance` (`ev_6bba3523be55168510070545ba5ae2bdf2c34be3fac0ec67777de82f922c7521`). My Leave List filters include Show Leave with Status values Rejected, Cancelled, Pending Approval, Scheduled, and Taken (`ev_2217b0b987f3bd75cb88f5cf03b07ce07b5359493eeb88b7112a7fe8f0e70b85`). Assign Leave shows Employee Name, Leave Type, Leave Balance `0.00 Day(s)`, From Date, To Date, Comments, and Assign (`ev_89af69caaf97f044e76e52d1ab3e9261acf9e73e870bd9a1f63f362b9346aaba`). Assign was not clicked. Entitlements, Reports, and Configure were not opened.

Harbor HR: Apply Leave shows that empty state and does not save. Assign Leave shows the observed fields, keeps Assign disabled, and does not save. Leave List can still store a proposed request. My Leave filters the list to Asha Sharma and shows the observed status names. Include Past Employees stays an inactive unchecked checkbox. Sub Unit options were not opened. Entitlements, Reports, and Configure stay disabled.

## Recruitment

Evidence `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417`.

Observed: Candidates filters and columns. Vacancies was not opened. Row values were not copied.

Harbor HR: `/api/candidates` stores name, vacancy, hiring manager, application date, status, keywords, and method. Search covers those stored fields and the application dates. Job Title stays disabled on the candidate list because candidate rows were not copied. Status and method choices were not recorded, so the lists are Harbor HR choices. Vacancies is a separate proposed list at `/api/vacancies` with a recorded job title, vacancy name, hiring manager, and status Open or Closed.

## My Info

Evidence starts at `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`.

Observed: Personal Details, Contact Details, Emergency Contacts, and Job. Save was not clicked. Other tabs were not opened.

Harbor HR: the page opens those four sections for the seeded local employee. First, middle, and last name, job title, sub unit, and employment status save through the existing employee record. Contact details and emergency contacts save through proposed `/api/employees/{id}/contact` and `/api/employees/{id}/emergency-contacts` for that same employee. License, nationality, date of birth, gender, blood type, attachments, and the unopened tabs stay inactive.

## Performance

Evidence `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b`.

Observed: Employee Reviews filters, columns, and empty text `No Records Found`. Configure, My Trackers, and Employee Trackers were not opened.

Harbor HR: `/api/reviews` stores the employee, period, due date, and a Harbor HR status. Search uses employee, job title, sub unit, include, status, and period dates. My Trackers and Employee Trackers store proposed tracker rows at `/api/trackers`. My Trackers is limited to the seeded profile. Configure stays disabled.

## Directory

Evidence `ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1`.

Observed: Employee Name, Job Title, and Location. Search and Reset were not clicked. Card contents were not copied.

Harbor HR: name and job title search the existing employees. Location stays disabled because no location is stored. A card shows the stored employee fields.

## Maintenance

Evidence `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd`.

Observed: a credential gate. Cancel returned to the dashboard. Confirm was not clicked.

Harbor HR: Cancel returns to the dashboard. Confirm checks the signed-in password and reports that access is confirmed. It does not open or run a purge. A wrong password is rejected.

## Claim

Evidence `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c`.

Observed: Employee Claims columns and filters. Submit Claim, My Claims, and Assign Claim were not opened. Row values were not copied.

Harbor HR: `/api/claims` stores a reference, employee, event, description, currency, date, status, and amount. Status is the Harbor HR label `Submitted` or `Cancelled`. Search covers reference, event, status, and submitted dates. There is no approval or payment action. Submit Claim and Assign Claim open the same proposed form. My Claims filters that list to the seeded profile.

## Buzz

Evidence `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43`.

Observed: the textbox and Share Photos, Share Video, and Post. None was clicked.

Harbor HR: Post stores a text post at `/api/buzz`. Share Photos and Share Video stay disabled because no media upload was observed and no media file store was added.

## Verification on 2026-11-16

In-memory and `harbor_test` pytest: 8 passed, 0 failed, 41.97s. The PostgreSQL test used `harbor_test` and left `harbor` employee and timesheet counts unchanged.

`npx tsc --noEmit` exited 0. `npx vite build` exited 0 in 3.16s: `dist/assets/index-Ci4D7Ulp.css` 9.19 kB and `dist/assets/index-edNFwO0y.js` 294.20 kB.

Playwright against the running PostgreSQL app, `tests/e2e/modules.spec.ts`: 1 passed, 10.9s. It created and deleted a leave request, candidate, review, and claim, searched the directory, edited and restored the seeded profile middle name, confirmed Maintenance Confirm and Buzz Post stay disabled, and opened PIM and Time.

The full Playwright suite on the isolated SQLite database then passed 11 tests in 51.4s.

After that run, `harbor` held 55 employees, 0 timesheets, 0 leave requests, 0 candidates, 0 reviews, and 0 claims. The seeded middle name was empty again.

## Workflow completion on 2026-11-16

In-memory pytest: 8 passed, 0 failed, 8.92s. The workflow test was re-run after empty contact rows were removed on save: 1 passed, 3.98s. `harbor_test` pytest: 1 passed, 14.01s.

`npx tsc --noEmit` exited 0. `npx vite build` exited 0 in 2.26s: `dist/assets/index-Ci4D7Ulp.css` 9.19 kB and `dist/assets/index-BcyZvEE7.js` 304.91 kB.

Playwright `tests/e2e/modules.spec.ts` against the running PostgreSQL app: 1 passed, 9.3s. It exercised leave, candidates, vacancies, reviews, trackers, directory search, personal details, contact details, emergency contacts, a rejected maintenance password, claims, a Buzz text post, and then opened Admin, Time, and PIM. Share Photos stayed disabled. The created rows were deleted.

After that run, `harbor` held 55 employees and 0 rows in timesheets, leave requests, candidates, reviews, claims, contacts, emergency contacts, vacancies, trackers, and Buzz posts. The seeded middle name was empty. The IDE browser was left on Dashboard, which showed `Local employees: 55`.

## Consolidation on 2026-11-16

Full backend pytest: 9 passed, 0 failed, 26.94s, including `harbor_test`. `npx tsc --noEmit` exited 0. `npx vite build` exited 0 in 2.81s. The complete isolated Playwright suite passed 11 tests in 41.4s. That suite is the full-suite result. The earlier single-file PostgreSQL Playwright run is not a substitute for it.

Attendance Employee Records, My Records, and Configuration are read-only screens inside Time. Punch In/Out, Reports, and Project Info stay disabled. Admin user administration stays out of scope.

## Completion sprint on 2026-11-16

`npx tsc --noEmit` exited 0. `npx vite build` exited 0 in 5.21s: `dist/assets/index-D_PdIJzT.css` 10.78 kB and `dist/assets/index-CGfDi_2_.js` 308.11 kB.

Backend pytest, including `harbor_test`: 9 passed, 0 failed, 77.53s. Playwright `npx playwright test`: 11 passed, 0 failed, 1.2m, on isolated SQLite.

| Module | Status | Remaining limit |
|---|---|---|
| Login | PASS | Live demo login and logout were not submitted. |
| Dashboard | PARTIAL | Search, Upgrade, punch times, and location values stay inactive. |
| PIM | PASS | Unopened profile tabs and row glyphs stay inactive. |
| Time / Timesheets | PARTIAL | View, Edit, and Submit stay disabled. No approve or reject action. |
| Attendance | PARTIAL | Screens are visible. View, Save, and Punch In/Out do not run. No attendance rows are stored. |
| Leave | PARTIAL | Apply does not save. Assign does not save. Entitlements, Reports, and Configure stay disabled. |
| Recruitment, My Info, Performance, Directory, Maintenance, Claim, Buzz | PARTIAL | Proposed local records remain. Unopened actions stay disabled. |
| Admin | OUT OF SCOPE | Landing labels only. No users, roles, or settings are stored. |
| Project Info | NOT VERIFIED | The menu label was visible and the page was not opened. On 2026-11-16, `list_browser_targets` at `127.0.0.1:9222` was `endpoint_unreachable`, so the page was not inspected. This is not REQ-055. |

These module rows are not the 57-requirement totals. Those totals are 40 PASS, 13 PARTIAL, 1 NOT VERIFIED, and 3 OUT OF SCOPE in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`. REQ-003 is PARTIAL and does not permit a new capture. REQ-055 is the remaining NOT VERIFIED requirement. `docs/requirements.md` is the separate 18-row OBSERVED/PROPOSED register.

Overall handoff: CONDITIONALLY READY. A new live capture is still not authorized.
