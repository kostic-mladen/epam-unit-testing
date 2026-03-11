const epamHomePage = require('../../src/pages/EpamHomePage');

describe('first e2e test suite', () => {
  it('should open www.epam.com', async () => {
    await epamHomePage.open();
    await expect(browser).toHaveTitle(epamHomePage.title);
  });
});
