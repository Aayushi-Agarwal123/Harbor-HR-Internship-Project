from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session, joinedload, selectinload

from ..database import get_db
from ..deps import current_user
from ..models import Employee, Timesheet, TimesheetDay, User
from ..schemas import TimesheetIn, TimesheetOut, TimesheetPage, TimesheetSummary
from ..validation import validate_timesheet

router = APIRouter(prefix="/api/timesheets", tags=["timesheets"])


def _hours(value: Decimal) -> str:
    return f"{Decimal(value):.2f}"


def _name(employee: Employee) -> str:
    return f"{employee.first_name} {employee.last_name}"


def _summary(row: Timesheet) -> TimesheetSummary:
    total = sum((day.hours for day in row.days), Decimal("0.00"))
    return TimesheetSummary(
        id=row.id,
        employee_id=row.employee_id,
        employee_name=_name(row.employee),
        employee_number=row.employee.employee_number,
        period_start=row.period_start.isoformat(),
        period_end=row.period_end.isoformat(),
        status=row.status,
        total_hours=_hours(total),
    )


def _detail(row: Timesheet) -> TimesheetOut:
    summary = _summary(row)
    return TimesheetOut(
        **summary.model_dump(),
        days=[
            {
                "work_date": day.work_date.isoformat(),
                "hours": _hours(day.hours),
                "description": day.description,
            }
            for day in row.days
        ],
    )


def _load(db: Session, timesheet_id: int) -> Timesheet:
    row = (
        db.query(Timesheet)
        .options(joinedload(Timesheet.employee), selectinload(Timesheet.days))
        .filter(Timesheet.id == timesheet_id)
        .one_or_none()
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Timesheet was not found.")
    row.days.sort(key=lambda day: day.work_date)
    return row


def _apply_days(db: Session, row: Timesheet, days: list[dict]) -> None:
    for current in list(row.days):
        db.delete(current)
    if row.days:
        db.flush()
    for day in days:
        row.days.append(
            TimesheetDay(
                work_date=day["work_date"],
                hours=day["hours"],
                description=day["description"],
            )
        )


def _ensure_employee(db: Session, employee_id: int) -> Employee:
    employee = db.get(Employee, employee_id)
    if employee is None:
        raise HTTPException(status_code=422, detail={"employee_id": "Choose an employee that exists."})
    return employee


def _ensure_no_overlap(db: Session, values: dict, timesheet_id: int | None) -> None:
    query = db.query(Timesheet).filter(
        Timesheet.employee_id == values["employee_id"],
        Timesheet.period_start <= values["period_end"],
        Timesheet.period_end >= values["period_start"],
    )
    if timesheet_id is not None:
        query = query.filter(Timesheet.id != timesheet_id)
    if query.first() is not None:
        raise HTTPException(
            status_code=422,
            detail={"period_start": "This employee already has a timesheet that overlaps this period."},
        )


@router.get("", response_model=TimesheetPage)
def list_timesheets(
    employee_id: int | None = None,
    period_start: str = "",
    period_end: str = "",
    status: str = "",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    query = db.query(Timesheet).options(joinedload(Timesheet.employee), selectinload(Timesheet.days))
    if employee_id is not None:
        query = query.filter(Timesheet.employee_id == employee_id)
    status_text = status.strip().lower()
    if status_text:
        if status_text not in {"pending", "approved"}:
            raise HTTPException(status_code=422, detail="Status must be pending or approved.")
        query = query.filter(Timesheet.status == status_text)
    start_text = period_start.strip()
    end_text = period_end.strip()
    if bool(start_text) != bool(end_text):
        raise HTTPException(status_code=422, detail="Provide both period dates, or leave both empty.")
    if start_text and end_text:
        from datetime import date

        try:
            start = date.fromisoformat(start_text)
            end = date.fromisoformat(end_text)
        except ValueError as error:
            raise HTTPException(status_code=422, detail="Use valid period dates.") from error
        if end < start:
            raise HTTPException(status_code=422, detail="Period end cannot be before period start.")
        query = query.filter(Timesheet.period_start <= end, Timesheet.period_end >= start)
    rows = query.order_by(Timesheet.period_start.desc(), Timesheet.id.desc()).all()
    for row in rows:
        row.days.sort(key=lambda day: day.work_date)
    return TimesheetPage(total=len(rows), items=[_summary(row) for row in rows])


@router.get("/{timesheet_id}", response_model=TimesheetOut)
def read_timesheet(timesheet_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    return _detail(_load(db, timesheet_id))


@router.post("", response_model=TimesheetOut, status_code=201)
def create_timesheet(payload: TimesheetIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = validate_timesheet(payload)
    _ensure_employee(db, values["employee_id"])
    _ensure_no_overlap(db, values, None)
    row = Timesheet(
        employee_id=values["employee_id"],
        period_start=values["period_start"],
        period_end=values["period_end"],
        status=values["status"],
    )
    db.add(row)
    db.flush()
    _apply_days(db, row, values["days"])
    db.commit()
    return _detail(_load(db, row.id))


@router.patch("/{timesheet_id}", response_model=TimesheetOut)
def update_timesheet(
    timesheet_id: int,
    payload: TimesheetIn,
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    row = _load(db, timesheet_id)
    values = validate_timesheet(payload)
    _ensure_employee(db, values["employee_id"])
    _ensure_no_overlap(db, values, row.id)
    row.employee_id = values["employee_id"]
    row.period_start = values["period_start"]
    row.period_end = values["period_end"]
    row.status = values["status"]
    _apply_days(db, row, values["days"])
    db.commit()
    return _detail(_load(db, row.id))


@router.delete("/{timesheet_id}", status_code=204)
def delete_timesheet(timesheet_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Timesheet, timesheet_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Timesheet was not found.")
    db.delete(row)
    db.commit()
    return Response(status_code=204)
