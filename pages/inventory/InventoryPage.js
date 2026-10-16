class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventoryMenu = page.getByRole("link", {
      name: "Inventory",
      exact: true,
    });

    this.inventoryHeading = page.getByRole("heading", {
      name: "Inventory",
      exact: true,
    });

    this.tabList = page.getByRole("tablist");

    this.technicalAssets = page.getByRole("tab", {
      name: "Technical Assets",
      exact: true,
    });

    this.softwareLicenses = page.getByRole("tab", {
      name: "Software Licenses",
      exact: true,
    });

    this.infrastructureAssets = page.getByRole("tab", {
      name: "Infrastructure Assets",
      exact: true,
    });
  }

  async navigateToInventory() {
    if (!/\/inventory(?:\/)?$/.test(this.page.url())) {
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

    // Wait for the Inventory SPA UI to finish rendering.
    await this.inventoryHeading.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await this.tabList.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await this.technicalAssets.waitFor({
      state: "visible",
      timeout: 30000,
    });
  }

  async openTechnicalAssets() {
    await this.technicalAssets.waitFor({
      state: "visible",
      timeout: 30000,
    });

    const selected = await this.technicalAssets.getAttribute("aria-selected");

    // Do not click an already-active tab.
    if (selected !== "true") {
      await this.technicalAssets.click({
        timeout: 15000,
      });
    }

    await this.page
      .getByRole("tabpanel", {
        name: "Technical Assets",
      })
      .waitFor({
        state: "visible",
        timeout: 30000,
      });
  }

  async openSoftwareLicenses() {
    await this.softwareLicenses.waitFor({
      state: "visible",
      timeout: 30000,
    });

    const selected = await this.softwareLicenses.getAttribute("aria-selected");

    // Do not click an already-active tab.
    if (selected !== "true") {
      await this.softwareLicenses.click({
        timeout: 15000,
      });
    }

    await this.page
      .getByRole("tabpanel", {
        name: "Software Licenses",
      })
      .waitFor({
        state: "visible",
        timeout: 30000,
      });
  }

  async openInfrastructureAssets() {
    await this.infrastructureAssets.waitFor({
      state: "visible",
      timeout: 30000,
    });

    const selected =
      await this.infrastructureAssets.getAttribute("aria-selected");

    // Do not click an already-active tab.
    if (selected !== "true") {
      await this.infrastructureAssets.click({
        timeout: 15000,
      });
    }

    await this.page
      .getByRole("tabpanel", {
        name: "Infrastructure Assets",
      })
      .waitFor({
        state: "visible",
        timeout: 30000,
      });
  }
}

module.exports = {
  InventoryPage,
};
