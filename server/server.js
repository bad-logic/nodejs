const http = require(http);

const server = http.createServer(/* request listener*/);

const boot = () => [
  server.listen(/*PORT*/ 2000, () => {
    console.log("server running at port 2000");
  }),
];
const shutdown = () => {
  server.close();
};

if (require.main === module) {
  // run server
  boot();
} else {
  exports.shutdown = shutdown;
  //export variables that can be used by other files
}
