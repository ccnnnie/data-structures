// queue implementation with linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // O(1) time complexity
  enqueue(val) {
    let newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
    return this;
  }

  // O(1) time complexity
  dequeue() {
    if (!this.first) return undefined;
    let oldFirst = this.first;
    let newFirst = this.first.next;
    if (!newFirst) this.last = null;
    this.first = newFirst;
    oldFirst.next = null;
    this.size--;
    return oldFirst;
  }
}

module.exports = Queue;
