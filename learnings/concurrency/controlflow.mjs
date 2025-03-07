function executeTask(task, cb) {
  console.log('Performing Task :', task);
  setTimeout(() => {
    cb(task + 100);
  }, 100);
}

function runInSeries(tasks) {
  const result = [];

  function run(task) {
    if (task) {
      return executeTask(task, (res) => {
        result.push(res);
        return run(tasks.shift());
      });
    }
    console.log('Series: ', { result });
  }

  run(tasks.shift());
}

function runInParallel(tasks) {
  const result = [];
  tasks.forEach((t) => {
    executeTask(t, (res) => {
      result.push(res);
      if (result.length === tasks.length) {
        console.log('Parallel:', { result });
      }
    });
  });
}

function runLimitedParallel(x, tasks) {
  const result = [];
  const taskLength = tasks.length;
  function parallel(task, cb) {
    executeTask(task, cb);
  }

  function final() {
    console.log('limitedParallel: ', { result });
  }

  let counter = 0;
  function setup() {
    while (counter < x) {
      parallel(tasks.shift(), (res) => {
        result.push(res);
        counter--;
        if (tasks.length > 0) {
          setup();
        }
        if (result.length === taskLength) {
          final();
        }
      });
      counter++;
    }
  }
  setup();
}

if (import.meta.filename === process.argv[1]) {
  // console.log('######## RUNNING IN SERIES');
  // runInSeries([1, 2, 3, 4, 5, 6]);
  // console.log('######## RUNNING IN PARALLEL');
  // runInParallel([1, 2, 3, 4, 5, 6]);
  console.log('########  RUNNING IN LIMITED PARALLEL');
  runLimitedParallel(3, [1, 2, 3, 4, 5, 6]);
}
