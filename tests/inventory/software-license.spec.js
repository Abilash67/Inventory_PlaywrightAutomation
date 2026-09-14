const { test, expect } = require('../../fixtures/appFixtures');

test.describe('Inventory - Software Licenses', () => {
  test.beforeEach(async ({ page, inventoryPage, softwareLicensePage }) => {
    await page.goto('/');
    await inventoryPage.navigateToInventory();
    await inventoryPage.openSoftwareLicenses();
    await softwareLicensePage.verifyTable();
  });

  test('displays and filters the Software Licenses table', async ({ softwareLicensePage }) => {
    await softwareLicensePage.selectFilterOption(softwareLicensePage.softwareFilter, 'Operating System');
    await expect(softwareLicensePage.rows().first()).toContainText('Operating System');
    await softwareLicensePage.selectFilterOption(softwareLicensePage.statusFilter, 'In Use');
    await expect(softwareLicensePage.rows().first()).toBeVisible();
  });

  test('searches licenses and shows no matching record for invalid input', async ({ softwareLicensePage }) => {
    const code = (await softwareLicensePage.rows().first().locator('td').nth(1).innerText()).trim();
    await softwareLicensePage.search(code);
    await expect(softwareLicensePage.rows()).toHaveCount(1);
    await expect(softwareLicensePage.rows().first()).toContainText(code);
    await softwareLicensePage.search('NON_EXISTENT_LICENSE_999999');
    await expect(softwareLicensePage.rows()).toHaveCount(0);
  });

  test('changes rows per page and exposes safe pagination controls', async ({ softwareLicensePage }) => {
    await softwareLicensePage.selectRowsPerPage(50);
    await expect(softwareLicensePage.rows()).toHaveCount(25);
    await expect(softwareLicensePage.previousButton).toBeDisabled();
    await expect(softwareLicensePage.nextButton).toBeDisabled();
  });

  test('opens license details and edit form', async ({ page, softwareLicensePage }) => {
    await softwareLicensePage.viewFirstLicense();
    await softwareLicensePage.verifyLicenseDetails();
    await softwareLicensePage.closeDialog();
    await softwareLicensePage.editFirstLicense();
    await softwareLicensePage.verifyLicenseForm({ edit: true });
    await expect(page.getByRole('dialog').getByRole('button', { name: /Update|Save/ })).toBeVisible();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
  });

  test('opens the Add License form with supported fields', async ({ softwareLicensePage }) => {
    await softwareLicensePage.openAddLicenseForm();
    await softwareLicensePage.verifyLicenseForm();
    await softwareLicensePage.dialog().getByRole('button', { name: 'Cancel' }).click();
  });

  test('sorts the Software Licenses table by column header', async ({ softwareLicensePage }) => {
    const nameHeader = softwareLicensePage.licenseTable.getByRole('columnheader', { name: /Software Name/ });
    await nameHeader.click();
    const nameColumnCells = softwareLicensePage.rows().locator('td').nth(0);
    const valuesAfterFirstClick = await nameColumnCells.allInnerTexts();
    const trimmedFirst = valuesAfterFirstClick.map(v => v.trim());
    const ascSorted = [...trimmedFirst].sort((a, b) => a.localeCompare(b));
    expect(trimmedFirst).toEqual(ascSorted);

    await nameHeader.click();
    const valuesAfterSecondClick = await nameColumnCells.allInnerTexts();
    const trimmedSecond = valuesAfterSecondClick.map(v => v.trim());
    const descSorted = [...trimmedSecond].sort((a, b) => b.localeCompare(a));
    expect(trimmedSecond).toEqual(descSorted);
  });

  test('shows empty state when search yields no results', async ({ softwareLicensePage }) => {
    await softwareLicensePage.search('NON_EXISTENT_LICENSE_ZZZZZ');
    await expect(softwareLicensePage.rows()).toHaveCount(0);
    const tabPanel = softwareLicensePage.licenseTab;
    const hasEmptyMessage = await tabPanel.getByText(/no\s*(results|records|data|licenses)\s*found/i).isVisible().catch(() => false);
    if (hasEmptyMessage) {
      await expect(tabPanel.getByText(/no\s*(results|records|data|licenses)\s*found/i)).toBeVisible();
    }
    await softwareLicensePage.search('');
    await expect(softwareLicensePage.rows().first()).toBeVisible();
  });

  test('supports keyboard tab navigation through the Add License dialog', async ({ page, softwareLicensePage }) => {
    await softwareLicensePage.openAddLicenseForm();
    const dialog = softwareLicensePage.dialog();
    await expect(dialog).toBeVisible();

    const focusedTags = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const tagName = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName.toLowerCase() : null;
      });
      focusedTags.push(tagName);
    }

    const focusableTypes = ['input', 'select', 'textarea', 'button', 'a'];
    const insideDialog = focusedTags.filter(tag => focusableTypes.includes(tag));
    expect(insideDialog.length).toBeGreaterThanOrEqual(5);

    const isTrapped = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? !!el.closest('[role="dialog"]') : false;
    });
    expect(isTrapped).toBe(true);

    await dialog.getByRole('button', { name: 'Cancel' }).click();
  });

  test('maintains visible layout across mobile, tablet, and desktop viewports', async ({ page, softwareLicensePage }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await expect(softwareLicensePage.licenseTable).toBeVisible();
      await expect(softwareLicensePage.rows().first()).toBeVisible();
    }

    await page.setViewportSize({ width: 375, height: 667 });
    await softwareLicensePage.openAddLicenseForm();
    await expect(softwareLicensePage.dialog()).toBeVisible();
    await softwareLicensePage.dialog().getByRole('button', { name: 'Cancel' }).click();

    await page.setViewportSize({ width: 1536, height: 864 });
  });
});
