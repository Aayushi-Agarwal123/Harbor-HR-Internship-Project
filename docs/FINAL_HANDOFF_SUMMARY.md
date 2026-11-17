# Harbor HR handoff summary

Date: 2026-11-15. Updated after the authenticated inspection and the local detail-page change.

Harbor HR is a local personnel prototype based on a black-box look at the public OrangeHRM demo. It is not a copy of OrangeHRM source code. The local app covers sign-in, a dashboard, the observed sidebar, and personnel list, search, add, and edit. Sidebar modules other than PIM now show the inspected landing facts. They do not store module records. Leave remains optional. Admin settings remain out of scope.

A frontend typecheck and production build on 2026-11-15 exited 0 and did not use a database. PostgreSQL persistence on `harbor_test` remains the historical result: 1 passed, 0 failed, 0 skipped, 21.52 seconds. That test was not repeated. The isolated Playwright command was `npx playwright test --config=playwright.isolated.config.ts --grep "TC-0"`. It exited 0: 5 passed, 0 failed, 0 skipped, 38.4 seconds. Those five functions cover TC-01 through TC-10. The run used API port 8012, frontend port 5175, and SQLite `backend/harbor-e2e.db`. It did not use ports 8000 or 5173, and it did not use PostgreSQL `harbor` or `harbor_test`. API PID 23708 and frontend PID 28352 kept their original start times. An older default-config run of 9 passed in 39.4 seconds is historical and was not re-executed. `evidence/api-observations.md` is the older API register and was not edited; the later employees API capture is not in that file.

On the live demo, the twelve sidebar landings were opened read-only. My Info Personal Details, Contact Details, Emergency Contacts, and Job were opened for the signed-in profile. Add Employee and Employee Reports were opened and not saved. Leave, Time, Recruitment, Admin, Performance, Claim, and Buzz subpages listed in the latest task were not all opened. Search, Reset, sorting, pagination, and records-per-page were not retested on those landings.

Requirement reconciliation, recounted from the 57 rows in `docs/FINAL_REQUIREMENT_TRACEABILITY.md`, is 38 pass, 13 partial, 2 not verified, and 4 out of scope. REQ-054 is pass because of the isolated report above. REQ-056 is pass because doctor exited 0 and this Cursor session received `search_guidance` and `binary_session` results. REQ-003 and REQ-055 stay not verified. The 13 partial rows are REQ-006, REQ-008, REQ-014, REQ-020, REQ-025, REQ-028, REQ-037, REQ-038, REQ-039, REQ-041, REQ-042, REQ-051, and REQ-057. The running app at `http://127.0.0.1:5173` was also inspected without saving or deleting an employee. The handoff is **conditionally ready**. It is not complete.

The dashboard evidence file no longer stores the account display label. Other original evidence files still do. This summary does not include account labels, passwords, or session data.

