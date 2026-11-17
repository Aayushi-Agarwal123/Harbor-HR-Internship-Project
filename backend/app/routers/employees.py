from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import current_user
from ..models import ClaimRecord, Employee, LeaveRequest, PerformanceReview, PerformanceTracker, Timesheet, User
from ..schemas import EmployeeIn, EmployeeOut, EmployeePage
from ..seed import next_employee_number
from ..validation import validate_employee

router = APIRouter(prefix="/api/employees", tags=["employees"])
PAGE_SIZES = {10, 25, 50}
SORT_COLUMNS = {
    "employee_number": Employee.employee_number,
    "first_name": Employee.first_name,
    "last_name": Employee.last_name,
    "job_title": Employee.job_title,
    "employment_status": Employee.employment_status,
    "sub_unit": Employee.sub_unit,
}


def to_out(row: Employee) -> EmployeeOut:
    return EmployeeOut.model_validate(row)


@router.get("/hints", response_model=list[str])
def hints(q: str = "", db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    needle = q.strip().lower()
    if not needle:
        return []
    rows = db.query(Employee).order_by(Employee.employee_number).all()
    names = []
    for row in rows:
        full = f"{row.first_name} {row.last_name}"
        if needle in full.lower() and full not in names:
            names.append(full)
        if len(names) == 8:
            break
    return names


@router.get("/meta")
def meta(db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    return {"next_employee_number": next_employee_number(db)}


@router.get("", response_model=EmployeePage)
def list_employees(
    page: int = Query(1, ge=1),
    page_size: int = Query(50),
    sort: str = Query("employee_number"),
    direction: str = Query("asc"),
    name: str = "",
    employee_number: str = "",
    employment_status: str = "",
    job_title: str = "",
    sub_unit: str = "",
    supervisor: str = "",
    include: str = "Current Employees Only",
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    if page_size not in PAGE_SIZES:
        raise HTTPException(status_code=422, detail="Page size must be 10, 25, or 50.")
    if sort not in SORT_COLUMNS:
        raise HTTPException(status_code=422, detail="That sort field is not supported.")
    if direction not in {"asc", "desc"}:
        raise HTTPException(status_code=422, detail="Sort direction must be asc or desc.")
    query = db.query(Employee)
    if include == "Current Employees Only":
        query = query.filter(Employee.scope == "current")
    elif include == "Past Employees Only":
        query = query.filter(Employee.scope == "past")
    if name.strip():
        needle = name.strip().lower()
        query = query.filter(
            (Employee.first_name + " " + Employee.last_name).ilike(f"%{needle}%")
        )
    if employee_number.strip():
        query = query.filter(Employee.employee_number.ilike(f"%{employee_number.strip()}%"))
    if employment_status.strip():
        query = query.filter(Employee.employment_status == employment_status.strip())
    if job_title.strip():
        query = query.filter(Employee.job_title == job_title.strip())
    if sub_unit.strip():
        query = query.filter(Employee.sub_unit == sub_unit.strip())
    if supervisor.strip():
        query = query.filter(Employee.supervisor.ilike(f"%{supervisor.strip()}%"))
    total = query.count()
    column = SORT_COLUMNS[sort]
    ordering = column.desc() if direction == "desc" else column.asc()
    rows = (
        query.order_by(ordering, Employee.id.asc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return EmployeePage(total=total, page=page, page_size=page_size, items=[to_out(row) for row in rows])


@router.get("/{employee_id}", response_model=EmployeeOut)
def read_employee(employee_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Employee, employee_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Employee was not found.")
    return to_out(row)


@router.post("", response_model=EmployeeOut, status_code=201)
def create_employee(payload: EmployeeIn, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    values = validate_employee(payload)
    row = Employee(employee_number=next_employee_number(db), **values)
    db.add(row)
    db.commit()
    db.refresh(row)
    return to_out(row)


@router.patch("/{employee_id}", response_model=EmployeeOut)
def update_employee(
    employee_id: int,
    payload: EmployeeIn,
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    del user
    row = db.get(Employee, employee_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Employee was not found.")
    for key, value in validate_employee(payload).items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return to_out(row)


@router.delete("/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    row = db.get(Employee, employee_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Employee was not found.")
    if db.query(Timesheet).filter(Timesheet.employee_id == employee_id).first() is not None:
        raise HTTPException(
            status_code=409,
            detail="This employee has timesheets. Delete those timesheets first.",
        )
    if db.query(LeaveRequest).filter(LeaveRequest.employee_id == employee_id).first() is not None:
        raise HTTPException(status_code=409, detail="This employee has leave requests. Delete those requests first.")
    if db.query(PerformanceReview).filter(PerformanceReview.employee_id == employee_id).first() is not None:
        raise HTTPException(status_code=409, detail="This employee has performance reviews. Delete those reviews first.")
    if db.query(ClaimRecord).filter(ClaimRecord.employee_id == employee_id).first() is not None:
        raise HTTPException(status_code=409, detail="This employee has claims. Delete those claims first.")
    if db.query(PerformanceTracker).filter(PerformanceTracker.employee_id == employee_id).first() is not None:
        raise HTTPException(status_code=409, detail="This employee has performance trackers. Delete those trackers first.")
    db.delete(row)
    db.commit()
