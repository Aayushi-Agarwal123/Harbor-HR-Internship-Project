export interface SessionUser {
  username: string;
  display_name: string;
}

export interface Employee {
  id: number;
  employee_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  job_title: string;
  employment_status: string;
  sub_unit: string;
  supervisor: string;
  scope: string;
}

export interface EmployeePage {
  total: number;
  page: number;
  page_size: number;
  items: Employee[];
}

export interface EmployeeInput {
  first_name: string;
  middle_name: string;
  last_name: string;
  job_title: string;
  employment_status: string;
  sub_unit: string;
  supervisor: string;
  scope: string;
}

export class ApiError extends Error {
  status: number;
  fields: Record<string, string>;

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
      ...init,
    });
  } catch {
    throw new ApiError(0, "Harbor HR could not reach the local service.");
  }
  if (response.status === 204) {
    return undefined as T;
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = body.detail;
    const fields = detail && typeof detail === "object" && !Array.isArray(detail) ? detail : {};
    const message = typeof detail === "string" ? detail : "The request was not completed.";
    throw new ApiError(response.status, message, fields);
  }
  return body as T;
}

export interface TimesheetDay {
  work_date: string;
  hours: string;
  description: string;
}

export interface TimesheetSummary {
  id: number;
  employee_id: number;
  employee_name: string;
  employee_number: string;
  period_start: string;
  period_end: string;
  status: string;
  total_hours: string;
}

export interface Timesheet extends TimesheetSummary {
  days: TimesheetDay[];
}

export interface TimesheetInput {
  employee_id: number | null;
  period_start: string;
  period_end: string;
  status: string;
  days: TimesheetDay[];
}

export interface TimesheetQuery {
  employee_id?: string;
  period_start?: string;
  period_end?: string;
  status?: string;
}

