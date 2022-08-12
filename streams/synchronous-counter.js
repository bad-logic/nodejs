const { Readable, Writable } = require("stream");

const createCounterReader = () => {
  let count = 0;
  return new Readable({
    objectMode: true,
    read() {
      count += 1;
      console.log("reading", count);
      this.push(count);
    },
  });
};

const logWriter = new Writable({
  objectMode: true,
  write: (chunk, _, done) => {
    console.log("writing", chunk);
    done();
  },
});
const counterReader = createCounterReader();

counterReader.pipe(logWriter);
