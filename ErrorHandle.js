const throwSynchronousError = () => {
  try {
    throw new Error("Fail!!!");
  } catch (err) {
    console.log(err.message);
  }
};

const throwAsynchronousError = () => {
  try {
    setTimeout(() => {
      throw new Error("Fail!!!");
    }, Math.random() * 100);
  } catch (err) {
    console.log(err.message);
  }
};

// throwSynchronousError();
// throwAsynchronousError();

const domain = require("domain").create();
domain.on("error", (err) => {
  console.log(err.message);
});

domain.run(() => {
  setTimeout(() => {
    throw new Error("Async Fail!!!");
  }, Math.random() * 100);
});
