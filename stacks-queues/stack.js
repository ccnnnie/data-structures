// stack implementation with linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  // O(1) time complexity
  add(val) {
    let newNode = new Node(val);
    if (!this.top) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
    return this;
  }

  // O(1) time complexity
  remove() {
    if (!this.top) return undefined;
    let oldTop = this.top;
    let newTop = this.top.next;
    if (!newTop) this.bottom = null;
    this.top = newTop;
    oldTop.next = null;
    this.size--;
    return oldTop;
  }
}

module.exports = Stack;
