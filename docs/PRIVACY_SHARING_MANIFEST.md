# Privacy sharing boundary

Date: 2026-11-15. A rescan on 2026-11-17 did not change this boundary. This manifest defines what may be copied as a shared artifact. It does not create an archive. Git ignore rules do not make a full folder copy safe. Copy only the safe-to-share set below.

2026-11-17 rescan: every JSON file under `evidence/` was checked for nonempty `header_account_label`, `account_label`, and `visible_user_label`. The ten originals already listed still have a nonempty account label. Their sanitized copies under `docs/proposed-redactions/` were rewritten from those originals with that field set to null. Originals were not edited. Attendance, timesheet, navigation, and login JSON did not have a nonempty account-label string. `login-page.redacted.json` still stores a redaction marker in `password_line`, not the hint text. The three PIM Markdown notes and the four excluded screenshots stay local only.

No account label, password, cookie, or token is printed here.

## Safe to share

- Application source under `frontend/` and `backend/app/`, after the local fixture password was removed from `frontend/src/data/synthetic.ts` and `backend/app/seed.py`. Seed reads `HARBOR_LOCAL_PASSWORD` from the environment or the ignored `.env`.
- `backend/tests/test_api.py` and `backend/tests/test_postgres_integration.py`. They read the same ignored key. They do not contain the fixture password.
- `tests/e2e/hrms.spec.ts`. It reads the same ignored key. The invalid-login literal `wrong-password` is not the fixture.
- Documentation under `docs/`, including this manifest, except nothing in `docs/` was found to contain the account-label strings or the fixture password on the 2026-11-15 rescan.
- `docs/proposed-redactions/`. Each of the ten copies differs from its original only by setting the approved account-label field to null. Bookkeeping is in `docs/proposed-redactions/redaction-manifest.json` and does not contain the label text.
- Harbor review screenshots listed under "Inspected and safe to share" below.
- Sanitized evidence that the rescan did not flag, including `evidence/navigation.redacted.json` and `evidence/login-page.redacted.json`. The login file stores a redaction marker in `password_line`, not the hint text.

## Local only

- `.env` and `.env.*`. Ignored. Contains `HARBOR_LOCAL_PASSWORD` and `HARBOR_DB_PASSWORD`.
- `backend/pgdata/`, `backend/*.db`, `test-results/`, and `playwright-report/`. Ignored runtime data.

## Ignored original evidence

These files still contain account labels or the fixture password. They were not deleted, overwritten, or renamed. Ignored means excluded from Git, not sanitized.

- Eleven JSON files named in `.gitignore` lines 9–18, including `evidence/leave-list.redacted.json` and `evidence/pim-interaction-investigation/reports-page-2026-11-13.json`.
- `evidence/pim-inspection-summary.md`
- `evidence/pim-final-handoff.md`
- `evidence/pim-prototype-implementation-plan.md` (documentation-only copy of the local fixture password; left unchanged because it is original evidence)

## Excluded screenshots

Pixel-inspected. Not sanitized. Kept ignored.

| File | Why excluded |
|---|---|
| `screenshots/login-viewport.png` | Public password hint is visible. No signed-in header. |
| `screenshots/dashboard-viewport.png` | Signed-in account header is visible. |
| `screenshots/pim-employee-list-viewport.png` | Signed-in account header is visible. |
| `evidence/review-screenshots/harbor-login-1440.png` | Public password hint is visible in a field. |

## Inspected and safe to share

These Harbor review images were opened and read on 2026-11-15. None shows a demo account header or the public password hint. They show local synthetic names, local report titles, the public username hint, the local username, or the previously documented add-employee id text `0374`.

- `evidence/review-screenshots/harbor-login-390.png`
- `evidence/review-screenshots/harbor-login-redesign-1440.png`
- `evidence/review-screenshots/harbor-login-redesign-390.png`
- `evidence/review-screenshots/harbor-dashboard-1440.png`
- `evidence/review-screenshots/harbor-dashboard-redesign-1440.png`
- `evidence/review-screenshots/harbor-dashboard-redesign-390.png`
- `evidence/review-screenshots/harbor-employee-list-1440.png`
- `evidence/review-screenshots/harbor-employee-list-redesign-1440.png`
- `evidence/review-screenshots/harbor-employee-list-redesign-390.png`
- `evidence/review-screenshots/harbor-add-employee-1440.png`
- `evidence/review-screenshots/harbor-add-employee-redesign-1440.png`
- `evidence/review-screenshots/harbor-add-employee-redesign-390.png`
- `evidence/review-screenshots/harbor-reports-1440.png`
- `evidence/review-screenshots/harbor-reports-redesign-390.png`
- `evidence/review-screenshots/harbor-reports-hint-1440.png`
- `evidence/review-screenshots/harbor-reports-hint-redesign-1440.png`
- `evidence/review-screenshots/harbor-reports-search-redesign-1440.png`

## Not inspected

`harbor-dashboard-390.png` and `harbor-reports-redesign-1440.png` are not in the tree. A missing path was not treated as an inspected image.

## Not a shareable package

Do not zip or copy the project folder as a whole. That copy would include `.env`, the eleven labeled JSON files, the three PIM evidence notes, and the four excluded screenshots.
