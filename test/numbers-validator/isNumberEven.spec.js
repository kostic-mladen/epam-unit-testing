// Importing the 'expect' function from the 'chai' library to perform assertions
const { expect } = require('chai');

// Importing the NumbersValidator class from the relative path '../../app/numbers_validator'
// so we can test its methods.
const NumbersValidator = require('../../app/numbers_validator');

// 'describe' is used to group related tests together into a test suite.
// Here, it describes a suite of tests for the 'isNumberEven' method of NumbersValidator class.
describe('isNumberEven', () => {
  // 'it' is used for individual test cases - it includes the actual test.
  // The string argument describes what the test should do.
  it('should return true if number is even', () => {
    // Using 'expect' to assert that the 'isNumberEven' method returns true when
    // passed the even number 4. The '.to.be.equal(true)' is the actual assertion check.
    expect(NumbersValidator.isNumberEven(4)).to.be.equal(true);
  });

  // Additional tests would follow for different test cases, such as testing if an odd number
  // returns false or if passing a non-number throws an error.
});
