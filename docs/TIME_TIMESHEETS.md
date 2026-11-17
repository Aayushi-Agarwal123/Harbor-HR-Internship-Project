# Time / Timesheets

Date: 2026-11-16.

## Observed OrangeHRM

Employee Timesheets, evidence `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092` and the later menu record `ev_f21e12e4b410cfe749a8aba59cdde03f27cb7d800e00431f2e68d9d05f4e62d7` in `evidence/timesheets-menu.redacted.json`.

Observed: menu items My Timesheets and Employee Timesheets, headings Select Employee and Timesheets Pending Action, required Employee Name with hint `Type for hints...`, a View button, and columns Employee Name, Timesheet Period, and Actions. Row View was not clicked. Cell values were not saved.

My Timesheet, evidence `ev_b2964dacd0d97287223046488621ca652a325b2375b113426e34a6b85e2a273a` in `evidence/my-timesheet.redacted.json`.

Observed: heading My Timesheet, a Timesheet Period textbox, the text `Status: Not Submitted`, and buttons Edit and Submit. Neither button was clicked. The table headers were Project, Activity, seven day columns, and Total. Cell values were not saved.

Attendance pages were inspected later and are read-only in Harbor HR. Punch In/Out was not opened. Reports and Project Info were not opened. Evidence: `ev_447ce00756b52a7807fd89457201b3bfa8e95ef93d71b6d3b41145f2a6c76d20`, `ev_e9f5a940406b49657cc689d00eee9173ab3c02f94d3fa3b2cd5314e24b3e79ac`, and `ev_128a904448936a1bc6394d57b8de44cc5381c85fe96eba7b51c9233655b07cbd`.

## Harbor HR

`/time` lists stored timesheets in the observed columns. View, Edit, and Submit stay disabled because those clicks were not recorded. The page does not approve, reject, edit, or delete a timesheet.

`/time?start=mine` shows the observed My Timesheet labels and an empty project grid. It does not write a timesheet.

Attendance Employee Records, My Records, and Configuration show the observed headings and controls. View and Save stay disabled. No attendance rows are stored. Configuration checkboxes are shown in the observed checked state and are not saved.

The existing `/api/timesheets` routes remain for records already stored. They are not offered as OrangeHRM Edit or Submit behavior. Existing rows in PostgreSQL `harbor` are left in place.
