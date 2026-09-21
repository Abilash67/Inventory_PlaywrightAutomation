const { expect } = require("@playwright/test");

class SoftwareLicensePage {
  constructor(page) {
    this.page = page;

    this.licenseTab = page.getByRole("tabpanel", {
      name: "Software Licenses",
    });

    this.softwareFilter = this.licenseTab.getByText("Select Software", {
      exact: true,
    });

    this.statusFilter = this.licenseTab.getByText("Select Status", {
      exact: true,
    });

    this.searchInput = this.licenseTab.getByPlaceholder(/Search Software/);

    this.licenseTable = this.licenseTab.locator("table");

    this.rowsPerPage = this.licenseTab.locator("select").first();

    this.previousButton = this.licenseTab.getByRole("button", {
      name: "Prev",
    });

    this.nextButton = this.licenseTab.getByRole("button", {
      name: "Next",
    });

    this.pageIndicator = this.licenseTab.getByText(/Page \d+ of \d+/);

    this.addLicenseToggle = this.licenseTab.getByRole("button", {
      name: "+ Add Asset",
      exact: true,
    });
  }

  rows() {
    return this.licenseTable.locator("tbody tr");
  }

  dialog() {
    return this.page.getByRole("dialog");
  }

  form() {
    return this.dialog();
  }

  async verifyTable() {
    await expect(this.licenseTab).toBeVisible();
    await expect(this.licenseTable).toBeVisible();

    for (const header of [
      "Software Name",
      "Software Code",
      "Expiration Date",
      "Actions",
    ]) {
      await expect(
        this.licenseTable.getByRole("columnheader", {
          name: new RegExp(header),
        }),
      ).toBeVisible();
    }

    await expect(this.rows().first()).toBeVisible();
  }

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

  async search(text) {
    await this.searchInput.fill(text);
  }

  async selectRowsPerPage(value) {
    await this.rowsPerPage.selectOption(String(value));
  }

  async viewFirstLicense() {
    await this.rows()
      .first()
      .getByRole("button", {
        name: "View",
      })
      .click();
  }

  async editFirstLicense() {
    await this.rows()
      .first()
      .getByRole("button", {
        name: "Edit",
      })
      .click();
  }

  async closeDialog() {
    await this.dialog()
      .getByRole("button", {
        name: "Close",
      })
      .last()
      .click();
  }

  async openAddLicenseForm() {
    await this.addLicenseToggle.click();

    await this.page
      .getByRole("button", {
        name: "Add License",
        exact: true,
      })
      .click();

    await expect(this.dialog()).toContainText("Add Software");
  }

  async verifyLicenseDetails() {
    await expect(this.dialog()).toContainText("License Details");

    for (const field of [
      "Software Name",
      "Software Code",
      "Software License Key",
      "Max Devices",
      "Purchase Date",
      "Expiration Date",
      "Remarks",
      "Admin Email",
    ]) {
      await expect(this.dialog()).toContainText(field);
    }
  }

  async verifyLicenseForm({ edit = false } = {}) {
    await expect(this.dialog()).toContainText(
      edit ? "Edit Software" : "Add Software",
    );

    await expect(this.dialog().locator("select").first()).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Auto-generated"),
    ).toBeVisible();

    await expect(this.dialog().locator('input[type="date"]')).toHaveCount(2);

    await expect(this.dialog().getByRole("checkbox")).toBeVisible();

