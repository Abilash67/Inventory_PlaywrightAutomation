const { test } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const loginData = require("../../test-data/loginData.json");

test("Login Verification", async ({ page }) => {
  const login = new LoginPage(page);

  // Open Login Page
  await login.openApplication();

  // Login Page Screenshot
  await page.screenshot({
    path: "screenshots/login-page.png",
    fullPage: true,
  });

  // Attach Screenshot to Playwright HTML Report
  await test.info().attach("Login Page Screenshot", {
    path: "screenshots/login-page.png",
    contentType: "image/png",
  });

  // Perform Login
  await login.login(
    loginData.email,
    loginData.password
  );
});