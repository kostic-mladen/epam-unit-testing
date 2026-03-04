/**
 * This test suite demonstrates the usage of advanced
 * commands in WebdriverIO.
 */

describe('advanced commands test suite', () => {
  it('should get page title using execute() command', async () => {
    await browser.url('/');
    /** The execute() command injects a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame.
     * The executed script is assumed to be synchronous and the result
     * of evaluating the script is returned to the client. */
    const title = await browser.execute(() => document.title);
    await expect(title).toBeTruthy();
  });

  it('should get page title using executeAsync() command', async () => {
    await browser.url('/');
    /** The executeAsync() command injects a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame.
     * The executed script is assumed to be asynchronous and must signal
     * that is done by invoking the provided callback, which is always
     * provided as the final argument to the function. The value to this
     * callback will be returned to the client. */
    const title = await browser.executeAsync((done) => {
      setTimeout(() => {
        done(document.title);
      }, 1000);
    });
    await expect(title).toBeTruthy();
  });

  it('should wait for submit button to be displayed using waitUntil() command', async () => {
    await browser.url('/practice-test-login/');
    /** The waitUntil() command is your universal weapon if you want to wait
     * on something. It expects a condition and waits until that condition
     * is fulfilled with a truthy value. */
    await browser.waitUntil(
      async () => {
        const submitButton = await $('#submit');
        return submitButton.isDisplayed();
      },
      {
        timeout: 5000,
        timeoutMsg: 'Submit button was not displayed after 5 seconds',
      },
    );
    const submitButton = await $('#submit');
    await expect(submitButton).toBeDisplayed();
  });

  it('should set a cookie using setCookies() command', async () => {
    await browser.url('/practice-test-login/');
    /** The setCookies() command sets one or more cookies for the current page.
     * Make sure you are on the page that should receive the cookie. You can't
     * set a cookie for an arbitrary page without being on that page. */
    await browser.setCookies({
      name: 'testCookie',
      value: 'testValue',
    });
    const cookies = await browser.getCookies(['testCookie']);
    await expect(cookies[0].value).toBe('testValue');
  });

  it('should get cookies using getCookies() command', async () => {
    await browser.url('/practice-test-login/');
    await browser.setCookies([
      { name: 'cookieOne', value: 'valueOne' },
      { name: 'cookieTwo', value: 'valueTwo' },
    ]);
    /** The getCookies() command retrieves all cookies or specific cookies
     * by name for the current page. It returns an array of cookie objects. */
    const allCookies = await browser.getCookies();
    await expect(allCookies.length).toBeGreaterThan(0);

    const specificCookies = await browser.getCookies(['cookieOne', 'cookieTwo']);
    await expect(specificCookies).toHaveLength(2);
  });

  it('should delete cookies using deleteCookies() command', async () => {
    await browser.url('/practice-test-login/');
    await browser.setCookies([
      { name: 'cookieToDelete', value: 'someValue' },
    ]);
    /** The deleteCookies() command deletes cookies for the current page.
     * You can delete all cookies or specific ones by passing their names. */
    await browser.deleteCookies(['cookieToDelete']);
    const cookies = await browser.getCookies(['cookieToDelete']);
    await expect(cookies).toHaveLength(0);
  });

  it('should get attribute using getAttribute() command', async () => {
    await browser.url('/practice-test-login/');
    const usernameField = await $('#username');
    /** The getAttribute() command retrieves the value of an attribute from
     * a DOM element. It returns the attribute value as a string, or null
     * if the attribute does not exist. */
    const type = await usernameField.getAttribute('type');
    await expect(type).toBe('text');
  });

  it('should get property using getProperty() command', async () => {
    await browser.url('/practice-test-login/');
    const usernameField = await $('#username');
    await usernameField.setValue('testUser');
    /** The getProperty() command retrieves the value of a property from
     * a DOM element. Unlike getAttribute() which reads HTML attributes,
     * getProperty() reads the current JavaScript property value. */
    const value = await usernameField.getProperty('value');
    await expect(value).toBe('testUser');
  });
});
