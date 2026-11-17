# Harbor HR module audit

Date: 2026-11-16. This is an evidence-to-implementation audit of the existing project. No new OrangeHRM capture was made. No application source, database, or original evidence file was changed.

## Scope

- Target: Harbor HR at `C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc`, compared with retained OrangeHRM inspection records.
- Evidence used: `docs/screen-inventory.md`, `docs/requirements.md`, `docs/FINAL_REQUIREMENT_TRACEABILITY.md`, `frontend/src/data/moduleLandings.ts`, and the backend routers.
- Not done: no new REA investigation. REQ-003 remains Not Verified, so the hosted demo was not opened.

Classes below mean: **Observed** is a recorded fact, **Derived** is a calculation the inspection recorded, **Inferred** is a candidate and not a workflow, **Unknown** was not recorded. **Design** is a local Harbor choice with no Evidence ID.

## Comparison

| Module | Original OrangeHRM | Observed evidence | Existing Harbor HR | Missing, and why it is not built yet |
| --- | --- | --- | --- | --- |
| Login | Public login screen | Observed. Heading `Login`, fields `Username` and `Password`, button `Login`, `Forgot your password?`. Form action `/web/index.php/auth/validate`. Evidence `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Success and failure text were not produced. | Local login and logout. PBKDF2-SHA256, HttpOnly `harbor_session`, protected API. Demo user `demo_admin` exists in `harbor`. Password is `HARBOR_LOCAL_PASSWORD` in ignored `.env`. | Live success, failure, and forgot-password destination. Unknown. |
| Dashboard | Signed-in dashboard | Observed. Heading `Dashboard`, sidebar order, Search, Upgrade, Quick Launch names, widget titles, Time at Work text, My Actions counts, empty leave-today text, sub-unit and location category names. Evidence `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`. Shortcuts were not clicked. | Heading, session name, disabled Upgrade, disabled Search, Quick Launch routes into Leave and Time, employee count and sub-unit counts from PostgreSQL, leave-today and Buzz posts from those APIs. Punch times and location distribution stay inactive. | Live punch action and location chart values. Unknown. |
| PIM | Employee list, add, reports, and profile sections | List, one Freelance search, Reset, Add Employee fields, and five report names are Observed. Four signed-in profile sections were opened. Save, row glyphs, Configuration, and the remaining profile tabs were not used. | List, search, add, edit, detail, reports, and delete against PostgreSQL `harbor`. Several of those writes are Design, not live observations. | Configuration menu, unopened profile tabs, row-glyph actions, and whether Save enforces the asterisk. Unknown. |
| Admin | System Users landing | Observed landing only. `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b`. Filters and columns named. `(16) Records Found` is Derived from that visit. Add and configuration were not opened. A 2026-11-16 re-read collected no new evidence. See `docs/evidence/ADMIN-module-inspection.md`. | `/admin` shows the observed heading, breadcrumb, filters, columns, and top labels. Search, Reset, Add, and the other top labels are disabled. No user rows are stored. | Search, Reset, pagination, sorting, user rows, add-user fields, and settings pages. Unknown. Previously out of scope as REQ-027. |
| Leave | Leave List landing | Observed landing only. `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400`. Filters, columns, and empty text `No Records Found` are named. Other leave links were not opened. | `/leave` keeps those labels. Search, create, edit, and delete are proposed Harbor HR records. Apply and Assign Leave open that form. My Leave filters it to the seeded profile. Entitlements, Reports, and Configure stay disabled. Leave balance stays blank. See `docs/REMAINING_MODULES.md`. | Unopened leave pages. Unknown. |
| Time | Timesheets landing | Observed landing only. `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092`. Headings, breadcrumb, columns, and View. View was not clicked. | `/time` keeps those labels and adds a proposed Harbor HR timesheet workflow. See `docs/TIME_TIMESHEETS.md`. Attendance and project pages were not added. | Attendance and project pages. Unknown. The working timesheet form is Design, not an observed OrangeHRM save flow. |
| Recruitment | Candidates landing | Observed landing. `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417`. Filters, columns, and `(15) Records Found`. Vacancies was not opened. Row values were not copied. | `/recruitment` keeps the candidate columns and adds a proposed Vacancies list. Search, create, edit, and delete are proposed Harbor HR records. The candidate Job Title filter stays disabled. | Vacancy page and hiring workflow. Unknown. |
| My Info | Signed-in profile | Observed as the same four PIM sections, not as a separate product. Evidence starts at `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`. Save was not clicked. | Opens the four observed sections for the seeded employee. Name, job title, sub unit, and employment status save through the employee record. Contact details and emergency contacts have proposed saves for that employee. Unstored personal fields stay inactive. | Unopened tabs. Unknown. The local person is Design. |
| Performance | Employee Reviews landing | Observed landing. `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b`. Filters, columns, breadcrumb, and empty text `No Records Found`. Trackers were not opened. | `/performance` keeps those columns. Search, create, edit, and delete are proposed Harbor HR reviews. My Trackers and Employee Trackers store proposed tracker rows. Configure stays disabled. | Evaluation and approval workflow. Unknown. |
| Directory | Directory landing | Observed landing. `ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1`. Three filters and `(155) Records Found`. Card contents were not copied. | `/directory` searches the local employees by name and job title. Location stays disabled because no location is stored. | Observed card layout. Unknown. |
| Maintenance | Administrator Access gate | Observed. `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd`. Credential gate. Cancel returned to the dashboard. Confirm was not clicked. | Gate shows the local username disabled. Cancel returns to `/dashboard`. Confirm checks the signed-in password and does not purge data. | Confirm result and the purge form behind the gate. Unknown. |
| Claim | Employee Claims landing | Observed landing. `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c`. Filters, columns, top labels, and `(3) Records Found`. View Details was not clicked. Row values were not copied. | `/claim` keeps those columns. Search, create, edit, and delete are proposed Harbor HR records. Status is the Harbor HR label `Submitted` or `Cancelled`. Submit Claim and Assign Claim open that form. My Claims filters it to the seeded profile. There is no approval or payment action. | Approval and payment. Unknown. |
| Buzz | Buzz landing | Observed landing. `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43`. Share Photos, Share Video, Post, and the textbox `What's on your mind?`. Post was not clicked. Feed text was not copied. | `/buzz` stores proposed text posts. Share Photos and Share Video stay disabled. | Upload, comments, and reactions. Unknown. |

