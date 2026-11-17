"""Start the local PostgreSQL cluster when Docker is not available.

Requires the pgserver package, which bundles PostgreSQL binaries.
The cluster directory is backend/pgdata and is not committed.
"""

from pathlib import Path

from pgserver import initdb, pg_ctl

ROOT = Path(__file__).resolve().parent / "pgdata"
ROOT.mkdir(parents=True, exist_ok=True)

if not (ROOT / "PG_VERSION").exists():
    initdb(
        ["--username=postgres", "--auth=trust", "--encoding=UTF8", "--locale=C"],
        pgdata=ROOT,
    )

try:
    print(pg_ctl(
        ["-o", "-h 127.0.0.1 -p 5432", "-l", str(ROOT / "server.log"), "start"],
        pgdata=ROOT,
    ))
except Exception as error:
    print(f"PostgreSQL was not started by this call: {error}")
    print("If it is already listening on 127.0.0.1:5432, that is expected.")
