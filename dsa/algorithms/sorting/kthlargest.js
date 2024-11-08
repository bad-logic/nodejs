var findKthLargest = function (nums, k) {
  const position = nums.length - k;

  // quick sort
  var quickSelect = (s, e) => {
    if (e - s <= 0) return;

    let cursor = s;
    console.log({ s, e, nums });
    // e is the pivot index
    for (let i = s; i < e; i++) {
      if (nums[i] < nums[e]) {
        if (i !== cursor) {
          const temp = nums[i];
          nums[i] = nums[cursor];
          nums[cursor] = temp;
        }
        cursor++;
      }
    }
    //swap cursor and pivot
    const temp = nums[e];
    nums[e] = nums[cursor];
    nums[cursor] = temp;

    if (cursor === position) {
      // found our kth largest element
      return;
    }
    if (position > cursor) {
      quickSelect(cursor + 1, e);
    } else {
      quickSelect(s, cursor - 1);
    }
  };

  // sort in ascending order
  quickSelect(0, nums.length - 1);
  console.log({ k, nums });
  return nums[position];
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
