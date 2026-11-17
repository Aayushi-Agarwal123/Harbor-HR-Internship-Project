# Assumptions and unknowns

## Unknown

- Login success and failure UI, including redirect and error copy.
- Form method value, hidden input meaning, and any token.
- Forgot-password URL and the four unnamed login links' destinations.
- Why the first Chrome profile was already on the dashboard.
- Logout control.
- Historical, first inspection: Search was not pressed. Later OBSERVED: Employment Status Freelance, then Search, produced `No Records Found`. Reset restored `(121) Records Found`. Evidence is in `docs/evidence/REQ-038-scr04-evidence-mapping.md`. Name, id, job, subunit, supervisor, and Include searches remain UNKNOWN.
- Historical, first inspection: only the dashboard and PIM employee list were known. Later OBSERVED: the other sidebar landings in `docs/REAL_ORANGEHRM_INTERACTION_MATRIX.md`. Subpages listed as unopened in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md` remain UNKNOWN.
- Historical, first inspection: sort, records-per-page, the selected pager, empty-search text, and employee details were unknown. Later OBSERVED: the Freelance empty text, pager button `2`, and the signed-in My Info sections named in the inspection report. A header click that changes `sortField` or `sortOrder` was not observed. No records-per-page control was in the inspected trees. A selected Employee List row was not opened. Those three remain UNKNOWN.
- Whether Save enforces the visible `*` on Add Employee. The name textboxes reported accessibility `required=false`, and no `required` attribute was present. Save was not clicked.
- Whether checking `Create Login Details` reveals more fields. It was unchecked, and it was not clicked.
- Whether the two employee-list icon buttons, or the three report-row icon buttons, perform view, edit, or delete. Their accessible names are private-use glyphs, not those words. They were not clicked.
- Historical, first inspection: details, search results, and pager clicks were unopened. Configuration remains UNKNOWN. The Freelance search, Reset, and pager clicks were later OBSERVED. Signed-in My Info sections were later OBSERVED. A selected list-row details page remains UNKNOWN.
- API paths, status codes, and payload shapes. Both inspects recorded zero in-window requests.
- Database engine, schema, password hashing, and authorization rules.
- Chart percentages. Category names were in the accessibility tree. Slice numbers were not.

## Later evidence

A 2026-11-15 closure attempt found no debugging browser on port 9222. That attempt did not submit login or logout, and it did not open employee details. The same port check after the REA registration repair still found port 9222 closed. Those two checks are historical. Later retained notes record the Freelance search, Reset, pager clicks, and the signed-in My Info sections. The list interaction records are in `evidence/pim-interaction-investigation/`. A header click that changes `sortField` or `sortOrder`, a records-per-page control, and the row-action glyphs were still not activated. Harbor HR's sort control, row-count control, Delete button, and reports table are PROPOSED local behavior, not OrangeHRM parity.

## Proposed local design

These are choices for Harbor HR, the independent prototype. They are not recovered OrangeHRM behavior.

- Synthetic local username `demo_admin`. The matching local password is `HARBOR_LOCAL_PASSWORD` in the ignored `.env` file and is not copied here.
- Empty fields and unknown credentials show local messages written for this prototype.
- Successful local sign-in reveals the shell. That redirect was not observed on the demo.
- PIM column headers now follow the observed list. Local row values and name matching are PROPOSED. One live Employment Status search was OBSERVED. A live name search was not submitted.
- Local text search filters that synthetic table.
- Widget numbers and the signed-in display name are synthetic. An account display label was observed in the original inspection. The user identity value is not retained in `evidence/navigation.redacted.json`.

## Proposed tables

Not a recovered schema:

```text
User(id, username, password_hash, role)
Employee(id, employee_number, first_name, last_name, department, job_title, status)
```

Historical, superseded: an early note said the frontend keeps employees in memory and PostgreSQL is not connected. That sentence is not the current implementation. `backend/app/database.py` uses `DATABASE_URL` when set and otherwise SQLite. PostgreSQL persistence was recorded against `harbor_test` in `docs/test-report.md`. This audit did not query a database.
