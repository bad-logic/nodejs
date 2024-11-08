function* counter() {
  let count = 0;
  while (true) {
    count++;
    console.log("reading", count);
    yield count;
  }
}

const logger = (iterator) => {
  for (const item of iterator) {
    console.log("writing", item);
  }
};

logger(counter());
