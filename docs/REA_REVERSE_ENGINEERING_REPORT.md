# REA reverse-engineering report

Date: 2026-11-16. Classes used here: **Observed** means a recorded REA or browser fact. **Derived** means a count or summary the inspection itself recorded. **Inferred** means a candidate relationship, not a watched workflow. **Unknown** was not established. **Proposed** is a Harbor HR design with no Evidence ID as proof of the live save.

The host studied was `https://opensource-demo.orangehrmlive.com`. Account labels and row values were not copied into this report. The detailed session note is `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. Later page files under `evidence/` supplement the "not opened" list in that note.

## What the guide required

Observe normal UI behavior, keep a screen inventory and navigation map, record method, path, and status when a request was seen, and do not infer hidden APIs, password hashing, or database tables. Do not save on the shared demo. Confirm terms before automated scenario capture.

## Login

| Item | Record |
|---|---|
| Screen | Login |
| URL | `/web/index.php/auth/validate` is the observed form action. The page opened for the terms check was `/web/index.php/auth/login`. |
| Observed controls | Heading `Login`, Username, Password, button `Login`, `Forgot your password?` |
| Not observed | Success text, failure text, and logout. Login was not submitted. |
| Evidence | `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Terms-link check: `docs/evidence/REQ-003-demo-terms-check.md`. |

## Dashboard

Observed heading `Dashboard`. Sidebar order: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz. Widgets: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location. Quick Launch names: Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet. Those buttons were not clicked on the first dashboard inspect. Search and Upgrade were visible. Evidence `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22` and the 2026-11-15 inspect `ev_1f13c7c91dd5b277aa84b42deeb3c735f24d3a85157b837624972a0db17ab4a8`. Dashboard GETs for time-at-work, action-summary, shortcuts, buzz feed, leaves, subunit, and locations returned 200. Response bodies were not decoded. Punch values and location chart values are Unknown.

## PIM

Employee List URL `/web/index.php/pim/viewEmployeeList`. Inspect `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493` and later `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756`. Filters include Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title, and Sub Unit. Columns include Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor, and Actions. A Freelance employment-status search returned `No Records Found`, and Reset was used. That is recorded in the 2026-11-14 interaction note. Name, id, job, subunit, and supervisor searches were not submitted. Header clicks did not change `sortField` or `sortOrder`. Cell values were not saved. Record counts differed by visit (`127`, later `146`). Those counts are Derived for that visit only.

Add Employee URL `/pim/addEmployee`. Inspect `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b`. Labels include First Name, Middle Name, Last Name, Employee Id, Create Login Details, Choose File, Cancel, and Save. Save was not clicked.

Reports URL `/pim/viewDefinedPredefinedReports`. Inspect `ev_33e051ec8aa002ec8039587d8e6c4f20b37b147f5d4c4a4bca32f2e513284e27`. Heading Employee Reports. Visible names included PIM Sample Report and All Employee Sub Unit Hierarchy Report. Search and Reset were not clicked. Two other report names were not extracted.

My Info opened `/pim/viewPersonalDetails/empNumber/7`, evidence `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`. This was the signed-in profile, not a list-row selection. Personal Details, Contact Details, Emergency Contacts, and Job were opened. Save was not clicked. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened.

## Leave

Landing `/leave/viewLeaveList`, inspect `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400`. Later list inspect `ev_342002a3508a74d919181cd04993486a157dbce4cafc0e66ed198bf35b801f9e`. Columns: Date, Employee Name, Leave Type, Leave Balance (Days), Number of Days, Status, Comments, Actions. Empty text `No Records Found`. Leave List status text included `-- Select --` and `Pending Approval`.

Later files, all Observed as displayed and not submitted:

| Screen | URL | Evidence | What was seen | What was not done |
|---|---|---|---|---|
| Apply Leave | `/leave/applyLeave` | `ev_6bba3523be55168510070545ba5ae2bdf2c34be3fac0ec67777de82f922c7521` | Text `No Leave Types with Leave Balance`. No form fields. | No submit. |
| My Leave List | `/leave/viewMyLeaveList` | `ev_2217b0b987f3bd75cb88f5cf03b07ce07b5359493eeb88b7112a7fe8f0e70b85` | From Date, To Date, Show Leave with Status values including Rejected, Cancelled, Pending Approval, Scheduled, Taken. Empty `No Records Found`. | Filters were not changed. Search was not submitted. |
| Assign Leave | `/leave/assignLeave` | `ev_89af69caaf97f044e76e52d1ab3e9261acf9e73e870bd9a1f63f362b9346aaba` | Employee Name, Leave Type, Leave Balance `0.00 Day(s)`, From Date, To Date, Comments, button Assign. | Assign was not clicked. Leave Type options were not opened. |

