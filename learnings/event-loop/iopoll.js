const fs = require('fs');

setTimeout(() => console.log('this is setTimeout 1'), 0);

fs.readFile(__filename, () => {
  console.log('this is readFile 1');
  process.nextTick(() => {
    console.log('this is inner nextTick inside readFile');
    Promise.resolve().then(() => console.log("this is Promise.resolve inside readfile's nextTick"));
  });
});

fs.readFile(__filename, () => {
  console.log('this is readFile 2');
});

process.nextTick(() => console.log('this is process.nextTick 1'));
Promise.resolve().then(() => console.log('this is Promise.resolve 1'));
