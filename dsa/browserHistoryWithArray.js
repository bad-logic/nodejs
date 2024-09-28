/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.history = [homepage];
  this.current = 0;
  this.size = 1;
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  if (this.current + 1 < this.history.length) {
    this.history[this.current + 1] = url;
  } else {
    this.history.push(url);
  }
  this.current = this.current + 1;
  this.size = this.current + 1;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  const cursor = this.current - steps;
  this.current = cursor < 0 ? 0 : cursor;
  return this.history[this.current];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  const cursor = this.current + steps;
  this.current = cursor >= this.size - 1 ? this.size - 1 : cursor;
  return this.history[this.current];
};

var obj = new BrowserHistory('leetcode.com');
obj.visit('google.com');
obj.visit('facebook.com');
obj.visit('youtube.com');
console.log(obj.back(1));
console.log(obj.back(1));
console.log(obj.forward(1));
obj.visit('linkedin.com');
console.log(obj.forward(2));
console.log(obj.forward(2));
console.log(obj.forward(7));

console.log({ obj });
