const { test, expect } = require('../../fixtures/appFixtures');

test.describe('Inventory - Infrastructure Assets', () => {
  test.beforeEach(async ({ page, inventoryPage, infrastructureAssetPage }) => {
    await page.goto('/');
    await inventoryPage.navigateToInventory();
    await inventoryPage.openInfrastructureAssets();
    await infrastructureAssetPage.verifyTable();
  });

  test('displays the Infrastructure Assets table and pagination state', async ({ infrastructureAssetPage }) => {
    await expect(infrastructureAssetPage.rows()).toHaveCount(6);
    await expect(infrastructureAssetPage.pageIndicator).toContainText('Page 1 of 1');
    await expect(infrastructureAssetPage.previousButton).toBeDisabled();
    await expect(infrastructureAssetPage.nextButton).toBeDisabled();
  });

  test('changes the infrastructure rows per page control', async ({ infrastructureAssetPage }) => {
    await infrastructureAssetPage.selectRowsPerPage(50);
    await expect(infrastructureAssetPage.rows()).toHaveCount(6);
  });

  test('opens infrastructure asset details and edit form', async ({ page, infrastructureAssetPage }) => {
    await infrastructureAssetPage.viewFirstAsset();
    await infrastructureAssetPage.verifyAssetDetails();
    await infrastructureAssetPage.closeDialog();
    await infrastructureAssetPage.editFirstAsset();
    await infrastructureAssetPage.verifyAssetForm({ edit: true });
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Update' })).toBeVisible();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
  });

  test('opens the Add Infrastructure Asset form with supported fields', async ({ infrastructureAssetPage }) => {
    await infrastructureAssetPage.openAddAssetForm();
    await infrastructureAssetPage.verifyAssetForm();
    await infrastructureAssetPage.dialog().getByRole('button', { name: 'Cancel' }).click();
  });
});
