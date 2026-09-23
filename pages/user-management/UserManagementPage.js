const { expect } = require("@playwright/test");
const urls = require("../../constants/urls");

class UserManagementPage {
  constructor(page) {
    this.page = page;
    this.urls = urls;

    this.pageTitle = page
      .getByText("User Management", {
        exact: true,
      })
      .first();

    this.searchInput = page.getByPlaceholder("🔍 Search Users...");

    this.departmentDropdown = page
      .getByText("Select Department", {
        exact: true,
      })
      .first();

    this.locationDropdown = page
      .getByText("Select Location", {
        exact: true,
      })
      .first();

    this.userCards = page.locator(".userCard:visible");

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

  async goto() {
    await this.page.goto(this.urls.userManagement, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.searchInput).toBeVisible({
      timeout: 30000,
    });

    await this.waitForUserList();
  }

  async waitForUserList() {
    const noResults = this.page.getByText(
      /No users found based on request|No records found\./i,
    );

    // Require the card count to be stable across two consecutive
    // reads (unless the empty state is showing). Right after a
    // search/filter change, the previous unfiltered cards are
    // still on screen until the app's debounced fetch resolves,
    // so a single "any card visible" read can pass on stale
    // results before filtering has actually taken effect.
    let previousCount = null;

    await expect
      .poll(
        async () => {
          const emptyState = await noResults.isVisible().catch(() => false);

          if (emptyState) {
            return true;
          }

          const userCount = await this.userCards.count();

          const stable = userCount > 0 && userCount === previousCount;

          previousCount = userCount;

          return stable;
        },
        {
          timeout: 10000,
          intervals: [300, 300, 500, 500],
        },
      )
      .toBe(true);
  }

  async searchUser(value) {
    await this.searchInput.waitFor({
      state: "visible",
    });

    await this.searchInput.fill(value);

    await this.waitForUserList();
  }

  async clearSearch() {
    await this.searchInput.fill("");

    await this.waitForUserList();
  }

  async getUserCount() {
    await this.waitForUserList();

    return await this.userCards.count();
  }

  getUserCard(userName) {
    const name = this.page.getByRole("heading", {
      name: userName,
      exact: true,
    });

    return name.locator("xpath=ancestor::*[.//button][1]");
  }

  async userExists(userName) {
    return (await this.getUserCard(userName).count()) > 0;
  }

  async getUserDetails(userName) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
    });

    return await card.innerText();
  }

  async clickCardAction(userName, action) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
    });

    await card
      .getByRole("button", {
        name: new RegExp(action, "i"),
      })
      .click();
  }

  async viewUser(userName) {
    await this.clickCardAction(userName, "View");
  }

  async editUser(userName) {
    await this.clickCardAction(userName, "Edit");
  }

  async viewAssets(userName) {
    await this.clickCardAction(userName, "Assets");
  }

  async deleteUser(userName) {
    await this.clickCardAction(userName, "Delete");
  }

  async hasCardAction(userName, action) {
    const card = this.getUserCard(userName);

    await card.waitFor({
      state: "visible",
    });

    return (
      (await card
        .getByRole("button", {
          name: new RegExp(action, "i"),
        })
        .count()) > 0
    );
  }

  async hasViewButton(userName) {
    return await this.hasCardAction(userName, "View");
  }

  async hasEditButton(userName) {
    return await this.hasCardAction(userName, "Edit");
  }

  async hasAssetsButton(userName) {
    return await this.hasCardAction(userName, "Assets");
  }

  async hasDeleteButton(userName) {
    return await this.hasCardAction(userName, "Delete");
  }

  async selectFilter(dropdown, value) {
    await dropdown.click();

    await this.page
      .getByText(value, {
        exact: true,
      })
      .last()
      .click();

    await this.waitForUserList();
  }

  async selectDepartment(department) {
    await this.selectFilter(this.departmentDropdown, department);
  }

  async selectLocation(location) {
    await this.selectFilter(this.locationDropdown, location);
  }

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

  async resetSearch() {
    await this.clearSearch();
  }
}

module.exports = {
  UserManagementPage,
};
