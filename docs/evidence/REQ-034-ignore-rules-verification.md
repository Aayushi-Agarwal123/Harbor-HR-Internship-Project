# REQ-034 ignore-rule verification

Date: 2026-11-15.

REQ-034 is Pass. No file was deleted, staged, or committed. No account label or password is copied here.

## Acceptance criteria

Ignore unsanitized evidence, profiles, and secrets.

The guide says to ignore `evidence/`, browser profiles, and secrets unless the artifacts have been reviewed and sanitized. This change does not ignore the whole `evidence/` directory, and it does not ignore every JSON file.

## Previous rules

`.gitignore` already ignored `evidence/*.raw.json`, `screenshots/*.png`, `*.log`, `backend/*.db`, and `backend/pgdata/`. It did not ignore screenshot JSON or the browser JSON files that still store an account label.

## Rules added

| Pattern | Purpose |
|---|---|
| `screenshots/*.json` | Screenshot metadata JSON |
| Ten named evidence JSON paths | Browser JSON whose account-label field is stored, including `evidence/leave-list.redacted.json` |
| Three named evidence Markdown paths | Notes the privacy audit says quote those labels |
| `.env`, `.env.*`, `credentials.json`, `secrets.json` | Secret files. `.env` now holds the local database password and is ignored. The other secret filenames are not present. |

`evidence/navigation.redacted.json` and `evidence/login-page.redacted.json` are not listed. The dashboard file stores a null account field. The login file stores a redaction marker rather than a password. `docs/proposed-redactions/` is not ignored. Those copies were not accepted as a full replacement, and they are documentation rather than the original labeled JSON.

No browser-profile directory exists at the project root. The directories present are `backend`, `docs`, `evidence`, `frontend`, `node_modules`, `scenarios`, `screenshots`, `test-results`, and `tests`. No profile name was available to add.

## Git tracking

`git status --short` showed the evidence files, screenshot JSON, `.gitignore`, and `docker-compose.yml` as untracked. `git ls-files --error-unmatch` did not find `evidence/employee-list.redacted.json` or `docker-compose.yml` in the index. No sensitive path inspected here is already tracked, so `.gitignore` does not have to remove an existing index entry. Nothing was staged.

## Verification

`git check-ignore -v` matched:

| Path | Rule |
|---|---|
| `evidence/employee-list.redacted.json` | its own named line |
| `evidence/leave-list.redacted.json` | its own named line |
| `evidence/pim-interaction-investigation/reports-page-2026-11-13.json` | its own named line |
| `evidence/pim-inspection-summary.md` | its own named line |
| `screenshots/login-viewport.json` | `screenshots/*.json` |
| `screenshots/login-viewport.png` | the existing PNG rule |

The same command did not match `evidence/navigation.redacted.json`, `evidence/login-page.redacted.json`, `evidence/timesheets-menu.redacted.json`, `evidence/api-observations.md`, `docs/proposed-redactions/employee-list.redacted.json`, or `frontend/src/App.tsx`.

## Compose password

The Compose file has one service, `db`. The password was used only by that database service, as `POSTGRES_PASSWORD`. There is no application service in the file. Service name, image, user, database name, and port `5432` were left unchanged.

The existing value was copied into `.env` under `HARBOR_DB_PASSWORD`. No `.env` file existed before this change. The Compose line is now `POSTGRES_PASSWORD: ${HARBOR_DB_PASSWORD}`. The password was not changed and is not recorded here.

## Secret-safe verification

| Check | Result |
|---|---|
| Password line is the environment reference | Pass |
| Compose lines other than the existing user and database settings contain the previous password | 0 |
| `.env` has one non-empty `HARBOR_DB_PASSWORD` entry and matches the previous value | Pass |
| `git check-ignore -v -- .env` | Matches `.gitignore` line `.env` |
| `git status --short` for `.env` | Not listed |
| `git ls-files` for `.env`, `docker-compose.yml`, and `.gitignore` | No tracked paths |
| `docker-compose.yml` and `.gitignore` | Untracked. Not staged |

`docker`, `docker-compose`, and `podman` are not installed, and PyYAML is not installed. `docker compose config` was not run. The available check compared the Compose structure: one service, the same image, user, database, and port, and a password reference whose name matches `.env`. Nothing was started, and no database connection was opened.

## Profiles

No browser-profile directory is present, so there is no profile path to ignore and no profile name was invented.

## Status

Pass. Unsanitized browser JSON, the labeled evidence notes, and screenshot JSON stay ignored. Accepted sanitized JSON such as `evidence/navigation.redacted.json` stays unignored. The local database password is only in ignored `.env`.
