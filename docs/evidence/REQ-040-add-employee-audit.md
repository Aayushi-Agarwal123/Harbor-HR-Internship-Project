# REQ-040 add-employee audit

Date: 2026-11-16. No demo page was opened. No test was executed. Original evidence was not edited.

## Acceptance

Guide SCR-06: Add employee form. Observe the fields and the local reconstruction requirements. Observe only if permitted, and do not write to the shared demo by default.

The traceability sentence is the same: add-employee fields, no live write by default. TC-07 is the local add test. It is not a live Save.

REQ-003 stays Not Verified, so a new automated demo capture is not authorized. The existing captures already cover this sentence.

## Evidence read

- `evidence/add-employee.redacted.json`
- `docs/screen-inventory.md` SCR-06 and the Add Employee section
- `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` Add Employee paragraph
- `screenshots/add-employee-viewport.json`
- `frontend/src/components/pim/EmployeeForm.tsx`
- `test-results/isolated/tc-report.json`

## Mapping

| Criterion | Evidence | Class | Result |
|---|---|---|---|
| Add Employee page and heading | Inspect `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`. URL `/web/index.php/pim/addEmployee`. Heading `Add Employee`. | Observed | Pass |
| Name fields | Labels and accessible names `Employee Full Name`, `First Name`, `Middle Name`, `Last Name`. Accessibility `required=false`. A visible `*` is also recorded. | Observed | Pass |
| Employee Id | Visible text is recorded in the inventory. The DOM `value` attribute is absent and the node value length is 0. | Observed | Pass |
| Create Login Details | Unchecked. No username or password textbox while unchecked. Not clicked. | Observed | Pass for the unchecked state |
| Choose File | Button and the jpg/png/gif hint are recorded. `accept` is absent. Not clicked. | Observed | Pass for the visible control |
| Cancel and Save | Both named. `save_clicked` false. `cancel_clicked` false. `validation_messages` null. Interaction text says no field was typed. | Observed | Pass for no live write |
| Later open of the same page | `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b`. The same labels. Save was not clicked. One response was 4xx and its path was not extracted. | Observed | Pass. It does not contradict the first capture. |
| Screenshot | Evidence id `ev_bc0cdec6d42b59f0d53b93c3945278e81d6046578533085cdda78b9aeb88a7b5`. Metadata `screenshots/add-employee-viewport.json`. The PNG was not copied because the viewport includes the product logo. | Observed metadata | Not required by the SCR-06 evidence column |
| Local form | `EmployeeForm.tsx` keeps Create Login Details and Choose File disabled. | Observed local limit | Pass as the reconstruction limit |
| Whether Save enforces the asterisk | Not tested. Clicking Save would be a live write. | Unknown | Outside this requirement |
| Local TC-07 | Same isolated function as TC-08. Status passed, duration 3050 ms, start `2026-11-15T13:50:27.968Z`. It runs against Harbor HR. | Observed local test | Not live Save proof |

The account label in the original JSON is not copied here.

## Status

Pass. The fields were observed and Save was not clicked. REQ-003 still blocks a new capture, and this requirement does not need one.
