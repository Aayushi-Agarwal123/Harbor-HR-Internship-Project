"""Synthetic people only. Live OrangeHRM employee rows were not copied."""

import os
from pathlib import Path

from sqlalchemy import func
from sqlalchemy.orm import Session

from .catalog import EMPLOYMENT_STATUSES, JOB_TITLES, SUB_UNITS
from .models import Employee, Report, User
from .security import hash_password

GIVEN_NAMES = ("Asha", "Leo", "Nora", "Jonah", "Mina", "Owen", "Priya", "Hugo", "Lila", "Evan", "Soren")
FAMILY_NAMES = ("Sharma", "Martins", "Ibarra", "Ellis", "Okoye")
LOCAL_USERNAME = "demo_admin"
REPORT_NAMES = (
    "All Employee Sub Unit Hierarchy Report",
    "Employee Contact info report",
    "Employee Job Details",
    "PIM Sample Report",
    "QaReport_530297",
    "Report Night 56651",
)


def _local_password() -> str:
    from_env = os.environ.get("HARBOR_LOCAL_PASSWORD", "").strip()
    if from_env:
        return from_env
    env_path = Path(__file__).resolve().parents[2] / ".env"
    if env_path.is_file():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            trimmed = line.strip()
            if not trimmed.startswith("HARBOR_LOCAL_PASSWORD="):
                continue
            value = trimmed.split("=", 1)[1].strip()
            if value:
                return value
    raise RuntimeError("HARBOR_LOCAL_PASSWORD is missing from the ignored environment file.")


def seed(db: Session) -> None:
    if db.query(User).filter(User.username == LOCAL_USERNAME).one_or_none() is None:
        db.add(User(
            username=LOCAL_USERNAME,
            password_hash=hash_password(_local_password()),
            display_name="Asha Sharma",
            role="admin",
        ))
    if db.query(func.count(Employee.id)).scalar():
        _seed_reports(db)
        db.commit()
        return
    filled_statuses = [status for status in EMPLOYMENT_STATUSES if status != "Freelance"]
    for given_index, first_name in enumerate(GIVEN_NAMES):
        for family_index, last_name in enumerate(FAMILY_NAMES):
            index = given_index * len(FAMILY_NAMES) + family_index
            filled = index % 3 != 0
            db.add(Employee(
                employee_number=str(1001 + index),
                first_name=first_name,
                middle_name="",
                last_name=last_name,
                job_title=JOB_TITLES[index % len(JOB_TITLES)] if filled else "",
                employment_status=filled_statuses[index % len(filled_statuses)] if filled else "",
                sub_unit=SUB_UNITS[index % len(SUB_UNITS)] if filled else "",
                supervisor="",
                scope="current",
            ))
    _seed_reports(db)
    db.commit()


def _seed_reports(db: Session) -> None:
    existing = {row[0] for row in db.query(Report.name).all()}
    for name in REPORT_NAMES:
        if name not in existing:
            db.add(Report(name=name))


def next_employee_number(db: Session) -> str:
    numbers = [row[0] for row in db.query(Employee.employee_number).all()]
    numeric = [int(value) for value in numbers if value.isdigit()]
    return str((max(numeric) if numeric else 1000) + 1)
