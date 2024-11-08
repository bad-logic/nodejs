// write a function that takes in the head of a Singly Linked List and an integer K, shifts the list in place
// (i.e., doesn't create a brand new list) by K positions and returns its new head

// shifting a linked list means moving its nodes forward or backward and wrapping them around the list where appropriate.
// for example shifting a linked list forward by one position would make its tail become the new head of the linked list.

// whether nodes are moved forward or backward is determined by whether K is positive or negative.

// Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to
// None/null if it's the tail of the list.

// You can assume that the input linked list will always have at least one node; in other words, the head will never be
// None/null.

// sample Input
// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> None/null
// k = 2

// sample output
// 8 -> 9 -> 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> None/null

function ListNode(value) {
  this.value = value;
  this.next = null;
}

function LinkedList(value) {
  if (!(value instanceof ListNode) && !Array.isArray(value))
    throw new Error(
      `Expected Argument of type ListNode or Array, got [${value}]`
    );
  // use arrow function so that the this represents the Enclosing context
  // that is LinkedList
  // since const is used initialize before using since they are not initialized
  // during hoisting
  const handleListNode = () => {
    let node = value;
    this.head = node;
    while (node.next) {
      node = node.next;
    }
    this.tail = node;
  };

  const handleArray = () => {
    let node = new ListNode(value[0]);
    this.head = node;
    for (let i = 1; i < value.length; i++) {
      node.next = new ListNode(value[i]);
      node = node.next;
    }
    this.tail = node;
  };

  if (value instanceof ListNode) {
    return handleListNode();
  } else {
    return handleArray();
  }
}

LinkedList.prototype.size = function () {
  let currentNode = this.head;
  let size = 0;
  while (currentNode !== null) {
    size++;
    currentNode = currentNode.next;
  }
  return size;
};

LinkedList.prototype.toJSON = function () {
  return JSON.stringify(this.head);
};

LinkedList.prototype.getItemOfIndex = function (index = 0) {
  if (index >= this.size()) return null;
  let count = 0;
  let indexItem = this.head;
  while (count < index) {
    indexItem = indexItem.next;
    count++;
  }
  return indexItem;
};

LinkedList.prototype.shift = function (position = 1) {
  if (position === 0) return this.head;
  const size = this.size();
  // find new head
  let newHeadIndex =
    position < 0 ? Math.abs(position) : Math.abs(size - position);
  newHeadIndex = newHeadIndex % size;

  const newTail = this.getItemOfIndex(newHeadIndex - 1);
  const newHead = newTail.next;
  newTail.next = null;
  this.tail.next = this.head;
  this.head = newHead;
  this.tail = newTail;
  return this.head;
};

function shiftLinkedList(head, k) {
  if (!(head instanceof ListNode))
    throw new Error(`Expected head of type ListNode but got ${typeof head}`);
  if (isNaN(k)) throw new Error(`Expected number got ${typeof k}`);
  return new LinkedList(head).shift(k);
}

const ll = new LinkedList([1, 2, 3, 4, 5, 6, 7]);
const modifiedHead = shiftLinkedList(ll.head, 5);
console.log({ modifiedHead: JSON.stringify(modifiedHead) });

const ll1 = new LinkedList([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
ll1.shift(2);
const modifiedHead1 = shiftLinkedList(ll1.head, 2);
console.log({ modifiedHead: JSON.stringify(modifiedHead1), ll: ll1.toJSON() });
