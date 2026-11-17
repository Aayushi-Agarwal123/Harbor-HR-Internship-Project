# Architecture

Harbor HR is an independent application. It does not call the OrangeHRM demo and it does not use OrangeHRM source or logos.

```text
Browser (React + TypeScript + Vite)
        |  /api proxied to 127.0.0.1:8000
        v
FastAPI
        |
        v
SQLAlchemy
        |
        +-- PostgreSQL when DATABASE_URL is a postgresql:// URL
        +-- SQLite file when DATABASE_URL is unset or is a sqlite:// URL
```

Authentication is an HttpOnly cookie named `harbor_session`. Passwords are stored as PBKDF2-SHA256 hashes. The hash algorithm is a local choice. It was not observed from OrangeHRM.

The React app keeps the current page in `frontend/src/routes.ts`. `parsePath` reads the browser pathname, and navigation uses `history.pushState`. Query strings such as `/leave?start=apply` and `/time?start=mine` are read by those pages. A visitor without a session sees only Login or the local forgot-password note.

Each sidebar module has a page in `frontend/src/App.tsx`. `UnobservedPage.tsx` is not used. Controls that were seen on OrangeHRM and not used stay disabled. Saves that were not clicked on the demo are proposed Harbor HR behavior.

PIM Employee List, Add, Edit, Details, and Delete use the local `/api/employees` routes. Local sort and page size are PROPOSED query parameters. Demo header clicks did not change `sortField` or `sortOrder`. Employee Reports loads local titles from `GET /api/reports`. A local reports filter is PROPOSED. It is not a verified OrangeHRM search result. Live Reports Search and Reset were not completed.
