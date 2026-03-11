class LoginPage {
  get username() { return $('#username'); }

  get password() { return $('#password'); }

  get submitButton() { return $('#submit'); }

  get errorMessage() { return $('#error'); }

  async open() {
    await browser.url('/practice-test-login/');
  }

  async login(username, password) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.submitButton.click();
  }
}

module.exports = new LoginPage();
