class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventoryMenu = page.getByRole("link", {
      name: "Inventory",
      exact: true,
    });

    this.technicalAssets = page.getByRole("tab", {
      name: "Technical Assets",
    });

    this.softwareLicenses = page.getByRole("tab", {
      name: "Software Licenses",
    });

    this.infrastructureAssets = page.getByRole("tab", {
      name: "Infrastructure Assets",
    });
  }

  async navigateToInventory() {
    if (/\/inventory(?:\/)?$/.test(this.page.url())) {
      return;
    }

    await this.page.waitForLoadState("domcontentloaded");

    if (await this.inventoryMenu.isVisible().catch(() => false)) {
      await this.inventoryMenu.click();
    } else {
      await this.page.goto("/inventory", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
    }

    await this.page.waitForURL(/\/inventory(?:\/)?$/, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  }

  async openTechnicalAssets() {
    await this.technicalAssets.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await this.technicalAssets.click();
  }

  async openSoftwareLicenses() {
    await this.softwareLicenses.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await this.softwareLicenses.click();
  }

  async openInfrastructureAssets() {
    await this.infrastructureAssets.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await this.infrastructureAssets.click();
  }
}

module.exports = {
  InventoryPage,
};
