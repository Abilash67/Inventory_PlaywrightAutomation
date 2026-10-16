# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright/JavaScript end-to-end automation for the Inventory application (https://inventoryqa.techversantinfotech.com).

## Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visual browser)
npm run test:headed

# Run only smoke tests (marked with @smoke tag)
npx playwright test --grep "@smoke"

# Run specific test file
npx playwright test tests/authentication/login.spec.js

# Run specific module tests
npm run test:authentication
npm run test:inventory

# Open HTML report
npm run report

# Generate page object from UI (codegen)
npm run codegen
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| TEST_ENV | Environment: qa, staging, production |
| BASE_URL | Override base URL |
| TEST_USER_EMAIL | Login email (or use test-data/loginData.json) |
| TEST_USER_PASSWORD | Login password |
| HEADLESS | Run in headless mode |
| CI | Enables 2 retries, forbids test.only |

## Architecture

### Page Object Model (POM)

Tests use the Page Object Model pattern. Each application module has a corresponding page object in `pages/`.

### Test Fixtures

`fixtures/appFixtures.js` provides reusable page objects as fixtures:
- loginPage, dashboardPage, inventoryPage, technicalAssetPage, softwareLicensePage, infrastructureAssetPage

### Playwright Projects

Tests run in dependency order via project configuration:
1. `setup` - Authentication setup, creates auth.json
2. Feature projects (login, dashboard, inventory, etc.) - depend on setup
3. `logout-*` projects - depend on setup

### Credentials

Credentials are loaded from `config/credentials.js`, falling back to `test-data/loginData.json` if env vars are not set.

## Key Patterns

### Force Click for Cross-Browser Compatibility

Firefox may timeout on click actions even when elements are visible. Use `{ force: true }`:
```javascript
await this.loginButton.click({ force: true });
```

### Stable Locators

Avoid locators that change based on state (e.g., `input[type="password"]` changes to `text`). Use index-based or semantic locators:
```javascript
// Good - stable position
this.email = page.locator("input").nth(0);

// Avoid - changes on state toggle
this.password = page.locator("input[type="password"]");
```

### Expected Failures

Mark known issues with `test.fixme()` or `test.skip()` to track outstanding bugs.

## Contribution Guidelines

1. Follow the existing Page Object Model structure
2. Reuse fixtures, constants, and test data instead of duplicating selectors
3. Use stable, user-facing locators
4. Wait for stable/settled results after async operations
5. Mark critical smoke tests with `@smoke` tag
6. Run relevant module tests before submitting changes
