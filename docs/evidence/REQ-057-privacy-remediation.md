# REQ-057 privacy remediation

Date: 2026-11-15. No account label, password, cookie, or token is printed in this note.

## Acceptance

Exclude secrets, cookies, tokens, and personal account data from shared artifacts.

## What changed

- `docs/screen-inventory.md`: three quoted account display labels replaced with a neutral statement that the header label was present and is not copied.
- `docs/pim-implementation-blueprint.md`: the sentence that named capture-specific header labels was replaced with neutral wording. Those labels are capture chrome, not a required account model.
- `docs/assumptions.md`: the inline local password was removed. The note now points at `HARBOR_LOCAL_PASSWORD` in the ignored `.env`.
- `tests/e2e/hrms.spec.ts`: login reads `HARBOR_LOCAL_PASSWORD` from the environment or from the ignored `.env`. The invalid-login literal `wrong-password` was left in place. It is not the fixture.
- `.env`: `HARBOR_LOCAL_PASSWORD` was added. A comparison script reported one candidate in application source, the candidates agreed, and the written value matched that candidate. The value was not printed and was not changed.
- `.gitignore`: `evidence/review-screenshots/harbor-login-1440.png` was added after pixel inspection showed the public password hint.

Original evidence JSON was not deleted, overwritten, renamed, or force-added. Application source was not changed. Nothing was staged or committed.

## Field comparison of proposed copies

Ten pairs. For each pair the recursive compare reported exactly two differences, both extra keys on the copy. No non-sensitive value differed. Evidence IDs were not among the differences.

| Original | Copy result |
|---|---|
| Nine files with `header_account_label` | Nonempty value becomes null. Extra keys: `header_account_label_present`, `header_account_label_saved`. |
| `evidence/pim-interaction-investigation/reports-page-2026-11-13.json` | `account_label` nonempty becomes null. Extra keys: `account_label_present`, `account_label_saved`. |

The copies are not accepted. Equivalence is not established while extra keys exist.

## Screenshot pixels

| File | Account header | Other personal or secret text | Ignored |
|---|---|---|---|
| `screenshots/login-viewport.png` | No signed-in header | Public password hint is visible | Yes, `screenshots/*.png` |
| `screenshots/dashboard-viewport.png` | Yes | Account header | Yes |
| `screenshots/pim-employee-list-viewport.png` | Yes | Account header | Yes |
| `evidence/review-screenshots/harbor-login-1440.png` | No | Public password hint is visible in a field | Yes, named rule |
| `evidence/review-screenshots/harbor-login-390.png` | No | Password field is masked | No |
| Redesign login images | No | Empty fields. Local username text only | No |
| Harbor dashboard, employee-list, add-employee, and reports review images that were opened | No demo account header | Local synthetic display name, synthetic stand-in rows, report titles, or the previously documented add-employee id text | No |

`harbor-dashboard-390.png` was not present at the expected path. It was not treated as an inspected image.

## Git

`git check-ignore -v` matched:

- `.env` at `.gitignore:22`
- `evidence/employee-list.redacted.json` at line 9 (representative of the named JSON rules)
- the three PIM evidence notes at lines 19–21
- `screenshots/login-viewport.png` and `screenshots/dashboard-viewport.png` at `screenshots/*.png`
- `evidence/review-screenshots/harbor-login-1440.png` at line 7

`docs/screen-inventory.md`, `tests/e2e/hrms.spec.ts`, `backend/app/seed.py`, and `evidence/review-screenshots/harbor-dashboard-1440.png` were not ignored. `git ls-files` returned no tracked paths for the checked set. Ignored files still contain their original bytes.

## Rescan

Markdown, tests, JSON, and configuration were scanned for the known account-label strings and the fixture password. Matches for the labels were only the eleven original JSON files and the three PIM evidence notes. Matches for the fixture password were `backend/app/seed.py`, `frontend/src/data/synthetic.ts`, `backend/tests/test_api.py`, `backend/tests/test_postgres_integration.py`, and the ignored prototype plan. The Playwright spec, assumptions note, screen inventory, and blueprint were not in either list.

## Later pass the same day

### Credential occurrences

| File | Role | Result |
|---|---|---|
| `backend/app/seed.py` | Required seed, used only when `demo_admin` is absent | Literal removed. Reads ignored `HARBOR_LOCAL_PASSWORD`. Existing user rows are not rehashed. |
| `frontend/src/data/synthetic.ts` | Unused export. Login does not import it. | Literal removed. No UI behavior depended on it. |
| `backend/tests/test_api.py` | Backend test login body | Reads the ignored key. |
| `backend/tests/test_postgres_integration.py` | Backend test login body | Reads the ignored key. Not executed. |
| `evidence/pim-prototype-implementation-plan.md` | Documentation inside original evidence | Left unchanged. Still ignored. This is the remaining on-disk copy. |

### Redaction pairs

Ten pairs. Originals were hashed before and after and were unchanged. Each copy now has exactly one difference: the approved field changes from a nonempty string to null. The earlier extra keys were removed. Bookkeeping is only in `docs/proposed-redactions/redaction-manifest.json`. The copies are accepted as equivalent aside from that approved null.

### Screenshots

Classifications are in `docs/PRIVACY_SHARING_MANIFEST.md`. Four images show an account header or the public password hint, stay ignored, and are not sanitized. Seventeen Harbor review images were opened on this pass and do not show those. Two expected paths are absent and were not treated as inspected.

### Tests

`python -m pytest tests/test_api.py -q` in `backend/`: 4 passed, 448 warnings, 30.92s. Database URL for that process was in-memory SQLite. Playwright was not run. `test_postgres_integration.py` was not run because it recreates `harbor_test`.

### Git

`git check-ignore -v` matched `.env`, the prototype plan, a representative labeled JSON file, `screenshots/login-viewport.png`, and `harbor-login-1440.png`. The proposed copy path was not ignored. `git diff --cached -- .` printed no paths. Nothing was staged or committed.

## Verdict

Pass for the safe-to-share set defined in `docs/PRIVACY_SHARING_MANIFEST.md`. The whole project folder is still not a safe copy. Original labeled evidence remains on disk and ignored.
