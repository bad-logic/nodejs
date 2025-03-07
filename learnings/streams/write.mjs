import fs from 'node:fs';

const stream = fs.createWriteStream(import.meta.dirname + '/log.io', {
  flags: 'a',
});

process.stdin.on('data', (buf) => {
  stream.write(buf);
});
