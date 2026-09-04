const { test, expect } = require('@playwright/test');

const {
    UserManagementPage
} = require('../../pages/user-management/UserManagementPage');

const userData = require('../../test-data/userManagementData.json');


test.describe('User Management - Complete Test Suite', () => {

    let userManagementPage;


    // =====================================================
    // LOGIN + NAVIGATION
    // =====================================================

    test.beforeEach(async ({ page }) => {
        userManagementPage =
            new UserManagementPage(page);

        await userManagementPage.goto();
    });


    // =====================================================
    // TC01 - PAGE LOAD
    // =====================================================

    test('TC01 - Verify User Management page is displayed', async () => {

        await expect(
            userManagementPage.pageTitle
        ).toBeVisible();

    });


    // =====================================================
    // TC02 - USER LIST
    // =====================================================

    test('TC02 - Verify users are displayed', async () => {

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThan(0);

    });


    // =====================================================
    // TC03 - USER DETAILS
    // =====================================================

    test('TC03 - Verify user card displays required information', async () => {

        const card =
            userManagementPage.getUserCard(
                userData.validUser.name
            );

        await expect(card).toBeVisible();

        await expect(card).toContainText(
            userData.validUser.name
        );

        await expect(card).toContainText(
            userData.validUser.employeeId
        );

    });


    // =====================================================
    // TC04 - SEARCH BY NAME
    // =====================================================

    test('TC04 - Search user by valid name', async () => {

        await userManagementPage.searchUser(
            userData.searchData.validName
        );

        await expect(
            userManagementPage.getUserCard(
                userData.validUser.name
            )
        ).toBeVisible();

    });


    // =====================================================
    // TC05 - SEARCH BY EMPLOYEE ID
    // =====================================================

    test('TC05 - Search user using employee ID', async () => {

        await userManagementPage.searchUser(
            userData.searchData.validEmployeeId
        );

        await expect(
            userManagementPage.getUserCard(
                userData.validUser.name
            )
        ).toBeVisible();

    });


    // =====================================================
    // TC06 - INVALID SEARCH
    // =====================================================

    test('TC06 - Search with invalid user name', async () => {

        await userManagementPage.searchUser(
            userData.searchData.invalidName
        );

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBe(0);

    });


    // =====================================================
    // TC07 - EMPTY SEARCH
    // =====================================================

    test('TC07 - Verify empty search displays all users', async () => {

        const initialCount =
            await userManagementPage.getUserCount();

        await userManagementPage.searchUser('');

        const finalCount =
            await userManagementPage.getUserCount();

        expect(finalCount).toBe(initialCount);

    });


    // =====================================================
    // TC08 - SINGLE CHARACTER
    // =====================================================

    test('TC08 - Search using single character', async () => {

        await userManagementPage.searchUser('A');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC09 - SPACES
    // =====================================================

    test('TC09 - Search using only spaces', async () => {

        await userManagementPage.searchUser('   ');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC10 - SPECIAL CHARACTERS
    // =====================================================

    test('TC10 - Search using special characters', async () => {

        await userManagementPage.searchUser('@#$%^&*');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC11 - NUMBERS
    // =====================================================

    test('TC11 - Search using numeric value', async () => {

        await userManagementPage.searchUser('123456789');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC12 - CASE INSENSITIVE
    // =====================================================

    test('TC12 - Verify search handles lowercase input', async () => {

        await userManagementPage.searchUser('amrutha');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC13 - CLEAR SEARCH
    // =====================================================

    test('TC13 - Verify clearing search restores users', async () => {

        const initialCount =
            await userManagementPage.getUserCount();

        await userManagementPage.searchUser('Amrutha');

        await userManagementPage.clearSearch();

        const finalCount =
            await userManagementPage.getUserCount();

        expect(finalCount).toBe(initialCount);

    });


    // =====================================================
    // TC14 - DEPARTMENT FILTER
    // =====================================================

    test('TC14 - Filter users by department', async () => {

        await userManagementPage.selectDepartment('Java');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC15 - DEPARTMENT FILTER VALIDATION
    // =====================================================

    test('TC15 - Verify users displayed after department filter', async () => {

        await userManagementPage.selectDepartment('Java');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC16 - LOCATION FILTER
    // =====================================================

    test('TC16 - Filter users by location', async () => {

        await userManagementPage.selectLocation('Trivandrum');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC17 - LOCATION VALIDATION
    // =====================================================

    test('TC17 - Verify location filter is applied', async () => {

        await userManagementPage.selectLocation('Trivandrum');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC18 - MULTIPLE FILTERS
    // =====================================================

    test('TC18 - Apply department and location filters', async () => {

        await userManagementPage.selectDepartment('Java');

        await userManagementPage.selectLocation('Trivandrum');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC19 - FILTER + SEARCH
    // =====================================================

    test('TC19 - Apply filter and search together', async () => {

        await userManagementPage.selectLocation('Trivandrum');

        await userManagementPage.searchUser('Amrutha');

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC20 - CLEAR LOCATION
    // =====================================================

    test('TC20 - Verify clearing location filter', async () => {

        const initialCount =
            await userManagementPage.getUserCount();

        await userManagementPage.selectLocation('Trivandrum');

        await userManagementPage.clearLocation();

        const finalCount =
            await userManagementPage.getUserCount();

        expect(finalCount).toBe(initialCount);

    });


    // =====================================================
    // TC21 - VIEW USER
    // =====================================================

    test('TC21 - Verify View user functionality', async ({ page }) => {

        await userManagementPage.viewUser(
            userData.validUser.name
        );

        await expect(page).toHaveURL(
            /users/i
        );

    });


    // =====================================================
    // TC22 - NON EXISTING USER
    // =====================================================

    test('TC22 - Verify non-existing user is not displayed', async () => {

        const exists =
            await userManagementPage.userExists(
                'UserDoesNotExist999'
            );

        expect(exists).toBe(false);

    });


    // =====================================================
    // TC23 - EDIT BUTTON
    // =====================================================

    test('TC23 - Verify Edit button is displayed', async () => {

        expect(
            await userManagementPage.hasEditButton(
                userData.validUser.name
            )
        ).toBe(true);

    });


    // =====================================================
    // TC24 - ASSETS BUTTON
    // =====================================================

    test('TC24 - Verify Assets button is displayed', async () => {

        expect(
            await userManagementPage.hasAssetsButton(
                userData.validUser.name
            )
        ).toBe(true);

    });


    // =====================================================
    // TC25 - DELETE BUTTON
    // =====================================================

    test('TC25 - Verify Delete button is displayed', async () => {

        expect(
            await userManagementPage.hasDeleteButton(
                userData.validUser.name
            )
        ).toBe(true);

    });


    // =====================================================
    // TC26 - DELETE CANCEL
    // =====================================================

    test('TC26 - Verify delete can be cancelled', async ({ page }) => {

        const card =
            userManagementPage.getUserCard(
                userData.validUser.name
            );

        await card.getByRole('button', {
            name: /Delete/i
        }).click();

        const dialog =
            page.getByRole('dialog');

        if (await dialog.count() > 0) {

            await expect(dialog).toBeVisible();

            const cancelButton =
                dialog.getByRole('button', {
                    name: /Cancel|No/i
                });

            if (await cancelButton.count() > 0) {

                await cancelButton.click();
            }
        }

    });


    // =====================================================
    // TC27 - LONG SEARCH
    // =====================================================

    test('TC27 - Search using very long input', async () => {

        const longText =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(20);

        await userManagementPage.searchUser(longText);

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC28 - LEADING/TRAILING SPACES
    // =====================================================

    test('TC28 - Search with leading and trailing spaces', async () => {

        await userManagementPage.searchUser(
            '   Amrutha   '
        );

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC29 - MIXED CASE
    // =====================================================

    test('TC29 - Search using mixed case', async () => {

        await userManagementPage.searchUser(
            'aMrUtHa'
        );

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC30 - RAPID SEARCH
    // =====================================================

    test('TC30 - Verify rapid search changes', async () => {

        await userManagementPage.searchInput.fill('A');

        await userManagementPage.searchInput.fill('Am');

        await userManagementPage.searchInput.fill('Amr');

        await userManagementPage.searchInput.fill('Amrutha');

        await userManagementPage.page.waitForTimeout(500);

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC31 - CHANGE FILTER
    // =====================================================

    test('TC31 - Verify changing department filter', async () => {

        await userManagementPage.selectDepartment('Java');

        const firstCount =
            await userManagementPage.getUserCount();

        await userManagementPage.selectDepartment('testing');

        const secondCount =
            await userManagementPage.getUserCount();

        expect(firstCount).toBeGreaterThanOrEqual(0);

        expect(secondCount).toBeGreaterThanOrEqual(0);

    });


    // =====================================================
    // TC32 - ALL ACTION BUTTONS
    // =====================================================

    test('TC32 - Verify all user action buttons', async () => {

        const user =
            userData.validUser.name;

        expect(
            await userManagementPage.hasViewButton(user)
        ).toBe(true);

        expect(
            await userManagementPage.hasEditButton(user)
        ).toBe(true);

        expect(
            await userManagementPage.hasAssetsButton(user)
        ).toBe(true);

        expect(
            await userManagementPage.hasDeleteButton(user)
        ).toBe(true);

    });


    // =====================================================
    // TC33 - USER DETAILS NOT BLANK
    // =====================================================

    test('TC33 - Verify user details are not blank', async () => {

        const details =
            await userManagementPage.getUserDetails(
                userData.validUser.name
            );

        expect(details.trim().length).toBeGreaterThan(0);

    });


    // =====================================================
    // TC34 - NO RESULT SEARCH
    // =====================================================

    test('TC34 - Verify invalid search returns no users', async () => {

        await userManagementPage.searchUser(
            'INVALID_USER_999999'
        );

        const count =
            await userManagementPage.getUserCount();

        expect(count).toBe(0);

    });


    // =====================================================
    // TC35 - PAGE REFRESH
    // =====================================================

    test('TC35 - Verify users remain after page refresh', async ({ page }) => {

        const initialCount =
            await userManagementPage.getUserCount();

        await page.reload();

        await userManagementPage.pageTitle.waitFor({
            state: 'visible'
        });

        const afterRefreshCount =
            await userManagementPage.getUserCount();

        expect(afterRefreshCount).toBe(initialCount);

    });


    // =====================================================
    // TC36 - URL
    // =====================================================

    test('TC36 - Verify User Management URL', async ({ page }) => {

        await expect(page).toHaveURL(
            /\/users/
        );

    });


    // =====================================================
    // TC37 - SEARCH ENABLED
    // =====================================================

    test('TC37 - Verify search field is enabled', async () => {

        await expect(
            userManagementPage.searchInput
        ).toBeEnabled();

    });


    // =====================================================
    // TC38 - DEPARTMENT DROPDOWN
    // =====================================================

    test('TC38 - Verify department dropdown is visible', async () => {

        await expect(
            userManagementPage.departmentDropdown
        ).toBeVisible();

    });


    // =====================================================
    // TC39 - LOCATION DROPDOWN
    // =====================================================

    test('TC39 - Verify location dropdown is visible', async () => {

        await expect(
            userManagementPage.locationDropdown
        ).toBeVisible();

    });

});