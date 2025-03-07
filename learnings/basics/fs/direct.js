const fs = require("fs");

const walk = (dir, done, emitter) => {
  let results = {};
  emitter = emitter || new (require("events").EventEmitter)();
  fs.readdir(dir, (err, list) => {
    let pending = list.length;
    if (err || !pending) {
      return done(err, results);
    }
    list.forEach((file) => {
      let dfile = require("path").join(dir, file);
      fs.stat(dfile, (err, stat) => {
        if (stat.isDirectory()) {
          emitter.emit("directory", dfile, stat);
          return walk(dfile, (err, res) => {
            results[file] = res;
            !--pending && done(null, results);
          });
        }
        emitter.emit("file", dfile, stat);
        results[file] = stat;
        !--pending && done(null, results);
      });
    });
  });
  return emitter;
};

walk(".", (err, res) => {
  // console.log(require("util").inspect(res, { depth: null }));
})
  .on("file", (path, stat) => {
    console.log(`File: ${path} - ${stat.size}`);
  })
  .on("directory", (path, stat) => {
    console.log(`Directory: ${path} - ${stat.size}`);
  });
