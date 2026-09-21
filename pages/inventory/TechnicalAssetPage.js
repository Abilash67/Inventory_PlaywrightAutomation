const { expect } = require("@playwright/test");

class TechnicalAssetPage {
  constructor(page) {
    this.page = page;

    this.technicalTab = page.getByRole("tabpanel", {
      name: "Technical Assets",
    });

    this.assetTypeFilter = this.technicalTab.getByText("Select Asset Type", {
      exact: true,
    });

    this.statusFilter = this.technicalTab
      .getByText("Select Status", {
        exact: true,
      })
      .first();

    this.locationFilter = this.technicalTab.getByText("Select Location", {
      exact: true,
    });

    this.searchInput = this.technicalTab.getByPlaceholder(/Search Inventory/);

    this.assetTable = this.technicalTab.locator("table");

    this.previousButton = this.technicalTab.getByRole("button", {
      name: "Prev",
    });

    this.nextButton = this.technicalTab.getByRole("button", {
      name: "Next",
    });

    this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);

    this.addAssetToggle = this.technicalTab.getByRole("button", {
      name: /Add Asset/,
    });

    this.addAssetMenuItem = this.page.getByRole("button", {
      name: "Add Asset",
      exact: true,
    });

    this.bulkUploadMenuItem = this.page.getByRole("button", {
      name: "Bulk Upload Assets",
      exact: true,
    });

    this.pageButtons = this.technicalTab.getByRole("button", {
      name: /^\d+$/,
    });

