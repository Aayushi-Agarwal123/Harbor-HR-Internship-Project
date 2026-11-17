# Navigation map

## Observed

Login page and dashboard were separate Chrome profiles.

```text
public site root
  → login URL was the clean-profile target
       /web/index.php/auth/login
       form action /web/index.php/auth/validate
       Login button result: not observed

dashboard URL was already open in the first profile
  /web/index.php/dashboard/index
  sidebar links, document order:
    Admin        /web/index.php/admin/viewAdminModule
    PIM          /web/index.php/pim/viewPimModule
    Leave        /web/index.php/leave/viewLeaveModule
    Time         /web/index.php/time/viewTimeModule
    Recruitment  /web/index.php/recruitment/viewRecruitmentModule
    My Info      /web/index.php/pim/viewMyDetails
    Performance  /web/index.php/performance/viewPerformanceModule
    Dashboard    /web/index.php/dashboard/index
    Directory    /web/index.php/directory/viewDirectory
    Maintenance  /web/index.php/maintenance/viewMaintenanceModule
    Claim        /web/index.php/claim/viewClaimModule
    Buzz         /web/index.php/buzz/viewBuzz
```

Evidence: `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`.

The employee-list page was later open on a different target, not by this inspection clicking the sidebar.

```text
PIM employee list
  target 660BA0A9B3088498822D072A31181E01
  /web/index.php/pim/viewEmployeeList
  module links: Configuration, Employee List, Add Employee, Reports
```

Evidence: `ev_8e5ed00755e70c237bd5761ee055730f112992a1b6542880cf3103f6aecef493`. The hrefs of those four module links were not retained. Quick Launch buttons still have visible names and no captured destination.

The Add Employee page was later open on its own target. This inspection did not click through to it.

```text
PIM Add Employee
  target DD1A1F0F2209E9F7A9E9630279980C1F
  /web/index.php/pim/addEmployee
```

Evidence: `ev_be00ceda12cde310042497635bcc6f35e976a956c86d1ec1d76a36e2e88be56b`.

## Not observed

- Whether the Login button navigates to the dashboard. UNKNOWN.
- Logout control and logout result. No logout control name was identified, and logout was not attempted. UNKNOWN.
- Historical, first map: contents of Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, Buzz, and Admin were not opened. Later OBSERVED: the sidebar landings in `docs/REAL_ORANGEHRM_INTERACTION_MATRIX.md`. Subpages that the inspection report still lists as unopened remain UNKNOWN.
- The Configuration menu items remain UNKNOWN. The Reports list is a separate observed page at `/web/index.php/pim/viewDefinedPredefinedReports`. The Add Employee form is also observed.
- Historical, first map: no employee detail page. Later OBSERVED: the signed-in My Info sections in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. A selected Employee List row remains UNKNOWN.
- Dashboard search-box behavior. UNKNOWN.
- Forgot-password destination. The link text was present; the href was not retained. UNKNOWN.

## Live evidence pass after REA registration repair

No navigation was observed. Port 9222 was not listening, so the authorized browser session was not available. No new route was recorded.
