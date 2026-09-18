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

    await expect(
      technicalAssetPage.selectedFilterValue("Selected Asset Type:"),
    ).toContainText("Desktop");

    await expect(
      technicalAssetPage.selectedFilterValue("Selected Status:"),
    ).toContainText("Available");

    await expect(
      technicalAssetPage.selectedFilterValue("Selected Location:"),
    ).toContainText("Kochi");

    const rows = technicalAssetPage.rows();

    await expect(rows.first()).toBeVisible();

    const rowCount = await rows.count();

    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      await expect(row).toContainText("Desktop");
      await expect(row).toContainText("Available");
      await expect(row).toContainText("Kochi");
    }

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

    await technicalAssetPage.verifyAssetFormFields({
      edit: true,
    });

    await expect(
      page.getByRole("dialog").getByRole("button", {
        name: "Save",
        exact: true,
      }),
    ).toBeVisible();

    await page
      .getByRole("dialog")
      .getByRole("button", {
        name: "Cancel",
        exact: true,
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

    await expect(technicalAssetPage.dialog()).toBeHidden();
  });

  test("validates required field during Edit", async ({
    technicalAssetPage,
  }) => {
    const assetCode = "TV-DT-6863";

    await technicalAssetPage.editAsset(assetCode);

    await technicalAssetPage.verifyAssetFormFields({
      edit: true,
    });

    await technicalAssetPage.clearRequiredEditField();

    await technicalAssetPage.clickSave();

    await technicalAssetPage.verifyDialogRemainsOpen();

    await expect(technicalAssetPage.dialog()).toBeVisible();
  });

  test("cancels Edit without saving", async ({ technicalAssetPage }) => {
    const assetCode = "TV-DT-6863";

    await technicalAssetPage.editAsset(assetCode);

    await technicalAssetPage.verifyAssetFormFields({
      edit: true,
    });

    await technicalAssetPage.modelInput().fill("Temporary Edit Value");

    await technicalAssetPage.cancelDialog();

    await expect(technicalAssetPage.dialog()).toBeHidden();

    await expect(technicalAssetPage.rowByAssetCode(assetCode)).toBeVisible();
  });

  test("validates required fields during Add Asset", async ({
    technicalAssetPage,
  }) => {
    await technicalAssetPage.openAddAssetForm();

    await technicalAssetPage.verifyAssetFormFields();

    await technicalAssetPage.clearRequiredAddFields();

    await technicalAssetPage.clickAdd();

    await technicalAssetPage.verifyDialogRemainsOpen();

    await expect(technicalAssetPage.dialog()).toBeVisible();
  });

  test("validates negative Purchase Amount", async ({ technicalAssetPage }) => {
    await technicalAssetPage.openAddAssetForm();

    await technicalAssetPage.verifyAssetFormFields();

    await technicalAssetPage.enterNegativePurchaseAmount();

    await technicalAssetPage.clickAdd();

    await technicalAssetPage.verifyDialogRemainsOpen();

    await expect(technicalAssetPage.dialog()).toBeVisible();
  });

  test("validates future Purchase Date", async ({ technicalAssetPage }) => {
    await technicalAssetPage.openAddAssetForm();

    await technicalAssetPage.verifyAssetFormFields();

    await technicalAssetPage.enterFuturePurchaseDate();

    await technicalAssetPage.clickAdd();

    await technicalAssetPage.verifyDialogRemainsOpen();

    await expect(technicalAssetPage.dialog()).toBeVisible();
  });

  test("cancels Add Asset without saving", async ({ technicalAssetPage }) => {
    await technicalAssetPage.openAddAssetForm();

    await technicalAssetPage.verifyAssetFormFields();

    await technicalAssetPage.enterAssetDataForCancel();

    await technicalAssetPage.cancelDialog();

    await expect(technicalAssetPage.dialog()).toBeHidden();

    await expect(
      technicalAssetPage.rowByAssetCode("Cancel Test Asset"),
    ).toHaveCount(0);
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
        exact: true,
      }),
    ).toBeEnabled();

    await technicalAssetPage.cancelDialog();

    await expect(technicalAssetPage.dialog()).toBeHidden();
  });
});
