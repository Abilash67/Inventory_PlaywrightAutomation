const { test } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");

const loginData = require("../../test-data/loginData.json");

const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Dashboard Verification", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  // 1. Open Application
  await login.openApplication();

  // 2. Login
  await login.login(loginData.email, loginData.password);

  // 3. Verify Dashboard
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
