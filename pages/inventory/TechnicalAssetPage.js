const { expect } = require("@playwright/test");

class TechnicalAssetPage {
  constructor(page) {
    this.page = page;

    // Technical Assets tab
    this.technicalTab = page.getByRole("tabpanel", {
      name: "Technical Assets",
    });

    // Table
    this.assetTable = this.technicalTab.getByRole("table");

    // Search
    this.searchInput = this.technicalTab.getByPlaceholder(/Search Inventory/i);

    this.resetSearchButton = this.technicalTab.getByRole("button", {
      name: "Reset",
      exact: true,
    });

    // Add Asset
    this.addButton = this.technicalTab.getByRole("button", {
      name: "+ Add Asset",
      exact: true,
    });

    // Pagination
    this.rowsPerPageSelect = this.technicalTab.getByRole("combobox").first();

    this.previousButton = this.technicalTab.getByRole("button", {
      name: "Prev",
      exact: true,
    });

    this.nextButton = this.technicalTab.getByRole("button", {
      name: "Next",
      exact: true,
    });

    this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);
  }

  // ============================================================
  // TABLE
  // ============================================================

  rows() {
    return this.assetTable.locator("tbody tr");
  }

  rowByAssetCode(assetCode) {
    return this.rows().filter({ hasText: assetCode }).first();
  }

  async verifyTechnicalAssetTable() {
    await expect(this.technicalTab).toBeVisible();
    await expect(this.assetTable).toBeVisible();

    for (const header of [
      "Asset Code",
      "Asset Type",
      "Location",
      "Status",
      "Actions",
    ]) {
      await expect(
        this.assetTable.getByRole("columnheader", {
          name: new RegExp(header, "i"),
        }),
      ).toBeVisible();
    }

    await expect(this.rows().first()).toBeVisible();
  }

  async verifyAssetRow(assetCode, expectedValues = []) {
    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    for (const value of expectedValues) {
      await expect(row).toContainText(value);
    }
  }

  // ============================================================
  // SEARCH
  // ============================================================

  async searchAsset(assetCode) {
    await this.searchInput.fill(assetCode);

    await expect
      .poll(
        async () => {
          const matchingRow = await this.rowByAssetCode(assetCode).count();

          const noRecords = await this.technicalTab
            .getByText("No records found.", {
              exact: true,
            })
            .count();

          return matchingRow > 0 || noRecords > 0;
        },
        {
          timeout: 10000,
          intervals: [200, 500, 1000],
        },
      )
      .toBe(true);
  }

  async clearSearch() {
    if (await this.resetSearchButton.isVisible().catch(() => false)) {
      await this.resetSearchButton.click();
    } else {
      await this.searchInput.fill("");
    }

    await expect(this.searchInput).toHaveValue("");
  }

  // ============================================================
  // VIEW / EDIT / HISTORY
  // ============================================================

  async viewAsset(assetCode) {
    await this.searchAsset(assetCode);

    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "View",
        exact: true,
      })
      .click();
  }

  async editAsset(assetCode) {
    await this.searchAsset(assetCode);

    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "Edit",
        exact: true,
      })
      .click();
  }

  async viewAssetHistory(assetCode) {
    await this.searchAsset(assetCode);

    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "History",
        exact: true,
      })
      .click();
  }

  // ============================================================
  // PAGINATION
  // ============================================================

  async clickNextPage() {
    await this.nextButton.click();
  }

  async clickPreviousPage() {
    await this.previousButton.click();
  }

  async selectRowsPerPage(value) {
    await this.rowsPerPageSelect.selectOption(String(value));
  }

  // ============================================================
  // FILTERS
  // ============================================================

  async selectFilterOption(filter, option) {
    await filter.click();

    const container = filter.locator("..");

    const checkbox = container.getByRole("checkbox", {
      name: option,
      exact: true,
    });

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  }

  async filterByAssetType(value) {
    const filter = this.technicalTab.getByText("Select Asset Type", {
      exact: true,
    });

    await this.selectFilterOption(filter, value);
  }

  async filterByStatus(value) {
    const filter = this.technicalTab.getByText("Select Status", {
      exact: true,
    });

    await this.selectFilterOption(filter, value);
  }

  async filterByLocation(value) {
    const filter = this.technicalTab.getByText("Select Location", {
      exact: true,
    });

    await this.selectFilterOption(filter, value);
  }

  /**
   * Returns the parent element containing both:
   *
   * Selected Asset Type:
   * Desktop
   *
   * This avoids selecting only the <strong> label.
   */
  selectedFilterValue(label) {
    return this.technicalTab
      .getByText(label, {
        exact: true,
      })
      .locator("..");
  }

  // ============================================================
  // ADD ASSET / BULK UPLOAD
  // ============================================================

  async openAddAssetForm() {
    await this.addButton.click();

    await this.page
      .getByRole("button", {
        name: "Add Asset",
        exact: true,
      })
      .click();

    await expect(this.dialog()).toBeVisible();
  }

  async openBulkUploadForm() {
    await this.addButton.click();

    await this.page
      .getByRole("button", {
        name: "Bulk Upload Assets",
        exact: true,
      })
      .click();

    await expect(this.dialog()).toBeVisible();
  }

  // ============================================================
  // DIALOG
  // ============================================================

  dialog() {
    return this.page.getByRole("dialog").last();
  }

  cancelButton() {
    return this.dialog().getByRole("button", {
      name: "Cancel",
      exact: true,
    });
  }

  saveButton() {
    return this.dialog().getByRole("button", {
      name: "Save",
      exact: true,
    });
  }

  addSubmitButton() {
    return this.dialog().getByRole("button", {
      name: "Add",
      exact: true,
    });
  }

  // ============================================================
  // FORM LOCATORS
  // ============================================================

  assetTypeInput() {
    return this.dialog().getByRole("combobox").nth(0);
  }

  locationInput() {
    return this.dialog().getByRole("combobox").nth(1);
  }

  statusInput() {
    return this.dialog().getByRole("combobox").nth(2);
  }

  assetCodeInput() {
    return this.dialog().getByPlaceholder("Auto-generated", {
      exact: true,
    });
  }

  modelInput() {
    return this.dialog().getByPlaceholder("Enter Model Name", {
      exact: true,
    });
  }

  storageInput() {
    return this.dialog().getByPlaceholder("Enter Storage", {
      exact: true,
    });
  }

  osInput() {
    return this.dialog().getByPlaceholder("Enter OS", {
      exact: true,
    });
  }

  ramInput() {
    return this.dialog().getByPlaceholder("Enter RAM size", {
      exact: true,
    });
  }

  processorInput() {
    return this.dialog().getByPlaceholder("Enter Processor Details", {
      exact: true,
    });
  }

  purchaseAmountInput() {
    return this.dialog().getByPlaceholder("Enter Purchase Amount", {
      exact: true,
    });
  }

  purchaseDateInput() {
    return this.dialog().locator('input[type="date"]').first();
  }

  remarksInput() {
    return this.dialog().getByPlaceholder("Additional notes about the asset", {
      exact: true,
    });
  }

  formSelect(index) {
    return this.dialog().getByRole("combobox").nth(index);
  }

  // ============================================================
  // FORM DATA
  // ============================================================

  async fillValidAssetData(data) {
    await this.assetTypeInput().selectOption({
      label: data.assetType,
    });

    await this.modelInput().fill(data.model);

    await this.storageInput().fill(data.storage);

    await this.osInput().fill(data.os);

    await this.ramInput().fill(data.ram);

    await this.processorInput().fill(data.processor);

    await this.purchaseAmountInput().fill(data.purchaseAmount);

    await this.purchaseDateInput().fill(data.purchaseDate);

    await this.locationInput().selectOption({
      label: data.location,
    });

    await this.statusInput().selectOption({
      label: data.status,
    });

    await this.remarksInput().fill(data.remarks);
  }

  // ============================================================
  // FORM VALIDATION
  // ============================================================

  async verifyAssetFormFields({ edit = false } = {}) {
    await expect(this.dialog()).toContainText(
      edit ? "Edit Asset" : "Add New Asset",
    );

    await expect(this.assetTypeInput()).toBeVisible();

    await expect(this.locationInput()).toBeVisible();

    await expect(this.statusInput()).toBeVisible();

    await expect(this.assetCodeInput()).toBeVisible();

    await expect(this.modelInput()).toBeVisible();

    await expect(this.storageInput()).toBeVisible();

    await expect(this.osInput()).toBeVisible();

    await expect(this.ramInput()).toBeVisible();

    await expect(this.processorInput()).toBeVisible();

    await expect(this.purchaseAmountInput()).toBeVisible();

    await expect(this.purchaseDateInput()).toBeVisible();

    await expect(this.remarksInput()).toBeVisible();

    await expect(
      edit ? this.saveButton() : this.addSubmitButton(),
    ).toBeVisible();

    await expect(this.cancelButton()).toBeVisible();
  }

  // ============================================================
  // ADD / SAVE / CANCEL
  // ============================================================

  async clickAdd() {
    await this.addSubmitButton().click();
  }

  async clickSave() {
    await this.saveButton().click();
  }

  async cancelDialog() {
    await this.cancelButton().click();
  }

  async closeDialog() {
    await this.dialog()
      .getByRole("button", {
        name: "Close",
        exact: true,
      })
      .last()
      .click();
  }

  async verifyDialogRemainsOpen() {
    await expect(this.dialog()).toBeVisible();
  }

  // ============================================================
  // REQUIRED FIELD VALIDATION
  // ============================================================

  async clearRequiredAddFields() {
    await this.modelInput().fill("");
  }

  async clearRequiredEditField() {
    await this.modelInput().fill("");
  }

  // ============================================================
  // NEGATIVE PURCHASE AMOUNT
  // ============================================================

  async enterNegativePurchaseAmount() {
    await this.purchaseAmountInput().fill("-100");
  }

  // ============================================================
  // FUTURE PURCHASE DATE
  // ============================================================

  async enterFuturePurchaseDate() {
    const futureDate = new Date();

    futureDate.setDate(futureDate.getDate() + 1);

    const formattedDate = futureDate.toISOString().split("T")[0];

    await this.purchaseDateInput().fill(formattedDate);
  }

  // ============================================================
  // DATA FOR CANCEL TEST
  // ============================================================

  async enterAssetDataForCancel() {
    await this.modelInput().fill("Cancel Test Model");

    await this.storageInput().fill("512 GB");

    await this.osInput().fill("Windows 11");

    await this.ramInput().fill("16 GB");

    await this.processorInput().fill("Intel i7");

    await this.purchaseAmountInput().fill("50000");

    const purchaseDate = new Date();

    purchaseDate.setDate(purchaseDate.getDate() - 1);

    const formattedDate = purchaseDate.toISOString().split("T")[0];

    await this.purchaseDateInput().fill(formattedDate);

    await this.remarksInput().fill("Cancel asset test");
  }

  // ============================================================
  // ASSET DETAILS
  // ============================================================

  async verifyAssetDetails(assetCode) {
    await expect(this.dialog()).toBeVisible();

    await expect(this.dialog()).toContainText(assetCode);
  }

  // ============================================================
  // HISTORY
  // ============================================================

  async verifyHistory() {
    await expect(this.dialog()).toBeVisible();

    await expect(this.dialog()).toContainText("Asset added to inventory");
  }

  // ============================================================
  // BULK UPLOAD
  // ============================================================

  async downloadBulkUploadTemplate() {
    const downloadPromise = this.page.waitForEvent("download");

    const downloadButton = this.dialog().getByRole("button", {
      name: /Download.*Template/i,
    });

    await expect(downloadButton).toBeVisible();

    await downloadButton.click();

    return downloadPromise;
  }

  async chooseBulkUploadFile(filePath) {
    await this.dialog().locator('input[type="file"]').setInputFiles(filePath);
  }
}

module.exports = TechnicalAssetPage;
