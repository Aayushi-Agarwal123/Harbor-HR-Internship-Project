# Workflow specifications

## WF-01: Login

Precondition: a browser with no reused demo profile is opened to `https://opensource-demo.orangehrmlive.com/`. In this investigation that landed on `/web/index.php/auth/login` (`ev_6e407e02060f349249623f3f748b83e3fec1abd0369af2b2791dca8581157f68`).

Inputs observed, not typed:

- Textbox `Username`
- Textbox `Password`
- The page prints `Username : Admin` and a password hint. The password hint is omitted from this file.

Action performed: none. The Login button was not clicked. The form was not submitted. Blank-field and invalid-credential messages were not produced.

Visible page before submit:

- Heading `Login`
- Button `Login`
- Link `Forgot your password?`
- Form action URL `/web/index.php/auth/validate`
- Footer `OrangeHRM OS 5.9`

Success outcome: unknown. This session did not see a post-login navigation.

Failure outcome: unknown. No error text was present at capture.

Uncertainties:

- HTTP method on the form. The attribute is present; the value was not retained.
- Whether an extra input is a token. Its value was not read.
- Client or server validation rules.
- Session cookie name and lifetime.
- Password storage, hashing, and authorization checks. None of those can be claimed from this UI.

Evidence: `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`, screenshot `ev_61ac6bec158cc7e31c3df8a4fc549e42181dd969793e51efc3a2725e70773351`.

Implementation: the local prototype has its own synthetic sign-in. That behavior is proposed, not a replay of the demo.

A later closure attempt on 2026-11-15 could not continue this workflow. No authorized browser session was listening on port 9222.

The same blocker remained after the Cursor REA registration was aligned. `list_browser_targets` reached the MCP server and could not reach port 9222. Login submission, logout, and employee details were not performed. No network method, path, or status was captured.

The 2026-11-16 closeout called `list_browser_targets` again. The endpoint was still unreachable. No workflow above changed. See `docs/ORANGEHRM_FINAL_CLOSEOUT.md`.

## WF-02: Open the dashboard

Observed state: one CDP target was already at `/web/index.php/dashboard/index` before any action in this investigation (`ev_7d2999e258605ee12d3bfad3a346cb79fe98340e238ba40d6955d2d93b0ad0e4`). The cause is unknown. Storage was intentionally not read, so a leftover profile cookie was neither confirmed nor ruled out.

Visible result: sidebar, search box, Upgrade, an account display label, and the widget titles in the screen inventory. The user identity value is not retained.

Evidence: `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`.

## WF-03: Search employees

Precondition observed: the employee list is open at `/web/index.php/pim/viewEmployeeList`.

Inputs visible, not typed: Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title, Sub Unit.

Action performed: none. `Search` and `Reset` were not clicked.

Visible before submit: buttons `Search` and `Reset`, text `(127) Records Found`, and the column headers in the screen inventory.

Expected result after Search: unknown for that first inspect.

Evidence: `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`.

### Later observation, 2026-11-14

The first inspect above still stands. A later read-only session on the same Employee List URL is recorded in `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md`. It did not create, edit, or delete a demo employee.

Observed: Employment Status `Freelance`, then Search, produced an empty table, the text `No Records Found`, and an Info notice with the same text. The URL did not change. Reset returned `-- Select --`, rows, and `(121) Records Found`. The Info notice was still present after 1.5 seconds. Page button `2` changed the first visible Id and did not change the URL.

Not observed: a selected Employee Name suggestion plus Search, Employee Id search, Include, Job Title, and Sub Unit searches, column sorting, a records-per-page control, and the row-action glyphs. Typing `A` into Employee Name showed suggestions and did not change the record count.

## WF-04: Add employee

Precondition observed: a separate page target was already at `/web/index.php/pim/addEmployee`. The employee-list target stayed at `/web/index.php/pim/viewEmployeeList`. This inspection did not click the Add Employee link.

Inputs visible, not typed: `First Name`, `Middle Name`, `Last Name`, an Employee Id textbox showing `0374`, a `Choose File` button, and an unchecked `Create Login Details` checkbox.

Action performed: none. `Save` and `Cancel` were not clicked. The checkbox was not changed.

Visible result: the form described in the screen inventory. No validation message appeared because nothing was submitted.

Success and failure outcomes after Save: unknown.

Evidence: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`, screenshot `ev_bc0cdec6d42b59f0d53b93c3945278e81d6046578533085cdda78b9aeb88a7b5`.

## WF-05: Reports list

Precondition observed: a page was already open at `/web/index.php/pim/viewDefinedPredefinedReports`.

Inputs visible, not typed: Report Name textbox named `Type for hints...`.

Action performed: none. `Search`, `Reset`, and `Add` were not clicked. The three row icon buttons were not clicked.

Visible result: heading `Employee Reports`, text `(5) Records Found`, and the five report names in `evidence/pim-reports.redacted.json`.

Search result, Add form, and row-icon destinations: unknown.

Evidence: `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`, screenshot `ev_355d33e2c03a4b0e16eaf63f1734291da03ed880089be579da0d2f5ac337c1c3`.

## WF-06: Edit, delete, Configuration

Historical, first inspection: employee details, the employee-list row icons, the report row icons, and Configuration were not opened. No delete confirmation was captured.

Later OBSERVED: the signed-in My Info profile, not a row chosen from Employee List. Personal Details `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`. Contact Details `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`. Emergency Contacts `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`. Job `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4`. Save was not clicked.

Still UNKNOWN: a selected Employee List row, Dependents, Immigration, Salary, Report-to, Qualifications, Memberships, Configuration, and any row-glyph result. The glyphs were not clicked. Local edit and Delete are PROPOSED Harbor HR behavior, not observed OrangeHRM parity.
