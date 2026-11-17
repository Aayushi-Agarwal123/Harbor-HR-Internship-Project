# Real OrangeHRM interaction matrix

Each row is one controlled action or a visible control that was not used. No write, save, delete, or unidentified glyph was clicked.

| ID | Action | Result | Evidence | Classification |
| --- | --- | --- | --- | --- |
| I-01 | List CDP targets | Two page targets: dashboard and employee list | `ev_82a5413a545bef32102c1df946dbfaf4e23d95e37403295c35bc0993a464d4ef` | OBSERVED |
| I-02 | Passive inspect dashboard | Widgets, Quick Launch, sidebar, footer `OrangeHRM OS 5.9` | `ev_1f13c7c91dd5b277aa84b42deeb3c735f24d3a85157b837624972a0db17ab4a8` | OBSERVED |
| I-03 | Viewport screenshot of dashboard | 1298×812 PNG retained by REA, not copied into the repo | `ev_47abd274e6f17f93bfe172071bdf71f36627b5323ec6b6728443ecd0d814378f` | OBSERVED |
| I-04 | Reload dashboard URL | Stayed on `/dashboard/index`. Dashboard XHR 200. `POST /events/push` 200 occurred on load | parent `ev_2086bff34ee3ad3e6942d5f92fc933bc4494bf8722109e5841656a98824568c6` | OBSERVED. Push was a load side effect, not an intentional HR write |
| I-05 | Click sidebar Leave | URL `/leave/viewLeaveList` | same parent as I-04 | OBSERVED |
| I-06 | Passive inspect Leave List | Filters, columns, empty state | `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400` | OBSERVED |
| I-07 | Viewport screenshot of Leave List | PNG retained by REA, not copied into the repo | `ev_8b8a4a09b54750760f705818042c30dc2d2956c00df353cab70fa905c3459371` | OBSERVED |
| I-08 | Click sidebar Time | URL `/time/viewEmployeeTimesheet` | parent `ev_c0f681b921285cd023c211f16dd674156e6683f9ff7afbfe169637de0b5e6647` | OBSERVED |
| I-09 | Time `View` buttons | Visible. Not clicked | inspect `ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092` | NOT_TESTED_FOR_SAFETY |
| I-10 | Click sidebar Recruitment | URL `/recruitment/viewCandidates` | parent `ev_8d48b7fc4cea38475c24a6f6c5438b9eac62156514066792083fea1812d2c977` | OBSERVED |
| I-11 | Recruitment Vacancies link | Visible. Not clicked | inspect `ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417` | NOT OPENED |
| I-12 | Click sidebar Admin | URL `/admin/viewSystemUsers` | parent `ev_c4e8f17820a36696d634b21ae5d798d2f223ddba99c881110317ef9e28838c74` | OBSERVED |
| I-13 | Admin Add and configuration links | Visible. Not clicked | inspect `ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b` | NOT_TESTED_FOR_SAFETY |
| I-14 | Click sidebar Performance | URL `/performance/searchEvaluatePerformanceReview` | parent `ev_7a22bc10b617a51314a50e2438222e248243cf58770f1d39fb1c16ce2e59f42b` | OBSERVED |
| I-15 | Performance tracker links | Visible. Not clicked | inspect `ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b` | NOT OPENED |
| I-16 | Click sidebar Directory | URL `/directory/viewDirectory` | parent `ev_858ef433aec3452ba05306422c3bfd5f862f4914279c60523a72fe5698a7fc5e` | OBSERVED |
| I-17 | Passive inspect existing PIM tab | Employee Information filters and columns; `(146) Records Found` | `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756` | OBSERVED |
| I-18 | Search, Reset, header sort, pagination, records-per-page on these landings | Not used | — | NOT_TESTED |
| I-19 | Click sidebar Maintenance | URL `/maintenance/purgeEmployee`, credential gate | parent `ev_e07d5f008637b5205232c93317aedce823559b742b6e7c7cd96e580228a7e05d` | OBSERVED |
| I-20 | Click Cancel on the Maintenance gate | Returned to `/dashboard/index`. Confirm was not clicked and no password was entered | parent `ev_67629becaf54f0c43ff24aa51d4c11ff9b3a4f5752d228672d7906f8fe6a375b` | OBSERVED |
| I-21 | Click sidebar Claim | URL `/claim/viewAssignClaim` | parent `ev_ed33e6030b3e6f2555b478c53559f67edf83d87dd6505bc55ddee5d4fbdd2220` | OBSERVED |
| I-22 | Claim View Details, Assign Claim, Submit Claim, My Claims | Visible. Not clicked | inspect `ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c` | NOT_TESTED_FOR_SAFETY |
| I-23 | Click sidebar Buzz | URL `/buzz/viewBuzz` | parent `ev_4281190da2a56e51c5c86bc110c5bc9c7a473af96d04ef5487ce779c2b43605f` | OBSERVED |
| I-24 | Buzz Post, Share Photos, Share Video | Visible. Not clicked | inspect `ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43` | NOT_TESTED_FOR_SAFETY |
| I-25 | Click sidebar My Info | URL `/pim/viewPersonalDetails/empNumber/7` after `GET /pim/viewMyDetails` 302 | parent `ev_9a2d026acdae15644b9d5c9d6c3fab4b4a081931d33d1300834c2c0ea3389acd` | OBSERVED |
| I-26 | My Info Save and profile sections | Historical for inspect `ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f`: Save was visible and was not clicked, and the other section links were not opened. Later OBSERVED: Contact Details, Emergency Contacts, and Job. Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were not opened. | Contact Details `ev_a9f44f855b29a326268d61216b81b2d02207f61b6d820709bd006782570f2911`. Emergency Contacts `ev_feaa0c9deabab990ec19640c23fd0355e031a035ce2a5db6d412789c352381b8`. Job `ev_4dde5dd8d89d76ac62980f9016ddb3be5a7c2641936d5f4028108d778e899cd4`. | OBSERVED for those three later sections. Save remains NOT_TESTED_FOR_SAFETY |
| I-27 | PIM Add Employee, PIM Reports, and the other subpages | Historical for this matrix: Add Employee and Reports were visible and not opened. Later OBSERVED: Add Employee opened, and Employee Reports opened. Reports Search and Reset were not clicked. Leave subpages, Recruitment Vacancies, Admin configuration, and Performance trackers remain NOT OPENED. | Add Employee parent `ev_7141fc8f91b03e12fbb766ad5c69a2cb869d0c70789d43df34dfddfbeef03f0f`, inspect `ev_703e7eb79eed5ccda4fd45f4b8518e24b4ebccbbf4f559c94bd5296910efd83b`. Reports parent `ev_7e1a433836baaf52869b90f93e0ea411342525506eeca7a19a3c72bb1c817982`, inspect `ev_33e051ec8aa002ec8039587d8e6c4f20b37b147f5d4c4a4bca32f2e513284e27`. | OBSERVED for those two later pages. The named subpages stay NOT OPENED |

Request paths and statuses for each opened landing are in `docs/REAL_ORANGEHRM_INSPECTION_REPORT.md`. Response bodies were not saved.
