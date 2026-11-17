# Screen inventory

Labels below come from REA accessibility text or DOM attribute metadata. Screenshot files are viewport pixels only; REA did not scroll.

| ID | Screen | Status | Evidence | What was actually visible |
|---|---|---|---|---|
| SCR-01 | Login | Observed, not submitted | `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`, screenshot `ev_61ac6bec158cc7e31c3df8a4fc549e42181dd969793e51efc3a2725e70773351` | Title `OrangeHRM`. URL `/web/index.php/auth/login`. Heading `Login`. Hint line `Username : Admin` and a password hint (redacted in saved JSON). Textboxes named `Username` and `Password`. Button `Login`. Link text `Forgot your password?`. Four links with no accessible name and no retained href. Images `company-branding` and `orangehrm-logo`. Footer `OrangeHRM OS 5.9` and `© 2005 - 2026 OrangeHRM, Inc`. |
| SCR-02 | Dashboard | Observed on a profile that was already there | `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`, screenshot `ev_a4cc7eec4689ecdf0da38ac35305e6002fdcafde31b843a61ee0319a50dc5031` | URL `/web/index.php/dashboard/index`. Heading `Dashboard`. Sidepanel and Topbar Menu. Search textbox. Upgrade button. Account display label observed in the original inspection. Account label intentionally excluded from retained evidence. Widget titles and quick-launch buttons listed in `evidence/navigation.redacted.json`. |
| SCR-03 | PIM employee list | Observed, not searched or edited | `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`, screenshot `ev_fb4d142679c1230653c9075f9edc08f6524639653c0d9afa12d4a82e5f3f9175` | URL `/web/index.php/pim/viewEmployeeList`. Headings `PIM` and `Employee Information`. See the employee-list section below. |
| SCR-04 | Employee search | Fields seen on the first inspect. One status search was observed later. | First inspect: same employee-list capture. Later: `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md` | The first inspect did not click Search. On 2026-11-14, selecting Freelance and clicking Search showed an empty table, `No Records Found`, and an Info notice, with the URL unchanged. Reset restored rows and `(121) Records Found` and left the Info notice. Name, id, job, subunit, and Include were not submitted as searches. |
| SCR-05 | Employee details | Historical first pass: not opened. Later: signed-in My Info only. A selected list row was not opened. | Personal Details `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`. Contact Details `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`. Emergency Contacts `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`. Job `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4`. | OBSERVED: those four signed-in sections. Save was not clicked. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened. Row glyphs have no accessible name Edit and were not clicked. |
| SCR-06 | Add employee | Observed, not submitted | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`, screenshot `ev_bc0cdec6d42b59f0d53b93c3945278e81d6046578533085cdda78b9aeb88a7b5` | URL `/web/index.php/pim/addEmployee`. Heading `Add Employee`. Fields and buttons are in the section below. Save was not clicked. |
| SCR-07 | PIM reports | Observed, not searched or opened | `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`, screenshot `ev_355d33e2c03a4b0e16eaf63f1734291da03ed880089be579da0d2f5ac337c1c3` | URL `/web/index.php/pim/viewDefinedPredefinedReports`. Heading `Employee Reports`. Five report names are in the accessibility tree. Search, Reset, Add, and the row icons were not clicked. |

## Login page structure

- Document title: `OrangeHRM`.
- One `form`. Its `action` is `https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate`. The `method` attribute exists; its value was not in the retained URL metadata.
- The form element also has attribute name `novalidate`.
- Username input attribute names include `name`, `placeholder`, and `autofocus`. Password input attribute names include `type`, `name`, and `placeholder`. The attribute values for `name`, `type`, and `placeholder` were not retained as text. Accessible names are `Username` and `Password`.
- Both textboxes reported `required=False` at capture time. That is the accessibility state, not a test of blank-field validation.
- A further `input` has attribute names `name`, `type`, and `value`. Those values were not read.
- `Login` is a `button`.
- Footer link accessible name: `OrangeHRM, Inc`. Its href was not retained.

## Dashboard structure

Accessibility roles: `complementary` sidebar, navigation `Sidepanel`, navigation `Topbar Menu`, heading `Dashboard` at level 6.

Widget titles present in the accessibility tree, including content that was outside the screenshot viewport:

- Time at Work. Text included `Punched Out`, `Punched Out: Mar 29th at 01:19 PM (GMT 7)`, `0h`, `0m`, `Today`, `This Week`, `Nov 02 - Nov 08`, `0h 0m`.
- My Actions. Text included `(1) Pending Self Review` and `(1) Candidate to Interview`.
- Quick Launch buttons: Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet.
- Buzz Latest Posts. Individual post bodies are shared-demo content and are not copied into the prototype.
- Employees on Leave Today. Text: `No Employees are on Leave Today`.
- Employee Distribution by Sub Unit. Category names: Engineering, Human Resources, Administration, Client Services, Unassigned.
- Employee Distribution by Location. Category names: Texas R&D, New York Sales Office, Unassigned.

The viewport screenshot shows the sidebar, the Dashboard heading, Upgrade, the user chip, part of the sub-unit chart, the location chart, and the footer. It does not prove which widgets sit above or below the fold after scrolling. REA did not scroll.

Version line on the login and dashboard pages: `OrangeHRM OS 5.9`. The same footer text is on the employee list.

## PIM employee list

Target `660BA0A9B3088498822D072A31181E01`. Evidence `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`. The dashboard and login targets were not used for this capture.

No accessibility node had a breadcrumb role. Under the `PIM` heading the page has the texts `Configuration`, `Employee List`, `Add Employee`, and `Reports`. `Employee List`, `Add Employee`, and `Reports` are links. The header account label was present and is not copied here.

Filter labels, in order: Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title, Sub Unit. Employee Name and Supervisor Name textboxes are named `Type for hints...`. The Employee Id textbox has an empty accessible name. Visible closed-control text is `-- Select --` for Employment Status, Job Title, and Sub Unit, and `Current Employees Only` for Include. Their option lists were not opened.

Buttons named `Reset`, `Search`, and `Add` are present. No button is named Edit or Delete. Each visible data row has two icon buttons whose accessible names are private-use glyphs.

One table. Column header text: a selection checkbox, `Id`, `First (& Middle) Name`, `Last Name`, `Job Title`, `Employment Status`, `Sub Unit`, `Supervisor`, `Actions`. The accessibility tree contains 50 data rows, 9 cells each, and 51 unchecked checkboxes. Text on the page: `(127) Records Found`. Id, first name, and last name were non-empty on all 50 rows. Job Title, Employment Status, Sub Unit, and Supervisor were empty on all 50 rows. Individual cell values are not copied here.

Pagination navigation is named `Pagination Navigation`. Its buttons are named `1`, `2`, and `3`, plus one icon button. None of those buttons exposed a selected state. No records-per-page label was present.

The screenshot is the current viewport only. It shows the filters, Add, the records-found line, and the header row. It does not show the table body or the pager. REA did not scroll.

A read-only re-inspection on 2026-11-12 used the same target and URL. Inspect `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. Screenshot `ev_7c8bcd37abd260edd8938ceb69c4131310912a5a574e5aeb224b10a89c938d9e`. The new viewport SHA-256 matches the earlier screenshot. The structure above was present again: the same headings, filter labels, closed dropdown text, Reset, Search, Add, nine columns, 50 data rows, 51 unchecked checkboxes, `(127) Records Found`, and pager buttons `1`, `2`, and `3` with no selected state. No `select` or `option` elements were in the DOM. No button was named Edit or Delete. Job Title, Employment Status, Sub Unit, and Supervisor were still empty on all 50 rows. Nothing was clicked. Cell values are in `evidence/employee-list-2026-11-12.redacted.json` only as column emptiness, not as copied text.