    await expect(this.dialog().locator('input[type="number"]')).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter Software License Key"),
    ).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Enter Admin Email"),
    ).toBeVisible();

    await expect(
      this.dialog().getByPlaceholder("Additional Notes About the License"),
    ).toBeVisible();
  }

  async getFormFields() {
    const dialog = this.dialog();

    return {
      softwareSelect: dialog.locator("select").first(),

      softwareCode: dialog.getByPlaceholder("Auto-generated"),

      licenseKey: dialog.getByPlaceholder("Enter Software License Key"),

      maxDevices: dialog.locator('input[type="number"]'),

      dates: dialog.locator('input[type="date"]'),

      adminEmail: dialog.getByPlaceholder("Enter Admin Email"),

      remarks: dialog.getByPlaceholder("Additional Notes About the License"),

      autoRenewal: dialog.getByRole("checkbox"),
    };
  }

  async getSoftwareOptions() {
    const fields = await this.getFormFields();

    return fields.softwareSelect.locator("option").allTextContents();
  }

  async selectSoftwareByLabel(label) {
    const fields = await this.getFormFields();

    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

    const option = fields.softwareSelect
      .locator("option")
      .filter({
        hasText: new RegExp(`^${escapedLabel}$`),
      })
      .first();

    await expect(option).toHaveCount(1);

    const value = await option.getAttribute("value");

    if (value) {
      await fields.softwareSelect.selectOption({
        value,
      });
    } else {
      await fields.softwareSelect.selectOption({
        label,
      });
    }

    await expect(fields.softwareSelect.locator("option:checked")).toHaveText(
      label,
    );
  }

  async fillLicenseForm({
    software,
    licenseKey,
    maxDevices,
    purchaseDate,
    expirationDate,
    adminEmail,
    remarks,
    autoRenewal,
  } = {}) {
    const fields = await this.getFormFields();

    if (software !== undefined) {
      await this.selectSoftwareByLabel(software);
    }

    if (licenseKey !== undefined) {
      await fields.licenseKey.fill(licenseKey);
    }

    if (maxDevices !== undefined) {
      await fields.maxDevices.fill(String(maxDevices));
    }

    if (purchaseDate !== undefined) {
      await fields.dates.nth(0).fill(purchaseDate);
    }

    if (expirationDate !== undefined) {
      await fields.dates.nth(1).fill(expirationDate);
    }

    if (adminEmail !== undefined) {
      await fields.adminEmail.fill(adminEmail);
    }

    if (remarks !== undefined) {
      await fields.remarks.fill(remarks);
    }

    if (autoRenewal !== undefined) {
      const checked = await fields.autoRenewal.isChecked();

      if (checked !== autoRenewal) {
        await fields.autoRenewal.click();
      }
    }
  }

  async saveLicense() {
    const addButton = this.dialog().getByRole("button", {
      name: "Add",
      exact: true,
    });

    await expect(addButton).toBeVisible();

    await addButton.click();
  }

  async updateLicense() {
    const updateButton = this.dialog().getByRole("button", {
      name: /^(Update|Save)$/,
    });

    await expect(updateButton).toBeVisible();

    await updateButton.click();
  }

  async cancelForm() {
    await this.dialog()
      .getByRole("button", {
        name: "Cancel",
      })
      .click();
  }

  async getSuccessMessage() {
    return this.page.locator(
      ['[role="alert"]:visible', ".toast:visible", ".alert:visible"].join(", "),
    );
  }

  async verifySuccessMessage() {
    const message = await this.getSuccessMessage();

    await expect(message).toBeVisible();
  }

  getValidationMessages() {
    return this.dialog().locator(
      [
        '[role="alert"]:visible',
        ".text-red-500:visible",
        ".text-danger:visible",
        ".error:visible",
        ".invalid-feedback:visible",
      ].join(", "),
    );
  }

  async verifyValidationMessage() {
    const validationMessages = this.getValidationMessages();

    await expect(validationMessages.first()).toBeVisible();
  }

  async hasValidationMessage() {
    const messages = this.getValidationMessages();

    return (await messages.count()) > 0;
  }

  async getFirstLicenseData() {
    const row = this.rows().first();

    return {
      softwareName: (await row.locator("td").nth(0).innerText()).trim(),

      softwareCode: (await row.locator("td").nth(1).innerText()).trim(),

      expirationDate: (await row.locator("td").nth(2).innerText()).trim(),
    };
  }

  async getLicenseKeyFromDetails() {
    const licenseKeyText = this.dialog().getByText(/Software License Key/i);

    await expect(licenseKeyText).toBeVisible();

    const dialogText = await this.dialog().innerText();

    const match = dialogText.match(/Software License Key:?\s*([^\s]+)/i);

    return match ? match[1].trim() : null;
  }

  async findLicenseByText(text) {
    return this.rows().filter({
      hasText: text,
    });
  }

  async verifyLicenseExists(text) {
    await expect(
      this.rows()
        .filter({
          hasText: text,
        })
        .first(),
    ).toBeVisible();
  }

  async verifyLicenseDoesNotExist(text) {
    await expect(
      this.rows().filter({
        hasText: text,
      }),
    ).toHaveCount(0);
  }

  async openLicenseByText(text) {
    const row = this.rows()
      .filter({
        hasText: text,
      })
      .first();

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "View",
      })
      .click();
  }

  async editLicenseByText(text) {
    const row = this.rows()
      .filter({
        hasText: text,
      })
      .first();

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "Edit",
      })
      .click();
  }

  async clearLicenseForm() {
    const fields = await this.getFormFields();

    await fields.licenseKey.fill("");
    await fields.maxDevices.fill("");
    await fields.dates.nth(0).fill("");
    await fields.dates.nth(1).fill("");
    await fields.adminEmail.fill("");
    await fields.remarks.fill("");
  }

  async getFormSubmitButton() {
    return this.dialog().getByRole("button", {
      name: /^(Add|Save|Create|Update)$/,
    });
  }

  async verifySubmitButtonState({ disabled } = {}) {
    const button = await this.getFormSubmitButton();

    if (disabled !== undefined) {
      await expect(button).toBeDisabled({
        disabled,
      });
    }
  }
}

module.exports = { SoftwareLicensePage };
