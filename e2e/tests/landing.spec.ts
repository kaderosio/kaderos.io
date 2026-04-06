import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("loads and shows hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/KaderOS/);
    // Primary CTA should be visible
    const cta = page.getByRole("link", { name: /platz sichern|kostenlos starten/i });
    await expect(cta.first()).toBeVisible();
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");
    // Check key links exist
    await expect(page.getByRole("link", { name: /pricing|preise/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /blog/i }).first()).toBeVisible();
  });

  test("pricing page loads", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("text=CHF").first()).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("article, [class*=blog]").first()).toBeVisible();
  });

  test("templates page loads", async ({ page }) => {
    await page.goto("/templates");
    await expect(page.locator("text=/template|vorlage/i").first()).toBeVisible();
  });

  test("login page loads", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /anmelden|login|sign in/i }).first()).toBeVisible();
  });

  test("signup page loads", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("input[type=email]").first()).toBeVisible();
  });

  test("legal pages load", async ({ page }) => {
    await page.goto("/datenschutz");
    await expect(page.locator("h1").first()).toBeVisible();

    await page.goto("/impressum");
    await expect(page.locator("h1").first()).toBeVisible();

    await page.goto("/agb");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
