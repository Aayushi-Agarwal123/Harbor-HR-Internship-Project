import { navItems, type NavId } from "./data/synthetic";

export type PimView = "list" | "add" | "reports" | "detail" | "edit";

export interface AppLocation {
  kind: "login" | "forgot" | "module" | "unknown";
  module: NavId;
  pimView: PimView;
  employeeId: number | null;
  path: string;
}

const MODULE_PATH: Record<NavId, string> = {
  admin: "/admin",
  pim: "/pim",
  leave: "/leave",
  time: "/time",
  recruitment: "/recruitment",
  "my-info": "/my-info",
  performance: "/performance",
  dashboard: "/dashboard",
  directory: "/directory",
  maintenance: "/maintenance",
  claim: "/claim",
  buzz: "/buzz",
};

export function pathForModule(id: NavId): string {
  return MODULE_PATH[id];
}

export function pathForPim(view: PimView, employeeId: number | null): string {
  if (view === "add") return "/pim/add";
  if (view === "reports") return "/pim/reports";
  if (employeeId !== null && view === "edit") return `/pim/employees/${employeeId}/edit`;
  if (employeeId !== null && view === "detail") return `/pim/employees/${employeeId}`;
  return "/pim";
}

function location(kind: AppLocation["kind"], module: NavId, pimView: PimView, employeeId: number | null, path: string): AppLocation {
  return { kind, module, pimView, employeeId, path };
}

export function parsePath(pathname: string): AppLocation {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (path === "/" || path === "/login") return location("login", "dashboard", "list", null, "/login");
  if (path === "/forgot") return location("forgot", "dashboard", "list", null, "/forgot");
  const employee = /^\/pim\/employees\/(\d+)(\/edit)?$/.exec(path);
  if (employee) {
    const employeeId = Number(employee[1]);
    return location("module", "pim", employee[2] ? "edit" : "detail", employeeId, path);
  }
  if (path === "/pim" || path === "/pim/add" || path === "/pim/reports") {
    const pimView: PimView = path === "/pim/add" ? "add" : path === "/pim/reports" ? "reports" : "list";
    return location("module", "pim", pimView, null, path);
  }
  const item = navItems.find((entry) => MODULE_PATH[entry.id] === path);
  if (item) return location("module", item.id, "list", null, path);
  return location("unknown", "dashboard", "list", null, path);
}
