# Inventory Playwright Automation

End-to-end automation framework for the Inventory application using Playwright and JavaScript.

**Target Application:** https://inventoryqa.techversantinfotech.com  
**Test Environment:** QA (configurable for staging/production)

---

## Project Overview

This repository contains a comprehensive Playwright-based automation suite for testing the Inventory application. The framework follows the **Page Object Model (POM)** pattern and supports cross-browser testing across Chrome, Firefox, and Safari.

| Metric | Count |
|--------|-------|
| **Test Modules** | 16 |
| **Test Files** | 20 |
| **Page Objects** | 30 |
| **Total Tests** | 125 |
| **Smoke Tests** | 6 |

---

## Test Modules

| Module | Status | Description |
|--------|--------|-------------|
| `authentication` | ✅ Active | Login, logout, form validation |
| `dashboard` | ✅ Active | Dashboard navigation and display |
| `inventory` | ✅ Active | Technical assets, software licenses, infrastructure assets |
| `user-management` | ✅ Active | User CRUD operations |
| `asset-management` | ✅ Active | Asset tracking and management |
| `profile` | ✅ Active | User profile management |
| `request-approvals` | ✅ Active | Approval workflow tests |
| `request-tracker` | ✅ Active | Request tracking functionality |
| `role-management` | ✅ Active | Role and permission tests |
| `hr-requests` | ✅ Active | HR request handling |
| `employee-support` | ✅ Active | Employee support features |
| `incident-reports` | ✅ Active | Incident reporting workflow |
| `configurations` | ✅ Active | System configuration tests |
| `compliance` | ✅ Active | Compliance feature tests |
| `vault` | ✅ Active | Secure vault functionality |
| `purchase-module` | ✅ Active | Purchase workflow tests |

---

## Quick Start

### Prerequisites

- **Node.js:** v18+ (v24.18.0 recommended)
- **npm:** v10+ (v12.0.2 installed)
- **Browser binaries:** Chromium, Firefox, WebKit

### Installation

```bash
# Clone the repository
git clone https://github.com/Abilash67/Inventory_PlaywrightAutomation.git
cd Inventory_PlaywrightAutomation

# Install dependencies
npm install

# Install browser binaries
npx playwright install --with-deps
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visual browser)
npm run test:headed

# Run only smoke tests
npx playwright test --grep "@smoke"

# Run specific module tests
npm run test:authentication
npm run test:inventory

# Run specific test file
npx playwright test tests/authentication/login.spec.js

# Open HTML report
npm run report
```

---

## Project Structure

```
Playwright/
├── pages/                    # Page Object Model
│   ├── Common/              # BasePage, NavigationPage, HeaderPage
│   ├── authentication/      # Login, logout page objects
│   ├── dashboard/           # Dashboard page objects
│   ├── inventory/           # Inventory page objects
│   │   ├── InventoryPage.js
│   │   ├── TechnicalAssetPage.js
│   │   ├── SoftwareLicensePage.js
│   │   └── InfrastructureAssetPage.js
│   └── ...                  # Other module page objects
├── tests/                   # Test specifications
│   ├── authentication/
│   ├── dashboard/
│   ├── inventory/
│   │   ├── technical-asset.spec.js
│   │   ├── software-license.spec.js
│   │   └── infrastructure-asset.spec.js
│   └── ...                  # Other test files
├── fixtures/                # Test fixtures
│   └── appFixtures.js       # Shared page object fixtures
├── config/                  # Configuration
│   ├── environments.js      # Environment configs
│   ├── credentials.js       # Test credentials
│   ├── qa.config.js
│   ├── staging.config.js
│   └── production.config.js
├── constants/               # Constants
│   ├── urls.js             # Application URLs
│   ├── messages.js         # Application messages
│   └── testConstants.js    # Test constants
├── test-data/              # Test data
│   ├── loginData.json
│   ├── inventoryData.json
│   ├── technical-asset.json
│   └── ...
├── docs/                   # Documentation
│   ├── FRAMEWORK_DESIGN.md
│   ├── TEST_STRATEGY.md
│   ├── TEST_SCENARIOS.md
│   └── e2e-compatibility-audit.md
├── playwright.config.js    # Playwright configuration
├── package.json
└── README.md
```

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TEST_ENV` | Environment: `qa`, `staging`, `production` | `qa` |
| `BASE_URL` | Override base URL | — |
| `TEST_USER_EMAIL` | Login email | From credentials.js |
| `TEST_USER_PASSWORD` | Login password | From credentials.js |
| `HEADLESS` | Run in headless mode | `true` |
| `CI` | Enables 2 retries, forbids test.only | `false` |

### Environment Configuration

The framework supports multiple environments:

- **QA:** `https://inventoryqa.techversantinfotech.com`
- **Staging:** Configurable
- **Production:** Configurable

