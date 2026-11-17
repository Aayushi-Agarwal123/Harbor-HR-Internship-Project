# Implementation blueprint: OrangeHRM PIM module

## Scope

- Target: public OrangeHRM demo, PIM screens already captured. No new page was opened for this blueprint.
- Evidence used: three `inspect_web_page` records, envelope confidence `observed`, authority `external-service`, provider `rea-cdp-browser` version 2. REA `get_evidence_bundle` summary on 2026-11-12 found each inspect ID still retained as `complete-record`, with `limitation_count` 8. Payloads were not copied into this document.
- Project files used: `evidence/pim-inspection-summary.md`, `evidence/add-employee.redacted.json`, `evidence/employee-list-2026-11-12.redacted.json`, `evidence/pim-reports.redacted.json`.
- Not done: no new REA investigation, no browser interaction, no application source change, and no invented behavior.
- No envelope in these three records has confidence `derived` or `inferred`. Counts below are observed measurements inside those observed records. They are not a separate derived analysis.

No OrangeHRM application data was modified.

## Evidence inventory

| Screen | Inspect evidence | List evidence | Screenshot evidence | Captured at (UTC) | Target ID | URL |
|---|---|---|---|---|---|---|
| Add Employee | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | `ev_87dfa425b7f26095c456afae7b2e03d63a41b7895e7c2d1aab362859232fce85` | `ev_bc0cdec6d42b59f0d53b93c3945278e81d6046578533085cdda78b9aeb88a7b5` | 2026-11-12T08:01:50.340Z | `DD1A1F0F2209E9F7A9E9630279980C1F` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee` |
| Employee List | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` | `ev_dd1337aff8372982b32b321ea1afeebc6190766ceeb8176fdea9f3dfec41d0e1` | `ev_7c8bcd37abd260edd8938ceb69c4131310912a5a574e5aeb224b10a89c938d9e` | 2026-11-12T08:12:43.014Z | `660BA0A9B3088498822D072A31181E01` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList` |
| Reports | `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894` | `ev_99a03b5a6fb336fd7abefb02389a4ab9bdd0a8dae74db9a19c4ec6a217cfca3f` | `ev_355d33e2c03a4b0e16eaf63f1734291da03ed880089be579da0d2f5ac337c1c3` | 2026-11-12T08:53:41.175Z | `DD1A1F0F2209E9F7A9E9630279980C1F` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDefinedPredefinedReports` |

Historical limit for these three 2026-11-12 inspects: `observation_ms` was 0, so no request, status, or payload was recorded in those captures. Later employee-list requests are recorded in `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` and do not change this blueprint's three-screen ledger. DOM attribute values, including hrefs, were not retained. Screenshots are the 1295×879 viewport. REA did not scroll. `capture_browser_scenario` was not used.

The Add Employee and Reports records use the same target ID at different times. The files do not record a navigation between those URLs. That shared ID is not a recorded click path.

## Fact ledger

