class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // O(1) time complexity
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // O(1) time complexity
  pop() {
    if (!this.head) return undefined;
    let oldTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.prev;
      this.tail.next = null;
      oldTail.prev = null;
    }
    this.length--;
    return oldTail;
  }

  // O(1) time complexity
  shift() {
    if (!this.head) return undefined;
    let oldHead = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // O(1) time complexity
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // O(n) time complexity where n is length of list
  // get(idx) {
  //   if (idx < 0 || idx >= this.length) return undefined;
  //   let currIdx = 0;
  //   let currNode = this.head;
  //   while (currIdx !== idx) {
  //     currNode = currNode.next;
  //     currIdx++;
  //   }
  //   return currNode;
  // }

  // slight optimization for DLL
  // O(n/2) => O(n) time complexity where n is length of list
  get(idx) {
    if (idx < 0 || idx >= this.length) return undefined;
    if (idx === 0) return this.head;
    if (idx === this.length - 1) return this.tail;
    let currNode, currIdx;
    if (idx < this.length / 2) {
      currIdx = 0;
      currNode = this.head;
      while (currIdx !== idx) {
        currNode = currNode.next;
        currIdx++;
      }
    } else {
      currIdx = this.length - 1;
      currNode = this.tail;
      while (currIdx !== idx) {
        currNode = currNode.prev;
        currIdx--;
      }
    }
    return currNode;
  }

  // O(p) time complexity where p is position (or index) of the node
  // O(1) if you already have reference to the node or if setting values of head or tail
  set(val, idx) {
    let node = this.get(idx);
    if (!node) {
      return undefined;
    }
    node.val = val;
    return node;
  }

  // O(p) time complexity where p is position of the node because of iterating through the list to find the node
  // O(1) if you already have reference to the node at position p or if inserting at beginning or end of list
  insert(val, idx) {
    if (idx < 0 || idx > this.length) {
      return undefined;
    } else if (idx === 0) return this.unshift(val);
    else if (idx === this.length) return this.push(val);

    let node = this.get(idx);
    const newNode = new Node(val);
    newNode.next = node;
    newNode.prev = node.prev;
    node.prev.next = newNode;
    node.prev = newNode;
    this.length++;
    return this;
  }

  // O(p) time complexity where p is position of the node because of iterating through the list to find the node
  // O(1) if you already have reference to the node at position p or if removing from beginning or end of list
  remove(idx) {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    } else if (idx === 0) return this.shift();
    else if (idx === this.length - 1) return this.pop();

    let node = this.get(idx);
    let nextNode = node.next;
    let prevNode = node.prev;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    node.next = null;
    node.prev = null;
    this.length--;
    return node;
  }
}

module.exports = DoublyLinkedList;
