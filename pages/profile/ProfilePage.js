const { expect } = require("@playwright/test");

class ProfilePage {
  constructor(page) {
    this.page = page;

    // Page Title
    this.profileTitle = page.getByRole("heading", {
      name: "Profile",
      level: 3,
    });

    // Profile Details
    this.userName = page.getByRole("heading", {
      name: "Super Admin",
      level: 3,
    });

    this.email = page.getByText("superadmin@example.com", {
      exact: true,
    });

    this.employeeId = page.locator("p").filter({
      hasText: "Emp ID",
    });

    this.designation = page.locator("p").filter({
      hasText: "Designation",
    });

    this.location = page.locator("p").filter({
      hasText: "Location",
    });

    this.department = page.locator("p").filter({
      hasText: "Department",
    });

    this.role = page.locator("p").filter({
      hasText: "Role",
    });

    this.reportingManager = page.locator("p").filter({
      hasText: "Reporting Manager",
    });

    this.doj = page.locator("p").filter({
      hasText: "DOJ",
    });

    // Assets Section
    this.assetsTitle = page.getByRole("heading", {
      name: "Your Assets",
      level: 3,
    });
  }

  async verifyProfileLoaded() {
    await expect(this.profileTitle).toBeVisible({
      timeout: 10000,
    });
  }

  async verifyProfileDetails() {
    await expect(this.userName).toBeVisible();
    await expect(this.email).toBeVisible();
    await expect(this.employeeId).toBeVisible();
    await expect(this.designation).toBeVisible();
    await expect(this.location).toBeVisible();
    await expect(this.department).toBeVisible();
    await expect(this.role).toBeVisible();
    await expect(this.reportingManager).toBeVisible();
    await expect(this.doj).toBeVisible();
  }

  async verifyAssetsSection() {
    await expect(this.assetsTitle).toBeVisible();
  }
}

module.exports = ProfilePage;
