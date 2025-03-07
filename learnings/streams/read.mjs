import fs from 'fs';

const filename = import.meta.dirname + '/log.io';
// let bytesRead = 0;

const fd = fs.openSync(filename);
if (!fd) throw Error('file not found');

function readFile(fd) {
  //   fs.read(fd, Buffer.alloc(256), 0, 256, bytesRead, (err, bytes, buf) => {
  //     console.log(buf.toString());
  //     bytesRead += bytes;
  //   });

  // no need to track the bytes length; because we are already opening the file and reusing same fd; it automatically happens

  fs.read(fd, (err, bytes, buf) => {
    if (err) throw Error(err);
    // bytesRead += bytes;
    console.log(buf.toString());
  });
}

readFile(fd);

fs.watch(import.meta.dirname + '/log.io', (buf) => {
  if (buf === 'change') {
    readFile(fd);
  }
});
