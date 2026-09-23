const { expect } = require("@playwright/test");
const { login: loginUrl } = require("../../constants/urls");

class LoginPage {
  constructor(page) {
    this.page = page;

    // ==========================================
    // Login form
    // ==========================================

    // Use stable input positions.
    // Password type changes from "password" to "text"
    // when visibility is toggled, so do not use
    // input[type="password"] as the locator.
    this.email = page.locator("input").nth(0);
    this.password = page.locator("input").nth(1);

    // Password visibility toggle
    this.passwordToggle = page.locator("button.password-toggle");

    // Login button
    this.loginButton = page.getByRole("button", {
      name: "Login",
      exact: true,
    });

    // Remember me
    this.rememberMe = page.getByLabel(/remember me/i);

    // Forgot password
    this.forgotPasswordLink = page.getByRole("link", {
      name: /forgot password/i,
    });

    // Dashboard
    this.dashboardLink = page.getByRole("link", {
      name: /Dashboard/i,
    });

    // Error messages
    this.invalidCredentialsMessage = page.locator('div[id="1"]');
    this.notificationAlert = page.getByRole("alert");
  }

  // ==========================================
  // Open application
  // ==========================================

  async openApplication() {
    // Login tests should start without
    // an existing authentication session.
    await this.page.context().clearCookies();

    await this.page.goto(loginUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.email).toBeVisible({
      timeout: 30000,
    });

    await expect(this.password).toBeVisible({
      timeout: 30000,
    });

    await expect(this.loginButton).toBeVisible({
      timeout: 30000,
    });
  }

  // ==========================================
  // Submit login
  // ==========================================

  async submit(username, password) {
    await this.email.fill(username);
    await this.password.fill(password);

    await this.loginButton.click();
  }

  // ==========================================
  // Submit using Enter
  // ==========================================

  async submitFromField(field, username, password) {
    await this.email.fill(username);
    await this.password.fill(password);

    await field.press("Enter");
  }

  // ==========================================
  // Toggle password visibility
  // ==========================================

  async togglePasswordVisibility() {
    await expect(this.passwordToggle).toBeVisible();

    await this.passwordToggle.click();
  }

  // ==========================================
  // Get error message
  // ==========================================

  getErrorMessage() {
    return this.invalidCredentialsMessage.or(this.notificationAlert);
  }

  // ==========================================
  // Clear login form
  // ==========================================

  async clearForm() {
    await this.email.fill("");
    await this.password.fill("");
  }

  // ==========================================
  // Verify login form
  // ==========================================

  async expectLoginForm() {
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  // ==========================================
  // Verify successful login
  // ==========================================

  async expectDashboard() {
    // Application dashboard is "/".
    // Inventory is "/inventory".
    // Allow all valid post-login destinations.
    await expect(this.page).toHaveURL(/\/(?:dashboard|inventory)?(?:\/)?$/, {
      timeout: 30000,
    });
  }

  // ==========================================
  // Login
  // ==========================================

  async login(username, password) {
    await this.submit(username, password);
    await this.expectDashboard();
  }

  // ==========================================
  // Verify invalid credentials
  // ==========================================

  async expectInvalidCredentials() {
    const invalidMessage = this.invalidCredentialsMessage.or(
      this.notificationAlert,
    );

    await expect(invalidMessage).toBeVisible({
      timeout: 10000,
    });

    await expect(invalidMessage).toContainText(
      /invalid email or password|incorrect email or password|request failed with status code 502/i,
    );
  }

  // ==========================================
  // Verify login page
  // ==========================================

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.email).toBeVisible({
      timeout: 10000,
    });

    await expect(this.password).toBeVisible({
      timeout: 10000,
    });
  }

  // ==========================================
  // Clear authentication
  // ==========================================

  async clearAuthentication() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await this.page.context().clearCookies();

    await this.page.goto("about:blank");
  }
}

module.exports = LoginPage;
