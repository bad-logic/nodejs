Array.prototype.getLast = function () {
  return this[this.length - 1];
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.getLast());

//  ############################ CUSTOM BIND, CALL AND APPLY #######################################
Function.prototype.customBind = function (ctx, ...args) {
  const func = this;
  let newCtx = ctx;
  if (typeof ctx !== 'object') {
    newCtx = [ctx];
  }
  return function (...arg) {
    Object.defineProperty(newCtx, 'temp', { value: func, enumerable: false });
    const result = newCtx.temp(...args, ...arg);
    return result;
  };
};

Function.prototype.customCall = function (ctx, ...args) {
  let newCtx = ctx;
  if (typeof ctx !== 'object') {
    newCtx = [ctx];
  }
  Object.defineProperty(newCtx, 'temp', { value: this, enumerable: false });
  return newCtx.temp(...args);
};

Function.prototype.customApply = function (ctx, args) {
  if (args && !Array.isArray(args)) {
    throw new Error('must be an array');
  }
  Object.defineProperty(ctx, 'temp', { value: this, enumerable: false });
  return ctx.temp(...args);
};

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
function hello(param1, param2) {
  console.log({ this: this, param1, param2 });
  console.log('this is ', this.name);
}
const obj = { name: 'ben', status: 'healthy' };

const func = hello.customApply(obj, [obj, 1]);
const h = hello.apply(obj, [obj, 1]);

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
