export const LOCAL_USERNAME = "demo_admin";

export type NavId =
  | "admin"
  | "pim"
  | "leave"
  | "time"
  | "recruitment"
  | "my-info"
  | "performance"
  | "dashboard"
  | "directory"
  | "maintenance"
  | "claim"
  | "buzz";

export interface NavItem {
  id: NavId;
  label: string;
  observedHref: string;
  inspected: boolean;
}

/** Sidebar labels and hrefs observed on the live dashboard, in document order. */
export const navItems: NavItem[] = [
  { id: "admin", label: "Admin", observedHref: "/web/index.php/admin/viewSystemUsers", inspected: true },
  { id: "pim", label: "PIM", observedHref: "/web/index.php/pim/viewPimModule", inspected: true },
  { id: "leave", label: "Leave", observedHref: "/web/index.php/leave/viewLeaveList", inspected: true },
  { id: "time", label: "Time", observedHref: "/web/index.php/time/viewEmployeeTimesheet", inspected: true },
  { id: "recruitment", label: "Recruitment", observedHref: "/web/index.php/recruitment/viewCandidates", inspected: true },
  { id: "my-info", label: "My Info", observedHref: "/web/index.php/pim/viewMyDetails", inspected: true },
  { id: "performance", label: "Performance", observedHref: "/web/index.php/performance/searchEvaluatePerformanceReview", inspected: true },
  { id: "dashboard", label: "Dashboard", observedHref: "/web/index.php/dashboard/index", inspected: true },
  { id: "directory", label: "Directory", observedHref: "/web/index.php/directory/viewDirectory", inspected: true },
  { id: "maintenance", label: "Maintenance", observedHref: "/web/index.php/maintenance/purgeEmployee", inspected: true },
  { id: "claim", label: "Claim", observedHref: "/web/index.php/claim/viewAssignClaim", inspected: true },
  { id: "buzz", label: "Buzz", observedHref: "/web/index.php/buzz/viewBuzz", inspected: true },
];

export const quickLaunch = [
  "Assign Leave",
  "Leave List",
  "Timesheets",
  "Apply Leave",
  "My Leave",
  "My Timesheet",
];

export const widgetTitles = [
  "Time at Work",
  "My Actions",
  "Quick Launch",
  "Buzz Latest Posts",
  "Employees on Leave Today",
  "Employee Distribution by Sub Unit",
  "Employee Distribution by Location",
];

export interface SyntheticEmployee {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  employmentStatus: string;
  subUnit: string;
  supervisor: string;
}

/** Option text opened on the Employee List on 2026-11-14. Not employee records. */
export const employmentStatusOptions = [
  "-- Select --",
  "Freelance",
  "Full-Time Contract",
  "Full-Time Permanent",
  "Full-Time Probation",
  "Part-Time Contract",
  "Part-Time Internship",
] as const;

export const includeOptions = [
  "Current Employees Only",
  "Current and Past Employees",
  "Past Employees Only",
] as const;

export const jobTitleOptions = [
  "-- Select --",
  "Account Assistant",
  "AutoJob_7204467660",
  "AutoJob_7222056471",
  "AutoJob_7241983324",
  "Automaton Tester",
  "Chief Executive Officer",
  "Chief Financial Officer",
  "Chief Technical Officer",
  "Content Specialist",
  "Customer Success Manager",
  "Database Administrator",
  "Finance Manager",
  "Financial Analyst",
  "Head of Support",
  "HR Associate",
  "HR Manager",
  "IT Manager",
  "Network Administrator",
  "Payroll Administrator",
  "Pre-Sales Coordinator",
  "QA Engineer",
  "QA Lead",
  "qwer",
  "rsjsrii",
  "Sales Representative",
  "Social Media Marketer",
  "Software Architect",
  "Software Engineer",
  "Support Specialist",
  "VP - Client Services",
  "VP - Sales & Marketing",
] as const;

export const subUnitOptions = [
  "-- Select --",
  "OrangeHRM",
  "Administration",
  "Engineering",
  "Development",
  "Quality Assurance",
  "TechOps",
  "Sales & Marketing",
  "Sales",
  "Marketing",
  "Client Services",
  "Technical Support",
  "Finance",
  "Human Resources",
  "hola",
  "juan perez",
] as const;

const givenNames = [
  "Asha", "Leo", "Nora", "Jonah", "Mina", "Owen", "Priya", "Hugo", "Lila", "Evan", "Soren",
];
const familyNames = ["Sharma", "Martins", "Ibarra", "Ellis", "Okoye"];
const filledStatuses = employmentStatusOptions.filter(
  (status) => status !== "-- Select --" && status !== "Freelance",
);
const filledJobs = jobTitleOptions.filter((title) => title !== "-- Select --");
const filledUnits = subUnitOptions.filter((unit) => unit !== "-- Select --");

/**
 * Local stand-ins. The first page of the 2026-11-12 list showed 50 data rows,
 * so this set is longer than one page. Nobody is Freelance: that status search
 * returned no rows. Names from the live autocomplete were not copied.
 */
export const syntheticEmployees: SyntheticEmployee[] = givenNames.flatMap((firstName, givenIndex) =>
  familyNames.map((lastName, familyIndex) => {
    const index = givenIndex * familyNames.length + familyIndex;
    const filled = index % 3 !== 0;
    return {
      employeeNumber: String(1001 + index),
      firstName,
      lastName,
      jobTitle: filled ? filledJobs[index % filledJobs.length] : "",
      employmentStatus: filled ? filledStatuses[index % filledStatuses.length] : "",
      subUnit: filled ? filledUnits[index % filledUnits.length] : "",
      supervisor: "",
    };
  }),
);

/** Report titles from the 2026-11-13 Reports inspection. Not employee records. */
export const observedReportNames = [
  "All Employee Sub Unit Hierarchy Report",
  "Employee Contact info report",
  "Employee Job Details",
  "PIM Sample Report",
  "QaReport_530297",
  "Report Night 56651",
] as const;