Entitlements, Reports, and Configure were visible text and were not opened.

## Time, Attendance, and Project Info

Employee Timesheets URL `/time/viewEmployeeTimesheet`, inspect `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092`. Later menu record `ev_f21e12e4b410cfe749a8aba59cdde03f27cb7d800e00431f2e68d9d05f4e62d7`. Observed menu items My Timesheets and Employee Timesheets. Headings Select Employee and Timesheets Pending Action. Columns Employee Name, Timesheet Period, Actions. View was not clicked. Cell values were not saved.

My Timesheet URL `/time/viewMyTimesheet`, inspect `ev_b2964dacd0d97287223046488621ca652a325b2375b113426e34a6b85e2a273a`. Observed period textbox, text `Status: Not Submitted`, buttons Edit and Submit. Neither was clicked. Table headers included Project, Activity, day columns, and Total. Cell values were not saved.

Attendance menu items My Records, Punch In/Out, Employee Records, and Configuration were observed. Punch In/Out was not opened.

| Screen | URL | Evidence | Not done |
|---|---|---|---|
| Employee Attendance Records | `/attendance/viewAttendanceRecord` | `ev_447ce00756b52a7807fd89457201b3bfa8e95ef93d71b6d3b41145f2a6c76d20` | View not clicked. Cell values not saved. |
| My Attendance Records | `/attendance/viewMyAttendanceRecord` | `ev_e9f5a940406b49657cc689d00eee9173ab3c02f94d3fa3b2cd5314e24b3e79ac` | Punch values not saved. |
| Attendance Configuration | `/attendance/configure` | `ev_128a904448936a1bc6394d57b8de44cc5381c85fe96eba7b51c9233655b07cbd` | Three checkboxes were checked. Save was not clicked. |

Project Info was top-bar text on Time pages and was not opened. Unknown.

## Recruitment

URL `/recruitment/viewCandidates`, inspect `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417`. Heading Candidates. Derived count `(15) Records Found` for that visit. Filters and columns are in the inspection report. Vacancies was not opened. Row values were not copied. Status and method option lists were not opened.

## Performance

URL `/performance/searchEvaluatePerformanceReview`, inspect `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b`. Heading Employee Reviews. Empty text `No Records Found`. My Trackers, Employee Trackers, and Configure were not opened.

## Directory

URL `/directory/viewDirectory`, inspect `ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1`. Filters Employee Name, Job Title, and Location. Derived count `(155) Records Found`. Search and Reset were not clicked. Card contents were not copied.

## Maintenance

URL `/maintenance/purgeEmployee`, inspect `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd`. Observed credential gate, not a purge form. Cancel returned to `/dashboard/index`. Confirm was not clicked. The purge screen is Unknown.

## Claim

URL `/claim/viewAssignClaim`, inspect `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c`. Heading Employee Claims. Derived count `(3) Records Found`. Status text `Submitted` was visible. Submit Claim, My Claims, Assign Claim, and View Details were not opened. Row values were not copied.

## Buzz

URL `/buzz/viewBuzz`, inspect `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43`. Buttons Share Photos, Share Video, and Post. Textbox `What's on your mind?`. Post was not clicked. Feed text was not copied.

## Admin

URL `/admin/viewSystemUsers`, inspect `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b`. Heading System Users. Derived count `(16) Records Found`. Filters Username, User Role, Employee Name, and Status. Add and the configuration labels were not opened. User rows were not copied. Admin writes are out of scope.

## Navigation

Sidebar clicks changed the URL to the module paths above. That relationship is Observed for the clicks that were made. Quick Launch destinations were not clicked on the dashboard. Later Leave and Time URLs came from top-bar or menu clicks, not from Quick Launch.

## Not established

Live login success and logout. Save results on every module. Leave type options. Timesheet View, Edit, and Submit results. Attendance punch values. Project Info. Admin user add and roles. Recruitment vacancy page. Unopened My Info tabs. A selected PIM list-row details page. Whether automated demo capture is permitted.
