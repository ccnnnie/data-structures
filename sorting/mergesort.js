/**
 * Dive and conquer
 * Time complexity O(nlogn)
 * Space complexity 
 * 
 *            [14, 5, 3, 6, 7, 3, 11, 3]
 *      [14, 5, 3, 6]        [7, 3, 11, 3]
 *  [14, 5]      [3,6]
 * [14]  [5]
 */

// Sort an array using mergesort algorithm

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