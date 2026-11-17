from pydantic import BaseModel, Field


class LoginIn(BaseModel):
    username: str = ""
    password: str = ""


class UserOut(BaseModel):
    username: str
    display_name: str


class EmployeeIn(BaseModel):
    first_name: str = ""
    middle_name: str = ""
    last_name: str = ""
    job_title: str = ""
    employment_status: str = ""
    sub_unit: str = ""
    supervisor: str = ""
    scope: str = "current"


class EmployeeOut(BaseModel):
    id: int
    employee_number: str
    first_name: str
    middle_name: str
    last_name: str
    job_title: str
    employment_status: str
    sub_unit: str
    supervisor: str
    scope: str

    model_config = {"from_attributes": True}


class EmployeePage(BaseModel):
    total: int
    page: int
    page_size: int = Field(default=50)
    items: list[EmployeeOut]


class TimesheetDayIn(BaseModel):
    work_date: str = ""
    hours: str = "0"
    description: str = ""


class TimesheetIn(BaseModel):
    employee_id: int | None = None
    period_start: str = ""
    period_end: str = ""
    status: str = "pending"
    days: list[TimesheetDayIn] = Field(default_factory=list)


class TimesheetDayOut(BaseModel):
    work_date: str
    hours: str
    description: str


class TimesheetSummary(BaseModel):
    id: int
    employee_id: int
    employee_name: str
    employee_number: str
    period_start: str
    period_end: str
    status: str
    total_hours: str


class TimesheetPage(BaseModel):
    total: int
    items: list[TimesheetSummary]


class TimesheetOut(TimesheetSummary):
    days: list[TimesheetDayOut]


class LeaveIn(BaseModel):
    employee_id: int | None = None
    leave_type: str = ""
    start_date: str = ""
    end_date: str = ""
    status: str = "Pending Approval"
    comment: str = ""


class LeaveOut(BaseModel):
    id: int
    employee_id: int
    employee_name: str
    leave_type: str
    start_date: str
    end_date: str
    days: int
    status: str
    comment: str


class LeavePage(BaseModel):
    total: int
    items: list[LeaveOut]


class CandidateIn(BaseModel):
    candidate_name: str = ""
    vacancy: str = ""
    hiring_manager: str = ""
    application_date: str = ""
    status: str = "Application Initiated"
    keywords: str = ""
    method: str = ""


class CandidateOut(BaseModel):
    id: int
    candidate_name: str
    vacancy: str
    hiring_manager: str
    application_date: str
    status: str
    keywords: str
    method: str


class CandidatePage(BaseModel):
    total: int
    items: list[CandidateOut]


class ReviewIn(BaseModel):
    employee_id: int | None = None
    period_start: str = ""
    period_end: str = ""
    due_date: str = ""
    status: str = "Activated"


class ReviewOut(BaseModel):
    id: int
    employee_id: int
    employee_name: str
    job_title: str
    sub_unit: str
    period_start: str
    period_end: str
    due_date: str
    status: str


class ReviewPage(BaseModel):
    total: int
    items: list[ReviewOut]


class ClaimIn(BaseModel):
    employee_id: int | None = None
    event_name: str = ""
    description: str = ""
    currency: str = ""
    submitted_date: str = ""
    status: str = "Submitted"
    amount: str = ""


class ClaimOut(BaseModel):
    id: int
    reference_code: str
    employee_id: int
    employee_name: str
    event_name: str
    description: str
    currency: str
    submitted_date: str
    status: str
    amount: str


class ClaimPage(BaseModel):
    total: int
    items: list[ClaimOut]
