const { mergeSort, merge } = require('./mergesort');

describe('Merge sort', () => {
  test('correctly sorts array and returns it', () => {
    const nums = [14, 5, 3, 6, 7, 13, 11, 17];
    const sorted = [...nums].sort((a, b) => a - b);
    expect(mergeSort(nums)).toEqual(sorted);
    nums.push(10);
    const sortedNew = [...nums].sort((a, b) => a - b);
    expect(mergeSort(nums)).toEqual(sortedNew);
  });

  test('merges two arrays in ascending order', () => {
    expect(merge([1], [2])).toEqual([1,2])
  });

  test('sorts array with multiple repeated numbers', () => {
    const nums = [14, 3, 3, 6, 7, 3, 11, 3, 21, 7, 14];
    const sorted = [...nums].sort((a, b) => a - b);
    expect(mergeSort(nums)).toEqual(sorted);
  });
});
