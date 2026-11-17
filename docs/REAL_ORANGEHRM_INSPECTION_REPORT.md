# Real OrangeHRM inspection report

Session: 2026-11-15, existing Chrome CDP `127.0.0.1:9222`. Read-only. No login submit. No form submit, save, delete, or row-action click.

Target list evidence: `ev_82a5413a545bef32102c1df946dbfaf4e23d95e37403295c35bc0993a464d4ef`.

Two page targets were present:

| Target | URL at list time |
| --- | --- |
| `500613AB6A376D6B70C8B177B1C2FA00` | `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index` |
| `C1075BA3A8F5B98B0CEE8BCCB5E2005B` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList` |

Navigation used the dashboard target. Reloading its current URL stayed inside the application (no redirect to `/auth/login`). Sidebar link clicks completed.

Confidence: URLs, headings, control names, column headers, and request method/path/status below are from REA captures in this session. Dropdown option lists were not opened. Search and Reset were not clicked on these landings. Response bodies were not decoded in this pass.

## Dashboard

- Inspect: `ev_1f13c7c91dd5b277aa84b42deeb3c735f24d3a85157b837624972a0db17ab4a8` (2026-11-15T13:14:26.317Z–13:14:27.101Z).
- Screenshot: `ev_47abd274e6f17f93bfe172071bdf71f36627b5323ec6b6728443ecd0d814378f`, viewport 1298×812, PNG sha256 `fe12bd3c8ce0b03984b0532cfbb2c7b4c92c4bfa12b56e72441ca5c7b06b3322`, 133639 bytes, captured 2026-11-15T13:15:06.630Z. The PNG was not copied into the repo.
- Reload scenario parent `ev_2086bff34ee3ad3e6942d5f92fc933bc4494bf8722109e5841656a98824568c6`, summary `ev_77cc4a6710c481cfe49c6cc8fd6e267c100e5e5a11e9f3f248b9a9135d50a8d4`. Final URL stayed `/dashboard/index`.
- Heading `Dashboard`. Widgets observed: Time at Work, My Actions, Quick Launch, Buzz Latest Posts (`No Posts Added`), Employees on Leave Today (`No Employees are on Leave Today`), Employee Distribution by Sub Unit, Employee Distribution by Location.
- Quick Launch buttons visible: Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet. Not clicked.
- Sidebar links visible, in this order: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz. Upgrade link and button visible. Footer text included `OrangeHRM OS 5.9`.
- Document/XHR observed on the reload: `GET /dashboard/index` 200; `GET /api/v2/dashboard/employees/time-at-work` 200; `GET /api/v2/dashboard/employees/action-summary` 200; `GET /api/v2/dashboard/shortcuts` 200; `GET /api/v2/buzz/feed` 200; `GET /api/v2/dashboard/employees/leaves` 200; `GET /api/v2/dashboard/employees/subunit` 200; `GET /api/v2/dashboard/employees/locations` 200. A `POST /events/push` 200 also occurred as a page-load request. It was not an intentional HR write.

## PIM (existing tab, not re-navigated)

- Inspect: `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756` (2026-11-15T13:18:32.495Z–13:18:33.578Z).
- URL: `/web/index.php/pim/viewEmployeeList`.
- Headings: Employee Information, PIM. Topbar links: Employee List, Add Employee, Reports.
- Filters present as labels: Employee Name, Employee Id, Employment Status, Include (`Current Employees Only`), Supervisor Name, Job Title, Sub Unit. Buttons: Reset, Search. Neither was clicked in this pass.
- Record text: `(146) Records Found`.
- Columns: checkbox glyph, Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor, Actions.
- Row values and the account label were not copied. No screenshot in this pass. No new employees API body was decoded.

## Leave

- Opened by clicking sidebar `Leave` from the dashboard. Parent `ev_2086bff34ee3ad3e6942d5f92fc933bc4494bf8722109e5841656a98824568c6`. Final URL `/leave/viewLeaveList`.
- Inspect: `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400` (2026-11-15T13:16:18.538Z–13:16:19.177Z).
- Screenshot: `ev_8b8a4a09b54750760f705818042c30dc2d2956c00df353cab70fa905c3459371`, PNG sha256 `d276e31dc092484688838fdc5244bfd329e185590c1296c07ba15cc82d27cae3`, 140874 bytes, captured 2026-11-15T13:16:58.196Z. Not copied into the repo.
- Heading `Leave List`, banner `Leave`. Topbar links: Apply, My Leave, Leave List, Assign Leave. Additional topbar texts: Entitlements, Reports, Configure. Those were not opened.
- Filters: From Date and To Date textboxes, placeholder `yyyy-dd-mm`, visible texts `2026-01-01` and `2026-31-12` (recorded as shown). Show Leave with Status (required marker), visible text `Pending Approval`. Leave Type, Employee Name (`Type for hints...`), Sub Unit, Include Past Employees. Closed select texts `-- Select --`. Reset and Search were not clicked.
- Columns: checkbox, Date, Employee Name, Leave Type, Leave Balance (Days), Number of Days, Status, Comments, Actions.
- Empty state: `No Records Found` (twice), an Info notice, and a close button.
- Requests: `GET /leave/viewLeaveModule` 302; `GET /leave/viewLeaveList` 200; `GET /api/v2/leave/employees/leave-requests?limit=50&offset=0&includeEmployees=onlyCurrent` 200; `GET /api/v2/leave/leave-periods` 200; `GET /api/v2/leave/workweek?model=indexed` 200; `GET /api/v2/leave/leave-types?limit=0` 200; `GET /api/v2/leave/holidays?fromDate=2026-01-01&toDate=2026-12-31` 200. Transaction view `ev_f8a05e63b3f10d9d677de5c2b0a87918112a9c37b0325c50c365fcf7cdfde61d`.

## Time

- Opened by clicking sidebar `Time` from Leave List. Parent `ev_c0f681b921285cd023c211f16dd674156e6683f9ff7afbfe169637de0b5e6647`, summary `ev_445b5549a13304519bc0082d35a74f465f159443263b19f96888dcacf54d8c5e`.
- URL `/time/viewEmployeeTimesheet`. Inspect `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092`.
- Headings: Select Employee, Timesheets Pending Action, Time. Breadcrumb `/ Timesheets`.
- Textbox `Type for hints...`. Several `View` buttons. Columns: Employee Name, Timesheet Period, Actions. View was not clicked.
- Requests: `GET /time/viewTimeModule` 302; `GET /time/viewEmployeeTimesheet` 200; `GET /api/v2/time/employees/timesheets/list?limit=50&offset=0` 200. Transaction view `ev_e39665efcae21b51c716548d82c265918cf8d65f4c73733f265baa5de15c1618`.
- No screenshot in this pass.

## Recruitment

- Opened by clicking sidebar `Recruitment` from the timesheet. Parent `ev_8d48b7fc4cea38475c24a6f6c5438b9eac62156514066792083fea1812d2c977`, summary `ev_8b3215c1a546a075a7f73183fe6d0f888fbfb0e82e67746dda7a1807b9e515f8`.
- URL `/recruitment/viewCandidates`. Inspect `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417` (2026-11-15T13:18:31.068Z–13:18:32.590Z).
- Heading `Candidates`. Topbar links: Candidates, Vacancies. Vacancies was not opened.
- Record text: `(15) Records Found`.
- Filters: Job Title, Vacancy, Hiring Manager, Status, Candidate Name, Keywords (`Enter comma seperated words...`), Date of Application From/To, Method of Application. Several `-- Select --`. Reset and Search not clicked.
- Columns: checkbox glyph, Vacancy, Candidate, Hiring Manager, Date of Application, Status, Actions. Row values were not copied.
- Requests (transaction view `ev_ff42c2371fa753a0f4b075128e4bba22fd8f25ab3edaf36af7a5b66b487024d6`): `GET /recruitment/viewRecruitmentModule` 302; `GET /recruitment/viewCandidates` 200; `GET /api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC` 200; `GET /api/v2/admin/job-titles?limit=0` 200; `GET /api/v2/recruitment/vacancies?model=summary&limit=0&excludeInterviewers=false` 200; `GET /api/v2/recruitment/hiring-managers?limit=0` 200; `GET /api/v2/recruitment/candidates/statuses` 200.
- No screenshot in this pass.

## Admin

- Opened by clicking sidebar `Admin` from Candidates. Parent `ev_c4e8f17820a36696d634b21ae5d798d2f223ddba99c881110317ef9e28838c74`, summary `ev_c0660395e2f8e2074da227ea2f6e7b8707c45ce66ac841db2ccf712f62b980f9`.
- URL `/admin/viewSystemUsers`. Inspect `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b` (2026-11-15T13:19:32.332Z–13:19:32.978Z).
- Heading `System Users`. Breadcrumb `/ User Management`. Record text `(16) Records Found`.
- Filters: Username, User Role, Employee Name, Status. Reset and Search not clicked. An `Add` label was visible. It was not clicked.
- Columns: checkbox glyph, Username, User Role, Employee Name, Status, Actions. Usernames and employee names were not copied.
- Topbar links opened as destinations were not clicked. Visible topbar texts/links included User Management, Job, Organization, Qualifications, Configuration, Nationalities, Corporate Branding.
- Requests (transaction view `ev_379dbf7544b6ea44469721179a7aa303a29a60177e668426bd224d7dbe2e0fbc`): `GET /admin/viewAdminModule` 302; `GET /admin/viewSystemUsers` 200; `GET /api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC` 200; `GET /api/v2/admin/job-titles?limit=0` 200.
- No screenshot in this pass.

## Performance

- Opened by clicking sidebar `Performance` from System Users. Parent `ev_7a22bc10b617a51314a50e2438222e248243cf58770f1d39fb1c16ce2e59f42b`, summary `ev_e0b6ca3e8db276a797278fd27eb989a42554d95c9409fba0a645e0f099779e7c`.
- URL `/performance/searchEvaluatePerformanceReview`. Inspect `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b` (2026-11-15T13:20:21.060Z–13:20:22.168Z).
- Heading `Employee Reviews`. Breadcrumb `/ Manage Reviews`. Empty text `No Records Found`.
- Filters: Employee Name, Job Title, Sub Unit, Include (`Current Employees Only`), Review Status, From Date, To Date. Reset and Search not clicked.
- Columns: Employee, Job Title, Sub Unit, Review Period, Due Date, Review Status, Actions.
- Topbar links: My Trackers, Employee Trackers. Texts also included Configure and Manage Reviews. Not opened.
- Requests (transaction view `ev_e20b844a0c646c9567afb763d297138dd2465a71a0689a65d4e8c0da2a3dcfbc`): `GET /performance/viewPerformanceModule` 302; `GET /performance/searchEvaluatePerformanceReview` 200; `GET /api/v2/performance/employees/reviews?limit=50&offset=0&sortField=performanceReview.statusId&sortOrder=ASC&fromDate=2026-01-01&toDate=2026-12-31&includeEmployees=onlyCurrent` 200.
- No screenshot in this pass.

## Directory

- Opened by clicking sidebar `Directory` from the review page. Parent `ev_858ef433aec3452ba05306422c3bfd5f862f4914279c60523a72fe5698a7fc5e`, summary `ev_994c1e1eee8b25f53d68c557cd1f367b71a9adcd833ab6dee8cd8096dd0b7bfa`.
- URL `/directory/viewDirectory`. Inspect `ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1` (2026-11-15T13:21:09.903Z–13:21:10.401Z).
- Heading `Directory`. Record text `(155) Records Found`.
- Filters: Employee Name (`Type for hints...`), Job Title, Location. Reset and Search not clicked.
- Requests (transaction view `ev_7d1e19176b30959e56e9bf73a7d5570b82a78a455f35b093679d5f69d0cb469a`): `GET /directory/viewDirectory` 200; `GET /api/v2/directory/employees?limit=14&offset=0` 200. Fifteen image requests were still unfinished when capture ended.
- Card contents and names were not copied. No screenshot in this pass.

## Maintenance

- Opened by clicking sidebar `Maintenance` from Directory. Parent `ev_e07d5f008637b5205232c93317aedce823559b742b6e7c7cd96e580228a7e05d`, summary `ev_bdf38ec3934cf6c2c4d120b69eda41fec8d560705a6450b26becf286fae5bced`.
- URL `/maintenance/purgeEmployee`. Inspect `ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd` (2026-11-15T13:23:21.018Z–13:23:21.455Z).
- The page is an administrator credential gate, not a purge form. Heading `Administrator Access`. Text says a critical administrator function requires credential validation. Username textbox is disabled and prefilled; the value was not copied. Password textbox is editable and was not filled. Buttons: Cancel, Confirm. Confirm was not clicked. Form action observed in the DOM: `/web/index.php/auth/adminVerify`.
- Requests (transaction view `ev_e936f42e6fd1532bff62efdc7950c61b8433b7324860c24e516056af08a8e3e3`): `GET /maintenance/viewMaintenanceModule` 302; `GET /maintenance/purgeEmployee` 200.
- Cancel was clicked. Parent `ev_67629becaf54f0c43ff24aa51d4c11ff9b3a4f5752d228672d7906f8fe6a375b`, summary `ev_ae27640b548845d0fa3aedd75e209d8dadd4ea37dbf61bd7666eee09001006d7`. The URL returned to `/dashboard/index`. No password was submitted.

## Claim

- Opened by clicking sidebar `Claim` from the dashboard. Parent `ev_ed33e6030b3e6f2555b478c53559f67edf83d87dd6505bc55ddee5d4fbdd2220`, summary `ev_8e8a7f0abff733c62a0a4ba3522eac79344a64f8a5d1ff34a09f46b7c6ff7faa`.
- URL `/claim/viewAssignClaim`. Inspect `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c` (2026-11-15T13:24:02.629Z–13:24:03.268Z).
- Heading `Employee Claims`. Record text `(3) Records Found`. An `Assign Claim` label was visible and was not clicked.
- Topbar links: Submit Claim, My Claims, Employee Claims, Assign Claim. Not opened.
- Filters: Employee Name, Reference Id, Event Name, Status, From Date, To Date, and the text `Current Employees Only`. Reset and Search not clicked.
- Columns: Reference Id, Employee Name, Event Name, Description, Currency, Submitted Date, Status, Amount, Actions. Three `View Details` buttons were visible and not clicked. Row values were not copied. Status text `Submitted` was visible.
- Requests (transaction view `ev_88bddb01e943ec8a31818185632aceef78e96a90d96c46b8dd9a429448d14110`): `GET /claim/viewClaimModule` 302; `GET /claim/viewAssignClaim` 200; `GET /api/v2/claim/employees/requests?limit=50&offset=0&includeEmployees=onlyCurrent&sortField=claimRequest.referenceId&sortOrder=DESC` 200; `GET /api/v2/claim/events?limit=0&status=true` 200.

## Buzz

- Opened by clicking sidebar `Buzz` from Assign Claim. Parent `ev_4281190da2a56e51c5c86bc110c5bc9c7a473af96d04ef5487ce779c2b43605f`, summary `ev_19a24f62b4c601413444b73e17e588953dd3c167b7ba12780d388f2834cd5449`.
- URL `/buzz/viewBuzz`. Inspect `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43` (2026-11-15T13:24:28.994Z–13:24:29.499Z).
- Heading `Buzz`. Buttons: Share Photos, Share Video, Post. Textbox `What's on your mind?`. Post was not clicked. Feed text was not copied.
- Requests (transaction view `ev_aef6f039d5a09edd8e9c2a0cae20810be1abaf60c04ab1030c559375414d0259`): `GET /buzz/viewBuzz` 200; `GET /api/v2/buzz/feed?limit=10&offset=0&sortOrder=DESC&sortField=share.createdAtUtc` 200; `GET /api/v2/buzz/anniversaries?limit=5` 200. One additional feed request had no response status when the transaction view was read.

