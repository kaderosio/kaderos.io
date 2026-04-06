import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login with invalid credentials shows error", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "wrong@test.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.getByRole("button", { name: /anmelden|login|sign in/i }).first().click();
    // Should show error or stay on login
    await page.waitForTimeout(2000);
    expect(page.url()).toContain("/login");
  });

  test("demo account login works", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "demo@kaderos.io");
    await page.fill('input[type="password"]', "Demo2026!");
    await page.getByRole("button", { name: /anmelden|login|sign in/i }).first().click();
    // Should redirect to dashboard or onboarding
    await page.waitForURL(/dashboard|onboarding/, { timeout: 10000 });
    expect(page.url()).toMatch(/dashboard|onboarding/);
  });

  test("unauthenticated dashboard access redirects to login", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForTimeout(3000);
    // Should redirect to login
    expect(page.url()).toContain("/login");
  });

  test("forgot password page loads", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.locator("input[type=email]").first()).toBeVisible();
  });
});
