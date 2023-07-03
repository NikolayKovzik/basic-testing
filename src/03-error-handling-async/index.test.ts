import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const providedValue = 'provided value';

    await expect(resolveValue(providedValue)).resolves.toEqual(providedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedMessage = 'provided message';

    expect(() => throwError(providedMessage)).toThrowError(providedMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';

    expect(() => throwError()).toThrowError(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