| Class | Fact | Evidence | Location | Coverage limit |
|---|---|---|---|---|
| Observed | Document title `OrangeHRM`. Banner heading `PIM`, level 6. No breadcrumb role. Footer `OrangeHRM OS 5.9`. | All three inspect IDs | Each URL above | Header account label differs by capture. |
| Observed | Module items: `Configuration` is text; `Employee List`, `Add Employee`, and `Reports` are links. | All three inspect IDs | Each page | Hrefs were not retained. Configuration was not opened. |
| Observed | Add Employee heading level 6 on the form card. One form with attribute names `class` and `novalidate`. No `action` or `method`. `submitted` is false. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | `/pim/addEmployee` | Attribute values were not retained. |
| Observed | Name textboxes `First Name`, `Middle Name`, and `Last Name`. Each is editable, not readonly, `invalid` false, accessibility `required` false. DOM names present: `class`, `name`, `placeholder`. No HTML `required` attribute. A separate `*` sits beside `Employee Full Name`. Note text is `* Required`. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | Add Employee form | The `*` was not tested by submitting the form. |
| Observed | Employee Id textbox has an empty accessible name and visible text `0374`. DOM attribute name is `class`. No `value` attribute. Node value length is 0. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | Add Employee form | Why `0374` is visible is not recorded. |
| Observed | `Create Login Details` sits beside an unchecked checkbox with an empty accessible name. No username or password textbox was in the tree. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | Add Employee form | The checkbox was not clicked. |
| Observed | Button `Choose File`. Hint text: `Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px`. File input attribute names: `type`, `class`. No `accept` attribute. Buttons `Cancel` and `Save` are present. Both click flags are false. `validation_messages` is null. | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` | Add Employee form | Hint text is not a tested upload rule. |
| Observed | Employee list heading `Employee Information`, level 5. One form, same attribute-name limits as above. Buttons `Reset`, `Search`, and `Add`. No button named Edit or Delete. | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` | `/pim/viewEmployeeList` | No button was clicked. |
| Observed | Filters in order: Employee Name `Type for hints...`; Employee Id empty accessible name; Employment Status `-- Select --`; Include `Current Employees Only`; Supervisor Name `Type for hints...`; Job Title `-- Select --`; Sub Unit `-- Select --`. The four closed controls are not comboboxes and have no `select` or `option` element. | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` | Employee list form | Option lists were not opened. |
| Observed | Table headers: selection checkbox, `Id`, `First (& Middle) Name`, `Last Name`, `Job Title`, `Employment Status`, `Sub Unit`, `Supervisor`, `Actions`. 50 data rows, 9 cells each, 51 unchecked checkboxes. Text `(127) Records Found`. Id and both name columns have text on all 50 rows. Job Title, Employment Status, Sub Unit, and Supervisor have no text on all 50 rows. | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` | Employee list table | Cell values were not saved. The viewport does not show the table body. |
| Observed | Header glyphs: Id, Last Name, Job Title, Employment Status, Sub Unit, and Supervisor include U+F127. First (& Middle) Name includes U+F571. Two private-use action glyphs per row. Pagination name `Pagination Navigation`, buttons `1`, `2`, `3`, plus one private-use button. No selected state. No records-per-page label. `clicked` is false. | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` | Employee list table and pager | Glyphs were not clicked. The viewport does not show the pager. |
| Observed | Reports heading `Employee Reports`, level 5. Filter label `Report Name`, textbox `Type for hints...`, accessibility `required` false. `dropdowns` is empty. Native select count 0. Native option count 0. Buttons `Reset`, `Search`, and `Add`. All three click flags are false. | `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894` | `/pim/viewDefinedPredefinedReports` | No button was clicked. |
| Observed | Reports table: checkbox header U+F26E, `Name` also including U+F571, `Actions`. 5 data rows, 3 cells each, 6 unchecked checkboxes. Text `(5) Records Found`. Names: `All Employee Sub Unit Hierarchy Report`, `Employee Contact info report`, `Employee Job Details`, `PIM Sample Report`, `QaReport_530297`. Three glyphs per row: U+F5DE, U+F4C9, U+F3B8. Those names are not View, Edit, or Delete. `pagination` is null. | `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894` | Reports table | The viewport does not show all five rows. Null pagination is this tree only. |
| Unknown | Historical for the 2026-11-12 inspects: Search, Reset, Save, Cancel, Add, sorting, pagination changes, dropdown options, and row-icon results had no click. Later OBSERVED: the Freelance search, Reset, and pager offsets. Save, reports Search and Reset, a sort that changes `sortField` or `sortOrder`, and row-icon results remain UNKNOWN. | The inspect ID for the screen where the control was only seen. Later list evidence is cited in PIM-06 and PIM-11. | Same URLs for the first pass | The first pass recorded no click. Later notes do not convert the remaining UNKNOWN items into observed behavior. |
| Unknown | Module hrefs, form action and method, network method and path, Configuration menu, employee details, and delete confirmation. | All three inspect IDs | Not present in the redacted files | Absence from these files is not a product-wide proof. |

## Screen-wise specifications

### Shared chrome

Preserve the observed title, PIM heading, four module items, and footer. Render `Configuration` as text. Render the other three names as links only in the sense that the accessibility role was `link`. Do not assign destinations. Header account labels differ by capture and are not copied here. They are capture-specific chrome, not a required account model.

### Add Employee

Preserve the form card heading and the fields in the ledger. Show `Cancel` and `Save` as visible buttons that do not submit. Show the photo hint as text. Show the Employee Id text `0374` as captured visible text, not as a generated-id rule. Leave `Create Login Details` unchecked and do not add username or password fields.

### Employee List

Preserve filter order, closed texts, column headers, the records-found text, the empty-versus-nonempty column pattern, two unnamed action glyphs per row, and the pager labels `1`, `2`, and `3`. Do not render saved employee names or IDs from the demo, because `cell_values_saved` is false. Do not mark a pager button selected. Do not treat the header glyphs as a sort control that has been shown to work.

### Reports

Preserve the Report Name field, the absence of a dropdown, the three column headers, the five report names, the records-found text, and three unnamed glyphs per row. Do not add a pager. Do not label the glyphs View, Edit, or Delete.

## Functional requirements

| ID | Requirement | Class | Evidence |
|---|---|---|---|
| PIM-01 | Show the shared PIM heading, module item names and roles, and footer. | Supported by observed evidence | All three inspect IDs |
| PIM-02 | Show the Add Employee form fields, hint, `* Required`, and buttons `Cancel` and `Save` without submitting. | Supported by observed evidence | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` |
| PIM-03 | Show the employee-list filters, headers, records text, row shape, and pager labels without activating them. | Supported by observed evidence | `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82` |
| PIM-04 | Show the reports filter, headers, five names, records text, and three unnamed row glyphs without activating them. | Supported by observed evidence | `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894` |
| PIM-05 | Historical: the first list and Add Employee captures were separate, so they do not prove that the list Add button opens the form. Later OBSERVED: a scenario opened `/pim/addEmployee`. Save was not clicked. Which control started that navigation is not named. | Later opening is observed. The first-pass inference remains unapproved. | Parent `ev_7141fc8f91b03e12fbb766ad5c69a2cb869d0c70789d43df34dfddfbeef03f0f`. Inspect `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b`. |
| PIM-06 | Historical for the 2026-11-12 inspects: Search and Reset were not clicked. Later OBSERVED on the employee list: Freelance search and Reset. Reports Search and Reset were not completed. Name, id, job, subunit, supervisor, and Include remain UNKNOWN. | Employee-list status search is observed. Reports search remains unknown. | `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d`, `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d` |
| PIM-07 | Save, Cancel, validation, and the Create Login Details checkbox result. | Blocked by missing evidence | `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b` |
| PIM-08 | Add actions on the employee list and on reports. | Blocked by missing evidence | Employee list and reports inspect IDs |
| PIM-09 | Dropdown option lists. | Blocked by missing evidence | Employee list inspect ID. Reports recorded zero dropdowns. |
| PIM-10 | Sorting from header glyphs. | Blocked by missing evidence | Employee list and reports inspect IDs |
| PIM-11 | Historical: the first inspect did not click a pager. Later OBSERVED: pager button `2`, then queries with `offset=50` and `offset=100`, status 200. The URL stayed unchanged. No selected state was exposed. No records-per-page control was in the inspected trees. Those absences are not a sort result. | Page changes are observed. Selected state and records-per-page remain unknown. | `ev_4aa9dfeae3689fe1c9db1a11e3540731b8df4a3cbdb0d0d429fcaea124097f1d`, `ev_05566f07f6331440c3662de6c0f9b4f9638b246b4fe304e31b776b686cdb5501`, `ev_19b1c588f71cd525f8a96dbff77d998b99b905fb107737001acb82ce82794e75` |
| PIM-12 | Employee row actions and report row actions. | Blocked by missing evidence | Employee list and reports inspect IDs |
| PIM-13 | There is no producer record with confidence `derived` in this set. Do not add a derived workflow. | Derived from observed evidence | None. Class is unused. |

