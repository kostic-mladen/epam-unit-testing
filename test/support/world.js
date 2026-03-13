const { setWorldConstructor, World } = require('@wdio/cucumber-framework');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);
