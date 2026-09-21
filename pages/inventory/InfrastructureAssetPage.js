const { expect } = require("@playwright/test");

class InfrastructureAssetPage {
  constructor(page) {
    this.page = page;

    this.infrastructureTab = page.getByRole("tabpanel", {
      name: "Infrastructure Assets",
    });

    this.assetTable = this.infrastructureTab.getByRole("table");

    this.addAssetButton = this.infrastructureTab.getByRole("button", {
      name: "+ Add Asset",
      exact: true,
    });

    this.pageIndicator = this.infrastructureTab.getByText(/Page \d+ of \d+/i);

    this.previousButton = this.infrastructureTab.getByRole("button", {
      name: "Prev",
      exact: true,
    });

    this.nextButton = this.infrastructureTab.getByRole("button", {
      name: "Next",
      exact: true,
    });
  }

  rows() {
    return this.assetTable.getByRole("rowgroup").nth(1).getByRole("row");
  }

  dialog() {
    return this.page.getByRole("dialog").last();
  }

  async verifyTable() {
    await expect(this.assetTable).toBeVisible();

    await expect(this.infrastructureTab.getByText(/Total Rows/i)).toBeVisible();
  }

  async selectRowsPerPage(value) {
    await this.infrastructureTab
      .getByRole("combobox")
      .first()
      .selectOption({
        label: `${value} Rows`,
      });
  }

  async viewFirstAsset() {
    const firstRow = this.rows().first();

    await expect(firstRow).toBeVisible();

    await firstRow
      .getByRole("button", {
        name: "View",
        exact: true,
      })
      .click();

    const dialog = this.dialog();

    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByText("Infrastructure Assets Details", {
        exact: true,
      }),
    ).toBeVisible();
  }

  async editFirstAsset() {
    const firstRow = this.rows().first();

    await expect(firstRow).toBeVisible();

    await firstRow
      .getByRole("button", {
        name: "Edit",
        exact: true,
      })
      .click();

    const dialog = this.dialog();

    await expect(dialog).toBeVisible();

    await expect(dialog.getByPlaceholder("Auto-generated")).toBeVisible();
  }

  async closeDialog() {
    const dialog = this.dialog();

    const closeButton = dialog
      .getByRole("button", {
        name: /close|cancel/i,
      })
      .first();

    await expect(closeButton).toBeVisible();

    await closeButton.click();

    await expect(dialog).toBeHidden();
  }

  async openAddAssetForm() {
    await this.addAssetButton.click();

    const addInfrastructureButton = this.page.getByRole("button", {
      name: "Add Infrastructure Assets",
      exact: true,
    });

    await expect(addInfrastructureButton).toBeVisible();

    await addInfrastructureButton.click();

    const dialog = this.dialog();

    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByText("Add Company Asset", {
        exact: true,
      }),
    ).toBeVisible();
  }

  async verifyViewDetails() {
    const dialog = this.dialog();

    await expect(dialog).toBeVisible();

    await expect(
      dialog.getByText("Infrastructure Assets Details", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(dialog).toContainText("Asset Code");
    await expect(dialog).toContainText("Asset Type");
    await expect(dialog).toContainText("Location");
    await expect(dialog).toContainText("Status");

    const closeButtons = dialog.getByRole("button", {
      name: "Close",
      exact: true,
    });

    await expect(closeButtons.first()).toBeVisible();
    await expect(closeButtons.last()).toBeVisible();
  }

  async verifyAssetDetails() {
    const dialog = this.dialog();

    await expect(dialog.getByPlaceholder("Auto-generated")).toBeVisible();

    await expect(dialog.getByPlaceholder("Enter model")).toBeVisible();

    await expect(dialog.getByPlaceholder("Enter processor")).toBeVisible();

    await expect(dialog.getByPlaceholder("Example: 16 GB")).toBeVisible();

    await expect(dialog.getByPlaceholder("Example: 512 GB SSD")).toBeVisible();

    await expect(
      dialog.getByPlaceholder("Example: Windows 11 Pro"),
    ).toBeVisible();

    await expect(dialog.getByPlaceholder("Enter remarks")).toBeVisible();
  }

  async verifyAssetForm({ edit = false } = {}) {
    const dialog = this.dialog();

    await expect(dialog).toBeVisible();

    await this.verifyAssetDetails();

    let buttonName;

    if (edit) {
      buttonName = "Update";
    } else {
      buttonName = "Create";
    }

    await expect(
      dialog.getByRole("button", {
        name: buttonName,
        exact: true,
      }),
    ).toBeVisible();
  }

  async fillInfrastructureAsset({
    assetType,
    location,
    status,
    purchaseAmount,
    purchaseDate,
    model,
    processor,
    ram,
    storage,
    operatingSystem,
    remarks,
  }) {
    const form = this.dialog();

    if (assetType !== undefined) {
      await form.locator("select").nth(0).selectOption({
        label: assetType,
      });
    }

    if (location !== undefined) {
      await form.locator("select").nth(1).selectOption({
        label: location,
      });
    }

    if (status !== undefined) {
      await form.locator("select").nth(2).selectOption({
        label: status,
      });
    }

    if (purchaseAmount !== undefined) {
      await form
        .getByPlaceholder("Enter purchase amount")
        .fill(String(purchaseAmount));
    }

    if (purchaseDate !== undefined) {
      await form.locator('input[type="date"]').fill(purchaseDate);
    }

    if (model !== undefined) {
      await form.getByPlaceholder("Enter model").fill(model);
    }

    if (processor !== undefined) {
      await form.getByPlaceholder("Enter processor").fill(processor);
    }

    if (ram !== undefined) {
      await form.getByPlaceholder("Example: 16 GB").fill(ram);
    }

    if (storage !== undefined) {
      await form.getByPlaceholder("Example: 512 GB SSD").fill(storage);
    }

    if (operatingSystem !== undefined) {
      await form
        .getByPlaceholder("Example: Windows 11 Pro")
        .fill(operatingSystem);
    }

    if (remarks !== undefined) {
      await form.getByPlaceholder("Enter remarks").fill(remarks);
    }
  }

  async getGeneratedAssetCode() {
    const assetCodeField = this.dialog().getByPlaceholder("Auto-generated");

    await expect(assetCodeField).toBeVisible();

    await expect
      .poll(async () => assetCodeField.inputValue(), {
        timeout: 5000,
      })
      .not.toBe("");

    return assetCodeField.inputValue();
  }

  async addInfrastructureAsset() {
    const dialog = this.dialog();

    await dialog
      .getByRole("button", {
        name: "Create",
        exact: true,
      })
      .click();
  }

  async updateInfrastructureAsset() {
    const dialog = this.dialog();

    await dialog
      .getByRole("button", {
        name: "Update",
        exact: true,
      })
      .click();
  }

  async verifyAssetInTable(assetCode, expectedValues = []) {
    const row = this.rows().filter({
      hasText: assetCode,
    });

    await expect(row).toHaveCount(1);

    await expect(row).toBeVisible();

    for (const value of expectedValues) {
      await expect(row).toContainText(value);
    }
  }

  async verifyAssetByValues(expectedValues = []) {
    const rows = this.rows();

    await expect(rows).not.toHaveCount(0);

    for (const value of expectedValues) {
      await expect(
        rows
          .filter({
            hasText: value,
          })
          .first(),
      ).toBeVisible();
    }
  }
}

module.exports = {
  InfrastructureAssetPage,
};