## Supported now

- Shared PIM chrome labels and roles. Class: Observed. Evidence: all three inspect IDs.
- Add Employee form structure, including visible `0374` and the photo hint. Class: Observed. Evidence: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`.
- Employee-list structure and the nonempty-versus-empty column pattern, without cell values. Class: Observed. Evidence: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`.
- Reports list structure and the five recorded names. Class: Observed. Evidence: `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`.

## Tasks

### Blocked

- Search and Reset. Historical for the 2026-11-12 inspects: no click result. Later OBSERVED on the employee list: Freelance search `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` and Reset `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d`. Reports Search and Reset, and the name, id, job, subunit, supervisor, and Include searches, remain UNKNOWN.
- Save and Cancel. Stops: creating an employee and leaving the form. Checked: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. Missing: a click result and any validation text.
- Add on the list and on reports. Historical: the first inspects do not prove the button destination. Later OBSERVED: Add Employee opened, parent `ev_7141fc8f91b03e12fbb766ad5c69a2cb869d0c70789d43df34dfddfbeef03f0f`. The starting control is not named. Reports Add remains UNKNOWN.
- Dropdown options. Stops: option lists for Employment Status, Include, Job Title, and Sub Unit. Checked: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. Missing: the opened option text.
- Sorting. Stops: header-click order. Checked: both table inspect IDs and the later clicks in `docs/evidence/REQ-037-employee-list-sorting-audit.md`. Missing: a click that changes `sortField` or `sortOrder`. Do not infer a sort from an unchanged query.
- Pagination. Historical: the first inspect did not click a pager. Later OBSERVED: button `2` and offsets 50 and 100. Missing: a selected state and a records-per-page control.
- Employee row actions. Stops: edit, delete, or any other row action. Checked: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. Missing: names or a click result. The glyphs are not Edit or Delete.
- Report row actions. Stops: view, edit, delete, or any other report action. Checked: `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`. Missing: a click result. The glyphs are not those words.
- Configuration and employee details. Historical: the first three inspects had no detail page. Later OBSERVED: the signed-in My Info sections. Configuration and a selected list-row page remain UNKNOWN.

