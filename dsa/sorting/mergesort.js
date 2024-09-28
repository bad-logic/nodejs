var Merge = function () {};

/**
 *
 * @param {number[]} arr
 * @returns {number[]}
 *
 * O(nLog2(n))
 */
Merge.prototype.sort = function (arr) {
  if (arr.length === 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, mid);
  const secondHalf = arr.slice(mid);

  const arr1 = this.sort(firstHalf);
  const arr2 = this.sort(secondHalf);

  let cursor1 = 0;
  let cursor2 = 0;
  let position = 0;

  // basically merging two sorted arrays
  while (cursor1 < arr1.length && cursor2 < arr2.length) {
    if (arr1[cursor1] < arr2[cursor2]) {
      arr[position] = arr1[cursor1];
      cursor1++;
    } else {
      arr[position] = arr2[cursor2];
      cursor2++;
    }
    position++;
  }

  let remainingArray;

  if (cursor1 === arr1.length) {
    remainingArray = arr2.slice(cursor2);
  }

  if (cursor2 === arr2.length) {
    remainingArray = arr1.slice(cursor1);
  }

  for (const it of remainingArray) {
    arr[position] = it;
    position++;
  }

  return arr;
};

/**
 *
 * @param {number[]} arr
 * @param {number} s start index
 * @param {number} e end index
 * @returns {number[]}
 */
Merge.prototype.sortWithLessMemory = function (arr, s, e) {
  if (s === e) return arr;

  const m = Math.floor((s + e) / 2);

  this.sortWithLessMemory(arr, s, m);
  this.sortWithLessMemory(arr, m + 1, e);

  // basically merging two sorted arrays

  const merge = (arr, s, m, e) => {
    const arr1 = arr.slice(s, m + 1);
    const arr2 = arr.slice(m + 1, e + 1);

    let cursor1 = 0;
    let cursor2 = 0;
    let position = s;

    while (cursor1 < arr1.length && cursor2 < arr2.length) {
      if (arr1[cursor1] <= arr2[cursor2]) {
        arr[position] = arr1[cursor1];
        cursor1++;
      } else {
        arr[position] = arr2[cursor2];
        cursor2++;
      }
      position++;
    }

    let remainingArray;

    if (cursor1 === arr1.length) {
      remainingArray = arr2.slice(cursor2);
    }

    if (cursor2 === arr2.length) {
      remainingArray = arr1.slice(cursor1);
    }

    for (const it of remainingArray) {
      arr[position] = it;
      position++;
    }
  };

  merge(arr, s, m, e);
  return arr;
};

if (require.main === module) {
  console.log({ arr: [1, 5, 2, -1, 4, 5, -7, 90, 3, 56, 2] });
  console.log({ sorted: new Merge().sort([1, 5, 2, -1, 4, 5, -7, 90, 3, 56, 2]) });
  console.log({ sorted: new Merge().sortWithLessMemory([1, 5, 2, -1, 4, 5, -7, 90, 3, 56, 2], 0, 11) });
}
