# GitHub publication review

Date: 2026-11-17. Publication was **not** performed. No commit was created. No remote was added.

Intended repository, after approval: a new **private** repository `Harbor-HR-Internship-Project` under https://github.com/Aayushi-Agarwal123. It did not exist as a project remote when this note was written.

## Critical Git finding

`git rev-parse --show-toplevel` from this folder returned `C:/Users/Aayushi Agarwal`. That is the Windows user profile, not this project. It has no project remote. Publishing from that repository would upload the home directory.

A separate Git repository must be created **inside** `orangehrm-rea-poc` before any add, commit, or push. Do not run those commands from the user profile.

## Approved for a future private repository

Application and tests:

- `README.md`, `.gitignore`, `.env.example`
- `package.json`, `package-lock.json`, `playwright.config.ts`, `docker-compose.yml`
- `frontend/` source, `frontend/package.json`, and `frontend/package-lock.json`
- `backend/app/`, `backend/migrations/`, `backend/tests/`, `backend/requirements.txt`, `backend/start_postgres.py`, `backend/apply_migration.py` if present
- `tests/e2e/`

Documentation that describes this project:

- `docs/*.md` except `docs/VEEVA_HANDOFF.md`
- `docs/evidence/`
- `docs/proposed-redactions/`

Reviewed local Harbor HR screenshots listed as exceptions in `.gitignore`. Not `evidence/review-screenshots/harbor-login-1440.png`.

## Excluded

| Path | Reason |
|---|---|
| `.env` | Local password and database password |
| `backend/pgdata/`, `backend/*.db`, `backend/*.db.backup*` | Local databases, including `harbor` data and Playwright SQLite |
| `evidence/` originals, except the reviewed screenshots named above | Account labels, raw captures, or files that were not cleared for sharing |
| `screenshots/` | Demo captures, including a visible password hint |
| `evidence/review-screenshots/harbor-login-1440.png` | Password hint is visible |
| `docs/VEEVA_HANDOFF.md` | Internal handoff, not part of the public internship record |
| `frontend/node_modules/`, `frontend/dist/`, `test-results/`, `playwright-report/` | Generated files |
| The user-profile Git repository | Unrelated personal files |

Original evidence files were not edited or deleted. The database was not reset.

## Security checks done

- `.env.example` contains placeholders only.
- `.gitignore` ignores `.env` and allows `.env.example`.
- Docker Compose uses `${HARBOR_DB_PASSWORD}` and does not contain a password value.
- The application password is read from the environment in `backend/app/seed.py`. It is not in `frontend/src/data/synthetic.ts`.
- Sanitized JSON copies under `docs/proposed-redactions/` set the account-label field to null. The originals still contain the labels and stay ignored.
- No GitHub push was attempted, so no secret was published by this pass.

## Steps after approval

Create an empty private repository in the browser or with GitHub CLI. Do not add a README, license, or `.gitignore` on GitHub, because this folder already has them.

```powershell
cd C:\Users\Aayushi Agarwal\Downloads\orangehrm-rea-poc
git init
git status
git add -A
git status
git diff --cached --stat
```

Stop if `git status` shows `.env`, `backend/pgdata`, a `.db` file, `docs/VEEVA_HANDOFF.md`, or an original file under `evidence/` other than an allowed screenshot.

```powershell
git commit -m "Initial commit: Harbor HR internship project"
git remote add origin https://github.com/Aayushi-Agarwal123/Harbor-HR-Internship-Project.git
git push -u origin HEAD
```

Confirm the repository visibility is private before the push.
