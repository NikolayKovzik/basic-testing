import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addTestObj = {
      a: 100,
      b: 101,
      action: Action.Add,
    };

    const expectedResult = 201;

    expect(simpleCalculator(addTestObj)).toEqual(expectedResult);
  });

  test('should subtract two numbers', () => {
    const substructTestObj = {
      a: 100,
      b: 99,
      action: Action.Subtract,
    };

    const expectedResult = 1;

    expect(simpleCalculator(substructTestObj)).toEqual(expectedResult);
  });

  test('should multiply two numbers', () => {
    const multiplyTestObj = {
      a: 7,
      b: 7,
      action: Action.Multiply,
    };

    const expectedResult = 49;

    expect(simpleCalculator(multiplyTestObj)).toEqual(expectedResult);
  });

  test('should divide two numbers', () => {
    const divideTestObj = {
      a: 100,
      b: 10,
      action: Action.Divide,
    };

    const expectedResult = 10;

    expect(simpleCalculator(divideTestObj)).toEqual(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const exponentTestObj = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    };

    const expectedResult = 27;

    expect(simpleCalculator(exponentTestObj)).toEqual(expectedResult);
  });

  test('should return null for invalid action', () => {
    const invalidTestObj = {
      a: 222,
      b: 333,
      action: 'gibrish',
    };

    expect(simpleCalculator(invalidTestObj)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const addTestObj = {
      a: '222',
      b: 333,
      action: Action.Add,
    };

    expect(simpleCalculator(addTestObj)).toBeNull();
  });
});
