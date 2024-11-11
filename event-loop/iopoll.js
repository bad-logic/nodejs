const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('this is readFile 1');
});

setImmediate(() => {
  console.log('this is setImmediate 1');
  process.nextTick(() => {
    console.log('this is process.nextTick inside setimmediate');
    Promise.resolve().then(() => console.log("this is Promise.resolve inside setimmediate1's nextTick"));
  });
});
process.nextTick(() => console.log('this is process.nextTick 1'));
Promise.resolve().then(() => console.log('this is Promise.resolve 1'));
setImmediate(() => console.log('this is setImmediate 2'));
setTimeout(() => console.log('this is setTimeout 1'), 0);

for (let i = 0; i < 2000000000; i++) {}
