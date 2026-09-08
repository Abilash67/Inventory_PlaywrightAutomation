const { expect } = require('@playwright/test');

class TechnicalAssetPage {
    constructor(page) {
        this.page = page;
        this.technicalTab = page.getByRole('tabpanel', {
            name: 'Technical Assets'
        });

        this.assetTypeFilter = this.technicalTab.getByText('Select Asset Type', {
            exact: true
        });

        this.statusFilter = this.technicalTab.getByText('Select Status', {
            exact: true
        }).first();

        this.locationFilter = this.technicalTab.getByText('Select Location', {
            exact: true
        });

        this.searchInput = this.technicalTab.getByPlaceholder(/Search Inventory/);

        this.assetTable = this.technicalTab.locator('table');
        this.previousButton = this.technicalTab.getByRole('button', {
            name: 'Prev'
        });
        this.nextButton = this.technicalTab.getByRole('button', {
            name: 'Next'
        });
        this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);
        this.addAssetToggle = this.technicalTab.getByRole('button', {
            name: /Add Asset/
        });
        this.addAssetMenuItem = this.page.getByRole('button', {
            name: 'Add Asset',
            exact: true
        });
        this.bulkUploadMenuItem = this.page.getByRole('button', {
            name: 'Bulk Upload Assets',
            exact: true
        });
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

    async selectFilterOption(filter, option) {
        await filter.click();
        const filterContainer = filter.locator('..');
        const checkbox = filterContainer.getByRole('checkbox', {
            name: option,
            exact: true
        });

        await checkbox.check();
        await expect(checkbox).toBeChecked();
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
        await expect(this.page.getByRole('dialog')).toContainText('Add New Asset');
    }

    async openBulkUploadForm() {
        await this.addAssetToggle.click();
        await this.bulkUploadMenuItem.click();
        await expect(this.page.getByRole('dialog')).toContainText('Bulk Upload Assets');
    }

    dialog() {
        return this.page.getByRole('dialog');
    }

    formSelect(index) {
        return this.dialog().locator('select').nth(index);
    }

    async verifyAssetFormFields({ edit = false } = {}) {
        const expectedTitle = edit ? 'Edit Asset' : 'Add New Asset';
        await expect(this.dialog()).toContainText(expectedTitle);

        await expect(this.formSelect(0)).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Auto-generated')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter Model Name')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter Storage')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter OS')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter RAM size')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter Processor Details')).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Enter Purchase Amount')).toBeVisible();
        await expect(this.dialog().locator('input[type="date"]')).toBeVisible();
        await expect(this.formSelect(1)).toBeVisible();
        await expect(this.formSelect(2)).toBeVisible();
        await expect(this.dialog().getByPlaceholder('Additional notes about the asset')).toBeVisible();
    }

    async cancelDialog() {
        await this.dialog().getByRole('button', { name: 'Cancel' }).click();
    }

    async downloadBulkUploadTemplate() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.dialog().getByRole('link', {
            name: /Download Sample Template/
        }).click();
        return downloadPromise;
    }

    async chooseBulkUploadFile(filePath) {
        await this.dialog().locator('input[type="file"]').setInputFiles(filePath);
        await expect(this.dialog().getByRole('button', {
            name: 'Upload'
        })).toBeEnabled();
    }

    rows() {
        return this.assetTable.locator('tbody tr');
    }

    rowByAssetCode(assetCode) {
        return this.rows().filter({ hasText: assetCode }).first();
    }

    async viewAsset(assetCode) {
        await this.rowByAssetCode(assetCode).getByRole('button', {
            name: 'View'
        }).click();
    }

    async editAsset(assetCode) {
        await this.rowByAssetCode(assetCode).getByRole('button', {
            name: 'Edit'
        }).click();
    }

    async viewAssetHistory(assetCode) {
        await this.rowByAssetCode(assetCode).getByRole('button', {
            name: 'History'
        }).click();
    }

    async closeDialog() {
        await this.page.getByRole('dialog').getByRole('button', {
            name: 'Close'
        }).first().click();
    }

    async verifyTechnicalAssetTable() {
        await expect(this.technicalTab).toBeVisible();
        await expect(this.assetTable).toBeVisible();
        for (const header of ['Asset Code', 'Asset Type', 'Location', 'Status', 'Actions']) {
            await expect(this.assetTable.getByRole('columnheader', {
                name: new RegExp(header)
            })).toBeVisible();
        }
        await expect(this.rows().first()).toBeVisible();
    }

    async verifyAssetDetails(assetCode) {
        await expect(this.dialog()).toContainText('Asset Details');
        await expect(this.dialog()).toContainText(assetCode);
        for (const field of [
            'Asset Code',
            'Asset Type',
            'Environment',
            'Data Classification',
            'Model',
            'Storage',
            'Operating System',
            'RAM',
            'Processor',
            'Price',
            'Purchase Date',
            'Status',
            'Remarks',
            'Location'
        ]) {
            await expect(this.dialog()).toContainText(field);
        }
    }

    async verifyHistory() {
        await expect(this.dialog()).toContainText('Asset History');
        await expect(this.dialog().getByRole('list')).toBeVisible();
    }
}

module.exports = { TechnicalAssetPage };