/*
    Generators are function execution contexts that can be paused and resumed.  

    A normal function will likely return a value, the function fully executes and then terminates
    A generator function will return a generator object, and stop but context of generator is not disposed.
    you can re-enter the generator function at a later point in time and pickup the further results
    by calling next() on the function.

*/

function* generatorFunction(start) {
  let n = start;
  while (true) {
    yield n;
    n++;
  }
}

const increase = generatorFunction(10);

console.log({ increase });
console.log(increase.next());
console.log(increase.next());
console.log(increase.next());
console.log(increase.next());
console.log(increase.next());
