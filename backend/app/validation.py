from datetime import date, timedelta
from decimal import Decimal, InvalidOperation

from fastapi import HTTPException

from .catalog import EMPLOYMENT_STATUSES, JOB_TITLES, SUB_UNITS
from .proposed import (
    CANDIDATE_METHODS,
    CANDIDATE_STATUSES,
    CLAIM_CURRENCIES,
    CLAIM_STATUSES,
    LEAVE_STATUSES,
    LEAVE_TYPES,
    REVIEW_STATUSES,
)
from .schemas import CandidateIn, ClaimIn, EmployeeIn, LeaveIn, ReviewIn, TimesheetIn

MAX_TIMESHEET_DAYS = 14


def clean(value: str, limit: int) -> str:
    return " ".join(value.split())[:limit]


def validate_employee(payload: EmployeeIn) -> dict:
    errors: dict[str, str] = {}
    first_name = clean(payload.first_name, 60)
    middle_name = clean(payload.middle_name, 60)
    last_name = clean(payload.last_name, 60)
    job_title = clean(payload.job_title, 80)
    employment_status = clean(payload.employment_status, 80)
    sub_unit = clean(payload.sub_unit, 80)
    supervisor = clean(payload.supervisor, 120)
    scope = payload.scope.strip() or "current"
    if not first_name:
        errors["first_name"] = "First name is required."
    if not last_name:
        errors["last_name"] = "Last name is required."
    if employment_status and employment_status not in EMPLOYMENT_STATUSES:
        errors["employment_status"] = "Choose a recorded employment status."
    if job_title and job_title not in JOB_TITLES:
        errors["job_title"] = "Choose a recorded job title."
    if sub_unit and sub_unit not in SUB_UNITS:
        errors["sub_unit"] = "Choose a recorded sub unit."
    if scope not in {"current", "past"}:
        errors["scope"] = "Scope must be current or past."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "first_name": first_name,
        "middle_name": middle_name,
        "last_name": last_name,
        "job_title": job_title,
        "employment_status": employment_status,
        "sub_unit": sub_unit,
        "supervisor": supervisor,
        "scope": scope,
    }


def _parse_date(value: str, field: str, errors: dict[str, str]) -> date | None:
    text = value.strip()
    if not text:
        errors[field] = "This date is required."
        return None
    try:
        return date.fromisoformat(text)
    except ValueError:
        errors[field] = "Use a valid date."
        return None


def _parse_hours(value: str, field: str, errors: dict[str, str]) -> Decimal | None:
    text = value.strip()
    if not text:
        errors[field] = "Hours are required."
        return None
    try:
        number = Decimal(text)
    except InvalidOperation:
        errors[field] = "Hours must be a number."
        return None
    if number < 0 or number > 24:
        errors[field] = "Hours must be from 0 to 24."
        return None
    if number.as_tuple().exponent < -2:
        errors[field] = "Hours can have at most two decimal places."
        return None
    return number.quantize(Decimal("0.01"))


def validate_timesheet(payload: TimesheetIn) -> dict:
    errors: dict[str, str] = {}
    if payload.employee_id is None:
        errors["employee_id"] = "Employee is required."
    start = _parse_date(payload.period_start, "period_start", errors)
    end = _parse_date(payload.period_end, "period_end", errors)
    status = payload.status.strip().lower()
    if status not in {"pending", "approved"}:
        errors["status"] = "Status must be pending or approved."
    if start and end and end < start:
        errors["period_end"] = "Period end cannot be before period start."
    if start and end and end >= start and (end - start).days + 1 > MAX_TIMESHEET_DAYS:
        errors["period_end"] = f"A timesheet period can cover at most {MAX_TIMESHEET_DAYS} days."
    expected: list[date] = []
    if start and end and end >= start and "period_end" not in errors:
        expected = [start + timedelta(days=offset) for offset in range((end - start).days + 1)]
    parsed_days = []
    seen: set[date] = set()
    for index, day in enumerate(payload.days):
        work_date = _parse_date(day.work_date, f"days.{index}.work_date", errors)
        hours = _parse_hours(day.hours, f"days.{index}.hours", errors)
        description = clean(day.description, 200)
        if len(day.description.strip()) > 200:
            errors[f"days.{index}.description"] = "Description must be 200 characters or fewer."
        if work_date and work_date in seen:
            errors[f"days.{index}.work_date"] = "Each day can appear only once."
        if work_date:
            seen.add(work_date)
        if work_date and expected and work_date not in expected:
            errors[f"days.{index}.work_date"] = "Each day must fall inside the timesheet period."
        if work_date and hours is not None and f"days.{index}.work_date" not in errors:
            parsed_days.append({"work_date": work_date, "hours": hours, "description": description})
    if expected and not errors and seen != set(expected):
        errors["days"] = "Enter one row for every day in the period."
    if expected and not errors and not any(day["hours"] > 0 for day in parsed_days):
        errors["days"] = "Enter hours for at least one day."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "employee_id": payload.employee_id,
        "period_start": start,
        "period_end": end,
        "status": status,
        "days": parsed_days,
    }


