# Inventory Playwright Automation

Playwright/JavaScript end-to-end automation for the Inventory application.

## Current Status

### Implemented

- 9 active test specification files covering authentication, dashboard,
  profile, inventory (technical assets, software licenses, infrastructure
  assets), user management, and asset management.
- 8 page-object files organized by application feature.
- Shared fixtures, utilities, constants, environment configuration, and JSON
  test data.
- Authentication setup with a reusable `auth/auth.json` storage state.
- Eight Playwright projects (`setup`, `login`, `dashboard`, `profile`,
  `inventory`, `user-management`, `asset-management`, `logout`) that run in
  dependency order.
- Failure screenshots, videos, traces, HTML reports, and Allure results
  configured.
- Local retries (`retries: 1`) and single-worker execution (`workers: 1`) to
  absorb transient latency from the shared QA environment.

### Test Discovery

The current configuration discovers **121 tests in 10 files**:

| Project | Spec file | Tests |
| --- | --- | ---: |
| setup | `tests/authentication/auth.setup.js` | 1 |
| login | `tests/authentication/login.spec.js` | 19 |
| dashboard | `tests/dashboard/dashboard.spec.js` | 1 |
| profile | `tests/profile/profile.spec.js` | 1 |
| inventory | `tests/inventory/technical-asset.spec.js` | 16 |
| inventory | `tests/inventory/software-license.spec.js` | 20 |
| inventory | `tests/inventory/infrastructure-asset.spec.js` | 5 |
| user-management | `tests/user-management/user-management.spec.js` | 39 |
| asset-management | `tests/asset-management/asset-management.spec.js` | 12 |
| logout | `tests/authentication/logout.spec.js` | 7 |

