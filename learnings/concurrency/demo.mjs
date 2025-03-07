import crypto from 'node:crypto';
import { exit } from 'node:process';
import EventEmitter from 'node:stream';
import Semaphore from './semaphore.mjs';
import RoundRobin from './roundrobin.mjs';

// SITUATION
// Simulation of performing multiple expensive operations. lets say our system performs expensive operations for which it needs to acquire
// resources, which is done using semaphore lock and unlock mechanism
// Semaphore also allows arbitrary number of workers/threads to access the resource at a time. which can be provided to semaphore during initialization.
//
// Here in this demo we allow e number of operations to execute with limited resources which can be accessed t number of times concurrently.
// we have two versions, one semaphore version which has only one resource and a round robin version which has group of resources.

// This demo simulates the scenario of handling multiple tasks using semaphore and round robin version.
// in semaphore version we have only one resource and this resource can be concurrently accessed by lets say THRESHOLD workers/threads.
// and others can only get the resource when its released.
// in round robin version its the same but we have array of resources. it can be any number. here its assumed to be 3 resources available and each resource can
// be accessed by THRESHOLD threads.
// this demo shows how requests are handled or missed using the two methods.
//

// ################################################################ OUTPUTS   ##################################################################################################

// INPUT: node demo.mjs -t 100 -e 1000 -v round_robin
// OUTPUT:
// Stats : {
//   VERSION: 'round_robin',
//   THRESHOLD: 100,
//   TOTAL_EXECUTION: 1000,
//   COMPLETE_TASK: 1000,
//   INCOMPLETE_TASK: 0
// }

// INPUT: node demo.mjs -t 100 -e 1000 -v semaphore
// OUTPUT:
// Stats : {
//   VERSION: 'semaphore',
//   THRESHOLD: 100,
//   TOTAL_EXECUTION: 1000,
//   COMPLETE_TASK: 215,
//   INCOMPLETE_TASK: 785
// }

// ################################################################ CONFIG   ##################################################################################################

const prompt = `
        -t threshold, concurrent access to resources <number>
        -e number of executions/tasks <number>
        -v version (semaphore or round_robin)
        --help for help

        USAGE:
            node program.js : runs with default values
            node program.js -t 12 -e 10000 -v semaphore 
        `;

// ################################################################  Defaults     ##################################################################################################

const available_version = {
  ROUND_ROBIN: 'round_robin',
  SEMAPHORE: 'semaphore',
};
let VERSION = available_version.SEMAPHORE;
let THRESHOLD = 10;

let TOTAL_EXECUTION = 1000;
let COMPLETE_TASK = 0;
let INCOMPLETE_TASK = 0;

// ################################################################  Utilities     ##################################################################################################

function getRandomExecutionTime() {
  return Math.random() * 1000;
}

function getId() {
  return crypto.randomUUID();
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// ##################################################################### Preemptive #############################################################################################

const event = new EventEmitter('Round Robin Event');
event.on('complete', () => {
  console.log('crunching data ...');
  setTimeout(() => {
    console.log(' Stats :', {
      VERSION,
      THRESHOLD,
      TOTAL_EXECUTION,
      COMPLETE_TASK,
      INCOMPLETE_TASK,
    });
  }, 3000);
});

// ##################################################################### Semaphore version to handle limited access to a resource #############################################################################################

const sm = new Semaphore(THRESHOLD);

async function performExpensiveOperationsAsynchronouslySemaphoreVersion() {
  return new Promise(async (resolve) => {
    await sleep(getRandomExecutionTime());
    if (sm.canLock()) {
      sm.lock();
      await sleep(getRandomExecutionTime());
      COMPLETE_TASK++;
      sm.unlock();
      resolve();
    } else {
      //   console.log('cannot acquire lock');
      INCOMPLETE_TASK++;
      return resolve();
    }
  });
}

function executeSemaphoreVersion() {
  let semi = 0;
  const semaphoreIntervalID = setInterval(() => {
    performExpensiveOperationsAsynchronouslySemaphoreVersion();
    semi++;
    console.log({ semi });
    if (semi === TOTAL_EXECUTION) {
      clearInterval(semaphoreIntervalID);
      event.emit('complete');
    }
  }, 10);
}

// ##################################################################### Round Robin to handle limited access to a resource #############################################################################################

const rb = new RoundRobin([1, 2, 3], THRESHOLD);

async function performExpensiveOperationsAsynchronouslyRoundRobinAndSemaphoreVersion() {
  return new Promise(async (resolve) => {
    await sleep(getRandomExecutionTime());
    try {
      const { done, resource } = rb.getResources();
      //   console.log({ resource, cursor: rb.cursor });
      await sleep(getRandomExecutionTime());
      COMPLETE_TASK++;
      done();
      return resolve();
    } catch (err) {
      console.log({ err });
      // console.log('cannot acquire lock');
      INCOMPLETE_TASK++;
      return resolve();
    }
  });
}

function executeRoundRobinVersion() {
  let rri = 0;
  const rrbIntervalID = setInterval(() => {
    performExpensiveOperationsAsynchronouslyRoundRobinAndSemaphoreVersion();
    rri++;
    console.log({ rri });
    if (rri === TOTAL_EXECUTION) {
      clearInterval(rrbIntervalID);
      event.emit('complete');
    }
  }, 10);
}

// ##################################################################### Executing commands #############################################################################################

// if (require.main === module) {
if (import.meta.filename === process.argv[1]) {
  const variables = process.argv;
  variables.splice(0, 2);

  if (variables.length < 1) {
    console.log(prompt);
    exit(0);
  }

  const executionIndex = variables.indexOf('-e');
  if (executionIndex === -1) {
    console.log('going with default executions count ', TOTAL_EXECUTION);
  } else {
    try {
      TOTAL_EXECUTION = parseInt(variables[executionIndex + 1]);
    } catch (err) {
      console.log({ err });
      throw new Error('executions must be a number');
    }
  }

  const versionIndex = variables.indexOf('-v');

  if (versionIndex === -1) {
    console.log('going with default ', VERSION, ' version');
  } else {
    if (![available_version.ROUND_ROBIN, available_version.SEMAPHORE].includes(variables[versionIndex + 1])) {
      throw new Error(`unsupported version ${variables[versionIndex + 1]}`);
    }
    VERSION = variables[versionIndex + 1];
  }

  const thresholdIndex = variables.indexOf('-t');

  if (thresholdIndex === -1) {
    console.log('going with default threshold value ', THRESHOLD);
  } else {
    try {
      THRESHOLD = parseInt(variables[thresholdIndex + 1]);
    } catch (err) {
      throw new Error('threshold must be a number');
    }
  }

  console.log(`Used values: `, { THRESHOLD, VERSION, TOTAL_EXECUTION });

  if (VERSION === available_version.ROUND_ROBIN) {
    executeRoundRobinVersion();
  } else {
    executeSemaphoreVersion();
  }
}