## What already works

These are local Harbor behaviors. They are not a claim that the live demo was seen doing the same thing.

- Login, logout, session cookie, and rejected credentials.
- Dashboard shell and PIM Employee List, Add, Edit, Reports, and local delete.
- Employee and report rows persist in PostgreSQL database `harbor`.
- Direct routes and refresh for every sidebar label. Admin, Leave, Time, Recruitment, Performance, Directory, Claim, and Buzz show their observed landings. Unverified controls on those landings are disabled. Maintenance and My Info show the inspected gate and the four observed profile sections. No sidebar route remains a placeholder.

## Supported next work

The two previously supported items are now present in the frontend:

1. Maintenance Cancel returns to the dashboard. Evidence `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd`. Confirm stays disabled. No purge form was added.
2. My Info opens Personal Details, Contact Details, Emergency Contacts, and Job for the seeded employee Asha Sharma. The live account was not copied. Unopened tabs were not added.

## Blocked

Full create, update, delete, validation, pagination, and permissions for Admin, Leave, Time, Recruitment, Performance, Directory, Claim, and Buzz. The checked records are the landing Evidence IDs in the table. The missing fact for each one is the unopened page: its fields, required messages, and the result of Save. A landing filter label does not identify the search request or the result rows.

Role-based permissions are blocked. Harbor has one local admin account. No second role was inspected.

