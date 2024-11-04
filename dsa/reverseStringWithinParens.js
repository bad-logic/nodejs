// Write a function that reverses characters in (possibly nested) parentheses in the input string.

// Input strings will always be well-formed with matching ()s.

// Example

// For inputString = "(bar)", the output should be
// solution(inputString) = "rab";
// For inputString = "foo(bar)baz", the output should be
// solution(inputString) = "foorabbaz";
// For inputString = "foo(bar)baz(blim)", the output should be
// solution(inputString) = "foorabbazmilb";
// For inputString = "foo(bar(baz))blim", the output should be
// solution(inputString) = "foobazrabblim".
// Because "foo(bar(baz))blim" becomes "foo(barzab)blim" and then "foobazrabblim".

function solution(inputString) {
  const queue = [];

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === ')') {
      let temp = '';
      while (true) {
        const item = queue.pop();
        if (item === '(') {
          break;
        }
        temp += item;
      }
      for (const s of temp) {
        queue.push(s);
      }
      continue;
    }
    queue.push(inputString[i]);
  }

  return queue.join('');
}

console.log(solution('foo(bar(baz))blim')); // foobazrabblim
console.log(solution('should not change'));
console.log(solution('(bar)')); // rab
console.log(solution('foo(bar)baz')); // foorabbaz
console.log(solution('foo(bar)baz(blim)')); // foorabbazmilb
console.log(solution('foo(bar)baz')); // foorabbaz
