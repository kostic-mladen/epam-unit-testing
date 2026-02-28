# EPAM Unit Testing — JavaScript

A learning project for setting up JavaScript testing frameworks covering **unit tests** (Mocha + Chai + c8) and **end-to-end tests** (WebdriverIO).

## Goal

Learn how to set up and configure a professional JavaScript testing environment from scratch, including:
- Unit testing with coverage reporting and linting
- End-to-end browser testing with WebdriverIO
- Clean Git workflow with conventional commits

## Changelog

### `test/first-e2e-test`
- Added first E2E test — validates the title of `https://www.epam.com`
- Configured `wdio.conf.js`: set `baseUrl` and `specs` path

### `chore/wdio-setup`
- Installed and configured WebdriverIO (`@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`, `@wdio/spec-reporter`)
- Added `wdio.conf.js` with Chrome, Mocha framework, and spec reporter
- Added `eslint-plugin-wdio` for WDIO globals and lint rules
- Added `wdio` and updated `posttest` scripts in `package.json`

### `initial commit`
- Project scaffolding: ESLint (airbnb-base), Mocha, Chai, c8, Mochawesome
- `NumbersValidator` source class with unit tests
- Coverage thresholds configured via `c8rc.json`

## Project Structure

```
epam-unit-testing/
├── app/
│   └── numbers_validator.js          # Source code — NumbersValidator class
├── test/
│   ├── numbers-validator/
│   │   └── isNumberEven.spec.js      # Unit tests for isNumberEven method
│   └── e2e-tests/
│       └── home-page.spec.js         # E2E test — EPAM homepage title validation
├── .eslintignore
├── .eslintrc.json                    # ESLint config (airbnb-base)
├── .mocharc.json                     # Mocha config
├── c8rc.json                         # c8 coverage thresholds
├── wdio.conf.js                      # WebdriverIO config
└── package.json
```

## Source Code

### `NumbersValidator` — `app/numbers_validator.js`

| Method | Description |
|---|---|
| `isNumberEven(number)` | Returns `true` if the number is even, throws if not a number |
| `getEvenNumbersFromArray(arr)` | Returns only even numbers from an array, throws if input is invalid |
| `isAllNumbers(arr)` | Returns `true` if every element in the array is a number, throws if not an array |
| `isInteger(n)` | Returns `true` if the value is an integer, throws if not a number |

## Tech Stack

### Unit Testing

| Tool | Purpose |
|---|---|
| [Mocha](https://mochajs.org/) | Test runner |
| [Chai](https://www.chaijs.com/) | Assertion library |
| [c8](https://github.com/bcoe/c8) | Code coverage (V8-native) |
| [ESLint](https://eslint.org/) | Linter (airbnb-base style guide) |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | HTML test reporter |

### E2E Testing

| Tool | Purpose |
|---|---|
| [WebdriverIO](https://webdriver.io/) | E2E test framework |
| [@wdio/local-runner](https://webdriver.io/docs/runner) | Runs tests locally |
| [@wdio/mocha-framework](https://webdriver.io/docs/frameworks) | Mocha integration for WDIO |
| [@wdio/spec-reporter](https://webdriver.io/docs/spec-reporter) | Terminal spec reporter |
| [eslint-plugin-wdio](https://github.com/webdriverio/eslint-plugin-wdio) | ESLint rules + globals for WDIO |

## Getting Started

### Install dependencies

```bash
npm install
```

### Run unit tests only

```bash
npm test
```

This runs in sequence:
1. **Lint** — ESLint (`pretest`)
2. **Unit tests** — Mocha with coverage data collection (`test`)
3. **Coverage report** — printed to terminal, then **E2E tests** run in Chrome (`posttest`)

### Run E2E tests only

```bash
npm run wdio
```

### Run linter

```bash
npm run lint
```

## E2E Tests

| Test file | Suite | What it tests |
|---|---|---|
| `test/e2e-tests/home-page.spec.js` | first e2e test suite | Validates the title of `https://www.epam.com` |

## E2E Configuration — `wdio.conf.js`

| Option | Value |
|---|---|
| Runner | `local` |
| Browser | Chrome |
| Base URL | `https://www.epam.com` |
| Framework | Mocha |
| Reporter | spec |
| Spec pattern | `test/e2e-tests/**/*.spec.js` |
| `waitforTimeout` | 10 000 ms |
| `connectionRetryTimeout` | 120 000 ms |

> ChromeDriver is managed automatically by WDIO v9 — no separate installation needed.

## Coverage Configuration — `c8rc.json`

| Metric | Threshold |
|---|---|
| Statements | 80% |
| Branches | 80% |
| Functions | 100% |
| Lines | 80% |

Coverage reports are generated in `coverage/` and printed to the terminal.

## Test Configuration — `.mocharc.json`

- **Spec pattern:** `test/**/*/*.spec.js`
- **Ignore:** `test/e2e-tests/**` — E2E specs require the WDIO runtime (`browser` global); they run via `wdio` in `posttest`
- **Reporter:** Mochawesome (HTML report saved to `mochawesome-report/`)

## Linting — `.eslintrc.json`

- Extends **airbnb-base**
- Environment: CommonJS, ES2021, Mocha
- `wdio.conf.js` excluded from linting via `.eslintignore`
- E2E test files use an `overrides` block extending `plugin:wdio/recommended`, which declares all WDIO globals (`browser`, `$`, `$$`, `expect`, etc.)
