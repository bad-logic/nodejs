var MinStack = function () {
  this.stack = new Int32Array(10);
  this.min = new Int32Array(10);
  this.size = 0;
};

MinStack.prototype.resize = function () {
  const newStack = new Int32Array(this.stack.length * 2);
  const newMin = new Int32Array(this.min.length * 2);
  newStack.set(this.stack);
  newMin.set(this.min);
  this.stack = newStack;
  this.min = newMin;
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  if (this.size === 0) {
    this.stack[this.size] = val;
    this.min[this.size++] = val;
  } else {
    if (this.size === this.stack.length) {
      this.resize();
    }
    let min = this.getMin();
    if (val < min) {
      min = val;
    }
    this.stack[this.size] = val;
    this.min[this.size++] = min;
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.size--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.size - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min[this.size - 1];
};
