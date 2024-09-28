const crypto = require('node:crypto');
const { exit } = require('node:process');
const { EventEmitter } = require('node:stream');

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

// ################################################################  SEMAPHORE     ##################################################################################################

class Semaphore {
  threshold;
  counter;

  constructor(threshold) {
    this.threshold = threshold;
    this.counter = 0;
  }

  canLock() {
    return this.counter < this.threshold;
  }

  lock() {
    if (this.counter >= this.threshold) throw new Error('locks exceeded. try again later');
    this.counter++;
  }

  unlock() {
    this.counter--;
  }
}

// ################################################################  Round Robin     ##################################################################################################

class RoundRobin {
  semaphores;
  resources;
  cursor = 0;

  constructor(listOfResources) {
    this.semaphores = new Array(listOfResources.length).fill(new Semaphore(THRESHOLD));
    this.resources = listOfResources;
  }

  updateCursor() {
    this.cursor = (this.cursor + 1) % this.resources.length;
  }

  getResources() {
    const semaphore = this.semaphores[this.cursor];
    if (semaphore.canLock()) {
      const done = () => {
        this.updateCursor();
        semaphore.unlock();
      };
      return {
        done,
        resource: this.resources[this.cursor],
      };
    } else {
      // get another resources
      throw new Error('limit exceeded with round robin');
    }
  }
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

const rb = new RoundRobin([1, 2, 3]);

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

if (require.main === module) {
  const variables = process.argv;
  variables.splice(0, 2);

  if (variables.length < 1) {
    console.log(`
        -t threshold <number>
        -e number of executions <number>
        -v version (semaphore or round_robin)
        --help for help

        USAGE:
            node program.js : runs with default values
            node program.js -t 12 -e 10000 -v semaphore 
        `);
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
