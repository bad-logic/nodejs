/*
    setTimeout
    setInterval
*/

const timeoutId = setTimeout(() => {
  console.log("idle for 1 second");
}, 1000);

clearTimeout(timeoutId);

const intervalId = setInterval(() => {
  console.log("repeats 1 second");
}, 1000);

clearInterval(intervalId);
