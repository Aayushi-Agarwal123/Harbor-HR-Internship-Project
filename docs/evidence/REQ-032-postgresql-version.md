# REQ-032 PostgreSQL version

Date: 2026-11-15.

Acceptance text from `docs/FINAL_REQUIREMENT_TRACEABILITY.md`: check Node, REA, Chrome, Python, and PostgreSQL prerequisites.

The guide, section 2, asks for Node supported by the installed REA release, a recent Chrome, Python 3.11 or newer, and PostgreSQL for the new application. It does not name a PostgreSQL minor version.

## PostgreSQL

| Item | Value | What it is |
|---|---|---|
| Running postmaster | PostgreSQL 16.2 | Server announcement |
| Data directory `PG_VERSION` | `16` | Catalog major version only |
| Compose image tag | `postgres:16` | Not the process that is running |

The running process is PID 22564, name `postgres`, started 14-11-2026 23:06:24. Its executable is the `pgserver` copy of `postgres.exe`. `backend/pgdata/postmaster.pid` names that same PID and the data directory `backend/pgdata`.

`backend/pgdata/server.log` line 1, written by PID 22564 at 2026-11-14 17:36:25 GMT, says `starting PostgreSQL 16.2`. That clock time is the same local start time. The log has no later startup line. The same PID is still writing checkpoints on 2026-11-15.

No `psql`, `pg_config`, or SQL command was run. `harbor` and `harbor_test` were not opened. The 16.2 string is the server process's own startup line, not a client tool version and not a file-version resource.

## Other prerequisites already recorded

| Check | Record | Source |
|---|---|---|
| Node | 24.22.1 | `docs/evidence/REQ-056-rea-doctor.md` |
| npm | 11.19.1 | Traceability row, earlier shell read |
| REA doctor | Exit 0, `rea-agents` 6.9.0, Cursor registration aligned | `docs/evidence/REQ-056-rea-doctor.md` |
| Python | 3.12.10 | Traceability row, earlier shell read |
| Chrome | 157.0.8103.51 | `docs/REA_EMPLOYEE_DETAILS_AND_LIST_RESULTS.md` |

Chrome was not queried again in this pass. The earlier observation remains the check. Doctor was not run again.
