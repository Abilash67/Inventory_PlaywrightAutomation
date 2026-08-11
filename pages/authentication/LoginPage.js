const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.email = page.locator('input[type="email"]');

    this.password = page.locator('input[type="password"]');

    this.loginButton = page.getByRole("button", {
      name: /Login|Logging in/,
    });
  }

  async openApplication() {
    await this.page.goto(
      "https://inventoryqa.techversantinfotech.com/login"
    );
  }

  async login(username, password) {
    await this.email.fill(username);

    await this.password.fill(password);

    await this.loginButton.click();

    await expect(
      this.page.getByRole("link", {
        name: "Dashboard",
      })
    ).toBeVisible({
      timeout: 10000,
    });
  }
}

module.exports = LoginPage;