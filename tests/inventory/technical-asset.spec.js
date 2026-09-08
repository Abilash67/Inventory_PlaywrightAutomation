const { test, expect } = require('../../fixtures/appFixtures');
const path = require('path');

test.describe('Inventory - Technical Assets', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await page.goto('/');
    await inventoryPage.navigateToInventory();
    await expect(page).toHaveURL(/\/inventory/);
    await inventoryPage.openTechnicalAssets();
  });

  test('displays the Technical Assets table', async ({ page, technicalAssetPage }) => {
    await technicalAssetPage.verifyTechnicalAssetTable();
    await expect(technicalAssetPage.pageIndicator).toBeVisible();
    await expect(technicalAssetPage.searchInput).toBeVisible();
  });

  test('filters assets by type, status, location, and searches inventory', async ({ page, technicalAssetPage }) => {
    await technicalAssetPage.filterByAssetType('Desktop');
    await technicalAssetPage.filterByStatus('Available');
    await technicalAssetPage.filterByLocation('Kochi');
    await expect(technicalAssetPage.rows().first()).toContainText('Desktop');
    await expect(technicalAssetPage.rows().first()).toContainText('Kochi');
    await expect(technicalAssetPage.rows().first()).toContainText('Available');

    await technicalAssetPage.searchAsset('TV-DT-6863');
    await expect(technicalAssetPage.rows()).toHaveCount(1);
    await expect(technicalAssetPage.rows().first()).toContainText('TV-DT-6863');
    await technicalAssetPage.clearSearch();
  });

  test('moves between asset pages', async ({ page, technicalAssetPage }) => {
    await expect(technicalAssetPage.previousButton).toBeDisabled();
    await technicalAssetPage.clickNextPage();
    await expect(technicalAssetPage.previousButton).toBeEnabled();
    await expect(technicalAssetPage.pageIndicator).toContainText('Page 2');
    await technicalAssetPage.clickPreviousPage();
    await expect(technicalAssetPage.previousButton).toBeDisabled();
  });

  test('opens asset details, edit form, and history', async ({ page, technicalAssetPage }) => {
    const assetCode = 'TV-DT-6863';

    await technicalAssetPage.viewAsset(assetCode);
    await technicalAssetPage.verifyAssetDetails(assetCode);
    await technicalAssetPage.closeDialog();

    await technicalAssetPage.editAsset(assetCode);
    await technicalAssetPage.verifyAssetFormFields({ edit: true });
    await expect(page.getByRole('dialog').getByRole('button', {
      name: 'Save'
    })).toBeVisible();
    await page.getByRole('dialog').getByRole('button', {
      name: 'Cancel'
    }).click();

    await technicalAssetPage.viewAssetHistory(assetCode);
    await technicalAssetPage.verifyHistory();
    await expect(page.getByRole('dialog')).toContainText('Asset added to inventory');
  });

  test('opens the add asset form with all supported fields', async ({ technicalAssetPage }) => {
    await technicalAssetPage.openAddAssetForm();
    await technicalAssetPage.verifyAssetFormFields();
    await technicalAssetPage.cancelDialog();
  });

  test('downloads the bulk upload template and accepts an Excel file', async ({
    page,
    technicalAssetPage
  }) => {
    await technicalAssetPage.openBulkUploadForm();
    await expect(technicalAssetPage.dialog().getByRole('link', {
      name: /Download Sample Template/
    })).toHaveAttribute('href', /addAssets\.xlsx/);

    const download = await technicalAssetPage.downloadBulkUploadTemplate();
    expect(download.suggestedFilename()).toBe('addAssets.xlsx');

    await technicalAssetPage.chooseBulkUploadFile({
      name: 'technical-assets.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      buffer: Buffer.from('technical asset upload test')
    });
    await expect(technicalAssetPage.dialog().getByRole('button', {
      name: 'Upload'
    })).toBeEnabled();
    await technicalAssetPage.cancelDialog();
  });
});