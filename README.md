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
<<<<<<< HEAD
npx playwright test --list
```

A full test execution has not been recorded in this status update. Running the suite requires access to the configured QA environment and valid authentication data.
=======
npm ci
npx playwright install
```

For a local development install when `package-lock.json` has changed or is
not available, use `npm install` instead. CI uses `npm ci` to install the
locked dependency versions.

## Configuration

The default environment is configured in `config/environments.js`.

Supported environment variables:

| Variable | Purpose |
| --- | --- |
| `TEST_ENV` | Selects a configured environment |
| `BASE_URL` | Overrides the configured base URL |
| `TEST_USER_EMAIL` | Overrides the test login email |
| `TEST_USER_PASSWORD` | Overrides the test login password |

Credentials are resolved by `config/credentials.js`. Keep credentials outside
source control when running in CI or against shared environments.

For local runs, set the credentials before executing the suite:

```powershell
$env:TEST_USER_EMAIL = "your-test-user@example.com"
$env:TEST_USER_PASSWORD = "your-password"
```

If these variables are not set, the runner falls back to
`test-data/loginData.json`. The authentication setup project creates
`auth/auth.json` for the dependent authenticated projects; this file is
generated locally and must not contain credentials committed to the repository.

## Framework Structure

```text
Playwright/
├── config/              # Environment and credential configuration
├── constants/           # URLs and shared constants
├── fixtures/            # Reusable Playwright fixtures
├── pages/               # Page objects and reusable UI actions
├── test-data/           # Non-secret test data
├── tests/               # Test specifications grouped by module
├── auth/                # Saved authentication storage state
├── screenshots/         # Baseline and diagnostic screenshots
├── test-results/        # Playwright execution artifacts
├── playwright-report/   # HTML report output
└── allure-results/      # Allure result files
```

## Current Coverage

The current focused scope contains **87 executable end-to-end tests** across 8 test suites and 7 Playwright projects.

| Area | Test file | Tests | Current coverage |
| --- | --- | ---: | --- |
| Login | `tests/authentication/login.spec.js` | 19 | Form controls, password type, invalid credentials and error content, error clearing, Enter-key submission, navigation, protected-route redirects, email casing, refresh persistence, whitespace handling, mobile layout, and keyboard focus |
| Logout | `tests/authentication/logout.spec.js` | 7 | Cancel/confirm logout, client session cleanup, logout from Inventory, multi-tab invalidation, bookmarked URL protection, redirect to login, and session protection after logout |
| Dashboard | `tests/dashboard/dashboard.spec.js` | 1 | Dashboard navigation, asset/request cards, notifications, and dashboard links |
| Profile | `tests/profile/profile.spec.js` | 1 | Profile page rendering, user details display, and navigation integrity |
| Technical assets | `tests/inventory/technical-asset.spec.js` | 6 | Table rendering, filters, search, pagination, details, edit form, history, add form, template download, and upload control |
| Software licenses | `tests/inventory/software-license.spec.js` | 9 | Table rendering, filter selection, search, pagination, view/edit dialog forms, add-license modal, table header sorting, empty search state, keyboard accessibility, and viewport responsiveness |
| Infrastructure assets | `tests/inventory/infrastructure-asset.spec.js` | 5 | Table rendering, pagination, rows per page selector, view/edit asset dialog, and add infrastructure asset modal form |
| User Management | `tests/user-management/user-management.spec.js` | 39 | User list and card details, name and employee ID search, department and location filters, combined filtering, user actions, delete cancellation, refresh persistence, and control visibility |

`tests/inventory/inventory.spec.js` is reserved for broader Inventory scenarios
and currently contains no executable tests. Other module specifications are
outside the current automation scope.

Authenticated projects run in dependency order: `setup`, `login`, `dashboard`,
`profile`, `inventory`, `user-management`, and `logout`. A failure in an
upstream project prevents its dependent projects from running.

## Software License Coverage

### Covered test cases

