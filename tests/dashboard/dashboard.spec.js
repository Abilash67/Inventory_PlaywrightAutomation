const { test } = require("@playwright/test");

const DashboardPage = require("../../pages/dashboard/DashboardPage");
const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Dashboard Verification", async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await page.goto("/");
  await dashboard.verifyDashboardLoaded();
  await dashboard.verifyAssetCount();
  await dashboard.verifyRequestCount();
  await captureScreenshot(page, test.info(), "dashboard");

  // 4. Verify Notification Count
  await dashboard.verifyNotifications();
  await captureScreenshot(page, test.info(), "notification-count");

  // 5. Click View your Assets
  await dashboard.clickViewAssets();
  await captureScreenshot(page, test.info(), "view-your-assets");

  // 6. Return to Dashboard and click View your Requests
  await page.goBack();
  await dashboard.verifyDashboardLoaded();
  const requestPage = await dashboard.openViewRequests();
  await captureScreenshot(requestPage, test.info(), "view-your-requests");
  await page.goBack();
  await dashboard.verifyDashboardLoaded();
});
