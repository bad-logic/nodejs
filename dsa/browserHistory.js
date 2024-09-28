var Node = function (val, prev, next) {
  this.val = val;
  this.prev = prev;
  this.next = next;
};
/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.current = new Node(homepage);
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  const node = new Node(url);
  this.current.next = node;
  node.prev = this.current;
  this.current = node;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  let node = this.current;
  let i = 0;
  while (i < steps) {
    if (!node.prev) break;
    node = node.prev;
    i++;
  }
  this.current = node;
  return node.val;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  let node = this.current;
  let i = 0;
  while (i < steps) {
    if (!node.next) break;
    node = node.next;
    i++;
  }
  this.current = node;
  return node.val;
};

var obj = new BrowserHistory('leetcode.com');
obj.visit('google.com');
obj.visit('facebook.com');
obj.visit('youtube.com');
console.log({ obj });
console.log(obj.back(1));
console.log(obj.back(1));
console.log(obj.forward(1));
obj.visit('linkedin.com');
console.log(obj.forward(2));
console.log(obj.forward(2));
console.log(obj.forward(7));
