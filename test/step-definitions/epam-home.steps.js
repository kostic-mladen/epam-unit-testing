const { Given, Then } = require('@wdio/cucumber-framework');
const epamHomePage = require('../../src/pages/EpamHomePage');

Given('I navigate to the EPAM homepage', async () => {
    await epamHomePage.open();
});

Then('the page title should be {string}', async (expectedTitle) => {
    await expect(browser).toHaveTitle(expectedTitle);
});
