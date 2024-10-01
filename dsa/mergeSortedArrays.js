// Consider the following problem: As input you are given two sorted arrays of integers.
// Your objective is to design an algorithm that would merge the two arrays together to
// form a new sorted array that contains all the integers contained in the two arrays.

// Algorithm Merge(a,b,la,lb)
//     Input: An already sorted array a and b and their respective lengths la and lb
//     Output: Sorted array after merging both arrays a and b

//     cursorA <- 0
//     cursorB <- 0
//     result <- []
//     pos <- 0

//     while cursorA < la && cursorB < lb do
//         if a[cursorA] < b[cursorB] then
//             result[pos] <- a[cursorA]
//             cursorA++
//         else
//             result[pos] <- b[cursorB]
//             cursorB++
//         pos++

//     if cursorA = la then
//         while pos < la+lb do
//             result[pos] <- b[cursorB]
//             cursorB++
//             pos++
//     if cursorB = lb then
//         while pos < la+lb do
//             result[pos] <- a[cursorA]
//             cursorA++
//             pos++
//     return result

function merge(a, b) {
  let cursorA = 0;
  let cursorB = 0;
  let pos = 0;

  const result = [];
  const resultLength = a.length + b.length;

  while (cursorA < a.length && cursorB < b.length) {
    if (a[cursorA] < b[cursorB]) {
      result[pos] = a[cursorA];
      cursorA++;
    } else {
      result[pos] = b[cursorB];
      cursorB++;
    }
    pos++;
  }

  if (cursorA === a.length) {
    while (pos < resultLength) {
      result[pos] = b[cursorB];
      cursorB++;
      pos++;
    }
  }
  if (cursorB === b.length) {
    while (pos < resultLength) {
      result[pos] = a[cursorA];
      cursorA++;
      pos++;
    }
  }
  return result;
}

if (require.main === module) {
  console.log(merge([1, 4, 5, 8, 17], [2, 4, 8, 11, 13, 21, 23, 25]));
}
