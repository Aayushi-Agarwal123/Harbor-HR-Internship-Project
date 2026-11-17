from datetime import date
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..deps import current_user
from ..models import Candidate, ClaimRecord, Employee, LeaveRequest, PerformanceReview, User
from ..schemas import (
    CandidateIn,
    CandidateOut,
    CandidatePage,
    ClaimIn,
    ClaimOut,
    ClaimPage,
    LeaveIn,
    LeaveOut,
    LeavePage,
    ReviewIn,
    ReviewOut,
    ReviewPage,
)
from ..validation import validate_candidate, validate_claim, validate_leave, validate_review

leave_router = APIRouter(prefix="/api/leave-requests", tags=["leave"])
candidate_router = APIRouter(prefix="/api/candidates", tags=["recruitment"])
review_router = APIRouter(prefix="/api/reviews", tags=["performance"])
claim_router = APIRouter(prefix="/api/claims", tags=["claims"])


def _name(employee: Employee) -> str:
    return f"{employee.first_name} {employee.last_name}"


def _employee(db: Session, employee_id: int) -> Employee:
    employee = db.get(Employee, employee_id)
    if employee is None:
        raise HTTPException(status_code=422, detail={"employee_id": "Choose an employee that exists."})
    return employee


def _date_filter(value: str) -> date | None:
    text = value.strip()
    if not text:
        return None
    try:
        return date.fromisoformat(text)
    except ValueError as error:
        raise HTTPException(status_code=422, detail="Use a valid date.") from error


def _leave_out(row: LeaveRequest) -> LeaveOut:
    return LeaveOut(
        id=row.id,
        employee_id=row.employee_id,
        employee_name=_name(row.employee),
        leave_type=row.leave_type,
        start_date=row.start_date.isoformat(),
        end_date=row.end_date.isoformat(),
        days=(row.end_date - row.start_date).days + 1,
        status=row.status,
        comment=row.comment,
    )


def _candidate_out(row: Candidate) -> CandidateOut:
    return CandidateOut(
        id=row.id,
        candidate_name=row.candidate_name,
        vacancy=row.vacancy,
        hiring_manager=row.hiring_manager,
        application_date=row.application_date.isoformat(),
        status=row.status,
        keywords=row.keywords,
        method=row.method,
    )


def _review_out(row: PerformanceReview) -> ReviewOut:
    return ReviewOut(
        id=row.id,
        employee_id=row.employee_id,
        employee_name=_name(row.employee),
        job_title=row.employee.job_title,
        sub_unit=row.employee.sub_unit,
        period_start=row.period_start.isoformat(),
        period_end=row.period_end.isoformat(),
        due_date=row.due_date.isoformat(),
        status=row.status,
    )


def _money(value: Decimal) -> str:
    return f"{Decimal(value):.2f}"


def _claim_out(row: ClaimRecord) -> ClaimOut:
    return ClaimOut(
        id=row.id,
        reference_code=row.reference_code,
        employee_id=row.employee_id,
        employee_name=_name(row.employee),
        event_name=row.event_name,
        description=row.description,
        currency=row.currency,
        submitted_date=row.submitted_date.isoformat(),
        status=row.status,
        amount=_money(row.amount),
    )


def _next_reference(db: Session) -> str:
    latest = db.query(ClaimRecord.id).order_by(ClaimRecord.id.desc()).first()
    number = (latest[0] if latest else 0) + 1
    return f"CLM-{number:04d}"


