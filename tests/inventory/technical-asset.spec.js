const { test, expect } = require("../../fixtures/appFixtures");

test.describe("Inventory - Technical Assets", () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await page.goto("/");
    await inventoryPage.navigateToInventory();
    await expect(page).toHaveURL(/\/inventory/);
    await inventoryPage.openTechnicalAssets();
  });

  test("displays the Technical Assets table", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.verifyTechnicalAssetTable();
    await expect(technicalAssetPage.pageIndicator).toBeVisible();
    await expect(technicalAssetPage.searchInput).toBeVisible();
  });

  test("applies multiple filters simultaneously", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.filterByAssetType("Desktop");
    await technicalAssetPage.filterByStatus("Available");
    await technicalAssetPage.filterByLocation("Kochi");

    const rows = technicalAssetPage.rows();

    await expect(rows.first()).toBeVisible();

    await expect(rows).toHaveCount(4);

    for (let i = 0; i < 4; i++) {
      const row = rows.nth(i);

      await expect(row).toContainText("Desktop");
      await expect(row).toContainText("Kochi");
      await expect(row).toContainText("Available");
    }

    await expect(technicalAssetPage.pageIndicator).toContainText("Page 1 of 1");
  });

  test("displays no results for a non-matching search", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.searchAsset("NON_EXISTING_ASSET_99999");

    await expect(
      technicalAssetPage.technicalTab.getByText("No records found.", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("clears search and restores the table", async ({
    technicalAssetPage,
  }) => {
    const initialRows = await technicalAssetPage.rows().count();

    await technicalAssetPage.searchAsset("TV-DT-6863");
    await expect(technicalAssetPage.rows()).toHaveCount(1);

    await technicalAssetPage.clearSearch();

    await expect(technicalAssetPage.rows().first()).toBeVisible();

    const restoredRows = await technicalAssetPage.rows().count();
    expect(restoredRows).toBe(initialRows);
  });

  test("changes rows per page", async ({ technicalAssetPage }) => {
    const rowsPerPage = technicalAssetPage.rowsPerPageSelect;

    await expect(rowsPerPage).toBeVisible();

    const currentValue = await rowsPerPage.inputValue();

    const options = await rowsPerPage
      .locator("option")
      .evaluateAll((options) => options.map((option) => option.value));

    const newValue = options.find((value) => value !== currentValue);

    expect(newValue).toBeTruthy();

    await technicalAssetPage.selectRowsPerPage(newValue);

    await expect(rowsPerPage).toHaveValue(newValue);

    const visibleRows = await technicalAssetPage.rows().count();

    expect(visibleRows).toBeGreaterThan(0);
    expect(visibleRows).toBeLessThanOrEqual(Number(newValue));
  });

  test("moves between asset pages using Previous and Next", async ({
    technicalAssetPage,
  }) => {
    await expect(technicalAssetPage.previousButton).toBeDisabled();

    await technicalAssetPage.clickNextPage();

    await expect(technicalAssetPage.previousButton).toBeEnabled();
    await expect(technicalAssetPage.pageIndicator).toContainText("Page 2");

    await technicalAssetPage.clickPreviousPage();

    await expect(technicalAssetPage.previousButton).toBeDisabled();
    await expect(technicalAssetPage.pageIndicator).toContainText("Page 1");
  });

  test("opens asset details, edit form, and history", async ({
    page,
    technicalAssetPage,
  }) => {
    const assetCode = "TV-DT-6863";

    await technicalAssetPage.viewAsset(assetCode);
    await technicalAssetPage.verifyAssetDetails(assetCode);

    await technicalAssetPage.closeDialog();

    await technicalAssetPage.editAsset(assetCode);
    await technicalAssetPage.verifyAssetFormFields({ edit: true });

    await expect(
      page.getByRole("dialog").getByRole("button", {
        name: "Save",
      }),
    ).toBeVisible();

    await page
      .getByRole("dialog")
      .getByRole("button", {
        name: "Cancel",
      })
      .click();

    await technicalAssetPage.viewAssetHistory(assetCode);
    await technicalAssetPage.verifyHistory();

    await expect(page.getByRole("dialog")).toContainText(
      "Asset added to inventory",
    );
  });

  test("opens the add asset form with all supported fields", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.openAddAssetForm();

    await technicalAssetPage.verifyAssetFormFields();

    await technicalAssetPage.cancelDialog();
  });

  test("verifies the bulk upload template link and accepts an Excel file", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.openBulkUploadForm();

    const downloadLink = technicalAssetPage.dialog().getByRole("link", {
      name: /Download Sample Template/,
    });

    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", /addAssets\.xlsx/);

    const href = await technicalAssetPage.downloadBulkUploadTemplate();

    expect(href).toBe("/assets/addAssets.xlsx");

    await technicalAssetPage.chooseBulkUploadFile({
      name: "technical-assets.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer: Buffer.from("technical asset upload test"),
    });

    await expect(
      technicalAssetPage.dialog().getByRole("button", {
        name: "Upload",
      }),
    ).toBeEnabled();

    await technicalAssetPage.cancelDialog();
  });
});
