const { test } = require("@playwright/test");

const ProfilePage = require("../../pages/profile/ProfilePage");

const { captureScreenshot } = require("../../utils/screenshotUtils");

test("Profile Verification", async ({ page }) => {
  const profile = new ProfilePage(page);

  // Open the protected profile with the shared authenticated state.
  await page.goto("/profile", { waitUntil: "networkidle" });

  // 5. Verify Profile Page
  await profile.verifyProfileLoaded();

  // 6. Verify Profile Details
  await profile.verifyProfileDetails();

  // 7. Verify Your Assets Section
  await profile.verifyAssetsSection();

  // 8. Capture Profile Screenshot
  await captureScreenshot(page, test.info(), "profile");
});