## Add Employee form

Target `DD1A1F0F2209E9F7A9E9630279980C1F`. Evidence `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. This page was already open. `capture_browser_scenario` was not used, and no field was typed.

The card heading is `Add Employee` at level 6. The banner heading is `PIM` at level 6. No breadcrumb role was present. Module items are the text `Configuration` and the links `Employee List`, `Add Employee`, and `Reports`. The header account label was present on this capture and is not copied here.

One form. Its attribute names are `class` and `novalidate`. `action` and `method` are not among those names. Attribute values were not retained.

Visible form content, in the order captured:

- Button `Choose File`. The form also has an input whose attribute names are `type` and `class`. An `accept` attribute was not present. The paragraph reads `Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px`.
- Label text `Employee Full Name`, with a separate `*` beside it. Three textboxes, accessible names `First Name`, `Middle Name`, and `Last Name`. Each reports accessibility `required=false`, `invalid=false`, and `readonly=false`. Their DOM attribute names are `class`, `name`, and `placeholder`. A `required` attribute is not present. Placeholder values were not retained as DOM text. The viewport shows those three words inside the empty fields.
- Label text `Employee Id`. Its textbox has an empty accessible name and contains the visible text `0374`. That input's only DOM attribute name is `class`. It has no `value` attribute, and the DOM node value length is 0.
- Text `Create Login Details` next to a checkbox with an empty accessible name. The checkbox state is unchecked. No username or password textbox was present while it was unchecked. The checkbox was not clicked.
- Paragraph `* Required`.
- Buttons `Cancel` and `Save`. Neither was clicked. No validation message was present.

The accessibility `required=false` state and the visible `*` are both recorded. This capture did not test whether Save enforces either one. The footer text `OrangeHRM OS 5.9` is present. REA did not scroll. The PNG was not copied into the project because the viewport includes the product logo. Its metadata is `screenshots/add-employee-viewport.json`.

## PIM reports

Target `DD1A1F0F2209E9F7A9E9630279980C1F`. Evidence `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`. The page was already open at `/web/index.php/pim/viewDefinedPredefinedReports`. Nothing was clicked or typed.

Heading `Employee Reports` at level 5. Banner heading `PIM` at level 6. No breadcrumb role. Module items are the text `Configuration` and the links `Employee List`, `Add Employee`, and `Reports`. The header account label was present and is not copied here.

One form. Attribute names are `class` and `novalidate`. No `action` or `method` attribute. The only filter label is `Report Name`. Its textbox accessible name is `Type for hints...`, with accessibility `required=false`. No `select` or `option` elements are present. Buttons `Reset`, `Search`, and `Add` are present and were not clicked.

One table. Headers are a selection checkbox, `Name`, and `Actions`. The Name header also contains private-use glyph U+F571. Text on the page: `(5) Records Found`. The accessibility tree has five data rows. Their Name cells are `All Employee Sub Unit Hierarchy Report`, `Employee Contact info report`, `Employee Job Details`, `PIM Sample Report`, and `QaReport_530297`. Six checkboxes are present, including the header checkbox, and all are unchecked.

Each data row has three buttons. Their accessible names are private-use glyphs U+F5DE, U+F4C9, and U+F3B8, not the words View, Edit, or Delete. They were not clicked. The viewport shows icon shapes on the first row, including a trash-can shape and a pencil shape, plus a third icon. That appearance does not establish what the buttons do.

No pagination navigation is in the accessibility tree, and the viewport does not show a pager. REA did not scroll, so the screenshot shows the first report row and the top of the next row. The five names come from the accessibility tree. Network requests were not in the attach window because `observation_ms` was 0. The PNG was not copied into the project. Metadata is `screenshots/pim-reports-viewport.json`.

## Live evidence pass after REA registration repair

No new screen was captured. The REA MCP tool `list_browser_targets` was connected and returned `provider_unavailable` / `endpoint_unreachable` for `http://127.0.0.1:9222`. Nothing was listening on 9222 or 9223. Login state, the dashboard, employee details, and logout were not inspected in this pass. No evidence ID was returned.

2026-11-16 closeout: no OrangeHRM screen was opened. `list_browser_targets` could not reach port 9222. The inventory above is unchanged. Local screens were exercised by Playwright. See `docs/ORANGEHRM_FINAL_CLOSEOUT.md`.