## My Info

- Opened by clicking sidebar `My Info` from Buzz. Parent `ev_9a2d026acdae15644b9d5c9d6c3fab4b4a081931d33d1300834c2c0ea3389acd`, summary `ev_d9eca7dbfca14102a7cff1eade153f9045542b18b26a664d7f1cb9501c76eb84`.
- The click landed on `/pim/viewPersonalDetails/empNumber/7`. Inspect `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f` (2026-11-15T13:24:53.546Z–13:24:54.186Z).
- This is the signed-in profile, not a row chosen from Employee List. The display heading was visible and was not copied.
- Headings: Personal Details, Custom Fields, Attachments, PIM. Two Save buttons were visible and not clicked.
- Side links: Personal Details, Contact Details, Emergency Contacts, Dependents, Immigration, Job, Salary, Report-to, Qualifications, Memberships. None of those other sections were opened.
- Field labels on Personal Details: Employee Full Name, Employee Id, Other Id, Driver's License Number, License Expiry Date, Nationality, Marital Status, Date of Birth, Gender. Custom Fields included Blood Type. Field values were not copied.
- Requests (transaction view `ev_e3bc073fa09f2edc236cae54b6e08b13b71f1a821c9a3f2fc3825cdb086c33a1`): `GET /pim/viewMyDetails` 302; `GET /pim/viewPersonalDetails/empNumber/7` 200; `GET /api/v2/pim/employees/7/personal-details` 200; `GET /api/v2/pim/employees/7` 200; `GET /api/v2/pim/employees/7/custom-fields?screen=personal` 200; `GET /api/v2/pim/employees/7/screen/personal/attachments?limit=50&offset=0` 200; `GET /api/v2/pim/employees` 200.