export const api = {
  me: () => request<SessionUser>("/api/auth/me"),
  login: (username: string, password: string) => request<SessionUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }),
  logout: () => request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
  employees: (params: Record<string, string | number>) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "") {
        query.set(key, String(value));
      }
    });
    return request<EmployeePage>(`/api/employees?${query.toString()}`);
  },
  hints: (q: string) => request<string[]>(`/api/employees/hints?q=${encodeURIComponent(q)}`),
  nextNumber: () => request<{ next_employee_number: string }>("/api/employees/meta"),
  employee: (id: number) => request<Employee>(`/api/employees/${id}`),
  createEmployee: (input: EmployeeInput) => request<Employee>("/api/employees", {
    method: "POST",
    body: JSON.stringify(input),
  }),
  updateEmployee: (id: number, input: EmployeeInput) => request<Employee>(`/api/employees/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }),
  deleteEmployee: (id: number) => request<void>(`/api/employees/${id}`, { method: "DELETE" }),
  reports: () => request<Array<{ id: number; name: string }>>("/api/reports"),
  timesheets: (params: TimesheetQuery) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    const suffix = query.toString();
    return request<{ total: number; items: TimesheetSummary[] }>(`/api/timesheets${suffix ? `?${suffix}` : ""}`);
  },
  timesheet: (id: number) => request<Timesheet>(`/api/timesheets/${id}`),
  createTimesheet: (input: TimesheetInput) => request<Timesheet>("/api/timesheets", {
    method: "POST",
    body: JSON.stringify(input),
  }),
  updateTimesheet: (id: number, input: TimesheetInput) => request<Timesheet>(`/api/timesheets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  }),
  deleteTimesheet: (id: number) => request<void>(`/api/timesheets/${id}`, { method: "DELETE" }),
  leaveRequests: (filters: Record<string, string> = {}) =>
    request<{ total: number; items: LeaveRequest[] }>(`/api/leave-requests${query(filters)}`),
  createLeave: (input: LeaveInput) => request<LeaveRequest>("/api/leave-requests", { method: "POST", body: JSON.stringify(input) }),
  updateLeave: (id: number, input: LeaveInput) => request<LeaveRequest>(`/api/leave-requests/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteLeave: (id: number) => request<void>(`/api/leave-requests/${id}`, { method: "DELETE" }),
  candidates: (filters: Record<string, string> = {}) =>
    request<{ total: number; items: Candidate[] }>(`/api/candidates${query(filters)}`),
  createCandidate: (input: CandidateInput) => request<Candidate>("/api/candidates", { method: "POST", body: JSON.stringify(input) }),
  updateCandidate: (id: number, input: CandidateInput) => request<Candidate>(`/api/candidates/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteCandidate: (id: number) => request<void>(`/api/candidates/${id}`, { method: "DELETE" }),
  reviews: (filters: Record<string, string> = {}) =>
    request<{ total: number; items: Review[] }>(`/api/reviews${query(filters)}`),
  createReview: (input: ReviewInput) => request<Review>("/api/reviews", { method: "POST", body: JSON.stringify(input) }),
  updateReview: (id: number, input: ReviewInput) => request<Review>(`/api/reviews/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteReview: (id: number) => request<void>(`/api/reviews/${id}`, { method: "DELETE" }),
  claims: (filters: Record<string, string> = {}) =>
    request<{ total: number; items: Claim[] }>(`/api/claims${query(filters)}`),
  createClaim: (input: ClaimInput) => request<Claim>("/api/claims", { method: "POST", body: JSON.stringify(input) }),
  updateClaim: (id: number, input: ClaimInput) => request<Claim>(`/api/claims/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteClaim: (id: number) => request<void>(`/api/claims/${id}`, { method: "DELETE" }),
  contact: (employeeId: number) => request<ContactDetails>(`/api/employees/${employeeId}/contact`),
  saveContact: (employeeId: number, input: ContactDetails) => request<ContactDetails>(`/api/employees/${employeeId}/contact`, {
    method: "PUT",
    body: JSON.stringify(input),
  }),
  emergencyContacts: (employeeId: number) => request<{ total: number; items: EmergencyContact[] }>(`/api/employees/${employeeId}/emergency-contacts`),
  createEmergency: (employeeId: number, input: Omit<EmergencyContact, "id">) => request<EmergencyContact>(`/api/employees/${employeeId}/emergency-contacts`, {
    method: "POST",
    body: JSON.stringify(input),
  }),
  deleteEmergency: (employeeId: number, contactId: number) => request<void>(`/api/employees/${employeeId}/emergency-contacts/${contactId}`, { method: "DELETE" }),
  vacancies: () => request<{ total: number; items: Vacancy[] }>("/api/vacancies"),
  createVacancy: (input: Omit<Vacancy, "id">) => request<Vacancy>("/api/vacancies", { method: "POST", body: JSON.stringify(input) }),
  updateVacancy: (id: number, input: Omit<Vacancy, "id">) => request<Vacancy>(`/api/vacancies/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteVacancy: (id: number) => request<void>(`/api/vacancies/${id}`, { method: "DELETE" }),
  trackers: (filters: Record<string, string> = {}) => request<{ total: number; items: Tracker[] }>(`/api/trackers${query(filters)}`),
  createTracker: (input: { employee_id: number | null; tracker_name: string; status: string }) => request<Tracker>("/api/trackers", { method: "POST", body: JSON.stringify(input) }),
  updateTracker: (id: number, input: { employee_id: number | null; tracker_name: string; status: string }) => request<Tracker>(`/api/trackers/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteTracker: (id: number) => request<void>(`/api/trackers/${id}`, { method: "DELETE" }),
  buzzPosts: () => request<{ total: number; items: BuzzPost[] }>("/api/buzz"),
  createBuzzPost: (body: string) => request<BuzzPost>("/api/buzz", { method: "POST", body: JSON.stringify({ body }) }),
  deleteBuzzPost: (id: number) => request<void>(`/api/buzz/${id}`, { method: "DELETE" }),
  confirmMaintenance: (password: string) => request<{ confirmed: boolean; purge: boolean }>("/api/maintenance/confirm", {
    method: "POST",
    body: JSON.stringify({ password }),
  }),
};

function query(filters: Record<string, string>): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const text = params.toString();
  return text ? `?${text}` : "";
}

export interface LeaveRequest {
  id: number;
  employee_id: number;
  employee_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  status: string;
  comment: string;
}

export interface LeaveInput {
  employee_id: number | null;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  comment: string;
}

export interface Candidate {
  id: number;
  candidate_name: string;
  vacancy: string;
  hiring_manager: string;
  application_date: string;
  status: string;
  keywords: string;
  method: string;
}

export interface CandidateInput {
  candidate_name: string;
  vacancy: string;
  hiring_manager: string;
  application_date: string;
  status: string;
  keywords: string;
  method: string;
}

export interface Review {
  id: number;
  employee_id: number;
  employee_name: string;
  job_title: string;
  sub_unit: string;
  period_start: string;
  period_end: string;
  due_date: string;
  status: string;
}

export interface ReviewInput {
  employee_id: number | null;
  period_start: string;
  period_end: string;
  due_date: string;
  status: string;
}

export interface Claim {
  id: number;
  reference_code: string;
  employee_id: number;
  employee_name: string;
  event_name: string;
  description: string;
  currency: string;
  submitted_date: string;
  status: string;
  amount: string;
}

export interface ClaimInput {
  employee_id: number | null;
  event_name: string;
  description: string;
  currency: string;
  submitted_date: string;
  status: string;
  amount: string;
}

export interface ContactDetails {
  street1: string;
  street2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  home_phone: string;
  mobile_phone: string;
  work_phone: string;
  work_email: string;
  other_email: string;
}

export interface EmergencyContact {
  id: number;
  name: string;
  relationship: string;
  home_phone: string;
  mobile_phone: string;
  work_phone: string;
}

export interface Vacancy {
  id: number;
  job_title: string;
  vacancy_name: string;
  hiring_manager: string;
  status: string;
}

export interface Tracker {
  id: number;
  employee_id: number;
  employee_name: string;
  tracker_name: string;
  status: string;
}

export interface BuzzPost {
  id: number;
  body: string;
  author_name: string;
  created_at: string;
}