| Scenario | Test type | Status |
| --- | --- | --- |
| Software Licenses table renders with required columns and visible rows | Functional / UI E2E | Covered |
| Software and status filters can be selected and applied | Functional / UI E2E | Covered |
| Search by a valid license code returns the matching record | Functional / Positive | Covered |
| Search by a non-existent code returns zero matching records / empty state | Functional / Negative | Covered |
| Rows-per-page selector and pagination controls behave safely | Functional / Boundary | Covered |
| License details dialog opens and displays expected metadata | Functional / UI E2E | Covered |
| Edit form opens with the expected fields and Save/Update actions | Functional / UI E2E | Covered |
| Add License modal opens with supported fields | Functional / UI E2E | Covered |
| Verify table sorting and column order behavior | Functional / UI E2E | Covered |
| Test empty-state behavior when no software licenses match search | Functional / UX | Covered |
| Confirm keyboard accessibility and tab navigation trapped in dialog forms | Accessibility / UI | Covered |
| Responsive layout checks across mobile, tablet, and desktop viewports | UI / Responsiveness | Covered |

### Uncovered or possible test cases

| Scenario | Possible test type | Status |
| --- | --- | --- |
| Add a valid license and save successfully | Functional / Happy-path E2E | Uncovered |
| Edit a license and verify the updated values persist | Functional / Regression | Uncovered |
| Validate required fields when saving an empty or incomplete license record | Negative / Validation | Uncovered |
| Prevent duplicate software or duplicate license key entries | Negative / Business-rule validation | Uncovered |
| Validate expiry-date logic for active, expiring soon, and expired licenses | Business logic / Boundary | Uncovered |
| Confirm status transitions such as `In Use`, `Expired`, and `Unused` | Functional / State validation | Uncovered |
| Validate access restrictions for users without permission to manage licenses | Security / Role-based access | Uncovered |
| Verify API or backend contract errors during create/edit actions | Integration / API | Uncovered |

### Authentication Scenarios

The authentication suite covers:

1. Required login controls and input types.
2. Empty form submission.
3. Invalid email format.
4. Invalid email and password.
5. Successful login and dashboard access.
6. Password visibility toggle while preserving the value.
7. Login using Enter from the email or password field.
8. Uppercase, mixed-case, and lowercase email variants.
9. Dashboard redirect and dashboard content.
10. Session persistence after refresh.
11. Leading/trailing email whitespace and internal whitespace validation.
12. Email autofocus and Tab navigation to the password field.
13. Logout cancellation.
14. Logout confirmation and redirect to `/login`.
15. Protection against restoring a session after logout.

### Dashboard Scenarios

- Verify dashboard navigation and primary dashboard cards.
- Verify asset, request, and notification information.
- Verify dashboard navigation to profile and request-related views.

### Technical Asset Scenarios

- Verify the asset table, search, filters, and pagination.
- Open and close asset details.
- Validate edit fields and Save/Cancel controls.
- Open asset history and verify history content.
- Open and cancel the add-asset form.
- Download the Excel template and enable upload after selecting a file.

### User Management Scenarios

- Verify the User Management page, user list, and user card details.
- Search users by name and employee ID, including empty, invalid, whitespace,
  special-character, numeric, case, and long inputs.
- Filter users by department and location, including combined filter and search
  scenarios.
- Verify View, Edit, Assets, and Delete actions, including delete cancellation.
- Verify refresh persistence, URL, control visibility, and non-blank user details.

## Authentication Coverage Status

### Covered and automated

- Login form controls and password field type.
- Valid, invalid, empty, malformed, whitespace, and keyboard-submitted login
  flows.
- Invalid-credential message content and clearing after a new interaction.
- Password visibility behavior.
- Dashboard redirect, refresh persistence, browser navigation, mobile layout,
  and protected-route redirects.
- Logout cancellation and confirmation.
- Logout from Dashboard and Inventory.
- Client storage cleanup, authentication-cookie cleanup, multi-tab
  invalidation, and bookmarked dashboard protection.

### Missing or pending application support

- API 401/403 assertions after logout: no stable protected API endpoint or
  documented request contract is currently defined in the project.
- Explicit browser back-button validation after logout: the current suite
  covers bookmarked URL and direct protected-route access, but not a dedicated
  history-entry scenario.
- Broader Inventory coverage: `tests/inventory/inventory.spec.js` is currently
  empty; Technical Assets coverage is implemented separately.

### Not currently applicable to automation

- Remember Me: the login form does not expose a Remember Me control, so its
  test is conditionally skipped.
- Forgot Password: the login form does not expose a Forgot Password link, so
  its test is conditionally skipped.
