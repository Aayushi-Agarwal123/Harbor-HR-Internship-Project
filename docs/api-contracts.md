# API contracts

These are Harbor HR endpoints. They are not OrangeHRM endpoints.

All employee routes require the `harbor_session` cookie. Missing or unknown sessions return 401 with `Authentication is required.`

| Method | Path | Behavior |
|---|---|---|
| GET | `/api/health` | Runs `SELECT 1` and returns `{ "ok": true, "database": "<url>" }`. The password is hidden. |
| POST | `/api/auth/login` | Body `username`, `password`. Sets the cookie. 400 if either is empty. 401 if they do not match. |
| POST | `/api/auth/logout` | Deletes the session and clears the cookie. |
| GET | `/api/auth/me` | Returns `username` and `display_name`. |
| GET | `/api/employees` | Query: `page`, `page_size` (`10`, `25`, or `50`), `sort`, `direction` (`asc` or `desc`), `name`, `employee_number`, `employment_status`, `job_title`, `sub_unit`, `supervisor`, `include`. Default sort is employee number ascending. An unsupported page size or sort returns 422. |
| GET | `/api/employees/hints?q=` | Up to eight synthetic full names containing `q`. |
| GET | `/api/employees/meta` | `{ "next_employee_number": "..." }` |
| GET | `/api/employees/{id}` | One employee, or 404. |
| POST | `/api/employees` | Creates an employee. 422 lists field errors. |
| PATCH | `/api/employees/{id}` | Replaces the editable fields. 422 or 404. |
| DELETE | `/api/employees/{id}` | Proposed local delete. The Employee List has a Delete button. The live row-action glyphs were not clicked. |
| GET | `/api/reports` | Proposed. Returns the six recorded report titles in seed order. |
| GET | `/api/timesheets` | Proposed Harbor HR. Query `employee_id`, `period_start`, `period_end`, `status` (`pending` or `approved`). Period filters must be supplied together and match overlapping periods. Returns `{ "total", "items" }`. |
| GET | `/api/timesheets/{id}` | One timesheet with daily rows, or 404. |
| POST | `/api/timesheets` | Creates a timesheet. 422 lists field errors. The employee must exist. Periods cannot overlap for the same employee. |
| PATCH | `/api/timesheets/{id}` | Replaces the period, status, and daily rows. 422 or 404. |
| DELETE | `/api/timesheets/{id}` | Deletes that timesheet. 204 or 404. |
| GET | `/api/leave-requests` | Proposed Harbor HR. Query `employee_id`, `leave_type`, `status`, `start_date`, `end_date`, `sub_unit`. |
| POST | `/api/leave-requests` | Creates a leave request. A request covers at most 30 days. |
| PATCH | `/api/leave-requests/{id}` | Replaces that request. 422 or 404. |
| DELETE | `/api/leave-requests/{id}` | Deletes that request. 204 or 404. |
| GET | `/api/candidates` | Proposed Harbor HR. Query `candidate_name`, `vacancy`, `status`. |
| POST | `/api/candidates` | Creates a candidate. |
| PATCH | `/api/candidates/{id}` | Replaces that candidate. 422 or 404. |
| DELETE | `/api/candidates/{id}` | Deletes that candidate. 204 or 404. |
| GET | `/api/reviews` | Proposed Harbor HR. Query `employee_id`, `status`. |
| POST | `/api/reviews` | Creates a performance review. |
| PATCH | `/api/reviews/{id}` | Replaces that review. 422 or 404. |
| DELETE | `/api/reviews/{id}` | Deletes that review. 204 or 404. |
| GET | `/api/claims` | Proposed Harbor HR. Query `employee_id`, `reference_code`, `event_name`, `status`, `start_date`, `end_date`. |
| POST | `/api/claims` | Creates a claim. Status is `Submitted` or `Cancelled`. There is no approval or payment route. |
| PATCH | `/api/claims/{id}` | Replaces the claim fields, including the Harbor HR status. 422 or 404. |
| DELETE | `/api/claims/{id}` | Deletes that claim. 204 or 404. |
| GET | `/api/employees/{id}/contact` | Proposed Harbor HR contact details. Empty strings when none are stored. |
| PUT | `/api/employees/{id}/contact` | Replaces that employee's contact details. A non-empty email must contain `@`. |
| GET | `/api/employees/{id}/emergency-contacts` | Proposed Harbor HR emergency contacts for that employee. |
| POST | `/api/employees/{id}/emergency-contacts` | Creates one contact. Name is required. |
| DELETE | `/api/employees/{id}/emergency-contacts/{contact_id}` | Deletes that contact. 204 or 404. |
| GET | `/api/vacancies` | Proposed Harbor HR vacancies. |
| POST | `/api/vacancies` | Creates a vacancy. Job title must be one of the recorded employee catalog titles. Status is `Open` or `Closed`. |
| PATCH | `/api/vacancies/{id}` | Updates that vacancy in place. 422 or 404. |
| DELETE | `/api/vacancies/{id}` | Deletes that vacancy. 204 or 404. |
| GET | `/api/trackers` | Proposed Harbor HR performance trackers. Query `employee_id`. |
| POST | `/api/trackers` | Creates a tracker. Status is `Active` or `Completed`. |
| PATCH | `/api/trackers/{id}` | Updates that tracker. 422 or 404. |
| DELETE | `/api/trackers/{id}` | Deletes that tracker. 204 or 404. |
| GET | `/api/buzz` | Proposed Harbor HR text posts, newest first. |
| POST | `/api/buzz` | Creates a text post of at most 500 characters. There is no photo or video upload. |
| DELETE | `/api/buzz/{id}` | Deletes that post. 204 or 404. |
| POST | `/api/maintenance/confirm` | Checks the signed-in password. Returns `{ "confirmed": true, "purge": false }`. A mismatch is 401. It does not purge data. |

`include=Current Employees Only` keeps `scope=current`. `Past Employees Only` keeps `scope=past`. `Current and Past Employees` does not filter scope. Name and supervisor filters are case-insensitive substrings. Status, job title, and sub unit are exact. These filters other than the observed Freelance status search are proposed.

2026-11-16 closeout: these routes were exercised again by the in-memory API tests and, for create, edit, and restart, by the `harbor_test` integration test. They are still Harbor HR endpoints, not observed OrangeHRM routes. See `docs/ORANGEHRM_FINAL_CLOSEOUT.md`.

Timesheet routes were added later the same day. They are proposed Harbor HR behavior. The observed OrangeHRM Time page named Select Employee, Timesheets Pending Action, and a View action that was not clicked. It did not supply a save contract. A timesheet period is at most 14 days. Each day needs hours from 0 to 24, with at most two decimal places, and at least one day must be greater than 0. Status is `pending` or `approved`. Deleting an employee who still has timesheets returns 409. The same guard covers leave requests, performance reviews, claims, and performance trackers. See `docs/REMAINING_MODULES.md`.
