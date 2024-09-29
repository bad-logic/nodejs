function quick(arr, s, e) {
  if (e - s <= 0) return arr;
  let pos = s;
  // for the implementation index e is the pivot

  for (let i = s; i < e; i++) {
    if (arr[i] < arr[e]) {
      // swap between pos and index value
      if (i !== pos) {
        const temp = arr[i];
        arr[i] = arr[pos];
        arr[pos] = temp;
      }
      pos++;
    }
  }

  // swap pos and pivot element
  const temp = arr[e];
  arr[e] = arr[pos];
  arr[pos] = temp;

  quick(arr, s, pos - 1);
  quick(arr, pos + 1, e);
  return arr;
}

function quickSort(arr) {
  return quick(arr, 0, arr.length - 1);
}

if (require.main === module) {
  console.log({ sorted: quickSort([1, 5, 2, -1, 4, 5, -7, 90, 3, 56, 2]) });
  console.log({ sorted: quickSort([4, 2, 3, 6, 1]) });
  console.log({ sorted: quickSort([4, 3, 2, 1]) });
}
