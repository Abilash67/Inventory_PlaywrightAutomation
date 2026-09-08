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

    // Dashboard values and links
    this.assetsCount = page.locator("xpath=//div[@class='assetName']");
    this.viewAssets = page.locator(
      "xpath=//div[contains(text(),'View your Assets')]",
    );
    this.requestsCount = page.locator("xpath=//div[@class='requestItem']");
    this.viewRequests = page.locator(
      "xpath=//div[contains(text(),'View your Requests')]",
    );
    this.notifications = page.locator("xpath=//div[3]//div[1]//div[2]");

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
    this.logoutButton = page.locator(
      "button.logoutButton.px-3.w-100.text-start",
    );

    this.logoutConfirmationModal = page.locator(
      "div.alertModalBody.modal-body",
    );
    this.logoutDialog = page.getByRole("dialog");
    this.logoutConfirmation = this.logoutConfirmationModal.getByText(
      /are you sure you want to logout/i,
    );

    this.confirmLogoutButton = this.logoutDialog.getByRole("button", {
      name: "Confirm",
    });
    this.cancelLogoutButton = this.logoutDialog.getByRole("button", {
      name: "Cancel",
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

  async verifyRequestCount() {
    await expect(this.requestsCount).toBeVisible({
      timeout: 5000,
    });
  }

  async verifyViewAssetLink() {
    await expect(this.viewAssets).toBeVisible({
      timeout: 5000,
    });
  }

  async verifyViewRequestLink() {
    await expect(this.viewRequests).toBeVisible({
      timeout: 5000,
    });
  }

  async verifyNotifications() {
    await expect(this.notifications).toBeVisible({
      timeout: 5000,
    });
  }

  async clickViewAssets() {
    await expect(this.viewAssets).toBeVisible({
      timeout: 5000,
    });

    await this.viewAssets.click();

    await expect(this.page).toHaveURL(/\/profile/, {
      timeout: 10000,
    });
  }

  async openViewRequests() {
    await expect(this.viewRequests).toBeVisible({
      timeout: 5000,
    });

    await this.viewRequests.click();

    await expect(this.page).toHaveURL(/\/support(?:\/)?$/, {
      timeout: 10000,
    });
    return this.page;
  }

  async clickViewRequests() {
    await this.openViewRequests();
  }

  async openLogoutConfirmation() {
    await expect(this.profileMenu).toBeVisible({
      timeout: 10000,
    });

    await this.profileMenu.click();

    await expect(this.logoutButton).toBeVisible({
      timeout: 5000,
    });

    await this.logoutButton.click();

    await expect(this.logoutConfirmationModal).toBeVisible({
      timeout: 5000,
    });
    await expect(this.logoutConfirmation).toBeVisible({
      timeout: 5000,
    });
  }

  async cancelLogout() {
    await this.openLogoutConfirmation();
    await this.cancelLogoutButton.click();
    await expect(this.logoutConfirmationModal).toBeHidden();
    await this.verifyDashboardLoaded();
  }

  async logout() {
    await this.openLogoutConfirmation();

    await this.confirmLogoutButton.click();

    await expect(this.page).toHaveURL(/\/login/, {
      timeout: 10000,
    });
    await this.clearClientSession();
  }

  async clearClientSession() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await this.page.context().clearCookies();
  }
}

module.exports = DashboardPage;
