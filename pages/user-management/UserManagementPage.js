class UserManagementPage {

    constructor(page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'User Management',
            exact: true
        });
        this.searchInput = page.getByPlaceholder(/Search Users/i);
        this.departmentDropdown = page.getByText('Select Department', { exact: true });
        this.locationDropdown = page.getByText('Select Location', { exact: true });
        this.userCards = page.locator('.userCard:visible');
        this.viewButtons = page.getByRole('button', { name: /View/i });
        this.editButtons = page.getByRole('button', { name: /Edit/i });
        this.assetsButtons = page.getByRole('button', { name: /Assets/i });
        this.deleteButtons = page.getByRole('button', { name: /Delete/i });
    }

    async waitForListUpdate() {
        await this.page.waitForTimeout(500);
    }

    async goto() {
        let navigationError;

        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                await this.page.goto('/users', {
                    waitUntil: 'commit'
                });
                navigationError = undefined;
                break;
            } catch (error) {
                navigationError = error;
                await this.page.waitForTimeout(1000);
            }
        }

        if (navigationError) {
            throw navigationError;
        }

        await this.pageTitle.waitFor({
            state: 'visible'
        });
        await this.searchInput.waitFor({ state: 'visible' });
        await this.waitForListUpdate();
    }

    async searchUser(value) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(value);
        await this.waitForListUpdate();
    }

    async clearSearch() {
        await this.searchInput.fill('');
        await this.waitForListUpdate();
    }

    async getUserCount() {
        await this.waitForListUpdate();
        return await this.viewButtons.count();
    }

    getUserCard(userName) {
        const name = this.page.getByRole('heading', {
            name: userName,
            exact: true
        });

        return this.userCards.filter({ has: name }).first();
    }

    async userExists(userName) {
        return await this.getUserCard(userName).count() > 0;
    }

    async getUserDetails(userName) {
        const card = this.getUserCard(userName);
        await card.waitFor({ state: 'visible' });
        return await card.innerText();
    }

    async clickCardAction(userName, action) {
        const card = this.getUserCard(userName);
        await card.waitFor({ state: 'visible' });
        await card.getByRole('button', { name: new RegExp(action, 'i') }).click();
    }

    async viewUser(userName) {
        await this.clickCardAction(userName, 'View');
    }

    async editUser(userName) {
        await this.clickCardAction(userName, 'Edit');
    }

    async viewAssets(userName) {
        await this.clickCardAction(userName, 'Assets');
    }

    async deleteUser(userName) {
        await this.clickCardAction(userName, 'Delete');
    }

    async hasCardAction(userName, action) {
        const card = this.getUserCard(userName);
        return await card.getByRole('button', { name: new RegExp(action, 'i') }).count() > 0;
    }

    async hasViewButton(userName) {
        return await this.hasCardAction(userName, 'View');
    }

    async hasEditButton(userName) {
        return await this.hasCardAction(userName, 'Edit');
    }

    async hasAssetsButton(userName) {
        return await this.hasCardAction(userName, 'Assets');
    }

    async hasDeleteButton(userName) {
        return await this.hasCardAction(userName, 'Delete');
    }


    async selectFilter(dropdown, value) {
        await dropdown.click();

        await this.page.getByText(value, { exact: true }).last().click();
        await this.waitForListUpdate();
    }

    async selectDepartment(department) {
        await this.selectFilter(this.departmentDropdown, department);
    }

    async selectLocation(location) {
        await this.selectFilter(this.locationDropdown, location);
    }


    async clearLocation() {

        await this.page.reload({ waitUntil: 'commit' });
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.waitForListUpdate();
    }


    // =====================================================
    // CLEAR SEARCH
    // =====================================================

    async resetSearch() {
        await this.searchInput.fill('');
        await this.waitForListUpdate();
    }
}


module.exports = {
    UserManagementPage
};