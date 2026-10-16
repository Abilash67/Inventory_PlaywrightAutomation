const { expect } = require("@playwright/test");
const urls = require("../../constants/urls");

class UserManagementPage {
  constructor(page) {
    this.page = page;
    this.urls = urls;

    // ==========================================
    // Page elements
    // ==========================================

    this.pageTitle = page
      .getByText("User Management", {
        exact: true,
      })
      .first();

    this.searchInput = page.getByPlaceholder("Search Users...");

    // Department filter
    this.departmentDropdown = page
      .locator(".multiSelectToggle.form-select")
      .filter({
        hasText: "Select Department",
      })
      .first();

    // Location filter
    this.locationDropdown = page
      .locator(".multiSelectToggle.form-select")
      .filter({
        hasText: "Select Location",
      })
      .first();

    // User cards
    this.userCards = page.locator(".userCard:visible");

    // Card action buttons
    this.viewButtons = page.getByRole("button", {
      name: /View/i,
    });

    this.editButtons = page.getByRole("button", {
      name: /Edit/i,
    });

    this.assetsButtons = page.getByRole("button", {
      name: /Assets/i,
    });

    this.deleteButtons = page.getByRole("button", {
      name: /Delete/i,
    });
  }

  // ==========================================
  // Open User Management
  // ==========================================

  async goto() {
    await this.navigateWithRetry(this.urls.userManagement);

    await expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.searchInput).toBeVisible({
      timeout: 30000,
    });

    await this.waitForUserList();
  }

  // ==========================================
  // Navigate with one controlled retry
  // ==========================================

  async navigateWithRetry(url) {
    try {
      await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
    } catch {
      // Allow a transient QA application/network
      // issue to recover before retrying once.
      await this.page.waitForTimeout(1000);

      await this.page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
    }
  }

  // ==========================================
  // Wait for user list
  // ==========================================

  async waitForUserList() {
    const noResults = this.page.getByText(
      /No users found based on request|No records found\./i,
    );

    let previousCount = null;

    await expect
      .poll(
        async () => {
          const emptyState = await noResults.isVisible().catch(() => false);

          // A valid filter/search can return zero users.
          if (emptyState) {
            return "empty";
          }

          const userCount = await this.userCards.count();

          const stable = userCount === previousCount;

          previousCount = userCount;

          return stable ? `stable:${userCount}` : `changing:${userCount}`;
        },
        {
          timeout: 10000,
          intervals: [300, 500, 500, 1000],
        },
      )
      .toMatch(/^(empty|stable:\d+)$/);
  }

  // ==========================================
  // Search user
  // ==========================================

  async searchUser(value) {
    await this.searchInput.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await this.searchInput.fill(value);

    await this.waitForUserList();
  }

  // ==========================================
  // Clear search
  // ==========================================

  async clearSearch() {
    await this.searchInput.fill("");

    await this.waitForUserList();
  }

  // ==========================================
  // Get user count
  // ==========================================

  async getUserCount() {
    return await this.userCards.count();
  }

  // ==========================================
  // Get user card
  // ==========================================

  getUserCard(userName) {
    const name = this.page.getByRole("heading", {
      name: userName,
      exact: true,
    });

    return name.locator("xpath=ancestor::*[.//button][1]");
  }

  // ==========================================
  // Check whether user exists
  // ==========================================

  async userExists(userName) {
    return (await this.getUserCard(userName).count()) > 0;
  }

  // ==========================================
  // Get user details
  // ==========================================

  async getUserDetails(userName) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
      timeout: 10000,
    });

    return await card.innerText();
  }

  // ==========================================
  // Click card action
  // ==========================================

  async clickCardAction(userName, action) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await card
      .getByRole("button", {
        name: new RegExp(action, "i"),
      })
      .click();
  }

  // ==========================================
  // View user
  // ==========================================

  async viewUser(userName) {
    await this.clickCardAction(userName, "View");
  }

  // ==========================================
  // Edit user
  // ==========================================

  async editUser(userName) {
    await this.clickCardAction(userName, "Edit");
  }

  // ==========================================
  // View user assets
  // ==========================================

  async viewAssets(userName) {
    await this.clickCardAction(userName, "Assets");
  }

  // ==========================================
  // Delete user
  // ==========================================

  async deleteUser(userName) {
    await this.clickCardAction(userName, "Delete");
  }

  // ==========================================
  // Check card action
  // ==========================================

  async hasCardAction(userName, action) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
      timeout: 10000,
    });

    return (
      (await card
        .getByRole("button", {
          name: new RegExp(action, "i"),
        })
        .count()) > 0
    );
  }

  // ==========================================
  // Check View button
  // ==========================================

  async hasViewButton(userName) {
    return await this.hasCardAction(userName, "View");
  }

  // ==========================================
  // Check Edit button
  // ==========================================

  async hasEditButton(userName) {
    return await this.hasCardAction(userName, "Edit");
  }

  // ==========================================
  // Check Assets button
  // ==========================================

  async hasAssetsButton(userName) {
    return await this.hasCardAction(userName, "Assets");
  }

  // ==========================================
  // Check Delete button
  // ==========================================

  async hasDeleteButton(userName) {
    return await this.hasCardAction(userName, "Delete");
  }

  // ==========================================
  // Select filter
  // ==========================================

  async selectFilter(dropdown, value) {
    await expect(dropdown).toBeVisible({
      timeout: 10000,
    });

    // The dropdown is already verified as visible.
    // Avoid scrollIntoViewIfNeeded() because the custom
    // multiselect can re-render while filter results update.

    await dropdown.click({
      force: true,
      timeout: 10000,
    });

    const option = this.page
      .getByText(value, {
        exact: true,
      })
      .last();

    await expect(option).toBeVisible({
      timeout: 10000,
    });

    await option.click({
      timeout: 10000,
    });

    await this.waitForUserList();
  }

  // ==========================================
  // Select department
  // ==========================================

  async selectDepartment(department) {
    await this.selectFilter(this.departmentDropdown, department);
  }

  // ==========================================
  // Select location
  // ==========================================

  async selectLocation(location) {
    await this.selectFilter(this.locationDropdown, location);
  }

  // ==========================================
  // Clear location filter
  // ==========================================

  async clearLocation() {
    await this.page.reload({
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.pageTitle).toBeVisible({
      timeout: 30000,
    });

    await expect(this.searchInput).toBeVisible({
      timeout: 30000,
    });

    await this.waitForUserList();
  }

  // ==========================================
  // Reset search
  // ==========================================

  async resetSearch() {
    await this.clearSearch();
  }
}

module.exports = {
  UserManagementPage,
};
