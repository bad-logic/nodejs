process.nextTick(() => console.log('this is process.nextTick 1'));
process.nextTick(() => {
  console.log('this is process.nextTick 2');
  process.nextTick(() => console.log('this is the inner next tick inside next tick'));
});
process.nextTick(() => console.log('this is process.nextTick 3'));
setTimeout(() => {
  console.log('hey timer phase');
});
Promise.resolve().then(() => console.log('this is Promise.resolve 1'));
Promise.resolve().then(() => {
  console.log('this is Promise.resolve 2');
  process.nextTick(() => {
    console.log('this is the inner next tick inside Promise then block');
    process.nextTick(() => {
      console.log('inner inner next tick');
      Promise.resolve().then(() => console.log('this is inner inner next tick Promise.resolve'));
    });
  });
});
Promise.resolve().then(() => console.log('this is Promise.resolve 3'));