## Continuation on 2026-11-15 after 13:26Z

The same Chrome session stayed authenticated. Target list `ev_fcf16b8d93197b0cabdf35c06482f3dfc7fe2a982421c5be26b38364fd482c95` still showed My Info and Employee List. A later list `ev_7f93bc4fe4883bdee5a3002102caf64e6f07221b1450b143f8b887b034ac7ab8` showed a new employee-list target id `2B1B4CE4B6DFA5E5A9C64AA3436550C5`. A scenario against the old list id failed with `target_not_found`. Navigation continued on `500613AB6A376D6B70C8B177B1C2FA00`.

### My Info sections

| Section | URL | Evidence |
| --- | --- | --- |
| Contact Details | `/pim/contactDetails/empNumber/7` | inspect `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`; parent `ev_1fa7eefbad001d1f4c152a6364ccf6de70a62c261dd0bb6d2afe5b4425968bee` |
| Emergency Contacts | `/pim/viewEmergencyContacts/empNumber/7` | inspect `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`; parent `ev_aec3b0502567a2f2a3dc6a36ae301202d326d461afe28279cb38dbb820075f88` |
| Job | `/pim/viewJobDetails/empNumber/7` | inspect `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4`; parent `ev_f3e60d5a7eef753f035caf63a3619acf5552a72f8159ac36c142699fb087b48a` |

