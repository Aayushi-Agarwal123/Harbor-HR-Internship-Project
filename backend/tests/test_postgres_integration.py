"""PostgreSQL integration against harbor_test only.

This file does not import the application, so it cannot reuse the SQLite engine
from the other tests. It never connects to the development database except to
count its employees before and after.
"""

import os
import subprocess
import sys
import time
from pathlib import Path

import httpx
import psycopg
import pytest

DEV_DB = "harbor"
TEST_DB = "harbor_test"
PORT = 8011
BACKEND = Path(__file__).resolve().parents[1]


def _local_password() -> str:
    from_env = os.environ.get("HARBOR_LOCAL_PASSWORD", "").strip()
    if from_env:
        return from_env
    env_path = Path(__file__).resolve().parents[2] / ".env"
    for line in env_path.read_text(encoding="utf-8").splitlines():
        trimmed = line.strip()
        if not trimmed.startswith("HARBOR_LOCAL_PASSWORD="):
            continue
        value = trimmed.split("=", 1)[1].strip()
        if value:
            return value
    raise RuntimeError("HARBOR_LOCAL_PASSWORD is missing from the ignored environment file.")
ADMIN_DSN = "host=127.0.0.1 port=5432 user=postgres dbname=postgres"


def _require_postgres():
    try:
        psycopg.connect(ADMIN_DSN, connect_timeout=3).close()
    except Exception as error:
        pytest.skip(f"PostgreSQL is not reachable: {error}")


def _count_table(database: str, table: str) -> int | None:
    with psycopg.connect(
        f"host=127.0.0.1 port=5432 user=postgres dbname={database}",
        connect_timeout=5,
    ) as connection:
        exists = connection.execute("SELECT to_regclass(%s)", (f"public.{table}",)).fetchone()
        if exists is None or exists[0] is None:
            return None
        row = connection.execute(f"SELECT count(*) FROM {table}").fetchone()
    assert row is not None
    return int(row[0])


def _count_employees(database: str) -> int:
    with psycopg.connect(
        f"host=127.0.0.1 port=5432 user=postgres dbname={database}",
        connect_timeout=5,
    ) as connection:
        row = connection.execute("SELECT count(*) FROM employees").fetchone()
    assert row is not None
    return int(row[0])


def _recreate_test_database() -> None:
    if TEST_DB == DEV_DB or TEST_DB != "harbor_test":
        raise RuntimeError("Refusing to recreate a database that is not harbor_test.")
    admin = psycopg.connect(ADMIN_DSN, connect_timeout=5)
    admin.autocommit = True
    admin.execute(
        "SELECT pg_terminate_backend(pid) FROM pg_stat_activity "
        "WHERE datname = 'harbor_test' AND pid <> pg_backend_pid()"
    )
    admin.execute("DROP DATABASE IF EXISTS harbor_test")
    admin.execute("CREATE DATABASE harbor_test")
    admin.close()
    sql = (BACKEND / "migrations" / "001_init.sql").read_text(encoding="utf-8")
    with psycopg.connect(
        "host=127.0.0.1 port=5432 user=postgres dbname=harbor_test"
    ) as connection:
        connection.execute(sql)
        connection.commit()


def _start_api() -> subprocess.Popen:
    env = os.environ.copy()
    env["DATABASE_URL"] = "postgresql+psycopg://postgres@127.0.0.1:5432/harbor_test"
    env.pop("HARBOR_RESET", None)
    return subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", str(PORT)],
        cwd=str(BACKEND),
        env=env,
    )


def _stop(process: subprocess.Popen) -> None:
    if process.poll() is not None:
        return
    process.terminate()
    try:
        process.wait(timeout=15)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=15)


def _wait_health() -> dict:
    last_error = "no response"
    for _ in range(40):
        try:
            response = httpx.get(f"http://127.0.0.1:{PORT}/api/health", timeout=1)
            if response.status_code == 200:
                body = response.json()
                database = body.get("database", "")
                if not str(database).endswith("/harbor_test"):
                    raise RuntimeError(f"Test API is not using harbor_test: {database}")
                return body
            last_error = f"status {response.status_code}"
        except Exception as error:
            last_error = str(error)
        time.sleep(0.25)
    raise RuntimeError(f"Test API did not become ready: {last_error}")


