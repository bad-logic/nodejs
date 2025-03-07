import { PerformanceObserver } from 'perf_hooks';
// subscribe to gc notifications using perf_hooks

const obs = new PerformanceObserver((lst) => {
  const entry = lst.getEntries()[0];
  console.log({ entry });
});

obs.observe({ entryTypes: ['gc'] });

import os from 'os';

let len = 1_000_000;
const entries = new Set();

function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };

  entries.add(entry);
}

function summary() {
  console.log(`\nTotal: ${entries.size} entries`);
}

// execution
(() => {
  while (len > 0) {
    addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }

  summary();
})();

setTimeout(() => {
  obs.disconnect();
}, 10);
