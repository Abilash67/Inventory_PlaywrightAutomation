const { test } = require("@playwright/test");

const DashboardPage = require("../../pages/dashboard/DashboardPage");

const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Dashboard Verification", async ({ page }) => {
  const dashboard = new DashboardPage(page);

  // Open the protected dashboard with the shared authenticated state.
  await page.goto("/");

  // Verify Dashboard
  await dashboard.verifyDashboardLoaded();

  // 4. Verify User Details
  await dashboard.verifyUser();

  // 5. Verify Dashboard Cards
  await dashboard.verifyCards();

  // 6. Verify Asset Count
  await dashboard.verifyAssetCount();

  // 7. Verify View Assets Link
  await dashboard.verifyViewAssetLink();

  // 8. Dashboard Screenshot
  await captureScreenshot(page, test.info(), "dashboard");

  // 9. Navigate to Assets/Profile
  await dashboard.clickViewAssets();

  // 10. Assets Page Screenshot
  await captureScreenshot(page, test.info(), "assets-page");
});
