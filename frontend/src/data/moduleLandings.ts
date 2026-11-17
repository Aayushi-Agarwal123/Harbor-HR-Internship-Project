import type { NavId } from "./synthetic";

export interface ModuleLanding {
  heading: string;
  url: string;
  evidenceId: string;
  facts: string[];
}

/** Landing facts from the 2026-11-15 authenticated inspection. Writes were not submitted. */
export const moduleLandings: Partial<Record<NavId, ModuleLanding>> = {
  admin: {
    heading: "System Users",
    url: "/web/index.php/admin/viewSystemUsers",
    evidenceId: "ev_bb35e6a6ab8a7eea8de2e0823b540583cd8f19b2523fdd3f4c5ae10677998d9b",
    facts: [
      "Filters visible: Username, User Role, Employee Name, Status.",
      "Columns: Username, User Role, Employee Name, Status, Actions.",
      "Record text on that visit: (16) Records Found.",
      "Add and configuration links were visible and were not opened.",
    ],
  },
  leave: {
    heading: "Leave List",
    url: "/web/index.php/leave/viewLeaveList",
    evidenceId: "ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400",
    facts: [
      "Filters visible: From Date, To Date, Show Leave with Status, Leave Type, Employee Name, Sub Unit, Include Past Employees.",
      "The list was empty: No Records Found.",
      "Apply, My Leave, Assign Leave, Entitlements, Reports, and Configure were visible and were not opened.",
    ],
  },
  time: {
    heading: "Timesheets",
    url: "/web/index.php/time/viewEmployeeTimesheet",
    evidenceId: "ev_feb14348a29b862117f02f60706a43eae88e9ab29b1f406edc79260e17b5c092",
    facts: [
      "Headings: Select Employee and Timesheets Pending Action.",
      "Columns: Employee Name, Timesheet Period, Actions.",
      "View buttons were visible and were not clicked.",
    ],
  },
  recruitment: {
    heading: "Candidates",
    url: "/web/index.php/recruitment/viewCandidates",
    evidenceId: "ev_e2917ea23ee1260ab65be323fb5a672d89b3f62b5c8247f24937539220c2c417",
    facts: [
      "Record text on that visit: (15) Records Found.",
      "Filters visible: Job Title, Vacancy, Hiring Manager, Status, Candidate Name, Keywords, Date of Application, Method of Application.",
      "Vacancies was visible and was not opened.",
    ],
  },
  "my-info": {
    heading: "Personal Details",
    url: "/web/index.php/pim/viewPersonalDetails/empNumber/7",
    evidenceId: "ev_4b741f09f6ad161a3cbac46fb6ca29eb6ea676585027f09368a3c42d603c409f",
    facts: [
      "My Info opens the signed-in profile, not a row chosen from Employee List.",
      "Personal Details, Contact Details, Emergency Contacts, and Job were opened.",
      "Dependents, Immigration, Salary, Report-to, Qualifications, and Memberships were visible and were not opened.",
      "Save was visible and was not clicked.",
    ],
  },
  performance: {
    heading: "Employee Reviews",
    url: "/web/index.php/performance/searchEvaluatePerformanceReview",
    evidenceId: "ev_c5346a30eaf97c5c25cd90584cd1cdd3f7cbad193994aa84a4ef13d197c21c7b",
    facts: [
      "The review table was empty: No Records Found.",
      "Filters: Employee Name, Job Title, Sub Unit, Include, Review Status, From Date, To Date.",
      "My Trackers and Employee Trackers were visible and were not opened.",
    ],
  },
  directory: {
    heading: "Directory",
    url: "/web/index.php/directory/viewDirectory",
    evidenceId: "ev_ef101ca0e83b67c873b47f14c4f49dfacf911ff37d22289ab02daac059538dd1",
    facts: [
      "Record text on that visit: (155) Records Found.",
      "Filters: Employee Name, Job Title, Location.",
      "Search and Reset were not clicked.",
    ],
  },
  maintenance: {
    heading: "Administrator Access",
    url: "/web/index.php/maintenance/purgeEmployee",
    evidenceId: "ev_eb7e92099b876c815ee1ef7a6bdb01f7c5987683966dfe287e91da50d76119cd",
    facts: [
      "The page is a credential gate, not a purge form.",
      "Cancel returned to the dashboard. Confirm was not clicked.",
    ],
  },
  claim: {
    heading: "Employee Claims",
    url: "/web/index.php/claim/viewAssignClaim",
    evidenceId: "ev_b6dca58d220d5440643c94f7b9d6e5d418375273d6685c34477bd291f035557c",
    facts: [
      "Record text on that visit: (3) Records Found.",
      "Submit Claim, My Claims, and View Details were visible and were not opened.",
    ],
  },
  buzz: {
    heading: "Buzz",
    url: "/web/index.php/buzz/viewBuzz",
    evidenceId: "ev_8c491cc22de36c0fbde2f7c2d10f1d415e18e1e3bd31490404bd39dba5392a43",
    facts: [
      "Share Photos, Share Video, and Post were visible and were not clicked.",
      "Harbor HR does not store a local feed.",
    ],
  },
};
