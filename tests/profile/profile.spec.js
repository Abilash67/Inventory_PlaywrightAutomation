const { test } = require("@playwright/test");

const DashboardPage = require("../../pages/dashboard/DashboardPage");
const ProfilePage = require("../../pages/profile/ProfilePage");
const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Profile Verification", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const profile = new ProfilePage(page);

  await page.goto("/");
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
