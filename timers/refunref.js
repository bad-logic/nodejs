const intervalId = setInterval(() => {
  console.log("repeats 1 second");
}, 1000);
intervalId.unref();

setTimeout(() => {
  intervalId.ref();
}, 1000);
