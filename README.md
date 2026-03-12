# EPAM Test Automation Framework Practice

A learning project for setting up a professional JavaScript TAF covering **unit tests** (Mocha + Chai + c8), **end-to-end tests** (WebdriverIO + Mocha), and **BDD tests** (WebdriverIO + Cucumber) using the **Page Object Model**.

## Goal

Learn how to set up and configure a professional JavaScript testing environment from scratch, including:
- Unit testing with coverage reporting and linting
- End-to-end browser testing with WebdriverIO
- BDD testing with Cucumber and Gherkin feature files
- Page Object Model architecture
- Clean project structure with separated concerns

---

## Project Structure

```
epam-taf-js-practice/
├── app/
│   └── numbers_validator.js          # Application source — unit-tested business logic
├── src/
│   └── pages/
│       ├── LoginPage.js              # Page Object — practice login page
│       └── EpamHomePage.js           # Page Object — EPAM homepage
├── test/
│   ├── numbers-validator/
│   │   └── isNumberEven.spec.js      # Unit tests for NumbersValidator
│   ├── e2e-tests/
│   │   ├── home-page.spec.js         # E2E — EPAM homepage title validation
│   │   ├── basic-commands.spec.js    # E2E — basic WDIO commands
│   │   └── advanced-commands.spec.js # E2E — advanced WDIO commands
│   ├── features/
│   │   ├── epam-home.feature         # BDD — EPAM homepage
│   │   ├── browser-basic.feature     # BDD — basic browser commands
│   │   └── browser-advanced.feature  # BDD — advanced browser commands
│   ├── step-definitions/
│   │   ├── browser-commands.steps.js # Steps for browser-basic & browser-advanced
│   │   └── epam-home.steps.js        # Steps for epam-home
│   └── support/
│       ├── world.js                  # Custom Cucumber World class
│       └── hooks.js                  # Cucumber Before/After hooks
├── configs/
│   ├── wdio.conf.js                  # WebdriverIO config (Mocha)
│   ├── wdio.cucumber.conf.js         # WebdriverIO config (Cucumber)
│   ├── .mocharc.json                 # Mocha configuration
│   ├── c8rc.json                     # c8 coverage thresholds
│   ├── .eslintrc.json                # ESLint configuration (airbnb-base)
│   └── .eslintignore                 # ESLint ignore patterns
├── reports/                          # Auto-generated; gitignored
│   ├── allure-results/               # Raw Allure test results
│   ├── allure-report/                # Allure HTML report
│   ├── coverage/                     # c8 coverage HTML report
│   ├── mochawesome/                  # Mochawesome HTML report
│   └── screenshots/                  # Failure screenshots
├── .gitignore
├── package.json
└── README.md
```

---

## TAF Layers

| Layer | Location | Role |
|---|---|---|
| **Application** | `app/` | Source code under unit test |
| **Page Objects** | `src/pages/` | UI abstractions for E2E and BDD tests |
| **E2E Tests** | `test/e2e-tests/` | Mocha specs exercising WDIO commands |
| **Feature Files** | `test/features/` | Gherkin scenarios (BDD) |
| **Step Definitions** | `test/step-definitions/` | Cucumber step implementations |
| **Support** | `test/support/` | World class and hooks |
| **Config** | `configs/` | All tool configuration |
| **Reports** | `reports/` | Generated output (gitignored) |

---

## Page Objects

### `LoginPage` — `src/pages/LoginPage.js`

Represents `practicetestautomation.com/practice-test-login/`.

| Member | Type | Description |
|---|---|---|
| `username` | getter | `#username` input field |
| `password` | getter | `#password` input field |
| `submitButton` | getter | `#submit` button |
| `errorMessage` | getter | `#error` element |
| `open()` | method | Navigates to the login page |
| `login(username, password)` | method | Fills credentials and submits |

### `EpamHomePage` — `src/pages/EpamHomePage.js`

Represents `https://www.epam.com`.

| Member | Type | Description |
|---|---|---|
| `title` | getter | Expected page title string |
| `open()` | method | Navigates to the EPAM homepage |

---

## Source Code

### `NumbersValidator` — `app/numbers_validator.js`

