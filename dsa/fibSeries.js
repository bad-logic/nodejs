// using binet's formula
// only works for smaller numbers like up to 70th terms
// otherwise the error becomes significant so does not work.
function getFib(n) {
  const ratio = Math.pow(5, 0.5);
  return (Math.pow((1 + ratio) / 2, n) - Math.pow((1 - ratio) / 2, n)) / Math.pow(5, 0.5);
}

const fibRecursionCache = {};
function getRecursiveFib(n) {
  if (n === 0 || n === 1) return n;
  if (fibRecursionCache[n]) return fibRecursionCache[n];
  const n1 = BigInt(getRecursiveFib(n - 1));
  const n2 = BigInt(getRecursiveFib(n - 2));
  fibRecursionCache[n - 1] = n1;
  fibRecursionCache[n - 2] = n2;
  return n1 + n2;
}

const fibIterativeCache = {};
function getIterativeFib(n) {
  if (n === 0 || n === 1) return n;
  let a = 0;
  let b = 1;

  for (i = 2; i <= n; i++) {
    if (fibIterativeCache[i]) {
      b = fibIterativeCache[i];
      break;
    }
    const temp = BigInt(a + b);
    fibIterativeCache[i] = temp;

    a = BigInt(b);
    b = BigInt(temp);
  }

  return b;
}

if (require.main === module) {
  try {
    const index = process.argv.indexOf('-n');
    if (index === -1) throw new Error('Enter a term with flag -n to calculate the fib series value at n position');
    const term = parseInt(process.argv[index + 1]);
    if (isNaN(term)) {
      throw new Error('Enter a term with flag -n to calculate the fib series value at n position Eg: -n 4');
    }

    if (term <= 70) {
      console.log({ Binets: getFib(term) });
    }

    console.log({ iterative: getIterativeFib(term) });
    console.log({ recursive: getRecursiveFib(term) });
  } catch (err) {
    console.log({ err });
  }
}
