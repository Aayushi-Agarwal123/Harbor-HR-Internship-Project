from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from ..catalog import JOB_TITLES
from ..database import get_db
from ..deps import current_user
from ..models import (
    BuzzPost,
    EmergencyContact,
    Employee,
    EmployeeContact,
    PerformanceTracker,
    User,
    Vacancy,
)
from ..proposed import TRACKER_STATUSES, VACANCY_STATUSES
from ..security import verify_password
from ..validation import clean

profile_router = APIRouter(tags=["profile"])
vacancy_router = APIRouter(prefix="/api/vacancies", tags=["recruitment"])
tracker_router = APIRouter(prefix="/api/trackers", tags=["performance"])
buzz_router = APIRouter(prefix="/api/buzz", tags=["buzz"])
maintenance_router = APIRouter(prefix="/api/maintenance", tags=["maintenance"])


class ContactIn(BaseModel):
    street1: str = ""
    street2: str = ""
    city: str = ""
    state: str = ""
    postal_code: str = ""
    country: str = ""
    home_phone: str = ""
    mobile_phone: str = ""
    work_phone: str = ""
    work_email: str = ""
    other_email: str = ""


class EmergencyIn(BaseModel):
    name: str = ""
    relationship: str = ""
    home_phone: str = ""
    mobile_phone: str = ""
    work_phone: str = ""


class VacancyIn(BaseModel):
    job_title: str = ""
    vacancy_name: str = ""
    hiring_manager: str = ""
    status: str = "Open"


class TrackerIn(BaseModel):
    employee_id: int | None = None
    tracker_name: str = ""
    status: str = "Active"


class BuzzIn(BaseModel):
    body: str = ""


class ConfirmIn(BaseModel):
    password: str = ""


def _employee(db: Session, employee_id: int) -> Employee:
    row = db.get(Employee, employee_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Employee was not found.")
    return row


def _email(value: str, field: str, errors: dict[str, str]) -> str:
    text = clean(value, 120)
    if text and "@" not in text:
        errors[field] = "Enter an email address."
    return text


def _contact_values(payload: ContactIn) -> dict:
    errors: dict[str, str] = {}
    values = {
        "street1": clean(payload.street1, 120),
        "street2": clean(payload.street2, 120),
        "city": clean(payload.city, 80),
        "state": clean(payload.state, 80),
        "postal_code": clean(payload.postal_code, 20),
        "country": clean(payload.country, 80),
        "home_phone": clean(payload.home_phone, 40),
        "mobile_phone": clean(payload.mobile_phone, 40),
        "work_phone": clean(payload.work_phone, 40),
        "work_email": _email(payload.work_email, "work_email", errors),
        "other_email": _email(payload.other_email, "other_email", errors),
    }
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return values


def _emergency_values(payload: EmergencyIn) -> dict:
    errors: dict[str, str] = {}
    name = clean(payload.name, 120)
    if not name:
        errors["name"] = "Name is required."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "name": name,
        "relationship": clean(payload.relationship, 60),
        "home_phone": clean(payload.home_phone, 40),
        "mobile_phone": clean(payload.mobile_phone, 40),
        "work_phone": clean(payload.work_phone, 40),
    }


def _contact_out(row: EmployeeContact) -> dict:
    return {key: getattr(row, key) for key in ContactIn.model_fields}


