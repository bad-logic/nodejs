// File stream.js
// Use Node's stream module, and get Readable inside
let Readable = require("stream").Readable;
// Make our own readable stream, named r
let r = new Readable();
// Start the count at 0
let count = 0;
// Downstream code will call r's _read function when it wants some data from r
r._read = function () {
  count++;
  if (count > 10) {
    // After our count has grown beyond 10
    return r.push(null); // Push null downstream to signal we've got no more data
  }
  setTimeout(() => r.push(count + "\n"), 500); // A half second from now, push our count on a line
};
// Have our readable send the data it produces to standard out
console.log({ r });
r.pipe(process.stdout);
