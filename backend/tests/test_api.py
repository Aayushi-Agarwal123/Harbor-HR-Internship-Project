import os
from pathlib import Path

os.environ["DATABASE_URL"] = "sqlite:///:memory:"


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

from fastapi.testclient import TestClient

from app.main import app


def client():
    from app.database import Base, engine
    Base.metadata.drop_all(bind=engine)
    return TestClient(app)


def test_login_logout_and_protection():
    with client() as api:
        assert api.get("/api/employees").status_code == 401
        bad = api.post("/api/auth/login", json={"username": "demo_admin", "password": "wrong"})
        assert bad.status_code == 401
        good = api.post("/api/auth/login", json={"username": "demo_admin", "password": _local_password()})
        assert good.status_code == 200
        assert good.json()["display_name"] == "Asha Sharma"
        listed = api.get("/api/employees")
        assert listed.status_code == 200
        body = listed.json()
        assert body["total"] == 55
        assert len(body["items"]) == 50
        assert body["items"][0]["employee_number"] == "1001"
        freelance = api.get("/api/employees", params={"employment_status": "Freelance"})
        assert freelance.json()["total"] == 0
        found = api.get("/api/employees", params={"name": "Asha Sharma"})
        assert found.json()["total"] >= 1
        assert api.post("/api/auth/logout").status_code == 200
        assert api.get("/api/employees").status_code == 401


def test_create_update_validation_and_reload():
    with client() as api:
        api.post("/api/auth/login", json={"username": "demo_admin", "password": _local_password()})
        invalid = api.post("/api/employees", json={"first_name": "", "last_name": ""})
        assert invalid.status_code == 422
        assert "first_name" in invalid.json()["detail"]
        created = api.post("/api/employees", json={
            "first_name": "Local",
            "middle_name": "Test",
            "last_name": "Person",
            "employment_status": "Freelance",
            "job_title": "QA Engineer",
            "sub_unit": "Engineering",
        })
        assert created.status_code == 201
        employee_id = created.json()["id"]
        assert created.json()["employee_number"].isdigit()
        updated = api.patch(f"/api/employees/{employee_id}", json={
            "first_name": "Local",
            "last_name": "Updated",
            "employment_status": "Freelance",
        })
        assert updated.status_code == 200
        assert updated.json()["last_name"] == "Updated"
        again = api.get(f"/api/employees/{employee_id}")
        assert again.json()["last_name"] == "Updated"
        rejected = api.post("/api/employees", json={
            "first_name": "Local",
            "last_name": "Person",
            "employment_status": "Not A Real Status",
        })
        assert rejected.status_code == 422
        removed = api.delete(f"/api/employees/{employee_id}")
        assert removed.status_code == 204
        assert api.get(f"/api/employees/{employee_id}").status_code == 404


def test_sort_page_size_and_reports():
    with client() as api:
        api.post("/api/auth/login", json={"username": "demo_admin", "password": _local_password()})
        assert api.get("/api/employees", params={"page_size": 7}).status_code == 422
        page = api.get("/api/employees", params={"page_size": 10, "sort": "last_name", "direction": "desc"})
        body = page.json()
        assert body["page_size"] == 10
        assert len(body["items"]) == 10
        assert body["items"][0]["last_name"] == "Sharma"
        assert api.get("/api/reports").json()[3]["name"] == "PIM Sample Report"
        assert len(api.get("/api/reports").json()) == 6
        api.post("/api/auth/logout")
        assert api.get("/api/reports").status_code == 401


def _sheet(employee_id: int, hours: str = "8") -> dict:
    return {
        "employee_id": employee_id,
        "period_start": "2026-11-02",
        "period_end": "2026-11-03",
        "status": "pending",
        "days": [
            {"work_date": "2026-11-02", "hours": hours, "description": "Project work"},
            {"work_date": "2026-11-03", "hours": "0", "description": ""},
        ],
    }


def test_timesheet_validation_edit_and_delete():
    with client() as api:
        assert api.get("/api/timesheets").status_code == 401
        api.post("/api/auth/login", json={"username": "demo_admin", "password": _local_password()})
        assert api.get("/api/timesheets").json()["total"] == 0
        employee_id = api.get("/api/employees").json()["items"][0]["id"]
        missing_body = {**_sheet(employee_id), "employee_id": None, "days": []}
        rejected = api.post("/api/timesheets", json=missing_body)
        assert rejected.status_code == 422
        assert "employee_id" in rejected.json()["detail"]
        too_long = api.post("/api/timesheets", json={
            "employee_id": employee_id,
            "period_start": "2026-11-02",
            "period_end": "2026-12-31",
            "status": "pending",
            "days": [],
        })
        assert too_long.status_code == 422
        created = api.post("/api/timesheets", json=_sheet(employee_id))
        assert created.status_code == 201
        sheet_id = created.json()["id"]
        assert created.json()["status"] == "pending"
        assert created.json()["total_hours"] == "8.00"
        overlap = api.post("/api/timesheets", json=_sheet(employee_id, "4"))
        assert overlap.status_code == 422
        empty = api.get("/api/timesheets", params={"period_start": "1999-01-01", "period_end": "1999-01-02"})
        assert empty.json()["total"] == 0
        found = api.get("/api/timesheets", params={"employee_id": employee_id, "status": "pending"})
        assert found.json()["total"] == 1
        edited = api.patch(f"/api/timesheets/{sheet_id}", json={
            **_sheet(employee_id, "6.5"),
            "status": "approved",
            "days": [
                {"work_date": "2026-11-02", "hours": "6.5", "description": "Revised"},
                {"work_date": "2026-11-03", "hours": "1", "description": ""},
            ],
        })
        assert edited.status_code == 200
        assert edited.json()["status"] == "approved"
        assert edited.json()["total_hours"] == "7.50"
        again = api.get(f"/api/timesheets/{sheet_id}")
        assert again.json()["days"][0]["description"] == "Revised"
        unknown = api.get("/api/timesheets/999999")
        assert unknown.status_code == 404
        blocked = api.delete(f"/api/employees/{employee_id}")
        assert blocked.status_code == 409
        assert api.delete(f"/api/timesheets/{sheet_id}").status_code == 204
        assert api.get(f"/api/timesheets/{sheet_id}").status_code == 404
        assert api.get("/api/timesheets").json()["total"] == 0


def test_sqlite_file_survives_a_new_connection(tmp_path):
    from sqlalchemy.orm import sessionmaker

    from app.database import Base, make_engine
    from app.models import Employee
    from app.seed import seed

    url = f"sqlite:///{(tmp_path / 'harbor.db').as_posix()}"
    first = make_engine(url)
    Base.metadata.create_all(bind=first)
    db = sessionmaker(bind=first)()
    seed(db)
    db.close()
    first.dispose()
    second = make_engine(url)
    db = sessionmaker(bind=second)()
    assert db.query(Employee).count() == 55
    db.close()
    second.dispose()
