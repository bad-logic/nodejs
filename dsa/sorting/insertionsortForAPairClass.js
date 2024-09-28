/**
 *
 * @param {Number} key
 * @param {String} value
 */
var Pair = function (key, value) {
  this.key = key;
  this.value = value;
};

var Solution = function () {};

/**
 *
 * @param {Pair[]} arr
 * @returns {Pair[]}
 */
Solution.prototype.insertionSort = function (arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    while (j >= 0 && arr[j].key > arr[j + 1].key) {
      // swap places
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      j--;
    }
  }
  return arr;
};

if (require.main === module) {
  const arr = [new Pair(3, 'apple'), new Pair(99, 'oranges'), new Pair(0, 'Pears'), new Pair(34, 'Mango')];
  console.log({ arr });
  console.log({ sorted: new Solution().insertionSort(arr) });
}
