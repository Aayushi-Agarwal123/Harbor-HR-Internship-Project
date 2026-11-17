# REQ-039 employee details audit

Date: 2026-11-16. No demo page was opened. No test was executed. Original evidence was not edited.

## Acceptance

Guide inventory SCR-05: Employee details. Observe visible detail fields and tabs. Evidence type: DOM plus screenshot.

The traceability title is the same screen. TC-08 is a separate local test: edit an employee and confirm the update survives reload. It is not the SCR-05 observation. The proposed-delete test is not named by SCR-05.

## Evidence read

- `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` My Info and the later section table
- `docs/screen-inventory.md` SCR-05
- `docs/requirements.md` R-14 and R-17
- `tests/e2e/hrms.spec.ts` TC-07/TC-08 and the proposed-delete test
- `test-results/isolated/tc-report.json`

## Checklist

| Criterion | Evidence | Class | Result |
|---|---|---|---|
| Personal Details labels on the signed-in profile | `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f` | Observed | Pass for that section. Save was not clicked. Values were not copied. |
| Contact Details, Emergency Contacts, and Job | `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`, `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`, `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4` | Observed | Pass for those three sections |
| Side links Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships | Named on Personal Details. Not opened. | Observed as links only | Not Verified |
| A selected Employee List row | Row glyphs were not clicked. The inspection report says this page was not opened. | Unknown | Not Verified |
| Screenshot for SCR-05 | SCR-01 through SCR-03 and SCR-06 cite screenshot evidence IDs. SCR-05 cites inspect IDs only. | Unknown | Not Verified |
| Local TC-08 | Isolated report title `TC-07 add, TC-08 edit, validation, and persistence`, status passed, duration 3050 ms, start `2026-11-15T13:50:27.968Z` | Observed local test | Pass for the local edit only |

The four opened sections are the signed-in profile, not a row chosen from Employee List. The profile path is recorded in the inspection report and is not repeated here.

## TC-08

Command recorded in the report argv: `npx playwright test --config=playwright.isolated.config.ts --grep TC-0`. Stats: expected 5, unexpected 0, skipped 0, flaky 0, duration 38407.025 ms, start `2026-11-15T13:49:54.446Z`.

The passing function logs in locally, opens PIM, saves a new employee, checks `First name is required.`, edits the last name to `Edited`, reloads, searches, and expects that cell. It does not open the live demo, a selected list row, or the six unopened profile sections. It does not click Delete.

The report records the test at the file line from that run. The current source still has the same title and the same steps. This audit did not re-run it.

## Proposed delete

`test("proposed local delete removes the employee")` searches the local name `Soren Okoye`, accepts the dialog, clicks Delete, and expects the row to be gone. Its title does not match `TC-0`, and the isolated report contains five titles, none of which is this test. It was not executed in that run.

It is not a SCR-05 criterion. R-17 marks local delete PROPOSED. REQ-025 is the local edit-and-delete row. Live row glyphs were not activated, so existing evidence does not cover a live delete. This audit did not run the test.

## Status

Partial. The missing SCR-05 items are the six unopened sections, a selected list-row details page, and a screenshot for the opened sections. REQ-003 remains the blocker for a new demo capture.
