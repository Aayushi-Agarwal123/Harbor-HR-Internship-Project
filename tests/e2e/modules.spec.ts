import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

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

test("remaining modules save, filter, and keep unopened actions disabled", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/");
  await page.getByLabel("Username").fill("demo_admin");
  await page.getByLabel("Password").fill(localPassword());
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await page.getByRole("button", { name: "Leave", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Leave List" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Apply" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Entitlements" })).toBeDisabled();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Choose an employee.")).toBeVisible();
  await page.getByLabel("Employee Name").selectOption({ index: 1 });
  await page.getByLabel("From Date").fill("2026-11-16");
  await page.getByLabel("To Date").fill("2026-11-17");
  await page.getByLabel("Comments").fill("Local leave");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Local leave" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("cell", { name: "Local leave" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No Records Found")).toBeVisible();

  await page.getByRole("button", { name: "Recruitment", exact: true }).click();
  await expect(page.getByRole("button", { name: "Vacancies" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("Candidate Name").fill("Local Candidate");
  await page.getByLabel("Vacancy").fill("QA Engineer");
  await page.getByLabel("Date of Application").fill("2026-11-16");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Local Candidate" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No local candidates match this search.")).toBeVisible();
  await page.getByRole("button", { name: "Vacancies" }).click();
  await expect(page.getByRole("heading", { name: "Vacancies" })).toBeVisible();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("Vacancy").fill("Local vacancy");
  await page.getByLabel("Job Title").selectOption("QA Engineer");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Local vacancy" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No local vacancies are stored.")).toBeVisible();

  await page.getByRole("button", { name: "Performance", exact: true }).click();
  await expect(page.getByRole("button", { name: "Configure" })).toBeDisabled();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("Employee Name").selectOption({ index: 1 });
  await page.getByLabel("From Date").fill("2026-01-01");
  await page.getByLabel("To Date").fill("2026-03-31");
  await page.getByLabel("Due Date").fill("2026-04-15");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Activated" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No Records Found")).toBeVisible();
  await page.getByRole("button", { name: "Employee Trackers" }).click();
  await expect(page.getByRole("heading", { name: "Employee Trackers" })).toBeVisible();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("Employee Name").selectOption({ index: 1 });
  await page.getByLabel("Tracker").fill("Local tracker");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Local tracker" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No Records Found")).toBeVisible();

  await page.getByRole("button", { name: "Directory", exact: true }).click();
  await page.getByLabel("Employee Name").fill("Asha Sharma");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("button", { name: /Asha Sharma/ })).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();

  await page.getByRole("button", { name: "My Info", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Personal Details" })).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Middle Name").fill("Local");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Asha Local Sharma")).toBeVisible();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Middle Name").fill("");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Asha Sharma").first()).toBeVisible();
  await page.getByRole("button", { name: "Contact Details" }).click();
  await page.getByLabel("City").fill("Pune");
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/contact") && response.request().method() === "PUT" && response.ok()),
    page.getByRole("button", { name: "Save" }).click(),
  ]);
  await expect(page.getByLabel("City")).toHaveValue("Pune");
  await page.getByLabel("City").fill("");
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/contact") && response.request().method() === "PUT" && response.ok()),
    page.getByRole("button", { name: "Save" }).click(),
  ]);
  await expect(page.getByLabel("City")).toHaveValue("");
  await page.getByRole("button", { name: "Emergency Contacts" }).click();
  await page.getByLabel("Name").fill("Local Contact");
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/emergency-contacts") && response.request().method() === "POST" && response.ok()),
    page.getByRole("button", { name: "Save" }).click(),
  ]);
  await expect(page.getByRole("cell", { name: "Local Contact" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("No emergency contacts are stored.")).toBeVisible();

  await page.getByRole("button", { name: "Maintenance", exact: true }).click();
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.getByText("The password does not match.")).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.getByRole("button", { name: "Claim", exact: true }).click();
  await expect(page.getByRole("button", { name: "Submit Claim" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByLabel("Employee Name").selectOption({ index: 1 });
  await page.getByLabel("Event Name").fill("Local travel");
  await page.getByLabel("Submitted Date").fill("2026-11-16");
  await page.getByLabel("Amount").fill("15.25");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("cell", { name: "Submitted" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(page.getByText("No local claims match this search.")).toBeVisible();

  await page.getByRole("button", { name: "Buzz", exact: true }).click();
  await expect(page.getByRole("button", { name: "Share Photos" })).toBeDisabled();
  await page.getByLabel("What's on your mind?").fill("Local post");
  await page.getByRole("button", { name: "Post" }).click();
  await expect(page.getByText("Local post")).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("No posts yet.")).toBeVisible();
  await page.getByRole("button", { name: "Admin", exact: true }).click();
  await expect(page.getByRole("button", { name: "Job" })).toBeDisabled();
  await page.getByRole("button", { name: "Time", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Select Employee" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Punch In/Out" })).toBeDisabled();
  await page.getByRole("button", { name: "PIM", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Employee Information" })).toBeVisible();
});