### Supported

1. Preserve shared PIM chrome. Evidence: all three inspect IDs. Preserve: heading, module roles, footer. Do not add: link destinations or an opened Configuration menu.
2. Preserve the Add Employee form. Evidence: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. Preserve: labels, states, hint, buttons, and visible `0374`. Do not add: save, cancel, validation, or login fields.
3. Preserve the employee list. Evidence: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. Preserve: filters, headers, the `(127)` count, empty-column pattern, pager labels. Later OBSERVED results that may be preserved are only the Freelance search, Reset, and the recorded pager offsets. Do not add: name, id, job, subunit, or supervisor search results, a sort, a records-per-page control, cell values, or named row actions.
4. Preserve the reports list. Evidence: `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`. Preserve: filter, five names, headers, three glyphs. Do not add: search, a pager, or named row actions.

### Design

Unverified. Not Evidence. These choices are not facts from the captures.

- Build only the supported preserve-tasks before any blocked behavior.
- Keep blocked controls visible and inert, with the captured label, and state that the action was not observed.
- Do not copy the OrangeHRM logo or call the live demo from a local implementation.
- Do not invent employee rows to fill the list. The capture withheld cell values.

## Acceptance

### Shared chrome

- Criterion. Observed. Evidence: all three inspect IDs. The screen shows `PIM`, `Configuration` as text, and links named `Employee List`, `Add Employee`, and `Reports`, plus footer `OrangeHRM OS 5.9`.
- Scenario: a reader opens a local PIM screen. The names and roles match the table above. The links have no recorded destination.

### Add Employee form

- Criterion. Observed. Evidence: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. The form shows the three name textboxes, Employee Id text `0374`, unchecked `Create Login Details`, `Choose File` with the recorded hint, `* Required`, `Cancel`, and `Save`.
- Scenario: a reader opens the local Add Employee screen. No username or password field is present. Activating `Save` or `Cancel` does not claim a recorded result.

