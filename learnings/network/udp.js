const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server
  .on("message", (msg) => {
    process.stdout.write(`[Message] : ${msg}`);
  })
  .bind(41234);