    this.rowsPerPageSelect = this.technicalTab.locator("select").last();
  }

  async searchAsset(searchText) {
    await this.searchInput.fill(searchText);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async clickNextPage() {
    await this.nextButton.click();
  }

  async clickPreviousPage() {
    await this.previousButton.click();
  }

  async goToPage(pageNumber) {
    await this.technicalTab
      .getByRole("button", {
        name: String(pageNumber),
        exact: true,
      })
      .click();
  }

  async selectRowsPerPage(value) {
    await this.rowsPerPageSelect.selectOption(String(value));
  }

  async selectFilterOption(filter, option) {
    await filter.click();

    const checkbox = this.page.getByRole("checkbox", {
      name: option,
      exact: true,
    });

    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  selectedFilterValue(label) {
    return this.technicalTab
      .locator("strong")
      .filter({ hasText: label })
      .locator("..");
  }

  async filterByAssetType(assetType) {
    await this.selectFilterOption(this.assetTypeFilter, assetType);
  }

  async filterByStatus(status) {
    await this.selectFilterOption(this.statusFilter, status);
  }

  async filterByLocation(location) {
    await this.selectFilterOption(this.locationFilter, location);
  }

  async openAddAssetForm() {
    await this.addAssetToggle.click();
    await this.addAssetMenuItem.click();

    await expect(this.dialog()).toContainText("Add New Asset");
  }

  async openBulkUploadForm() {
    await this.addAssetToggle.click();
    await this.bulkUploadMenuItem.click();

    await expect(this.dialog()).toContainText("Bulk Upload Assets");
  }

  dialog() {
    return this.page.getByRole("dialog");
  }

  formSelect(index) {
    return this.dialog().locator("select").nth(index);
  }

  assetTypeSelect() {
    return this.formSelect(0);
  }

  locationSelect() {
    return this.formSelect(1);
  }

  statusSelect() {
    return this.formSelect(2);
  }

  async verifyAssetFormFields({ edit = false } = {}) {
    const expectedTitle = edit ? "Edit Asset" : "Add New Asset";

    await expect(this.dialog()).toContainText(expectedTitle);

    await expect(this.formSelect(0)).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Auto-generated"),
    ).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter Model Name"),
    ).toBeVisible();

    await expect(this.dialog().getByPlaceholder("Enter Storage")).toBeVisible();

    await expect(this.dialog().getByPlaceholder("Enter OS")).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter RAM size"),
    ).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter Processor Details"),
    ).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter Purchase Amount"),
    ).toBeVisible();

    await expect(this.dialog().locator('input[type="date"]')).toBeVisible();

    await expect(this.formSelect(1)).toBeVisible();
    await expect(this.formSelect(2)).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Additional notes about the asset"),
    ).toBeVisible();
  }

  saveButton() {
    return this.dialog().getByRole("button", {
      name: "Save",
      exact: true,
    });
  }

  addButton() {
    return this.dialog().getByRole("button", {
      name: "Add",
      exact: true,
    });
  }

  cancelButton() {
    return this.dialog().getByRole("button", {
      name: "Cancel",
      exact: true,
    });
  }

  modelInput() {
    return this.dialog().getByPlaceholder("Enter Model Name");
  }

  storageInput() {
    return this.dialog().getByPlaceholder("Enter Storage");
  }

  osInput() {
    return this.dialog().getByPlaceholder("Enter OS");
  }

  ramInput() {
    return this.dialog().getByPlaceholder("Enter RAM size");
  }

  processorInput() {
    return this.dialog().getByPlaceholder("Enter Processor Details");
  }

  purchaseAmountInput() {
    return this.dialog().getByPlaceholder("Enter Purchase Amount");
  }

  purchaseDateInput() {
    return this.dialog().locator('input[type="date"]');
  }

  assetCodeInput() {
    return this.dialog().getByPlaceholder("Auto-generated");
  }

  remarksInput() {
    return this.dialog().getByPlaceholder("Additional notes about the asset");
  }

  async fillValidAssetData({
    assetType,
    model,
    storage,
    os,
    ram,
    processor,
    purchaseAmount,
    purchaseDate,
    location,
    status,
    remarks,
  }) {
    await this.assetTypeSelect().selectOption({
      label: assetType,
    });

    await this.modelInput().fill(model);
    await this.storageInput().fill(storage);
    await this.osInput().fill(os);
    await this.ramInput().fill(ram);
    await this.processorInput().fill(processor);
    await this.purchaseAmountInput().fill(String(purchaseAmount));
    await this.purchaseDateInput().fill(purchaseDate);

    await this.locationSelect().selectOption({
      label: location,
    });

    await this.statusSelect().selectOption({
      label: status,
    });

    await this.remarksInput().fill(remarks);
  }

  async cancelDialog() {
    await this.cancelButton().click();
    await expect(this.dialog()).toBeHidden();
  }

  async clickSave() {
    await this.saveButton().click();
  }

  async clickAdd() {
    await this.addButton().click();
  }

  async clearRequiredEditField() {
    await this.modelInput().clear();
  }

  async clearRequiredAddFields() {
    await this.modelInput().clear();
  }

  async enterNegativePurchaseAmount() {
    await this.purchaseAmountInput().fill("-1");
  }

  async enterFuturePurchaseDate() {
    const futureDate = new Date();

    futureDate.setDate(futureDate.getDate() + 30);

    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");

    await this.purchaseDateInput().fill(`${year}-${month}-${day}`);
  }

  async enterAssetDataForCancel() {
    await this.modelInput().fill("Cancel Test Asset");
    await this.storageInput().fill("500GB");
  }

  async verifyDialogRemainsOpen() {
    await expect(this.dialog()).toBeVisible();
  }

  async verifyFieldInvalid(locator) {
    return locator.evaluate((element) => {
      return (
        element.matches(":invalid") ||
        element.getAttribute("aria-invalid") === "true"
      );
    });
  }

  async downloadBulkUploadTemplate() {
    const downloadLink = this.dialog().getByRole("link", {
      name: /Download Sample Template/,
    });

    await expect(downloadLink).toBeVisible();

    const href = await downloadLink.getAttribute("href");

    expect(href).toBe("/assets/addAssets.xlsx");

    return href;
  }

  async chooseBulkUploadFile(filePath) {
    await this.dialog().locator('input[type="file"]').setInputFiles(filePath);

    await expect(
      this.dialog().getByRole("button", {
        name: "Upload",
      }),
    ).toBeEnabled();
  }

  rows() {
    return this.assetTable.locator("tbody tr");
  }

  rowByAssetCode(assetCode) {
    return this.rows().filter({ hasText: assetCode }).first();
  }

  async viewAsset(assetCode) {
    await this.rowByAssetCode(assetCode)
      .getByRole("button", {
        name: "View",
      })
      .click();
  }

  async editAsset(assetCode) {
    await this.rowByAssetCode(assetCode)
      .getByRole("button", {
        name: "Edit",
      })
      .click();
  }

  async viewAssetHistory(assetCode) {
    await this.rowByAssetCode(assetCode)
      .getByRole("button", {
        name: "History",
      })
      .click();
  }

  async closeDialog() {
    await this.page
      .getByRole("dialog")
      .getByRole("button", {
        name: "Close",
      })
      .first()
      .click();
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
          name: new RegExp(header),
        }),
      ).toBeVisible();
    }

    await expect(this.rows().first()).toBeVisible();
  }

  async verifyAssetDetails(assetCode) {
    await expect(this.dialog()).toContainText("Asset Details");
    await expect(this.dialog()).toContainText(assetCode);

    for (const field of [
      "Asset Code",
      "Asset Type",
      "Environment",
      "Data Classification",
      "Model",
      "Storage",
      "Operating System",
      "RAM",
      "Processor",
      "Price",
      "Purchase Date",
      "Status",
      "Remarks",
      "Location",
    ]) {
      await expect(this.dialog()).toContainText(field);
    }
  }

  async verifyHistory() {
    await expect(this.dialog()).toContainText("Asset History");
    await expect(this.dialog().getByRole("list")).toBeVisible();
  }

  async verifyAssetRow(assetCode, expectedData) {
    const row = this.rowByAssetCode(assetCode);

    await expect(row).toBeVisible();

    for (const value of expectedData) {
      await expect(row).toContainText(String(value));
    }
  }
}

module.exports = { TechnicalAssetPage };
