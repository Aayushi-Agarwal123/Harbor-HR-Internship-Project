# Final privacy audit

Date: 2026-11-15. Trees inspected: `evidence/`, `docs/`, and `tests/`, plus `docker-compose.yml` and `playwright.config.ts`.

No application source, original evidence JSON, database, or backup was modified. This report does not repeat account display labels, passwords, cookies, tokens, or session identifiers.

## Files inspected

JSON, Markdown, and test sources under `evidence/`, `docs/`, and `tests/` were scanned for account-label keys, password keys, cookie and token keys, and email-shaped strings. A separate text search looked for the two account display strings already known from earlier evidence. Those strings are not printed here.

`evidence/navigation.redacted.json` was parsed. Its account field is null, presence is true, and the value was not saved. Its inspection ID is `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`. Neither known account display string is in that file.

## Categories

| Category | Where | Sensitive | Action |
|---|---|---|---|
| Dashboard account label | Removed from `evidence/navigation.redacted.json`. | It was an account display label. The retained file no longer holds it. | No further change to that file. |
| Account display labels in other original JSON | `evidence/employee-list.redacted.json`, `evidence/employee-list-2026-11-12.redacted.json`, `evidence/add-employee.redacted.json`, `evidence/pim-reports.redacted.json`, `evidence/pim-interaction-investigation/reports-page-2026-11-13.json`, `evidence/time-landing.redacted.json`, `evidence/assign-leave.redacted.json`, `evidence/my-leave.redacted.json`, `evidence/leave-apply.redacted.json`. | Yes. These are signed-in display labels, not public widget titles. | Leave the originals unchanged. Use `docs/proposed-redactions/`. |
| Same labels quoted in documentation | `docs/screen-inventory.md` and `docs/pim-implementation-blueprint.md` still quote them for PIM captures. `evidence/pim-inspection-summary.md`, `evidence/pim-final-handoff.md`, and `evidence/pim-prototype-implementation-plan.md` still quote them. | Yes, where they repeat an account display label. | Dashboard sentences already use a neutral description. Historical PIM sentences were left because they still match original evidence. Do not copy them into new reports. |
| Public login username hint | `docs/screen-inventory.md` records the username hint shown on the public login card. | The guide allows noting a hint the login page itself shows. | Do not add the password hint. |
| Password hint placeholder | `evidence/login-page.redacted.json` stores a redaction marker in `password_line`, not the hint text. | The marker is not the secret. | Do not replace it with the real hint. |
| Synthetic local account | The guide example and `tests/e2e/hrms.spec.ts` use the local fixture username and password. `docs/assumptions.md` also names that fixture. | No. It is the local Harbor HR fixture, not an OrangeHRM or personal credential. | Do not copy the password into new reports. Do not treat it as a live secret. |
| Compose database password | `docker-compose.yml` sets a local database password. | It is a local development secret. | Not copied into this audit. Compose was not run. |
| Employee names in live captures | Later list captures contained employee rows. They were not written into the results document. | Yes. | Do not paste those rows into docs. |
| Email addresses | No personal email addresses were reported by the scan of `evidence/`, `docs/`, and `tests/`. | None found. | None. |
| Cookies and tokens | No non-empty cookie or token value was printed by the key scan. Network captures that requested headers redacted the cookie value in the tool result and those values were not saved into the project. | Not retained in the project files scanned. | Do not add them. |

## Proposed redactions

Ten JSON copies exist under `docs/proposed-redactions/`. None of them contains the two account display strings found in the original files. `reports-page-2026-11-13.json` has `account_label` set to null. The other nine copies do not have an `account_label` or `visible_user_label` key. Originals were not overwritten. This audit did not claim a field-by-field equivalence beyond that string check.

## Documentation changes in this audit

- `docs/assumptions.md`: the old in-memory database sentence is marked historical. The dashboard identity sentence was already neutral.
- `docs/pim-implementation-blueprint.md`: the zero-request limit is marked as applying to the three 2026-11-12 inspects.
- `docs/screen-inventory.md` and `docs/workflow-specifications.md`: dashboard wording was already neutral. They were not edited.
- Evidence JSON and evidence Markdown were not edited.

## Remaining risks

