const { Given, When, Then } = require('@wdio/cucumber-framework');
const loginPage = require('../../src/pages/LoginPage');

// ─── Navigation & login page ────────────────────────────────────────────────

Given('I am on the login page', async () => {
    await loginPage.open();
});

Given('I navigate to the base URL', async () => {
    await browser.url('/');
});

When('I enter username {string} and password {string}', async (username, password) => {
    await loginPage.username.setValue(username);
    await loginPage.password.setValue(password);
});

When('I click the submit button', async () => {
    await loginPage.submitButton.click();
});

Then('I should see the error {string}', async (message) => {
    await expect(loginPage.errorMessage).toBeExisting();
    await expect(loginPage.errorMessage).toHaveText(message);
});

// ─── Basic element interactions ─────────────────────────────────────────────

Then('the element {string} should exist in the DOM', async (selector) => {
    await expect($(selector)).toBeExisting();
});

Then('the element {string} should be displayed', async (selector) => {
    await expect($(selector)).toBeDisplayed();
});

Then('there should be exactly {int} elements matching {string}', async (count, selector) => {
    const elements = await $$(selector);
    await expect(elements).toBeElementsArrayOfSize(count);
});

When('I set the value of {string} to {string}', async (selector, value) => {
    await $(selector).setValue(value);
});

When('I append the value {string} to {string}', async (value, selector) => {
    await $(selector).addValue(value);
});

Then('I wait for {string} to be displayed within {int}ms', async (selector, timeout) => {
    await $(selector).waitForDisplayed({ timeout });
    await expect($(selector)).toBeDisplayed();
});

Then('I wait for {string} to exist within {int}ms', async (selector, timeout) => {
    await $(selector).waitForExist({ timeout });
    await expect($(selector)).toBeExisting();
});

// ─── Advanced – JavaScript execution ───────────────────────────────────────

Then('the page title retrieved via JavaScript should not be empty', async () => {
    const title = await browser.execute(() => document.title);
    expect(title).toBeTruthy();
});

Then('the page title retrieved via async JavaScript should not be empty', async () => {
    const title = await browser.executeAsync((done) => {
        setTimeout(() => done(document.title), 500);
    });
    expect(title).toBeTruthy();
});

Then('I can wait until {string} is displayed using waitUntil', async (selector) => {
    await browser.waitUntil(
        async () => $(selector).isDisplayed(),
        { timeout: 5000, timeoutMsg: `"${selector}" was not displayed after 5 seconds` },
    );
    await expect($(selector)).toBeDisplayed();
});

// ─── Advanced – Cookies ─────────────────────────────────────────────────────

When('I set a cookie named {string} with value {string}', async (name, value) => {
    await browser.setCookies({ name, value });
});

Then('the cookie {string} should have value {string}', async (name, expectedValue) => {
    const cookies = await browser.getCookies([name]);
    expect(cookies[0].value).toBe(expectedValue);
});

Then('there should be at least {int} cookies in the browser', async (minCount) => {
    const cookies = await browser.getCookies();
    expect(cookies.length).toBeGreaterThanOrEqual(minCount);
});

When('I delete the cookie {string}', async (name) => {
    await browser.deleteCookies([name]);
});

Then('the cookie {string} should not exist', async (name) => {
    const cookies = await browser.getCookies([name]);
    await expect(cookies).toHaveLength(0);
});

// ─── Advanced – Attributes and properties ───────────────────────────────────

Then('the attribute {string} of element {string} should equal {string}', async (attr, selector, expectedValue) => {
    const value = await $(selector).getAttribute(attr);
    expect(value).toBe(expectedValue);
});

Then('the property {string} of element {string} should equal {string}', async (property, selector, expectedValue) => {
    const value = await $(selector).getProperty(property);
    expect(value).toBe(expectedValue);
});
