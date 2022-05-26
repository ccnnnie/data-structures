/**
 * Sort an array using mergesort algorithm
 * https://www.interviewbit.com/tutorial/merge-sort-algorithm/ 
 * Divide and conquer
 *    1. Divide the unsorted list into sub-lists until there are N
 *      sub-lists with one element in each (N is the number of elements in the unsorted list).
 *    2. Merge the sub-lists two at a time to produce a sorted sub-list; 
 *      repeat this until all the elements are included in a single list.
 * Time complexity O(nlogn)
 * Space complexity  O(n) - this is not an in-place algorithm. we make new subarrays while sorting
 * 
 *            [14, 5, 3, 6, 7, 3, 11, 3]
 *      [14, 5, 3, 6]        [7, 3, 11, 3]
 *  [14, 5]      [3,6]
 * [14]  [5]
 */

const mergeSort = (arr) => {
  const start = 0;
  const end = arr.length - 1;
  // base case
  if (start >= end) return arr;
  const mid = (start + end) / 2;
  const left = arr.slice(0, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  return merge(mergeSort(left), mergeSort(right));
}

const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  const sorted = [];
  while (i < arr1.length && j < arr2.length) {
    const num1 = arr1[i];
    const num2 = arr2[j];
    if (num1 < num2) {
      sorted.push(num1);
      i++;
    } else {
      sorted.push(num2);
      j++;
    }
  }
  return [...sorted, ...arr1.slice(i), ...arr2.slice(j)]
}

module.exports = { mergeSort, merge };