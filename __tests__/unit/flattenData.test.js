import flattenData from '../../src/hooks/books/flattenData';
import {
  mockBookResponseData,
  mockFlattenedBookData,
} from '../../testData/mockDataBooks';

describe('Test flattenData', () => {
  /**
   * Test Case: Verify Data Flattening
   *
   * This test case checks whether the flattenData function correctly
   * flattens the structure of the input data (mockResponseData) and
   * transforms it into the expected format (mockFlattenedData).
   */
  it('Expect data to be flattended correctly', () => {
    const flattenedData = flattenData(mockBookResponseData);
    expect(flattenedData).toEqual(mockFlattenedBookData);
  });
});