- Cookie-count equals zero after logout: the application retains
  non-authentication cookies; automation validates authentication-cookie
  removal instead of incorrectly requiring every cookie to disappear.
- Authentication behavior for external identity providers, email delivery, or
  server-side infrastructure cannot be validated as a deterministic UI test
  without test doubles or service-level contracts.

## Known QA Limitations

The following requirements are implemented as tests but currently expose
application behavior in the QA environment:

- Uppercase and mixed-case variants of a valid email are rejected.
- The email field is not automatically focused when the login page loads.

These checks remain in the suite as expected failures so that the test run
continues to identify the defects and automatically reports when the
application behavior is corrected.

## Test Reliability

The framework uses:

- Page objects to separate selectors and UI actions from test assertions.
- Clean browser contexts for authentication tests.
- Reusable authenticated storage state for non-authentication tests.
- Explicit URL, visibility, content, and state assertions.
- Failure screenshots, videos, and traces for diagnostics.

The latest authentication run executed 28 tests: **26 passed and 2 skipped**.
The skipped tests are the conditional Remember Me and Forgot Password checks
because those controls are not present in the current application. The two
existing QA defect checks for mixed-case email handling and email autofocus
remain expected failures when the application exposes those behaviors.
>>>>>>> 0251848 (Simplified inventory tests for better reliability and readability.)

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

<<<<<<< HEAD
- Authentication state is read from `auth/auth.json` for authenticated tests.
- Test data is stored under `test-data/`.
- Generated output is written to `playwright-report/`, `test-results/`, and `allure-results/`.
- The current branch is `development`.
=======
```bash
npx playwright test tests/authentication tests/dashboard tests/inventory tests/user-management
```

Run only the implemented Technical Assets tests:

```bash
npx playwright test tests/inventory/technical-asset.spec.js
```

Run only the User Management tests:

```bash
npx playwright test tests/user-management/user-management.spec.js
```

Run one specification:

```bash
npx playwright test tests/authentication/login.spec.js
```

Run with a specific project:

```bash
npx playwright test tests/authentication/login.spec.js --project=login
```

Run the ESLint checks:

```bash
npx eslint .
```

ESLint uses `eslint.config.js` with the recommended JavaScript rules and
Node.js/browser globals. Generated output and local authentication state,
including `node_modules/`, `test-results/`, `playwright-report/`,
`allure-results/`, `screenshots/`, `dist/`, and `auth/`, are excluded from
linting.

Open the HTML report:

```bash
npm run report
```

Generate selectors and flows interactively:

```bash
npm run codegen
```

## Reporting and Diagnostics

Test output is generated in the following locations:

- `playwright-report/` - HTML report
- `allure-results/` - Allure result files
- `test-results/` - Screenshots, videos, traces, and failure context
- `screenshots/` - Saved application screenshots

## CI/CD

The GitHub Actions workflow is located at
`.github/workflows/playwright.yml`. It installs dependencies and browsers,
executes the Playwright suite, and uploads the HTML report as a workflow
artifact.

## Future Coverage and Improvements

The following work is planned to expand coverage and improve maintainability:

### Application coverage

- Add complete positive and negative coverage for Asset Management.
- Implement Role Management workflows.
- Cover Compliance, Configurations, and Vault modules.
- Cover Request Approvals, Request Tracker, HR Requests, and Incident Reports.
- Cover Employee Support and Purchase Module workflows.
- Add authorization and role-based access checks.
- Add API-assisted setup and data cleanup where appropriate.

### Quality and resilience

- Add cross-browser coverage for Firefox and WebKit.
- Add responsive and viewport-specific checks.
- Add accessibility checks for critical pages and forms.
- Add visual regression checks for stable, high-value screens.
- Add richer Allure metadata, trends, and stakeholder summaries.
- Improve environment-specific configuration for staging and production.
- Add controlled test-data creation and cleanup.
- Track and remove expected failures when QA defects are resolved.

## Contribution Guidelines

New tests should:

1. Follow the existing Page Object Model structure.
2. Reuse fixtures, constants, and test data instead of duplicating selectors.
3. Use stable user-facing locators where possible.
4. Include clear assertions for the expected business behavior.
5. Avoid committing credentials, generated reports, or temporary artifacts.
6. Run the relevant module tests before submitting changes.
>>>>>>> 0251848 (Simplified inventory tests for better reliability and readability.)
