### SHUTDOWN PROCESS LIFECYCLE

##### EXIT METHODS

- `process.exit([code])`:
  - `0` : success
  - `>0` : Failure
- `process.abort()`: exit immediately and generate a core file

  - useful for postmortem debugging with tools like llnode
  - Need to enable core dumps, in system. In \*NIX systems you can run `ulimit -c unlimited`

##### EXIT EVENTS

- `beforeExit`
  - handler can make asynchronous calls and event loop will continue until completion
  - not emitted for conditions causing explicit termination: `process.exit()` , `uncaughtException`
- `exit`
  - handler can only make synchronous calls, event loop will not run.
  - emitted when `process.exit()` is called explicitly

<!-- Example -->

```js
process.on('beforeExit', (code) => {
  setTimeout(() => {
    console.log('will be executed. code:', code);
    process.exit(code);
  }, 1000);
});

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('will not execute');
  }, 1000);
  console.log('will execute. code:', code);
});
```

##### SIGNAL EVENTS

- `SIGTERM`: send by process monitor
- `SIGINT`: CTRL + C

<!-- Example -->

```js
process.on('SIGTERM', (signal) => {
  console.log(`process ${process.pid} received signal ${signal}`);
  process.exit(0);
});

process.on('SIGINT', (signal) => {
  console.log(`process ${process.pid} received signal ${signal}`);
  process.exit(0);
});
```

##### ERROR EVENTS

- `uncaughtException`: when error is not handled properly.
- `unhandledRejection`: when promise is rejected but no handle is attached to the promise.

```js
process.on('uncaughtException', (err) => {
  console.log('uncaught exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('unhandled rejection', reason, promise);
  process.exit(1);
});
```

##### GRACEFUL SHUTDOWN

```js
process.on('', () => {
  // close http server.
  // close db connections.

  // wait 1s for cleanup if any pending requests or connections needs to be closed

  // By calling .unref(), the process can exit naturally if there is nothing else keeping the event loop active.
  // .unref() method ensures that the timer does not keep the Node.js event loop active.
  setTimeout(() => {
    console.error('Forcing shutdown after timeout.');
    process.exit(0);
  }, 1000).unref();
});
```
