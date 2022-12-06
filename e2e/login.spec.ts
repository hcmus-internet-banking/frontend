import { test, expect } from "@playwright/test";
import { ACCOUNT } from "./mock/account";

test.describe("should login then logout", async () => {
  test("should login", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.type('input[name="email"]', ACCOUNT.email);
    await page.type('input[name="password"]', ACCOUNT.password);

    await page.click("button:has-text('Login')");

    await expect(page).toHaveURL("http://localhost:3000", { timeout: 10000 });
    await page.click("a:has-text('Logout')");

    // to have string login
    expect(await page.waitForSelector("a:has-text('Login')")).toBeTruthy();
  });
});
