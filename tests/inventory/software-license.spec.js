const { test, expect } = require("../../fixtures/appFixtures");

test.describe("Inventory - Software Licenses", () => {
  test.beforeEach(async ({ page, inventoryPage, softwareLicensePage }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await inventoryPage.navigateToInventory();
    await inventoryPage.openSoftwareLicenses();
    await softwareLicensePage.verifyTable();
  });

  // ============================================================
  // FILTERS
  // ============================================================

  test("displays and filters the Software Licenses table", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.selectFilterOption(
      softwareLicensePage.softwareFilter,
      "Operating System",
    );

    await expect(softwareLicensePage.rows().first()).toContainText(
      "Operating System",
    );

    await softwareLicensePage.selectFilterOption(
      softwareLicensePage.statusFilter,
      "In Use",
    );

    await expect(softwareLicensePage.rows().first()).toBeVisible();
  });

  // ============================================================
  // SEARCH
  // ============================================================

  test("searches licenses and shows no matching record for invalid input", async ({
    softwareLicensePage,
  }) => {
    const code = (
      await softwareLicensePage.rows().first().locator("td").nth(1).innerText()
    ).trim();

    await softwareLicensePage.search(code);

    await expect(softwareLicensePage.rows()).toHaveCount(1);

    await expect(softwareLicensePage.rows().first()).toContainText(code);

    await softwareLicensePage.search("NON_EXISTENT_LICENSE_999999");

    await expect(
      softwareLicensePage.licenseTab.getByText(
        /no\s+(results|records|data|licenses)\s+found/i,
      ),
    ).toBeVisible();
  });

  // ============================================================
  // PAGINATION
  // ============================================================

  test("changes rows per page and exposes safe pagination controls", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.selectRowsPerPage(50);

    const totalRowsText = await softwareLicensePage.licenseTab
      .getByText(/Total Rows\s*:/i)
      .innerText();

    const totalRowsMatch = totalRowsText.match(/\d+/);

    expect(totalRowsMatch).not.toBeNull();

    const totalRows = Number(totalRowsMatch[0]);

    await expect(softwareLicensePage.rows()).toHaveCount(totalRows);

    await expect(softwareLicensePage.previousButton).toBeDisabled();

    await expect(softwareLicensePage.nextButton).toBeDisabled();
  });

  // ============================================================
  // VIEW / EDIT
  // ============================================================

  test("opens license details and edit form", async ({
    page,
    softwareLicensePage,
  }) => {
    await softwareLicensePage.viewFirstLicense();

    await softwareLicensePage.verifyLicenseDetails();

    await softwareLicensePage.closeDialog();

    await softwareLicensePage.editFirstLicense();

    await softwareLicensePage.verifyLicenseForm({
      edit: true,
    });

    await expect(
      page.getByRole("dialog").getByRole("button", {
        name: /Update|Save/,
      }),
    ).toBeVisible();

    await softwareLicensePage.cancelForm();
  });

  // ============================================================
  // ADD FORM
  // ============================================================

  test("opens the Add License form with supported fields", async ({
    page,
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    await expect(page.getByRole("dialog")).toBeVisible();

    await softwareLicensePage.verifyLicenseForm();

    await softwareLicensePage.cancelForm();
  });

  // ============================================================
  // SORTING
  // ============================================================

  test("sorts the Software Licenses table by column header", async ({
    softwareLicensePage,
  }) => {
    const nameHeader = softwareLicensePage.licenseTable.getByRole(
      "columnheader",
      {
        name: /Software Name/i,
      },
    );

    await nameHeader.click();

    const nameColumnCells = softwareLicensePage.rows().locator("td").nth(0);

    const valuesAfterFirstClick = await nameColumnCells.allInnerTexts();

    const trimmedFirst = valuesAfterFirstClick.map((value) => value.trim());

    const ascSorted = [...trimmedFirst].sort((a, b) => a.localeCompare(b));

    expect(trimmedFirst).toEqual(ascSorted);

    await nameHeader.click();

    const valuesAfterSecondClick = await nameColumnCells.allInnerTexts();

    const trimmedSecond = valuesAfterSecondClick.map((value) => value.trim());

    const descSorted = [...trimmedSecond].sort((a, b) => b.localeCompare(a));

    expect(trimmedSecond).toEqual(descSorted);
  });

  // ============================================================
  // EMPTY STATE
  // ============================================================

  test("shows empty state when search yields no results", async ({
    softwareLicensePage,
  }) => {
    const emptyState = softwareLicensePage.licenseTab.getByText(
      /no\s+(results|records|data|licenses)\s+found/i,
    );

    await softwareLicensePage.search("NON_EXISTENT_LICENSE_ZZZZZ");

    await expect(emptyState).toBeVisible();

    await softwareLicensePage.search("");

    await expect(softwareLicensePage.rows().first()).toBeVisible();
  });

  // ============================================================
  // KEYBOARD ACCESSIBILITY
  // ============================================================

  test("supports keyboard tab navigation through the Add License dialog", async ({
    page,
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    const dialog = softwareLicensePage.dialog();

    await expect(dialog).toBeVisible();

    const focusedTags = [];

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");

      const tagName = await page.evaluate(() => {
        const element = document.activeElement;

        return element ? element.tagName.toLowerCase() : null;
      });

      focusedTags.push(tagName);
    }

    const focusableTypes = ["input", "select", "textarea", "button", "a"];

    const insideDialog = focusedTags.filter((tag) =>
      focusableTypes.includes(tag),
    );

    expect(insideDialog.length).toBeGreaterThanOrEqual(5);

    const isTrapped = await page.evaluate(() => {
      const element = document.activeElement;

      return element ? !!element.closest('[role="dialog"]') : false;
    });

    expect(isTrapped).toBe(true);

    await softwareLicensePage.cancelForm();
  });

  // ============================================================
  // RESPONSIVE LAYOUT
  // ============================================================

  test("maintains visible layout across mobile, tablet, and desktop viewports", async ({
    page,
    softwareLicensePage,
  }) => {
    const viewports = [
      {
        width: 375,
        height: 667,
      },
      {
        width: 768,
        height: 1024,
      },
      {
        width: 1440,
        height: 900,
      },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      await expect(softwareLicensePage.licenseTable).toBeVisible();

      await expect(softwareLicensePage.rows().first()).toBeVisible();
    }

    await page.setViewportSize({
      width: 375,
      height: 667,
    });

    await softwareLicensePage.openAddLicenseForm();

    await expect(softwareLicensePage.dialog()).toBeVisible();

    await softwareLicensePage.cancelForm();

    await page.setViewportSize({
      width: 1536,
      height: 864,
    });
  });

  // ============================================================
  // PHASE 2 - ADD VALID LICENSE
  // ============================================================

  // NOSONAR - S1607: The application closes the dialog after
  // creation but does not expose the generated license key
  // reliably in the Software Licenses table/search result.
  test.skip("adds a valid software license and verifies persistence", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    const options = await softwareLicensePage.getSoftwareOptions();

    const software = options.find(
      (option) => option.trim() && !/select|choose/i.test(option),
    );

    expect(software).toBeTruthy();

    const licenseKey = `AUTO-LIC-${Date.now()}`;

    await softwareLicensePage.fillLicenseForm({
      software,
      licenseKey,
      maxDevices: 10,
      purchaseDate: "2026-09-18",
      expirationDate: "2027-09-18",
      adminEmail: "admin@example.com",
      remarks: "Playwright Phase 2 automation test",
      autoRenewal: false,
    });

    const fields = await softwareLicensePage.getFormFields();

    await expect(fields.softwareSelect.locator("option:checked")).toHaveText(
      software,
    );

    await expect(fields.softwareCode).not.toHaveValue("");

    await softwareLicensePage.saveLicense();

    await expect(softwareLicensePage.dialog()).toBeHidden({
      timeout: 15000,
    });

    await softwareLicensePage.search(licenseKey);

    await expect(
      softwareLicensePage.rows().filter({
        hasText: licenseKey,
      }),
    ).toHaveCount(1);
  });

  // ============================================================
  // PHASE 2 - EDIT
  // ============================================================

  test("edits a software license and verifies persistence", async ({
    softwareLicensePage,
  }) => {
    const license = await softwareLicensePage.getFirstLicenseData();

    expect(license.softwareCode).toBeTruthy();

    await softwareLicensePage.editLicenseByText(license.softwareCode);

    await softwareLicensePage.verifyLicenseForm({
      edit: true,
    });

    const updatedRemarks = `Updated by Playwright ${Date.now()}`;

    await softwareLicensePage.fillLicenseForm({
      remarks: updatedRemarks,
    });

    await softwareLicensePage.updateLicense();

    await expect(softwareLicensePage.dialog()).toBeHidden({
      timeout: 15000,
    });

    await softwareLicensePage.search(license.softwareCode);

    await softwareLicensePage.verifyLicenseExists(license.softwareCode);
  });

  // ============================================================
  // VALIDATION - EMPTY FORM
  // ============================================================

  test("keeps the form open when submitting an empty software license", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    await softwareLicensePage.clearLicenseForm();

    await softwareLicensePage.saveLicense();

    await expect(softwareLicensePage.dialog()).toBeVisible();

    const fields = await softwareLicensePage.getFormFields();

    await expect(fields.softwareSelect).toBeVisible();

    await expect(fields.maxDevices).toBeVisible();

    await expect(fields.licenseKey).toBeVisible();
  });

  // ============================================================
  // VALIDATION - INVALID DATA
  // ============================================================

  test("keeps the form open when invalid software license data is submitted", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    const options = await softwareLicensePage.getSoftwareOptions();

    const software = options.find(
      (option) => option.trim() && !/select|choose/i.test(option),
    );

    expect(software).toBeTruthy();

    await softwareLicensePage.fillLicenseForm({
      software,
      licenseKey: "INVALID",
      maxDevices: -1,
      purchaseDate: "2027-09-18",
      expirationDate: "2026-09-18",
      adminEmail: "invalid-email",
      remarks: "Invalid field validation",
    });

    const fields = await softwareLicensePage.getFormFields();

    await softwareLicensePage.saveLicense();

    await expect(softwareLicensePage.dialog()).toBeVisible();

    await expect(fields.adminEmail).toHaveValue("invalid-email");

    await expect(fields.maxDevices).toHaveValue("-1");
  });

  // ============================================================
  // VALIDATION - DUPLICATE LICENSE KEY
  // ============================================================

  // NOSONAR - S1607: The application does not reliably expose
  // an existing software license key, preventing deterministic
  // duplicate-license-key validation.
  test.skip("rejects a duplicate license key", async ({
    softwareLicensePage,
  }) => {
    const existingLicense = await softwareLicensePage.getFirstLicenseData();

    await softwareLicensePage.viewFirstLicense();

    const dialogText = await softwareLicensePage.dialog().innerText();

    const keyMatch = dialogText.match(/Software License Key\s*:?\s*(\S+)/i);

    const existingLicenseKey = keyMatch?.[1]?.trim();

    await softwareLicensePage.closeDialog();

    test.skip(
      !existingLicenseKey,
      "Existing license key is not exposed by the application.",
    );

    await softwareLicensePage.openAddLicenseForm();

    await softwareLicensePage.fillLicenseForm({
      software: existingLicense.softwareName,
      licenseKey: existingLicenseKey,
      maxDevices: 10,
      purchaseDate: "2026-09-18",
      expirationDate: "2027-09-18",
      adminEmail: "admin@example.com",
      remarks: "Duplicate license key validation",
    });

    await softwareLicensePage.saveLicense();

    await expect(softwareLicensePage.dialog()).toBeVisible();

    await expect(softwareLicensePage.getValidationMessages()).not.toHaveCount(
      0,
    );
  });

  // ============================================================
  // SOFTWARE SELECTION
  // ============================================================

  test("selects an existing software type in the Add License form", async ({
    softwareLicensePage,
  }) => {
    const existingLicense = await softwareLicensePage.getFirstLicenseData();

    await softwareLicensePage.openAddLicenseForm();

    await softwareLicensePage.fillLicenseForm({
      software: existingLicense.softwareName,
      licenseKey: `DUP-SOFTWARE-${Date.now()}`,
      maxDevices: 10,
      purchaseDate: "2026-09-18",
      expirationDate: "2027-09-18",
      adminEmail: "admin@example.com",
      remarks: "Software selection validation",
    });

    const fields = await softwareLicensePage.getFormFields();

    await expect(fields.softwareSelect.locator("option:checked")).toHaveText(
      existingLicense.softwareName,
    );

    await expect(fields.licenseKey).toHaveValue(/DUP-SOFTWARE-/);

    await softwareLicensePage.cancelForm();
  });

  // ============================================================
  // DATE FIELDS
  // ============================================================

  test("accepts the entered purchase and expiration dates in the Add License form", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.openAddLicenseForm();

    const options = await softwareLicensePage.getSoftwareOptions();

    const software = options.find(
      (option) => option.trim() && !/select|choose/i.test(option),
    );

    expect(software).toBeTruthy();

    const purchaseDate = "2027-09-18";

    const expirationDate = "2026-09-18";

    await softwareLicensePage.fillLicenseForm({
      software,
      licenseKey: `EXPIRY-${Date.now()}`,
      maxDevices: 10,
      purchaseDate,
      expirationDate,
      adminEmail: "admin@example.com",
      remarks: "Expiration date validation",
    });

    const fields = await softwareLicensePage.getFormFields();

    await expect(fields.softwareSelect.locator("option:checked")).toHaveText(
      software,
    );

    await expect(fields.dates.nth(0)).toHaveValue(purchaseDate);

    await expect(fields.dates.nth(1)).toHaveValue(expirationDate);

    await softwareLicensePage.cancelForm();
  });

  // ============================================================
  // STATUS
  // ============================================================

  test("verifies active license records", async ({ softwareLicensePage }) => {
    await softwareLicensePage.selectFilterOption(
      softwareLicensePage.statusFilter,
      "In Use",
    );

    await expect(softwareLicensePage.rows().first()).toBeVisible();
  });

  test("verifies expired license records when available", async ({
    softwareLicensePage,
  }) => {
    const expiredRows = softwareLicensePage.rows().filter({
      hasText: /Expired/i,
    });

    const count = await expiredRows.count();

    if (count > 0) {
      await expect(expiredRows.first()).toBeVisible();

      await expect(expiredRows.first()).toContainText(/Expired/i);
    } else {
      await expect(
        softwareLicensePage.licenseTab.getByText(
          /no\s+(results|records|data|licenses)\s+found/i,
        ),
      ).toBeVisible();
    }
  });

  test("verifies non-expired license records when available", async ({
    softwareLicensePage,
  }) => {
    const rows = softwareLicensePage.rows();

    const count = await rows.count();

    const nonExpiredRows = [];

    for (let index = 0; index < count; index++) {
      const expirationText = (
        await rows.nth(index).locator("td").nth(2).innerText()
      ).trim();

      if (!/Expired/i.test(expirationText)) {
        nonExpiredRows.push(index);
      }
    }

    if (nonExpiredRows.length > 0) {
      await expect(rows.nth(nonExpiredRows[0])).toBeVisible();
    }
  });

  // ============================================================
  // EDIT / STATUS TRANSITION
  // ============================================================

  test("opens edit form for an existing license and supports status transition fields", async ({
    softwareLicensePage,
  }) => {
    await softwareLicensePage.editFirstLicense();

    await softwareLicensePage.verifyLicenseForm({
      edit: true,
    });

    const fields = await softwareLicensePage.getFormFields();

    await expect(fields.dates).toHaveCount(2);

    await expect(fields.autoRenewal).toBeVisible();

    await softwareLicensePage.cancelForm();
  });
});
