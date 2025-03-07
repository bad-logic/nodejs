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

function hello(param1, param2) {
  console.log({ this: this, param1, param2 });
  console.log('this is ', this.name);
}
const obj = { name: 'ben', status: 'healthy' };

const func = hello.customApply(obj, [obj, 1]);
const h = hello.apply(obj, [obj, 1]);
