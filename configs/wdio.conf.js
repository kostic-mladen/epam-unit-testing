const { existsSync, mkdirSync } = require('fs');
const allure = require('allure-commandline');

exports.config = {
  runner: 'local',
  specs: ['../test/e2e-tests/**/*.spec.js'],
  capabilities: [
    { browserName: 'chrome' },
    { browserName: 'firefox' },
  ],
  maxInstances: 10,
  logLevel: 'error',
  bail: 0,
  baseUrl: 'https://practicetestautomation.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec', ['allure', {
    outputDir: 'reports/allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true,
  }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  onComplete() {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'reports/allure-results', '--clean', '-o', 'reports/allure-report']);

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 30000);
      generation.on('exit', (exitCode) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) return reject(reportError);
        // eslint-disable-next-line no-console
        console.log('Allure report successfully generated');
        return resolve();
      });
    });
  },
  afterTest: async (test, context, result) => {
    if (result.error) {
      const dirPath = './reports/screenshots/';
      if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
      await browser.saveScreenshot(`${dirPath}${test.title}.png`);
      // eslint-disable-next-line no-console
      console.log(`Screenshot saved for failed test: ${test.title}`);
    }
  },
};
