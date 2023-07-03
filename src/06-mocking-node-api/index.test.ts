import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const callTimes = 5;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * callTimes);

    expect(callback).toHaveBeenCalledTimes(callTimes);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const testPath = 'test.txt';
    const mockedJoin = jest.fn(path.join);
    path.join = mockedJoin;
    await readFileAsynchronously(testPath);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, testPath);

    path.join = jest.requireActual('path').join;
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent-file.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);

    existsSyncMock.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existing-file.txt';
    const sampleContent = 'This is a sample file content';

    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(async () => {
        return Buffer.from(sampleContent);
      });

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(sampleContent);

    existsSyncMock.mockRestore();
    readFileMock.mockRestore();
  });
});