def test_postgres_create_edit_survives_api_restart():
    _require_postgres()
    before = _count_employees(DEV_DB)
    assert before == 55
    timesheets_before = _count_table(DEV_DB, "timesheets")
    module_tables = (
        "leave_requests",
        "candidates",
        "performance_reviews",
        "claims",
        "employee_contacts",
        "emergency_contacts",
        "vacancies",
        "performance_trackers",
        "buzz_posts",
    )
    module_before = {table: _count_table(DEV_DB, table) for table in module_tables}
    _recreate_test_database()
    first = _start_api()
    employee_id = None
    sheet_id = None
    try:
        health = _wait_health()
        assert health["database"].endswith("/harbor_test")
        client = httpx.Client(base_url=f"http://127.0.0.1:{PORT}", timeout=15)
        login = client.post("/api/auth/login", json={
            "username": "demo_admin",
            "password": _local_password(),
        })
        assert login.status_code == 200
        created = client.post("/api/employees", json={
            "first_name": "Pgtest",
            "last_name": "Person",
            "employment_status": "Freelance",
        })
        assert created.status_code == 201
        employee_id = created.json()["id"]
        updated = client.patch(f"/api/employees/{employee_id}", json={
            "first_name": "Pgtest",
            "last_name": "Edited",
            "employment_status": "Freelance",
        })
        assert updated.status_code == 200
        assert updated.json()["last_name"] == "Edited"
        sheet = client.post("/api/timesheets", json={
            "employee_id": employee_id,
            "period_start": "2026-11-02",
            "period_end": "2026-11-03",
            "status": "pending",
            "days": [
                {"work_date": "2026-11-02", "hours": "8", "description": "Pgtest work"},
                {"work_date": "2026-11-03", "hours": "0", "description": ""},
            ],
        })
        assert sheet.status_code == 201
        sheet_id = sheet.json()["id"]
    finally:
        _stop(first)

    assert employee_id is not None
    assert sheet_id is not None
    second = _start_api()
    try:
        _wait_health()
        client = httpx.Client(base_url=f"http://127.0.0.1:{PORT}", timeout=15)
        login = client.post("/api/auth/login", json={
            "username": "demo_admin",
            "password": _local_password(),
        })
        assert login.status_code == 200
        again = client.get(f"/api/employees/{employee_id}")
        assert again.status_code == 200
        assert again.json()["last_name"] == "Edited"
        found = client.get("/api/employees", params={"name": "Pgtest Edited"})
        assert found.json()["total"] >= 1
        stored = client.get(f"/api/timesheets/{sheet_id}")
        assert stored.status_code == 200
        assert stored.json()["days"][0]["description"] == "Pgtest work"
        edited_sheet = client.patch(f"/api/timesheets/{sheet_id}", json={
            "employee_id": employee_id,
            "period_start": "2026-11-02",
            "period_end": "2026-11-03",
            "status": "approved",
            "days": [
                {"work_date": "2026-11-02", "hours": "7", "description": "Pgtest revised"},
                {"work_date": "2026-11-03", "hours": "0", "description": ""},
            ],
        })
        assert edited_sheet.status_code == 200
        assert edited_sheet.json()["total_hours"] == "7.00"
        assert client.delete(f"/api/timesheets/{sheet_id}").status_code == 204
        assert client.get(f"/api/timesheets/{sheet_id}").status_code == 404
        leave = client.post("/api/leave-requests", json={
            "employee_id": employee_id,
            "leave_type": "Annual",
            "start_date": "2026-12-01",
            "end_date": "2026-12-02",
            "status": "Pending Approval",
            "comment": "Pgtest leave",
        })
        assert leave.status_code == 201
        candidate = client.post("/api/candidates", json={
            "candidate_name": "Pgtest Candidate",
            "vacancy": "QA Engineer",
            "application_date": "2026-12-01",
            "status": "Shortlisted",
        })
        assert candidate.status_code == 201
        review = client.post("/api/reviews", json={
            "employee_id": employee_id,
            "period_start": "2026-01-01",
            "period_end": "2026-03-31",
            "due_date": "2026-04-15",
            "status": "In Progress",
        })
        assert review.status_code == 201
        claim = client.post("/api/claims", json={
            "employee_id": employee_id,
            "event_name": "Pgtest claim",
            "currency": "USD",
            "submitted_date": "2026-12-01",
            "amount": "10.00",
        })
        assert claim.status_code == 201
        assert client.delete(f"/api/leave-requests/{leave.json()['id']}").status_code == 204
        assert client.delete(f"/api/candidates/{candidate.json()['id']}").status_code == 204
        assert client.delete(f"/api/reviews/{review.json()['id']}").status_code == 204
        assert client.delete(f"/api/claims/{claim.json()['id']}").status_code == 204
        contact = client.put(f"/api/employees/{employee_id}/contact", json={"city": "Pune"})
        assert contact.status_code == 200
        emergency = client.post(f"/api/employees/{employee_id}/emergency-contacts", json={"name": "Pgtest Contact"})
        assert emergency.status_code == 201
        vacancy = client.post("/api/vacancies", json={"job_title": "QA Engineer", "vacancy_name": "Pgtest vacancy", "status": "Open"})
        assert vacancy.status_code == 201
        tracker = client.post("/api/trackers", json={"employee_id": employee_id, "tracker_name": "Pgtest tracker", "status": "Active"})
        assert tracker.status_code == 201
        buzz = client.post("/api/buzz", json={"body": "Pgtest post"})
        assert buzz.status_code == 201
        assert client.delete(f"/api/employees/{employee_id}/emergency-contacts/{emergency.json()['id']}").status_code == 204
        assert client.delete(f"/api/vacancies/{vacancy.json()['id']}").status_code == 204
        assert client.delete(f"/api/trackers/{tracker.json()['id']}").status_code == 204
        assert client.delete(f"/api/buzz/{buzz.json()['id']}").status_code == 204
    finally:
        _stop(second)

    assert _count_employees(DEV_DB) == before == 55
    assert _count_table(DEV_DB, "timesheets") == timesheets_before
    for table, count in module_before.items():
        assert _count_table(DEV_DB, table) == count
