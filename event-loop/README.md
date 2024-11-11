#### Phases of Event loop

- Each phase has a FIFO queue of callbacks.

- `Timers Phase`: setTimeout, setInterval
- `I/O Phase`: http, fs
- `Poll Phase`:
- `Check Phase`: setImmediate
- `Close Phase`:

#### Queues

- NodeJS has six queues in total microTask ( nextTick, promise), timer, i/o, check and close queue.

- `MicroTask Queue` `(nextTick Queue, Promise Queue)`:

  - It has the highest priority.
  - To add callback function to nextTick queue, we can use process.nextTick(cbFn)
  - To add callback function to promise queue, Promise.resolve().then(cbFn); when the promise is resolved or rejected, the callback function is added to the promise queue
  - All callbacks in the microTask queues are executed before moving to next phase
  - order of execution is nextTick queue and promise queue
  - if nextTick adds to promise queue and vice versa, the other queue is again executed before moving to next phase

- `Timers Queue` : Min-Heap

  - To add callback function to timers queue we can use setTimeout and setInterval functions
  - After executing each completed timers callback function, control is passed to microTask queue and back.
  - Callbacks in microTask queues are executed in between the execution of callbacks in the timer queue

- `I/O Queue`:

  - To add callback function to the I/O queue, we can use most of the async built-in Node.JS modules.
  - When running setTimeout() with a delay of 0ms and an I/O async method, the order of execution can never be guaranteed.
  - Callbacks in microTask queues are executed in between the execution of callbacks in the I/O queue

  ```js
  const fs = require('fs');
  // if we pass in 0 milliseconds, the interval is set to max(1,0), which is 1
  // If the event loop enters the timer queue at 0.05ms and the 1ms callback hasn't been queued, control moves on to the I/O queue
  // On the other hand, if the CPU is busy and enters the timer queue at 1.01 ms, the timer will have elapsed and the callback function will be executed
  setTimeout(() => console.log('this is setTimeout 1'), 0);
  fs.readFile(__filename, () => {
    console.log('this is readFile 1');
  });
  ```

- `I/O Poll`

  - Checks if the any I/O operations are done, if so pushes the corresponding callback of that operation to I/O callback Queue.
  - This is a blocking phase.

- `Check Queue`

  - To add callback to check queue, we can use setImmediate function
  - Callbacks in microTask queues are executed in between the execution of callbacks in the Check queue

- `Close Queue`

  - They contain callbacks associated with the close event of an asynchronous task.
  - Callbacks in microTask queues are executed in between the execution of callbacks in the Close queue.