`tests/inventory/inventory.spec.js` and 10 other module spec files
(`compliance`, `configurations`, `employee-support`, `hr-requests`,
`incident-reports`, `purchase-module`, `request-approvals`,
`request-tracker`, `role-management`, `vault`) exist as empty placeholders
and currently contribute no tests. See
[Future Coverage and Improvements](#future-coverage-and-improvements).

### Configuration

- Browser: Chromium
- Base URL: `https://inventoryqa.techversantinfotech.com`
- Test directory: `tests/`
- Default test timeout: 60 seconds
- Navigation timeout: 30 seconds
- Expect (assertion) timeout: 10 seconds
- Workers: 1 (both locally and in CI)
- Retries: 1 locally, 2 in CI
- Headless mode: controlled by the `HEADLESS` environment variable
- Reports: Playwright HTML, list reporter, and Allure

## Installation

```bash
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
| `HEADLESS` | Set to `true` to run browsers headless |
| `CI` | Set by CI; raises retries to 2 and forbids `.only` |

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
generated locally and must not contain credentials committed to the
repository.

## Framework Structure

```text
Playwright/
├── config/              # Environment and credential configuration
├── constants/           # URLs and shared constants
├── fixtures/            # Reusable Playwright fixtures
├── pages/               # Page objects and reusable UI actions
├── test-data/           # Non-secret test data
├── tests/                # Test specifications grouped by module
├── auth/                # Saved authentication storage state
├── screenshots/         # Baseline and diagnostic screenshots
├── test-results/        # Playwright execution artifacts
├── playwright-report/   # HTML report output
└── allure-results/      # Allure result files
```

## Current Coverage

| Area | Test file | Tests | Current coverage |
| --- | --- | ---: | --- |
| Login | `tests/authentication/login.spec.js` | 19 | Form controls, password type, invalid credentials and error content, error clearing, Enter-key submission, navigation, protected-route redirects, email casing, refresh persistence, whitespace handling, mobile layout, and keyboard focus |
| Logout | `tests/authentication/logout.spec.js` | 7 | Cancel/confirm logout, client session cleanup, logout from Inventory, multi-tab invalidation, bookmarked URL protection, redirect to login, and session protection after logout |
| Dashboard | `tests/dashboard/dashboard.spec.js` | 1 | Dashboard navigation, asset/request cards, notifications, and dashboard links |
| Profile | `tests/profile/profile.spec.js` | 1 | Profile page rendering, user details display, and navigation integrity |
| Technical assets | `tests/inventory/technical-asset.spec.js` | 16 | Table rendering, filters, search, pagination, details, edit form, history, add form, template download, and upload control |
| Software licenses | `tests/inventory/software-license.spec.js` | 20 | Table rendering, filter selection, search, pagination, view/edit dialog forms, add-license modal, table header sorting, empty search state, keyboard accessibility, and viewport responsiveness |
| Infrastructure assets | `tests/inventory/infrastructure-asset.spec.js` | 5 | Table rendering, pagination, rows per page selector, view/edit asset dialog, and add infrastructure asset modal form |
| User Management | `tests/user-management/user-management.spec.js` | 39 | User list and card details, name and employee ID search, department and location filters, combined filtering, user actions, delete cancellation, refresh persistence, and control visibility |
| Asset Management | `tests/asset-management/asset-management.spec.js` | 12 | Page load, searching a user by name, no-match handling, selecting a user to view their assigned assets, Currently Assigned / Previously Assigned tabs, clearing search, bulk-upload dialog (template download and file selection), Assign Asset dialog, and mobile layout |

Authenticated projects run in dependency order: `setup`, `login`, `dashboard`,
`profile`, `inventory`, `user-management`, `asset-management`, and `logout`.
A failure in an upstream project prevents its dependent projects from
running.

### Asset Management Scenarios

`/assets` lets an admin search for an employee by name and view or manage
the assets currently assigned to them. The suite covers:

- Page load and required controls (search box, page title).
- Searching a valid user by name and by partial name.
- Searching a name with no matches shows the "No users found" state.
- Selecting a user shows their name/employee ID heading and the
  Currently Assigned / Previously Assigned tabs.
- Currently Assigned table renders the expected columns (Asset Type, Asset
  Code, Assigned On) and row actions.
- Previously Assigned tab renders its own columns (adds Unassigned On and
  Reason to Unassign) and the empty state when a user has no history.
- Switching between tabs preserves the correct table content.
- Clearing the search input removes the suggestion list.
- The floating action button opens a "Bulk upload assigned assets" dialog
  (when no user is selected) with a sample-template download link and a
  file input that enables the Upload button once a file is chosen.
- The same button opens an "Assign to {user}" dialog once a user is
  selected.
- Cancelling either dialog leaves the assigned-assets list unchanged.
- Mobile viewport layout.

Destructive actions (actually unassigning an asset, submitting a bulk
upload, or completing an assignment) are intentionally not exercised
against the shared QA data — those dialogs are opened, verified, and
cancelled instead.

### Software License Coverage

#### Covered test cases

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
| Add, edit, and reject duplicate/invalid license records | Functional / Regression | Covered |
| Active / expired / non-expired status filtering | Business logic / Boundary | Covered |

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

Tests that deliberately submit wrong credentials are grouped at the end of
`login.spec.js`, after the tests that require a real login — clustering
several failed-login attempts immediately before a valid-credential test
was found to trip the application's own login throttling and cause an
unrelated test to fail.

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
- Filter users by department and location, including combined filter and
  search scenarios.
- Verify View, Edit, Assets, and Delete actions, including delete
  cancellation.
- Verify refresh persistence, URL, control visibility, and non-blank user
  details.

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
  covers bookmarked URL and direct protected-route access, but not a
  dedicated history-entry scenario.
- Broader Inventory coverage: `tests/inventory/inventory.spec.js` is
  currently empty; Technical Assets coverage is implemented separately.

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

These checks remain in the suite as expected failures (`test.fail`) so that
the test run continues to identify the defects and automatically reports
when the application behavior is corrected.

## Test Reliability

The framework uses:

- Page objects to separate selectors and UI actions from test assertions.
- Clean browser contexts for authentication tests.
- Reusable authenticated storage state for non-authentication tests.
- Explicit URL, visibility, content, and state assertions.
- Stability polling (wait for a result count to hold steady across two
  reads, rather than trusting the first read) after any search or filter
  action that triggers a debounced, asynchronous list update — used in
  `UserManagementPage`, `AssetManagementPage`, and `TechnicalAssetPage`.
  A plain "is anything visible yet" check can pass on the stale,
  pre-filter list before the real result renders.
- `workers: 1` and `retries: 1` locally (matching CI's `retries: 2`) to
  absorb transient latency from the shared QA environment without masking
  genuine, reproducible failures — a bug that fails identically across
  retries is real; one that only fails once under load usually is not.
- Failure screenshots, videos, and traces for diagnostics.

The latest full suite run executed 121 tests: all passed on the first
attempt or after a single automatic retry, aside from two long-standing
QA-defect checks (mixed-case email handling and email autofocus) that are
expected failures.

## Running Tests

```bash
npx playwright test
```

Useful commands:

```bash
npx playwright test --list
npx playwright test --headed
npx playwright show-report
```

On Windows PowerShell, use `cmd /c` if the npm or npx execution policy blocks
the command:

```powershell
cmd /c "npx playwright test"
```

Run a single module:

```bash
npx playwright test tests/authentication tests/dashboard tests/inventory tests/user-management tests/asset-management
```

Run only the Technical Assets tests:

```bash
npx playwright test tests/inventory/technical-asset.spec.js
```

Run only the Asset Management tests (skipping the dependency chain, once
`auth/auth.json` already exists from a prior `setup` run):

```bash
npx playwright test tests/asset-management/asset-management.spec.js --project=asset-management --no-deps
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

The GitHub Actions workflow is located at `.github/workflows/playwright.yml`.
It installs dependencies and browsers, executes the Playwright suite, and
uploads the HTML report as a workflow artifact.

## Future Coverage and Improvements

The following work is planned to expand coverage and improve
maintainability:

### Application coverage

- Add positive/negative coverage for the Assign Asset and Bulk Upload
  flows in Asset Management (currently opened and cancelled, not
  submitted, to avoid mutating shared QA data).
- Implement Role Management workflows.
- Cover Compliance, Configurations, and Vault modules.
- Cover Request Approvals, Request Tracker, HR Requests, and Incident
  Reports.
- Cover Employee Support and Purchase Module workflows.
- Add authorization and role-based access checks.
- Add API-assisted setup and data cleanup where appropriate.

### Quality and resilience

- Add cross-browser coverage for Firefox and WebKit.
- Add accessibility checks for critical pages and forms.
- Add visual regression checks for stable, high-value screens.
- Add richer Allure metadata, trends, and stakeholder summaries.
- Improve environment-specific configuration for staging and production.
- Add controlled test-data creation and cleanup.
- Track and remove expected failures when QA defects are resolved.

## Contribution Guidelines

New tests should:

1. Follow the existing Page Object Model structure.
2. Reuse fixtures, constants, and test data instead of duplicating
   selectors.
3. Use stable, user-facing locators where possible.
4. Wait for a stable/settled result (not just "something is visible") after
   any action that triggers a debounced or asynchronous list update.
5. Include clear assertions for the expected business behavior.
6. Avoid committing credentials, generated reports, or temporary artifacts.
7. Run the relevant module tests before submitting changes.