def _choice(value: str, allowed: tuple[str, ...], field: str, errors: dict[str, str]) -> str:
    text = clean(value, 40)
    if text not in allowed:
        errors[field] = "Choose one of the Harbor HR options."
    return text


def validate_leave(payload: LeaveIn) -> dict:
    errors: dict[str, str] = {}
    if not payload.employee_id:
        errors["employee_id"] = "Choose an employee."
    leave_type = _choice(payload.leave_type, LEAVE_TYPES, "leave_type", errors)
    status = _choice(payload.status, LEAVE_STATUSES, "status", errors)
    start = _parse_date(payload.start_date, "start_date", errors)
    end = _parse_date(payload.end_date, "end_date", errors)
    comment = clean(payload.comment, 200)
    if len(payload.comment.strip()) > 200:
        errors["comment"] = "Comment must be 200 characters or fewer."
    if start and end and end < start:
        errors["end_date"] = "The end date cannot be before the start date."
    if start and end and (end - start).days + 1 > 30:
        errors["end_date"] = "A leave request can cover at most 30 days."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "employee_id": payload.employee_id,
        "leave_type": leave_type,
        "start_date": start,
        "end_date": end,
        "status": status,
        "comment": comment,
    }


def validate_candidate(payload: CandidateIn) -> dict:
    errors: dict[str, str] = {}
    name = clean(payload.candidate_name, 120)
    vacancy = clean(payload.vacancy, 120)
    manager = clean(payload.hiring_manager, 120)
    keywords = clean(payload.keywords, 200)
    status = _choice(payload.status, CANDIDATE_STATUSES, "status", errors)
    method = clean(payload.method, 40)
    applied = _parse_date(payload.application_date, "application_date", errors)
    if not name:
        errors["candidate_name"] = "Candidate name is required."
    if not vacancy:
        errors["vacancy"] = "Vacancy is required."
    if method and method not in CANDIDATE_METHODS:
        errors["method"] = "Choose one of the Harbor HR options."
    if len(payload.keywords.strip()) > 200:
        errors["keywords"] = "Keywords must be 200 characters or fewer."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "candidate_name": name,
        "vacancy": vacancy,
        "hiring_manager": manager,
        "application_date": applied,
        "status": status,
        "keywords": keywords,
        "method": method,
    }


def validate_review(payload: ReviewIn) -> dict:
    errors: dict[str, str] = {}
    if not payload.employee_id:
        errors["employee_id"] = "Choose an employee."
    status = _choice(payload.status, REVIEW_STATUSES, "status", errors)
    start = _parse_date(payload.period_start, "period_start", errors)
    end = _parse_date(payload.period_end, "period_end", errors)
    due = _parse_date(payload.due_date, "due_date", errors)
    if start and end and end < start:
        errors["period_end"] = "The period end cannot be before the period start."
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "employee_id": payload.employee_id,
        "period_start": start,
        "period_end": end,
        "due_date": due,
        "status": status,
    }


def validate_claim(payload: ClaimIn) -> dict:
    errors: dict[str, str] = {}
    if not payload.employee_id:
        errors["employee_id"] = "Choose an employee."
    event_name = clean(payload.event_name, 120)
    description = clean(payload.description, 200)
    currency = _choice(payload.currency, CLAIM_CURRENCIES, "currency", errors)
    status = _choice(payload.status or "Submitted", CLAIM_STATUSES, "status", errors)
    submitted = _parse_date(payload.submitted_date, "submitted_date", errors)
    if not event_name:
        errors["event_name"] = "Event name is required."
    if len(payload.description.strip()) > 200:
        errors["description"] = "Description must be 200 characters or fewer."
    try:
        amount = Decimal(payload.amount.strip() or "x")
        if amount < 0 or amount > Decimal("999999.99") or amount.as_tuple().exponent < -2:
            raise InvalidOperation
    except (InvalidOperation, ValueError):
        errors["amount"] = "Enter an amount from 0 to 999999.99 with at most two decimal places."
        amount = None
    if errors:
        raise HTTPException(status_code=422, detail=errors)
    return {
        "employee_id": payload.employee_id,
        "event_name": event_name,
        "description": description,
        "currency": currency,
        "submitted_date": submitted,
        "status": status,
        "amount": amount,
    }
