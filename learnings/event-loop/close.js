const fs = require('fs');

const readableStream = fs.createReadStream(__filename);
readableStream.close();

const readableStream1 = fs.createReadStream(__filename);
readableStream1.close();

readableStream.on('close', () => {
  console.log('this is from readableStream close event callback');
  Promise.resolve().then(() => console.log('this is Promise.resolve 2 inside close queue'));
  process.nextTick(() => console.log('this is process.nextTick 2 inside close queue'));
});

readableStream1.on('close', () => {
  console.log('this is from readableStream1 close event callback');
});
setImmediate(() => console.log('this is setImmediate 1'));
setTimeout(() => console.log('this is setTimeout 1'), 0);
Promise.resolve().then(() => console.log('this is Promise.resolve 1'));
process.nextTick(() => console.log('this is process.nextTick 1'));
