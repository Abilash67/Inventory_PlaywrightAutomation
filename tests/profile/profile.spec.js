const { test } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");
const ProfilePage = require("../../pages/profile/ProfilePage");
const credentials = require("../../config/credentials");
const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Profile Verification", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const profile = new ProfilePage(page);

  // Open the application, authenticate, and navigate to the profile.
  await login.openApplication();
  await login.login(credentials.email, credentials.password);
  await dashboard.verifyDashboardLoaded();
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
