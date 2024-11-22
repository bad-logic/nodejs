import os from 'node:os';
import { Worker } from 'node:worker_threads';

const jobs = Array.from({ length: 100 }, () => 100000000);

function timeConsumingTask() {
  let count = 0;
  for (let job of jobs) {
    for (let i = 0; i < job; i++) {
      count++;
    }
  }
  return count;
}

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }

  //   console.log({ chunks });
  return chunks;
}

function run(jobs, workers) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let completed = 0;
    const chunks = chunkify(jobs, workers);
    chunks.forEach((d, i) => {
      const worker = new Worker('./work.mjs');
      worker.postMessage(d);
      worker.on('message', (data) => {
        console.log('worker', i, ' has completed');
        count += data;
        completed++;
        worker.terminate();
        if (completed === workers) {
          return resolve(count);
        }
      });
    });
  });
}

if (import.meta.filename === process.argv[1]) {
  const t11 = performance.now();
  run(jobs, os.cpus().length).then((data) => {
    const t12 = performance.now();
    console.log('multi-threads:', t12 - t11, 'ms', { data });
  });

  //   const t1 = performance.now();
  //   const data = timeConsumingTask();
  //   const t2 = performance.now();
  //   console.log('without multi-threads:', t2 - t1, 'ms', { data });
}
