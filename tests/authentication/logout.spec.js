const { test } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");

const loginData = require("../../test-data/loginData.json");

const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Logout Verification", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  // Open Application
  await login.openApplication();

  // Login
  await login.login(loginData.email, loginData.password);

  // Verify Dashboard
  await dashboard.verifyDashboardLoaded();

  // Logout
  await dashboard.logout();

  // Capture Login Page after successful logout
  await captureScreenshot(page, test.info(), "logout");
});
