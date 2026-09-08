# Inventory Application - Playwright Automation

End-to-end test automation for the Inventory application using Playwright and
JavaScript. The current automation focus is Login, Logout, Dashboard, and
Inventory Technical Assets against the QA environment. The framework uses a
Page Object Model and is structured to scale across the application's business
modules.

## Project At a Glance

| Item | Details |
| --- | --- |
| Automation framework | Playwright Test |
| Language | JavaScript (CommonJS) |
| Browser | Chromium |
| Application environment | QA |
| Base URL | `https://inventoryqa.techversantinfotech.com` |
| Design pattern | Page Object Model |
| Reports | Playwright HTML and Allure |
| CI | GitHub Actions |

## Prerequisites

- Node.js and npm
- Access to the Inventory QA environment
- Valid test credentials

Install project dependencies before the first run:

```bash
npm install
npx playwright install
```

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

The current focused scope contains **33 executable end-to-end tests**.

| Area | Test file | Tests | Current coverage |
| --- | --- | ---: | --- |
| Login | `tests/authentication/login.spec.js` | 19 | Form controls, password type, invalid credentials and error content, error clearing, Enter-key submission, navigation, protected-route redirects, email casing, refresh persistence, whitespace handling, mobile layout, and keyboard focus |
| Logout | `tests/authentication/logout.spec.js` | 7 | Cancel/confirm logout, client session cleanup, logout from Inventory, multi-tab invalidation, bookmarked URL protection, redirect to login, and session protection after logout |
| Dashboard | `tests/dashboard/dashboard.spec.js` | 1 | Dashboard navigation, asset/request cards, notifications, and dashboard links |
| Technical assets | `tests/inventory/technical-asset.spec.js` | 6 | Table rendering, filters, search, pagination, details, edit form, history, add form, template download, and upload control |

`tests/inventory/inventory.spec.js` is reserved for broader Inventory scenarios
and currently contains no executable tests. Other module specifications are
outside the current automation scope.

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

## Running Tests

Run the complete suite:

```bash
npm test
```

Run in headed mode:

```bash
npm run test:headed
```

Run authentication tests:

```bash
npm run test:authentication
```

Run the focused Login, Logout, Dashboard, and Inventory tests:

```bash
npx playwright test tests/authentication tests/dashboard tests/inventory
```

Run only the implemented Technical Assets tests:

```bash
npx playwright test tests/inventory/technical-asset.spec.js
```

Run one specification:

```bash
npx playwright test tests/authentication/login.spec.js
```

Run with a specific project:

```bash
npx playwright test tests/authentication --project=authentication
```

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
- Implement User Management and Role Management workflows.
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
