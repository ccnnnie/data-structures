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

  pop() {
    let currNode = this.head;
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
    return this;
  }

  shift() {
    if (!this.head) return undefined;
    else if (this.head === this.tail) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return this;
  }

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

  get(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let currIdx = 0;
    let currNode = this.head;
    while (currIdx !== idx) {
      currNode = currNode.next;
      currIdx++;
    }
    return currNode;
  }

  set(val, idx) {
    const node = this.get(idx);
    if (!node) return false;
    else {
      node.val = val;
      return true;
    }
  }

  insert(val, idx) {
    if (idx < 0 || idx > this.length) return false;
    if (idx === 0) this.unshift(val);
    else if (idx === this.length) this.push(val);
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
      }
    }
    this.length++;
    return this;
  }
}

module.exports = SinglyLinkedList;
