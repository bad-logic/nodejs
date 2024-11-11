import fs from 'node:fs';
import { createHook } from 'node:async_hooks';
import EventEmitter from 'node:events';
import { fileURLToPath } from 'node:url';

// fs.writeSync(fd,content); fd -> file descriptor
// fd = 0 ; standard input (stdin)
// fd = 1 ; standard output (stdout)
// fd = 2 ; standard error (stderr)

createHook({
  init(asyncId, type, triggerAsyncId) {
    // console.log(); // this is async in itself triggering recursive calls to the async_hooks phases
    fs.writeSync(1, `Init: ${asyncId}, Type: ${type}\n`);
  },
  before(asyncId) {
    fs.writeSync(1, `Before: ${asyncId}\n`);
  },
  after(asyncId) {
    fs.writeSync(1, `After: ${asyncId}\n`);
  },
  destroy(asyncId) {
    fs.writeSync(1, `Destroy: ${asyncId}\n`);
  },
}).enable();

let pos = 0;
let messenger = new EventEmitter();

// Listener for EventEmitter
messenger.on('message', (msg) => {
  console.log(++pos + ' MESSAGE: ' + msg);
});

console.log(++pos + ' FIRST');

process.nextTick(() => {
  console.log(++pos + ' NEXT');
});

setTimeout(() => {
  console.log(++pos + ' QUICK TIMER');
}, 0);

setTimeout(() => {
  console.log(++pos + ' LONG TIMER');
}, 10);

setImmediate(() => {
  console.log(++pos + ' IMMEDIATE');
});

messenger.emit('message', 'Hello!');

fs.stat(fileURLToPath(import.meta.url), () => {
  console.log(++pos + ' FIRST STAT');
});

fs.stat(fileURLToPath(import.meta.url), () => {
  console.log(++pos + ' LAST STAT');
});

fs.readFile(fileURLToPath(import.meta.url), (e, c) => {
  console.log('contents of file');
  // console.log({ c: c.toString() });
});

console.log(++pos + ' LAST');
