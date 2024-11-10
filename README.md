### NODEJS

- Synchronous, Single Threaded , Blocking language.

> JavaScript is synchronous by default. But the runtime provides you with the environment to execute your code in asynchronous manner.

> JavaScript has a single thread by default, and offloads operations to the system kernel whenever possible to free the main thread. since modern kernels are multi-threaded, they can execute multiple operations in the background. when one of these operation is completed, the kernel tells NODEJS, and the appropriate callback is added to the poll queue which will be executed once the call stack is empty.

- Synchronous Tasks are handled by v8.
- Asynchronous ( n/w request, handling files ) Tasks are handled by libuv.

![NODEJS RUNTIME](./assets/nodejs_runtime.png)

#### Execution Order

- Synchronous JS code takes precedence over async JS code.
- All JS code are executed in v8 CallStack.
- Only after the call stack is emptied, the event loop comes into play.
- within the event loop, each phase executes callback scheduled for that particular queue.
- After Each phase the callbacks from microTasks are executed.

- Having lots of synchronous code will starve the event loop.

#### Event Loop Starvation

- Event loop phases are not given a chance to execute

```js
// Example
// This program will run infinitely

let stop = false;
setTimeout(() => {
  stop = true;
}, 0);

let i = 0;
while (!stop) {
  console.log(i++);
}
```

- NodeJS continues to execute callbacks from microTask queue until its empty. so adding microTasks within the execution of microTasks will starve the event loop.

```js
// Example
// This program will run infinitely
let stop = false;
setTimeout(() => {
  stop = true;
});

function handlePromise() {
  const func = () => {
    return Promise.resolve('resolved');
  };

  func().then((v) => {
    console.log({ v });
    if (!stop) {
      globalThis.queueMicrotask(() => handlePromise());
    }
  });
}

handlePromise();
```

#### NODEJS EXECUTION STEPS:

1. Synchronous user written JS codes are executed first. and when V8 callStack is empty it will execute microTasks.
2. `MicroTask Queue Execution`: After call stack is emptied, all callbacks in microTask queue is executed.
   > MicroTask Queue has two Queues ( nextTick and promise ). nextTick has precedence over promise queue. only after emptying nextTick queue, promise queue is executed.
3. `Timers Phase` : Callbacks of timer queues are pushed to V8 callStack if they are ready and executed.
4. `MicroTask Queue Execution`: After call stack is emptied, any callbacks in microTask queue is executed.
5. `I/O Phase` : Callbacks of I/O queues are pushed to V8 callStack if they are ready and executed.
6. `MicroTask Queue Execution`
7. `I/O Polling / Poll Phase` : Checks if the I/O operations are complete and queue the corresponding callback to I/O callback queue.
8. `Check Phase` : All callbacks of the check queue are pushed to V8 callStack and executed.
9. `MicroTask Queue Execution`
10. `Close Callbacks Phase`: All callbacks in the close queue are pushed to V8 callStack and executed.
11. `MicroTask Queue Execution`

```
 -------------------------------------------------------------------------
|                                                                         |
|              -----------------------------------                        |
|        |---->|  nextTickQueue -> promises       |                       |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|         ---->|             TIMERS              |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|  nextTickQueue -> promises      |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|          I/O CALLBACKS          |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|  nextTickQueue -> promises      |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|         I/O POLLING             |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|  nextTickQueue -> promises      |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |-----|    setImmediate CALLBACKS       |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|  nextTickQueue -> promises      |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|         CLOSE CALLBACKS         |                        |
|        |     -----------------------------------                        |
|        |                     |                                          |
|        |     -----------------------------------                        |
|        |---->|  nextTickQueue -> promises      |                        |
|              -----------------------------------                        |
|                                                                         |
|                                                                         |
|                                                                         |
 -------------------------------------------------------------------------
```

#### MicroTasks

- NodeJS implementation of MicroTask differs from the Browser Implementation.
- NodeJS provides a wrapper around a v8's microTask queue to give a predictable behavior.
- The priority of nextTick queue is higher than promise queue which is not the case in browser. in fact browser do not support nextTick api

#### Profile your application

```bash
$ node --prof program.<js|mjs>
```

#### Expose garbage collector for debugging memory issues

```bash
$ node --expose-gc --inspect program.<js|mjs>
```

#### Increase the heap memory for the program

```bash
$ node --max-old-space-size=6000 program.<js|mjs>
```

#### Increase the thread poll size of libuv. ( default = 4, max = 1024 )

```bash
$ UV_THREADPOOL_SIZE=<number> node program.<js|mjs>
```

```js
// dynamically adjust threadpool size
const os = require('os');
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
```
