const { expect } = require("@playwright/test");
const { login: loginUrl } = require("../../constants/urls");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.email = page.locator('input[type="email"]');

    this.password = page.locator("input").nth(1);
    this.passwordToggle = page.locator("button.password-toggle");

    this.loginButton = page.locator('button[type="submit"]');
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
    await this.page.goto(loginUrl, { waitUntil: "domcontentloaded" });
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeVisible();
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
    await expect(this.dashboardLink).toBeVisible({ timeout: 30000 });
    await expect(this.page).not.toHaveURL(/\/login(?:\/)?$/);
  }

  async login(username, password) {
    await this.submit(username, password);
    await this.expectDashboard();
  }

  async expectInvalidCredentials() {
    const invalidMessage = this.invalidCredentialsMessage.or(this.notificationAlert);
    await expect(invalidMessage).toBeVisible({ timeout: 10000 });
    await expect(invalidMessage).toContainText(/invalid email or password|incorrect email or password/i);
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login(?:\/)?$/);
    await expect(this.email).toBeVisible();
    await expect(this.password).toBeVisible();
  }
}

module.exports = LoginPage;