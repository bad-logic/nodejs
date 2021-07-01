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

  // PROCESS PERMISSIONS
  // Obviously, it’s usually a bad idea to run web services as root. Operations developers can utilize Ubuntu’s authbind
  // to bind to privileged ports (e.g., 80 for HTTP and 443 for HTTPS) without giving root access.
  // Alternatively, it’s possible to drop privileges after binding to a port. The idea here is that we pass the values of GID
  // (group ID) and UID (user ID) to the Node.js app and use the parsed values to set the group identity and user identity
  // of the process. This will not work on Windows, so you might want to use if/else and process.platform or NODE_ENV
  // to make your code cross-platform.
  http.createServer(
    /*listener ,*/ () => {
      console.log("server at port:3000");
      process.setgid(parseInt(process.env.GID, 10));
      process.setuid(parseInt(process.env.UID, 10));
    }
  );
} else {
  exports.shutdown = shutdown;
  //export variables that can be used by other files
}
