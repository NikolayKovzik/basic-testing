import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 10, action: Action.Subtract, expected: 0 },
  { a: 20, b: 30, action: Action.Multiply, expected: 600 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 33, b: '22', action: 'invalid', expected: null },
  { a: '1', b: 1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test case № %#', (testObj) => {
    expect(simpleCalculator({ ...testObj })).toEqual(testObj.expected);
  });
});
