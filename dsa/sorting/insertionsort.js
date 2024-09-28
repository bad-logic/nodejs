/**
 * @param {number[]} arr
 * @return {number[]}
 *
 * Time complexity O(n^2)
 * Space Complexity O(1)
 */
const insertionSort = function (arr) {
  // [3,4,2,6,3,9,8]
  // assume the 0th index is always sorted
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    // check if the current value is greater than the previous value or not
    // if not then change with the previous value and so on to find its
    // correct spot in the array.
    while (j >= 0 && arr[j + 1] < arr[j]) {
      const temp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = temp;
      j--;
    }
  }

  return arr;
};

if (require.main === module) {
  console.log({ sorted: insertionSort([1, 5, 2, -1, 4, 5, -7, 90, 3, 56, 2]) });
}
