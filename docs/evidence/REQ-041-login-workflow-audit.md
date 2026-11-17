# REQ-041 login workflow audit

Date: 2026-11-16. No demo page was opened. No test was executed.

## Acceptance

Guide section 7 deliverable: `docs/workflow-specifications.md` section WF-01 Login, with a precondition, UI action, visible result, success and failure outcomes, uncertainties, and evidence IDs.

The same section forbids claiming a cryptographic algorithm, password hashing scheme, database tables, or authorization checks from the login UI.

The traceability sentence is that deliverable: evidence IDs, outcomes, and no cryptographic claims about OrangeHRM.

REQ-014 is the live login and logout observation. REQ-015 is the local rebuild. REQ-035 is the login screen inventory. Those are not this row.

## Evidence read

- `docs/workflow-specifications.md` WF-01 and WF-02
- `docs/screen-inventory.md` SCR-01
- `backend/app/security.py`
- `test-results/isolated/tc-report.json`

## Mapping

| Criterion | Evidence | Class | Result |
|---|---|---|---|
| Precondition and landing URL | WF-01. Login URL `/web/index.php/auth/login`. `ev_6e407e02060f349249623f3f748b83e3fec1abd0369af2b2791dca8581157f68` | Observed | Pass |
| Control labels | Textboxes `Username` and `Password`, button `Login`, link `Forgot your password?` | Observed | Pass |
| Evidence IDs | Inspect `ev_23bfc60faeae4f0c355e5c412e68490990ab6198db4734c3dae15b671783944c`. Screenshot `ev_61ac6bec158cc7e31c3df8a4fc549e42181dd969793e51efc3a2725e70773351` | Observed | Pass |
| UI action | WF-01 says the button was not clicked and the form was not submitted | Observed as no action | Pass for the recorded non-submission |
| Visible result before submit | Heading `Login`, form action URL `/web/index.php/auth/validate`, footer recorded | Observed | Pass |
| Success outcome | WF-01 marks it unknown. No post-login navigation was seen in that session | Unknown | Not Verified |
| Failure outcome | WF-01 marks it unknown. No error text was present | Unknown | Not Verified |
| Uncertainties | Method value, token input, validation rules, cookie, and hashing are listed as unknown | Observed as documented unknowns | Pass |
| No OrangeHRM cryptographic claim | WF-01 says hashing cannot be claimed from the UI. `security.py` uses PBKDF2-SHA256 for Harbor HR only | Observed | Pass |
| Dashboard already open | WF-02. Cause unknown. Storage was not read | Unknown | Not a login success |
| Local TC-01, TC-02, TC-09, TC-10 | Isolated report: those titles passed. Stats expected 5, unexpected 0. Start `2026-11-15T13:49:54.446Z` | Observed local tests | Not demo outcomes |

## REQ-003

REQ-003 remains Not Verified. A new login submission or logout capture is not authorized.

## Status

Partial. The workflow section exists and does not claim an OrangeHRM hash. The success and failure outcomes were not observed.
