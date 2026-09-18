const { expect } = require('@playwright/test');

class SoftwareLicensePage {
  constructor(page) {
    this.page = page;
    this.licenseTab = page.getByRole('tabpanel', { name: 'Software Licenses' });
    this.softwareFilter = this.licenseTab.getByText('Select Software', { exact: true });
    this.statusFilter = this.licenseTab.getByText('Select Status', { exact: true });
    this.searchInput = this.licenseTab.getByPlaceholder(/Search Software/);
    this.licenseTable = this.licenseTab.locator('table');
    this.rowsPerPage = this.licenseTab.locator('select').first();
    this.previousButton = this.licenseTab.getByRole('button', { name: 'Prev' });
    this.nextButton = this.licenseTab.getByRole('button', { name: 'Next' });
    this.pageIndicator = this.licenseTab.getByText(/Page \d+ of \d+/);
    this.addLicenseToggle = this.licenseTab.locator('button.addAssetButton');
  }

  rows() { return this.licenseTable.locator('tbody tr'); }
  dialog() { return this.page.getByRole('dialog'); }

  async verifyTable() {
    await expect(this.licenseTab).toBeVisible();
    await expect(this.licenseTable).toBeVisible();
    for (const header of ['Software Name', 'Software Code', 'Expiration Date', 'Actions']) {
      await expect(this.licenseTable.getByRole('columnheader', { name: new RegExp(header) })).toBeVisible();
    }
    await expect(this.rows().first()).toBeVisible();
  }

  async selectFilterOption(filter, option) {
    await filter.click();
    const container = filter.locator('..');
    const checkbox = container.getByRole('checkbox', { name: option, exact: true });
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  async search(text) { await this.searchInput.fill(text); }
  async selectRowsPerPage(value) { await this.rowsPerPage.selectOption(String(value)); }
  async viewFirstLicense() { await this.rows().first().getByRole('button', { name: 'View' }).click(); }
  async editFirstLicense() { await this.rows().first().getByRole('button', { name: 'Edit' }).click(); }

  async closeDialog() {
    await this.dialog().getByRole('button', { name: 'Close' }).last().click();
  }

  async openAddLicenseForm() {
    await this.addLicenseToggle.click();
    await this.page.getByRole('button', { name: 'Add License', exact: true }).click();
    await expect(this.dialog()).toContainText('Add Software');
  }

  async verifyLicenseDetails() {
    await expect(this.dialog()).toContainText('License Details');
    for (const field of ['Software Name', 'Software Code', 'Software License Key', 'Max Devices', 'Purchase Date', 'Expiration Date', 'Remarks', 'Admin Email']) {
      await expect(this.dialog()).toContainText(field);
    }
  }

  async verifyLicenseForm({ edit = false } = {}) {
    await expect(this.dialog()).toContainText(edit ? 'Edit Software' : 'Add Software');
    await expect(this.dialog().locator('select').first()).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Auto-generated')).toBeVisible();
    await expect(this.dialog().locator('input[type="date"]')).toHaveCount(2);
    await expect(this.dialog().getByRole('checkbox')).toBeVisible();
    await expect(this.dialog().locator('input[type="number"]')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter Software License Key')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter Admin Email')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Additional Notes About the License')).toBeVisible();
  }
}

module.exports = { SoftwareLicensePage };
