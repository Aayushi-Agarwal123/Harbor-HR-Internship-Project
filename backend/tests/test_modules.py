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


def _login(api: TestClient) -> int:
    assert api.post("/api/auth/login", json={"username": "demo_admin", "password": _local_password()}).status_code == 200
    listed = api.get("/api/employees", params={"page_size": 10})
    assert listed.status_code == 200
    return listed.json()["items"][0]["id"]


def test_leave_requires_auth_and_rejects_bad_dates():
    with client() as api:
        assert api.get("/api/leave-requests").status_code == 401
        employee_id = _login(api)
        missing = api.post("/api/leave-requests", json={})
        assert missing.status_code == 422
        too_long = api.post("/api/leave-requests", json={
            "employee_id": employee_id,
            "leave_type": "Annual",
            "start_date": "2026-01-01",
            "end_date": "2026-03-01",
            "status": "Pending Approval",
        })
        assert too_long.status_code == 422
        created = api.post("/api/leave-requests", json={
            "employee_id": employee_id,
            "leave_type": "Sick",
            "start_date": "2026-11-02",
            "end_date": "2026-11-03",
            "status": "Pending Approval",
            "comment": "Clinic",
        })
        assert created.status_code == 201
        body = created.json()
        assert body["days"] == 2
        updated = api.patch(f"/api/leave-requests/{body['id']}", json={
            "employee_id": employee_id,
            "leave_type": "Annual",
            "start_date": "2026-11-02",
            "end_date": "2026-11-02",
            "status": "Cancelled",
            "comment": "Clinic",
        })
        assert updated.status_code == 200
        assert updated.json()["status"] == "Cancelled"
        assert api.delete(f"/api/leave-requests/{body['id']}").status_code == 204
        assert api.get("/api/leave-requests").json()["total"] == 0


def test_candidate_review_and_claim_round_trip():
    with client() as api:
        employee_id = _login(api)
        candidate = api.post("/api/candidates", json={
            "candidate_name": "Local Candidate",
            "vacancy": "QA Engineer",
            "application_date": "2026-11-01",
            "status": "Application Initiated",
            "method": "Manual",
        })
        assert candidate.status_code == 201
        candidate_id = candidate.json()["id"]
        found = api.get("/api/candidates", params={"candidate_name": "Local", "keywords": "none"})
        assert found.json()["total"] == 0
        found = api.get("/api/candidates", params={"candidate_name": "Local"})
        assert found.json()["total"] == 1
        review = api.post("/api/reviews", json={
            "employee_id": employee_id,
            "period_start": "2026-01-01",
            "period_end": "2026-06-30",
            "due_date": "2026-07-15",
            "status": "Activated",
        })
        assert review.status_code == 201
        claim = api.post("/api/claims", json={
            "employee_id": employee_id,
            "event_name": "Travel",
            "description": "Train",
            "currency": "USD",
            "submitted_date": "2026-11-04",
            "amount": "12.50",
        })
        assert claim.status_code == 201
        assert claim.json()["status"] == "Submitted"
        dated = api.get("/api/claims", params={"start_date": "2026-11-04", "end_date": "2026-11-04"})
        assert dated.json()["total"] == 1
        outside = api.get("/api/reviews", params={"start_date": "2027-01-01", "end_date": "2027-02-01"})
        assert outside.json()["total"] == 0
        assert claim.json()["reference_code"].startswith("CLM-")
        bad_amount = api.post("/api/claims", json={
            "employee_id": employee_id,
            "event_name": "Travel",
            "currency": "USD",
            "submitted_date": "2026-11-04",
            "amount": "-1",
        })
        assert bad_amount.status_code == 422
        blocked = api.delete(f"/api/employees/{employee_id}")
        assert blocked.status_code == 409
        assert api.delete(f"/api/candidates/{candidate_id}").status_code == 204
        assert api.delete(f"/api/reviews/{review.json()['id']}").status_code == 204
        assert api.delete(f"/api/claims/{claim.json()['id']}").status_code == 204


def test_profile_vacancy_tracker_buzz_and_maintenance():
    with client() as api:
        employee_id = _login(api)
        saved = api.put(f"/api/employees/{employee_id}/contact", json={"city": "Pune", "work_email": "asha@example.test"})
        assert saved.status_code == 200
        assert saved.json()["city"] == "Pune"
        bad_email = api.put(f"/api/employees/{employee_id}/contact", json={"work_email": "not-an-email"})
        assert bad_email.status_code == 422
        cleared = api.put(f"/api/employees/{employee_id}/contact", json={"city": "", "work_email": ""})
        assert cleared.status_code == 200
        assert api.get(f"/api/employees/{employee_id}/contact").json()["city"] == ""
        emergency = api.post(f"/api/employees/{employee_id}/emergency-contacts", json={"name": "Local Contact", "relationship": "Sibling"})
        assert emergency.status_code == 201
        assert api.get(f"/api/employees/{employee_id}/emergency-contacts").json()["total"] == 1
        assert api.delete(f"/api/employees/{employee_id}/emergency-contacts/{emergency.json()['id']}").status_code == 204
        vacancy = api.post("/api/vacancies", json={"job_title": "QA Engineer", "vacancy_name": "Local vacancy", "status": "Open"})
        assert vacancy.status_code == 201
        changed = api.patch(f"/api/vacancies/{vacancy.json()['id']}", json={"job_title": "QA Engineer", "vacancy_name": "Local vacancy", "status": "Closed"})
        assert changed.status_code == 200
        assert changed.json()["id"] == vacancy.json()["id"]
        assert changed.json()["status"] == "Closed"
        tracker = api.post("/api/trackers", json={"employee_id": employee_id, "tracker_name": "Local tracker", "status": "Active"})
        assert tracker.status_code == 201
        blocked = api.delete(f"/api/employees/{employee_id}")
        assert blocked.status_code == 409
        post = api.post("/api/buzz", json={"body": "Local post"})
        assert post.status_code == 201
        assert post.json()["body"] == "Local post"
        empty = api.post("/api/buzz", json={"body": " "})
        assert empty.status_code == 422
        wrong = api.post("/api/maintenance/confirm", json={"password": "wrong-password"})
        assert wrong.status_code == 401
        assert api.delete(f"/api/vacancies/{vacancy.json()['id']}").status_code == 204
        assert api.delete(f"/api/trackers/{tracker.json()['id']}").status_code == 204
        assert api.delete(f"/api/buzz/{post.json()['id']}").status_code == 204
