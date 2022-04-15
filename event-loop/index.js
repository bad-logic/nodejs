/*

 The event loop runs in the same (single) thread as your JavaScript code
 runs in. Blocking the event loop means blocking the entire thread.

 You don't start and/or stop the event loop. The event loop starts as soon
 as a process starts, and ends when no further callbacks remain to be
 performed. The event loop may, therefore, run forever.

 The event loop delegates many I/O operations to libuv, which manages
 these operations (using the power of the OS itself, such as thread
 pools), notifying the event loop when results are available. An easy-to-
 reason-about single-threaded programming model is reinforced with
 the efficiency of multithreading.
 
*/

let stop = false;

setTimeout(() => {
  print(`stopping...`);
  stop = true;
}, 1000);

while (stop === false) {
  console.log(..."busy");
}
// the above while loop will never terminate since it keeps on checking the value of the `stop` variable
// continuously. thus starving the event-loop.
// also the setTimeout api will not work as expected because the callback is never executed.
// since the main thread is busy with the while loop checking for the value of the `stop` variable.
// event loop will never get a chance to schedule the setTimeout (timer) callback for the execution,
// as the main thread is blocked by the while loop.
// this is the proof that event loop runs on the main thread.
