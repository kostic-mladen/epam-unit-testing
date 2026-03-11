const loginPage = require('../../src/pages/LoginPage');

describe('basic commands test suite', () => {
  it('should find and validate submit button with $ command', async () => {
    await loginPage.open();
    await expect(loginPage.submitButton).toBeExisting();
  });

  it('should find and validate submit button with $$ command', async () => {
    await loginPage.open();
    const submitButtons = await $$('#submit');
    await expect(submitButtons).toBeElementsArrayOfSize(1);
  });

  it('should click submit button', async () => {
    await loginPage.open();
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toBeExisting();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  it('should set value to username and password fields', async () => {
    await loginPage.open();
    await loginPage.username.setValue('invalidUser');
    await loginPage.password.setValue('invalidPass');
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  it('should add value to username and password fields', async () => {
    await loginPage.open();
    await loginPage.username.addValue('invalidUser');
    await loginPage.password.addValue('invalidPass');
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
  });

  it('should isDisplayed command check element is visible', async () => {
    await loginPage.open();
    const isSubmitButtonDisplayed = await loginPage.submitButton.isDisplayed();
    await expect(isSubmitButtonDisplayed).toBe(true);
  });

  it('should isExisting command check element exists in DOM', async () => {
    await loginPage.open();
    const isSubmitButtonExisting = await loginPage.submitButton.isExisting();
    await expect(isSubmitButtonExisting).toBe(true);
  });

  it('should wait for submit button to be displayed', async () => {
    await loginPage.open();
    await loginPage.submitButton.waitForDisplayed({ timeout: 5000 });
    await expect(loginPage.submitButton).toBeDisplayed();
  });

  it('should wait for submit button to exist', async () => {
    await loginPage.open();
    await loginPage.submitButton.waitForExist({ timeout: 5000 });
    await expect(loginPage.submitButton).toBeExisting();
  });
});
