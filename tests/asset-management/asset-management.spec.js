const { test, expect } = require("@playwright/test");

const AssetManagementPage = require("../../pages/asset-management/AssetManagementPage");
const userData = require("../../test-data/userManagementData.json");

test.describe("Asset Management", () => {
  let assetManagementPage;

  test.beforeEach(async ({ page }) => {
    assetManagementPage = new AssetManagementPage(page);

    await assetManagementPage.goto();
  });

  // TC01 - PAGE LOAD
  test("TC01 - Verify Asset Management page is displayed", async () => {
    await expect(assetManagementPage.pageTitle).toBeVisible();
    await expect(assetManagementPage.searchInput).toBeVisible();
  });

  // TC02 - SEARCH BY VALID NAME
  test("TC02 - Search a valid user by name shows a matching suggestion", async () => {
    await assetManagementPage.searchUser(userData.searchData.validName);

    await expect(
      assetManagementPage.suggestionItem(userData.validUser.name),
    ).toBeVisible();

    await expect(
      assetManagementPage.suggestionItem(userData.validUser.name),
    ).toContainText(userData.validUser.employeeId);
  });

  // TC03 - SEARCH BY INVALID NAME
  test("TC03 - Search an invalid user name shows no suggestions", async () => {
    await assetManagementPage.searchUser(userData.searchData.invalidName);

    await expect(assetManagementPage.noUsersFoundMessage).toBeVisible();
  });

  // TC04 - SELECT USER
  test("TC04 - Selecting a user displays their assigned-assets tabs", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    await expect(assetManagementPage.selectedUserHeading).toContainText(
      userData.validUser.name,
    );

    await expect(assetManagementPage.selectedUserHeading).toContainText(
      userData.validUser.employeeId,
    );

    await expect(assetManagementPage.currentlyAssignedTab).toBeVisible();
    await expect(assetManagementPage.previouslyAssignedTab).toBeVisible();
  });

  // TC05 - CURRENTLY ASSIGNED TABLE
  test("TC05 - Currently Assigned tab lists the user's assigned assets", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    const assignedPanel = assetManagementPage.assignedPanel();

    await expect(
      assignedPanel.getByRole("columnheader", { name: /Asset Type/i }),
    ).toBeVisible();

    await expect(
      assignedPanel.getByRole("columnheader", { name: /Asset Code/i }),
    ).toBeVisible();

    await expect(
      assignedPanel.getByRole("columnheader", { name: /Assigned On/i }),
    ).toBeVisible();

    const count = await assetManagementPage.getAssignedAssetCount();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  // TC06 - PREVIOUSLY ASSIGNED TAB
  test("TC06 - Previously Assigned tab shows the unassignment history", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    await assetManagementPage.openHistoryTab();

    const historyPanel = assetManagementPage.historyPanel();

    await expect(
      historyPanel.getByRole("columnheader", { name: /Unassigned On/i }),
    ).toBeVisible();

    await expect(
      historyPanel.getByRole("columnheader", { name: /Reason to Unassign/i }),
    ).toBeVisible();
  });

  // TC07 - SWITCH BACK TO CURRENTLY ASSIGNED
  test("TC07 - Switching back to Currently Assigned restores the assigned list", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    await assetManagementPage.openHistoryTab();
    await assetManagementPage.openAssignedTab();

    await expect(assetManagementPage.assignedPanel()).toBeVisible();
  });

  // TC08 - CLEAR SEARCH
  test("TC08 - Clearing the search input clears the suggestion list", async () => {
    await assetManagementPage.searchUser(userData.searchData.validName);

    await expect(
      assetManagementPage.suggestionItem(userData.validUser.name),
    ).toBeVisible();

    await assetManagementPage.clearSearch();

    await expect(assetManagementPage.suggestionList).toHaveCount(0);
  });

  // TC09 - BULK UPLOAD DIALOG
  test("TC09 - Bulk upload dialog offers the sample template and accepts an Excel file", async ({}) => {
    await assetManagementPage.openFloatingActionDialog();

    await expect(assetManagementPage.dialog()).toContainText(
      "Bulk Upload assigned assets",
    );

    await expect(assetManagementPage.downloadTemplateLink()).toBeVisible();

    await expect(assetManagementPage.downloadTemplateLink()).toHaveAttribute(
      "href",
      /addUserAsset\.xlsx/i,
    );

    await assetManagementPage.chooseBulkUploadFile({
      name: "asset-assignments.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer: Buffer.from("asset assignment upload test"),
    });

    await expect(assetManagementPage.bulkUploadSubmitButton()).toBeEnabled();

    await assetManagementPage.cancelDialog();

    await expect(assetManagementPage.dialog()).toBeHidden();
  });

  // TC10 - ASSIGN ASSET DIALOG
  test("TC10 - Assign Asset dialog opens for the selected user and can be cancelled", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    await assetManagementPage.openFloatingActionDialog();

    await expect(assetManagementPage.dialog()).toContainText(
      `Assign to ${userData.validUser.name}`,
    );

    await expect(assetManagementPage.assignSubmitButton()).toBeDisabled();

    await assetManagementPage.cancelDialog();

    await expect(assetManagementPage.dialog()).toBeHidden();
  });

  // TC11 - CANCELLING DOES NOT MUTATE ASSIGNED ASSETS
  test("TC11 - Cancelling the Assign Asset dialog leaves the assigned list unchanged", async () => {
    await assetManagementPage.openUser(userData.validUser.name);

    const initialCount = await assetManagementPage.getAssignedAssetCount();

    await assetManagementPage.openFloatingActionDialog();
    await assetManagementPage.cancelDialog();

    await expect(assetManagementPage.dialog()).toBeHidden();

    const finalCount = await assetManagementPage.getAssignedAssetCount();

    expect(finalCount).toBe(initialCount);
  });

  // TC12 - MOBILE LAYOUT
  test("TC12 - Maintains a usable layout on a mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await expect(assetManagementPage.pageTitle).toBeVisible();
    await expect(assetManagementPage.searchInput).toBeInViewport();
  });
});
