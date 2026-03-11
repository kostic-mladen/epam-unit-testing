const loginPage = require('../../src/pages/LoginPage');

describe('advanced commands test suite', () => {
  it('should get page title using execute() command', async () => {
    await browser.url('/');
    const title = await browser.execute(() => document.title);
    await expect(title).toBeTruthy();
  });

  it('should get page title using executeAsync() command', async () => {
    await browser.url('/');
    const title = await browser.executeAsync((done) => {
      setTimeout(() => {
        done(document.title);
      }, 1000);
    });
    await expect(title).toBeTruthy();
  });

  it('should wait for submit button to be displayed using waitUntil() command', async () => {
    await loginPage.open();
    await browser.waitUntil(
      async () => loginPage.submitButton.isDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: 'Submit button was not displayed after 5 seconds',
      },
    );
    await expect(loginPage.submitButton).toBeDisplayed();
  });

  it('should set a cookie using setCookies() command', async () => {
    await loginPage.open();
    await browser.setCookies({ name: 'testCookie', value: 'testValue' });
    const cookies = await browser.getCookies(['testCookie']);
    await expect(cookies[0].value).toBe('testValue');
  });

  it('should get cookies using getCookies() command', async () => {
    await loginPage.open();
    await browser.setCookies([
      { name: 'cookieOne', value: 'valueOne' },
      { name: 'cookieTwo', value: 'valueTwo' },
    ]);
    const allCookies = await browser.getCookies();
    await expect(allCookies.length).toBeGreaterThan(0);

    const specificCookies = await browser.getCookies(['cookieOne', 'cookieTwo']);
    await expect(specificCookies).toHaveLength(2);
  });

  it('should delete cookies using deleteCookies() command', async () => {
    await loginPage.open();
    await browser.setCookies([{ name: 'cookieToDelete', value: 'someValue' }]);
    await browser.deleteCookies(['cookieToDelete']);
    const cookies = await browser.getCookies(['cookieToDelete']);
    await expect(cookies).toHaveLength(0);
  });

  it('should get attribute using getAttribute() command', async () => {
    await loginPage.open();
    const type = await loginPage.username.getAttribute('type');
    await expect(type).toBe('text');
  });

  it('should get property using getProperty() command', async () => {
    await loginPage.open();
    await loginPage.username.setValue('testUser');
    const value = await loginPage.username.getProperty('value');
    await expect(value).toBe('testUser');
  });
});
