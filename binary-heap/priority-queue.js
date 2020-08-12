class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

// utilizing a min binary heap to implement priority queue
// priority queues and binary heaps are not the same thing. priority queues can be implemented in other ways. it is an abstract data type
// lower number => higher priority

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    if (this.values.length > 1) {
      this.bubbleUp();
    }
    return this;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let node = this.values[idx];
      let parent = this.values[parentIdx];
      if (parent.priority > node.priority) {
        let temp = this.values[idx];
        this.values[idx] = this.values[parentIdx];
        this.values[parentIdx] = temp;
        idx = parentIdx;
      } else break;
    }
  }

  dequeue() {
    if (!this.values.length) return null;
    let highestPriority = this.values[0];
    let end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return highestPriority;
  }

  bubbleDown() {
    let idx = 0;
    const length = this.values.length;
    while (idx < length) {
      let elem = this.values[idx];
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let left, right;
      let swapIdx = null;
      if (leftChildIdx < length) {
        left = this.values[leftChildIdx];
        if (left.priority < elem.priority) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        right = this.values[rightChildIdx];
        if (right.priority < elem.priority) {
          if (swapIdx === null || right.priority < left.priority) {
            swapIdx = rightChildIdx;
          }
        }
      }

      if (!swapIdx) break;
      else {
        let temp = this.values[idx];
        this.values[idx] = this.values[swapIdx];
        this.values[swapIdx] = temp;
        idx = swapIdx;
      }
    }
  }
}

module.exports = { PriorityQueue, Node };
