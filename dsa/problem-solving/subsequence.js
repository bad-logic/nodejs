// Two non empty array A and B are given.
// Example: A = [1, 2, 3, 4, 5] and B = [2, 4]
// write a function to return true if B is subsequence of A otherwise false
// The array itself is also a subsequence.

function isValidSubsequence(array, subArray) {
  let counter = 0;
  for (const item of subArray) {
    if (array.includes(item)) {
      counter++;
    }
  }
  return counter === subArray.length;
}

// doesnot work if the subArray doesnot have the same order as array
function isValidSequenceFast(array, subArray) {
  let pointer = 0;
  for (const item of array) {
    if (item === subArray[pointer]) {
      pointer++;
    }
    if (pointer === subArray.length) return true;
  }
  return false;
}

console.time("slow");
console.log(isValidSubsequence([1, 2, 3, 4, 5], [2, 4])); // true
console.timeEnd("slow");

console.time("slow");
console.log(isValidSubsequence([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])); // true
console.timeEnd("slow");

console.time("slow");
console.log(isValidSubsequence([5, 11, 3, 50, 60, 90], [2, 4])); // false
console.timeEnd("slow");

console.time("slow");
console.log(
  isValidSubsequence([5, 11, 3, 50, 60, 90], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
); // false
console.timeEnd("slow");

console.time("slow");
console.log(isValidSubsequence([5, 11, 3, 50, 60, 90], [60, 5, 11])); // true
console.timeEnd("slow");

console.time("fast");
console.log(isValidSequenceFast([1, 2, 3, 4, 5], [2, 4])); // true
console.timeEnd("fast");

console.time("fast");
console.log(isValidSequenceFast([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])); // true
console.timeEnd("fast");

console.time("fast");
console.log(isValidSequenceFast([5, 11, 3, 50, 60, 90], [2, 4])); // false
console.timeEnd("fast");

console.time("fast");
console.log(
  isValidSequenceFast([5, 11, 3, 50, 60, 90], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
); // false
console.timeEnd("fast");

console.time("fast");
console.log(isValidSequenceFast([5, 11, 3, 50, 60, 90], [60, 5, 11])); // true
console.timeEnd("fast");
