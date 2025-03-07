//  ############################ CUSTOM PROMISEALL PROMISEALLSETTLED #######################################

const customPromiseAll = function (promises) {
  const arr = new Array(promises.length);
  let counter = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((prom, index) => {
      prom
        .then((v) => {
          arr[index] = v;
          if (++counter === promises.length) {
            return resolve({
              state: 'fulfilled',
              value: arr,
            });
          }
        })
        .catch((err) => {
          return reject({
            state: 'rejected',
            reason: err,
          });
        });
    });
  });
};

const customPromiseAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const result = new Array(promises.length);
    let counter = 0;
    promises.forEach((prom, index) => {
      prom
        .then((v) => {
          result[index] = {
            status: 'fulfilled',
            value: v,
          };
          if (++counter === promises.length) {
            return resolve(result);
          }
        })
        .catch((err) => {
          result[index] = {
            status: 'rejected',
            reason: err,
          };
          if (++counter === promises.length) {
            return resolve(result);
          }
        });
    });
  });
};

// ############################# TEST #######################################

async function main() {
  const promises = [Promise.resolve(3), Promise.resolve('hello'), Promise.reject('something went wrong')];
  customPromiseAllSettled(promises).then((val) => {
    console.log({ val });
  });
  // .catch((err) => {
  //   console.log({ err });
  // });
}

main();
