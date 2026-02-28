/**
 * 1. visit www.epam.com
 * 2. validate the page's title
 */
describe('first e2e test suite', () => {
  it('should open www.epam.com', async () => {
    const expectedTitle = 'EPAM | Software Engineering & Product Development Services';

    await browser.url('/');
    await expect(browser).toHaveTitle(expectedTitle);
  });
});
