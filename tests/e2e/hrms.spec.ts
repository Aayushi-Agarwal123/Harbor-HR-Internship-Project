import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

function localPassword(): string {
  const fromEnv = process.env.HARBOR_LOCAL_PASSWORD;
  if (fromEnv) return fromEnv;
  const envPath = path.resolve(__dirname, "../../.env");
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("HARBOR_LOCAL_PASSWORD=")) continue;
    const value = trimmed.slice("HARBOR_LOCAL_PASSWORD=".length).trim();
    if (value) return value;
  }
  throw new Error("HARBOR_LOCAL_PASSWORD is missing from the ignored environment file.");
}

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByLabel("Username").fill("demo_admin");
  await page.getByLabel("Password").fill(localPassword());
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
}

test("TC-01 valid login and TC-10 logout", async ({ page }) => {
  await login(page);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toHaveCount(0);
});

test("TC-02 invalid credentials", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("demo_admin");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Those credentials were not recognized.");
});

test("sidebar order, employee count, and Quick Launch routes", async ({ page }) => {
  await login(page);
  await expect(page.getByRole("navigation", { name: "Sidepanel" }).getByRole("button")).toHaveText([
    "Admin",
    "PIM",
    "Leave",
    "Time",
    "Recruitment",
    "My Info",
    "Performance",
    "Dashboard",
    "Directory",
    "Maintenance",
    "Claim",
    "Buzz",
  ]);
  await expect(page.getByText("Local employees: 55.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Upgrade" })).toBeDisabled();
  await expect(page.getByLabel("Search")).toBeDisabled();
  await page.getByRole("button", { name: "Leave List", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Leave List" })).toBeVisible();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("button", { name: "Assign Leave", exact: true }).click();
  await expect(page.getByLabel("Employee Name")).toBeVisible();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("button", { name: "Apply Leave", exact: true }).click();
  await expect(page.getByText("No Leave Types with Leave Balance")).toBeVisible();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("button", { name: "My Leave", exact: true }).click();
  await expect(page.getByRole("heading", { name: "My Leave List" })).toBeVisible();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("button", { name: "Timesheets", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Select Employee" })).toBeVisible();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.getByRole("button", { name: "My Timesheet", exact: true }).click();
  await expect(page.getByRole("heading", { name: "My Timesheet" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByText("Local employees: 55.")).toBeVisible();
});

test("local shell is beside the content at 1280px and stacked at 768px and 390px", async ({ page }) => {
  async function widths() {
    return page.evaluate(() => {
      const shell = document.querySelector(".shell");
      const sidebar = document.querySelector(".sidebar");
      if (!(shell instanceof HTMLElement) || !(sidebar instanceof HTMLElement)) {
        return null;
      }
      const shellBox = shell.getBoundingClientRect();
      const sideBox = sidebar.getBoundingClientRect();
      return {
        viewport: window.innerWidth,
        shell: shellBox.width,
        sidebar: sideBox.width,
        sidebarTop: sideBox.top,
        contentTop: shellBox.top,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await login(page);
  const desktop = await widths();
  expect(desktop).not.toBeNull();
  expect(desktop!.viewport).toBe(1280);
  expect(desktop!.sidebar).toBeLessThan(desktop!.shell * 0.5);
  expect(desktop!.overflow).toBe(false);

  await page.setViewportSize({ width: 768, height: 900 });
  const tablet = await widths();
  expect(tablet!.viewport).toBe(768);
  expect(tablet!.sidebar).toBeGreaterThan(tablet!.shell * 0.9);
  expect(tablet!.overflow).toBe(false);

  await page.setViewportSize({ width: 390, height: 844 });
  const phone = await widths();
  expect(phone!.viewport).toBe(390);
  expect(phone!.sidebar).toBeGreaterThan(phone!.shell * 0.9);
  expect(phone!.overflow).toBe(false);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toBeVisible();
  const tableFits = await page.evaluate(() => {
    const wrap = document.querySelector(".table-wrap");
    if (!(wrap instanceof HTMLElement)) return null;
    const box = wrap.getBoundingClientRect();
    return {
      insidePage: box.right <= document.documentElement.clientWidth + 1,
      pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });
  expect(tableFits).not.toBeNull();
  expect(tableFits!.insidePage).toBe(true);
  expect(tableFits!.pageOverflow).toBe(false);

  await page.getByRole("button", { name: "Add Employee" }).click();
  const first = await page.getByLabel("First Name").boundingBox();
  const last = await page.getByLabel("Last Name").boundingBox();
  expect(first).not.toBeNull();
  expect(last).not.toBeNull();
  expect(last!.y).toBeGreaterThan(first!.y);
  const formOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(formOverflow).toBe(false);
});

test("TC-09 logged-out visitor does not see PIM", async ({ page }) => {
  await page.goto("/#pim");
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toHaveCount(0);
});

test("TC-03 list, TC-04 name search, TC-05 empty, TC-06 reset, pagination", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toBeVisible();
  await expect(page.getByText("(55) Records Found")).toBeVisible();
  await page.getByLabel("Employee Name").fill("Asha Sharma");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("(1) Records Found")).toBeVisible();
  const rows = await page.locator("tbody tr").allTextContents();
  expect(rows).toHaveLength(1);
  expect(rows[0]).toContain("Asha");
  expect(rows[0]).toContain("Sharma");
  expect(rows[0]).not.toContain("Leo");
  await expect(page.getByRole("cell", { name: "Leo", exact: true })).toHaveCount(0);
  await page.getByLabel("Employee Name").fill("No Such Person");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("No Records Found").first()).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByText("(55) Records Found")).toBeVisible();
  await expect(page.getByText("Info: No Records Found")).toBeVisible();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByRole("cell", { name: "1051" })).toBeVisible();
});

test("TC-07 add, TC-08 edit, validation, and persistence", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await page.getByRole("button", { name: "Add Employee" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("First name is required.")).toBeVisible();
  await page.getByLabel("First Name").fill("Playwright");
  await page.getByLabel("Last Name").fill("Added");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("heading", { name: "Employee Details" })).toBeVisible();
  await expect(page.getByText("Playwright")).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Last Name").fill("Edited");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Edited")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await page.getByLabel("Employee Name").fill("Playwright Edited");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("cell", { name: "Edited", exact: true })).toBeVisible();
});

test("blank login, dashboard return, cancel, sort, page size, reports, and list error", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Enter both username and password.");
  await login(page);
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await page.getByRole("button", { name: "Add Employee" }).click();
  await page.getByLabel("First Name").fill("NotSaved");
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toBeVisible();
  await page.getByLabel("Employee Name").fill("NotSaved");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("No Records Found").first()).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await page.getByLabel("Sort").selectOption("last_name");
  await page.getByLabel("Direction").selectOption("desc");
  await expect(page.getByRole("cell", { name: "Sharma", exact: true }).first()).toBeVisible();
  await page.getByLabel("Rows").selectOption("10");
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByRole("cell", { name: "1001" })).toHaveCount(0);
  await page.getByRole("button", { name: "Reports" }).click();
  await expect(page.getByRole("cell", { name: "PIM Sample Report", exact: true })).toBeVisible();
  await expect(page.getByText("(6) Records Found")).toBeVisible();
  await page.getByLabel("Report Name").fill("PIM");
  await page.getByRole("option", { name: "PIM Sample Report" }).click();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("(1) Record Found")).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByText("(6) Records Found")).toBeVisible();
  await page.route("**/api/employees?**", (route) => route.fulfill({
    status: 500,
    contentType: "application/json",
    body: JSON.stringify({ detail: "The employee list could not be loaded." }),
  }));
  await page.getByRole("button", { name: "Employee List" }).click();
  await expect(page.getByRole("alert")).toContainText("The employee list could not be loaded.");
});

test("proposed local delete removes the employee", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await page.getByLabel("Employee Name").fill("Soren Okoye");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("cell", { name: "Okoye", exact: true })).toBeVisible();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("No Records Found").first()).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await page.getByLabel("Employee Name").fill("Soren Okoye");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("cell", { name: "Okoye", exact: true })).toHaveCount(0);
});
