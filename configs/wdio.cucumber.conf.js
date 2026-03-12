const path = require('path');
const { existsSync, mkdirSync, readFileSync, rmSync } = require('fs');
const { sync: globSync } = require('glob');
const allure = require('allure-commandline');
const AllureReporter = require('@wdio/allure-reporter').default;

const root = path.resolve(__dirname, '..');

// Pre-expand globs to absolute paths so @wdio/cucumber-framework handles
// them correctly on Windows (avoids the file:// URL + glob issue)
const resolveFiles = (pattern) => globSync(pattern, { cwd: root, absolute: true });

exports.config = {
    runner: 'local',
    specs: ['../test/features/**/*.feature'],
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: process.env.CI ? ['--headless', '--no-sandbox', '--disable-gpu'] : [],
            },
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: process.env.CI ? ['-headless'] : [],
            },
        },
    ],
    maxInstances: 2,
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://practicetestautomation.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'reports/allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true,
        }],
    ],
    cucumberOpts: {
        require: [
            ...resolveFiles('test/support/world.js'),
            ...resolveFiles('test/support/hooks.js'),
            ...resolveFiles('test/step-definitions/**/*.js'),
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: process.env.TAGS || '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },
    onPrepare() {
        const allureResultsDir = 'reports/allure-results';
        if (existsSync(allureResultsDir)) {
            rmSync(allureResultsDir, { recursive: true, force: true });
        }
    },
    onComplete() {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure([
            'generate', 'reports/allure-results', '--clean', '-o', 'reports/allure-report',
        ]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 30000);
            generation.on('exit', (exitCode) => {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve();
            });
        });
    },
    afterScenario: async (world, result) => {
        if (!result.passed) {
            const dirPath = './reports/screenshots/';
            if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
            const safeName = world.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
            const screenshotPath = `${dirPath}${safeName}.png`;
            await browser.saveScreenshot(screenshotPath);
            AllureReporter.addAttachment(
                'Screenshot on Failure',
                readFileSync(screenshotPath),
                'image/png',
            );
            console.log(`Screenshot saved: ${screenshotPath}`);
        }
    },
};
