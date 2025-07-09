import { expect, test } from "@playwright/test";

test.describe("Basic Page", () => {
  const pageUrl = "/";

  test("loads", async ({ page }) => {
    await page.goto(pageUrl);

    await expect(
      page.locator('h1:has-text("YouTube Embed URL Generator")'),
    ).toBeVisible();
  });
});
