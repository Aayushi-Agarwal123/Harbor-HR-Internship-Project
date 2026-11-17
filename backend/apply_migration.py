"""Apply the PostgreSQL migration. Run only when the local server is up."""

from pathlib import Path

import psycopg

ROOT = Path(__file__).resolve().parent
SQL = (ROOT / "migrations" / "001_init.sql").read_text(encoding="utf-8")

admin = psycopg.connect("host=127.0.0.1 port=5432 user=postgres dbname=postgres")
admin.autocommit = True
exists = admin.execute("SELECT 1 FROM pg_database WHERE datname = 'harbor'").fetchone()
if exists is None:
    admin.execute("CREATE DATABASE harbor")
    print("created harbor")
else:
    print("harbor exists")
admin.close()

with psycopg.connect("host=127.0.0.1 port=5432 user=postgres dbname=harbor") as db:
    db.execute(SQL)
    db.commit()
    version = db.execute("SELECT version()").fetchone()[0]
    tables = db.execute(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1"
    ).fetchall()
    print(version.split(",")[0])
    print([row[0] for row in tables])
