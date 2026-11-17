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

test("timesheet list, my timesheet, and attendance stay within recorded actions", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Username").fill("demo_admin");
  await page.getByLabel("Password").fill(localPassword());
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByRole("button", { name: "Time", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Select Employee" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Timesheets Pending Action" })).toBeVisible();
  await expect(page.getByLabel("Employee Name")).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Timesheet Period" })).toBeVisible();
  await expect(page.getByText("No stored timesheets.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Edit" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Submit" })).toHaveCount(0);

  await page.getByRole("button", { name: "My Timesheets" }).click();
  await expect(page.getByRole("heading", { name: "My Timesheet" })).toBeVisible();
  await expect(page.getByText("Status: Not Submitted")).toBeVisible();
  await expect(page.getByRole("button", { name: "Edit" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
  await expect(page.getByRole("columnheader", { name: "Project" })).toBeVisible();
  await expect(page.getByText("Cell values were observed and were not saved.")).toBeVisible();

  await page.getByRole("button", { name: "Employee Records" }).click();
  await expect(page.getByRole("heading", { name: "Employee Attendance Records" })).toBeVisible();
  await expect(page.getByText("No attendance records are stored.")).toBeVisible();
  await page.getByRole("button", { name: "My Records" }).click();
  await expect(page.getByRole("heading", { name: "My Attendance Records" })).toBeVisible();
  await expect(page.getByRole("button", { name: "View" })).toBeDisabled();
  await page.getByRole("button", { name: "Configuration" }).click();
  await expect(page.getByRole("heading", { name: "Attendance Configuration" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Punch In/Out" })).toBeDisabled();
});