### Employee list

- Criterion. Observed. Evidence: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. The screen shows the seven filters in order, nine headers, `(127) Records Found`, and pager labels `1`, `2`, and `3` with no selected state.
- Scenario: a reader opens the local list. Job Title, Employment Status, Sub Unit, and Supervisor are empty in the displayed structure of that first inspect. Historical: this criterion does not by itself record Search, Reset, or a pager click. Later OBSERVED: one Employment Status search, Reset, and pager offsets. Header glyphs still do not prove a sort. Name, id, job, subunit, and supervisor searches remain UNKNOWN. Demo cell values are not shown.

### Reports list

- Criterion. Observed. Evidence: `ev_e542f8f0a86394215399596f7d7e0e42b9f0a62a6325529c4549ab86fc3b1894`. The screen shows `Employee Reports`, `Report Name`, `(5) Records Found`, and the five recorded names.
- Scenario: a reader opens the local reports screen. No dropdown and no pager are shown. Search, Reset, Add, and the three row glyphs do not claim a recorded result.

## Unknowns and investigation requirements

Hand these to a later read-only inspection. Do not implement the missing behavior first.

- Question: what changes after Search and after Reset on each list? Historical for the 2026-11-12 inspects. Later OBSERVED on the employee list: Freelance search `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` and Reset `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d`. Reports Search and Reset were not completed. Name, id, job, subunit, supervisor, and Include remain UNKNOWN.
- Question: what do Save and Cancel show? Blocks: PIM-07. Checked: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. Need: a capture of the resulting page or message. Do not save a real demo record unless a later task explicitly allows a disposable trial and a following cleanup that is itself observed.
- Question: what does Add open from the employee list and from reports? Historical: the separate captures do not prove the button. Later OBSERVED: Add Employee opened, parent `ev_7141fc8f91b03e12fbb766ad5c69a2cb869d0c70789d43df34dfddfbeef03f0f`, inspect `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b`. The starting control is not named. Reports Add remains UNKNOWN.
- Question: which options are inside the four closed employee-list controls? Blocks: PIM-09. Checked: `ev_3ea675219d0a1ce3a5b994c7f27f587683dd2ba03cba3412217f8490aa96fa82`. Need: the opened option text.
- Question: does a header glyph change order? Blocks: PIM-10. Checked: the first table inspects and the later clicks. A click that changes `sortField` or `sortOrder` was not observed. Do not infer a sort from an unchanged query.
- Question: which pager button is current, and what does a click do? Historical: the first inspect did not click a pager. Later OBSERVED: button `2` and offsets 50 and 100. A selected state and a records-per-page control remain UNKNOWN.
- Question: what does each employee-list glyph and each report glyph open? Blocks: PIM-12. Checked: both inspect IDs. Need: the resulting page. Do not confirm a delete.
- Question: what is on Configuration and on an employee detail page? Configuration remains UNKNOWN. Historical: the first inspects had no detail page. Later OBSERVED: the signed-in My Info sections. A selected Employee List row remains UNKNOWN.

## Implementation phases

Do not schedule blocked behavior into a build phase.

| Phase | Work | Class |
|---|---|---|
| 1 | Shared PIM chrome from PIM-01. | Supported |
| 2 | Employee-list structure from PIM-03. The first-pass filters and glyphs stay unlabeled as actions. Later OBSERVED search and pager results may be shown only as those recorded results. | Supported for the first structure. Later clicks are separate evidence |
| 3 | Add Employee structure from PIM-02. Leave Save, Cancel, Choose File, and the checkbox inert. | Supported |
| 4 | Reports structure from PIM-04. Leave Search, Reset, Add, and row glyphs inert. | Supported |
| 5 | Stop. Collect the missing records in the investigation list. | Blocked until those records exist |

A practical order for the whole module is phase 1 through 4, then investigation, then a new blueprint for any behavior those records actually show. There is no evidence-backed order for search, save, sorting, pagination, or row actions.

