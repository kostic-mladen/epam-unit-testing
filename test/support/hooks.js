const { Before, After } = require('@wdio/cucumber-framework');

Before(async function () {
  this.testData = {};
});

After(async function (scenario) {
  // Screenshot on failure is handled by afterScenario hook in wdio.cucumber.conf.js
  if (!scenario.result.passed) {
    // eslint-disable-next-line no-console
    console.log(`Scenario FAILED: "${scenario.pickle.name}"`);
  }
});
