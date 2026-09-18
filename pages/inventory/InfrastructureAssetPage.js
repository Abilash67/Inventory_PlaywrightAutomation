const { expect } = require('@playwright/test');

class InfrastructureAssetPage {
  constructor(page) {
    this.page = page;
    this.infrastructureTab = page.getByRole('tabpanel', { name: 'Infrastructure Assets' });
    this.assetTable = this.infrastructureTab.locator('table');
    this.rowsPerPage = this.infrastructureTab.locator('select').first();
    this.previousButton = this.infrastructureTab.getByRole('button', { name: 'Prev' });
    this.nextButton = this.infrastructureTab.getByRole('button', { name: 'Next' });
    this.pageIndicator = this.infrastructureTab.getByText(/Page \d+ of \d+/);
    this.addAssetToggle = this.infrastructureTab.locator('button.addAssetButton');
  }

  rows() { return this.assetTable.locator('tbody tr'); }
  dialog() { return this.page.getByRole('dialog'); }

  async verifyTable() {
  await expect(this.infrastructureTab).toBeVisible();

  await expect(this.assetTable).toBeVisible({ timeout: 15000 });

  for (const header of ['Asset Code', 'Asset Type', 'Location', 'Status', 'Actions']) {
    await expect(
      this.assetTable.getByRole('columnheader', {
        name: new RegExp(header),
      })
    ).toBeVisible();
  }

  await expect(this.rows().first()).toBeVisible();
}

  async selectRowsPerPage(value) { await this.rowsPerPage.selectOption(String(value)); }
  async viewFirstAsset() { await this.rows().first().getByRole('button', { name: 'View' }).click(); }
  async editFirstAsset() { await this.rows().first().getByRole('button', { name: 'Edit' }).click(); }

  async closeDialog() {
    await this.dialog().getByRole('button', { name: 'Close' }).last().click();
  }

  async openAddAssetForm() {
    await this.addAssetToggle.click();
    await this.page.getByRole('button', { name: 'Add Infrastructure Assets', exact: true }).click();
    await expect(this.dialog()).toContainText('Add Company Asset');
  }

  async verifyAssetDetails() {
    await expect(this.dialog()).toContainText('Infrastructure Assets Details');
    for (const field of ['Asset Code', 'Asset Type', 'Location', 'Status', 'Purchase Amount', 'Purchase Date', 'Processor', 'RAM', 'Storage', 'Model', 'Labels']) {
      await expect(this.dialog()).toContainText(field);
    }
  }

  async verifyAssetForm({ edit = false } = {}) {
    await expect(this.dialog()).toContainText(edit ? 'Edit Company Asset' : 'Add Company Asset');
    await expect(this.dialog().locator('select')).toHaveCount(3);
    await expect(this.dialog().getByPlaceholder('Auto-generated')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter purchase amount')).toBeVisible();
    await expect(this.dialog().locator('input[type="date"]')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter model')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter processor')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Example: 16 GB')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Example: 512 GB SSD')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Example: Windows 11 Pro')).toBeVisible();
    await expect(this.dialog().getByPlaceholder('Enter remarks')).toBeVisible();
  }
}

module.exports = { InfrastructureAssetPage };
