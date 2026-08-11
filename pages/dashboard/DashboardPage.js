const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.dashboardMenu = page.getByRole("link", {
      name: "Dashboard",
    });

    // Dashboard Cards
    this.assetsTitle = page.getByRole("heading", {
      name: "Your Assets",
    });

    this.requestTitle = page.getByRole("heading", {
      name: "Your Requests",
    });

    this.notificationTitle = page.getByRole("heading", {
      name: "Notifications",
    });

    // Asset Count
    this.assetsCount = page.getByText("5", {
      exact: true,
    });

    // View Assets
    this.viewAssets = page.locator("div.widgetLink");

    // User Details
    this.userName = page.getByText("Super Admin", {
      exact: true,
    });

    this.employeeId = page.getByText("EMP0001", {
      exact: true,
    });

    // Profile Menu
    this.profileMenu = page.getByRole("button").filter({
      has: page.locator("img[alt='profile']"),
    });

    // Logout
    this.logoutButton = page.getByText("Logout", {
      exact: true,
    });

    // Logout Confirmation
    this.logoutConfirmation = page.getByText(
      "Are you sure you want to logout?",
      {
        exact: true,
      },
    );

    this.confirmLogoutButton = page.getByRole("button", {
      name: "Confirm",
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.dashboardMenu).toBeVisible();
  }

  async verifyUser() {
    await expect(this.userName).toBeVisible();
    await expect(this.employeeId).toBeVisible();
  }

  async verifyCards() {
    await expect(this.assetsTitle).toBeVisible();
    await expect(this.requestTitle).toBeVisible();
    await expect(this.notificationTitle).toBeVisible();
  }

  async verifyAssetCount() {
    await expect(this.assetsCount).toBeVisible({
      timeout: 5000,
    });
  }

  async verifyViewAssetLink() {
    await expect(this.viewAssets).toBeVisible();
  }

  async clickViewAssets() {
    await expect(this.viewAssets).toBeVisible();

    await this.viewAssets.click();

    await expect(this.page).toHaveURL(/\/profile/, {
      timeout: 10000,
    });
  }

  async logout() {
    await expect(this.profileMenu).toBeVisible({
      timeout: 10000,
    });

    await this.profileMenu.click();

    await expect(this.logoutButton).toBeVisible({
      timeout: 5000,
    });

    await this.logoutButton.click();

    await expect(this.logoutConfirmation).toBeVisible({
      timeout: 5000,
    });

    await this.confirmLogoutButton.click();

    // Actual application behavior: logout redirects to /login
    await expect(this.page).toHaveURL(/\/login/, {
      timeout: 10000,
    });
  }
}

module.exports = DashboardPage;
