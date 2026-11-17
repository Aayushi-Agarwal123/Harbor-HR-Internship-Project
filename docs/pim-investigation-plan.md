# PIM employee listing investigation plan

The employee list was inspected on 2026-11-07. Target `660BA0A9B3088498822D072A31181E01` at `/web/index.php/pim/viewEmployeeList`.

## Captured

- Inspect: `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`
- Screenshot: `ev_fb4d142679c1230653c9075f9edc08f6524639653c0d9afa12d4a82e5f3f9175`
- Target list that identified the page: `ev_4af2c097de2a60a472864b650ec771d5ac66e1307bb18f981d95dd5b1f4432ee`
- Redacted structure: `evidence/employee-list.redacted.json`

The sidebar href `/web/index.php/pim/viewPimModule` is still only the dashboard link. This capture's URL is `viewEmployeeList`. No click in this inspection joined those two URLs.

## Still open

- Search and Reset results, including empty-result text and any URL change.
- Option lists behind `-- Select --` and `Current Employees Only`.
- Which pager button is current, and whether a records-per-page control exists off the captured tree.
- Names and destinations of the two Actions icons.
- Configuration and employee details. The Add Employee form and the Reports list were inspected on 2026-11-12 without clicking Save, Search, or a row icon. See `evidence/add-employee.redacted.json` and `evidence/pim-reports.redacted.json`.
- Network method, path, and status. `observation_ms` was 0, so no request was in the attach window.

## Blocked on 2026-11-12

`capture_browser_scenario` did not attach to `660BA0A9B3088498822D072A31181E01`. The handshake exceeded 60000 ms and cleanup of `browser_transport` was not confirmed. No Add Employee, detail, edit, delete, search, pager, Reports, or Configuration evidence was produced. The employee-list URL stayed the same (`ev_83367613c47f35ae650bed39d6dcff08fb27ee31d101c5f84f434225f2367337`).

The Add Employee page was later already open as target `DD1A1F0F2209E9F7A9E9630279980C1F`. Passive inspect and screenshot succeeded. Nothing was typed or saved.

Do not add, edit, or delete demo employees. A later read-only pass can still open a row icon or a filter without saving or confirming a delete.
