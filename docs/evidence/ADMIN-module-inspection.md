# Admin module inspection

Date: 2026-11-16. No new capture was made. The hosted demo was not opened. No user was created, edited, or deleted. Harbor HR source and the database were not changed.

## This pass

REQ-003 is still Not Verified. The demo site's own usage terms were not found, so no new inspect, search, reset, sort, or pagination action was run.

`list_browser_targets` against `http://127.0.0.1:9222` returned `provider_unavailable` / `endpoint_unreachable`. No already authorized reference session was available on that endpoint. The demo was not launched to create one.

The notes below reclassify the retained 2026-11-15 Admin landing. They do not add observations.

## Retained records

| Record | Role |
| --- | --- |
| `ev_c4e8f17820a36696d634b21ae5d798d2f223ddba99c881110317ef9e28838c74` | Parent for the sidebar Admin click |
| `ev_c0660395e2f8e2074da227ea2f6e7b8707c45ce66ac841db2ccf712f62b980f9` | Summary of that click |
| `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b` | System Users inspect, 2026-11-15T13:19:32.332Z–13:19:32.978Z |
| `ev_379dbf7544b6ea44469721179a7aa303a29a60177e668426bd224d7dbe2e0fbc` | Transaction view for the requests on that landing |

Source write-up: `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`, Admin section. No screenshot was retained for this pass.

## Observed

- Sidebar Admin opened `/admin/viewSystemUsers`.
- Heading `System Users`. Breadcrumb text `/ User Management`.
- Filters named Username, User Role, Employee Name, and Status.
- Buttons or labels named Reset, Search, and Add were visible. None of them was clicked.
- Table columns: a checkbox glyph, Username, User Role, Employee Name, Status, Actions.
- Visible topbar texts included User Management, Job, Organization, Qualifications, Configuration, Nationalities, and Corporate Branding. None was opened.
- Requests on that landing: `GET /admin/viewAdminModule` returned 302; `GET /admin/viewSystemUsers` returned 200; `GET /api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC` returned 200; `GET /api/v2/admin/job-titles?limit=0` returned 200.
- Usernames and employee names were present and were not copied.

## Derived

- The page text on that visit was `(16) Records Found`. That count belongs to the 2026-11-15 visit. It is not a stored Harbor HR total.
- The users request asked for `limit=50` and `offset=0`. The report does not say how many user objects were in the response body.

## Inferred

None. The job-titles request happened on the System Users landing, and the recorded filters do not include a job-title filter. That request is not treated as a hidden control.

## Unknown

- What Search returns, including an empty result and a non-empty result.
- What Reset changes.
- Whether a pagination control was on the page, and what a page change does.
- Whether a column header changes `sortField` or `sortOrder`. The landing request already contained `sortField=u.userName` and `sortOrder=ASC`. That is the request URL, not a completed sort click.
- Option lists for User Role and Status.
- The Add System User fields, required markers, and Save result.
- What the Actions controls do. Their accessible names were not recorded.
- The contents of Job, Organization, Qualifications, Configuration, Nationalities, and Corporate Branding.
- Any role or permission editor.

## Unverified interactions

| Interaction | Status |
| --- | --- |
| Search | Not clicked |
| Reset | Not clicked |
| Add | Not clicked |
| Pagination | Not recorded and not clicked |
| Column sort | Not clicked |
| Actions | Not clicked |
| User Management siblings and the other topbar destinations | Not opened |
| Create, edit, delete, role change | Not performed |

## Blocked

A further read-only Admin inspection needs REQ-003 to be verified first, and then an already authorized session or an explicitly allowed read-only visit. Until then, Admin create, update, delete, validation, pagination, and permissions stay unimplemented.