@profile_router.get("/api/employees/{employee_id}/contact")
def read_contact(employee_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    _employee(db, employee_id)
    row = db.get(EmployeeContact, employee_id)
    if row is None:
        return {key: "" for key in ContactIn.model_fields}
    return _contact_out(row)


@profile_router.put("/api/employees/{employee_id}/contact")
def save_contact(employee_id: int, payload: ContactIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    _employee(db, employee_id)
    values = _contact_values(payload)
    row = db.get(EmployeeContact, employee_id)
    if all(value == "" for value in values.values()):
        if row is not None:
            db.delete(row)
            db.commit()
        return {key: "" for key in ContactIn.model_fields}
    if row is None:
        row = EmployeeContact(employee_id=employee_id, **values)
        db.add(row)
    else:
        for key, value in values.items():
            setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return _contact_out(row)


@profile_router.get("/api/employees/{employee_id}/emergency-contacts")
def list_emergency(employee_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    _employee(db, employee_id)
    rows = db.query(EmergencyContact).filter(EmergencyContact.employee_id == employee_id).order_by(EmergencyContact.id).all()
    return {"total": len(rows), "items": [
        {
            "id": row.id,
            "name": row.name,
            "relationship": row.relationship,
            "home_phone": row.home_phone,
            "mobile_phone": row.mobile_phone,
            "work_phone": row.work_phone,
        }
        for row in rows
    ]}


@profile_router.post("/api/employees/{employee_id}/emergency-contacts", status_code=201)
def create_emergency(employee_id: int, payload: EmergencyIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    _employee(db, employee_id)
    row = EmergencyContact(employee_id=employee_id, **_emergency_values(payload))
    db.add(row)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "name": row.name, "relationship": row.relationship, "home_phone": row.home_phone, "mobile_phone": row.mobile_phone, "work_phone": row.work_phone}


@profile_router.delete("/api/employees/{employee_id}/emergency-contacts/{contact_id}", status_code=204)
def delete_emergency(employee_id: int, contact_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(EmergencyContact, contact_id)
    if row is None or row.employee_id != employee_id:
        raise HTTPException(status_code=404, detail="Emergency contact was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


def _vacancy_values(payload: VacancyIn) -> dict:
    errors: dict[str, str] = {}
    job_title = clean(payload.job_title, 80)
    name = clean(payload.vacancy_name, 120)
    if job_title not in JOB_TITLES:
        errors["job_title"] = "Choose a recorded job title."
    if not name:
        errors["vacancy_name"] = "Vacancy name is required."
    status = _choice(payload.status, VACANCY_STATUSES, "status", errors)
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {"job_title": job_title, "vacancy_name": name, "hiring_manager": clean(payload.hiring_manager, 120), "status": status}


def _choice(value: str, allowed: tuple[str, ...], field: str, errors: dict[str, str]) -> str:
    text = clean(value, 40)
    if text not in allowed:
        errors[field] = "Choose one of the Harbor HR options."
    return text


@vacancy_router.get("")
def list_vacancies(db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    rows = db.query(Vacancy).order_by(Vacancy.vacancy_name, Vacancy.id).all()
    return {"total": len(rows), "items": [
        {"id": row.id, "job_title": row.job_title, "vacancy_name": row.vacancy_name, "hiring_manager": row.hiring_manager, "status": row.status}
        for row in rows
    ]}


@vacancy_router.post("", status_code=201)
def create_vacancy(payload: VacancyIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = _vacancy_values(payload)
    row = Vacancy(**values)
    db.add(row)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "job_title": row.job_title, "vacancy_name": row.vacancy_name, "hiring_manager": row.hiring_manager, "status": row.status}


@vacancy_router.patch("/{vacancy_id}")
def update_vacancy(vacancy_id: int, payload: VacancyIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Vacancy, vacancy_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Vacancy was not found.")
    for key, value in _vacancy_values(payload).items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "job_title": row.job_title, "vacancy_name": row.vacancy_name, "hiring_manager": row.hiring_manager, "status": row.status}


@vacancy_router.delete("/{vacancy_id}", status_code=204)
def delete_vacancy(vacancy_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Vacancy, vacancy_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Vacancy was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


def _tracker_out(row: PerformanceTracker) -> dict:
    return {
        "id": row.id,
        "employee_id": row.employee_id,
        "employee_name": f"{row.employee.first_name} {row.employee.last_name}",
        "tracker_name": row.tracker_name,
        "status": row.status,
    }


@tracker_router.get("")
def list_trackers(employee_id: int | None = None, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    query = db.query(PerformanceTracker).options(joinedload(PerformanceTracker.employee))
    if employee_id is not None:
        query = query.filter(PerformanceTracker.employee_id == employee_id)
    rows = query.order_by(PerformanceTracker.id).all()
    return {"total": len(rows), "items": [_tracker_out(row) for row in rows]}


@tracker_router.post("", status_code=201)
def create_tracker(payload: TrackerIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    errors: dict[str, str] = {}
    if not payload.employee_id or db.get(Employee, payload.employee_id) is None:
        errors["employee_id"] = "Choose an employee that exists."
    name = clean(payload.tracker_name, 120)
    if not name:
        errors["tracker_name"] = "Tracker name is required."
    status = _choice(payload.status, TRACKER_STATUSES, "status", errors)
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    row = PerformanceTracker(employee_id=payload.employee_id, tracker_name=name, status=status)
    db.add(row)
    db.commit()
    row = db.query(PerformanceTracker).options(joinedload(PerformanceTracker.employee)).filter(PerformanceTracker.id == row.id).one()
    return _tracker_out(row)


@tracker_router.patch("/{tracker_id}")
def update_tracker(tracker_id: int, payload: TrackerIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(PerformanceTracker, tracker_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Tracker was not found.")
    errors: dict[str, str] = {}
    if not payload.employee_id or db.get(Employee, payload.employee_id) is None:
        errors["employee_id"] = "Choose an employee that exists."
    name = clean(payload.tracker_name, 120)
    if not name:
        errors["tracker_name"] = "Tracker name is required."
    status = _choice(payload.status, TRACKER_STATUSES, "status", errors)
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    row.employee_id = payload.employee_id
    row.tracker_name = name
    row.status = status
    db.commit()
    row = db.query(PerformanceTracker).options(joinedload(PerformanceTracker.employee)).filter(PerformanceTracker.id == tracker_id).one()
    return _tracker_out(row)


@tracker_router.delete("/{tracker_id}", status_code=204)
def delete_tracker(tracker_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(PerformanceTracker, tracker_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Tracker was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


@buzz_router.get("")
def list_posts(db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    rows = db.query(BuzzPost).order_by(BuzzPost.id.desc()).all()
    return {"total": len(rows), "items": [
        {"id": row.id, "body": row.body, "author_name": row.author_name, "created_at": row.created_at.isoformat(sep=" ", timespec="minutes")}
        for row in rows
    ]}


@buzz_router.post("", status_code=201)
def create_post(payload: BuzzIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    body = clean(payload.body, 500)
    if not body:
        raise HTTPException(status_code=422, detail={"body": "Write a post before publishing."})
    if len(payload.body.strip()) > 500:
        raise HTTPException(status_code=422, detail={"body": "A post can be 500 characters or fewer."})
    row = BuzzPost(body=body, author_name=user.display_name)
    db.add(row)
    db.commit()
    db.refresh(row)
    return {"id": row.id, "body": row.body, "author_name": row.author_name, "created_at": row.created_at.isoformat(sep=" ", timespec="minutes")}


@buzz_router.delete("/{post_id}", status_code=204)
def delete_post(post_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(BuzzPost, post_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Post was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


@maintenance_router.post("/confirm")
def confirm_gate(payload: ConfirmIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del db
    if not payload.password or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="The password does not match.")
    return {"confirmed": True, "purge": False}
