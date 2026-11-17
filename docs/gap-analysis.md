# Gap analysis — 2026-11-14

Compared with `OrangeHRM_REA_Reverse_Engineering_Guide.md`. Original REA evidence files were not changed.

| Guide deliverable | Before this pass | After this pass |
|---|---|---|
| Screen inventory, navigation, workflows | Present for login, dashboard, and PIM | Historical for this 2026-11-14 pass: Leave, Time, and the other modules were uninspected. Later sidebar landings were OBSERVED in `docs/REAL_ORANGEHRM_INTERACTION_MATRIX.md`. This pass did not rebuild them. |
| Redacted evidence | Present | Not modified |
| Observed API register | Not captured from the live demo | Still unknown. The local API is proposed. |
| Requirements and traceability | Present, frontend-only | Extended for the local API, persistence, and tests |
| Local login, sidebar, dashboard | Frontend session only | Cookie session against the local API |
| Employee list, search, reset, pagination | Frontend filters for the verified Freelance case | Same screens, backed by the local API. Name, id, job, subunit, supervisor, and Include filters are proposed. |
| Add and edit with persistence | Add form did not save | Local create and update persist. Live Save was not clicked. |
| Employee details | Absent | Proposed local detail view |
| PostgreSQL | Absent. Docker and `psql` are not installed | Schema and `docker-compose.yml` are present. Tests run on SQLite because PostgreSQL cannot be started here. |
| Playwright | Absent | `tests/e2e/hrms.spec.ts` |
| Loading, empty, and error states | Empty result only | List loading and load error, empty result, form validation |

As of this 2026-11-14 pass, Admin, Leave, and the other sidebar modules were recorded as unavailable pages. Later landings were inspected and are not rebuilt by this note. Local Delete is a PROPOSED Harbor HR button. A live OrangeHRM delete was not observed, and the row glyphs were not clicked.
