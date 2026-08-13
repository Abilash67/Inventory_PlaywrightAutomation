const { test } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");
const ProfilePage = require("../../pages/profile/ProfilePage");

const loginData = require("../../test-data/loginData.json");

const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Profile Verification", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const profile = new ProfilePage(page);

  // 1. Open Application
  await login.openApplication();

  // 2. Login
  await login.login(loginData.email, loginData.password);

  // 3. Verify Dashboard
  await dashboard.verifyDashboardLoaded();

  // 4. Navigate to Profile
  await dashboard.clickViewAssets();

  // 5. Verify Profile Page
  await profile.verifyProfileLoaded();

  // 6. Verify Profile Details
  await profile.verifyProfileDetails();

  // 7. Verify Your Assets Section
  await profile.verifyAssetsSection();

  // 8. Capture Profile Screenshot
  await captureScreenshot(page, test.info(), "profile");
});
