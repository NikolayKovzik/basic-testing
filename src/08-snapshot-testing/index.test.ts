import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const mockElements1 = [0, 1, 2, 3, 4, 5];
  const mockElements2 = [5, 4, 3, 2, 1, 0];
  const expectedOutput = {
    value: 0,
    next: {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    },
  };

  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(mockElements1)).toStrictEqual(expectedOutput);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(mockElements2);
    expect(result).toMatchSnapshot();
  });
});
