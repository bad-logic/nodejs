// QUEUE implementation

var Node = function (val, next) {
  this.next = !next ? null : next;
  this.val = !val ? 0 : val;
};

var Queue = function () {
  this.size = 0;
  this.tail = null;
  this.head = null;
};

Queue.prototype.enqueue = function (val) {
  const node = new Node(val);
  if (!this.tail) {
    this.head = node;
  } else {
    this.tail.next = node;
  }
  this.tail = node;
  this.size++;
};

Queue.prototype.dequeue = function () {
  this.size--;
  if (!this.head) {
    return null;
  } else {
    const result = this.head.val;
    this.head = this.head.next;
    return result;
  }
};

Queue.prototype.lookUp = function () {
  if (!this.head) {
    return null;
  } else {
    return this.head.val;
  }
};
