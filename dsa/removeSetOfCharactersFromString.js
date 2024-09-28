var removeChars = function (arr, string) {
  const map = new Map();
  let result = '';

  for (const c of arr) {
    map.set(c, true);
  }

  for (const c of string) {
    if (map.has(c)) {
      // skip
      continue;
    }
    result += c;
  }

  return result;
};

console.log(removeChars(['h', 'e', 'w', 'o'], 'hello world')); //  => "ll rld"
