import { test, expect } from "@playwright/test";

// Helper: login as demo user
async function loginAsDemo(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "demo@kaderos.io");
  await page.fill('input[type="password"]', "Demo2026!");
  await page.getByRole("button", { name: /anmelden|login|sign in/i }).first().click();
  await page.waitForURL(/dashboard|onboarding/, { timeout: 10000 });
}

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
  });

  test("overview page loads with widgets", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=/übersicht|overview/i").first()).toBeVisible();
  });

  test("team page shows agents", async ({ page }) => {
    await page.goto("/dashboard/team");
    await page.waitForTimeout(2000);
    // Should show agent cards or empty state
    await expect(page.locator("[class*=card], [class*=agent], text=/team|agent/i").first()).toBeVisible();
  });

  test("aufgaben page loads", async ({ page }) => {
    await page.goto("/dashboard/aufgaben");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/aufgaben|tasks/i").first()).toBeVisible();
  });

  test("finanzen page loads with cost data", async ({ page }) => {
    await page.goto("/dashboard/finanzen");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/finanzen|CHF|kosten/i").first()).toBeVisible();
  });

  test("entscheidungen page loads", async ({ page }) => {
    await page.goto("/dashboard/entscheidungen");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/entscheidungen|decisions/i").first()).toBeVisible();
  });

  test("gedaechtnis page loads", async ({ page }) => {
    await page.goto("/dashboard/gedaechtnis");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/gedächtnis|memory|brain/i").first()).toBeVisible();
  });

  test("workflows page loads", async ({ page }) => {
    await page.goto("/dashboard/workflows");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/workflow/i").first()).toBeVisible();
  });

  test("einstellungen page loads", async ({ page }) => {
    await page.goto("/dashboard/einstellungen");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/einstellungen|settings/i").first()).toBeVisible();
  });

  test("sidebar navigation works on all pages", async ({ page }) => {
    const pages = [
      "/dashboard",
      "/dashboard/team",
      "/dashboard/aufgaben",
      "/dashboard/ziele",
      "/dashboard/finanzen",
      "/dashboard/connectors",
    ];

    for (const p of pages) {
      await page.goto(p);
      await page.waitForTimeout(1000);
      // Sidebar should be visible on desktop
      await expect(page.locator("text=KaderOS").first()).toBeVisible();
    }
  });
});
