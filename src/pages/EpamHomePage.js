class EpamHomePage {
  get title() { return 'EPAM | Software Engineering & Product Development Services'; }

  async open() {
    await browser.url('https://www.epam.com');
  }
}

module.exports = new EpamHomePage();
