# REQ-042 Employee List controls

Date: 2026-11-15.

REQ-042 stays Partial. No demo page was opened and no control was clicked for this note.

## Acceptance criteria

Traceability row: Record PIM columns, filters, pagination, empty text, and reset.

Guide section 8 also says to record search labels, optional filters, buttons, reset, table columns, visible page-size and pagination controls, empty-result messaging, search behavior after reset, loading states, validation errors, whether filters change the URL, and network method, path, and status.

Visibility is not treated as proof that a control works.

## Sources

| Source | What it supplies |
|---|---|
| `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` sections 4–7 and 13 | Columns, filter labels, pagination clicks, header clicks, glyphs |
| `evidence/pim-interaction-investigation/employee-list-interaction-2026-11-14.md` | Freelance search, empty text, Reset, page button 2 |
| `docs/evidence/REQ-038-scr04-evidence-mapping.md` | Search, empty result, and Reset mapping |
| `docs/evidence/REQ-043-api-method-path-status.md` | Method, path, and status |

## Controls

| Control | Visible or in the tree | Activated | Behavior observed | Network observed |
|---|---|---|---|---|
| Columns: checkbox, Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor, Actions | Yes. Section 4 | Not a separate action | Labels recorded | No |
| Employee Name, Employee Id, Supervisor Name | Labels and hint textboxes | Typed in the 2026-11-14 note. Search was not clicked | The record count did not change from typing | No search request |
| Job Title, Sub Unit, Include | Closed text was visible | Not changed | None | None |
| Employment Status | Options included Freelance | Freelance was selected and Search was clicked. Evidence `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` | Status text `Freelance`. Empty table. `No Records Found` | `GET /web/index.php/api/v2/pim/employees` status 200, with `empStatusId=1` on the later capture |
| Search | Button visible | Clicked for Freelance | Empty result | Status 200 |
| Reset | Button visible | Clicked after that search. Evidence `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d` | `-- Select --`, `(121) Records Found`, rows present. The Info notice was still present after 1.5 seconds | Later capture: `empStatusId` absent, status 200. Transactions `ev_958bf2bc598a5a88515bb983fe722a33b86b87d49ad675501b52056516bde060` |
| Pagination buttons `1`, `2`, `3`, and a next glyph | Yes | Button `2` in the 2026-11-14 note, `ev_4aa9dfeae3689fe1c9db1a11e3540731b8df4a3cbdb0d0d429fcaea124097f1d`. Buttons `2` and `3` later | URL unchanged. The first visible Id cell changed on the earlier page-2 click. Later queries used `offset=50` and `offset=100` | Status 200. Transactions `ev_05566f07f6331440c3662de6c0f9b4f9638b246b4fe304e31b776b686cdb5501` and `ev_19b1c588f71cd525f8a96dbff77d998b99b905fb107737001acb82ce82794e75` |
| Records-per-page | Not in the trees of `ev_6fd8c8514a6a462904f45d07df2e9ed7c2e6455718e8d6ce7927c80a4d632b1a`, `ev_eb3f4ff6018787b171d27f7a199aec5e532177848eca585a81aabbaeb720fd2b`, or `ev_8b3e6b6a157230ad98536c10a02c52520a042d85a0bff11e7d037974d4ca4b5c` | Not activated | None | None. Absence in those trees does not prove the control cannot exist |
| Header sort glyphs | Present beside the column labels. The first-name header glyph differed from the others | Two clicks completed. Parents `ev_f86463155257f631bfada23aab413de64b8fb4c51596c4993d97bc38590d6f5a` and `ev_f8463e8b835542cbe7fd74578c6c6943e964bd6523884a9eb82f4ee4caf48f91` | No added employee request. The active glyph stayed on `First (& Middle) Name` | The initial request already had `sortField=employee.firstName` and `sortOrder=ASC`. A click that changes those values is unknown |
| Row-action glyphs | Most rows have two buttons. Names are private-use glyphs, not View, Edit, or Delete. One row had only the first glyph | Not clicked | Unknown. One glyph may change or delete a record | No employee-detail request |

`empStatusId=1` matching the Freelance label is derived. It is recorded in the results file as derived.

The URL did not change for the Freelance search, Reset, or pagination. Loading states and validation errors were not recorded.

## Recorded for the acceptance sentence

Columns, the visible filter labels, one submitted Employment Status search, pagination, the empty text `No Records Found`, and Reset are in the notes above.

## Unverified

Page size was not activated. Header clicks did not establish a sort change. Row glyphs were not activated. Name, id, job, subunit, supervisor, and Include were not submitted as searches. Loading and validation behavior was not recorded.

## Status

The 2026-11-15 note left this Partial because page size, sort, and row glyphs were not activated.

## Closeout on 2026-11-16

The acceptance sentence is: record PIM columns, filters, pagination, empty text, and reset. Those five items are recorded in the results file and the 2026-11-14 interaction note.

| Item | Evidence | Class |
|---|---|---|
| Columns | Results section 4: checkbox, Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor, Actions | Observed |
| Filters | Labels recorded. Freelance was submitted. Name, id, job, subunit, supervisor, and Include were not submitted | Observed |
| Pagination | Buttons 2 and 3. Queries used `offset=50` and `offset=100`. Status 200 | Observed |
| Empty text | `No Records Found` on `ev_4a399a4fe6abb1f638af7102166384ac22461f97262c5eb40455e187114b399d` | Observed |
| Reset | `ev_b3f179e1ba18e38f80d2d391f8d41eba4edfe11a6b78ca4b93d399b91e1ee00d` | Observed |

Sort clicks, records-per-page, and row glyphs stay Unknown. They are not items in this sentence. Sort remains REQ-037. No new capture was made.

REQ-042 is Pass for its sentence.
