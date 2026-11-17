# Harbor HR project overview

Date of this overview: 2026-11-16. This document describes the current repository. It does not replace older reports. Where an older file disagrees, the later evidence note or the requirement register is the status source.

## Objective

The guide `OrangeHRM_REA_Reverse_Engineering_Guide.md` asks for a black-box study of the public OrangeHRM demo and a small self-owned HRMS. The study must use permitted access, synthetic data, and read-only demo behavior. It must not copy OrangeHRM source, brute-force logins, scrape in bulk, or write to the shared demo. Automated scenario capture is allowed only after the site's terms are confirmed.

Harbor HR is that local application. It is a React and FastAPI program with its own API and its own PostgreSQL database named `harbor`. It does not call `opensource-demo.orangehrmlive.com`.

## Scope

In scope for the original definition of done: local login and logout, the observed sidebar, the dashboard shell, and PIM list, search, add, and local edit. Leave was optional. Admin settings were out of scope. Optional login-scenario automation and frontend script analysis were out of scope.

Later work added local screens for every observed sidebar module. Those screens keep observed labels. Saves that were not clicked on the demo are proposed Harbor HR behavior, not observed OrangeHRM saves.

## Architecture

```text
Browser (Vite, port 5173)
  → React + TypeScript
  → FastAPI (port 8000), cookie session
  → PostgreSQL database harbor
```

Playwright does not use that database. Its config starts an isolated API with SQLite `backend/harbor-e2e.db` and `HARBOR_RESET=1`. Integration tests use `harbor_test` only.

## Technologies

| Layer | Choice | Where |
|---|---|---|
| UI | React, TypeScript, Vite | `frontend/` |
| API | FastAPI | `backend/app/main.py` |
| ORM | SQLAlchemy | `backend/app/models.py` |
| Development database | PostgreSQL 16.2 through `pgserver`, not Docker | `docs/evidence/REQ-032-postgresql-version.md` |
| Sessions | HttpOnly cookie `harbor_session` | `backend/app/security.py`, `backend/app/routers/auth.py` |
| Password hash | PBKDF2-SHA256, 200000 iterations | `backend/app/security.py` |
| Tests | pytest and Playwright | `backend/tests/`, `tests/e2e/` |

Docker Compose exists as `docker-compose.yml`. Docker was not installed, so Compose startup was not demonstrated. That is REQ-051, PARTIAL.

## Major deliverables

- Redacted REA evidence under `evidence/` and inspection notes under `docs/`.
- Requirement register `docs/FINAL_REQUIREMENT_TRACEABILITY.md`, 57 rows.
- Observation tags in `docs/requirements.md`, 18 rows. That file is not the 57-row status register.
- Harbor HR source under `frontend/` and `backend/`.
- SQL migrations `backend/migrations/001_init.sql` through `004_workflows.sql`.
- This handoff set: overview, REA report, implementation report, requirement audit, timeline, and final handoff.

## Current readiness

CONDITIONALLY READY. The local application runs. REQ-003 is PARTIAL because demo capture permission was not granted. REQ-055 is NOT VERIFIED because no comparable scenario pair exists. Admin writes, the optional login scenario, and frontend script analysis stay OUT OF SCOPE.

The README section "What is implemented" still says modules other than Dashboard and PIM are outside the prototype. That sentence is stale. The source under `frontend/src/components/` implements those modules to the limits in `docs/HARBOR_HR_IMPLEMENTATION_REPORT.md`.
