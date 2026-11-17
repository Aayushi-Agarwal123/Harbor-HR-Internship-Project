from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    display_name: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(40), nullable=False)
    sessions: Mapped[list["SessionToken"]] = relationship(back_populates="user")


class SessionToken(Base):
    __tablename__ = "sessions"

    token: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    user: Mapped[User] = relationship(back_populates="sessions")


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160), unique=True, nullable=False)


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_number: Mapped[str] = mapped_column(String(40), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)
    middle_name: Mapped[str] = mapped_column(String(60), default="")
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)
    job_title: Mapped[str] = mapped_column(String(80), default="")
    employment_status: Mapped[str] = mapped_column(String(80), default="")
    sub_unit: Mapped[str] = mapped_column(String(80), default="")
    supervisor: Mapped[str] = mapped_column(String(120), default="")
    scope: Mapped[str] = mapped_column(String(20), default="current")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    timesheets: Mapped[list["Timesheet"]] = relationship(back_populates="employee")


class Timesheet(Base):
    __tablename__ = "timesheets"
    __table_args__ = (UniqueConstraint("employee_id", "period_start", name="uq_timesheet_employee_start"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), nullable=False)
    period_start: Mapped[date] = mapped_column(Date, nullable=False)
    period_end: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    employee: Mapped[Employee] = relationship(back_populates="timesheets")
    days: Mapped[list["TimesheetDay"]] = relationship(
        back_populates="timesheet",
        cascade="all, delete-orphan",
        order_by="TimesheetDay.work_date",
    )


class TimesheetDay(Base):
    __tablename__ = "timesheet_days"
    __table_args__ = (UniqueConstraint("timesheet_id", "work_date", name="uq_timesheet_day"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timesheet_id: Mapped[int] = mapped_column(ForeignKey("timesheets.id", ondelete="CASCADE"), nullable=False)
    work_date: Mapped[date] = mapped_column(Date, nullable=False)
    hours: Mapped[Decimal] = mapped_column(Numeric(4, 2), nullable=False, default=0)
    description: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    timesheet: Mapped[Timesheet] = relationship(back_populates="days")


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), nullable=False)
    leave_type: Mapped[str] = mapped_column(String(40), nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    comment: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    employee: Mapped[Employee] = relationship()


class Candidate(Base):
    __tablename__ = "candidates"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    candidate_name: Mapped[str] = mapped_column(String(120), nullable=False)
    vacancy: Mapped[str] = mapped_column(String(120), nullable=False)
    hiring_manager: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    application_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    keywords: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    method: Mapped[str] = mapped_column(String(40), nullable=False, default="")


class PerformanceReview(Base):
    __tablename__ = "performance_reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), nullable=False)
    period_start: Mapped[date] = mapped_column(Date, nullable=False)
    period_end: Mapped[date] = mapped_column(Date, nullable=False)
    due_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    employee: Mapped[Employee] = relationship()


class ClaimRecord(Base):
    __tablename__ = "claims"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    reference_code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), nullable=False)
    event_name: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    currency: Mapped[str] = mapped_column(String(8), nullable=False)
    submitted_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Submitted")
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    employee: Mapped[Employee] = relationship()


class EmployeeContact(Base):
    __tablename__ = "employee_contacts"

    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id", ondelete="CASCADE"), primary_key=True)
    street1: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    street2: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    city: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    state: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    postal_code: Mapped[str] = mapped_column(String(20), nullable=False, default="")
    country: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    home_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    mobile_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    work_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    work_email: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    other_email: Mapped[str] = mapped_column(String(120), nullable=False, default="")


class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    relationship: Mapped[str] = mapped_column(String(60), nullable=False, default="")
    home_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    mobile_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")
    work_phone: Mapped[str] = mapped_column(String(40), nullable=False, default="")


class Vacancy(Base):
    __tablename__ = "vacancies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    job_title: Mapped[str] = mapped_column(String(80), nullable=False)
    vacancy_name: Mapped[str] = mapped_column(String(120), nullable=False)
    hiring_manager: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    status: Mapped[str] = mapped_column(String(20), nullable=False)


class PerformanceTracker(Base):
    __tablename__ = "performance_trackers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), nullable=False)
    tracker_name: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    employee: Mapped[Employee] = relationship()


class BuzzPost(Base):
    __tablename__ = "buzz_posts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    body: Mapped[str] = mapped_column(String(500), nullable=False)
    author_name: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
