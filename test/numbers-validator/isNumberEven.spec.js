const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator');

describe('isNumberEven', () => {
  it('should return true if number is even', () => {
    expect(NumbersValidator.isNumberEven(4)).to.be.equal(true);
  });

  it('should return false if number is odd', () => {
    expect(NumbersValidator.isNumberEven(3)).to.be.equal(false);
  });

  it('should throw an error if value is not a number', () => {
    expect(() => NumbersValidator.isNumberEven('4')).to.throw(
      Error,
      '[4] is not of type "Number" it is of type "string"',
    );
  });
});

describe('getEvenNumbersFromArray', () => {
  it('should return even numbers from array', () => {
    expect(NumbersValidator.getEvenNumbersFromArray([1, 2, 3, 4])).to.deep.equal([2, 4]);
  });

  it('should throw an error if argument is not an array of numbers', () => {
    expect(() => NumbersValidator.getEvenNumbersFromArray([1, '2', 3])).to.throw(
      Error,
      '[1,2,3] is not an array of "Numbers"',
    );
  });

  it('should throw an error if argument is not an array', () => {
    expect(() => NumbersValidator.getEvenNumbersFromArray('not an array')).to.throw(
      Error,
      '[not an array] is not an array of "Numbers"',
    );
  });
});

describe('isAllNumbers', () => {
  it('should return true if all elements are numbers', () => {
    expect(NumbersValidator.isAllNumbers([1, 2, 3])).to.be.equal(true);
  });

  it('should return false if some elements are not numbers', () => {
    expect(NumbersValidator.isAllNumbers([1, '2', 3])).to.be.equal(false);
  });

  it('should throw an error if argument is not an array', () => {
    expect(() => NumbersValidator.isAllNumbers('not an array')).to.throw(
      Error,
      '[not an array] is not an array',
    );
  });
});

describe('isInteger', () => {
  it('should return true if number is an integer', () => {
    expect(NumbersValidator.isInteger(4)).to.be.equal(true);
  });

  it('should return false if number is not an integer', () => {
    expect(NumbersValidator.isInteger(4.5)).to.be.equal(false);
  });

  it('should throw an error if value is not a number', () => {
    expect(() => NumbersValidator.isInteger('4')).to.throw(
      Error,
      '[4] is not a number',
    );
  });
});
