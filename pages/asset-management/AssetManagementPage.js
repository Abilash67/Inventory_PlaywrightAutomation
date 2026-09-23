const { expect } = require("@playwright/test");
const urls = require("../../constants/urls");

class AssetManagementPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByRole("heading", {
      name: "Asset Management",
      level: 5,
    });

    this.searchInput = page.getByPlaceholder("Search user by name");

    this.suggestionList = page.locator(".suggestionList");

    this.noUsersFoundMessage = page.getByText(
      "No users found based on request",
      {
        exact: true,
      },
    );

    this.floatingActionButton = page.locator("button.floatingAddBtn");

    this.selectedUserHeading = page.locator(".tabMainSection h4");

    this.currentlyAssignedTab = page.getByRole("tab", {
      name: "Currently Assigned",
    });

    this.previouslyAssignedTab = page.getByRole("tab", {
      name: "Previously Assigned",
    });
  }

  async goto() {
    await this.page.goto(urls.assetManagement, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(/\/assets(?:\/)?$/, {
      timeout: 30000,
    });

    await expect(this.pageTitle).toBeVisible({
      timeout: 30000,
    });

    await expect(this.searchInput).toBeVisible({
      timeout: 30000,
    });
  }

  // ============================================================
  // SEARCH
  // ============================================================

  suggestionItem(userName) {
    return this.suggestionList.locator(".suggestionItem").filter({
      hasText: userName,
    });
  }

  async searchUser(value) {
    await this.searchInput.waitFor({
      state: "visible",
    });

    await this.searchInput.fill(value);

    await this.waitForSuggestions();
  }

  async waitForSuggestions() {
    // Require the suggestion count to be stable across two
    // consecutive reads (unless "no users found" is showing).
    // Right after fill(), the previous suggestions (or none)
    // are still on screen until the app's debounced search
    // resolves, so a single read can report a stale result.
    let previousCount = null;

    await expect
      .poll(
        async () => {
          const noUsers = await this.noUsersFoundMessage
            .isVisible()
            .catch(() => false);

          if (noUsers) {
            return true;
          }

          const count = await this.suggestionList
            .locator(".suggestionItem")
            .count();

          const stable = count > 0 && count === previousCount;

          previousCount = count;

          return stable;
        },
        {
          timeout: 10000,
          intervals: [300, 300, 500, 500],
        },
      )
      .toBe(true);
  }

  async clearSearch() {
    await this.searchInput.fill("");

    // The suggestion list is only rendered while there's a
    // query; clearing the input removes it from the DOM rather
    // than leaving an empty container behind.
    await expect(this.suggestionList).toHaveCount(0);
  }

  async selectUser(userName) {
    await this.suggestionItem(userName).first().click();

    await expect(this.selectedUserHeading).toBeVisible({
      timeout: 10000,
    });
  }

  async openUser(userName) {
    await this.searchUser(userName);
    await this.selectUser(userName);
  }

  // ============================================================
  // ASSIGNED / HISTORY TABLES
  // ============================================================

  assignedPanel() {
    return this.page.getByRole("tabpanel", {
      name: "Currently Assigned",
    });
  }

  historyPanel() {
    return this.page.getByRole("tabpanel", {
      name: "Previously Assigned",
    });
  }

  async openAssignedTab() {
    await this.currentlyAssignedTab.click();

    await expect(this.assignedPanel()).toBeVisible();
  }

  async openHistoryTab() {
    await this.previouslyAssignedTab.click();

    await expect(this.historyPanel()).toBeVisible();
  }

  async getAssignedAssetCount() {
    // Right after a user is selected, the table can still be
    // fetching their assets, so a single read can catch it at
    // 0 rows before the data has actually loaded. Wait for the
    // row count to stabilize across two consecutive reads first.
    let previousCount = null;

    await expect
      .poll(
        async () => {
          const count = await this.assignedPanel()
            .locator("tbody tr")
            .count();

          const stable = count === previousCount;

          previousCount = count;

          return stable;
        },
        {
          timeout: 10000,
          intervals: [300, 300, 500, 500],
        },
      )
      .toBe(true);

    return await this.assignedPanel().locator("tbody tr").count();
  }

  unassignButtons() {
    return this.assignedPanel().getByRole("button", {
      name: "Unassign",
    });
  }

  // ============================================================
  // DIALOGS
  // ============================================================

  dialog() {
    return this.page.getByRole("dialog").last();
  }

  async openFloatingActionDialog() {
    await this.floatingActionButton.click();

    await expect(this.dialog()).toBeVisible();
  }

  async cancelDialog() {
    await this.dialog()
      .getByRole("button", {
        name: "Cancel",
        exact: true,
      })
      .click();
  }

  downloadTemplateLink() {
    return this.dialog().getByRole("link", {
      name: /Download Sample Template/i,
    });
  }

  async chooseBulkUploadFile(file) {
    await this.dialog().locator('input[type="file"]').setInputFiles(file);
  }

  bulkUploadSubmitButton() {
    return this.dialog().getByRole("button", {
      name: "Upload",
      exact: true,
    });
  }

  assignSubmitButton() {
    return this.dialog().getByRole("button", {
      name: "Assign",
      exact: true,
    });
  }

  categorySelectInput() {
    return this.dialog().locator("input[id^='react-select']");
  }
}

module.exports = AssetManagementPage;