@leave_router.get("", response_model=LeavePage)
def list_leave(
    employee_id: int | None = None,
    leave_type: str = "",
    status: str = "",
    start_date: str = "",
    end_date: str = "",
    sub_unit: str = "",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    query = db.query(LeaveRequest).options(joinedload(LeaveRequest.employee))
    if employee_id is not None:
        query = query.filter(LeaveRequest.employee_id == employee_id)
    if sub_unit.strip():
        query = query.join(LeaveRequest.employee).filter(Employee.sub_unit == sub_unit.strip())
    if leave_type.strip():
        query = query.filter(LeaveRequest.leave_type == leave_type.strip())
    if status.strip():
        query = query.filter(LeaveRequest.status == status.strip())
    start = _date_filter(start_date)
    end = _date_filter(end_date)
    if start and end and end < start:
        raise HTTPException(status_code=422, detail="The end date cannot be before the start date.")
    if start:
        query = query.filter(LeaveRequest.end_date >= start)
    if end:
        query = query.filter(LeaveRequest.start_date <= end)
    rows = query.order_by(LeaveRequest.start_date, LeaveRequest.id).all()
    return LeavePage(total=len(rows), items=[_leave_out(row) for row in rows])


@leave_router.post("", response_model=LeaveOut, status_code=201)
def create_leave(payload: LeaveIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = validate_leave(payload)
    _employee(db, values["employee_id"])
    row = LeaveRequest(**values)
    db.add(row)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _leave_out(row)


@leave_router.patch("/{leave_id}", response_model=LeaveOut)
def update_leave(leave_id: int, payload: LeaveIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.query(LeaveRequest).options(joinedload(LeaveRequest.employee)).filter(LeaveRequest.id == leave_id).one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="Leave request was not found.")
    values = validate_leave(payload)
    _employee(db, values["employee_id"])
    for key, value in values.items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _leave_out(row)


@leave_router.delete("/{leave_id}", status_code=204)
def delete_leave(leave_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(LeaveRequest, leave_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Leave request was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


@candidate_router.get("", response_model=CandidatePage)
def list_candidates(
    candidate_name: str = "",
    vacancy: str = "",
    status: str = "",
    hiring_manager: str = "",
    keywords: str = "",
    method: str = "",
    application_from: str = "",
    application_to: str = "",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    query = db.query(Candidate)
    if candidate_name.strip():
        query = query.filter(Candidate.candidate_name.ilike(f"%{candidate_name.strip()}%"))
    if vacancy.strip():
        query = query.filter(Candidate.vacancy.ilike(f"%{vacancy.strip()}%"))
    if hiring_manager.strip():
        query = query.filter(Candidate.hiring_manager.ilike(f"%{hiring_manager.strip()}%"))
    if keywords.strip():
        query = query.filter(Candidate.keywords.ilike(f"%{keywords.strip()}%"))
    if status.strip():
        query = query.filter(Candidate.status == status.strip())
    if method.strip():
        query = query.filter(Candidate.method == method.strip())
    start = _date_filter(application_from)
    end = _date_filter(application_to)
    if start and end and end < start:
        raise HTTPException(status_code=422, detail="The end date cannot be before the start date.")
    if start:
        query = query.filter(Candidate.application_date >= start)
    if end:
        query = query.filter(Candidate.application_date <= end)
    rows = query.order_by(Candidate.application_date.desc(), Candidate.id).all()
    return CandidatePage(total=len(rows), items=[_candidate_out(row) for row in rows])


@candidate_router.post("", response_model=CandidateOut, status_code=201)
def create_candidate(payload: CandidateIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = Candidate(**validate_candidate(payload))
    db.add(row)
    db.commit()
    db.refresh(row)
    return _candidate_out(row)


@candidate_router.patch("/{candidate_id}", response_model=CandidateOut)
def update_candidate(candidate_id: int, payload: CandidateIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Candidate, candidate_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate was not found.")
    for key, value in validate_candidate(payload).items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return _candidate_out(row)


@candidate_router.delete("/{candidate_id}", status_code=204)
def delete_candidate(candidate_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Candidate, candidate_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Candidate was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


@review_router.get("", response_model=ReviewPage)
def list_reviews(
    employee_id: int | None = None,
    status: str = "",
    job_title: str = "",
    sub_unit: str = "",
    include: str = "",
    start_date: str = "",
    end_date: str = "",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    query = db.query(PerformanceReview).options(joinedload(PerformanceReview.employee)).join(PerformanceReview.employee)
    if employee_id is not None:
        query = query.filter(PerformanceReview.employee_id == employee_id)
    if status.strip():
        query = query.filter(PerformanceReview.status == status.strip())
    if job_title.strip():
        query = query.filter(Employee.job_title == job_title.strip())
    if sub_unit.strip():
        query = query.filter(Employee.sub_unit == sub_unit.strip())
    if include == "Current Employees Only":
        query = query.filter(Employee.scope == "current")
    elif include == "Past Employees Only":
        query = query.filter(Employee.scope == "past")
    elif include not in {"", "Current and Past Employees"}:
        raise HTTPException(status_code=422, detail="That include option is not supported.")
    start = _date_filter(start_date)
    end = _date_filter(end_date)
    if start and end and end < start:
        raise HTTPException(status_code=422, detail="The end date cannot be before the start date.")
    if start:
        query = query.filter(PerformanceReview.period_end >= start)
    if end:
        query = query.filter(PerformanceReview.period_start <= end)
    rows = query.order_by(PerformanceReview.due_date, PerformanceReview.id).all()
    return ReviewPage(total=len(rows), items=[_review_out(row) for row in rows])


@review_router.post("", response_model=ReviewOut, status_code=201)
def create_review(payload: ReviewIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = validate_review(payload)
    _employee(db, values["employee_id"])
    row = PerformanceReview(**values)
    db.add(row)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _review_out(row)


@review_router.patch("/{review_id}", response_model=ReviewOut)
def update_review(review_id: int, payload: ReviewIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = (
        db.query(PerformanceReview)
        .options(joinedload(PerformanceReview.employee))
        .filter(PerformanceReview.id == review_id)
        .one_or_none()
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Review was not found.")
    values = validate_review(payload)
    _employee(db, values["employee_id"])
    for key, value in values.items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _review_out(row)


@review_router.delete("/{review_id}", status_code=204)
def delete_review(review_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(PerformanceReview, review_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Review was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)


@claim_router.get("", response_model=ClaimPage)
def list_claims(
    employee_id: int | None = None,
    reference_code: str = "",
    event_name: str = "",
    status: str = "",
    start_date: str = "",
    end_date: str = "",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    query = db.query(ClaimRecord).options(joinedload(ClaimRecord.employee))
    if employee_id is not None:
        query = query.filter(ClaimRecord.employee_id == employee_id)
    if reference_code.strip():
        query = query.filter(ClaimRecord.reference_code.ilike(f"%{reference_code.strip()}%"))
    if event_name.strip():
        query = query.filter(ClaimRecord.event_name.ilike(f"%{event_name.strip()}%"))
    if status.strip():
        query = query.filter(ClaimRecord.status == status.strip())
    start = _date_filter(start_date)
    end = _date_filter(end_date)
    if start and end and end < start:
        raise HTTPException(status_code=422, detail="The end date cannot be before the start date.")
    if start:
        query = query.filter(ClaimRecord.submitted_date >= start)
    if end:
        query = query.filter(ClaimRecord.submitted_date <= end)
    rows = query.order_by(ClaimRecord.submitted_date.desc(), ClaimRecord.id).all()
    return ClaimPage(total=len(rows), items=[_claim_out(row) for row in rows])


@claim_router.post("", response_model=ClaimOut, status_code=201)
def create_claim(payload: ClaimIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = validate_claim(payload)
    _employee(db, values["employee_id"])
    row = ClaimRecord(reference_code=_next_reference(db), **values)
    db.add(row)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _claim_out(row)


@claim_router.patch("/{claim_id}", response_model=ClaimOut)
def update_claim(claim_id: int, payload: ClaimIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.query(ClaimRecord).options(joinedload(ClaimRecord.employee)).filter(ClaimRecord.id == claim_id).one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="Claim was not found.")
    values = validate_claim(payload)
    _employee(db, values["employee_id"])
    for key, value in values.items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    row.employee = db.get(Employee, row.employee_id)
    return _claim_out(row)


@claim_router.delete("/{claim_id}", status_code=204)
def delete_claim(claim_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(ClaimRecord, claim_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Claim was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)
