class NumbersValidator {
  static isNumberEven(number) {
    const typeOfVariable = typeof number;
    if (typeOfVariable !== 'number') {
      throw new Error(`[${number}] is not of type "Number" it is of type "${typeOfVariable}"`);
    }
    return number % 2 === 0;
  }

  static getEvenNumbersFromArray(arrayOfNumbers) {
    if (Array.isArray(arrayOfNumbers) && arrayOfNumbers.every((item) => typeof item === 'number')) {
      return arrayOfNumbers.filter((n) => NumbersValidator.isNumberEven(n));
    }
    throw new Error(`[${arrayOfNumbers}] is not an array of "Numbers"`);
  }

  static isAllNumbers(arrayOfNumbers) {
    if (!Array.isArray(arrayOfNumbers)) {
      throw new Error(`[${arrayOfNumbers}] is not an array`);
    }
    return arrayOfNumbers.every((n) => typeof n === 'number');
  }

  static isInteger(n) {
    if (typeof n !== 'number') {
      throw new Error(`[${n}] is not a number`);
    }
    return Number.isInteger(n);
  }
}

module.exports = NumbersValidator;
