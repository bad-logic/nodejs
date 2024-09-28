const result = [];

var fact = function (num) {
  if (num === 0 || num === 1) return 1;
  else return num * fact(num - 1);
};

var combination = function (n, r) {
  return fact(n) / (fact(n - r) * fact(r));
};
// catalan numbers
// 1, 1, 2, 5, 14, 421, 132, 429, ....
var catalanNumbers = function (num) {
  return (1 / (num + 1)) * combination(2 * num, num);
};

var generateValidParens = function (n, str, open, close) {
  if (str.length === 2 * n) {
    result.push(str);
    return;
  }
  if (open < n) {
    str += '(';
    generateValidParens(n, str, open + 1, close);
    str = str.substring(0, str.length - 1);
  }
  if (close < open) {
    str += ')';
    generateValidParens(n, str, open, close + 1);
    str = str.substring(0, str.length - 1);
  }
};

var generateParenthesis = function (n) {
  generateValidParens(n, '', 0, 0);
  return result;
};

if (require.main === module) {
  const index = process.argv.indexOf('-n');
  let num = 1;
  if (index !== -1) {
    try {
      num = parseInt(process.argv[index + 1]);
    } catch (err) {
      throw new Error('value of -n must be a number');
    }
  }
  console.log({ num });
  console.log({ validCombination: catalanNumbers(num) });
  console.log(generateParenthesis(num));
}
