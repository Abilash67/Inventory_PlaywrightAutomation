const { expect } = require("@playwright/test");

const escapeRegExp = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

class TechnicalAssetPage {
  constructor(page) {
    this.page = page;

    this.inventoryLink = page.getByRole("link", {
      name: "Inventory",
      exact: true,
    });

    this.technicalTab = page.getByRole("tabpanel", {
      name: "Technical Assets",
    });

    // Filters
    this.filterComboboxes = this.technicalTab.getByRole("combobox");

    this.assetTypeFilter = this.filterComboboxes.nth(0);
    this.statusFilter = this.filterComboboxes.nth(1);
    this.locationFilter = this.filterComboboxes.nth(2);
    this.rowsPerPage = this.filterComboboxes.last();

    // Search
    this.searchInput = this.technicalTab.getByPlaceholder("Search Inventory");

    this.resetSearchButton = this.technicalTab
      .getByRole("button", { name: /reset|clear/i })
      .first();

    this.noRecordsMessage = this.technicalTab.getByText("No records found.", {
      exact: true,
    });

    // Table and pagination
    this.assetTable = this.technicalTab.getByRole("table");
    this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);

    this.previousButton = this.technicalTab
      .getByRole("button", { name: /previous|prev/i })
      .first();

    this.nextButton = this.technicalTab
      .getByRole("button", { name: /next/i })
      .first();

    // Asset actions
    this.addAssetButton = this.technicalTab
      .getByRole("button", {
        name: /add\s+(new\s+)?(technical\s+)?asset/i,
      })
      .first();

