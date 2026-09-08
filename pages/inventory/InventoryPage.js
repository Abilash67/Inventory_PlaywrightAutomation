// inventory.page.js
class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventoryMenu = page.getByRole('link', { name: 'Inventory' });
    this.technicalAssets = page.getByRole('tab', { name: 'Technical Assets' });
  }

  async navigateToInventory() {
    await this.inventoryMenu.waitFor({ state: 'visible' });
    await this.inventoryMenu.click();
    await this.page.waitForURL(/\/inventory/);
  }

  async openTechnicalAssets() {
    await this.technicalAssets.waitFor({ state: 'visible' });
    await this.technicalAssets.click();
  }
}

module.exports = { InventoryPage };