# EPAM Unit Testing — JavaScript

A learning project for setting up a JavaScript unit testing framework using **Mocha**, **Chai**, and **c8** code coverage.

## Project Structure

```
epam-unit-testing/
├── app/
│   └── numbers_validator.js     # Source code — NumbersValidator class
├── test/
│   └── numbers-validator/
│       └── isNumberEven.spec.js # Unit tests for isNumberEven method
├── .eslintignore
├── .eslintrc.json               # ESLint config (airbnb-base)
├── .mocharc.json                # Mocha config
├── c8rc.json                    # c8 coverage thresholds
└── package.json
```

## Source Code

### `NumbersValidator` — `app/numbers_validator.js`

A static utility class with the following methods:

| Method | Description |
|---|---|
| `isNumberEven(number)` | Returns `true` if the number is even, throws if not a number |
| `getEvenNumbersFromArray(arr)` | Returns only even numbers from an array, throws if input is invalid |
| `isAllNumbers(arr)` | Returns `true` if every element in the array is a number, throws if not an array |
| `isInteger(n)` | Returns `true` if the value is an integer, throws if not a number |

## Tech Stack

| Tool | Purpose |
|---|---|
| [Mocha](https://mochajs.org/) | Test runner |
| [Chai](https://www.chaijs.com/) | Assertion library |
| [c8](https://github.com/bcoe/c8) | Code coverage (V8-native) |
| [ESLint](https://eslint.org/) | Linter (airbnb-base style guide) |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | HTML test reporter |

## Getting Started

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

This will:
1. **Lint** the code with ESLint (`pretest`)
2. **Run** all tests with Mocha, collecting coverage data (`test`)
3. **Display** the coverage report in the terminal (`posttest`)

## Coverage Configuration — `c8rc.json`

| Metric | Threshold |
|---|---|
| Statements | 80% |
| Branches | 80% |
| Functions | 100% |
| Lines | 80% |

Coverage reports are generated in `coverage/` (HTML) and printed to the terminal (text).

## Test Configuration — `.mocharc.json`

- **Spec pattern:** `test/**/*/*.spec.js`
- **Reporter:** Mochawesome (HTML report saved to `mochawesome-report/`)

## Linting — `.eslintrc.json`

- Extends **airbnb-base**
- Environment: CommonJS, ES2021, Mocha