    this.addAssetDialog = page
      .getByRole("dialog")
      .filter({ hasText: /add new asset/i })
      .first();
  }

  // ---------- Helpers ----------

  async selectFromCombobox(combobox, value) {
    await expect(combobox).toBeVisible();
    await expect(combobox).toBeEnabled();

    const tagName = await combobox.evaluate((element) =>
      element.tagName.toLowerCase(),
    );

    const text = String(value);

    if (tagName === "select") {
      try {
        await combobox.selectOption(text, { timeout: 3000 });
      } catch {
        await combobox.selectOption({ label: text }, { timeout: 3000 });
      }

      return;
    }

    await combobox.click();

    const exactOption = this.page.getByRole("option", {
      name: new RegExp(String.raw`^\s*${escapeRegExp(text)}\s*$`, "i"),
    });

    await expect(exactOption).toBeVisible();
    await exactOption.click();
  }

  rows() {
    return this.assetTable.locator("tbody tr");
  }

  async waitForTableState({ allowEmpty = false } = {}) {
    await expect(this.assetTable).toBeVisible();

    await expect
      .poll(
        async () => {
          if ((await this.rows().count()) > 0) {
            return "rows";
          }

          if (
            allowEmpty &&
            (await this.noRecordsMessage.isVisible().catch(() => false))
          ) {
            return "empty";
          }

          return "loading";
        },
        {
          timeout: 20000,
          intervals: [200, 500, 1000],
          message: "Technical Assets table did not reach the expected state",
        },
      )
      .not.toBe("loading");

    if ((await this.rows().count()) > 0) {
      await expect(this.pageIndicator).toBeVisible();
    }
  }

  async waitForTableRows() {
    await this.waitForTableState();
  }

  async waitForSearchResult(assetCode) {
    const matchingRow = this.rowByAssetCode(assetCode);

    await expect
      .poll(
        async () => {
          if (await matchingRow.isVisible().catch(() => false)) {
            return "match";
          }

          if (await this.noRecordsMessage.isVisible().catch(() => false)) {
            return "empty";
          }

          return "loading";
        },
        {
          timeout: 30000,
          intervals: [300, 500, 750, 1000, 1500],
          message: `Search did not complete for asset "${assetCode}"`,
        },
      )
      .not.toBe("loading");
  }

  // ---------- Navigation ----------

  async open() {
    await this.page.goto("/inventory");

    await expect(this.technicalTab).toBeVisible();
    await expect(this.assetTable).toBeVisible();

    await this.waitForTableRows();
  }

  // ---------- Table ----------

  rowByAssetCode(assetCode) {
    const code = String(assetCode).trim();

    return this.rows().filter({
      has: this.page.getByRole("cell", {
        name: code,
        exact: true,
      }),
    });
  }

  async verifyTechnicalAssetTable() {
    await expect(this.technicalTab).toBeVisible();
    await expect(this.assetTable).toBeVisible();

    const headers = [
      "Asset Code",
      "Asset Type",
      "Location",
      "Status",
      "Actions",
    ];

    await Promise.all(
      headers.map((header) =>
        expect(
          this.assetTable.getByRole("columnheader", {
            name: new RegExp(escapeRegExp(header), "i"),
          }),
        ).toBeVisible(),
      ),
    );

    await this.waitForTableRows();
    await expect(this.pageIndicator).toBeVisible();
  }

  async verifyAssetRow(assetCode, expectedValues = []) {
    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    await Promise.all(
      expectedValues.map((value) => expect(row).toContainText(value)),
    );
  }

  // ---------- Filters ----------

  async filterByAssetType(value) {
    await this.selectFromCombobox(this.assetTypeFilter, value);
    await this.waitForTableState({ allowEmpty: true });
  }

  async filterByStatus(value) {
    await this.selectFromCombobox(this.statusFilter, value);
    await this.waitForTableState({ allowEmpty: true });
  }

  async filterByLocation(value) {
    await this.selectFromCombobox(this.locationFilter, value);
    await this.waitForTableState({ allowEmpty: true });
  }

  // ---------- Search ----------

  async searchAsset(assetCode) {
    const searchValue = String(assetCode);

    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeEnabled();

    await this.searchInput.fill(searchValue);
    await expect(this.searchInput).toHaveValue(searchValue);

    await this.waitForSearchResult(searchValue);

    const matchingRow = this.rowByAssetCode(searchValue);

    if (await matchingRow.isVisible().catch(() => false)) {
      await Promise.all(
        ["View", "Edit", "History"].map((actionName) =>
          expect(
            matchingRow.getByRole("button", {
              name: actionName,
              exact: true,
            }),
          ).toBeVisible(),
        ),
      );

      return;
    }

    await expect(this.noRecordsMessage).toBeVisible();
  }

  async clearSearch() {
    await expect(this.searchInput).toBeVisible();

    const currentValue = await this.searchInput.inputValue();

    if (currentValue !== "") {
      await expect(this.resetSearchButton).toBeVisible();
      await expect(this.resetSearchButton).toBeEnabled();

      await this.resetSearchButton.click();
    } else {
      await this.searchInput.fill("");
    }

    await expect(this.searchInput).toHaveValue("");

    await expect(this.noRecordsMessage).toBeHidden({
      timeout: 30000,
    });

    await this.waitForTableRows();

    await expect(this.pageIndicator).toContainText("Page 1");
    await expect(this.rows().first()).toBeVisible();
  }

  // ---------- Row actions ----------

  async clickRowAction(assetCode, actionName) {
    await this.searchAsset(assetCode);

    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    const button = row.getByRole("button", {
      name: actionName,
      exact: true,
    });

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await button.click();
  }

  async viewAsset(assetCode) {
    await this.clickRowAction(assetCode, "View");
  }

  async editAsset(assetCode) {
    await this.clickRowAction(assetCode, "Edit");
  }

  async viewAssetHistory(assetCode) {
    await this.clickRowAction(assetCode, "History");
  }

  // ---------- Add asset ----------

  async openAddAssetDialog() {
    await expect(this.addAssetButton).toBeVisible();
    await expect(this.addAssetButton).toBeEnabled();

    await this.addAssetButton.click();

    await expect(this.addAssetDialog).toBeVisible();
  }

  // ---------- Pagination ----------

  async goToNextPage() {
    await expect(this.nextButton).toBeVisible();
    await expect(this.nextButton).toBeEnabled();

    const previousPage = (await this.pageIndicator.innerText()).trim();

    await this.nextButton.click();

    await expect(this.pageIndicator).not.toHaveText(previousPage);

    await this.waitForTableRows();
  }

  async goToPreviousPage() {
    await expect(this.previousButton).toBeVisible();
    await expect(this.previousButton).toBeEnabled();

    const previousPage = (await this.pageIndicator.innerText()).trim();

    await this.previousButton.click();

    await expect(this.pageIndicator).not.toHaveText(previousPage);

    await this.waitForTableRows();
  }

  async selectRowsPerPage(value) {
    await this.selectFromCombobox(this.rowsPerPage, value);

    await this.waitForTableState({ allowEmpty: true });
  }
}

module.exports = { TechnicalAssetPage };