| Method | Description |
|---|---|
| `isNumberEven(number)` | Returns `true` if even; throws if not a number |
| `getEvenNumbersFromArray(arr)` | Returns only even numbers from array; throws if invalid input |
| `isAllNumbers(arr)` | Returns `true` if every element is a number; throws if not an array |
| `isInteger(n)` | Returns `true` if value is an integer; throws if not a number |

---

## Tech Stack

### Unit Testing

| Tool | Purpose |
|---|---|
| [Mocha](https://mochajs.org/) | Test runner |
| [Chai](https://www.chaijs.com/) | Assertion library |
| [c8](https://github.com/bcoe/c8) | Code coverage (V8-native) |
| [ESLint](https://eslint.org/) | Linter (airbnb-base) |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | HTML test reporter |

### E2E Testing (Mocha)

| Tool | Purpose |
|---|---|
| [WebdriverIO](https://webdriver.io/) | E2E test framework |
| [@wdio/local-runner](https://webdriver.io/docs/runner) | Runs tests locally |
| [@wdio/mocha-framework](https://webdriver.io/docs/frameworks) | Mocha integration for WDIO |
| [@wdio/spec-reporter](https://webdriver.io/docs/spec-reporter) | Terminal spec reporter |
| [@wdio/allure-reporter](https://webdriver.io/docs/allure-reporter) | Allure results writer |
| [allure-commandline](https://github.com/allure-framework/allure2) | Generates Allure HTML report |

### BDD Testing (Cucumber)

| Tool | Purpose |
|---|---|
| [@wdio/cucumber-framework](https://webdriver.io/docs/frameworks#using-cucumber) | Cucumber integration for WDIO |
| [@cucumber/cucumber](https://github.com/cucumber/cucumber-js) | Cucumber.js core |
| [cross-env](https://github.com/kentcdodds/cross-env) | Cross-platform env variables (tag filtering) |

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run unit tests

```bash
npm test
```

Runs in sequence:
1. **Lint** — ESLint (`pretest`)
2. **Unit tests** — Mocha with coverage collection (`test`)
3. **Coverage report** — printed to terminal and saved to `reports/coverage/` (`posttest`)

### Run E2E tests (Mocha)

```bash
npm run wdio       # all E2E tests
npm run epam       # only home-page tests
npm run basic      # only basic-commands tests
npm run advanced   # only advanced-commands tests
```

### Run BDD tests (Cucumber)

```bash
npm run wdio:bdd             # all feature files (Chrome + Firefox)
npm run wdio:bdd:smoke       # only @smoke scenarios
npm run wdio:bdd:regression  # only @regression scenarios
```

### Run everything

```bash
npm run test:all      # unit + E2E (Mocha)
npm run test:all:bdd  # unit + BDD (Cucumber)
```

### View Allure report

```bash
npm run allure:open
```

Opens `reports/allure-report/` in the browser. The report is auto-generated after every `wdio` or `wdio:bdd` run.

### Fix lint issues

```bash
npm run lint
```

---

## BDD Feature Files

| Feature file | Scenarios | Tags |
|---|---|---|
| `test/features/epam-home.feature` | EPAM homepage title validation | `@smoke` |
| `test/features/browser-basic.feature` | Element queries, clicks, setValue, addValue, waiting | `@smoke`, `@regression` |
| `test/features/browser-advanced.feature` | JS execution, cookies, attributes, properties | `@regression` |

### Tags

| Tag | Purpose |
|---|---|
| `@smoke` | Critical path — fast sanity check |
| `@regression` | Full regression suite |
| `@negative` | Error and validation scenarios |

### Cucumber configuration — `configs/wdio.cucumber.conf.js`

| Option | Value |
|---|---|
| Browsers | Chrome, Firefox (parallel) |
| `maxInstances` | 2 |
| Base URL | `https://practicetestautomation.com` |
| Reporter | spec + Allure (`useCucumberStepReporter: true`) |
| Clean results before run | `onPrepare` hook — deletes `reports/allure-results/` so every run starts fresh |
| Screenshot on failure | `afterScenario` hook — saves to `reports/screenshots/` and attaches to Allure |
| CI headless | Set `CI=true` env variable |

---

## E2E Tests (Mocha)

| File | Suite | Commands covered |
|---|---|---|
| `test/e2e-tests/home-page.spec.js` | first e2e test suite | Page navigation, title assertion |
| `test/e2e-tests/basic-commands.spec.js` | basic commands test suite | `$`, `$$`, `click()`, `setValue()`, `addValue()`, `isDisplayed()`, `isExisting()`, `waitForDisplayed()`, `waitForExist()` |
| `test/e2e-tests/advanced-commands.spec.js` | advanced commands test suite | `execute()`, `executeAsync()`, `waitUntil()`, `setCookies()`, `getCookies()`, `deleteCookies()`, `getAttribute()`, `getProperty()` |

---

## Configuration

### `configs/wdio.conf.js`

| Option | Value |
|---|---|
| Runner | `local` |
| Browsers | Chrome, Firefox (parallel) |
| Base URL | `https://practicetestautomation.com` |
| Framework | Mocha |
| Reporters | spec, Allure |
| Spec pattern | `test/e2e-tests/**/*.spec.js` |
| `maxInstances` | 10 |
| `waitforTimeout` | 10 000 ms |

#### Hooks

| Hook | Behaviour |
|---|---|
| `afterTest` | On test failure, saves a screenshot to `reports/screenshots/<test-title>.png` |
| `onComplete` | Generates the Allure HTML report from `reports/allure-results/` |

### `configs/c8rc.json`

| Metric | Threshold |
|---|---|
| Statements | 80% |
| Branches | 80% |
| Functions | 100% |
| Lines | 80% |

Report output: `reports/coverage/`

### `configs/.mocharc.json`

| Option | Value |
|---|---|
| Spec pattern | `test/**/*/*.spec.js` |
| Ignore | `test/e2e-tests/**` |
| Reporter | Mochawesome → `reports/mochawesome/` |

E2E specs are excluded because they require the WDIO runtime (`browser` global).

### `configs/.eslintrc.json`

- Extends **airbnb-base**
- Environment: CommonJS, ES2021, Mocha
- `test/e2e-tests/**`, `src/pages/**`, `test/step-definitions/**` and `test/support/**` use `plugin:wdio/recommended` for WDIO globals (`browser`, `$`, `$$`, `expect`, etc.)

---

## Changelog

### `feature/BDD-framework`
- Added Cucumber BDD framework alongside the existing Mocha E2E setup
- Added `@wdio/cucumber-framework`, `@cucumber/cucumber`, `cross-env` dependencies
- Added `configs/wdio.cucumber.conf.js` — Cucumber WDIO config (Chrome + Firefox, Allure with `useCucumberStepReporter`)
- Added 3 feature files: `epam-home.feature`, `browser-basic.feature`, `browser-advanced.feature`
- Added step definitions: `browser-commands.steps.js`, `epam-home.steps.js`
- Added `test/support/world.js` (CustomWorld) and `test/support/hooks.js`
- Added `wdio:bdd`, `wdio:bdd:smoke`, `wdio:bdd:regression`, `test:all:bdd` npm scripts

### `chore/TAF-layers`
- Refactored into **Page Object Model**: added `src/pages/LoginPage.js` and `src/pages/EpamHomePage.js`
- Moved all config files into `configs/` folder
- Consolidated all generated output under `reports/`

### `feature/allure-report`
- Integrated Allure reporting (`allure-commandline`, `@wdio/allure-reporter`)
- Added `onComplete` hook — auto-generates Allure HTML report after every run
- Added `allure:open` npm script

### `chore/capabilities-hooks-screenshots`
- Added Firefox capability — tests now run in Chrome and Firefox in parallel
- Added `afterTest` hook — captures screenshot on test failure

### `feature/advanced-wdio-commands`
- Added `advanced-commands.spec.js` with 8 advanced WDIO command tests

### `feature/wdio-basic-commands`
- Added `basic-commands.spec.js` with 9 basic WDIO command tests

### `test/first-e2e-test`
- Added first E2E test validating `https://www.epam.com` title

### `chore/wdio-setup`
- Installed and configured WebdriverIO with Mocha framework and spec reporter

### `initial commit`
- Project scaffolding: ESLint (airbnb-base), Mocha, Chai, c8, Mochawesome
- `NumbersValidator` source class with unit tests
- Coverage thresholds via `c8rc.json`