New live capture is also blocked until REQ-003 is resolved. The hosted demo's own usage terms were not found. The vulnerability disclosure policy does not authorize scanning or automated capture.

## Design, unverified

Local sort, page sizes 10/25/50, local delete, the PBKDF2 hash, and the exact report filter `PIM Sample Report` are Harbor decisions. They stay labeled Design. They are not OrangeHRM observations.

Synthetic employees already in `harbor` are test data. They are not copies of the live employee list. New modules must not be filled with invented leave requests, timesheets, candidates, or claims presented as inspected records.

## Acceptance already met

- Login page shows `Login`, `Username`, `Password`, and `Login`. Observed. Evidence `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`.
- Sidebar lists the twelve observed names in the observed order. Observed. Evidence `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`.
- Employee list shows the observed filter labels and column headers. Observed. Evidence `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`.

## Missing information

Each question needs a read-only inspection of that page, with headings, fields, columns, and buttons recorded, and with Save left unclicked unless a later decision allows a write.

A later Harbor HR pass added proposed local records for Leave, Recruitment, Performance, Directory, and Claim. A following pass added vacancies, contact details, emergency contacts, performance trackers, claim status labels, maintenance password confirmation, and Buzz text posts. Those records do not close the unknown OrangeHRM pages listed below. See `docs/REMAINING_MODULES.md`.

- Admin Search, Reset, pagination, sorting, Add, and the other Admin pages. Blocks admin behavior beyond the landing labels. Checked `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b`. A 2026-11-16 browser-target check found no session on `127.0.0.1:9222`. REQ-003 still blocks a new demo visit.
- Leave Apply, My Leave, Assign Leave, Entitlements, Reports, and Configure. Blocks leave workflows. Checked `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400`.
- Timesheet View. Blocks time entry. Checked `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092`.
- Recruitment Vacancies and the candidate table columns. Blocks recruitment. Checked `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417`.
- Unopened profile tabs and Save validation. Blocks My Info completion. Checked `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`.
- Performance trackers. Blocks performance. Checked `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b`.
- Directory result layout. Blocks directory search. Checked `ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1`.
- Maintenance Confirm. Blocks the purge screen. Checked `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd`. Confirm must not be clicked on the live demo.
- Claim Submit, My Claims, and View Details. Blocks claims. Checked `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c`.
- Buzz Post. Blocks the feed. Checked `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43`.

## Closeout, 2026-11-16

Re-verified in `docs/ORANGEHRM_FINAL_CLOSEOUT.md`. Live demo observation was blocked: `list_browser_targets` at `127.0.0.1:9222` returned `endpoint_unreachable`. No module status below changed.

## Execution, 2026-11-16

No original REA evidence was edited. No new OrangeHRM capture was made. The running API was restored to PostgreSQL `harbor`.

| Requirement | Evidence | Implementation | Test | Result | Limitation |
|---|---|---|---|---|---|
| Local login, invalid login, logout, protected routes | Login labels `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Success and logout were not observed on the demo. | `LoginPage.tsx`, `backend/app/routers/auth.py`, `backend/app/security.py` | TC-01, TC-02, TC-09, TC-10 | Playwright 9 passed, 37.0s, on SQLite `harbor-e2e.db`. In-memory API tests 4 passed, 7.77s. | Demo login and logout remain unobserved. |
| PIM list, search, empty, reset, pagination, add, edit, reload | List `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`. Freelance search and page 2 are in the 2026-11-14 interaction note. Details screen was not captured. | `EmployeeListPage.tsx`, `EmployeeForm.tsx`, `EmployeeDetailPage.tsx`, `backend/app/routers/employees.py` | TC-03 through TC-08 | Passed in the same Playwright run. | Name search, sort, page size, and delete stay local design. |
| PostgreSQL write, restart, read | Not an OrangeHRM schema. | `backend/tests/test_postgres_integration.py` | 1 passed, 22.64s | Create and edit survived an API restart on `harbor_test` only. | `harbor` was not rewritten. Docker Compose was not started. |
