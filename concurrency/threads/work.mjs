import { parentPort } from 'node:worker_threads';
function timeConsumingTask(jobs) {
  let count = 0;
  for (let job of jobs) {
    for (let i = 0; i < job; i++) {
      count++;
    }
  }
  return count;
}

if (import.meta.filename === process.argv[1]) {
  parentPort.on('message', (msg) => {
    const sum = timeConsumingTask(msg);
    parentPort.postMessage(sum);
  });
}