Contact Details headings: Contact Details, Address, Telephone, Email, Attachments. Labels: Street 1, Street 2, City, State/Province, Zip/Postal Code, Country, Home, Mobile, Work, Work Email, Other Email. Save was visible and was not clicked. Field values were not copied.

Emergency Contacts columns: Name, Relationship, Home Telephone, Mobile, Work Telephone, Actions. Attachment columns match the other profile pages.

Job labels: Joined Date, Job Title, Job Specification, Job Category, Sub Unit, Location, Employment Status, Include Employment Contract Details. Values were not copied.

### Add Employee and Reports

- Sidebar PIM opened `/pim/viewEmployeeList`, then Add Employee opened `/pim/addEmployee`. Parent `ev_7141fc8f91b03e12fbb766ad5c69a2cb869d0c70789d43df34dfddfbeef03f0f`, summary `ev_c182b77848fd97b11fedf7ea319d1a4eec0dd23466a26e430ac6554518957b25`. One response in that scenario was 4xx; the path was not extracted. Save was not clicked.
- Add Employee inspect `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b` (2026-11-15T13:30:00.182Z–13:30:00.749Z). Labels: Employee Full Name, First Name, Middle Name, Last Name, Employee Id, Create Login Details, Choose File, Cancel, Save, Required.
- Reports click parent `ev_7e1a433836baaf52869b90f93e0ea411342525506eeca7a19a3c72bb1c817982`, summary `ev_c6c2eeb4c47f84b214bcf89c89d4d7048796317e5b7a75961049afb427047c56`. URL `/pim/viewDefinedPredefinedReports`.
- Reports inspect `ev_33e051ec8aa002ec8039587d8e6c4f20b37b147f5d4c4a4bca32f2e513284e27` (2026-11-15T13:30:52.299Z–13:30:52.927Z). Heading Employee Reports. Record text `(4) Records Found`. Filter Report Name. Buttons Reset and Search, not clicked. Columns Name and Actions. Visible report names included PIM Sample Report and All Employee Sub Unit Hierarchy Report. The other two names were not extracted.

## Not opened in this session

The continuation above opened Add Employee, Employee Reports, and the My Info sections Contact Details, Emergency Contacts, and Job. Those three are not unopened. Still not opened: Leave Apply, My Leave, Assign Leave, Entitlements, Reports, and Configure; Time View buttons; Recruitment Vacancies; Admin User Management siblings, Job, Organization, Qualifications, Configuration, Nationalities, Corporate Branding, and Add; Performance My Trackers and Employee Trackers; Claim Submit Claim, My Claims, and View Details; My Info Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships; a selected Employee List row; Maintenance beyond the cancelled credential gate.

Pagination controls, header sort, and records-per-page were not exercised on these landings. Employee List pagination and one status search remain in the earlier investigation document, not in this pass.

Harbor HR source, the `harbor` database, the API on port 8000, and the frontend were not changed.