Sharing the original JSON and the PIM evidence Markdown would publish account display labels. Screenshot PNGs, where present, may show the same header. The local test password remains in the test file and assumptions note by design. The debugging session is on the login page and was not used to collect new personal data in this audit.

## Remediation recorded later the same day

This section supersedes the shareable-document and Playwright-spec findings above. Original evidence was not deleted, renamed, or overwritten. No value is printed here.

- `docs/screen-inventory.md` and `docs/pim-implementation-blueprint.md` no longer quote account display labels. The inspection facts stay, with neutral wording.
- `docs/assumptions.md` no longer contains the local fixture password. It names the ignored key `HARBOR_LOCAL_PASSWORD`.
- `tests/e2e/hrms.spec.ts` no longer contains the local fixture password. It reads `HARBOR_LOCAL_PASSWORD` from the process environment or the ignored `.env`. The value written to `.env` matches the existing application fixture. The credential was not changed.
- The local fixture password is still present in `backend/app/seed.py`, `frontend/src/data/synthetic.ts`, `backend/tests/test_api.py`, and `backend/tests/test_postgres_integration.py`. Those files were not changed, because changing them would change application or backend-test startup. `evidence/pim-prototype-implementation-plan.md` also still contains it and remains ignored.
- Eleven original JSON files still contain a nonempty account-label field, including `evidence/leave-list.redacted.json`, which the table above omitted. They remain ignored and unchanged. The three PIM evidence notes still quote the labels and remain ignored.
- The ten proposed copies were compared field by field. Every non-sensitive field matched. Each copy sets the account-label field to null and adds two bookkeeping keys (`header_account_label_present` and `header_account_label_saved`, or the `account_label` equivalents). Because of those extra keys, the copies are not accepted as equivalent.
- Pixel inspection: `screenshots/login-viewport.png` shows the public password hint. `screenshots/dashboard-viewport.png` and `screenshots/pim-employee-list-viewport.png` show a signed-in account header. `evidence/review-screenshots/harbor-login-1440.png` shows the public password hint in a field. Those four stay ignored. The other Harbor review images inspected do not show a demo account header or the password hint. They do show the local synthetic display name or synthetic stand-in rows.
- A rescan of Markdown, tests, JSON, and config found the account-label strings only in the eleven ignored JSON files and the three ignored PIM notes. The Playwright spec and the two cleaned docs were clean.
- Git: `.env`, the eleven JSON files, the three PIM notes, `screenshots/*.png`, and `evidence/review-screenshots/harbor-login-1440.png` match `.gitignore`. `git ls-files` returned no tracked paths for the checked set. Ignored does not mean deleted or sanitized.

At that point REQ-057 was still Partial: the fixture password was still in application source, and the proposed copies were not equivalent. The next section replaces that conclusion.

## Second remediation the same day

This section supersedes the fixture-password and proposed-copy findings above. Original evidence was not modified. No value is printed here.

- `backend/app/seed.py` now hashes `HARBOR_LOCAL_PASSWORD` from the environment or the ignored `.env` only when the local user is absent. The existing database row is not rewritten. The literal was removed.
- `frontend/src/data/synthetic.ts` no longer exports the fixture password. The login screen never imported it. Username `demo_admin` remains.
- `backend/tests/test_api.py` and `backend/tests/test_postgres_integration.py` read the same ignored key. `python -m pytest tests/test_api.py -q` from `backend/` reported 4 passed in 30.92s against in-memory SQLite. The PostgreSQL integration test and Playwright were not run.
- `evidence/pim-prototype-implementation-plan.md` still contains the fixture password. It is documentation in original evidence, so it was left unchanged. It remains ignored.
- The ten proposed copies were regenerated from the originals. Each differs by one field: the approved account-label value changes from a nonempty string to null. No extra keys remain. SHA-256 of each original was unchanged. Bookkeeping is in `docs/proposed-redactions/redaction-manifest.json`.
- A rescan found the fixture password only in the ignored prototype plan, and the account-label strings only in the eleven ignored JSON files and the three ignored PIM notes.
- `docs/PRIVACY_SHARING_MANIFEST.md` is the sharing boundary. A full folder copy is not safe. The four unsafe screenshots stay ignored and are not described as sanitized.
- `git diff --cached` for this directory was empty. Nothing was staged or committed.

REQ-057 meets the exclusion criterion for the manifest's safe-to-share set. See the traceability row.
