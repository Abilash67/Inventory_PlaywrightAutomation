# Inventory Playwright Automation

## Current Status

This repository contains a Playwright-based end-to-end automation framework for the Inventory application.

### Implemented

- 17 test specification files covering authentication, dashboard, profile, inventory, asset management, compliance, configurations, employee support, HR requests, incident reports, purchase workflows, approvals, request tracking, role management, user management, and vault workflows.
- 21 page-object files organized by application feature.
- Shared fixtures, utilities, constants, environment configuration, and JSON test data.
- Authentication setup with a reusable `auth/auth.json` storage state.
- Separate Playwright projects for authentication setup, authenticated tests, and authentication tests.
- Failure screenshots, videos, traces, HTML reports, and Allure results configured.

### Test Discovery

The current configuration discovers **44 tests in 6 files**:

- Authentication setup: 1 test
- Authentication: 2 tests
- Dashboard: 1 test
- Profile: 1 test
- User management: 39 tests

The remaining feature spec files are present in the repository but currently do not contribute tests to the discovered Playwright count.

### Configuration

- Browser: Chromium
- Base URL: `https://inventoryqa.techversantinfotech.com`
- Test directory: `tests/`
- Default test timeout: 60 seconds
- Navigation timeout: 30 seconds
- Headless mode: disabled
- Reports: Playwright HTML, list reporter, and Allure

## Verification

The latest repository check confirmed that Playwright can load the configuration and enumerate all 44 currently discoverable tests with:

```bash
npx playwright test --list
```

A full test execution has not been recorded in this status update. Running the suite requires access to the configured QA environment and valid authentication data.

## Running Tests

Because `package.json` currently has no test scripts, run Playwright directly:

```bash
npx playwright test
```

Useful commands:

```bash
npx playwright test --list
npx playwright test --headed
npx playwright show-report
```

On Windows PowerShell, use `cmd /c` if the npm or npx execution policy blocks the command:

```powershell
cmd /c "npx playwright test"
```

## Repository Notes

- Authentication state is read from `auth/auth.json` for authenticated tests.
- Test data is stored under `test-data/`.
- Generated output is written to `playwright-report/`, `test-results/`, and `allure-results/`.
- The current branch is `development`.
