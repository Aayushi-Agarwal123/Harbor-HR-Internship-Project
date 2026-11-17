# Real OrangeHRM module matrix

Source: authenticated Chrome CDP session on 2026-11-15. Landing pages only, except where a cell says otherwise. Personal row values are omitted.

| Module | Landing URL observed | Evidence | Record text | Primary controls | Status |
| --- | --- | --- | --- | --- | --- |
| Dashboard | `/web/index.php/dashboard/index` | inspect `ev_1f13c7c9…b17ab4a8`; screenshot `ev_47abd274…d814378f` | Widget empty texts: no posts; no employees on leave today | Quick Launch buttons visible, not clicked | OBSERVED landing |
| PIM | `/web/index.php/pim/viewEmployeeList` | inspect `ev_08220b53…ee14756` on the already-open tab | `(146) Records Found` | Filters and Reset/Search visible, not submitted | OBSERVED landing |
| Leave | `/web/index.php/leave/viewLeaveList` | inspect `ev_4186ec73…54d400`; screenshot `ev_8b8a4a09…459371` | `No Records Found` | Date, status, type, name, subunit filters visible, not submitted | OBSERVED landing |
| Time | `/web/index.php/time/viewEmployeeTimesheet` | inspect `ev_feb14348…b5c092` | Not extracted as a count | Employee hint and View buttons visible; View not clicked | OBSERVED landing |
| Recruitment | `/web/index.php/recruitment/viewCandidates` | inspect `ev_e2917ea2…c2c417` | `(15) Records Found` | Candidate filters visible, not submitted | OBSERVED landing |
| Admin | `/web/index.php/admin/viewSystemUsers` | inspect `ev_bb35e6a6…998d9b` | `(16) Records Found` | User filters and Add visible; Add not clicked | OBSERVED landing |
| Performance | `/web/index.php/performance/searchEvaluatePerformanceReview` | inspect `ev_c5346a30…c21c7b` | `No Records Found` | Review filters visible, not submitted | OBSERVED landing |
| Directory | `/web/index.php/directory/viewDirectory` | inspect `ev_ef101ca0…538dd1` | `(155) Records Found` | Name, job title, location filters visible, not submitted | OBSERVED landing |
| My Info | `/web/index.php/pim/viewPersonalDetails/empNumber/7` | Landing inspect `ev_4b741f09…03c409f`. Later: Contact Details `ev_a9f44f85…570f2911`, Emergency Contacts `ev_feaa0c9d…352381b8`, Job `ev_4dde5dd8…8e899cd4` | Signed-in profile. Display name not copied | Historical for the landing inspect: other sections were not opened and Save was not clicked. Later OBSERVED: Contact Details, Emergency Contacts, and Job. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened | OBSERVED landing, then three sections |
| Maintenance | `/web/index.php/maintenance/purgeEmployee` | inspect `ev_eb7e9209…d76119cd` | Credential gate, not a data table | Cancel clicked; Confirm not clicked. Returned to dashboard | OBSERVED gate only |
| Claim | `/web/index.php/claim/viewAssignClaim` | inspect `ev_b6dca58d…035557c` | `(3) Records Found` | Filters and View Details visible, not used | OBSERVED landing |
| Buzz | `/web/index.php/buzz/viewBuzz` | inspect `ev_8c491cc2…5392a43` | Feed present. Post text not copied | Share Photos, Share Video, and Post visible, not clicked | OBSERVED landing |
| Reports | not a sidebar item | Later inspect `ev_33e051ec…284e27`. This pass had none | Later text `(4) Records Found`. The earlier reports capture recorded `(5)` | Historical for this pass: the PIM Reports link was not opened. Later the Reports page was opened. Search and Reset on that page were not clicked | OBSERVED later. NOT OPENED in this pass |

Sidebar order observed on the dashboard accessibility tree: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz.
