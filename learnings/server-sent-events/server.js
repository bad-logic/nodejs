const fs = require("fs");
const http = require("http");

let theUser = null;

let userPos = 0;
let tweetFile = "tweets.txt";

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });
      fs.readFile("index.html", (err, content) => {
        if (err) {
          res.write("retry: 2000\n");
          res.end();
          return;
        }
        res.write(`${content.toString()}`);
        res.end();
      });
    }
    if (req.url === "/events") {
      console.log({ event: "event triggered" });
      theUser = res;
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });
      start();
      res.socket.on("close", () => {
        console.log("socket closed");
        theUser = null;
      });
    }
  })
  .listen(8080);

const sendNext = function (fd) {
  let buffer = Buffer.alloc(140);
  fs.read(fd, buffer, 0, 140, userPos * 140, (err, num) => {
    if (!err && num > 0 && theUser) {
      ++userPos;
      theUser.write(`data: ${buffer.toString("utf-8", 0, num)}\n\n`);
      return process.nextTick(() => {
        sendNext(fd);
      });
    }
  });
};

function start() {
  fs.open(tweetFile, "r", (err, fd) => {
    if (err) {
      return setTimeout(start, 1000);
    }
    fs.watch(tweetFile, (event, filename) => {
      if (event === "change") {
        sendNext(fd);
      }
    });
  });
}
