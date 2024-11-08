// You are given a length-n array A consisting of 0s and 1s,
// arranged in sorted order. Give an Little-o(n) algorithm that counts the total number of
// 0s and 1s in the array. Your algorithm may not make use of auxiliary storage such as
// arrays or hashtables (more precisely, the only additional space used, beyond the given
// array, is O(1)). Explain why your algorithm runs in Little-o(n) time.

// An algorithm is o(n) if its growth rate is much more slowly than n.
// An algorithm is ω(n) if its growth rate is faster than n.
// An algorithm is θ(n) if its growth rate is at the same rate as n.
// An algorithm is O(n) if its growth rate is slower than or equal to n.
// An algorithm is Ω(n) if its growth rate is faster than or equal to n.

// PSEUDO CODE

// Algorithm findZeroesLastIndex(arr, s, e, l)
//     Input: sorted array containing 1 and 0, the start and the end index and the length of the array
//     Output: last index of the value 0
//     if s > e return -1
//     m <-- floor((s+e)/2)
//     if isValidLastIndexOfZero(arr,m,l) then
//         return m
//     else if arr[m] = 0 then
//         return findZeroesLastIndex(arr, m + 1, e,l)
//     else
//         return findZeroesLastIndex(arr, s, m - 1,l)

// Algorithm isValidLastIndexOfZero(arr,index,l)
//     Input: sorted array containing 1 and 0 and the index to check and the length of the array
//     Output: true or false based on whether the provided index is indeed the last index
//     if arr[index] = 0 && (index = l - 1 || arr[index + 1] = 1) then
//         return true
//     return false

// Algorithm countOnesAndZeroes(arr, s, e)
//     Input: sorted array containing 1 and 0, the start and the end index
//     Output: number of 1's and 0's in the array
//     index <- findZeroesLastIndex(arr, s, e + 1);
//     return {zeroCounter: index + 1, oneCounter: e - index};

function countOnesAndZeroes(arr) {
  function findZeroesLastIndex(arr, s, e) {
    // cannot find zeroes index. may be array has no zeroes only ones
    if (s > e) return -1;
    const m = Math.floor((s + e) / 2);

    if (isValidLastIndexOfZero(arr, m)) {
      return m;
    } else if (arr[m] === 0) {
      return findZeroesLastIndex(arr, m + 1, e);
    } else {
      return findZeroesLastIndex(arr, s, m - 1);
    }
  }

  function isValidLastIndexOfZero(arr, m) {
    // if arr[m] is zero and
    // m is last index or the next value is 1. then definitely m is the last index of 0
    if (arr[m] === 0 && (m === arr.length - 1 || arr[m + 1] === 1)) {
      return true;
    }
    return false;
  }

  const index = findZeroesLastIndex(arr, 0, arr.length - 1);
  console.log({ zeroes: index + 1, ones: arr.length - 1 - index });
}

if (require.main === module) {
  countOnesAndZeroes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]);
  countOnesAndZeroes([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ]);
  countOnesAndZeroes([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  ]);
  countOnesAndZeroes([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);

  countOnesAndZeroes([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  countOnesAndZeroes([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  countOnesAndZeroes([1, 1, 1, 1, 1, 1, 1, 1]);
}
