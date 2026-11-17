# Data model

PROPOSED. This is not a recovered OrangeHRM schema. The SQL for PostgreSQL is `backend/migrations/001_init.sql`. SQLAlchemy creates the same tables on startup.

## users

| Column | Notes |
|---|---|
| id | Primary key |
| username | Unique. Seeded user `demo_admin` |
| password_hash | PBKDF2-SHA256 |
| display_name | Seeded `Asha Sharma` |
| role | Seeded `admin` |

## employees

| Column | Notes |
|---|---|
| id | Primary key |
| employee_number | Unique display id. Seeded from `1001` |
| first_name, middle_name, last_name | Synthetic names |
| job_title, employment_status, sub_unit | Values from the recorded dropdowns, or blank |
| supervisor | Blank in the seed |
| scope | `current` or `past`. Proposed. Seeded employees are `current`. |
| created_at, updated_at | Local timestamps |

## reports

| Column | Notes |
|---|---|
| id | Primary key |
| name | Unique. The six titles recorded on the Employee Reports screen |

## sessions

| Column | Notes |
|---|---|
| token | Primary key, random hex |
| user_id | Foreign key to users |
| created_at | Local timestamp |

## timesheets

PROPOSED Harbor HR. Not an observed OrangeHRM table. SQL: `backend/migrations/002_timesheets.sql`, also included in `001_init.sql` for a new `harbor_test` database.

| Column | Notes |
|---|---|
| id | Primary key |
| employee_id | Foreign key to employees. An employee with timesheets cannot be deleted until those rows are removed. |
| period_start, period_end | Inclusive dates. At most 14 days. Unique start per employee, and overlapping periods are rejected. |
| status | `pending` or `approved` |
| created_at, updated_at | Local timestamps |

## timesheet_days

| Column | Notes |
|---|---|
| id | Primary key |
| timesheet_id | Foreign key to timesheets. Deleted with the timesheet. |
| work_date | One row for every date in the period |
| hours | 0 through 24, two decimal places |
| description | Up to 200 characters |

## leave_requests, candidates, performance_reviews, claims

PROPOSED Harbor HR. Not observed OrangeHRM tables. SQL: `backend/migrations/003_modules.sql`, also included in `001_init.sql` for a new `harbor_test` database.

| Table | Notes |
|---|---|
| leave_requests | Employee, leave type, inclusive dates, status, and comment. End date cannot be before the start date. |
| candidates | Name, vacancy, hiring manager, application date, status, keywords, and method. No employee foreign key. |
| performance_reviews | Employee, period, due date, and status. Period end cannot be before the period start. |
| claims | Unique reference, employee, event, description, currency, submitted date, status `Submitted` or `Cancelled`, and a non-negative amount. |

## employee_contacts, emergency_contacts, vacancies, performance_trackers, buzz_posts

PROPOSED Harbor HR. Not observed OrangeHRM tables. SQL: `backend/migrations/004_workflows.sql`, also included in `001_init.sql`.

| Table | Notes |
|---|---|
| employee_contacts | One row per employee. Address, telephone, and email fields. Empty strings are allowed. |
| emergency_contacts | Name, relationship, and three telephone fields. Deleted with the employee. |
| vacancies | Job title from the recorded employee catalog, vacancy name, hiring manager, and status `Open` or `Closed`. |
| performance_trackers | Employee, tracker name, and status `Active` or `Completed`. |
| buzz_posts | Text body, author display name, and created time. No media columns. |

An employee with leave requests, reviews, claims, or performance trackers cannot be deleted until those rows are removed. Contact and emergency rows are removed with the employee.

No seeded employee uses the status Freelance, matching the live search that returned no rows.

2026-11-16 closeout: the employee, user, report, and session tables were unchanged by that check. Later the same day, proposed `timesheets` and `timesheet_days` tables were added. The integration test still recreates only `harbor_test`. It does not rewrite employee rows in `harbor`.
