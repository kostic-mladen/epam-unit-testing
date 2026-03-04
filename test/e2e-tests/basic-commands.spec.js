/**
 *This test suite demonstrates the usage of basic
 *commands in WebdriverIO. The tests navigate to a practice
 *login page and validate the presence of
 *the submit button using both commands.
 */

describe('basic commands test suite', () => {
  it('should find and validate submit button with $ command', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit'); /**  The $ command is a short way to
                                           * call the findElement command in order to
                                           * fetch a single element on the page.
                                           */
    await expect(submitButton).toBeExisting();
  });

  it('should find and validate submit button with $$ command', async () => {
    await browser.url('/practice-test-login/');
    const submitButtons = await $$('#submit'); /** The $$ command is a short way to
                                                              * call the findElements command in
                                                              * order to fetch multiple elements on
                                                              * the page. It returns an array of
                                                              * elements.
                                                              */
    await expect(submitButtons).toBeElementsArrayOfSize(1);
  });

  it('should click submit button', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit');
    await submitButton.click();/**  The click() command is to perform a
                                *click action on an element. It simulates
                                *a user clicking on the element. */
    const errorMessage = await $('#error');
    await expect(errorMessage).toBeExisting();
    await expect(errorMessage).toHaveText('Your username is invalid!');
  });

  it('should set value to username and password fields', async () => {
    await browser.url('/practice-test-login/');
    const usernameField = await $('#username');
    const passwordField = await $('#password');
    await usernameField.setValue('invalidUser'); /** The setValue() command is used to
                                                  *set a value to an input field (clears
                                                  *value before). It simulates typing into
                                                  *the field. */
    await passwordField.setValue('invalidPass');
    const submitButton = await $('#submit');
    await submitButton.click();
    const errorMessage = await $('#error');
    await expect(errorMessage).toBeExisting();
    await expect(errorMessage).toHaveText('Your username is invalid!');
  });

  it('should add value to username and password fields', async () => {
    await browser.url('/practice-test-login/');
    const usernameField = await $('#username');
    const passwordField = await $('#password');
    await usernameField.addValue('invalidUser'); /** The addValue() command is used to
                                                  *add a value to an input field (does not
                                                  *clear value before). It simulates typing
                                                  *into the field. */
    await passwordField.addValue('invalidPass');
    const submitButton = await $('#submit');
    await submitButton.click();
    const errorMessage = await $('#error');
    await expect(errorMessage).toBeExisting();
    await expect(errorMessage).toHaveText('Your username is invalid!');
  });

  it('should isDisplayed command check element is visible', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit');
    /** The isDisplayed() command is used to check if an element is
     * visible on the page (UI). It returns true if the element is visible,
     * and false if it is not. */
    const isSubmitButtonDisplayed = await submitButton.isDisplayed();
    await expect(isSubmitButtonDisplayed).toBe(true);
  });

  it('should isExisting command check element exists in DOM', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit');
    /** The isExisting() command is used to check if an element exists in
     * the DOM. It returns true if the element exists, and false if it does not. */
    const isSubmitButtonExisting = await submitButton.isExisting();
    await expect(isSubmitButtonExisting).toBe(true);
  });

  it('should wait for submit button to be displayed', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit');
    /** The waitForDisplayed() command is used to wait for an element to be
     * displayed on the page. It will wait until the element is visible or until
     * the timeout is reached. */
    await submitButton.waitForDisplayed({ timeout: 5000 });
    await expect(submitButton).toBeDisplayed();
  });

  it('should wait for submit button to exist', async () => {
    await browser.url('/practice-test-login/');
    const submitButton = await $('#submit');
    /** The waitForExist() command is used to wait for an element to exist in
     * the DOM. It will wait until the element exists or until the timeout is
     * reached. */
    await submitButton.waitForExist({ timeout: 5000 });
    await expect(submitButton).toBeExisting();
  });
});
