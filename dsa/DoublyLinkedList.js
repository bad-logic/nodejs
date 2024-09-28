var Node = function (val, prev, next) {
  this.prev = prev;
  this.val = val ? val : 0;
  this.next = next;
};

var MyLinkedList = function () {
  this.position = -1;
  this.head = null;
  this.tail = null;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.position) return -1;
  if (index === 0) return this.head.val;
  if (index === this.position) return this.tail.val;
  let i = 1;
  let node = this.head.next;

  while (i < index) {
    node = node.next;
    i++;
  }

  return node.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = new Node(val);
  if (this.head === null) {
    this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
  }
  this.head = node;
  this.position++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const node = new Node(val);
  if (this.tail === null) {
    this.head = node;
  } else {
    node.prev = this.tail;
    this.tail.next = node;
  }
  this.tail = node;
  this.position++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.position + 1) {
    return;
  }
  if (index === 0) {
    return this.addAtHead(val);
  }
  if (index === this.position + 1) {
    return this.addAtTail(val);
  }
  const node = new Node(val);
  let i = 1;
  let currNode = this.head.next;
  while (i < index) {
    currNode = currNode.next;
    i++;
  }
  currNode.prev.next = node;
  node.prev = currNode.prev;
  node.next = currNode;
  currNode.prev = node;
  this.position++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index > this.position) return;
  if (index === 0 && index === this.position) {
    this.head = null;
    this.tail = null;
  } else if (index === 0) {
    this.head = this.head.next;
    this.head.prev = null;
  } else if (index === this.position) {
    this.tail = this.tail.prev;
    this.tail.next = null;
  } else {
    let i = 1;
    let currNode = this.head.next;
    while (i < index) {
      currNode = currNode.next;
      i++;
    }
    const prev = currNode.prev;
    const next = currNode.next;
    prev.next = next;
    next.prev = prev;
    currNode = null;
  }
  this.position--;
};

function print(node) {
  let msg = '[';
  while (node) {
    msg += node.val + '->';
    node = node.next;
  }
  msg += 'null ]';
  console.log(msg);
}

var myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2); // linked list becomes 1->2->3
print(myLinkedList.head);
console.log(myLinkedList.get(1)); // return 2
myLinkedList.deleteAtIndex(1); // now the linked list is 1->3
print(myLinkedList.head);
console.log(myLinkedList.get(1)); // return 3
