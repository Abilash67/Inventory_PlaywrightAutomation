const { test, expect } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");
const credentials = require("../../config/credentials");

test.describe("Login", () => {
  test("renders the login form with required controls", async ({ page }) => {
    const login = new LoginPage(page);

    await login.openApplication();

    await expect(login.email).toHaveAttribute("type", "email");
    await expect(login.password).toHaveAttribute("type", "password");
    await expect(login.loginButton).toHaveAttribute("type", "submit");
  });

  test("validates the password field type", async ({ page }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await expect(login.password).toHaveAttribute("type", "password");
  });

  test("validates invalid-credential error message content", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.submit("invalid-user@example.com", "DefinitelyWrongPassword!");
    await expect(login.getErrorMessage()).toContainText(
      /invalid email or password|incorrect email or password/i,
    );
  });

  test("clears the invalid-credential error after a new form interaction", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.submit("invalid-user@example.com", "DefinitelyWrongPassword!");
    await login.expectInvalidCredentials();
    await login.email.fill(credentials.email);
    await expect(login.getErrorMessage()).toBeHidden();
  });

  test("returns to the dashboard after navigating back and forward", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.openApplication();
    await login.login(credentials.email, credentials.password);
    await page.goBack();
    await page.goForward();
    await login.expectDashboard();
    await dashboard.verifyDashboardLoaded();
  });

  test("redirects direct dashboard access to the login page", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await page.goto("/");
    await login.expectOnLoginPage();
  });

  test("redirects protected URLs to login when unauthenticated", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await page.goto("/inventory");
    await login.expectOnLoginPage();
  });

  test("supports mobile login layout", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const login = new LoginPage(page);

    await login.openApplication();
    await login.expectLoginForm();
    await expect(login.loginButton).toBeInViewport();
  });

  test("rejects an invalid email and password", async ({ page }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.submit("invalid-user@example.com", "DefinitelyWrongPassword!");
    await login.expectInvalidCredentials();
    await login.expectOnLoginPage();
  });

  test("keeps the user on the login page when fields are empty", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.loginButton.click();

    await expect(login.email).toHaveValue("");
    await expect(login.password).toHaveValue("");
    await login.expectOnLoginPage();
  });

  test("rejects an incorrectly formatted email before authentication", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.submit("not-an-email", "AnyPassword123!");
    await login.expectOnLoginPage();
  });

  test("logs in with valid credentials and opens the dashboard", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.openApplication();
    await login.login(credentials.email, credentials.password);
    await dashboard.verifyDashboardLoaded();
    await expect(page).not.toHaveURL(/\/login/);
  });

  test("toggles password visibility without changing the password value", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.password.fill(credentials.password);
    await expect(login.password).toHaveAttribute("type", "password");
    await expect(login.password).toHaveValue(credentials.password);

    await login.togglePasswordVisibility();
    await expect(login.password).toHaveAttribute("type", "text");
    await expect(login.password).toHaveValue(credentials.password);

    await login.togglePasswordVisibility();
    await expect(login.password).toHaveAttribute("type", "password");
    await expect(login.password).toHaveValue(credentials.password);
  });

  test("submits from the email and password fields with Enter", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.openApplication();
    await login.submitFromField(
      login.email,
      credentials.email,
      credentials.password,
    );
    await login.expectDashboard();
    await dashboard.verifyDashboardLoaded();
    await dashboard.logout();

    await login.openApplication();
    await login.submitFromField(
      login.password,
      credentials.email,
      credentials.password,
    );
    await login.expectDashboard();
    await dashboard.verifyDashboardLoaded();
  });

  test("accepts uppercase, mixed-case, and lowercase email addresses", async ({
    page,
  }) => {
    test.fail(
      true,
      "QA currently rejects uppercase and mixed-case variants of a valid email",
    );

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const emailVariants = [
      credentials.email.toUpperCase(),
      credentials.email
        .split("@")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("@"),
      credentials.email.toLowerCase(),
    ];

    for (const email of emailVariants) {
      await login.openApplication();
      await login.login(email, credentials.password);
      await dashboard.verifyDashboardLoaded();
      await dashboard.logout();
    }
  });

  test("redirects to the dashboard and displays dashboard elements", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.openApplication();
    await login.login(credentials.email, credentials.password);

    await expect(page).toHaveURL(/\/(?:dashboard)?\/?$/);
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyCards();
    await dashboard.verifyUser();
  });

  test("keeps the authenticated user on the dashboard after refresh", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.openApplication();
    await login.login(credentials.email, credentials.password);
    await page.reload({ waitUntil: "domcontentloaded" });

    await expect(page).not.toHaveURL(/\/login(?:\/)?$/);
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyCards();
  });

  test("trims leading and trailing email whitespace but rejects internal whitespace", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    for (const email of [
      `  ${credentials.email}`,
      `${credentials.email}  `,
    ]) {
      await login.openApplication();
      await login.login(email, credentials.password);
      await dashboard.verifyDashboardLoaded();
      await dashboard.logout();
    }

    await login.openApplication();
    await login.submit(
      credentials.email.replace("@", " @"),
      credentials.password,
    );
    await login.expectOnLoginPage();
  });

  test("autofocuses email and moves focus to password with Tab", async ({
    page,
  }) => {
    test.fail(
      true,
      "QA currently does not autofocus the email field on the login page",
    );

    const login = new LoginPage(page);

    await login.openApplication();
    await expect(login.email).toBeFocused();
    await login.email.press("Tab");
    await expect(login.password).toBeFocused();
  });
});