## Testing strategy

Test only supported declarations.

- Assert the exact captured labels, heading levels, button names, column headers, report names, and records-found strings.
- Assert the employee-list empty columns and the reports dropdown count of zero.
- Assert that inert controls do not navigate, submit, or show a success message.
- Do not write a passing test for Search, Save, sorting, pagination, dropdown selection, or row actions.
- Do not call `opensource-demo.orangehrmlive.com` from the test.
- Do not require demo employee cell values.

Blocked outcomes stay in Missing information. They are not test cases.

## Dependencies, risks, and missing information

| Item | Effect |
|---|---|
| No recorded API, method, or path | A local screen cannot honestly claim a backend contract. |
| Href values absent | Module links cannot be wired from these files. |
| Cell values withheld | A copied employee table would invent data. |
| Same target ID on two URLs | It does not prove which control performed the change. |
| Screenshot viewport | The employee-list body and the lower report rows were not in the pixels. The accessibility tree still supplied the recorded structure and names. |
| `0374` | Visible text only. It is not a recorded id-generation rule. |
| Photo hint | Visible text only. It is not a tested file-type or size check. |

## Completion checklist

- [ ] PIM-01 through PIM-04 are visible and match the cited evidence.
- [ ] Search, Reset, Save, Cancel, Add, header glyphs, pager buttons, and row glyphs are visible where captured. A control claims a result only when a later retained note records that result. The Freelance search, Reset, and pager offsets are those later results. A header glyph is not a verified sort.
- [ ] No dropdown options, sort order, selected page, or row-action result was added.
- [ ] No demo employee cell values were copied into the screen.
- [ ] The three original evidence JSON files are unchanged.
- [ ] Further investigation is a separate task. It is not part of this blueprint's build.

## Additional Interaction Evidence

One interaction was attempted. It does not change the requirement classes or the acceptance criteria above, because no PIM control result was observed.

| Item | Record |
|---|---|
| Screen | Reports |
| Action | Fill `Type for hints...` with `zzzz-no-such-report`, then click `Search` |
| Before | `DD1A1F0F2209E9F7A9E9630279980C1F` at `/web/index.php/pim/viewDefinedPredefinedReports` |
| After | Same target at `/web/index.php/auth/login` |
| Observed result | `goto_start` completed onto the login URL. The fill step timed out after 15000 ms. The Search click status is `cancelled`. |
| Evidence | `ev_74c9fe29cd8f364b8a5fb28338b111fb57da284d736d6b1c0a0d81ddb151dfe9` |
| Later list | `ev_a7dd7b08536a6ab913212e38941b0f64eaed432fb2240ed241a1dcdbd9422716` |
| Status | Blocked |
| File | `evidence/pim-interaction-investigation/reports-search.json` |

No OrangeHRM record was created, edited, or deleted. Save was not clicked, and no delete dialog was confirmed. The sentence that Search, Reset, pagination, and employee details were all untested is historical for this blueprint's first interaction. Later retained notes record the Freelance search, Reset, pager offsets, an opened Add Employee page, and the signed-in My Info sections. Dropdown options, a header click that changes `sortField` or `sortOrder`, records-per-page, row actions, Cancel, Create Login Details, report Add, Configuration, and a selected list-row details page remain UNKNOWN.

## Handoff

What the first three inspects support is the visible structure of those screens. Historical: those separate captures do not prove that the list Add button opens Add Employee. Later OBSERVED: Add Employee was opened, Save was not clicked, and the starting control is not named. Later OBSERVED: one Employment Status search, Reset, and pager offsets. Still UNKNOWN: Save, Cancel, reports Add, dropdown options, a sort that changes `sortField` or `sortOrder`, records-per-page, and both sets of row actions. Local Harbor HR search, sort, page size, edit, and Delete are PROPOSED. They are not OrangeHRM parity. Dated record counts stay with their own captures: `(127)`, `(121)` after Reset, and `(146)`.
