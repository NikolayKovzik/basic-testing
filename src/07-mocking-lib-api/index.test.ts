import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash/throttle', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockReturnObject = {
      get: jest.fn().mockReturnValue({ data: {} }),
    };
    const axiosResultMock = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);
    await throttledGetDataFromApi('/api');

    expect(axiosResultMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGetAxios = jest.fn().mockReturnValue({ data: {} });
    const relativePath = '/api';
    const mockReturnObject = {
      get: mockGetAxios,
    };
    jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi(relativePath);

    expect(mockGetAxios).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseDataMock = {
      name: 'name',
      surnname: 'surname',
    };
    const mockReturnObject = {
      get: jest.fn().mockReturnValue({ data: responseDataMock }),
    };
    jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);
    jest.advanceTimersByTime(5000);
    const result = await throttledGetDataFromApi('/api');

    expect(result).toEqual(responseDataMock);
  });
});
