class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // O(1) time complexity
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // O(n) time complexity where n is length of list because of iterating through list to find the node before the tail
  pop() {
    let currNode = this.head;
    let oldTail = this.tail;
    if (!currNode) return undefined;
    else if (currNode === this.tail) {
      this.tail = null;
      this.head = null;
    } else {
      while (currNode) {
        if (currNode.next === this.tail) {
          this.tail = currNode;
          currNode.next = null;
        }
        currNode = currNode.next;
      }
    }
    this.length--;
    return oldTail;
  }

  // O(1) time complexity
  shift() {
    let oldHead = this.head;
    if (!this.head) return undefined;
    else if (this.head === this.tail) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return oldHead;
  }

  // O(1) time complexity
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // O(p) time complexity where p is position (or index) of the node
  get(idx) {
    if (idx < 0 || idx >= this.length) return undefined;
    if (idx === 0) return this.head;
    if (idx === this.length - 1) return this.tail;
    let currIdx = 1;
    let currNode = this.head.next;
    while (currIdx !== idx) {
      currNode = currNode.next;
      currIdx++;
    }
    return currNode;
  }

  // O(p) time complexity where p is position (or index) of the node
  // O(1) if setting values of head or tail
  set(val, idx) {
    const node = this.get(idx);
    if (!node) return undefined;
    else {
      node.val = val;
      return node;
    }
  }

  // O(p) time complexity where p is position of the node because of iterating through the list to find the node at position-1
  // O(1) if inserting at beginning or end of list
  insert(val, idx) {
    if (idx < 0 || idx > this.length) return undefined;
    if (idx === 0) return this.unshift(val);
    else if (idx === this.length) return this.push(val);
    else {
      let currIdx = 0;
      let currNode = this.head;
      const newNode = new Node(val);
      while (currNode) {
        if (currIdx === idx - 1) {
          newNode.next = currNode.next;
          currNode.next = newNode;
        }
        currNode = currNode.next;
        currIdx++;
        this.length++;
        return this;
      }
    }
  }

  // O(p) time complexity where p is position of the node because of iterating through the list to find the node at position-1
  // O(1) if removing at beginning of list
  remove(idx) {
    if (idx < 0 || idx >= this.length) return undefined;
    else if (idx === 0) return this.shift();
    else if (idx === this.length - 1) return this.pop();
    else {
      let currIdx = 0;
      let currNode = this.head;
      while (currIdx !== idx - 1) {
        currNode = currNode.next;
        currIdx++;
      }
      const removedNode = currNode.next;
      currNode.next = removedNode.next;
      this.length--;
      return removedNode;
    }
  }

  // O(n) time complexity where n is length of list
  reverse() {
    let currNode = this.head;
    let nextNode = currNode.next;
    let prevNode = null;
    this.tail = this.head;
    while (currNode) {
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
      if (nextNode) nextNode = nextNode.next;
    }
    this.head = prevNode;
    return this;
  }
}

module.exports = SinglyLinkedList;