---

## Playwright Projects

Tests run in dependency order via project configuration:

| Project | Browser | Dependencies |
|---------|---------|--------------|
| `setup` | All | — |
| `login-*` | Chrome/Firefox/Safari | setup |
| `dashboard-*` | Chrome/Firefox/Safari | setup |
| `inventory-*` | Chrome/Firefox/Safari | setup |
| `user-management-*` | Chrome/Firefox/Safari | setup |
| `logout-*` | Chrome/Firefox/Safari | setup |

---

## Reporting

### HTML Report

```bash
npm run report
```

Opens the Playwright HTML report showing test results, screenshots, and traces.

### Allure Report

Allure reports are generated in `allure-results/`. To view:

```bash
# Generate Allure report
npx allure generate allure-results --clean

# Open Allure report
npx allure open
```

### Artifacts on Failure

When a test fails, the following artifacts are captured:

- **Screenshot:** `only-on-failure`
- **Video:** `retain-on-failure`
- **Trace:** `retain-on-failure` (viewable with Playwright Trace Viewer)

---

## Key Patterns

### Page Object Model

Tests use the Page Object Model pattern. Each application module has a corresponding page object:

```javascript
// Example usage
const { test, expect } = require("../../fixtures/appFixtures");

test("displays the Technical Assets table", async ({ technicalAssetPage }) => {
  await technicalAssetPage.verifyTechnicalAssetTable();
});
```

### Stable Locators

```javascript
// Good - stable position
this.email = page.locator("input").nth(0);

// Avoid - changes on state toggle
this.password = page.locator("input[type="password"]");
```

### Force Click for Cross-Browser

Firefox may timeout on click actions even when elements are visible. Use `{ force: true }`:

```javascript
await this.loginButton.click({ force: true });
```

### Test Fixtures

`fixtures/appFixtures.js` provides reusable page objects:

```javascript
test.beforeEach(async ({ page, inventoryPage }) => {
  await inventoryPage.navigateToInventory();
});
```

---

## Test Data

Test data is managed in `test-data/` directory:

| File | Purpose |
|------|---------|
| `loginData.json` | Login credentials |
| `inventoryData.json` | Inventory filter options |
| `technical-asset.json` | Technical asset test data |
| `userData.json` | User management test data |
| `dashboardData.json` | Dashboard test data |

---

## Documentation

| Document | Description |
|----------|-------------|
| `CLAUDE.md` | Claude Code guidance |
| `docs/e2e-compatibility-audit.md` | TesterArmy e2e framework audit |
| `docs/TEST_STRATEGY.md` | Test strategy documentation |
| `docs/TEST_SCENARIOS.md` | Test scenario definitions |
| `docs/FRAMEWORK_DESIGN.md` | Framework architecture |
| `docs/CODING_STANDARDS.md` | Coding guidelines |
| `test-data/inventory-test-cases.md` | 57 inventory test cases |
| `test-data/technical-assets-search-filter-tests.md` | 31 search/filter test cases |

---

## Development

### Generate Page Objects

Use Playwright codegen to generate page objects from the UI:

```bash
npm run codegen
```

### Code Quality

ESLint is configured for code quality checks:

```bash
npx eslint .
```

---

## Browser Support

| Browser | Status | Notes |
|---------|--------|-------|
| Chromium | ✅ Tested | Primary test browser |
| Firefox | ✅ Tested | Uses `force: true` for clicks |
| WebKit | ✅ Tested | Safari support |

---

## Git Workflow

- **Branch:** `development` (current)
- **Main branch:** `main`
- **Naming:** Descriptive commit messages with Co-Author attribution

---

## Known Issues

- Email case sensitivity: QA currently rejects uppercase email variants
- Firefox click timeouts: Use `{ force: true }` for reliable cross-browser execution

---

## Roadmap

- [ ] Expand smoke test coverage across all modules
- [ ] Add API integration tests
- [ ] Implement data-driven testing
- [ ] Add visual regression testing
- [ ] Integrate with CI/CD pipelines
- [ ] Add performance testing
- [ ] Improve environment-specific configuration
- [ ] Add controlled test-data creation and cleanup

---

## License

ISC

---

## Contributing

1. Follow the existing Page Object Model structure
2. Reuse fixtures, constants, and test data instead of duplicating selectors
3. Use stable, user-facing locators where possible
4. Wait for stable/settled results after async operations
5. Mark critical smoke tests with `@smoke` tag
6. Run relevant module tests before submitting changes
7. Do not commit credentials, generated reports, or temporary artifacts
