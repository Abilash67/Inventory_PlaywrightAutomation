const { expect } = require("@playwright/test");

const { login: loginUrl } = require("../../constants/urls");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.email = page.getByRole("textbox").nth(0);
    this.password = page.getByRole("textbox").nth(1);

    this.passwordToggle = page.locator("button.password-toggle");

    this.loginButton = page.getByRole("button", {
      name: "Login",
      exact: true,
    });

    this.rememberMe = page.getByLabel(/remember me/i);

    this.forgotPasswordLink = page.getByRole("link", {
      name: /forgot password/i,
    });

    this.dashboardLink = page.getByRole("link", {
      name: /Dashboard/i,
    });

    this.invalidCredentialsMessage = page.locator('div[id="1"]');
    this.notificationAlert = page.getByRole("alert");
  }

  async openApplication() {
    await this.page.goto(loginUrl, {
      waitUntil: "commit",
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

  async submit(username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async submitFromField(field, username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await field.press("Enter");
  }

  async togglePasswordVisibility() {
    await expect(this.passwordToggle).toBeVisible();
    await this.passwordToggle.click();
  }

  getErrorMessage() {
    return this.invalidCredentialsMessage.or(this.notificationAlert);
  }

  async clearForm() {
    await this.email.fill("");
    await this.password.fill("");
  }

  async expectLoginForm() {
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/\/(?:dashboard)?\/?$/, {
      timeout: 30000,
    });
  }

  async login(username, password) {
    await this.submit(username, password);
    await this.expectDashboard();
  }

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

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
  }
}

module.exports = LoginPage;
